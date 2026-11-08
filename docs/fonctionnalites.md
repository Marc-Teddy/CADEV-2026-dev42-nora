# NORA — Vision et inventaire des fonctionnalités

## Vision du projet

> Notre vision
>
> Nous voulons construire la plateforme de référence des développeurs africains : un espace unique qui centralise tout leur quotidien, de l’idée au projet déployé. Chaque développeur y dispose d’un profil vivant qui sert de portfolio, où il publie ses projets pour gagner en visibilité et se faire repérer. La plateforme favorise la collaboration : on peut y proposer des idées de projets pas encore lancés pour trouver des coéquipiers, et échanger en temps réel dans des salons de discussion thématiques ou des espaces privés, à la manière de Discord. Lors d’un hackathon, par exemple, une équipe formée à la volée peut créer son groupe en un clic, ce qui génère automatiquement un espace de travail commun avec un salon, un dépôt de code partagé et un environnement de développement. Car la plateforme intègre aussi son propre hébergement de code, ainsi qu’un éditeur en ligne enrichi d’agents de code IA, pour que chacun puisse construire, tester et itérer directement depuis son navigateur, au rythme des nouvelles façons de développer. Pour stimuler la progression, des challenges de programmation sont proposés par la plateforme comme par les utilisateurs eux-mêmes, avec classements et défis entre pairs. Nous voulons également encourager la transmission : les profils seniors qui partagent leur savoir à travers des articles, des tutoriels ou du mentorat gagnent en réputation et en visibilité grâce à un système de badges et de mise en avant. Un fil d’actualité personnalisé et une newsletter tiennent chaque membre informé des nouveautés de son domaine, des hackathons, des offres et des événements tech du continent. Enfin, une modération assistée par IA, associée à des modérateurs humains, garantit un espace sain où les contenus partagés respectent les règles de la communauté. En résumé : une plateforme pensée par des devs africains, pour les devs africains, qui réunit apprendre, créer, collaborer et se faire connaître au même endroit.
>
> Quelques idées en plus qu´on pourra discuter ensemble, car elles colleraient bien au thème « africain » :
>
> Adaptation au contexte local : une version légère pour les connexions lentes et le mobile, puisqu’une grande partie des devs du continent code ou suit l’actu depuis un téléphone.
>
> Opportunités rémunérées : un espace de missions freelance ou de petits contrats, avec paiement par Mobile Money, ce qui donnerait une vraie raison de revenir sur la plateforme.
>
> Communautés par pays ou par ville : pour organiser des meetups et faire le lien entre l’en ligne et le terrain.
>
> Réputation vérifiable : un score basé sur les projets réels, les challenges réussis et les contributions, utile aux recruteurs qui veulent repérer des talents.

## Fonctionnalités backend actuellement présentes

### 1. Comptes et authentification

- Inscription avec email, username et mot de passe.
- Jeton de confirmation d'e-mail à usage unique avec expiration.
- Envoi SMTP de l'e-mail de confirmation et renvoi contrôlé.
- Connexion bloquée tant que l'adresse e-mail n'est pas confirmée.
- Hachage des mots de passe avec Argon2id.
- Connexion avec limitation de débit dédiée.
- Sessions avec access token JWT court.
- Refresh tokens persistés en PostgreSQL.
- Rotation et révocation des refresh tokens.
- Déconnexion globale.
- Cookies HTTP-only, SameSite et Secure configurable.
- OAuth GitHub avec vérification `state`.
- Gestion des rôles `member`, `moderator` et `admin`.
- Profil personnel, bio, pays, ville et avatar.
- Consultation publique des profils développeurs.

### 2. Portfolio et projets

- Création de projets.
- Description, technologies, dépôt et démonstration.
- Publication publique des projets.
- Liste paginée des projets.
- Association d’un projet à son propriétaire.
- Préparation du portfolio vivant et de la réputation.

### 3. Publications et fil communautaire

- Création de publications.
- Fil public des publications.
- Association des publications à leur auteur.
- Pagination et limitation des résultats.
- Suppression logique prévue par les colonnes `deleted_at`.

### 4. Espaces collaboratifs de type Discord

