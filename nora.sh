#!/usr/bin/env bash
# ============================================================
#  NORA — Équipe dev42 · CADEV 2026 — Lanceur tout-en-un
#
#  Une seule commande pour lancer toute la plateforme :
#      ./nora.sh              → démarre TOUT puis affiche les logs en direct
#      ./nora.sh -d           → détaché : tourne en arrière-plan et rend la main
#      ./nora.sh --prod       → idem, frontend en build de production
#      ./nora.sh stop         → arrête tous les services
#      ./nora.sh status       → état de chaque service
#      ./nora.sh reset-db     → réinitialise + re-seed la base frontend
#      ./nora.sh logs         → suit les logs des services
#
#  Services :
#      postgres   :5432  (docker compose, ou postgres local existant)
#      backend    :8080  (Fastify — REST, auth JWT, WebSocket)
#      ai-service :8000  (FastAPI — explain / generate / fix)
#      frontend   :3000  (Next.js — l'application NORA)
# ============================================================

set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"
RUN="$ROOT/.run"; LOGS="$ROOT/logs"
mkdir -p "$RUN" "$LOGS"

# ---------- affichage ----------
if [ -t 1 ]; then
  G=$'\033[32m'; Y=$'\033[33m'; R=$'\033[31m'; C=$'\033[36m'; B=$'\033[1m'; N=$'\033[0m'
else
  G=""; Y=""; R=""; C=""; B=""; N=""
fi
say()  { printf "${C}▸${N} %s\n" "$*"; }
ok()   { printf "${G}✔${N} %s\n" "$*"; }
warn() { printf "${Y}⚠${N} %s\n" "$*"; }
die()  { printf "${R}✘ %s${N}\n" "$*" >&2; exit 1; }

has_cmd() { command -v "$1" >/dev/null 2>&1; }
rand_hex() {
  if has_cmd openssl; then openssl rand -hex 32
  elif has_cmd node; then node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  else head -c 32 /dev/urandom | od -An -tx1 | tr -d ' \n'; fi
}
port_open() { (exec 3<>"/dev/tcp/127.0.0.1/$1") 2>/dev/null && exec 3>&- && return 0 || return 1; }
alive() { [ -f "$1" ] && kill -0 "$(cat "$1")" 2>/dev/null; }

# tue un process et tous ses descendants (bun → next-server, etc.)
kill_tree() {
  local pid="$1" kids c
  kids=$(pgrep -P "$pid" 2>/dev/null || true)
  for c in $kids; do kill_tree "$c"; done
  kill "$pid" 2>/dev/null || true
}

# charge un fichier .env sans interpréter les valeurs (espaces, <>, accents…)
load_env() { # $1 = chemin
  while IFS= read -r line || [ -n "$line" ]; do
    case "$line" in ''|\#*) continue ;; esac
    case "$line" in *=*) ;; *) continue ;; esac
    local key="${line%%=*}" val="${line#*=}"
    key="$(printf '%s' "$key" | tr -d ' \t')"
    # retire un éventuel pair de guillemes englobant
    case "$val" in "\"*\"") val="${val#\"}"; val="${val%\"}" ;; esac
    export "$key=$val"
  done < "$1"
}

# attend qu'une URL réponde (200 attendu)
wait_url() { # $1=url $2=nom $3=essais
  local tries="${3:-45}" i=0
  until curl -sf -o /dev/null "$1"; do
    i=$((i+1)); [ "$i" -ge "$tries" ] && return 1
    sleep 2
  done
  return 0
}

