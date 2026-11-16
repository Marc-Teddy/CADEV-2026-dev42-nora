/* ============================================================
   NORA — Client HTTP typé (aucune donnée en dur).
   Toutes les données viennent du backend REST :
   · par défaut  → l'API Next interne (Prisma + SQLite)
   · NEXT_PUBLIC_API_URL → le backend Fastify de l'équipe
     (ex. « /backend/api/v1/app », proxifié par next.config.ts)

   En mode backend, la session repose sur des cookies httpOnly
   posés par le serveur : le « token » local n'est plus qu'un
   marqueur de session. Les requêtes d'écriture portent le jeton
   CSRF, et un accès expiré (15 min) est renouvelé une fois via
   /auth/refresh avant de rejouer la requête.
   ============================================================ */

import type {
  Dev, Project, Post, Channel, ChatMessage, Challenge, Mission, Hackathon, Badge,
  WorkspaceFile, NotifItem, GithubRepo, GithubUser,
} from "./types";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "/api";
const REMOTE = Boolean(process.env.NEXT_PUBLIC_API_URL);
/* « /backend/api/v1/app » → API cœur « /backend/api/v1 » et racine « /backend » */
const CORE = BASE.replace(/\/app\/?$/, "");
const ROOT = CORE.replace(/\/api\/v1\/?$/, "");
const SESSION_MARKER = "cookie-session";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

let token: string | null = null;
export function setToken(t: string | null) {
  token = t;
  if (typeof window !== "undefined") {
    if (t) window.localStorage.setItem("nora.token", t);
    else window.localStorage.removeItem("nora.token");
  }
}
export function loadToken() {
  if (typeof window !== "undefined" && !token) {
    token = window.localStorage.getItem("nora.token");
  }
  return token;
}

/* ---------- protection CSRF (mode backend) ---------- */
let csrfToken: string | null = null;
async function csrf(): Promise<string> {
  if (!csrfToken) {
    const res = await fetch(`${ROOT}/csrf`, { credentials: "include" });
    csrfToken = ((await res.json()) as { token: string }).token;
  }
  return csrfToken;
}

const MUTATING = new Set(["POST", "PUT", "PATCH", "DELETE"]);

async function send(url: string, init: RequestInit | undefined): Promise<Response> {
  const method = (init?.method ?? "GET").toUpperCase();
  const t = loadToken();
  const headers: Record<string, string> = {
    /* pas de Content-Type sans corps : Fastify refuse un JSON vide */
    ...(init?.body !== undefined ? { "Content-Type": "application/json" } : {}),
    ...(!REMOTE && t ? { Authorization: `Bearer ${t}` } : {}),
    ...(REMOTE && MUTATING.has(method) ? { "x-csrf-token": await csrf() } : {}),
    ...(init?.headers as Record<string, string> | undefined),
  };
  return fetch(url, { ...init, headers, ...(REMOTE ? { credentials: "include" as const } : {}) });
}

