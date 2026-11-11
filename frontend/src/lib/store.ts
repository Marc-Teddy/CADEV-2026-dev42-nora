"use client";

/* ============================================================
   NORA — Store global (zustand)
   Toutes les données passent par l'API REST (aucune donnée
   locale). Auth par token, messagerie privée validée par le
   destinataire, profil éditable, publication de projets.
   ============================================================ */

import { create } from "zustand";
import type { View, Dev, Project, Post, Channel, ChatMessage, Challenge, Mission, Hackathon, ProjectStatus, PostType, WorkspaceFile, NotifItem } from "./types";
import { api, setToken, loadToken, ApiError } from "./api-client";

export type ContactState = "none" | "pending" | "accepted";

export type PlatformStats = { devs: number; projects: number; posts: number; channels: number; countries: number };

interface NoraState {
  /* données plateforme (API) */
  devs: Dev[];
  projects: Project[];
  posts: Post[];
  channels: Channel[];
  channelMessages: ChatMessage[];
  challenges: Challenge[];
  missions: Mission[];
  hackathons: Hackathon[];
  stats: PlatformStats;

  /* studio (fichiers persistés côté API) */
  workspaceFiles: WorkspaceFile[];
  workspaceLoaded: boolean;

  /* notifications réelles */
  notifications: NotifItem[];
  lastSeenNotif: string; // ISO — les items plus récents sont « non vus »

  /* session */
  view: View;
  authed: boolean;
  booting: boolean;
  commandOpen: boolean;
  webgl: boolean;
  profileOf: string;
  me: Dev | null;

  /* UI */
  editProfileOpen: boolean;
  publishOpen: boolean;
  settingsOpen: boolean;
  activeChannel: string | null;
  activeDm: string | null;

  /* messagerie privée */
  dmRequests: Record<string, ContactState>;
  incomingRequest: string | null;
  dmThreads: Record<string, ChatMessage[]>;

  /* interactions réelles (persistées en base) */

  /* actions */
  bootstrap: () => Promise<void>;
  loadPublic: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (p: { name: string; username: string; email: string; password: string; city?: string; country?: string }) => Promise<void>;
  logout: () => void;
  navigate: (v: View) => void;
  viewProfile: (username: string) => void;
  openMyProfile: () => void;
  setCommandOpen: (v: boolean) => void;
  setWebgl: (v: boolean) => void;
  toggleFollow: (username: string) => Promise<void>;
  toggleLike: (postId: string) => Promise<void>;
  toggleJoin: (projectId: string) => Promise<void>;
  toggleStar: (projectId: string) => Promise<void>;
  createPost: (p: { content: string; type?: PostType; tags?: string[]; projectId?: string }) => Promise<void>;

  /* notifications */
  loadNotifications: () => Promise<void>;
  markNotificationsSeen: () => void;

  /* studio — fichiers persistés */
  loadWorkspace: () => Promise<void>;
  saveWorkspaceFile: (p: { path: string; content: string; language?: string }) => Promise<void>;
  createWorkspaceFile: (path: string) => Promise<WorkspaceFile>;
  deleteWorkspaceFile: (path: string) => Promise<void>;

  setEditProfileOpen: (v: boolean) => void;
  setSettingsOpen: (v: boolean) => void;
  saveProfile: (patch: Partial<Dev>) => Promise<void>;
  setPublishOpen: (v: boolean) => void;
  publishProject: (p: { name: string; tagline: string; description: string; stack: string[]; status: ProjectStatus; icon?: string; cover?: string; repo?: string }) => Promise<void>;

  selectChannel: (id: string) => Promise<void>;
  sendChannelMessage: (id: string, content: string) => Promise<void>;

  requestContact: (username: string) => Promise<void>;
  acceptRequest: (username: string) => Promise<void>;
  declineRequest: (username: string) => Promise<void>;
  refreshThreads: () => Promise<void>;
  openDm: (username: string | null) => void;
  sendDm: (username: string, content: string) => Promise<void>;
}