- Création d’espaces publics ou privés.
- Membres et rôles `owner`, `moderator`, `member`.
- Invitation de membres par username.
- Vérification serveur de l’appartenance à un espace.
- Messages persistés dans PostgreSQL.
- Historique HTTP paginé.
- Messagerie temps réel WebSocket.
- Présence en ligne/hors ligne.
- Événements `ready`, `message`, `presence` et `error`.
- Limite de payload WebSocket.
- Fallback HTTP pour les connexions instables.

### 5. Marketplace

- Création de produits par les utilisateurs.
- Produit numérique ou service représenté par ses métadonnées.
- Titre, description, prix, devise et stock.
- États produit : brouillon, publié, pausé et archivé.
- Publication d’un produit par son vendeur.
- Catalogue public des produits publiés.
- Association vendeur-produit.
- Création de commandes multi-articles.
- Vérification du stock avec verrouillage transactionnel.
- Vérification de la devise des articles.
- Réservation et décrémentation du stock.
- Snapshot du titre et du prix dans la commande.

### 6. Paiements et reversements

- Payment intents persistés.
- Providers prévus : carte bancaire, MTN Mobile Money, Celtiis, Wave,
  Orange Money et Moov Money.
- Webhooks par provider.
- Vérification HMAC des signatures.
- Vérification sur le corps HTTP brut.
- Identifiant d’événement obligatoire.
- Idempotence des événements de paiement.
- Confirmation d’une commande uniquement après webhook fournisseur.
- États `requires_action`, `succeeded`, `failed` et `cancelled`.
- Comptes de reversement par provider et pays.
- Aucun stockage de numéro de carte, CVV, PIN ou secret Mobile Money.

### 7. Challenges de programmation

- Création de challenges.
- Difficultés `beginner`, `intermediate` et `advanced`.
- Fenêtres de début et de fin.
- Tests associés au challenge.
- Publication et consultation des challenges.
- Soumission de code.
- Hash SHA-256 du code soumis.
- Statut de soumission `queued`.
- Préparation pour exécution dans un sandbox séparé.

### 8. Opportunités

- Création d’opportunités.
- Types : emploi, freelance, hackathon, volontariat et cofondateur.
- Opportunités à distance ou localisées.
- Pays de rattachement.
- Informations de rémunération.
- Liste publique des opportunités publiées.

### 9. Mentorat

- Profil mentor.
- Spécialités.
- Langues.
- Disponibilités.
- Tarif horaire et devise.
- Biographie.
- Demandes de mentorat.
- Objectif de la demande.
- États : pending, accepted, declined, completed et cancelled.
- Notification du mentor lors d’une demande.

### 10. Notifications

- Notifications persistées par utilisateur.
- Type et payload JSON.
- Date de lecture.
- Liste des notifications récentes.
- Index utilisateur/date.

### 11. Administration

- Tableau des utilisateurs.
- Changement de rôle.
- Consultation des signalements.
- Résolution des signalements.
- Feature flags activables dynamiquement.
- Règles JSON associées aux feature flags.
- Catalogue dynamique administrable.
- Annonces globales.
- Paramètres plateforme dynamiques.
- Distinction paramètres publics/privés.
- Journal d’audit des actions sensibles.
- Hash de l’adresse IP dans l’audit.
- Gestion de la modération.
- Administration protégée par le rôle `admin`.

### 12. Modération et confiance

- Création de signalements utilisateur.
- Cible typée et identifiée.
- Motif du signalement.
- États de traitement.
- Résolution et modérateur responsable.
- Historique d’audit.
- Base de données prévue pour une modération hybride IA/humaine.

### 13. Robustesse et sécurité

- Validation JSON Schema.
- Rejet des propriétés inattendues sur les entrées sensibles.
- Requêtes PostgreSQL paramétrées.
- Transactions pour les commandes et l’OAuth.
- Rate limiting global et spécifique à l’authentification.
- CORS configurable.
- Helmet.
- Limitation de taille des corps HTTP et WebSocket.
- Journalisation structurée.
- Aucun secret codé en dur.
- Migrations versionnées et réversibles.
- TLS recommandé en production.
- Architecture crypto-agile documentée pour une évolution X25519 + ML-KEM.