let refreshing: Promise<boolean> | null = null;
function refreshSession(): Promise<boolean> {
  refreshing ??= fetch(`${CORE}/auth/refresh`, { method: "POST", credentials: "include" })
    .then((r) => r.ok)
    .catch(() => false)
    .finally(() => { refreshing = null; });
  return refreshing;
}

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${BASE}${path}`;
  let res = await send(url, init);
  if (REMOTE && res.status === 403) {
    /* jeton CSRF périmé (cookie expiré) : on en redemande un et on rejoue */
    const body = (await res.clone().json().catch(() => ({}))) as { error?: string };
    if (body.error === "CSRF_TOKEN_REQUIRED") {
      csrfToken = null;
      res = await send(url, init);
    }
  }
  if (REMOTE && res.status === 401 && !path.startsWith("/auth/login") && loadToken() && (await refreshSession())) {
    res = await send(url, init);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = data as { error?: string; message?: string };
    throw new ApiError(res.status, err.message ?? err.error ?? `Erreur ${res.status}`);
  }
  return data as T;
}

export type MeDev = Dev & { email?: string };

/* En mode backend, la réponse ne contient pas de token (cookies httpOnly). */
type AuthResponse = { token?: string; dev?: MeDev; emailVerificationRequired?: boolean; message?: string };
function toSession(r: AuthResponse): { token: string; dev: MeDev } {
  if (!r.dev) throw new ApiError(202, r.message ?? "Confirme ton adresse e-mail avant de te connecter.");
  return { token: r.token ?? SESSION_MARKER, dev: r.dev };
}
export type ThreadState = { contacts: string[]; incoming: string[]; outgoing: { username: string; status: string }[]; threads: Record<string, ChatMessage[]> };

export const api = {
  /* auth */
  register: (p: { name: string; username: string; email: string; password: string; city?: string; country?: string }) =>
    http<AuthResponse>("/auth/register", { method: "POST", body: JSON.stringify(p) }).then(toSession),
  login: (p: { email: string; password: string }) =>
    http<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify(p) }).then(toSession),
  /* mode backend : révoque la session et efface les cookies côté serveur */
  logout: () => (REMOTE ? http<{ ok: boolean }>("/auth/logout", { method: "POST" }).catch(() => undefined) : Promise.resolve(undefined)),
  me: () => http<{ dev: MeDev }>("/auth/me"),
  updateMe: (patch: Partial<Record<"name" | "role" | "city" | "country" | "flag" | "bio" | "availability" | "avatarUrl", string> & { skills: { name: string; level: number }[]; langs: string[]; badges: Badge[] }>) =>
    http<{ dev: MeDev }>("/auth/me", { method: "PATCH", body: JSON.stringify(patch) }),

  /* données */
  devs: () => http<{ devs: Dev[] }>("/devs"),
  dev: (username: string) => http<{ dev: Dev }>(`/devs/${encodeURIComponent(username)}`),
  follow: (username: string) =>
    http<{ following: boolean; followers: number }>(`/devs/${encodeURIComponent(username)}/follow`, { method: "POST" }),
  projects: () => http<{ projects: (Project & { starredByMe?: boolean })[] }>("/projects"),
  publishProject: (p: { name: string; tagline?: string; description?: string; stack?: string[]; status?: string; icon?: string; cover?: string; repo?: string }) =>
    http<{ project: Project }>("/projects", { method: "POST", body: JSON.stringify(p) }),
  toggleStar: (id: string) => http<{ project: Project & { starredByMe?: boolean } }>(`/projects/${id}/star`, { method: "POST" }),
  joinProject: (id: string) =>
    http<{ project: Project & { starredByMe?: boolean }; joined: boolean }>(`/projects/${id}/join`, { method: "POST" }),
  posts: () => http<{ posts: Post[] }>("/posts"),
  createPost: (p: { content: string; type?: string; tags?: string[]; projectId?: string }) =>
    http<{ post: Post }>("/posts", { method: "POST", body: JSON.stringify(p) }),
  toggleLike: (id: string) => http<{ post: Post }>(`/posts/${id}/like`, { method: "POST" }),
  channels: () => http<{ channels: Channel[] }>("/channels"),
  channelMessages: (id: string) => http<{ messages: ChatMessage[] }>(`/channels/${encodeURIComponent(id)}/messages`),
  sendChannelMessage: (id: string, content: string) =>
    http<{ message: ChatMessage }>(`/channels/${encodeURIComponent(id)}/messages`, { method: "POST", body: JSON.stringify({ content }) }),
  challenges: () => http<{ challenges: Challenge[] }>("/challenges"),
  joinChallenge: (id: string) => http<{ joined: boolean; participants: number }>(`/challenges/${id}/join`, { method: "POST" }),
  missions: () => http<{ missions: Mission[] }>("/missions"),
  applyMission: (id: string, message?: string) =>
    http<{ applied: boolean }>(`/missions/${id}/apply`, { method: "POST", body: JSON.stringify({ message: message ?? "" }) }),
  hackathons: () => http<{ hackathons: Hackathon[] }>("/hackathons"),
  stats: () => http<{ stats: { devs: number; projects: number; posts: number; channels: number; countries: number } }>("/stats"),

  /* messagerie privée */
  threads: () => http<ThreadState>("/dms"),
  sendDm: (username: string, content: string) =>
    http<{ messages: ChatMessage[]; aiCode?: { lang: string; snippet: string } | null }>(`/dms/${encodeURIComponent(username)}`, { method: "POST", body: JSON.stringify({ content }) }),
  requestContact: (username: string) =>
    http<{ status: string }>(`/contact-requests`, { method: "POST", body: JSON.stringify({ username }) }),
  answerContact: (username: string, action: "accept" | "decline") =>
    http<{ status: string }>(`/contact-requests/${encodeURIComponent(username)}`, { method: "POST", body: JSON.stringify({ action }) }),

  /* IA */
  askNora: (prompt: string) => http<{ answer: { content: string; code?: { lang: string; snippet: string } } }>("/ai/chat", { method: "POST", body: JSON.stringify({ prompt }) }),

  /* notifications (réelles, calculées serveur) */
  notifications: () => http<{ notifications: NotifItem[] }>("/notifications"),

  /* Studio — fichiers de code persistés */
  workspace: () => http<{ files: WorkspaceFile[] }>("/workspace"),
  saveWorkspaceFile: (p: { path: string; content: string; language?: string }) =>
    http<{ file: WorkspaceFile }>("/workspace", { method: "POST", body: JSON.stringify(p) }),
  deleteWorkspaceFile: (path: string) =>
    http<{ ok: boolean }>(`/workspace?path=${encodeURIComponent(path)}`, { method: "DELETE" }),

  /* GitHub — dépôts publics réels */
  githubRepos: (user: string) =>
    http<{ user: GithubUser; repos: GithubRepo[] }>(`/github/repos?user=${encodeURIComponent(user)}`),
};