export const useNora = create<NoraState>((set, get) => ({
  devs: [],
  projects: [],
  posts: [],
  channels: [],
  channelMessages: [],
  challenges: [],
  missions: [],
  hackathons: [],
  stats: { devs: 0, projects: 0, posts: 0, channels: 0, countries: 0 },

  workspaceFiles: [],
  workspaceLoaded: false,

  notifications: [],
  lastSeenNotif: "",

  view: "landing",
  authed: false,
  booting: true,
  commandOpen: false,
  webgl: true,
  profileOf: "",
  me: null,

  editProfileOpen: false,
  publishOpen: false,
  settingsOpen: false,
  activeChannel: null,
  activeDm: null,

  dmRequests: {},
  incomingRequest: null,
  dmThreads: {},

  /* ---------- session ---------- */
  bootstrap: async () => {
    /* reprendre le marqueur « notifications vues » */
    if (typeof window !== "undefined") {
      const seen = window.localStorage.getItem("nora.notifSeen");
      if (seen) set({ lastSeenNotif: seen });
    }
    if (!loadToken()) {
      set({ booting: false });
      await get().loadPublic();
      return;
    }
    try {
      const { dev } = await api.me();
      set({ authed: true, me: dev, booting: false });
      await Promise.all([get().loadPublic(), get().refreshThreads(), get().loadNotifications()]);
    } catch {
      setToken(null);
      set({ booting: false });
      await get().loadPublic();
    }
  },

  loadPublic: async () => {
    try {
      const [a, b, c, d, e, f, g, h] = await Promise.all([
        api.devs(), api.projects(), api.posts(), api.channels(),
        api.challenges(), api.missions(), api.hackathons(), api.stats(),
      ]);
      set({
        devs: a.devs, projects: b.projects, posts: c.posts, channels: d.channels,
        challenges: e.challenges, missions: f.missions, hackathons: g.hackathons,
        stats: h.stats,
      });
    } catch (err) {
      console.error("[nora] chargement public", err);
    }
  },

  login: async (email, password) => {
    const { token, dev } = await api.login({ email, password });
    setToken(token);
    set({ authed: true, me: dev, view: "dashboard" });
    await Promise.all([get().loadPublic(), get().refreshThreads(), get().loadNotifications()]);
  },

  register: async (p) => {
    const { token, dev } = await api.register(p);
    setToken(token);
    set({ authed: true, me: dev, view: "dashboard" });
    await Promise.all([get().loadPublic(), get().refreshThreads(), get().loadNotifications()]);
  },

  logout: () => {
    setToken(null);
    set({
      authed: false, me: null, view: "landing",
      dmThreads: {}, dmRequests: {}, incomingRequest: null, activeDm: null,
      workspaceFiles: [], workspaceLoaded: false, notifications: [],
      editProfileOpen: false, publishOpen: false, settingsOpen: false,
    });
    get().loadPublic();
  },

  /* ---------- navigation ---------- */
  navigate: (v) => {
    set({ view: v, commandOpen: false });
    if (typeof window !== "undefined") window.dispatchEvent(new Event("nora:jump-top"));
  },

  viewProfile: (username) => {
    set({ profileOf: username, view: "profile", commandOpen: false });
    if (typeof window !== "undefined") window.dispatchEvent(new Event("nora:jump-top"));
  },

  /* le profil en bas à gauche = MON profil, jamais celui d'un autre */
  openMyProfile: () => {
    const me = get().me;
    if (!me) return;
    set({ profileOf: me.username, view: "profile", commandOpen: false });
    if (typeof window !== "undefined") window.dispatchEvent(new Event("nora:jump-top"));
  },

  setCommandOpen: (v) => set({ commandOpen: v }),
  setWebgl: (v) => set({ webgl: v }),

  /* ---------- interactions (réelles, persistées) ---------- */
  toggleFollow: async (username) => {
    try {
      const { following, followers } = await api.follow(username);
      set((s) => ({
        devs: s.devs.map((d) => (d.username === username ? { ...d, following, followers } : d)),
      }));
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) set({ view: "login" });
    }
  },

  toggleLike: async (postId) => {
    try {
      const { post } = await api.toggleLike(postId);
      set((s) => ({ posts: s.posts.map((p) => (p.id === post.id ? post : p)) }));
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) set({ view: "login" });
    }
  },

  toggleJoin: async (projectId) => {
    try {
      const { project } = await api.joinProject(projectId);
      set((s) => ({ projects: s.projects.map((p) => (p.id === project.id ? project : p)) }));
      /* un post d'équipe est créé côté front lors de la première demande */
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) set({ view: "login" });
    }
  },

  toggleStar: async (projectId) => {
    try {
      const { project } = await api.toggleStar(projectId);
      set((s) => ({ projects: s.projects.map((p) => (p.id === project.id ? { ...p, stars: project.stars } : p)) }));
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) set({ view: "login" });
    }
  },

  createPost: async (p) => {
    const { post } = await api.createPost(p);
    set((s) => ({ posts: [post, ...s.posts] }));
    get().loadPublic();
  },

  /* ---------- notifications réelles ---------- */
  loadNotifications: async () => {
    try {
      const { notifications } = await api.notifications();
      set({ notifications });
    } catch {
      /* silencieux : la cloche reste vide si l'API est indisponible */
    }
  },

  markNotificationsSeen: () => {
    const iso = new Date().toISOString();
    if (typeof window !== "undefined") window.localStorage.setItem("nora.notifSeen", iso);
    set({ lastSeenNotif: iso });
  },

  /* ---------- studio ---------- */
  loadWorkspace: async () => {
    try {
      const { files } = await api.workspace();
      set({ workspaceFiles: files, workspaceLoaded: true });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) set({ view: "login" });
    }
  },

  saveWorkspaceFile: async ({ path, content, language }) => {
    const { file } = await api.saveWorkspaceFile({ path, content, language });
    set((s) => {
      const exists = s.workspaceFiles.some((f) => f.path === file.path);
      return {
        workspaceFiles: exists
          ? s.workspaceFiles.map((f) => (f.path === file.path ? file : f))
          : [...s.workspaceFiles, file],
      };
    });
  },

  createWorkspaceFile: async (path) => {
    const { file } = await api.saveWorkspaceFile({ path, content: "" });
    set((s) => ({
      workspaceFiles: s.workspaceFiles.some((f) => f.path === file.path)
        ? s.workspaceFiles
        : [...s.workspaceFiles, file].sort((a, b) => a.path.localeCompare(b.path)),
    }));
    return file;
  },

  deleteWorkspaceFile: async (path) => {
    await api.deleteWorkspaceFile(path);
    set((s) => ({ workspaceFiles: s.workspaceFiles.filter((f) => f.path !== path) }));
  },

  /* ---------- profil & projets ---------- */
  setEditProfileOpen: (v) => set({ editProfileOpen: v }),
  setSettingsOpen: (v) => set({ settingsOpen: v }),

  saveProfile: async (patch) => {
    const { dev } = await api.updateMe(patch as never);
    set((s) => ({ me: dev, devs: s.devs.map((d) => (d.username === dev.username ? { ...d, ...dev } : d)), editProfileOpen: false }));
  },

  setPublishOpen: (v) => set({ publishOpen: v }),

  publishProject: async (p) => {
    const { project } = await api.publishProject(p);
    set((s) => ({
      projects: [project, ...s.projects],
      me: s.me ? { ...s.me, projectsCount: s.me.projectsCount + 1 } : s.me,
      publishOpen: false,
    }));
    // un post accompagne la publication
    await api.createPost({ content: `Nouveau projet publié : ${project.name} — ${project.tagline}`, type: "project", projectId: project.id }).catch(() => undefined);
    await get().loadPublic();
  },

  /* ---------- salons ---------- */
  selectChannel: async (id) => {
    set({ activeChannel: id });
    try {
      const { messages } = await api.channelMessages(id);
      set({ channelMessages: messages });
    } catch (err) {
      console.error("[nora] messages salon", err);
    }
  },

  sendChannelMessage: async (id, content) => {
    const { message } = await api.sendChannelMessage(id, content);
    set((s) => ({ channelMessages: [...s.channelMessages, message] }));
  },

  /* ---------- messagerie privée ---------- */
  refreshThreads: async () => {
    try {
      const t = await api.threads();
      const dmRequests: Record<string, ContactState> = { nora: "accepted" };
      for (const c of t.contacts) dmRequests[c] = "accepted";
      for (const o of t.outgoing) dmRequests[o.username] = "pending";
      set({
        dmRequests,
        dmThreads: t.threads,
        incomingRequest: t.incoming[0] ?? null,
      });
    } catch (err) {
      console.error("[nora] threads", err);
    }
  },

  requestContact: async (username) => {
    if (get().dmRequests[username]) return;
    set((s) => ({ dmRequests: { ...s.dmRequests, [username]: "pending" } }));
    try {
      await api.requestContact(username);
    } catch (err) {
      console.error("[nora] demande contact", err);
    }
  },

  acceptRequest: async (username) => {
    try {
      await api.answerContact(username, "accept");
    } catch (err) {
      console.error("[nora] accept contact", err);
    }
    set((s) => ({
      incomingRequest: null,
      dmRequests: { ...s.dmRequests, [username]: "accepted" },
      activeDm: username,
    }));
    await get().refreshThreads();
    if (typeof window !== "undefined") {
      const d = get().devs.find((x) => x.username === username);
      window.dispatchEvent(new CustomEvent("nora:contact-accepted", { detail: { username, name: d?.name ?? username } }));
    }
  },

  declineRequest: async (username) => {
    try {
      await api.answerContact(username, "decline");
    } catch (err) {
      console.error("[nora] decline contact", err);
    }
    set({ incomingRequest: null });
    await get().refreshThreads();
  },

  openDm: (username) => set({ activeDm: username }),

  sendDm: async (username, content) => {
    if (!content.trim()) return;
    const optimistic: ChatMessage = {
      id: `opt-${Date.now()}`,
      author: get().me?.username ?? "me",
      time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      content: content.trim(),
    };
    set((s) => ({ dmThreads: { ...s.dmThreads, [username]: [...(s.dmThreads[username] ?? []), optimistic] } }));
    try {
      const { messages, aiCode } = await api.sendDm(username, content.trim());
      set((s) => {
        const thread = (s.dmThreads[username] ?? []).filter((m) => m.id !== optimistic.id);
        for (const m of messages) thread.push(m);
        if (aiCode) {
          thread.push({
            id: `ai-${Date.now()}`,
            author: username,
            time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
            content: "",
            kind: "code",
            code: aiCode,
          });
        }
        return { dmThreads: { ...s.dmThreads, [username]: thread } };
      });
    } catch (err) {
      // rollback optimiste
      set((s) => ({ dmThreads: { ...s.dmThreads, [username]: (s.dmThreads[username] ?? []).filter((m) => m.id !== optimistic.id) } }));
      if (err instanceof ApiError && err.status === 403) {
        set((s) => ({ dmRequests: { ...s.dmRequests, [username]: "none" } }));
      }
      throw err;
    }
  },
}));

/* Utilitaires partagés (remplacent les anciens exports de data.ts) */
export const devByUsername = (u: string) => useNora.getState().devs.find((d) => d.username === u);
