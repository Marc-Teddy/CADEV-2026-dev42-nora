# NORA backend

API Fastify/Node.js 20 avec PostgreSQL. Les migrations sont dans `../../db/migrations`.

```powershell
Copy-Item .env.example .env
npm install
npm run migrate:up
npm run dev
```

Pour Docker, le contexte de build est la racine du dépôt :

```powershell
Copy-Item backend\api\.env.example backend\api\.env
docker compose up --build -d
```

Swagger est disponible sur `/docs`.

### Confirmation e-mail

L'inscription nécessite un envoi SMTP configuré. Renseignez `SMTP_HOST`,
`SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM`,
`EMAIL_VERIFICATION_URL` et `EMAIL_VERIFICATION_TTL`. Le compte est créé dans
une transaction avec un jeton à usage unique ; si l'envoi échoue, la
transaction est annulée. Les routes de confirmation sont
`POST /auth/verify-email` et `POST /auth/resend-verification`.

## Qualité et charge

```powershell
npm run check:env
npm test
npm run lint
npm run loadtest
```

Le script `loadtest` cible `/health` par défaut et accepte
`LOADTEST_URL`, `LOADTEST_DURATION_MS`, `LOADTEST_CONCURRENCY` et
`LOADTEST_ENDPOINT`. Il doit être lancé contre une instance démarrée :

```powershell
$env:LOADTEST_URL="http://127.0.0.1:8080"; npm run loadtest
```

Pour un test de charge CI plus complet, le scénario `loadtest/smoke.js` est
compatible avec k6 et mesure les seuils d'erreur, p95 et p99.

Le workflow GitHub applique automatiquement les migrations sur PostgreSQL,
puis exécute le lint et les tests. Les secrets de production ne sont jamais
placés dans le dépôt : utilisez un gestionnaire de secrets CI et copiez
`.env.example` vers `.env` uniquement en local.

## Workflows opérationnels

- `backend-ci.yml` : PostgreSQL, migrations, lint et tests.
- `migration-check.yml` : migration complète, rollback puis réapplication.
- `security.yml` : audit des dépendances et recherche de secrets.
- `container.yml` : image GHCR immuable par SHA.
- `deploy.yml` : déclenchement manuel avec environnement GitHub protégé et
  interdiction du tag mutable `latest`.
- `backup.yml` : contrat de sauvegarde quotidienne ; configurez
  `DATABASE_URL` et `BACKUP_COMMAND` dans l'environnement GitHub. La commande
  doit chiffrer le dump, appliquer une rétention et vérifier périodiquement la
  restauration dans un environnement isolé.

Principes de sécurité : mots de passe Argon2id, tokens en cookies HTTP-only,
rotation et révocation des refresh tokens, validation JSON Schema, rate limiting,
CORS explicite, Helmet et absence de secrets dans les logs.