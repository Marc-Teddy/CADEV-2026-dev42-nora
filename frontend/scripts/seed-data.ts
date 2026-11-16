/* ============================================================
   NORA — Données de démonstration
   Ces données imitent la future API backend Go (REST + JSON).
   Voir lib/api.ts : remplacer les résolveurs mockés par des fetch.
   ============================================================ */

import type {
  Dev, Project, Post, Channel, ChatMessage, Challenge, LeaderRow, Mission, Hackathon,
} from "../src/lib/types";

export const CURRENT_USER = "theoah";

/* ---------- Développeurs ---------- */
export const devs: Dev[] = [
  {
    id: "d1", name: "Théo Ahouansou", username: "theoah", role: "Fullstack · Frontend",
    city: "Cotonou", country: "Bénin", flag: "🇧🇯",
    bio: "Je construis des interfaces qui donnent envie de coder. Obsédé par les détails, les animations et la performance mobile.",
    skills: [{ name: "React", level: 92 }, { name: "TypeScript", level: 88 }, { name: "Tailwind CSS", level: 95 }, { name: "Next.js", level: 84 }, { name: "Go", level: 62 }],
    reputation: 2840, badges: [{ kind: "star", label: "Étoile montante" }, { kind: "challenger", label: "Challenger" }, { kind: "polyglote", label: "Polyglote" }],
    projectsCount: 8, followers: 412, following: false, online: true, availability: "hackathon",
    gradient: ["#8b5cf6", "#2dd4a0"], articles: 6, challengesWon: 9, langs: ["Français", "Anglais", "Fon"],
    joined: "janv. 2026",
  },
  {
    id: "d2", name: "Amadou Diallo", username: "amadoud", role: "DevOps · SRE",
    city: "Dakar", country: "Sénégal", flag: "🇸🇳",
    bio: "Kubernetes, CI/CD et déploiements qui tiennent la charge — même sur des serveurs solaires.",
    skills: [{ name: "Go", level: 90 }, { name: "Docker", level: 93 }, { name: "Kubernetes", level: 86 }, { name: "Terraform", level: 78 }, { name: "PostgreSQL", level: 80 }],
    reputation: 6120, badges: [{ kind: "mentor", label: "Mentor vérifié" }, { kind: "architect", label: "Architecte" }, { kind: "opensource", label: "Open Source" }],
    projectsCount: 21, followers: 2860, following: true, online: true, availability: "mentorat",
    gradient: ["#0f9d77", "#0f9d77"], articles: 14, challengesWon: 3, langs: ["Français", "Wolof", "Anglais"],
    joined: "août 2025",
  },
  {
    id: "d3", name: "Chidi Okafor", username: "chidiok", role: "Backend · Go",
    city: "Lagos", country: "Nigeria", flag: "🇳🇬",
    bio: "APIs ultra-rapides, files de messages et paiements. Si ça n'est pas testé, ça n'est pas fini.",
    skills: [{ name: "Go", level: 94 }, { name: "gRPC", level: 82 }, { name: "PostgreSQL", level: 88 }, { name: "Redis", level: 76 }, { name: "Rust", level: 58 }],
    reputation: 5480, badges: [{ kind: "solo", label: "Solo Shipper" }, { kind: "architect", label: "Architecte" }],
    projectsCount: 17, followers: 1944, following: false, online: false, availability: "missions",
    gradient: ["#2dd4a0", "#22d3ee"], articles: 9, challengesWon: 5, langs: ["Anglais", "Igbo"],
    joined: "sept. 2025",
  },
  {
    id: "d4", name: "Aïcha Traoré", username: "aichatr", role: "Data / IA",
    city: "Bamako", country: "Mali", flag: "🇲🇱",
    bio: "NLP pour les langues du continent : bambara, wolof, fon. Les données locales valent de l'or.",
    skills: [{ name: "Python", level: 92 }, { name: "FastAPI", level: 84 }, { name: "PyTorch", level: 79 }, { name: "Pandas", level: 90 }, { name: "SQL", level: 85 }],
    reputation: 4310, badges: [{ kind: "mentor", label: "Mentor vérifié" }, { kind: "polyglote", label: "Polyglote" }, { kind: "challenger", label: "Challenger" }],
    projectsCount: 12, followers: 1610, following: false, online: true, availability: "mentorat",
    gradient: ["#34e3b5", "#2dd4a0"], articles: 18, challengesWon: 7, langs: ["Français", "Bambara", "Anglais"],
    joined: "oct. 2025",
  },
  {
    id: "d5", name: "Kwame Mensah", username: "kwamem", role: "Mobile · Flutter",
    city: "Accra", country: "Ghana", flag: "🇬🇭",
    bio: "Mobile-first, offline-first. Mes apps survivent aux coupures réseau — c'est le vrai spec du continent.",
    skills: [{ name: "Flutter", level: 93 }, { name: "Dart", level: 90 }, { name: "Firebase", level: 82 }, { name: "React", level: 70 }],
    reputation: 3960, badges: [{ kind: "solo", label: "Solo Shipper" }, { kind: "star", label: "Étoile montante" }],
    projectsCount: 14, followers: 1275, following: false, online: true, availability: "missions",
    gradient: ["#0f9d77", "#2dd4a0"], articles: 7, challengesWon: 4, langs: ["Anglais", "Twi"],
    joined: "nov. 2025",
  },
  {
    id: "d6", name: "Fatou Ndiaye", username: "fatound", role: "Product Engineer",
    city: "Thiès", country: "Sénégal", flag: "🇸🇳",
    bio: "Du prototype au produit. J'aime les équipes qui livrent chaque semaine et les users qui sourient.",
    skills: [{ name: "React", level: 86 }, { name: "Next.js", level: 81 }, { name: "UX Design", level: 75 }, { name: "Node.js", level: 78 }, { name: "GraphQL", level: 72 }],
    reputation: 3240, badges: [{ kind: "founder", label: "Fondatrice" }, { kind: "challenger", label: "Challenger" }],
    projectsCount: 10, followers: 990, following: false, online: false, availability: "hackathon",
    gradient: ["#8b5cf6", "#0f9d77"], articles: 5, challengesWon: 2, langs: ["Français", "Wolof", "Anglais"],
    joined: "déc. 2025",
  },
  {
    id: "d7", name: "Kofi Boateng", username: "kofib", role: "Sécurité",
    city: "Abidjan", country: "Côte d'Ivoire", flag: "🇨🇮",
    bio: "Red team à Abidjan. Je casse les apps avant que les autres ne le fassent.",
    skills: [{ name: "Pentest", level: 89 }, { name: "Go", level: 74 }, { name: "Python", level: 80 }, { name: "Linux", level: 92 }],
    reputation: 4590, badges: [{ kind: "mentor", label: "Mentor vérifié" }, { kind: "architect", label: "Architecte" }],
    projectsCount: 9, followers: 1780, following: false, online: false, availability: "occupe",
    gradient: ["#6d28d9", "#8b5cf6"], articles: 11, challengesWon: 8, langs: ["Français", "Anglais", "Baoulé"],
    joined: "juil. 2025",
  },
  {
    id: "d8", name: "Wanjiku Kamau", username: "wanjikuk", role: "Cloud · AI Infra",
    city: "Nairobi", country: "Kenya", flag: "🇰🇪",
    bio: "MLOps et GPU budgets serrés. Je rends l'IA possible avec ce qu'on a déjà.",
    skills: [{ name: "Python", level: 88 }, { name: "Kubernetes", level: 84 }, { name: "AWS", level: 80 }, { name: "PyTorch", level: 82 }],
    reputation: 5120, badges: [{ kind: "architect", label: "Architecte" }, { kind: "opensource", label: "Open Source" }, { kind: "mentor", label: "Mentor vérifié" }],
    projectsCount: 16, followers: 2240, following: false, online: true, availability: "mentorat",
    gradient: ["#0f9d77", "#0f9d77"], articles: 12, challengesWon: 6, langs: ["Anglais", "Swahili"],
    joined: "sept. 2025",
  },
  {
    id: "d9", name: "Jean-Marc Kabongo", username: "jmkab", role: "Fullstack · Fintech",
    city: "Kinshasa", country: "RD Congo", flag: "🇨🇩",
    bio: "Le Mobile Money n'a plus de secrets pour moi. 3 fintechs livrées, 0 incident paiement.",
    skills: [{ name: "Node.js", level: 86 }, { name: "React", level: 80 }, { name: "PostgreSQL", level: 82 }, { name: "Go", level: 68 }],
    reputation: 3010, badges: [{ kind: "founder", label: "Fondateur" }, { kind: "solo", label: "Solo Shipper" }],
    projectsCount: 11, followers: 860, following: false, online: true, availability: "missions",
    gradient: ["#8b5cf6", "#6d28d9"], articles: 4, challengesWon: 3, langs: ["Français", "Lingala", "Anglais"],
    joined: "nov. 2025",
  },
  {
    id: "d10", name: "Nadia Cherif", username: "nadiach", role: "Frontend · Design Engineer",
    city: "Casablanca", country: "Maroc", flag: "🇲🇦",
    bio: "Design systems et micro-interactions. Le pixel est un contrat, je l'honore.",
    skills: [{ name: "React", level: 90 }, { name: "CSS", level: 95 }, { name: "Figma", level: 88 }, { name: "Vue", level: 74 }],
    reputation: 3720, badges: [{ kind: "star", label: "Étoile montante" }, { kind: "polyglote", label: "Polyglote" }],
    projectsCount: 13, followers: 1450, following: false, online: false, availability: "mentorat",
    gradient: ["#2dd4a0", "#8b5cf6"], articles: 15, challengesWon: 2, langs: ["Arabe", "Français", "Anglais"],
    joined: "oct. 2025",
  },
  {
    id: "d11", name: "Youssouf Sawadogo", username: "youssous", role: "Blockchain",
    city: "Ouagadougou", country: "Burkina Faso", flag: "🇧🇫",
    bio: "Smart contracts pour la traçabilité agricole. La confiance, mais en code.",
    skills: [{ name: "Solidity", level: 85 }, { name: "Rust", level: 72 }, { name: "TypeScript", level: 78 }, { name: "Go", level: 65 }],
    reputation: 2450, badges: [{ kind: "challenger", label: "Challenger" }, { kind: "opensource", label: "Open Source" }],
    projectsCount: 7, followers: 640, following: false, online: false, availability: "hackathon",
    gradient: ["#22d3ee", "#0f9d77"], articles: 6, challengesWon: 5, langs: ["Français", "Mooré"],
    joined: "janv. 2026",
  },
  {
    id: "d12", name: "Sipho Dlamini", username: "siphod", role: "Backend · Échelle",
    city: "Johannesburg", country: "Afrique du Sud", flag: "🇿🇦",
    bio: "1 M de requêtes/minute avec moins de 8 serveurs. L'optimisation est un art.",
    skills: [{ name: "Go", level: 91 }, { name: "Java", level: 80 }, { name: "Kafka", level: 83 }, { name: "PostgreSQL", level: 85 }],
    reputation: 4770, badges: [{ kind: "architect", label: "Architecte" }, { kind: "mentor", label: "Mentor vérifié" }],
    projectsCount: 15, followers: 1520, following: false, online: true, availability: "missions",
    gradient: ["#0f9d77", "#0f9d77"], articles: 8, challengesWon: 4, langs: ["Anglais", "Zoulou"],
    joined: "août 2025",
  },
  {
    id: "d13", name: "Mariam Coulibaly", username: "mariamc", role: "Junior · en apprentissage",
    city: "Abidjan", country: "Côte d'Ivoire", flag: "🇨🇮",
    bio: "Étudiante, bootcamp IDU + tutos NORA. Objectif : ma première mission freelance avant juin.",
    skills: [{ name: "HTML/CSS", level: 78 }, { name: "JavaScript", level: 68 }, { name: "React", level: 45 }, { name: "Git", level: 60 }],
    reputation: 380, badges: [{ kind: "challenger", label: "Challenger" }],
    projectsCount: 2, followers: 85, following: false, online: true, availability: "mentorat",
    gradient: ["#34e3b5", "#22d3ee"], articles: 1, challengesWon: 0, langs: ["Français"],
    joined: "mars 2026",
  },
  {
    id: "d14", name: "Awa Bâ", username: "awaba", role: "DevOps · Junior",
    city: "Porto-Novo", country: "Bénin", flag: "🇧🇯",
    bio: "Ancienne prof de maths reconvertie. J'automatise tout — même mes fiches de révision.",
    skills: [{ name: "Python", level: 70 }, { name: "Docker", level: 62 }, { name: "Bash", level: 74 }, { name: "Ansible", level: 55 }],
    reputation: 560, badges: [{ kind: "star", label: "Étoile montante" }],
    projectsCount: 3, followers: 120, following: false, online: true, availability: "mentorat",
    gradient: ["#2dd4a0", "#0f9d77"], articles: 2, challengesWon: 1, langs: ["Français", "Fon"],
    joined: "févr. 2026",
  },
];

