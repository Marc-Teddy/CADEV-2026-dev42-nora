# API NORA

Base URL : `/api/v1`. Contrat OpenAPI interactif : `/docs`.

Les requêtes mutantes faites avec les cookies de session doivent d'abord
récupérer `GET /csrf`, puis envoyer le cookie `nora_csrf` et sa valeur dans
`X-CSRF-Token`. L'API vérifie aussi `Origin`/`Referer` contre `CORS_ORIGIN`.
Les routes OAuth et les webhooks providers utilisent leurs propres protections.

Les routes publiques sont `GET /health`, `GET /profiles/:username`, `GET /projects`
et `GET /feed`. L'inscription crée un compte non vérifié et envoie un e-mail
de confirmation. Le client confirme le lien avec `POST /auth/verify-email`
(`{ "token": "..." }`), ou demande un nouvel e-mail via
`POST /auth/resend-verification`. La connexion est refusée tant que l'adresse
n'est pas confirmée. Le renouvellement et la révocation de session sont sous
`/auth/*`. Les routes privées utilisent les cookies HTTP-only
émis par l'API : `GET/PATCH /me`, `POST /projects`, `POST /posts` et les espaces
collaboratifs `/spaces`. La messagerie temps réel utilise
`GET /api/v1/spaces/:spaceId/live` en WebSocket, avec repli HTTP sur
`GET /api/v1/spaces/:spaceId/messages?before=...&limit=...`.

## Contrat applicatif du frontend (`/api/v1/app`)

L'interface Next.js consomme un jeu de routes dédié, sous `/api/v1/app`, qui
renvoie exactement les formes JSON de `frontend/src/lib/types.ts` (`Dev`,
`Project`, `Post`, `Channel`, `ChatMessage`, …). Ces routes lisent et écrivent
dans les mêmes tables PostgreSQL que le reste de l'API (migration
`007_app_contract`) : un projet publié depuis l'interface est aussi visible via
`GET /api/v1/projects`. Les routes « brutes » ci-dessus ne changent pas.

| Méthode | Route | Auth | Rôle |
|---|---|---|---|
| POST | `/app/auth/register`, `/app/auth/login` | — | crée/ouvre la session (cookies) et renvoie `{ dev }` |
| POST | `/app/auth/logout` | — | révoque la session et efface les cookies |
| GET / PATCH | `/app/auth/me` | ✔ | profil complet (compétences, badges, avatar…) |
| GET | `/app/devs`, `/app/devs/:username` | optionnelle | annuaire (`following` si connecté) |
| POST | `/app/devs/:username/follow` | ✔ | suivre / ne plus suivre |
| GET / POST | `/app/projects` | optionnelle / ✔ | liste (`starredByMe`) / publication |
| POST | `/app/projects/:id/star`, `/app/projects/:id/join` | ✔ | étoile, rejoindre / quitter l'équipe |
| GET / POST | `/app/posts` | optionnelle / ✔ | fil d'actualité (`liked`) / publication |
| POST | `/app/posts/:id/like` | ✔ | j'aime / je n'aime plus |
| GET | `/app/channels` | — | salons publics (espaces `is_channel`) |
| GET / POST | `/app/channels/:slug/messages` | — / ✔ | messages d'un salon (poster rend membre) |
| GET | `/app/challenges`, `/app/missions`, `/app/hackathons`, `/app/stats` | optionnelle | données publiques (`joined` / `applied` si connecté) |
| POST | `/app/challenges/:id/join` | ✔ | s'inscrire / se désinscrire d'un challenge |
| POST | `/app/missions/:id/apply` | ✔ | candidater à une mission (notifie son auteur) |
| GET | `/app/dms` | ✔ | contacts, demandes et fils privés |
| POST | `/app/dms/:username` | ✔ | message privé (contact accepté requis ; `nora` = agent IA) |
| GET / POST | `/app/contact-requests` | ✔ | demandes de contact |
| POST | `/app/contact-requests/:username` | ✔ | `{ "action": "accept" \| "decline" }` |
| POST | `/app/ai/chat` | ✔ | question à l'assistant (proxy vers `ai-service` `/v1/generate`) |
| GET | `/app/notifications` | ✔ | contacts, likes, étoiles et messages reçus |
| GET / POST / DELETE | `/app/workspace` | ✔ | fichiers du Studio |
| GET | `/app/github/repos?user=` | ✔ | dépôts publics GitHub |

