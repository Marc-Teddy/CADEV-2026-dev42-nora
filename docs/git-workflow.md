# Git Workflow — NORA

**Projet :** NORA  
**Équipe :** dev42  
**Compétition :** CADEV 2026  
**Slogan :** Built to Win

---

## 1. Objectif

Ce document définit les règles de gestion du dépôt Git de NORA.

Il a pour objectif de :
- Organiser le travail des membres de l'équipe.
- Séparer le développement des différentes fonctionnalités.
- Faciliter l'intégration du code.
- Limiter les conflits entre les développeurs.
- Maintenir une version stable et fonctionnelle de la plateforme.

Tous les membres de l'équipe doivent respecter ces règles.

---

## 2. Organisation des branches

Le dépôt utilise trois niveaux de branches :

- `main` : contient les versions stables du projet.
- `develop` : rassemble les fonctionnalités développées et sert à leur intégration et à leurs tests.
- `feature/*` : contient le travail individuel sur les fonctionnalités.

### 2.1. Branche `main`

**Rôle :** conserver une version stable et présentable de NORA.

Règles :
- Aucun développement direct sur cette branche.
- Les modifications sont intégrées depuis `develop`.
- Les fonctionnalités doivent être testées avant leur intégration.
- Cette branche sert de référence pour les versions présentées au jury.

### 2.2. Branche `develop`

**Rôle :** centraliser les fonctionnalités développées par l'équipe avant leur publication dans `main`.

Règles :
- Les membres ne travaillent pas directement sur cette branche.
- Les fonctionnalités y sont intégrées par Pull Request.
- Les problèmes d'intégration doivent être corrigés avant la publication d'une version stable.
- Les modifications intégrées doivent être vérifiées régulièrement.

### 2.3. Branches `feature/*`

**Rôle :** permettre à chaque membre de développer sa partie du projet indépendamment des autres.

Chaque branche doit correspondre à une responsabilité clairement définie.

---

## 3. Répartition des branches

| Branche | Responsable | Responsabilités |
|---|---|---|
| `main` | Toute l'équipe, intégration supervisée par Teddy | Version stable de NORA |
| `develop` | Toute l'équipe, intégration supervisée par Teddy | Intégration et tests des fonctionnalités |
| `feature/frontend-core` | Yannick | Interfaces principales, profils développeurs, fil d'actualité et affichage des projets |
| `feature/community` | Morayo | Espaces communautaires, recherche, collaboration, challenges, classements et interface administrateur |
| `feature/backend-api` | Promis | Backend, base de données, API, authentification, profils, projets et sécurité |
| `feature/ai-assistant` | Exaucé | Assistant IA et fonctionnalités d'intelligence artificielle |
| `feature/platform-integration` | Teddy | Intégration technique, notifications, tests d'intégration et déploiement |

### Responsabilités transversales

- Yannick et Morayo doivent coordonner leurs modifications du frontend.
- Promis doit communiquer les contrats d'API aux développeurs frontend et IA.
- Exaucé doit documenter les besoins et les interfaces de son service IA.
- Teddy coordonne l'intégration des différents modules et aide à résoudre les problèmes techniques.

Les responsabilités pourront évoluer selon les besoins du projet.

---

## 4. Cycle de développement

Le fonctionnement général est le suivant :

```text
                 main
                   |
                   | version stable
                   |
                develop
                   |
          Intégration et tests
                   |
        +----------+----------+
        |          |          |
     feature    feature    feature
     frontend   backend       IA
        |
   Développement
        |
   Pull Request
        |
      develop
        |
   Tests et validation
        |
        v
       main
```

### Étape 1 : récupérer les dernières modifications

Avant de commencer un travail, chaque membre doit mettre à jour les informations de son dépôt local.

```bash
git fetch origin
```

Cette commande récupère les références des branches distantes sans modifier automatiquement le contenu de la branche locale courante.

### Étape 2 : se placer sur sa branche

Exemple pour Yannick :

```bash
git switch feature/frontend-core
```

Si la branche locale n'existe pas encore :

```bash
git switch --track origin/feature/frontend-core
```

Chaque membre doit travailler sur sa propre branche de fonctionnalité.

### Étape 3 : développer et enregistrer les modifications

Après avoir effectué des modifications :

```bash
git status
git add .
git commit -m "feat: add developer profiles"
```

Le message de commit doit décrire clairement les changements effectués.

### Étape 4 : envoyer les modifications sur GitHub

```bash
git push
```

Lors du premier envoi d'une branche locale qui n'a pas encore de branche distante associée, utiliser :

```bash
git push -u origin nom-de-la-branche
```

