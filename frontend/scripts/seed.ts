/* ============================================================
   NORA — Seed : matérialise la communauté de départ en lignes
   réelles de la base (SQLite/Prisma). Après exécution, le
   frontend ne contient PLUS AUCUNE donnée : tout passe par
   l'API REST. Réinitialisable : `bun run db:reset && bun run db:seed`.
   ============================================================ */

import { PrismaClient } from "@prisma/client";
import { scryptSync, randomBytes } from "node:crypto";
import {
  devs, projects, posts, channels, chatMessages, challenges, missions, hackathons,
  CURRENT_USER,
} from "./seed-data";

const db = new PrismaClient();
const j = (v: unknown) => JSON.stringify(v);

function hashPassword(pw: string): string {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(pw, salt, 32).toString("hex")}`;
}

const DEFAULT_PW = "nora-dev42";

async function main() {
  console.log("— wipe —");
  await db.session.deleteMany();
  await db.directMessage.deleteMany();
  await db.contactRequest.deleteMany();
  await db.channelMessage.deleteMany();
  await db.channel.deleteMany();
  await db.postLike.deleteMany();
  await db.post.deleteMany();
  await db.projectStar.deleteMany();
  await db.project.deleteMany();
  await db.challenge.deleteMany();
  await db.mission.deleteMany();
  await db.hackathon.deleteMany();
  await db.dev.deleteMany();

  console.log("— devs —");
  for (const d of devs) {
    await db.dev.create({
      data: {
        username: d.username,
        email: `${d.username}@nora.africa`,
        passwordHash: hashPassword(DEFAULT_PW),
        name: d.name,
        role: d.role,
        city: d.city,
        country: d.country,
        flag: d.flag,
        bio: d.bio,
        skillsJson: j(d.skills),
        reputation: d.reputation,
        badgesJson: j(d.badges),
        projectsCount: d.projectsCount,
        followers: d.followers,
        online: d.online,
        availability: d.availability,
        gradientJson: j(d.gradient),
        articles: d.articles,
        challengesWon: d.challengesWon,
        langsJson: j(d.langs),
        joined: d.joined,
      },
    });
  }

  console.log("— projects —");
  for (const p of projects) {
    await db.project.create({
      data: {
        name: p.name, tagline: p.tagline, description: p.description,
        domain: p.domain, stackJson: j(p.stack), status: p.status,
        starsBase: p.stars,
        forks: p.forks, owner: p.owner, teamJson: j(p.team),
        openRolesJson: j(p.openRoles), progress: p.progress,
        gradientJson: j(p.gradient), icon: p.icon, cover: p.cover ?? null,
        repo: p.repo,
      },
    });
  }

  console.log("— posts —");
  for (const p of posts) {
    await db.post.create({
      data: {
        author: p.author, type: p.type, content: p.content,
        tagsJson: j(p.tags), likesBase: p.likes, comments: p.comments, shares: p.shares,
        codeLang: p.code?.lang ?? null, codeTitle: p.code?.title ?? null,
        codeSnippet: p.code?.snippet ?? null, projectId: p.projectId ?? null,
        createdAt: new Date(Date.now() - Math.abs(hashStr(p.id)) % 72 * 3600 * 1000),
      },
    });
  }

  console.log("— channels —");
  for (const [i, c] of channels.entries()) {
    const ch = await db.channel.create({
      data: { id: c.id, name: c.name, kind: c.kind, topic: c.topic, members: c.members, order: i },
    });
    // répartit les messages de démo sur leur salon (2 premiers salons)
    const msgs = chatMessages.slice(i * 4, i * 4 + 4);
    for (const m of msgs) {
      await db.channelMessage.create({
        data: {
          channelId: ch.id, author: m.author, content: m.content,
          kind: m.kind ?? "text", codeLang: m.code?.lang ?? null,
          codeSnippet: m.code?.snippet ?? null,
          createdAt: new Date(Date.now() - (msgs.indexOf(m) + 1) * 9 * 60 * 1000),
        },
      });
    }
  }

  console.log("— challenges / missions / hackathons —");
  for (const c of challenges) await db.challenge.create({ data: { ...c } });
  for (const { skills, ...m } of missions) await db.mission.create({ data: { ...m, skillsJson: j(skills) } });
  for (const { color, ...h } of hackathons) await db.hackathon.create({ data: { ...h, colorJson: j(color) } });

  console.log("— messagerie privée : demandes + threads —");
  // conversations déjà validées
  await db.contactRequest.create({ data: { from: "amadoud", to: CURRENT_USER, status: "accepted" } });
  await db.contactRequest.create({ data: { from: "aichatr", to: CURRENT_USER, status: "accepted" } });
  // une demande entrante en attente (le dev peut l'accepter ou la refuser)
  await db.contactRequest.create({ data: { from: "wanjikuk", to: CURRENT_USER, status: "pending" } });

  const key = (a: string, b: string) => [a, b].sort().join("|");
  const t0 = Date.now();
  const amadou = [
    { author: "amadoud", content: "Salut Théo ! J'ai vu ta refonte du dashboard, propre 👌", min: 60 },
    { author: "amadoud", content: "Pour le déploiement de démo de demain, je peux te prêter le cluster de staging. Tu veux que je te génère un accès ?", min: 42 },
    { author: CURRENT_USER, content: "Oui carrément ! Je te renvoie le build ce soir, merci 🙏", min: 25 },
  ];
  const aicha = [
    { author: "aichatr", content: "Hey ! Ton hook useLiteMode m'intéresse pour Zamba hors-ligne. Je peux le réutiliser ?", min: 120 },
    { author: CURRENT_USER, content: "Bien sûr, il est en MIT dans le repo OpenJèjè — je te mets le lien.", min: 110 },
  ];
  for (const [thread, msgs] of [["amadoud", amadou], ["aichatr", aicha]] as const) {
    for (const m of msgs) {
      await db.directMessage.create({
        data: { threadKey: key(CURRENT_USER, thread), author: m.author, content: m.content, createdAt: new Date(t0 - m.min * 60 * 1000) },
      });
    }
  }

  const counts = {
    devs: await db.dev.count(),
    projects: await db.project.count(),
    posts: await db.post.count(),
    channels: await db.channel.count(),
  };
  console.log("✔ seed terminé :", counts);
  console.log(`✔ mot de passe de tous les comptes de départ : ${DEFAULT_PW}`);
}

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => db.$disconnect());