Les erreurs suivent le format commun `{ "error": "CODE", "message": "…" }`,
avec des messages en français pour l'interface.

**Côté frontend**, le mode backend s'active avec
`NEXT_PUBLIC_API_URL=/backend/api/v1/app` : `next.config.ts` proxifie
`/backend/*` vers `BACKEND_URL` (par défaut `http://localhost:8080`), si bien
que le navigateur reste sur la même origine et que les cookies httpOnly
fonctionnent. Le client envoie `X-CSRF-Token` sur chaque écriture et renouvelle
la session via `POST /api/v1/auth/refresh` quand l'accès (15 min) expire.

**Données de démo** : `npm run seed` (base vide uniquement) ou
`npm run seed:reset` (vide tout) dans `backend/api`, à partir de
`frontend/scripts/seed-data.ts`. Mot de passe des comptes : `nora-dev42`.
`./nora.sh` lance le seed automatiquement. En développement sans SMTP, les
nouveaux comptes sont validés d'office (`EMAIL_AUTO_VERIFY`, jamais en
production).

### Badges calculés

Les badges ne sont jamais déclarés par l'utilisateur (`PATCH /app/auth/me`
ignore le champ `badges`) : le serveur les recalcule à partir des données
(`backend/api/src/badges.js`) après chaque action concernée, au démarrage de
l'API et à la fin du seed. Les seuils sont regroupés dans `THRESHOLDS`.

| Badge | Règle |
|---|---|
| Mentor vérifié | profil mentor actif et au moins 1 mentorat terminé |
| Fondateur·rice | a créé un projet en statut `production` |
| Solo Shipper | projet en production sans autre membre dans l'équipe |
| Challenger | au moins 3 challenges réussis (`challenges_won` + soumissions `passed`) |
| Open Source | ses projets cumulent au moins 100 étoiles |
| Architecte | membre d'au moins 3 projets |
| Étoile montante | au moins 50 abonnés gagnés en 30 jours |
| Polyglote | parle au moins 3 langues |

## Marketplace et paiements

Les vendeurs peuvent publier des produits via `POST /products`. Les acheteurs
créent une commande via `POST /orders` avec un provider parmi `card`,
`mtn_momo`, `celtiis`, `wave`, `orange_money` et `moov_money`. Cette route crée
une **intention** de paiement et réserve le stock ; le statut `paid` n'est
appliqué qu'après réception d'un webhook signé sur
`POST /payments/:provider/webhook`. Les événements sont idempotents grâce à
`payment_events`.

NORA ne stocke jamais de numéro de carte, CVV, PIN Mobile Money ou secret
fournisseur. Les intégrations concrètes doivent utiliser les SDK/API officiels
de chaque pays et conserver les secrets dans un gestionnaire dédié. Les comptes
de reversement doivent être vérifiés par le prestataire avant tout payout.

## Capacités plateforme

Le backend inclut également les catalogues dynamiques, flags de fonctionnalités,
annonces, rapports de modération, journal d'audit, gestion des rôles, challenges
avec soumission hashée, opportunités, profils de mentors, demandes de mentorat
et notifications. Les routes d'administration sont sous `/api/v1/admin/*` et
exigent un utilisateur de rôle `admin`.

Le sandbox d'exécution des challenges et les agents IA doivent rester isolés
dans des workers séparés : l'API ne doit jamais exécuter directement du code
soumis par un utilisateur.

## Cryptographie

Les mots de passe sont hachés avec Argon2id et ne sont jamais chiffrés
réversiblement. Les secrets applicatifs doivent être stockés dans un gestionnaire
de secrets et les connexions externes utiliser TLS 1.3. Les données sensibles
au repos utilisent AES-256-GCM avec rotation de clés. ML-KEM est un mécanisme
post-quantique d'échange de clés, pas un algorithme de hachage de mots de passe :
NORA doit rester crypto-agile et pourra activer un hybride X25519 + ML-KEM-768
au niveau du transport quand le fournisseur TLS le supportera.