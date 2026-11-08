# Service IA — NORA

Service d'assistance au code de **NORA** (équipe **dev42**, CADEV 2026).
Il expose une API HTTP consommée par le backend et s'appuie sur un fournisseur
de modèle spécialisé en code compatible OpenAI (`/chat/completions`).

Responsable : **Exaucé** — branche `feature/ai-assistant`.

## Fonctionnalités

- **Expliquer** un extrait de code (`/v1/explain`).
- **Générer** du code à partir d'une demande en langage naturel (`/v1/generate`).
- **Corriger** un bug et expliquer sa cause racine (`/v1/fix`).

Le service est volontairement sans état : l'historique de conversation, s'il est
nécessaire, reste géré par le backend.

## Architecture

```text
ai-service/
├── app/
│   ├── main.py             # application FastAPI, /health, gestion d'erreurs
│   ├── config.py           # réglages via variables d'environnement
│   ├── schemas.py          # contrats d'entrée/sortie (Pydantic)
│   ├── prompts.py          # prompts système et utilisateur
│   ├── security.py         # clé interne partagée avec le backend
│   ├── rate_limit.py       # limitation de débit en mémoire
│   ├── deps.py             # dépendances FastAPI
│   ├── routers/assistant.py
│   └── services/llm.py     # client OpenAI-compatible
├── tests/                  # tests pytest (fournisseur simulé)
├── Dockerfile
├── requirements.txt
└── requirements-dev.txt
```

## Contrat d'API

Toutes les routes `/v1/*` exigent l'en-tête `X-Internal-Key` lorsque
`INTERNAL_API_KEY` est défini. Les réponses d'erreur ont la forme
`{"detail": "message"}`.

### `GET /health`

```json
{
  "status": "ok",
  "service": "NORA AI Service",
  "version": "0.1.0",
  "environment": "development",
  "model": "deepseek-coder"
}
```

### `POST /v1/explain`

```json
{
  "code": "def add(a, b):\n    return a + b",
  "language": "python",
  "detail_level": "intermediate",
  "answer_language": "fr"
}
```

| Champ | Obligatoire | Valeurs |
|---|---|---|
| `code` | oui | 1 à 20 000 caractères |
| `language` | non | ex. `python`, `go`, `typescript` |
| `detail_level` | non | `beginner`, `intermediate` (défaut), `expert` |
| `answer_language` | non | `fr` (défaut) ou `en` |

### `POST /v1/generate`

```json
{
  "prompt": "Écris une fonction qui pagine une liste",
  "language": "go",
  "context": "Le projet utilise net/http",
  "answer_language": "fr"
}
```

`prompt` : 3 à 4 000 caractères ; `context` : 8 000 caractères maximum.

### `POST /v1/fix`

```json
{
  "code": "print(total)",
  "error": "NameError: name 'total' is not defined",
  "language": "python",
  "context": "total est calculé plus haut dans la fonction",
  "answer_language": "fr"
}
```

`error` et `context` : 4 000 et 8 000 caractères maximum.

### Réponse commune

```json
{
  "content": "…réponse du modèle…",
  "model": "deepseek-coder",
  "usage": { "prompt_tokens": 120, "completion_tokens": 300, "total_tokens": 420 }
}
```

`usage` peut être `null` selon le fournisseur.

### Codes d'erreur

| Code | Signification |
|---|---|
| `401` | `X-Internal-Key` absent ou invalide |
| `422` | Corps de requête invalide (champ manquant, trop long, inconnu) |
| `429` | Limite de débit atteinte (`Retry-After` fourni) |
| `502` | Fournisseur IA en erreur ou réponse invalide |
| `503` | Clé du fournisseur absente ou fournisseur en limite de débit |
| `504` | Délai dépassé côté fournisseur |

## Configuration

Les variables sont lues dans l'environnement puis dans `ai-service/.env`.
Ne jamais versionner `.env`.

| Variable | Défaut | Rôle |
|---|---|---|
| `LLM_API_KEY` | — | Clé du fournisseur IA (obligatoire en usage réel) |
| `LLM_BASE_URL` | `https://api.deepseek.com/v1` | URL compatible OpenAI |
| `LLM_MODEL` | `deepseek-coder` | Modèle utilisé |
| `LLM_TIMEOUT_SECONDS` | `60` | Délai maximum par appel |
| `LLM_MAX_TOKENS` | `2048` | Longueur maximale de la réponse |
| `LLM_TEMPERATURE` | `0.2` | Température de génération |
| `INTERNAL_API_KEY` | vide | Clé partagée avec le backend ; vide = auth désactivée (développement uniquement) |
| `RATE_LIMIT_PER_MINUTE` | `20` | Requêtes autorisées par client et par minute |
| `DEFAULT_ANSWER_LANGUAGE` | `fr` | Langue de réponse par défaut |
| `ENVIRONMENT` | `development` | Indiqué dans `/health` |

## Lancer en local

```bash
cd ai-service
cp ../.env.example .env      # puis renseigner LLM_API_KEY et INTERNAL_API_KEY
uv venv .venv
uv pip install --python .venv/bin/python -r requirements-dev.txt
.venv/bin/uvicorn app.main:app --reload
```

Documentation interactive : <http://localhost:8000/docs>.

## Tests

```bash
cd ai-service
.venv/bin/pytest
```

Les tests simulent le fournisseur IA : aucune clé ni appel réseau n'est requis.

## Docker

```bash
cd ai-service
docker build -t nora-ai-service .
docker run --rm --env-file ../.env -p 8000:8000 nora-ai-service
```

Le conteneur expose `8000` et possède un `HEALTHCHECK` sur `/health`.

## Intégration avec le backend

- URL interne (Docker Compose) : `http://ai-service:8000`.
- En-tête obligatoire : `X-Internal-Key: $INTERNAL_API_KEY`.
- Prévoir un délai client supérieur à `LLM_TIMEOUT_SECONDS` et gérer `429`,
  `502`, `503` et `504`.
- Les clés du fournisseur IA restent exclusivement dans ce service.

## Limites connues et suites

- Limitation de débit en mémoire : mono-processus. Une implémentation Redis sera
  nécessaire si le service est répliqué.
- Pas encore de streaming ni d'historique conversationnel.
- Les prompts sont en anglais et demandent une réponse en français ou anglais.
- À faire : choisir et tester le modèle définitif, ajouter des métriques et une
  trace des coûts, brancher le backend et le déploiement Compose.
