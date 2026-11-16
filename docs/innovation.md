# NORA : fonctionnalités différenciantes

Ces fonctionnalités prolongent directement la vision de `vision.txt`. Elles sont
pensées pour être démontrables pendant un hackathon, utiles sur mobile et
adaptées aux réalités des développeurs africains.

## Les 10 idées à fort impact

1. **Team Forge** — un développeur décrit une idée, l'algorithme propose des
   coéquipiers selon les compétences, la disponibilité, le pays et le fuseau
   horaire, puis crée automatiquement le groupe, le salon et le dépôt.
2. **Project DNA** — chaque projet produit une fiche de compétences vérifiable
   à partir des commits, issues, challenges réussis et contributions, sans
   réduire la réputation à des likes.
3. **Offline-first Dev Feed** — le fil, les profils et les challenges sont
   consultables hors ligne avec synchronisation différentielle dès que le réseau
   revient ; les médias lourds sont différés.
4. **Africa Mesh** — communautés par pays, ville et diaspora avec événements,
   fuseaux horaires, langues et connectivité locale comme critères de découverte.
5. **AI Pair Room** — un agent IA limité au dépôt et au contexte autorisé par
   l'équipe : explication, tests, revue et plan d'action, avec journal des
   actions et validation humaine avant toute modification.
6. **Proof Challenges** — challenges dont la réussite est attestée par des tests
   cachés, un temps d'exécution et une preuve signée ; le résultat alimente le
   profil vérifiable.
7. **Mentor Circles** — mentorat en petits groupes avec objectifs, créneaux,
   progression et badges de transmission plutôt qu'un simple système de notes.
8. **Opportunity Bridge** — missions locales et internationales filtrées par
   pays, devise et mode de paiement, avec Mobile Money ou paiement différé via
   un prestataire conforme ; aucune donnée bancaire ne transite par NORA.
9. **Trust & Safety Graph** — modération hybride : détection IA explicable,
   signalement humain, appels, réputation des signalements et journal d'audit
   immuable pour les décisions sensibles.
10. **Low-bandwidth Collaboration** — édition texte, discussions et présence
    conçues pour des connexions lentes : compression, pagination stricte,
    reprise après coupure et mode économie de données.

## Ordre de livraison recommandé

### Démonstration hackathon

`Team Forge` + `Project DNA` + `Proof Challenges` + `AI Pair Room` forment le
parcours le plus spectaculaire : partir d'une idée, former une équipe, coder,
prouver la compétence et publier un portfolio crédible.

### Fondations immédiatement après le MVP

`Trust & Safety Graph`, `Africa Mesh`, `Mentor Circles` et
`Low-bandwidth Collaboration` rendent la plateforme durable et sûre.

### Extension business

`Opportunity Bridge` et les paiements Mobile Money doivent être intégrés après
validation juridique, partenaire de paiement et exigences KYC du pays ciblé.

## Exigences non négociables

- L'IA ne peut ni publier, ni exécuter du code privilégié, ni contacter un tiers
  sans consentement explicite et journalisé.
- La réputation expose ses preuves et permet une contestation.
- Toute fonctionnalité temps réel possède un fallback HTTP et pagination.
- Les données sensibles et paiements restent chez des prestataires spécialisés.
- Chaque nouvelle surface est couverte par validation serveur, autorisation
  objet par objet, rate limiting, audit et tests d'intégration.