export const devByUsername = (u: string) => devs.find((d) => d.username === u);

/* ---------- Projets ---------- */
export const projects: Project[] = [
  {
    id: "p1", name: "MobiPay", tagline: "Paiements Mobile Money unifiés pour 14 pays",
    description: "Une seule API pour Orange Money, MTN MoMo, Wave et M-Pesa. Webhooks, réconciliation automatique et dashboard marchand.",
    domain: "Fintech", stack: ["Go", "PostgreSQL", "React", "Redis"], status: "production",
    stars: 842, forks: 120, owner: "jmkab", team: ["jmkab", "chidiok", "fatound"], openRoles: [],
    progress: 100, gradient: ["#8b5cf6", "#2dd4a0"], icon: "💳", updated: "il y a 2 h", repo: "nora/mobipay", cover: "/images/proj-mobipay.jpg",
  },
  {
    id: "p2", name: "Zamba AI", tagline: "Chatbot qui parle bambara, wolof et fon",
    description: "Modèle léger fine-tuné sur des corpus locaux, embarqué sur mobile pour les commerçants. Fonctionne hors-ligne en mode léger.",
    domain: "IA", stack: ["Python", "FastAPI", "PyTorch", "Flutter"], status: "dev",
    stars: 1204, forks: 233, owner: "aichatr", team: ["aichatr", "wanjikuk", "theoah"], openRoles: ["Frontend mobile", "Collecte de données"],
    progress: 64, gradient: ["#0f9d77", "#2dd4a0"], icon: "🤖", updated: "il y a 26 min", repo: "nora/zamba-ai", cover: "/images/proj-zamba.jpg",
  },
  {
    id: "p3", name: "AgriSense", tagline: "Capteurs low-cost + analytics pour coopératives",
    description: "Stations météo à 40 $, cartographie des parcelles et alertes SMS. Déployée dans 3 coopératives de cacao.",
    domain: "AgriTech", stack: ["Go", "MQTT", "Grafana", "React"], status: "production",
    stars: 655, forks: 88, owner: "youssous", team: ["youssous", "amadoud"], openRoles: ["Dev embarqué"],
    progress: 88, gradient: ["#0f9d77", "#0f9d77"], icon: "🌾", updated: "hier", repo: "nora/agrisense", cover: "/images/proj-agrisense.jpg",
  },
  {
    id: "p4", name: "MediLink", tagline: "Télémédecine pour zones hors réseau",
    description: "Consultations par SMS/USSD, dossier patient chiffré local, synchronisation différée dès que le réseau revient.",
    domain: "HealthTech", stack: ["Flutter", "Node.js", "PostgreSQL"], status: "equipe",
    stars: 431, forks: 67, owner: "kwamem", team: ["kwamem", "fatound"], openRoles: ["Backend Node", "UX designer"],
    progress: 52, gradient: ["#8b5cf6", "#6d28d9"], icon: "🩺", updated: "il y a 5 h", repo: "nora/medilink", cover: "/images/proj-medilink.jpg",
  },
  {
    id: "p5", name: "SolarTrack", tagline: "Monitoring de kits solaires en temps réel",
    description: "API de télémétrie pour installateurs : production, alertes batterie, maintenance prédictive. 1 200 kits connectés.",
    domain: "Énergie", stack: ["Go", "TimescaleDB", "React", "Docker"], status: "production",
    stars: 512, forks: 74, owner: "amadoud", team: ["amadoud", "siphod", "nadiach"], openRoles: [],
    progress: 100, gradient: ["#2dd4a0", "#8b5cf6"], icon: "☀️", updated: "il y a 3 j", repo: "nora/solartrack", cover: "/images/proj-solartrack.jpg",
  },
  {
    id: "p6", name: "WakaGo", tagline: "Covoiturage interurbain pensé pour le bus local",
    description: "Réservation USSD + app, payement à bord par Mobile Money, suivi temps réel du trajet pour la famille restée au village.",
    domain: "Mobilité", stack: ["React", "Go", "MongoDB"], status: "idee",
    stars: 189, forks: 21, owner: "theoah", team: ["theoah"], openRoles: ["Backend Go", "Mobile Flutter", "Produit"],
    progress: 18, gradient: ["#34e3b5", "#22d3ee"], icon: "🛺", updated: "il y a 12 h", repo: "nora/wakago", cover: "/images/proj-wakago.jpg",
  },
  {
    id: "p7", name: "EduKont", tagline: "Cours hors-ligne pour collèges sans fibre",
    description: "Contenus compressés < 20 Mo, serveur Raspberry Pi pour l'école, progression synchronisée par clé USB si besoin.",
    domain: "EdTech", stack: ["Next.js", "SQLite", "PWA"], status: "dev",
    stars: 367, forks: 59, owner: "mariamc", team: ["mariamc", "awaba", "nadiach"], openRoles: ["Dev PWA", "Éditeur de contenus"],
    progress: 47, gradient: ["#0f9d77", "#0f9d77"], icon: "📚", updated: "il y a 2 j", repo: "nora/edukont", cover: "/images/proj-edukont.jpg",
  },
  {
    id: "p8", name: "OpenJèjè", tagline: "Bibliothèque de composants UI inspirés des motifs africains",
    description: "50+ composants React accessibles avec textures bogolan et kente en SVG. 4 200 téléchargements npm ce mois-ci.",
    domain: "Open Source", stack: ["React", "TypeScript", "Tailwind"], status: "production",
    stars: 1567, forks: 312, owner: "nadiach", team: ["nadiach", "theoah"], openRoles: ["Docs & exemples"],
    progress: 100, gradient: ["#8b5cf6", "#2dd4a0"], icon: "🎨", updated: "il y a 41 min", repo: "nora/openjeje", cover: "/images/proj-openjeje.jpg",
  },
];

