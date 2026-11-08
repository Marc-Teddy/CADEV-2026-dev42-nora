"use client";

/* ============================================================
   NORA — Store global (zustand)
   Navigation SPA + état d'auth + overrides optimistes.
   Le champ WebGL et le curseur custom ont leurs propres toggles
   (voir lib/store webgl + html.custom-cursor).
   ============================================================ */

import { create } from "zustand";
import type { View } from "./types";

interface NoraState {
  view: View;
  authed: boolean;
  commandOpen: boolean;
  webgl: boolean; // champ de points WebGL : activable/désactivable
  profileOf: string; // username affiché dans la vue profil
  /* overrides optimistes sur les données mockées */
  followOverrides: Record<string, boolean>;
  likeOverrides: Record<string, boolean>;
  joinedProjects: Record<string, boolean>;

  navigate: (v: View) => void;
  viewProfile: (username: string) => void;
  login: () => void;
  logout: () => void;
  setCommandOpen: (v: boolean) => void;
  setWebgl: (v: boolean) => void;
  toggleFollow: (username: string) => void;
  toggleLike: (postId: string) => void;
  toggleJoin: (projectId: string) => void;
}

export const useNora = create<NoraState>((set) => ({
  view: "landing",
  authed: false,
  commandOpen: false,
  webgl: true,
  profileOf: "theoah",
  followOverrides: {},
  likeOverrides: {},
  joinedProjects: {},

  navigate: (v) => {
    set({ view: v, commandOpen: false });
    if (typeof window !== "undefined") {
      // Lenis écoute cet événement pour remonter instantanément
      window.dispatchEvent(new Event("nora:jump-top"));
    }
  },

  viewProfile: (username) => {
    set({ profileOf: username, view: "profile", commandOpen: false });
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("nora:jump-top"));
    }
  },

  login: () => set({ authed: true, view: "dashboard" }),
  logout: () => set({ authed: false, view: "landing" }),

  setCommandOpen: (v) => set({ commandOpen: v }),

  setWebgl: (v) => set({ webgl: v }),

  toggleFollow: (username) =>
    set((s) => ({ followOverrides: { ...s.followOverrides, [username]: !s.followOverrides[username] } })),

  toggleLike: (postId) =>
    set((s) => ({ likeOverrides: { ...s.likeOverrides, [postId]: !s.likeOverrides[postId] } })),

  toggleJoin: (projectId) =>
    set((s) => ({ joinedProjects: { ...s.joinedProjects, [projectId]: !s.joinedProjects[projectId] } })),
}));
