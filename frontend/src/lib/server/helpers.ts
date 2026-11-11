/* ============================================================
   NORA — Helpers serveur : auth, hash, sérialisation API.
   ============================================================ */

import { NextRequest } from "next/server";
import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";
import { db } from "@/lib/db";
import type { Dev, Project, Post, ChatMessage } from "@/lib/types";

/* ---------- mots de passe ---------- */
export function hashPassword(pw: string): string {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(pw, salt, 32).toString("hex")}`;
}

export function verifyPassword(pw: string, stored: string): boolean {
  const [salt, hex] = stored.split(":");
  if (!salt || !hex) return false;
  const a = scryptSync(pw, salt, 32);
  const b = Buffer.from(hex, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

export function newToken(): string {
  return randomBytes(24).toString("hex");
}

/* ---------- auth ---------- */
export async function requireDev(req: NextRequest) {
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : req.nextUrl.searchParams.get("token") ?? "";
  if (!token) return null;
  const session = await db.session.findUnique({ where: { id: token }, include: { dev: true } });
  return session?.dev ?? null;
}

/* ---------- sérialisation ---------- */
export const parseJson = <T,>(raw: string | null | undefined, fallback: T): T => {
  if (!raw) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
};

export function serDev(d: {
  username: string; email: string; name: string; role: string; city: string; country: string;
  flag: string; bio: string; skillsJson: string; reputation: number; badgesJson: string;
  projectsCount: number; followers: number; online: boolean; availability: string;
  gradientJson: string; articles: number; challengesWon: number; langsJson: string;
  joined: string; avatarUrl: string | null;
}, opts?: { private?: boolean; following?: boolean }): Dev & { email?: string } {
  const base: Dev = {
    id: d.username,
    username: d.username,
    name: d.name,
    role: d.role,
    city: d.city,
    country: d.country,
    flag: d.flag,
    bio: d.bio,
    skills: parseJson(d.skillsJson, []),
    reputation: d.reputation,
    badges: parseJson(d.badgesJson, []),
    projectsCount: d.projectsCount,
    followers: d.followers,
    following: opts?.following ?? false,
    online: d.online,
    availability: d.availability as Dev["availability"],
    gradient: parseJson(d.gradientJson, ["#8b5cf6", "#22d3ee"] as [string, string]),
    articles: d.articles,
    challengesWon: d.challengesWon,
    langs: parseJson(d.langsJson, []),
    joined: d.joined,
    avatarUrl: d.avatarUrl ?? undefined,
  };
  return opts?.private ? { ...base, email: d.email } : base;
}

export function serProject(p: {
  id: string; name: string; tagline: string; description: string; domain: string;
  stackJson: string; status: string; starsBase: number; forks: number; owner: string; teamJson: string;
  openRolesJson: string; progress: number; gradientJson: string; icon: string;
  cover: string | null; repo: string; createdAt: Date; updatedAt: Date;
  _count?: { starsGiven: number };
}, starredByMe = false): Project & { createdAtIso?: string; starredByMe?: boolean } {
  return {
    id: p.id,
    name: p.name,
    tagline: p.tagline,
    description: p.description,
    domain: p.domain,
    stack: parseJson(p.stackJson, []),
    status: p.status as Project["status"],
    stars: p._count?.starsGiven != null ? p.starsBase + p._count.starsGiven : p.starsBase,
    forks: p.forks,
    owner: p.owner,
    team: parseJson(p.teamJson, []),
    openRoles: parseJson(p.openRolesJson, []),
    progress: p.progress,
    gradient: parseJson(p.gradientJson, ["#8b5cf6", "#22d3ee"] as [string, string]),
    icon: p.icon,
    cover: p.cover ?? undefined,
    updated: relTime(p.updatedAt),
    repo: p.repo,
    createdAtIso: p.createdAt.toISOString(),
    starredByMe,
  };
}

export function serPost(p: {
  id: string; author: string; type: string; content: string; tagsJson: string;
  likesBase: number; comments: number; shares: number; codeLang: string | null; codeTitle: string | null;
  codeSnippet: string | null; projectId: string | null; createdAt: Date;
  _count?: { likedBy: number };
  likedBy?: { username: string }[];
}, me?: string | null): Post & { createdAtIso?: string } {
  return {
    id: p.id,
    author: p.author,
    time: relTime(p.createdAt),
    type: p.type as Post["type"],
    content: p.content,
    tags: parseJson(p.tagsJson, []),
    likes: p._count?.likedBy != null ? p.likesBase + p._count.likedBy : p.likesBase,
    comments: p.comments,
    shares: p.shares,
    liked: me ? (p.likedBy ?? []).some((l) => l.username === me) : false,
    code: p.codeLang ? { lang: p.codeLang, title: p.codeTitle ?? "", snippet: p.codeSnippet ?? "" } : undefined,
    projectId: p.projectId ?? undefined,
    createdAtIso: p.createdAt.toISOString(),
  };
}

export function serMessage(m: {
  id: string; author: string; content: string; kind?: string | null;
  codeLang?: string | null; codeSnippet?: string | null; createdAt: Date;
}): ChatMessage & { createdAtIso?: string } {
  return {
    id: m.id,
    author: m.author,
    time: clockTime(m.createdAt),
    content: m.content,
    kind: (m.kind ?? "text") as ChatMessage["kind"],
    code: m.codeLang ? { lang: m.codeLang, snippet: m.codeSnippet ?? "" } : undefined,
    createdAtIso: m.createdAt.toISOString(),
  };
}

/* ---------- temps ---------- */
export function relTime(d: Date): string {
  const s = Math.max(1, Math.floor((Date.now() - d.getTime()) / 1000));
  if (s < 60) return "à l'instant";
  const m = Math.floor(s / 60);
  if (m < 60) return `il y a ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `il y a ${h} h`;
  const j = Math.floor(h / 24);
  if (j < 30) return `il y a ${j} j`;
  const mo = Math.floor(j / 30);
  return `il y a ${mo} mois`;
}

export function clockTime(d: Date): string {
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

export function threadKey(a: string, b: string): string {
  return [a, b].sort().join("|");
}