/* ---------- Bibliothèque d'images (photos réelles collectées par l'équipe) ----------
   Toutes optimisées dans public/images/. Le backend Go servira plus tard
   ces URLs depuis un CDN ; les chemins restent identiques. */
export const IMAGES = {
  heroSavanna: "/images/hero-savanna.jpg",
  hackathon: "/images/event-hackathon.jpg",
  conference: "/images/event-conference.jpg",
  buildAfrica: "/images/build-africa.jpg",
  devKid: "/images/dev-kid.jpg",
  devFocus: "/images/dev-focus.jpg",
  devHands: "/images/dev-hands.jpg",
  techNetwork: "/images/tech-network.jpg",
} as const;

/* Communautés par ville — photos réelles + compteurs de membres */
export const cityCards = [
  { city: "Cotonou", country: "Bénin", flag: "🇧🇯", members: 2140, image: "/images/city-cotonou.jpg" },
  { city: "Abidjan", country: "Côte d'Ivoire", flag: "🇨🇮", members: 3180, image: "/images/city-abidjan.jpg" },
  { city: "Dakar", country: "Sénégal", flag: "🇸🇳", members: 2760, image: "/images/city-dakar.jpg" },
  { city: "Accra", country: "Ghana", flag: "🇬🇭", members: 1890, image: "/images/city-accra.jpg" },
];

