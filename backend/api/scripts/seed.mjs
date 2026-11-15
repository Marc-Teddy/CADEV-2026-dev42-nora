/* ============================================================
   NORA — Seed PostgreSQL : communauté de démonstration
   Source unique des données : frontend/scripts/seed-data.ts
   (importé tel quel grâce au type-stripping de Node ≥ 22.18).

     npm run seed         → peuple une base vide (sinon ne fait rien)
     npm run seed:reset   → VIDE toutes les tables puis repeuple
   ============================================================ */

import argon2 from 'argon2';
import pg from 'pg';
import { refreshBadges } from '../src/badges.js';

const DEFAULT_PASSWORD = 'nora-dev42';
const AGENT = 'nora';
const DIFFICULTY = { Facile: 'beginner', Moyen: 'intermediate', Difficile: 'advanced', Expert: 'expert' };

const reset = process.argv.includes('--reset');
if (process.env.NODE_ENV === 'production') {
  console.error('✘ seed refusé en production');
  process.exit(1);
}

const data = await import('../../../frontend/scripts/seed-data.ts');
const { devs, projects, posts, channels, chatMessages, challenges, missions, hackathons, CURRENT_USER } = data;
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const db = await pool.connect();
const json = (value) => JSON.stringify(value);
const hoursAgo = (h) => new Date(Date.now() - h * 3600 * 1000);
const slugify = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const hashStr = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 0);
/* « 2 j 14 h » → date de fin réelle */
const parseEndsIn = (label) => {
  const days = Number(/(\d+)\s*j/.exec(label)?.[1] ?? 0);
  const hours = Number(/(\d+)\s*h/.exec(label)?.[1] ?? 0);
  return new Date(Date.now() + (days * 24 + hours) * 3600 * 1000);
};