### Étape 5 : ouvrir une Pull Request

Sur GitHub, le développeur ouvre une Pull Request :

- **Base :** `develop`
- **Compare :** sa branche `feature/*`

La Pull Request doit expliquer les modifications apportées et signaler les éventuels problèmes connus.

### Étape 6 : vérifier et intégrer

Avant la fusion, il faut :
- Vérifier les changements.
- S'assurer que le code est cohérent avec l'architecture du projet.
- Tester les fonctionnalités concernées.
- Vérifier que les modifications ne cassent pas les fonctionnalités existantes.
- Résoudre les conflits éventuels.

Une fois validée, la Pull Request peut être fusionnée dans `develop`.

### Étape 7 : publier une version stable

Lorsque les fonctionnalités intégrées ont été testées et que le projet est suffisamment stable, une Pull Request permet de fusionner `develop` dans `main`.

La branche `main` ne doit contenir que des versions que l'équipe est prête à présenter ou à déployer.

---

## 5. Convention de nommage des branches

Les branches de fonctionnalités utilisent le préfixe `feature/`.

Format :

```text
feature/nom-fonctionnalite
```

Exemples :

```text
feature/frontend-core
feature/community
feature/backend-api
feature/ai-assistant
feature/platform-integration
```

Pour les développements futurs, des branches plus spécifiques pourront être créées lorsqu'une fonctionnalité nécessite un travail indépendant.

Exemples :

```text
feature/user-authentication
feature/developer-profiles
feature/project-publication
feature/notification-system
```

Ces branches spécifiques doivent également être intégrées dans `develop` par Pull Request.

---

## 6. Convention de nommage des commits

Les commits doivent être courts, explicites et rédigés de préférence en anglais.

Format recommandé :

```text
type: description
```

Types courants :

| Type | Utilisation |
|---|---|
| `feat` | Ajout d'une fonctionnalité |
| `fix` | Correction d'un bug |
| `docs` | Modification de la documentation |
| `refactor` | Réorganisation du code sans changement fonctionnel attendu |
| `test` | Ajout ou modification de tests |
| `chore` | Configuration et tâches de maintenance |

Exemples :

```bash
git commit -m "feat: add user authentication"
git commit -m "fix: correct project publication"
git commit -m "docs: update API documentation"
git commit -m "chore: initialize project structure"
```

Un commit doit idéalement correspondre à un ensemble cohérent de modifications.

---

## 7. Gestion des conflits

Des conflits peuvent survenir lorsque plusieurs membres modifient les mêmes fichiers.

Pour les limiter :

1. Communiquer avant de modifier un composant partagé.
2. Éviter de travailler simultanément sur les mêmes fichiers sans coordination.
3. Récupérer régulièrement les dernières modifications utiles.
4. Lire attentivement les conflits signalés par Git.
5. Tester le code après leur résolution.

Si un conflit survient pendant l'intégration d'une Pull Request, les membres concernés doivent collaborer pour le résoudre proprement.

---

## 8. Règles de sécurité

Les règles suivantes sont obligatoires :

- Ne jamais envoyer de mots de passe, de clés API ou de jetons d'accès dans le dépôt.
- Ne jamais versionner un fichier `.env` contenant des secrets.
- Utiliser `.env.example` pour documenter les variables nécessaires, sans valeurs secrètes.
- Vérifier les fichiers avant chaque commit.
- Ne pas contourner les protections des branches.
- Ne pas fusionner du code non testé dans `main`.

---

## 9. Règles de collaboration

Chaque membre s'engage à :

- Travailler sur la branche correspondant à sa responsabilité.
- Envoyer régulièrement ses modifications sur GitHub.
- Rédiger des commits explicites.
- Ouvrir des Pull Requests pour intégrer son travail.
- Signaler rapidement les blocages techniques.
- Communiquer les changements susceptibles d'affecter les autres modules.
- Maintenir sa documentation à jour lorsque cela est nécessaire.

Teddy coordonne l'intégration technique, mais chaque responsable reste chargé de la qualité du code de son module.

---

## 10. Résumé

| Élément | Règle |
|---|---|
| Branche stable | `main` |
| Branche d'intégration | `develop` |
| Développement individuel | `feature/*` |
| Intégration du code | Pull Request vers `develop` |
| Publication stable | Pull Request de `develop` vers `main` |
| Développement direct sur `main` | Interdit |
| Développement direct sur `develop` | À éviter |
| Secrets dans Git | Interdits |
| Tests avant publication | Obligatoires |

**Objectif final :** maintenir un dépôt organisé, un développement collaboratif efficace et une version fonctionnelle de NORA pour la CADEV 2026.