/* ---------- Fil d'actualité ---------- */
export const posts: Post[] = [
  {
    id: "n1", author: "amadoud", time: "il y a 18 min", type: "milestone",
    content: "SolarTrack vient de passer les 1 200 kits connectés 🎉 Le plus dur n'était pas le code — c'était les jaloux de MTN dans le Sud… En tout cas, le monitoring tient 30 j sans redémarrage. Merci à l'équipe.",
    tags: ["DevOps", "SolarTrack"], likes: 214, comments: 32, shares: 18, liked: false,
    reactions: [{ emoji: "🔥", count: 96, mine: false }, { emoji: "🚀", count: 64, mine: true }, { emoji: "👏", count: 54, mine: false }],
  },
  {
    id: "n2", author: "aichatr", time: "il y a 1 h", type: "article",
    content: "Nouveau tuto : « Fine-tuner un petit modèle de NLP pour le bambara sans GPU » — je partage mon pipeline complet, avec les pièges de tokenisation et le jeu de données épuré. Les commentaires de code sont en français.",
    tags: ["IA", "NLP", "Tutoriel"], likes: 486, comments: 74, shares: 121, liked: true,
  },
  {
    id: "n3", author: "theoah", time: "il y a 2 h", type: "code",
    content: "Petit hook React pour charger des composants seulement quand le réseau est correct — le « mode léger » de WakaGo, pensé pour la 2G. Ça coupe les animations et les images lourdes.",
    tags: ["React", "Mode léger", "Mobile"],
    likes: 178, comments: 24, shares: 41, liked: false,
    code: {
      lang: "tsx", title: "useLiteMode.ts",
      snippet: `export function useLiteMode() {
  const [lite, setLite] = useState(
    () => (navigator as any).connection?.effectiveType?.startsWith("2g")
  );
  useEffect(() => {
    const conn = (navigator as any).connection;
    const onChange = () => setLite(conn?.effectiveType?.startsWith("2g") ?? false);
    conn?.addEventListener("change", onChange);
    return () => conn?.removeEventListener("change", onChange);
  }, []);
  return lite;
}`,
    },
  },
  {
    id: "n4", author: "chidiok", time: "il y a 3 h", type: "challenge",
    content: "Je lance un défi pour la communauté : optimiser une requête Go qui aggrège 10 M de transactions Mobile Money. Le mien tourne en 380 ms — qui fait mieux ? Récompense : 50 000 FCFA + badge Challenger.",
    tags: ["Go", "Challenge", "Fintech"], likes: 342, comments: 88, shares: 56, liked: false,
  },
  {
    id: "n5", author: "kwamem", time: "il y a 4 h", type: "project",
    content: "MediLink cherche 2 devs ! On a une ONL à Sokodé prête à pilote. Backend Node (dossier patient chiffré) et une personne UX qui connaît les réalités terrain. On travaille en open, tout est sur NORA.",
    tags: ["Recrutement", "HealthTech"], likes: 264, comments: 47, shares: 89, liked: false, projectId: "p4",
  },
  {
    id: "n6", author: "mariamc", time: "il y a 6 h", type: "text",
    content: "Premier vrai commit sur EduKont aujourd'hui 🥹 J'ai mis 2 h à comprendre un conflit de rebase et @awaba m'a débloquée en 4 min sur le salon #aide-juniors. C'est exactement pour ça que je suis là.",
    tags: ["Communauté", "Apprentissage"], likes: 521, comments: 63, shares: 12, liked: true,
    reactions: [{ emoji: "❤️", count: 210, mine: false }, { emoji: "💪", count: 120, mine: true }],
  },
  {
    id: "n7", author: "nadiach", time: "il y a 8 h", type: "article",
    content: "« Bogolan UI » : pourquoi les interfaces africaines ne doivent pas se limiter aux couleurs criardes. J'explique comment traduire les motifs de boue du Mali en textures SVG subtiles — avec 12 exemples live.",
    tags: ["Design", "Culture", "CSS"], likes: 398, comments: 41, shares: 77, liked: false,
  },
  {
    id: "n8", author: "siphod", time: "il y a 9 h", type: "milestone",
    content: "Record battu sur notre API de facturation : 1,1 M req/min sur 7 serveurs à 2,4 G de RAM chacun. La clé ? Des batch inserts PostgreSQL et une file Kafka bien réglée. Thread technique demain sur le salon #backend.",
    tags: ["Performance", "Go"], likes: 289, comments: 52, shares: 34, liked: false,
  },
];