# ============================================================
#  POSTGRES :5432
# ============================================================
start_postgres() {
  if port_open 5432; then ok "Postgres déjà accessible sur :5432"; return 0; fi
  if has_cmd docker && docker info >/dev/null 2>&1; then
    say "Démarrage de Postgres via docker compose…"
    docker compose up -d postgres || die "docker compose up postgres a échoué"
    local i=0
    until docker compose exec -T postgres pg_isready -U nora -d nora >/dev/null 2>&1; do
      i=$((i+1)); [ "$i" -ge 30 ] && die "Postgres (docker) ne répond pas"
      sleep 2
    done
    touch "$RUN/pg-docker"
    ok "Postgres prêt (docker) — nora/nora@nora sur :5432"
    return 0
  fi
  if has_cmd pg_isready || has_cmd postgres; then
    die "Postgres est installé mais injoignable sur :5432. Démarre-le puis relance ./nora.sh"
  fi
  die "Aucun Postgres disponible. Installe Docker (recommandé) puis relance : ./nora.sh"
}

# ============================================================
#  BACKEND :8080 (Fastify)
# ============================================================
start_backend() {
  cd "$ROOT/backend/api" || die "backend/api introuvable"
  if port_open 8080 && curl -sf http://localhost:8080/health >/dev/null; then
    ok "Backend déjà en marche sur :8080"; cd "$ROOT"; return 0
  fi
  [ -f .env ] || {
    say "Création de backend/api/.env (secrets JWT aléatoires)…"
    cp .env.example .env
    local A; A="$(rand_hex)"; local B; B="$(rand_hex)"
    sed -i.bak -e "s|JWT_ACCESS_SECRET=.*|JWT_ACCESS_SECRET=$A|" \
               -e "s|JWT_REFRESH_SECRET=.*|JWT_REFRESH_SECRET=$B|" \
               -e "s|CORS_ORIGIN=.*|CORS_ORIGIN=http://localhost:3000|" .env && rm -f .env.bak
    ok "backend/api/.env généré"
  }
  [ -d node_modules ] || {
    say "Installation des dépendances backend (npm ci, 1-2 min)…"
    npm ci --no-audit --no-fund >/dev/null 2>&1 || npm install --no-audit --no-fund >>"$LOGS/backend-install.log" 2>&1 \
      || die "npm install backend a échoué (voir logs/backend-install.log)"
    ok "Dépendances backend installées"
  }
  say "Migrations backend (node-pg-migrate)…"
  # load_env : le .env écrase toute variable héritée du shell (déterministe)
  load_env .env
  npx node-pg-migrate -m ../../db/migrations up >>"$LOGS/backend.log" 2>&1 \
    || die "Migrations backend échouées (voir logs/backend.log)"
  ok "Base Postgres à jour"
  say "Démarrage du backend :8080…"
  nohup node src/index.js >>"$LOGS/backend.log" 2>&1 &
  echo $! > "$RUN/backend.pid"
  wait_url http://localhost:8080/health "backend" 45 || die "Backend ne répond pas (voir logs/backend.log)"
  ok "Backend en marche → http://localhost:8080 (docs : /documentation)"
  cd "$ROOT"
}

# ============================================================
#  AI SERVICE :8000 (FastAPI)
# ============================================================
start_ai() {
  cd "$ROOT/ai-service" || die "ai-service introuvable"
  if port_open 8000 && curl -sf http://localhost:8000/health >/dev/null; then
    ok "Service IA déjà en marche sur :8000"; cd "$ROOT"; return 0
  fi
  has_cmd python3 || die "python3 introuvable (>= 3.11 requis pour le service IA)"
  [ -d .venv ] || {
    say "Création du venv Python du service IA…"
    python3 -m venv .venv || die "création du venv échouée"
  }
  say "Installation des dépendances du service IA…"
  .venv/bin/pip install -q -r requirements.txt || die "pip install ai-service échoué"
  [ -f .env ] || {
    {
      echo "# Clé du fournisseur LLM compatible OpenAI (DeepSeek par défaut)."
      echo "# Sans clé : le service démarre, mais les endpoints /v1/* échoueront."
      echo "LLM_API_KEY=${NORA_LLM_API_KEY:-}"
      echo "LLM_BASE_URL=${NORA_LLM_BASE_URL:-https://api.deepseek.com/v1}"
      echo "LLM_MODEL=${NORA_LLM_MODEL:-deepseek-coder}"
      echo "INTERNAL_API_KEY=$(rand_hex)"
    } > .env
    ok "ai-service/.env généré"
  }
  [ -n "${NORA_LLM_API_KEY:-}" ] || grep -q "^LLM_API_KEY=..*" .env || \
    warn "LLM_API_KEY vide — complète ai-service/.env pour activer l'IA"
  say "Démarrage du service IA :8000…"
  nohup .venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000 >>"$LOGS/ai.log" 2>&1 &
  echo $! > "$RUN/ai.pid"
  wait_url http://localhost:8000/health "ai-service" 45 || die "Service IA ne répond pas (voir logs/ai.log)"
  ok "Service IA en marche → http://localhost:8000/health"
  cd "$ROOT"
}

