# NORA — Frontend v4 (équipe dev42)

> **Network of Rising Africans** — la plateforme des développeurs africains. CADEV 2026.
> v4 = **NORA Studio** (IDE façon VS Code dans le navigateur), notifications réelles,
> paramètres + intégration GitHub, follow/join persistés, zéro donnée fictive,
> mode clair gris tamisé, orb plus visible, landing vivante.

## 🚀 Lancer le projet

```bash
bun install        # ou npm install
bun run db:push    # crée/met à jour la base SQLite (db/custom.db)
bun run db:seed    # peuple la base (communauté de départ)
bun run dev        # http://localhost:3000
```

**Comptes de test** (tous les devs seedés ont le même mot de passe) — pour l'équipe
uniquement : ils **ne sont plus affichés sur l'interface de connexion**.

| Email | Mot de passe | Rôle |
|---|---|---|
| `theoah@nora.africa` | `nora-dev42` | Fullstack · Frontend (compte principal) |
| `amadoud@nora.africa` | `nora-dev42` | DevOps · SRE (conversation déjà ouverte) |
| `wanjikuk@nora.africa` | `nora-dev42` | Cloud · AI Infra (demande de contact en attente) |

Ou crée ton compte via **Créer mon compte** — l'inscription est réelle (persistance en base).

## 🔌 Architecture backend (v3)

Le frontend ne contient **plus aucune donnée fictive** : tout passe par une API REST.

- **Par défaut** : API intégrée (routes Next `src/app/api/**`) + **Prisma/SQLite**
  (`prisma/schema.prisma`, base `db/custom.db`). Auth par token (scrypt + sessions).
- **Backend de l'équipe** : définir `NEXT_PUBLIC_API_URL=https://api-dev42.exemple` —
  le client `src/lib/api-client.ts` bascule automatiquement dessus. Le contrat complet :

  | Endpoint | Méthodes | Rôle |
  |---|---|---|
  | `/api/auth/register` · `/api/auth/login` · `/api/auth/me` | POST · POST · GET/PATCH | compte + profil |
  | `/api/devs` · `/api/devs/[username]` | GET | annuaire |
  | `/api/projects` (+ `/[id]/star`) | GET/POST/POST | projets + stars |
  | `/api/posts` (+ `/[id]/like`) | GET/POST/POST | fil + likes réels |
  | `/api/channels` · `/api/channels/[id]/messages` | GET · GET/POST | salons publics |
  | `/api/dms` · `/api/dms/[username]` | GET · POST | messagerie privée (validation requise) |
  | `/api/contact-requests` (+ `/[username]` accept/decline) | GET/POST | demandes de contact |
  | `/api/challenges` · `/api/missions` · `/api/hackathons` · `/api/stats` | GET | données plateforme |
  | `/api/ai/chat` | POST | agent NORA (IA réelle côté serveur) |
  | `/api/notifications` | GET | notifications réelles (contacts, likes, stars, MP) |
  | `/api/workspace` | GET/POST/DELETE | **Studio** : fichiers de code par dev (persistés) |
  | `/api/github/repos` | GET | dépôts publics GitHub réels (import en projets) |
  | `/api/devs/[username]/follow` | POST | suivre / ne plus suivre (persisté) |
  | `/api/projects/[id]/join` | POST | rejoindre / quitter une équipe (persisté) |

- **Messagerie** : une discussion ne s'ouvre qu'après acceptation par le destinataire
  (`POST /api/contact-requests/[username]` avec `{"action":"accept"}`). Les demandes
  entrantes apparaissent en direct (rafraîchissement 15 s).
- **NORA AI** : réponses générées côté serveur, avec coloration syntaxique, bouton
  copier et prompts suggérés.

## 🧑‍💻 NORA Studio — l'IDE intégré

Onglet **Studio** de la plateforme : un vrai IDE façon VS Code, 100 % fonctionnel.

- **Éditeur Monaco** (le moteur de VS Code) : coloration, minimap, autocomplétion
  TS/JS réelle (workers embarqués), thème `nora-dark` accordé à la charte.
- **Fichiers persistés par compte** (`WorkspaceFile`, table Prisma) : créer, éditer,
  supprimer — les fichiers suivent le dev entre deux sessions. Trois fichiers
  d'amorce (JS runnable, Dijkstra, README) au premier accès.
- **Exécution réelle** : ▶ (ou `Ctrl/Cmd+Entrée`) lance le fichier JavaScript dans
  un **Web Worker isolé** — `console.log/warn/error/table` capturés dans la console
  basse, timeout 5 s.