/* ---------- Salons ---------- */
export const channels: Channel[] = [
  { id: "c1", name: "général", kind: "text", topic: "Annonces et vie de la communauté", members: 2840, unread: 0 },
  { id: "c2", name: "aide-juniors", kind: "text", topic: "Aucune question n'est trop petite", members: 1120, unread: 12 },
  { id: "c3", name: "frontend", kind: "text", topic: "React, CSS, animations & co", members: 940, unread: 3 },
  { id: "c4", name: "backend-go", kind: "text", topic: "APIs Go, PostgreSQL, perf", members: 720, unread: 0 },
  { id: "c5", name: "ia-locale", kind: "text", topic: "NLP des langues africaines, modèles légers", members: 860, unread: 5 },
  { id: "c6", name: "hackathon-solaris", kind: "text", topic: "Espace de l'équipe Solaris — créé depuis le profil d'équipe", members: 6, unread: 2 },
];

export const chatMessages: ChatMessage[] = [
  { id: "m1", author: "fatound", time: "09:12", day: "Aujourd'hui", kind: "text", content: "Salut l'équipe ! J'ai posé la structure du repo WakaGo — frontend React + backend Go. Le point de départ est prêt : on peut cloner et coder." },
  { id: "m2", author: "theoah", time: "09:14", kind: "text", content: "Top ! Je prends le layout du dashboard et le mode léger. Je pousse une maquette ce soir." },
  { id: "m3", author: "chidiok", time: "09:18", kind: "text", content: "Pour l'API réservations, je vous propose ce contrat — simple et versionné :" },
  {
    id: "m4", author: "chidiok", time: "09:19", kind: "code",
    content: "",
    code: { lang: "go", snippet: `type Booking struct {
  ID        string    \`json:"id"\`
  TripID    string    \`json:"trip_id"\`
  Seats     int       \`json:"seats"\`
  PaidVia   string    \`json:"paid_via"\`  // orange_money, wave…
  CreatedAt time.Time \`json:"created_at"\`
}` },
    reactions: [{ emoji: "🔥", count: 4, mine: false }, { emoji: "✅", count: 3, mine: true }],
  },
  { id: "m5", author: "awaba", time: "09:24", kind: "text", content: "Je peux préparer le Docker Compose + le CI GitHub Actions ce matin. Et je note : environnement de dev auto-créé à la formation de l'équipe 🚀" },
  { id: "m6", author: "fatound", time: "09:26", kind: "text", content: "Parfait. J'invite @theoah et @awaba dans le dépôt partagé maintenant — vos droits d'écriture sont actifs." },
  { id: "m7", author: "nora-bot", time: "09:27", kind: "system", content: "📦 Espace de travail « Solaris × WakaGo » généré : salon créé · dépôt partagé initialisé · environnement dev allumé." },
];

