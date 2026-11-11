/* ============================================================
   NORA — Client HTTP typé (aucune donnée en dur).
   Toutes les données viennent du backend REST :
   · par défaut  → l'API Next interne (Prisma + SQLite)
   · NEXT_PUBLIC_API_URL → le backend de l'équipe (Go dev42)
   ============================================================ */

import type {
  Dev, Project, Post, Channel, ChatMessage, Challenge, Mission, Hackathon, Badge,
  WorkspaceFile, NotifItem, GithubRepo, GithubUser,
} from "./types";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "/api";

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

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const t = loadToken();
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(t ? { Authorization: `Bearer ${t}` } : {}),
      ...init?.headers,
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(res.status, (data as { error?: string }).error ?? `Erreur ${res.status}`);
  }
  return data as T;
}

export type MeDev = Dev & { email?: string };
export type ThreadState = { contacts: string[]; incoming: string[]; outgoing: { username: string; status: string }[]; threads: Record<string, ChatMessage[]> };

export const api = {
  /* auth */
  register: (p: { name: string; username: string; email: string; password: string; city?: string; country?: string }) =>
    http<{ token: string; dev: MeDev }>("/auth/register", { method: "POST", body: JSON.stringify(p) }),
  login: (p: { email: string; password: string }) =>
    http<{ token: string; dev: MeDev }>("/auth/login", { method: "POST", body: JSON.stringify(p) }),
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
  missions: () => http<{ missions: Mission[] }>("/missions"),
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
