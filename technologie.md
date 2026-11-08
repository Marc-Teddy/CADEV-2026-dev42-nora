# NORA 🚀
### La plateforme de référence des développeurs africains

**NORA** est une plateforme conçue pour réunir les développeurs africains dans un espace unique où ils peuvent présenter leurs compétences, partager leurs projets, collaborer avec d'autres développeurs et exploiter l'intelligence artificielle pour progresser.

Développée par l'équipe **dev42** dans le cadre de la **Coupe d'Afrique des développeurs (CADEV) 2026**, NORA ambitionne de faciliter les échanges, la visibilité et la collaboration au sein de la communauté des développeurs africains.

---

## 🎯 Vision du projet

Notre objectif est de construire une plateforme qui accompagne les développeurs de l'idée au projet réalisé.

NORA permettra notamment de :

- 👤 **Créer un profil développeur** : présenter ses compétences, ses expériences et ses réalisations.
- 💻 **Partager ses projets** : publier ses réalisations et gagner en visibilité.
- 🤝 **Collaborer** : proposer des idées et trouver des développeurs avec qui les concrétiser.
- 🌍 **Rejoindre une communauté** : échanger avec d'autres développeurs et partager des connaissances.
- 🤖 **Utiliser l'intelligence artificielle** : bénéficier d'une assistance pour comprendre, générer et améliorer du code.
- 🏆 **Relever des défis** : participer à des challenges et valoriser ses compétences.

Ces fonctionnalités constituent la vision globale du projet. Leur présence dans le MVP dépendra des priorités définies collectivement par l'équipe.

---

## 🛠️ Technologies envisagées

La stack technique proposée privilégie les performances, la maintenabilité, la sécurité et la facilité de déploiement.

| Composant | Technologie envisagée | Rôle |
|---|---|---|
| Frontend | React + TypeScript + Vite | Interface utilisateur |
| Styles | Tailwind CSS | Interface responsive |
| Composants UI | shadcn/ui | Composants accessibles et personnalisables |
| Backend | Go | Logique métier et API principales |
| API | REST + JSON + OpenAPI | Communication entre les composants |
| Base de données | PostgreSQL | Stockage et gestion des données |
| Service IA | Python + FastAPI | Orchestration des fonctionnalités IA |
| Modèle IA | API d'un modèle spécialisé en code | Génération, explication et correction de code |
| Environnement | Docker Compose | Reproductibilité de l'environnement de développement |
| Versionnement | Git + GitHub | Collaboration et gestion du code |

**Important :** ces technologies constituent la stack proposée. Les choix définitifs, les versions et les dépendances doivent être validés par l'équipe avant l'implémentation.

---

## 🏗️ Architecture du projet

NORA s'appuie sur une architecture modulaire composée de trois parties principales.

```text
NORA/
├── frontend/       # Interface utilisateur
├── backend/
│   └── api/        # API et logique métier
├── ai-service/     # Service d'intelligence artificielle
├── docs/           # Documentation technique
├── tests/          # Tests du projet
├── scripts/        # Scripts d'automatisation
├── .env.example    # Exemple de variables d'environnement
├── .gitignore      # Fichiers ignorés par Git
└── README.md       # Présentation du projet
```

### Frontend

Le frontend gère l'interface utilisateur, la navigation, les profils, les publications et les interactions avec la plateforme.

L'interface doit être **responsive**, accessible et adaptée aux téléphones, tablettes et ordinateurs.

### Backend

Le backend centralise la logique métier, l'authentification, les permissions et les opérations sur les données.

Il expose les API utilisées par le frontend et coordonne les interactions nécessaires avec le service IA.

### Service IA

Le service IA gère les interactions avec les modèles d'intelligence artificielle et fournit les fonctionnalités d'assistance au développement.

Les clés API et les informations sensibles doivent rester côté serveur.

### Base de données

PostgreSQL constitue la base de données principale envisagée pour gérer les utilisateurs, les projets, les publications, les candidatures et les autres données relationnelles.

---

## 📱 Responsivité et accessibilité

NORA doit être utilisable depuis différents appareils et différentes tailles d'écran.

Les principes retenus sont :

- Une approche de conception *mobile-first*.
- Une interface adaptée aux écrans tactiles.
- Des composants réutilisables.
- Une optimisation des images et des ressources.
- Une attention particulière aux performances sur les appareils peu puissants.
- Des tests sur plusieurs tailles d'écran et navigateurs.

