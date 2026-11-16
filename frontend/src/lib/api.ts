/* ============================================================
   NORA — Couche API mockée
   Chaque résolveur retourne les données de démo avec un léger
   délai, comme un vrai appel réseau. Au branchement du backend
   Go : remplacer le corps par `fetch("/api/...")` — les
   signatures restent identiques.
   ============================================================ */

import { devs, projects, posts, channels, chatMessages, challenges, leaderboard, missions, hackathons } from "./data";

const latency = (ms = 120) => new Promise((r) => setTimeout(r, ms));

export const api = {
  async getDevs() { await latency(); return devs; },
  async getProjects() { await latency(); return projects; },
  async getFeed() { await latency(); return posts; },
  async getChannels() { await latency(); return channels; },
  async getMessages(channelId: string) { await latency(); return chatMessages; },
  async getChallenges() { await latency(); return challenges; },
  async getLeaderboard() { await latency(); return leaderboard; },
  async getMissions() { await latency(); return missions; },
  async getHackathons() { await latency(); return hackathons; },
  async login(email: string, _password: string) { await latency(400); return { token: "demo-jwt", email }; },
  async register(payload: Record<string, unknown>) { await latency(400); return { token: "demo-jwt", ...payload }; },
};