/* ---------- Challenges ---------- */
export const challenges: Challenge[] = [
  {
    id: "ch1", title: "Agrégation de transactions Mobile Money",
    description: "Écris une fonction Go qui agrège 10 M de transactions par marchand et par jour, en moins de 500 ms. Memory budget : 256 Mo.",
    difficulty: "Difficile", language: "Go", by: "chidiok", participants: 312, endsIn: "2 j 14 h", points: 500, successRate: 34,
  },
  {
    id: "ch2", title: "Composant « kart » accessible et animé",
    description: "Crée une carte de projet avec texture kente, 100 % accessible clavier, animation de survol à moins de 60 fps sur un Moto E.",
    difficulty: "Moyen", language: "React + CSS", by: "NORA", participants: 540, endsIn: "5 j 02 h", points: 250, successRate: 61,
  },
  {
    id: "ch3", title: "Tokenizer minimal pour le fon",
    description: "Implémente un tokenizer BPE compact qui gère les tonèmes du fon. Corpus de test fourni (6 000 phrases).",
    difficulty: "Expert", language: "Python", by: "aichatr", participants: 128, endsIn: "8 j 20 h", points: 800, successRate: 12,
  },
  {
    id: "ch4", title: "Sync hors-ligne sans conflit",
    description: "Conçois un algorithme de résolution de conflits pour un carnet de visites médicales utilisé hors connexion.",
    difficulty: "Difficile", language: "TypeScript", by: "NORA", participants: 210, endsIn: "6 j 10 h", points: 450, successRate: 29,
  },
  {
    id: "ch5", title: "Requête PostgreSQL : le rapport hebdo",
    description: "Une seule requête qui sort le top 10 des projets par stars gagnées, avec fenêtres et CTE. Schéma fourni.",
    difficulty: "Facile", language: "SQL", by: "NORA", participants: 890, endsIn: "3 j 08 h", points: 120, successRate: 78,
  },
  {
    id: "ch6", title: "Cargo : calcul de tournée optimal",
    description: "Optimise les livraisons d'un réseau de 120 points de vente à Cotonou avec contraintes de créneaux. Solveur libre.",
    difficulty: "Moyen", language: "Python", by: "jmkab", participants: 176, endsIn: "9 j 12 h", points: 300, successRate: 44,
  },
];