### 14. Couverture CRUD

Les ressources exposées par l'API disposent maintenant des opérations adaptées
à leur cycle de vie : création, lecture de liste et de détail, modification et
suppression/archivage lorsque cela est pertinent. Cela couvre les utilisateurs,
projets, posts, espaces, membres, messages, produits, commandes, paiements,
comptes de reversement, challenges, soumissions, opportunités, mentors,
demandes de mentorat, notifications, signalements, catalogue, annonces,
feature flags, paramètres et comptes administrés.

Les opérations sensibles vérifient l'identité, le rôle et la propriété de
l'objet dans la requête SQL. Les données financières et les décisions de
modération conservent leur historique au lieu d'être supprimées aveuglément.

## Migrations disponibles

- `001_initial.js` : utilisateurs, refresh tokens, OAuth, projets et posts.
- `002_collaboration.js` : espaces, membres et messages.
- `003_platform.js` : marketplace, paiements, administration, challenges,
  opportunités, notifications et modération.
- `004_mentorship.js` : profils mentors et demandes de mentorat.

## Fonctionnalités prévues mais pas encore entièrement implémentées

Les éléments suivants sont dans la vision ou la roadmap, mais nécessitent encore
des modules dédiés :

- Team Forge avec matching automatique d’équipe.
- Project DNA et réputation calculée à partir de preuves.
- Hébergement de code intégré.
- Dépôts partagés créés automatiquement.
- Environnements de développement à la demande.
- Éditeur en ligne.
- Agents IA de programmation.
- Exécution sécurisée des challenges avec tests cachés.
- Classements et défis entre pairs.
- Articles et tutoriels.
- Badges et mise en avant.
- Fil d’actualité personnalisé.
- Newsletter.
- Communautés par pays et par ville.
- Meetups et événements.
- Mode offline-first complet.
- Synchronisation différentielle.
- Modération IA explicable.
- Système d’appel des décisions de modération.
- Paiements réels branchés aux APIs officielles de chaque provider.
- KYC et reversements réellement validés par les prestataires.

## Règle de livraison

Toute nouvelle fonctionnalité doit disposer d’une migration si elle persiste des
données, d’une validation serveur, d’une autorisation objet par objet, d’un
rate limiting adapté, d’un audit pour les actions sensibles et de tests
d’intégration avant fusion vers `develop`.

## Outillage de validation

- Tests Node natifs dans `backend/test/unit` et `backend/test/integration`.
- Vérification que chaque migration expose `up` et `down`.
- Vérification de configuration avec `npm run check:env`.
- Lint couvrant le code, les tests et les scripts.
- Test de charge local configurable avec `npm run loadtest`.
- Scénario k6 avec seuils d’erreur, p95 et p99 dans `backend/loadtest/smoke.js`.
- Workflow CI GitHub avec PostgreSQL, migrations, lint et tests.
- Workflow sécurité avec audit des dépendances et détection de secrets.
- Workflow de validation rollback/réapplication des migrations.
- Publication d’image Docker versionnée par SHA dans GHCR.
- Déploiement manuel sous environnement GitHub protégé.
- Contrat de sauvegarde quotidienne avec secrets hors dépôt et restauration à
  vérifier dans un environnement isolé.

## Extensibilité des nouvelles fonctionnalités

Les fonctionnalités avancées disposent d'un registre contrôlé (`GET /features`)
et d'un CRUD versionné (`/features/:feature`) pour les hackathons, Team Forge,
ideas, guildes, réputation, passeport, badges, apprentissage, duels, reviews,
classes, certificats, escrow, jalons, tips, bounties, subventions, datasets,
meetups, ambassadeurs, KYC, fraude, crise, voix, traduction, IA, déploiement,
dépôts et environnements.

Chaque document possède une version, un historique de révisions et un événement
outbox transactionnel. Les adapters de paiement et d'IA sont remplaçables :
les implementations mock refusent de simuler un paiement réel et permettent
de développer/tester avant l'ajout des credentials fournisseurs.
