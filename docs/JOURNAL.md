# Journal du projet NORA

Ce journal consigne les décisions, les essais et les résultats mesurés au fil du
développement, pour qu'un nouvel agent ou un nouveau membre puisse reprendre le
travail sans contexte préalable.

## 2026-11-07 — Démarrage du service IA (`feature/ai-assistant`)

**Responsable :** Exaucé.

### Contexte

La branche `feature/ai-assistant` était restée sur le commit initial et ne
contenait pas l'arborescence créée sur `develop`. Elle a été avancée en
fast-forward sur `origin/develop` (`c5615df`) avant de commencer.

```bash
git switch --track origin/feature/ai-assistant
git merge --ff-only origin/develop
```

### Réalisé

- Service **FastAPI** sans état dans `ai-service/` :
  - `POST /v1/explain` : explication de code ;
  - `POST /v1/generate` : génération de code ;
  - `POST /v1/fix` : correction de bug + cause racine ;
  - `GET /health` : état du service.
- Client **OpenAI-compatible** (`app/services/llm.py`) configurable via
  `LLM_BASE_URL` / `LLM_MODEL`, utilisable avec DeepSeek, Mistral, Groq, OpenAI
  ou un serveur local.
- Sécurité : en-tête `X-Internal-Key` comparé en temps constant, clé refusée si
  absente ou invalide ; auth désactivée uniquement si `INTERNAL_API_KEY` est vide.
- Limitation de débit en mémoire (fenêtre glissante, 20 req/min par défaut) avec
  `Retry-After`.
- Validation stricte des entrées avec Pydantic (tailles maximales, champs
  inconnus refusés, langues de réponse `fr`/`en`).
- Conteneurisation (`Dockerfile`, utilisateur non root, `HEALTHCHECK`).
- Tests pytest avec fournisseur simulé.

### Vérifications

```bash
cd ai-service
uv venv .venv --python python3          # CPython 3.12.15
uv pip install --python .venv/bin/python -r requirements-dev.txt
.venv/bin/pytest
# 11 passed, 1 warning in 0.34s

uvx ruff check app tests                # All checks passed!
uvx ruff format --check app tests       # 15 files already formatted

docker build -t nora-ai-service:dev .
# image construite sans erreur

docker run -d --name nora-ai-smoke \
  -e INTERNAL_API_KEY=smoke-key -e LLM_API_KEY=smoke \
  -p 18000:8000 nora-ai-service:dev
curl http://localhost:18000/health
# {"status":"ok","service":"NORA AI Service",...,"model":"deepseek-coder"}
# POST /v1/generate sans X-Internal-Key -> 401
```

Le warning pytest provient de Starlette (`httpx` déprécié au profit de `httpx2`
dans `TestClient`) ; il n'affecte pas les tests. Le premier appel curl juste
après `docker run` peut échouer le temps du démarrage d'uvicorn ; attendre
quelques secondes ou se fier au `HEALTHCHECK`.

### Décisions

- Contrat HTTP simple et stable, documenté dans `ai-service/README.md`, pour que
  Promis (backend) puisse l'intégrer sans dépendre de l'implémentation interne.
- Réponses non streamées pour le MVP : plus simple à intégrer et à tester.
- Limiteur en mémoire assumé pour un déploiement mono-instance ; Redis sera
  nécessaire en cas de réplication.

### Questions ouvertes / à faire

- Choisir le modèle définitif et mesurer coût, latence et qualité sur des
  exemples réels.
- Ajouter métriques et suivi des tokens/coûts.
- Intégrer le service dans le Docker Compose et le déploiement (Teddy).
- Décider si l'historique de conversation doit être géré par le backend.