export const leaderboard: LeaderRow[] = [
  { rank: 1, username: "chidiok", points: 4820, streak: 34, delta: 2, badge: "solo" },
  { rank: 2, username: "aichatr", points: 4610, streak: 29, delta: 0, badge: "polyglote" },
  { rank: 3, username: "amadoud", points: 4380, streak: 41, delta: -1, badge: "architect" },
  { rank: 4, username: "wanjikuk", points: 3950, streak: 22, delta: 1, badge: "opensource" },
  { rank: 5, username: "siphod", points: 3640, streak: 18, delta: 3, badge: "architect" },
  { rank: 6, username: "kofib", points: 3480, streak: 12, delta: 0, badge: "mentor" },
  { rank: 7, username: "kwamem", points: 3120, streak: 9, delta: 2 },
  { rank: 8, username: "nadiach", points: 2980, streak: 15, delta: -2, badge: "star" },
  { rank: 9, username: "theoah", points: 2740, streak: 12, delta: 5, badge: "challenger" },
  { rank: 10, username: "youssous", points: 2510, streak: 7, delta: 1 },
];

/* ---------- Missions freelance (Mobile Money) ---------- */
export const missions: Mission[] = [
  {
    id: "ms1", title: "Refonte dashboard commercial — boutique de cosmétiques",
    client: "Karité & Coop", city: "Bobo-Dioulasso", flag: "🇧🇫",
    budget: "180 000 FCFA", duration: "~3 semaines", skills: ["React", "Tailwind", "API REST"],
    money: "Orange Money", urgency: "Immédiat", match: 96,
  },
  {
    id: "ms2", title: "Intégration paiement Wave dans app de billetterie",
    client: "Sunu Events", city: "Dakar", flag: "🇸🇳",
    budget: "260 000 FCFA", duration: "~2 semaines", skills: ["Node.js", "Webhooks", "Wave API"],
    money: "Wave", urgency: "Cette semaine", match: 88,
  },
  {
    id: "ms3", title: "App de gestion de stock pour pharmacie (offline-first)",
    client: "Pharma Nima", city: "Accra", flag: "🇬🇭",
    budget: "620 000 FCFA", duration: "6–8 semaines", skills: ["Flutter", "SQLite", "Sync"],
    money: "MTN MoMo", urgency: "Flexible", match: 74,
  },
  {
    id: "ms4", title: "Site vitrine + SEO pour agence de voyage",
    client: "Zémidjan Tours", city: "Cotonou", flag: "🇧🇯",
    budget: "150 000 FCFA", duration: "~10 jours", skills: ["Next.js", "SEO", "Contenus"],
    money: "Moov Money", urgency: "Immédiat", match: 92,
  },
  {
    id: "ms5", title: "Pipeline de données pour coopérative de cacao",
    client: "CoopCACAO Ouest", city: "San-Pédro", flag: "🇨🇮",
    budget: "410 000 FCFA", duration: "~5 semaines", skills: ["Python", "ETL", "Grafana"],
    money: "Orange Money", urgency: "Flexible", match: 81,
  },
  {
    id: "ms6", title: "Audit sécurité d'une API de tontine numérique",
    client: "TontinePlus", city: "Douala", flag: "🇨🇲",
    budget: "300 000 FCFA", duration: "2 semaines", skills: ["Pentest", "Go", "OWASP"],
    money: "MTN MoMo", urgency: "Cette semaine", match: 69,
  },
];