# ============================================================
#  FRONTEND :3000 (Next.js)
# ============================================================
start_frontend() {
  cd "$ROOT/frontend" || die "frontend introuvable"
  local PROD=0; [ "${1:-}" = "--prod" ] && PROD=1
  if port_open 3000 && curl -sf -o /dev/null http://localhost:3000; then
    ok "Frontend déjà en marche sur :3000"; cd "$ROOT"; return 0
  fi
  has_cmd bun || die "bun introuvable — installe-le : curl -fsSL https://bun.sh/install | bash"
  mkdir -p db
  [ -f .env ] || { cp .env.example .env; ok "frontend/.env créé (SQLite locale)"; }
  load_env .env   # le .env prime sur tout DATABASE_URL hérité du shell
  [ -d node_modules ] || {
    say "Installation des dépendances frontend (bun install, 1-2 min)…"
    bun install >>"$LOGS/frontend-install.log" 2>&1 || die "bun install échoué (voir logs/frontend-install.log)"
    ok "Dépendances frontend installées"
  }
  [ -d node_modules/.prisma/client ] || {
    say "Génération du client Prisma…"
    bunx prisma generate >>"$LOGS/frontend.log" 2>&1 || die "prisma generate échoué"
  }
  if [ ! -f db/custom.db ]; then
    say "Création + peuplement de la base SQLite…"
    bunx prisma db push --accept-data-loss --skip-generate >>"$LOGS/frontend.log" 2>&1 \
      || die "prisma db push échoué (voir logs/frontend.log)"
    bun run db:seed >>"$LOGS/frontend.log" 2>&1 || die "seed échoué (voir logs/frontend.log)"
    ok "Base peuplée (communauté de départ)"
  else
    ok "Base SQLite existante conservée (reset possible : ./nora.sh reset-db)"
  fi
  if [ "$PROD" = 1 ]; then
    say "Build de production du frontend (2-3 min)…"
    bun run build >>"$LOGS/frontend.log" 2>&1 || die "build frontend échoué (voir logs/frontend.log)"
    say "Démarrage du frontend :3000 (production)…"
    nohup bun run start >>"$LOGS/frontend.log" 2>&1 &
  else
    say "Démarrage du frontend :3000 (dev)…"
    nohup bun run dev >>"$LOGS/frontend.log" 2>&1 &
  fi
  echo $! > "$RUN/frontend.pid"
  wait_url http://localhost:3000 "frontend" 90 || die "Frontend ne répond pas (voir logs/frontend.log)"
  ok "Frontend en marche → http://localhost:3000"
  cd "$ROOT"
}

# ============================================================
#  Commandes
# ============================================================
summary() {
  printf "\n${B}${G}  NORA est prête — équipe dev42 ${N}${G}🚀${N}\n\n"
  printf "  ${B}Frontend${N}    http://localhost:3000\n"
  printf "  ${B}Backend${N}     http://localhost:8080  (health : /health, docs : /documentation)\n"
  printf "  ${B}Service IA${N}  http://localhost:8000  (health : /health)\n\n"
  printf "  ${B}Compte de démo${N}  theoah@nora.africa / nora-dev42 (devs seedés, même mot de passe)\n"
  printf "  ${B}Logs${N}            logs/backend.log · logs/ai.log · logs/frontend.log\n"
  printf "  ${B}Arrêter${N}         Ctrl+C ici, ou ./nora.sh stop\n\n"
}

