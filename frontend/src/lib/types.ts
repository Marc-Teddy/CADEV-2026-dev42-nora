/* ============================================================
   NORA — Types partagés du domaine
   Prêts pour le branchement au backend Go (REST + JSON).
   ============================================================ */

export type View =
  | "landing"
  | "login"
  | "register"
  | "dashboard"
  | "feed"
  | "projects"
  | "devs"
  | "salons"
  | "challenges"
  | "missions"
  | "profile";

export type BadgeKind =
  | "mentor"
  | "solo"
  | "architect"
  | "challenger"
  | "founder"
  | "polyglote"
  | "opensource"
  | "star";

export interface Badge {
  kind: BadgeKind;
  label: string;
}

export interface Dev {
  id: string;
  name: string;
  username: string;
  role: string;
  city: string;
  country: string;
  flag: string;
  bio: string;
  skills: { name: string; level: number }[];
  reputation: number;
  badges: Badge[];
  projectsCount: number;
  followers: number;
  following: boolean;
  online: boolean;
  availability: "ouverte" | "hackathon" | "mentorat" | "missions" | "occupe";
  gradient: [string, string];
  articles: number;
  challengesWon: number;
  langs: string[];
  joined: string;
}

export type ProjectStatus = "production" | "dev" | "equipe" | "idee";

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  domain: string;
  stack: string[];
  status: ProjectStatus;
  stars: number;
  forks: number;
  owner: string; // username
  team: string[]; // usernames
  openRoles: string[];
  progress: number;
  gradient: [string, string];
  icon: string; // emoji
  updated: string;
  repo: string;
}

export type PostType = "text" | "project" | "code" | "article" | "challenge" | "milestone";

export interface Post {
  id: string;
  author: string; // username
  time: string;
  type: PostType;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  code?: { lang: string; title: string; snippet: string };
  projectId?: string;
  reactions?: { emoji: string; count: number; mine?: boolean }[];
}

export interface Channel {
  id: string;
  name: string;
  kind: "text" | "voice";
  topic: string;
  members: number;
  unread?: number;
}

export interface ChatMessage {
  id: string;
  author: string; // username
  time: string;
  content: string;
  kind?: "text" | "code" | "system";
  code?: { lang: string; snippet: string };
  reactions?: { emoji: string; count: number; mine?: boolean }[];
  day?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "Facile" | "Moyen" | "Difficile" | "Expert";
  language: string;
  by: string; // "NORA" ou username
  participants: number;
  endsIn: string;
  points: number;
  successRate: number;
}

export interface LeaderRow {
  rank: number;
  username: string;
  points: number;
  streak: number;
  delta: number; // places gagnées ce mois
  badge?: BadgeKind;
}

export interface Mission {
  id: string;
  title: string;
  client: string;
  city: string;
  flag: string;
  budget: string;
  duration: string;
  skills: string[];
  money: "Orange Money" | "MTN MoMo" | "Wave" | "M-Pesa" | "Moov Money";
  urgency: "Immédiat" | "Cette semaine" | "Flexible";
  match: number;
}

export interface Hackathon {
  id: string;
  name: string;
  tagline: string;
  date: string;
  mode: "En ligne" | "Présentiel" | "Hybride";
  place: string;
  prize: string;
  teams: number;
  deadline: string;
  color: [string, string];
}
