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