try {
  const existing = await db.query('SELECT count(*)::int AS n FROM users WHERE username <> $1', [AGENT]);
  if (existing.rows[0].n > 0 && !reset) {
    console.log(`✔ base déjà peuplée (${existing.rows[0].n} comptes) — rien à faire. Utilise « npm run seed:reset » pour repartir de zéro.`);
    process.exit(0);
  }

  await db.query('BEGIN');
  if (reset) {
    console.log('— remise à zéro —');
    await db.query('TRUNCATE users CASCADE');
    await db.query(`INSERT INTO users (email, username, display_name, headline, bio)
                    VALUES ('agent@nora.system', $1, 'NORA', 'Assistante IA', 'Agent IA de la plateforme NORA')`, [AGENT]);
  }
  const agentId = (await db.query('SELECT id FROM users WHERE username = $1', [AGENT])).rows[0].id;

  console.log('— devs —');
  const passwordHash = await argon2.hash(DEFAULT_PASSWORD, { type: argon2.argon2id });
  const userId = { [AGENT]: agentId, 'nora-bot': agentId };
  for (const d of devs) {
    const { rows } = await db.query(
      `INSERT INTO users (email, username, password_hash, email_verified_at, display_name, headline, city, country, flag, bio,
         skills, reputation, badges, projects_count, followers_count, online, availability, gradient, articles, challenges_won, langs, joined_label)
       VALUES ($1, $2, $3, now(), $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) RETURNING id`,
      [`${d.username}@nora.africa`, d.username, passwordHash, d.name, d.role, d.city, d.country, d.flag, d.bio,
        json(d.skills), d.reputation, '[]', d.projectsCount, d.followers, d.online, d.availability,
        json(d.gradient), d.articles, d.challengesWon, json(d.langs), d.joined]
    );
    userId[d.username] = rows[0].id;
  }

  console.log('— projets —');
  const projectId = {};
  for (const p of projects) {
    const updatedAt = hoursAgo(Math.abs(hashStr(p.id)) % 48);
    const { rows } = await db.query(
      `INSERT INTO projects (owner_id, title, description, technologies, tagline, domain, status, icon, cover, repo, progress,
         gradient, open_roles, stars_base, forks, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $16) RETURNING id`,
      [userId[p.owner], p.name, p.description, p.stack, p.tagline, p.domain, p.status, p.icon, p.cover ?? null, p.repo,
        p.progress, json(p.gradient), json(p.openRoles), p.stars, p.forks, updatedAt]
    );
    projectId[p.id] = rows[0].id;
    const team = [p.owner, ...p.team.filter((u) => u !== p.owner)];
    for (const [i, member] of team.entries()) {
      if (!userId[member]) continue;
      await db.query('INSERT INTO project_members (project_id, user_id, joined_at) VALUES ($1, $2, $3)', [rows[0].id, userId[member], new Date(updatedAt.getTime() + i * 1000)]);
    }
  }

  console.log('— posts —');
  for (const p of posts) {
    await db.query(
      `INSERT INTO posts (author_id, content, type, tags, likes_base, comments_count, shares, code_lang, code_title, code_snippet, project_id, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [userId[p.author], p.content, p.type, json(p.tags), p.likes, p.comments, p.shares, p.code?.lang ?? null, p.code?.title ?? null,
        p.code?.snippet ?? null, p.projectId ? projectId[p.projectId] ?? null : null, hoursAgo(Math.abs(hashStr(p.id)) % 72)]
    );
  }

  console.log('— salons —');
  for (const [i, c] of channels.entries()) {
    const { rows } = await db.query(
      `INSERT INTO collaboration_spaces (owner_id, name, description, slug, is_channel, kind, topic, position, members_base)
       VALUES ($1, $2, $3, $4, true, $5, $6, $7, $8) RETURNING id`,
      [agentId, c.name, c.topic, slugify(c.name), c.kind, c.topic, i, c.members]
    );
    await db.query("INSERT INTO collaboration_members (space_id, user_id, role) VALUES ($1, $2, 'owner')", [rows[0].id, agentId]);
    const msgs = chatMessages.slice(i * 4, i * 4 + 4);
    for (const [k, m] of msgs.entries()) {
      await db.query(
        'INSERT INTO collaboration_messages (space_id, author_id, content, kind, code_lang, code_snippet, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [rows[0].id, userId[m.author] ?? agentId, m.content, m.kind ?? 'text', m.code?.lang ?? null, m.code?.snippet ?? null,
          new Date(Date.now() - (msgs.length - k) * 9 * 60 * 1000)]
      );
    }
  }

  console.log('— challenges / missions / hackathons —');
  for (const c of challenges) {
    await db.query(
      `INSERT INTO challenges (creator_id, title, description, difficulty, status, starts_at, ends_at, language, points, participants_base, success_rate)
       VALUES ($1, $2, $3, $4, 'published', now() - interval '1 day', $5, $6, $7, $8, $9)`,
      [userId[c.by] ?? agentId, c.title, c.description, DIFFICULTY[c.difficulty] ?? 'intermediate', parseEndsIn(c.endsIn),
        c.language, c.points, c.participants, c.successRate]
    );
  }
  for (const m of missions) {
    await db.query(
      `INSERT INTO opportunities (author_id, title, description, type, remote, compensation, details, status)
       VALUES ($1, $2, $3, 'freelance', false, $4, $5, 'published')`,
      [agentId, m.title, `${m.client} — ${m.city}`, json({ budget: m.budget, money: m.money }),
        json({ client: m.client, city: m.city, flag: m.flag, duration: m.duration, skills: m.skills, urgency: m.urgency, match: m.match })]
    );
  }
  for (const h of hackathons) {
    const payload = { ...h };
    delete payload.id;
    await db.query("INSERT INTO feature_documents (feature, owner_id, status, payload) VALUES ('hackathon', $1, 'published', $2)", [agentId, json(payload)]);
  }

  console.log('— messagerie privée —');
  const contact = (from, to, status) => db.query('INSERT INTO contact_requests (from_id, to_id, status) VALUES ($1, $2, $3)', [userId[from], userId[to], status]);
  await contact('amadoud', CURRENT_USER, 'accepted');
  await contact('aichatr', CURRENT_USER, 'accepted');
  await contact('wanjikuk', CURRENT_USER, 'pending');
  const threads = {
    amadoud: [
      ['amadoud', "Salut Théo ! J'ai vu ta refonte du dashboard, propre 👌", 60],
      ['amadoud', 'Pour le déploiement de démo de demain, je peux te prêter le cluster de staging. Tu veux que je te génère un accès ?', 42],
      [CURRENT_USER, 'Oui carrément ! Je te renvoie le build ce soir, merci 🙏', 25]
    ],
    aichatr: [
      ['aichatr', "Hey ! Ton hook useLiteMode m'intéresse pour Zamba hors-ligne. Je peux le réutiliser ?", 120],
      [CURRENT_USER, 'Bien sûr, il est en MIT dans le repo OpenJèjè — je te mets le lien.', 110]
    ]
  };
  for (const [peer, messages] of Object.entries(threads)) {
    for (const [author, content, minutes] of messages) {
      const recipient = author === peer ? CURRENT_USER : peer;
      await db.query('INSERT INTO direct_messages (sender_id, recipient_id, content, created_at) VALUES ($1, $2, $3, $4)',
        [userId[author], userId[recipient], content, new Date(Date.now() - minutes * 60 * 1000)]);
    }
  }

  console.log('— mentorat —');
  // les mentors de la démo ont un vrai profil mentor et un mentorat terminé
  const mentors = devs.filter((d) => d.badges.some((b) => b.kind === 'mentor'));
  for (const [i, d] of mentors.entries()) {
    const mentee = devs.find((m) => m.username !== d.username && !mentors.includes(m) && devs.indexOf(m) % mentors.length === i) ?? devs.find((m) => m.username !== d.username);
    await db.query("INSERT INTO mentor_profiles (user_id, specialties, languages, bio) VALUES ($1, $2, $3, $4)",
      [userId[d.username], d.skills.slice(0, 3).map((sk) => sk.name), d.langs, d.bio]);
    await db.query("INSERT INTO mentorship_requests (mentor_id, mentee_id, goal, status, created_at) VALUES ($1, $2, $3, 'completed', $4)",
      [userId[d.username], userId[mentee.username], `Accompagnement ${d.skills[0]?.name ?? 'technique'} sur 4 semaines`, hoursAgo(24 * 20)]);
  }

  console.log('— badges (calculés) —');
  await refreshBadges(db);

  await db.query('COMMIT');
  const counts = (await db.query(`SELECT (SELECT count(*)::int FROM users WHERE username <> $1) AS devs, (SELECT count(*)::int FROM projects) AS projects,
    (SELECT count(*)::int FROM posts) AS posts, (SELECT count(*)::int FROM collaboration_spaces WHERE is_channel) AS channels`, [AGENT])).rows[0];
  console.log('✔ seed terminé :', counts);
  console.log(`✔ mot de passe de tous les comptes de départ : ${DEFAULT_PASSWORD} (ex. ${CURRENT_USER}@nora.africa)`);
} catch (error) {
  await db.query('ROLLBACK').catch(() => undefined);
  console.error('✘ seed échoué :', error.message);
  process.exitCode = 1;
} finally {
  db.release();
  await pool.end();
}