L'objectif est de proposer une expérience cohérente sans exiger une machine puissante du côté de l'utilisateur.

---

## 🔒 Sécurité et bonnes pratiques

La sécurité fait partie intégrante du développement de NORA.

Les règles suivantes doivent être respectées :

- Ne jamais publier de mots de passe, de clés API ou d'autres secrets dans le dépôt.
- Ne jamais versionner un fichier `.env` contenant des informations sensibles.
- Utiliser `.env.example` pour documenter les variables nécessaires.
- Vérifier les autorisations côté serveur.
- Valider les données reçues par les API.
- Protéger les comptes et les données des utilisateurs.
- Encadrer les appels aux services IA et limiter les usages abusifs.
- Effectuer des tests avant chaque intégration importante.

---

## 🌿 Organisation Git

Le développement est organisé autour de trois types de branches.

| Branche | Rôle |
|---|---|
| `main` | Version stable du projet |
| `develop` | Intégration des fonctionnalités |
| `feature/*` | Développement des fonctionnalités |

Les branches de travail actuellement prévues sont :

- `feature/frontend-core` — Yannick
- `feature/community` — Morayo
- `feature/backend-api` — Promis
- `feature/ai-assistant` — Exaucé
- `feature/platform-integration` — Teddy

### Cycle de contribution

1. Récupérer les dernières modifications de `develop`.
2. Travailler sur sa branche dédiée.
3. Tester ses changements.
4. Créer des commits explicites.
5. Envoyer sa branche sur GitHub.
6. Ouvrir une Pull Request vers `develop`.
7. Faire vérifier les changements avant la fusion.

La branche `main` doit rester stable. Les règles détaillées sont décrites dans [`docs/git-workflow.md`](docs/git-workflow.md).

---

## 🗓️ Calendrier du projet

| Échéance | Objectif |
|---|---|
| 27 octobre 2026 | Organisation technique et décisions d'architecture |
| 28 octobre – 3 novembre 2026 | Développement des fonctionnalités prioritaires |
| 4 – 6 novembre 2026 | Intégration, tests et corrections |
| **7 novembre 2026** | **Livraison prévue du MVP** |
| 8 – 14 novembre 2026 | Stabilisation et préparation de la démonstration |
| **15 novembre 2026** | **Démonstration finale** |

Ce calendrier constitue un objectif de travail à ajuster selon l'avancement réel de l'équipe.

---

## 👥 Équipe de développement

**Équipe : dev42**

| Membre | Responsabilité principale |
|---|---|
| Yannick | Frontend principal |
| Morayo | Communauté et fonctionnalités sociales |
| Promis | Backend et base de données |
| Exaucé | Intelligence artificielle |
| Teddy | Architecture et intégration technique |

---

## 🚀 État du projet

Le projet est actuellement en phase d'organisation technique et de préparation du développement.

Les prochaines étapes sont :

- [ ] Valider la stack technologique.
- [ ] Définir précisément le périmètre du MVP.
- [ ] Concevoir le schéma de la base de données.
- [ ] Définir les contrats des API.
- [ ] Tester le modèle d'IA retenu.
- [ ] Préparer l'environnement de développement.
- [ ] Développer et intégrer les fonctionnalités prioritaires.
- [ ] Tester la responsivité et les performances.
- [ ] Déployer une première version fonctionnelle.

Les cases seront mises à jour au fur et à mesure de l'avancement du projet.

---

## 🤝 Contribution

Toute contribution doit respecter le workflow Git défini par l'équipe.

Avant de commencer une fonctionnalité, chaque membre doit :

1. Consulter les tâches qui lui sont attribuées.
2. Vérifier les éventuelles dépendances avec les autres parties.
3. Communiquer les changements d'interface ou de contrat nécessaires.
4. Tester son travail avant de proposer une fusion.

L'objectif est de maintenir une base de code cohérente et de faciliter l'intégration entre les différentes parties.

---

## 📄 Licence

La licence du projet sera définie collectivement avant toute publication officielle du code.

---

### Built to Win 🏆

**NORA — Construire la plateforme d'échange africaine, pour les développeurs, par les développeurs.**

Développé avec détermination par **dev42**, dans le cadre de la CADEV 2026.s