- **Raccourcis** : `Ctrl/Cmd+S` enregistrer, `Ctrl/Cmd+Entrée` exécuter.
- **Panneau NORA IA** : demande un algorithme, un correctif, un composant — le code
  généré s'insère dans le fichier en un clic (bouton **Insérer**).

## 🔔 Topbar connectée (haut-droite)

- **Cloche de notifications** — calculées côté serveur depuis la base : demandes de
  contact, likes reçus, stars reçues, messages privés. Badge « non vues », polling 20 s.
- **Compte** — mon profil, Studio, paramètres, déconnexion.
- **Paramètres** — apparence (sombre/clair), langue (FR/EN) et **GitHub** : charger
  ses dépôts publics réels et les **importer comme projets NORA** en un clic.

## 🎨 Design system — « Nuit Violette »

| Nom | Hex | Rôle |
|---|---|---|
| **Violet néon** | `#7C4DF0` / `#8B5CF6` (deep `#5B21B6`) | Primaire : CTA, actifs → bleu `#3B82F6` |
| **Teal succès** | `#00E0B0` / `#2DD4A0` | En ligne, réussites, nœud du logo |
| **Cyan néon** | `#22D3EE` | Code, micro-accents |
| **Or** | `#F5A623` | Trophées uniquement |

Base sombre `#0B0912`, mode clair **gris tamisé** (`#EBEBF0`, cartes `#F4F4F7`) —
jamais de blanc flash. L'orbe du hero a un **noyau sombre** : visible sur les deux thèmes.
**Typographie v4** : **Sora** (titres), **Manrope** (texte), **JetBrains Mono** (code) —
variables **embarquées** via `@fontsource-variable` (aucun appel réseau au build).
**Logo** : silhouette de l'Afrique + orbite réseau + nœud teal sur tuile dégradé
violette (`shared.tsx`, `public/logo.svg`, `public/favicon.svg`) — plus de lettre « N ».

## ✨ Ce qui est implémenté (v4)

- **Accès gardé** : la plateforme entière (dashboard, fil, projets, devs, messagerie,
  challenges, missions, profils, **studio**) exige un compte — seules la landing et les
  pages d'authentification sont publiques. Toute écriture API renvoie `401` sans token.
- **Landing vivante** : titre + 2 CTA + chiffres **réels** (devs, projets, posts, pays,
  avatars « en ligne »), ticker à **chiffres réels** + derniers projets, bandeau
  « Projets en direct » (marquee réel, rafraîchi 30 s), carte d'Afrique en drapeaux,
  section dernier projet/post (auto-refresh), bento, diff IA, roadmap, CTA.
- **Orbe réseau 3D** (three.js) : noyau sombre + halo violet, nœuds, arcs, parallaxe
  pointeur, `prefers-reduced-motion` respecté, pause hors écran.
- **Interactions persistées** : suivre (`Follow`), rejoindre une équipe (`teamJson`),
  stars, likes — tout passe par l'API, rien n'est simulé.
- **Profil = le mien** : le bouton en bas à gauche (et l'onglet mobile) ouvre **son**
  profil avec actions propriétaires (Studio, Publier, Éditer, Paramètres). Heatmap et
  activité **calculées sur les vrais posts/projets**.
- **Tableau de bord réel** : complétion du profil calculée, activité tirée des vrais
  posts/projets, « rejoins une équipe » persisté, carte Studio.
- **NORA Studio** : voir la section dédiée ci-dessus.
- **Responsive** : sidebar desktop / dock mobile (Accueil · Fil · Studio · Messagerie ·
  Profil), topbar mobile avec cloche et paramètres.
- ⌘K palette (avec Studio), FR/EN, sombre/clair, Lenis, magnetic buttons.

## 🗂️ Structure clé

```
src/app/api/**          → API REST (Prisma/SQLite)
src/lib/api-client.ts   → client HTTP typé (NEXT_PUBLIC_API_URL)
src/lib/store.ts        → état global zustand (chargé depuis l'API)
src/lib/server/         → helpers serveur (auth, sérialisation, IA)
src/components/nora/    → landing + vues + fx (orbe : fx/network-globe.tsx)
src/components/nora/views/studio.tsx → l'IDE (éditeur : studio/editor.tsx)
src/components/nora/topbar.tsx       → cloche, compte, paramètres + GitHub
src/monaco-workers/     → workers Monaco (base, TS/JS, JSON)
scripts/seed.ts         → seed de la base
```

Équipe **dev42** — CADEV 2026.