/* ---------- Hackathons ---------- */
export const hackathons: Hackathon[] = [
  {
    id: "h1", name: "Nuit du Code 48h", tagline: "Le hackathon qui réunit le continent, en présentiel comme en ligne",
    date: "4–6 déc. 2026", mode: "Hybride", place: "Cotonou + en ligne", prize: "20 000 $ de prix",
    teams: 312, deadline: "Inscriptions ouvertes", color: ["#8b5cf6", "#2dd4a0"],
  },
  {
    id: "h2", name: "SolarHack 48h", tagline: "Construis l'app qui gère les micro-réseaux solaires",
    date: "22–24 nov. 2026", mode: "En ligne", place: "Toute l'Afrique", prize: "8 000 $",
    teams: 97, deadline: "Fin des inscriptions dans 6 j", color: ["#2dd4a0", "#0f9d77"],
  },
  {
    id: "h3", name: "AgriData Challenge", tagline: "Data & ML au service des coopératives agricoles",
    date: "10 janv. 2027", mode: "Présentiel", place: "Abidjan", prize: "12 000 $",
    teams: 64, deadline: "Sélection des équipes le 15 déc.", color: ["#0f9d77", "#0f9d77"],
  },
];

/* ---------- Stats globales (hero / dashboard) ---------- */
export const globalStats = {
  devs: 12_847,
  countries: 46,
  projects: 3_205,
  salons: 218,
  challengesSolved: 41_760,
  missionsPaid: 86_400_000, // FCFA versés
  mentors: 340,
};

export const citiesMarquee = [
  "Abidjan", "Lagos", "Dakar", "Nairobi", "Cotonou", "Accra", "Kigali", "Casablanca", "Douala", "Kinshasa",
  "Bamako", "Ouagadougou", "Lomé", "Le Caire", "Kampala", "Johannesburg", "Porto-Novo", "Khartoum", "Antananarivo", "Addis-Abeba",
];

export const trendingTags = [
  { tag: "GoPerf", posts: 1240, trend: "+38 %" },
  { tag: "MobileMoneyAPI", posts: 980, trend: "+52 %" },
  { tag: "NLP-Africain", posts: 764, trend: "+71 %" },
  { tag: "ModeLéger", posts: 512, trend: "+24 %" },
  { tag: "FlutterDakar", posts: 433, trend: "+12 %" },
  { tag: "KenteUI", posts: 318, trend: "+45 %" },
];