cmd_up() {
  local PROD="" DETACH=0
  for a in "$@"; do
    case "$a" in
      --prod) PROD="--prod" ;;
      -d|--detach) DETACH=1 ;;
    esac
  done
  printf "${B}${C}── NORA — démarrage complet (dev42 · CADEV 2026) ──${N}\n"
  start_postgres
  start_backend
  start_ai
  start_frontend "$PROD"
  summary
  if [ "$DETACH" = 1 ]; then
    say "Mode détaché : tout tourne en arrière-plan — ./nora.sh stop pour arrêter."
  else
    printf "\n${B}  Logs en direct — ${R}Ctrl+C${B} pour tout arrêter${N}\n\n"
    trap 'printf "\n"; cmd_stop; exit 0' INT TERM
    tail -n 10 -F "$LOGS/backend.log" "$LOGS/ai.log" "$LOGS/frontend.log" 2>/dev/null
    trap - INT TERM
    cmd_stop
  fi
}

cmd_stop() {
  local stopped=0
  for s in frontend ai backend; do
    if alive "$RUN/$s.pid"; then
      kill_tree "$(cat "$RUN/$s.pid")"
      printf "${C}▸${N} %s arrêté\n" "$s"; stopped=1
    fi
    rm -f "$RUN/$s.pid"
  done
  # vérifie que les ports sont bien libérés (processus orphelins éventuels)
  local i
  for i in 1 2 3 4 5; do
    port_open 3000 || port_open 8000 || port_open 8080 || break
    sleep 1
  done
  if port_open 3000 || port_open 8000 || port_open 8080; then
    warn "Un port reste occupé (3000/8000/8080) — process externe probable."
  fi
  if [ -f "$RUN/pg-docker" ]; then
    docker compose stop postgres >/dev/null 2>&1 && printf "${C}▸${N} postgres (docker) arrêté\n"
    rm -f "$RUN/pg-docker"; stopped=1
  fi
  [ "$stopped" = 0 ] && say "Rien à arrêter."
}

cmd_status() {
  check() { # $1=nom $2=URL de sonde
    if alive "$RUN/$1.pid" && curl -sf -o /dev/null "$2"; then
      ok "$1 en marche"
    elif curl -sf -o /dev/null "$2"; then
      warn "$1 répond (lancé hors nora.sh)"
    else
      printf "${R}✘${N} %s arrêté\n" "$1"
    fi
  }
  check frontend http://localhost:3000
  check ai http://localhost:8000/health
  check backend http://localhost:8080/health
  port_open 5432 && ok "postgres :5432 accessible" || printf "${R}✘${N} postgres :5432 injoignable\n"
}

cmd_reset_db() {
  cd "$ROOT/frontend" || die "frontend introuvable"
  say "Réinitialisation de la base SQLite du frontend…"
  rm -f db/custom.db
  load_env .env
  bunx prisma db push --accept-data-loss --skip-generate >>"$LOGS/frontend.log" 2>&1 || die "db push échoué"
  bun run db:seed >>"$LOGS/frontend.log" 2>&1 || die "seed échoué"
  ok "Base frontend réinitialisée et re-peuplée"
  say "Migrations backend (Postgres)…"
  (cd "$ROOT/backend/api" && load_env .env && \
     npx node-pg-migrate -m ../../db/migrations up >>"$LOGS/backend.log" 2>&1) \
     && ok "Migrations backend à jour"
  cd "$ROOT"
}

cmd_logs() { tail -n 30 -f "$LOGS"/backend.log "$LOGS"/ai.log "$LOGS"/frontend.log 2>/dev/null; }

case "${1:-up}" in
  up)          shift; cmd_up "$@" ;;
  -d|--detach) shift; cmd_up -d "$@" ;;
  --prod)      shift; cmd_up --prod "$@" ;;
  stop)     cmd_stop ;;
  status)   cmd_status ;;
  reset-db) cmd_reset_db ;;
  logs)     cmd_logs ;;
  *) sed -n '2,27p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
esac
