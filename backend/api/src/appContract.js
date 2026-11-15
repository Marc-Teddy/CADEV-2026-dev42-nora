/* ============================================================
   NORA — Contrat applicatif du frontend (préfixe /api/v1/app)

   Ces routes exposent exactement les formes JSON décrites dans
   frontend/src/lib/types.ts, à partir des tables PostgreSQL du
   backend. Elles complètent l'API REST « brute » sans la modifier :
   un projet publié depuis l'interface est visible partout.

   Authentification : mêmes cookies httpOnly (nora_access /
   nora_refresh) et même protection CSRF que le reste de l'API.
   ============================================================ */

import argon2 from 'argon2';
import { createVerificationToken } from './auth.js';
import { WORKSPACE_STARTERS, guessLanguage } from './workspaceStarters.js';
import { refreshBadges } from './badges.js';

const AVAILABILITIES = ['ouverte', 'hackathon', 'mentorat', 'missions', 'occupe'];
const PROJECT_STATUSES = ['production', 'dev', 'equipe', 'idee'];
const POST_TYPES = ['text', 'project', 'code', 'article', 'challenge', 'milestone'];
const DIFFICULTY_LABELS = { beginner: 'Facile', intermediate: 'Moyen', advanced: 'Difficile', expert: 'Expert' };
const NORA_AGENT = 'nora';
const DEFAULT_GRADIENT = ['#8b5cf6', '#22d3ee'];

/* ---------- formats de temps (identiques au frontend) ---------- */
export function relTime(date) {
  const s = Math.max(1, Math.floor((Date.now() - new Date(date).getTime()) / 1000));
  if (s < 60) return "à l'instant";
  const m = Math.floor(s / 60);
  if (m < 60) return `il y a ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `il y a ${h} h`;
  const j = Math.floor(h / 24);
  if (j < 30) return `il y a ${j} j`;
  return `il y a ${Math.floor(j / 30)} mois`;
}

export function clockTime(date) {
  return new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

export function endsIn(date) {
  if (!date) return '';
  const ms = new Date(date).getTime() - Date.now();
  if (ms <= 0) return 'Terminé';
  const h = Math.floor(ms / 3600000);
  return `${Math.floor(h / 24)} j ${String(h % 24).padStart(2, '0')} h`;
}

/* Sépare le texte et le premier bloc de code markdown d'une réponse IA. */
export function extractCode(raw) {
  const match = raw.match(/```(\w+)?\n([\s\S]*?)```/);
  if (!match) return { content: raw.trim() };
  const content = raw.replace(/```(\w+)?\n[\s\S]*?```/g, '').replace(/\n{3,}/g, '\n\n').trim();
  return { content: content || 'Voici le code :', code: { lang: match[1] || 'ts', snippet: match[2].trim() } };
}

/* ---------- sérialisation vers les types du frontend ---------- */
const USER_COLUMNS = `u.id, u.username, u.email, u.display_name, u.headline, u.city, u.country, u.flag, u.bio,
  u.skills, u.reputation, u.badges, u.projects_count, u.followers_count, u.online, u.availability,
  u.gradient, u.articles, u.challenges_won, u.langs, u.joined_label, u.avatar_url, u.role, u.created_at`;

export function serDev(row, { following = false, includePrivate = false } = {}) {
  const dev = {
    id: row.username,
    username: row.username,
    name: row.display_name || row.username,
    role: row.headline,
    city: row.city ?? '',
    country: row.country ?? '',
    flag: row.flag,
    bio: row.bio ?? '',
    skills: row.skills,
    reputation: row.reputation,
    badges: row.badges,
    projectsCount: row.projects_count,
    followers: row.followers_count,
    following: Boolean(following),
    online: row.online,
    availability: row.availability,
    gradient: row.gradient,
    articles: row.articles,
    challengesWon: row.challenges_won,
    langs: row.langs,
    joined: row.joined_label ?? new Date(row.created_at).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }),
    avatarUrl: row.avatar_url ?? undefined
  };
  return includePrivate ? { ...dev, email: row.email, platformRole: row.role } : dev;
}

export function serProject(row) {
  return {
    id: row.id,
    name: row.title,
    tagline: row.tagline,
    description: row.description,
    domain: row.domain,
    stack: row.technologies ?? [],
    status: row.status,
    stars: row.stars_base + row.star_count,
    forks: row.forks,
    owner: row.owner_username,
    team: row.team ?? [],
    openRoles: row.open_roles,
    progress: row.progress,
    gradient: row.gradient,
    icon: row.icon,
    cover: row.cover ?? undefined,
    updated: relTime(row.updated_at),
    repo: row.repo,
    createdAtIso: new Date(row.created_at).toISOString(),
    starredByMe: Boolean(row.starred_by_me)
  };
}

export function serPost(row) {
  return {
    id: row.id,
    author: row.author_username,
    time: relTime(row.created_at),
    type: row.type,
    content: row.content,
    tags: row.tags,
    likes: row.likes_base + row.like_count,
    comments: row.comments_count,
    shares: row.shares,
    liked: Boolean(row.liked_by_me),
    code: row.code_lang ? { lang: row.code_lang, title: row.code_title ?? '', snippet: row.code_snippet ?? '' } : undefined,
    projectId: row.project_id ?? undefined,
    createdAtIso: new Date(row.created_at).toISOString()
  };
}

export function serMessage(row) {
  return {
    id: row.id,
    author: row.author_username,
    time: clockTime(row.created_at),
    content: row.content,
    kind: row.kind ?? 'text',
    code: row.code_lang ? { lang: row.code_lang, snippet: row.code_snippet ?? '' } : undefined,
    createdAtIso: new Date(row.created_at).toISOString()
  };
}

const fail = (reply, status, error, message) => reply.code(status).send({ error, message });

export function registerAppContract(api, db, config, emailSender) {
  /* ---------- identité ---------- */
  const optionalUserId = async (request) => {
    try {
      await request.jwtVerify({ onlyCookie: true });
      return request.user.sub;
    } catch {
      return null;
    }
  };

  /* recalcul des badges après une action qui peut en faire gagner ou perdre */
  const touchBadges = (...ids) => refreshBadges(db, ids).catch((error) => api.log.error({ err: error }, 'badge refresh failed'));

  const loadUser = async (id) => (await db.query(`SELECT ${USER_COLUMNS} FROM users u WHERE u.id = $1 AND u.deleted_at IS NULL`, [id])).rows[0];
  const userByUsername = async (username) => (await db.query(`SELECT ${USER_COLUMNS} FROM users u WHERE u.username = $1 AND u.deleted_at IS NULL`, [username])).rows[0];
  let agentId;
  const noraAgentId = async () => {
    agentId ??= (await db.query('SELECT id FROM users WHERE username = $1', [NORA_AGENT])).rows[0]?.id;
    return agentId;
  };

  /* ---------- requêtes partagées ---------- */
  const projectsQuery = (where) => `
    SELECT p.*, o.username AS owner_username,
      (SELECT count(*)::int FROM project_stars s WHERE s.project_id = p.id) AS star_count,
      EXISTS (SELECT 1 FROM project_stars s WHERE s.project_id = p.id AND s.user_id = $1::uuid) AS starred_by_me,
      COALESCE((SELECT json_agg(mu.username ORDER BY pm.joined_at) FROM project_members pm JOIN users mu ON mu.id = pm.user_id WHERE pm.project_id = p.id), '[]'::json) AS team
    FROM projects p JOIN users o ON o.id = p.owner_id
    WHERE p.deleted_at IS NULL ${where}`;

  const postsQuery = (where) => `
    SELECT p.*, a.username AS author_username,
      (SELECT count(*)::int FROM post_likes l WHERE l.post_id = p.id) AS like_count,
      EXISTS (SELECT 1 FROM post_likes l WHERE l.post_id = p.id AND l.user_id = $1::uuid) AS liked_by_me
    FROM posts p JOIN users a ON a.id = p.author_id
    WHERE p.deleted_at IS NULL ${where}`;

  const fetchProject = async (id, meId) => (await db.query(projectsQuery('AND p.id = $2'), [meId, id])).rows[0];
  const fetchPost = async (id, meId) => (await db.query(postsQuery('AND p.id = $2'), [meId, id])).rows[0];

  /* ---------- assistant IA (service FastAPI d'Exaucé) ---------- */
  const aiReply = async (prompt) => {
    if (prompt.trim().length < 3) return { content: 'Pose-moi une question un peu plus détaillée 🙂' };
    try {
      const response = await fetch(`${config.aiServiceUrl}/v1/generate`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...(config.aiServiceKey ? { 'x-internal-key': config.aiServiceKey } : {}) },
        body: JSON.stringify({ prompt: prompt.slice(0, 4000) }),
        signal: AbortSignal.timeout(config.aiTimeoutMs)
      });
      if (!response.ok) throw new Error(`ai-service HTTP ${response.status}`);
      const data = await response.json();
      return extractCode(String(data.content ?? ''));
    } catch (error) {
      api.log.warn({ err: error }, 'ai-service unreachable');
      return { content: "Je n'arrive pas à joindre mon service IA pour l'instant. Vérifie la configuration du serveur (LLM_API_KEY, AI_SERVICE_URL), ou repose ta question dans un instant." };
    }
  };

  /* ============================================================
     Authentification
     ============================================================ */
  api.post('/auth/register', {
    config: { rateLimit: { max: 5, timeWindow: 60000 } },
    schema: { body: { type: 'object', required: ['name', 'username', 'email', 'password'], properties: {
      name: { type: 'string', minLength: 1, maxLength: 100 }, username: { type: 'string', maxLength: 30 },
      email: { type: 'string', format: 'email', maxLength: 320 }, password: { type: 'string', maxLength: 128 },
      city: { type: 'string', maxLength: 120 }, country: { type: 'string', maxLength: 80 } } } }
  }, async (request, reply) => {
    const { name, username, password, city, country } = request.body;
    const email = request.body.email.trim().toLowerCase();
    if (!/^[a-zA-Z0-9_]{3,30}$/.test(username)) return fail(reply, 400, 'INVALID_USERNAME', "Nom d'utilisateur : 3 à 30 caractères (lettres, chiffres, _)");
    if (password.length < 12) return fail(reply, 400, 'WEAK_PASSWORD', 'Le mot de passe doit contenir au moins 12 caractères');
    const hash = await argon2.hash(password, { type: argon2.argon2id });
    const client = await db.transaction();
    try {
      const { rows } = await client.query(
        `INSERT INTO users (email, username, password_hash, display_name, city, country, headline, online, email_verified_at)
         VALUES ($1, $2, $3, $4, $5, $6, 'Developer', $7, CASE WHEN $7 THEN now() END) RETURNING id, email, username, role`,
        [email, username, hash, name.trim(), city ?? '', country ?? '', config.autoVerifyEmail]
      );
      if (!config.autoVerifyEmail) {
        const verification = createVerificationToken();
        await client.query('INSERT INTO email_verification_tokens (token_hash, user_id, expires_at) VALUES ($1, $2, now() + $3::interval)', [verification.hash, rows[0].id, config.emailVerificationTtl]);
        await emailSender.sendVerification({ email, token: verification.token });
        await client.commit();
        return reply.code(201).send({ emailVerificationRequired: true, message: 'Compte créé : confirme ton adresse e-mail avant de te connecter.' });
      }
      await client.commit();
      await api.issueTokens(reply, rows[0]);
      return reply.code(201).send({ dev: serDev(await loadUser(rows[0].id), { includePrivate: true }) });
    } catch (error) {
      await client.rollback();
      if (error.code === '23505') return fail(reply, 409, 'CONFLICT', 'Email ou nom d’utilisateur déjà utilisé');
      if (error.code === 'EMAIL_PROVIDER_NOT_CONFIGURED') return fail(reply, 503, 'EMAIL_UNAVAILABLE', "L'envoi d'e-mails n'est pas configuré sur le serveur");
      throw error;
    }
  });

  api.post('/auth/login', {
    config: { rateLimit: { max: 10, timeWindow: 60000 } },
    schema: { body: { type: 'object', required: ['email', 'password'], properties: { email: { type: 'string', maxLength: 320 }, password: { type: 'string', maxLength: 128 } } } }
  }, async (request, reply) => {
    const { rows } = await db.query('SELECT id, email, username, role, password_hash, email_verified_at FROM users WHERE email = $1 AND deleted_at IS NULL', [request.body.email.trim().toLowerCase()]);
    const valid = Boolean(rows[0]?.password_hash) && await argon2.verify(rows[0].password_hash, request.body.password);
    if (!valid) return fail(reply, 401, 'INVALID_CREDENTIALS', 'Identifiants incorrects');
    if (!rows[0].email_verified_at) return fail(reply, 403, 'EMAIL_NOT_VERIFIED', 'Confirme ton adresse e-mail avant de te connecter');
    await db.query('UPDATE users SET online = true WHERE id = $1', [rows[0].id]);
    await api.issueTokens(reply, rows[0]);
    return { dev: serDev(await loadUser(rows[0].id), { includePrivate: true }) };
  });

  api.post('/auth/logout', async (request, reply) => {
    const me = await optionalUserId(request);
    if (me) {
      await db.query('UPDATE users SET online = false WHERE id = $1', [me]);
      await db.query('UPDATE refresh_tokens SET revoked_at = now() WHERE user_id = $1 AND revoked_at IS NULL', [me]);
    }
    return api.clearAuthCookies(reply).send({ ok: true });
  });

  api.get('/auth/me', { preHandler: api.auth }, async (request, reply) => {
    const user = await loadUser(request.user.sub);
    if (!user) return fail(reply, 404, 'NOT_FOUND', 'Compte introuvable');
    return { dev: serDev(user, { includePrivate: true }) };
  });

  api.patch('/auth/me', {
    preHandler: api.auth,
    bodyLimit: 6 * 1024 * 1024, // photo de profil en data URL (≤ 4 Mo côté interface)
    schema: { body: { type: 'object', properties: {
      name: { type: 'string', minLength: 1, maxLength: 100 }, role: { type: 'string', maxLength: 120 },
      city: { type: 'string', maxLength: 120 }, country: { type: 'string', maxLength: 80 }, flag: { type: 'string', maxLength: 16 },
      bio: { type: 'string', maxLength: 2000 }, availability: { type: 'string', enum: AVAILABILITIES },
      avatarUrl: { type: 'string', maxLength: 6 * 1024 * 1024 },
      skills: { type: 'array', maxItems: 30, items: { type: 'object', required: ['name', 'level'], properties: { name: { type: 'string', maxLength: 60 }, level: { type: 'integer', minimum: 0, maximum: 100 } } } },
      langs: { type: 'array', maxItems: 20, items: { type: 'string', maxLength: 40 } }
      // pas de `badges` ici : un badge se mérite, il ne se déclare pas soi-même
    }, additionalProperties: false } }
  }, async (request, reply) => {
    const b = request.body;
    if (b.avatarUrl && !/^(https?:\/\/|data:image\/(png|jpe?g|gif|webp);base64,)/.test(b.avatarUrl)) {
      return fail(reply, 400, 'INVALID_AVATAR', 'Photo de profil invalide');
    }
    const json = (value) => (value === undefined ? null : JSON.stringify(value));
    await db.query(
      `UPDATE users SET display_name = COALESCE($1, display_name), headline = COALESCE($2, headline), city = COALESCE($3, city),
         country = COALESCE($4, country), flag = COALESCE($5, flag), bio = COALESCE($6, bio), availability = COALESCE($7, availability),
         avatar_url = COALESCE($8, avatar_url), skills = COALESCE($9::jsonb, skills), langs = COALESCE($10::jsonb, langs),
         updated_at = now()
       WHERE id = $11 AND deleted_at IS NULL`,
      [b.name, b.role, b.city, b.country, b.flag, b.bio, b.availability, b.avatarUrl, json(b.skills), json(b.langs), request.user.sub]
    );
    await touchBadges(request.user.sub);
    return { dev: serDev(await loadUser(request.user.sub), { includePrivate: true }) };
  });

  /* ============================================================
     Développeurs
     ============================================================ */
  api.get('/devs', async (request) => {
    const me = await optionalUserId(request);
    const { rows } = await db.query(
      `SELECT ${USER_COLUMNS}, EXISTS (SELECT 1 FROM follows f WHERE f.follower_id = $1::uuid AND f.followee_id = u.id) AS following
       FROM users u WHERE u.deleted_at IS NULL AND u.username <> $2 ORDER BY u.reputation DESC, u.created_at ASC LIMIT 500`,
      [me, NORA_AGENT]
    );
    return { devs: rows.map((row) => serDev(row, { following: row.following })) };
  });

  api.get('/devs/:username', async (request, reply) => {
    const me = await optionalUserId(request);
    const { rows } = await db.query(
      `SELECT ${USER_COLUMNS}, EXISTS (SELECT 1 FROM follows f WHERE f.follower_id = $1::uuid AND f.followee_id = u.id) AS following
       FROM users u WHERE u.username = $2 AND u.deleted_at IS NULL`,
      [me, request.params.username]
    );
    if (!rows[0]) return fail(reply, 404, 'NOT_FOUND', 'Dev introuvable');
    return { dev: serDev(rows[0], { following: rows[0].following }) };
  });

  api.post('/devs/:username/follow', { preHandler: api.auth }, async (request, reply) => {
    const target = await userByUsername(request.params.username);
    if (!target || target.username === NORA_AGENT) return fail(reply, 404, 'NOT_FOUND', 'Dev introuvable');
    if (target.id === request.user.sub) return fail(reply, 400, 'INVALID_REQUEST', 'On ne se suit pas soi-même');
    const client = await db.transaction();
    try {
      const removed = await client.query('DELETE FROM follows WHERE follower_id = $1 AND followee_id = $2', [request.user.sub, target.id]);
      if (removed.rowCount) {
        await client.query('UPDATE users SET followers_count = GREATEST(followers_count - 1, 0) WHERE id = $1', [target.id]);
      } else {
        await client.query('INSERT INTO follows (follower_id, followee_id) VALUES ($1, $2)', [request.user.sub, target.id]);
        await client.query('UPDATE users SET followers_count = followers_count + 1 WHERE id = $1', [target.id]);
      }
      const { rows } = await client.query('SELECT followers_count FROM users WHERE id = $1', [target.id]);
      await client.commit();
      await touchBadges(target.id);
      return { following: !removed.rowCount, followers: rows[0].followers_count };
    } catch (error) { await client.rollback(); throw error; }
  });

  /* ============================================================
     Projets
     ============================================================ */
  api.get('/projects', async (request) => {
    const me = await optionalUserId(request);
    const { rows } = await db.query(`${projectsQuery('')} ORDER BY p.updated_at DESC LIMIT 200`, [me]);
    return { projects: rows.map(serProject) };
  });

  api.post('/projects', {
    preHandler: api.auth,
    schema: { body: { type: 'object', required: ['name'], properties: {
      name: { type: 'string', minLength: 1, maxLength: 160 }, tagline: { type: 'string', maxLength: 300 },
      description: { type: 'string', maxLength: 10000 }, domain: { type: 'string', maxLength: 60 },
      stack: { type: 'array', maxItems: 30, items: { type: 'string', maxLength: 50 } },
      status: { type: 'string', enum: PROJECT_STATUSES }, icon: { type: 'string', maxLength: 16 },
      cover: { type: 'string', maxLength: 500 }, repo: { type: 'string', maxLength: 200 } } } }
  }, async (request, reply) => {
    const b = request.body;
    const me = await loadUser(request.user.sub);
    const slug = b.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'projet';
    const client = await db.transaction();
    try {
      const { rows } = await client.query(
        `INSERT INTO projects (owner_id, title, description, technologies, tagline, domain, status, icon, cover, repo)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
        [me.id, b.name.trim(), b.description ?? '', b.stack ?? [], b.tagline ?? '', b.domain ?? 'Communautaire', b.status ?? 'dev', b.icon ?? '🚀', b.cover ?? null, b.repo || `nora/${me.username}/${slug}`]
      );
      await client.query('INSERT INTO project_members (project_id, user_id) VALUES ($1, $2)', [rows[0].id, me.id]);
      await client.query('UPDATE users SET projects_count = projects_count + 1 WHERE id = $1', [me.id]);
      await client.commit();
      await touchBadges(me.id);
      return reply.code(201).send({ project: serProject(await fetchProject(rows[0].id, me.id)) });
    } catch (error) { await client.rollback(); throw error; }
  });

  api.post('/projects/:id/star', { preHandler: api.auth }, async (request, reply) => {
    const starred = await fetchProject(request.params.id, null).catch(() => null);
    if (!starred) return fail(reply, 404, 'NOT_FOUND', 'Projet introuvable');
    const removed = await db.query('DELETE FROM project_stars WHERE project_id = $1 AND user_id = $2', [request.params.id, request.user.sub]);
    if (!removed.rowCount) await db.query('INSERT INTO project_stars (project_id, user_id) VALUES ($1, $2)', [request.params.id, request.user.sub]);
    await touchBadges(starred.owner_id);
    return { project: serProject(await fetchProject(request.params.id, request.user.sub)) };
  });

  api.post('/projects/:id/join', { preHandler: api.auth }, async (request, reply) => {
    const project = await fetchProject(request.params.id, null).catch(() => null);
    if (!project) return fail(reply, 404, 'NOT_FOUND', 'Projet introuvable');
    if (project.owner_id === request.user.sub) return fail(reply, 400, 'INVALID_REQUEST', 'Le créateur du projet ne peut pas quitter son équipe');
    const removed = await db.query('DELETE FROM project_members WHERE project_id = $1 AND user_id = $2', [request.params.id, request.user.sub]);
    if (!removed.rowCount) await db.query('INSERT INTO project_members (project_id, user_id) VALUES ($1, $2)', [request.params.id, request.user.sub]);
    await db.query('UPDATE projects SET updated_at = now() WHERE id = $1', [request.params.id]);
    await touchBadges(request.user.sub, project.owner_id);
    return { project: serProject(await fetchProject(request.params.id, request.user.sub)), joined: !removed.rowCount };
  });

  /* ============================================================
     Fil d'actualité
     ============================================================ */
  api.get('/posts', async (request) => {
    const me = await optionalUserId(request);
    const { rows } = await db.query(`${postsQuery('')} ORDER BY p.created_at DESC LIMIT 200`, [me]);
    return { posts: rows.map(serPost) };
  });

  api.post('/posts', {
    preHandler: api.auth,
    schema: { body: { type: 'object', required: ['content'], properties: {
      content: { type: 'string', minLength: 1, maxLength: 5000 }, type: { type: 'string', enum: POST_TYPES },
      tags: { type: 'array', maxItems: 10, items: { type: 'string', maxLength: 40 } }, projectId: { type: 'string', format: 'uuid' } } } }
  }, async (request, reply) => {
    const b = request.body;
    const { rows } = await db.query(
      'INSERT INTO posts (author_id, content, type, tags, project_id) VALUES ($1, $2, $3, $4::jsonb, $5) RETURNING id',
      [request.user.sub, b.content, b.type ?? 'text', JSON.stringify(b.tags ?? []), b.projectId ?? null]
    );
    return reply.code(201).send({ post: serPost(await fetchPost(rows[0].id, request.user.sub)) });
  });

  api.post('/posts/:id/like', { preHandler: api.auth }, async (request, reply) => {
    if (!await fetchPost(request.params.id, null).catch(() => null)) return fail(reply, 404, 'NOT_FOUND', 'Post introuvable');
    const removed = await db.query('DELETE FROM post_likes WHERE post_id = $1 AND user_id = $2', [request.params.id, request.user.sub]);
    if (!removed.rowCount) await db.query('INSERT INTO post_likes (post_id, user_id) VALUES ($1, $2)', [request.params.id, request.user.sub]);
    return { post: serPost(await fetchPost(request.params.id, request.user.sub)) };
  });

  /* ============================================================
     Salons publics (espaces de collaboration marqués is_channel)
     ============================================================ */
  const channelBySlug = async (slug) => (await db.query(
    'SELECT id FROM collaboration_spaces WHERE slug = $1 AND is_channel AND NOT is_private AND archived_at IS NULL', [slug]
  )).rows[0];

  api.get('/channels', async () => {
    const { rows } = await db.query(
      `SELECT s.slug AS id, s.name, s.kind, s.topic, s.members_base + (SELECT count(*)::int FROM collaboration_members m WHERE m.space_id = s.id) AS members
       FROM collaboration_spaces s WHERE s.is_channel AND NOT s.is_private AND s.archived_at IS NULL ORDER BY s.position, s.created_at`
    );
    return { channels: rows };
  });

  api.get('/channels/:id/messages', async (request, reply) => {
    const channel = await channelBySlug(request.params.id);
    if (!channel) return fail(reply, 404, 'NOT_FOUND', 'Salon introuvable');
    const { rows } = await db.query(
      `SELECT * FROM (SELECT m.id, m.content, m.kind, m.code_lang, m.code_snippet, m.created_at, u.username AS author_username
         FROM collaboration_messages m JOIN users u ON u.id = m.author_id WHERE m.space_id = $1 ORDER BY m.created_at DESC LIMIT 80) recent
       ORDER BY created_at ASC`,
      [channel.id]
    );
    return { messages: rows.map(serMessage) };
  });

  api.post('/channels/:id/messages', {
    preHandler: api.auth,
    schema: { body: { type: 'object', required: ['content'], properties: {
      content: { type: 'string', minLength: 1, maxLength: 4000 }, kind: { type: 'string', enum: ['text', 'code'] },
      code: { type: 'object', properties: { lang: { type: 'string', maxLength: 40 }, snippet: { type: 'string', maxLength: 20000 } } } } } }
  }, async (request, reply) => {
    const channel = await channelBySlug(request.params.id);
    if (!channel) return fail(reply, 404, 'NOT_FOUND', 'Salon introuvable');
    const b = request.body;
    await db.query("INSERT INTO collaboration_members (space_id, user_id, role) VALUES ($1, $2, 'member') ON CONFLICT DO NOTHING", [channel.id, request.user.sub]);
    const { rows } = await db.query(
      `WITH created AS (INSERT INTO collaboration_messages (space_id, author_id, content, kind, code_lang, code_snippet)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *)
       SELECT created.*, u.username AS author_username FROM created JOIN users u ON u.id = created.author_id`,
      [channel.id, request.user.sub, b.content, b.kind ?? 'text', b.code?.lang ?? null, b.code?.snippet ?? null]
    );
    return reply.code(201).send({ message: serMessage(rows[0]) });
  });

  /* ============================================================
     Challenges, missions, hackathons, statistiques
     ============================================================ */
  /* participants réels = inscrits ∪ personnes ayant soumis une solution */
  const CHALLENGE_PARTICIPANTS = `(SELECT count(*)::int FROM (
      SELECT p.user_id FROM challenge_participants p WHERE p.challenge_id = c.id
      UNION SELECT s.user_id FROM challenge_submissions s WHERE s.challenge_id = c.id) who)`;

  api.get('/challenges', async (request) => {
    const me = await optionalUserId(request);
    const { rows } = await db.query(
      `SELECT c.*, u.username AS creator_username, ${CHALLENGE_PARTICIPANTS} AS submitters,
         EXISTS (SELECT 1 FROM challenge_participants p WHERE p.challenge_id = c.id AND p.user_id = $1::uuid) AS joined
       FROM challenges c JOIN users u ON u.id = c.creator_id
       WHERE c.status = 'published' AND (c.ends_at IS NULL OR c.ends_at > now())
       ORDER BY c.starts_at DESC NULLS LAST, c.ends_at ASC NULLS LAST LIMIT 100`,
      [me]
    );
    return { challenges: rows.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      difficulty: DIFFICULTY_LABELS[c.difficulty] ?? c.difficulty,
      language: c.language,
      by: c.creator_username === NORA_AGENT ? 'NORA' : c.creator_username,
      participants: c.participants_base + c.submitters,
      endsIn: endsIn(c.ends_at),
      points: c.points,
      successRate: c.success_rate,
      joined: c.joined
    })) };
  });

  /* s'inscrire / se désinscrire d'un challenge */
  api.post('/challenges/:id/join', { preHandler: api.auth }, async (request, reply) => {
    const challenge = (await db.query(
      `SELECT c.id FROM challenges c WHERE c.id = $1 AND c.status = 'published' AND (c.ends_at IS NULL OR c.ends_at > now())`,
      [request.params.id]
    ).catch(() => ({ rows: [] }))).rows[0];
    if (!challenge) return fail(reply, 404, 'NOT_FOUND', 'Challenge introuvable ou terminé');
    const removed = await db.query('DELETE FROM challenge_participants WHERE challenge_id = $1 AND user_id = $2', [challenge.id, request.user.sub]);
    if (!removed.rowCount) await db.query('INSERT INTO challenge_participants (challenge_id, user_id) VALUES ($1, $2)', [challenge.id, request.user.sub]);
    const { rows } = await db.query(`SELECT c.participants_base + ${CHALLENGE_PARTICIPANTS} AS participants FROM challenges c WHERE c.id = $1`, [challenge.id]);
    return { joined: !removed.rowCount, participants: rows[0].participants };
  });

  api.get('/missions', async (request) => {
    const me = await optionalUserId(request);
    const { rows } = await db.query(
      `SELECT o.*, EXISTS (SELECT 1 FROM opportunity_applications a WHERE a.opportunity_id = o.id AND a.user_id = $1::uuid) AS applied
       FROM opportunities o WHERE o.type = 'freelance' AND o.status = 'published' ORDER BY o.created_at DESC LIMIT 100`,
      [me]
    );
    return { missions: rows.map((o) => ({
      id: o.id,
      title: o.title,
      client: o.details.client ?? '',
      city: o.details.city ?? '',
      flag: o.details.flag ?? '🌍',
      budget: o.compensation?.budget ?? '',
      duration: o.details.duration ?? '',
      skills: o.details.skills ?? [],
      money: o.compensation?.money ?? 'Wave',
      urgency: o.details.urgency ?? 'Flexible',
      match: o.details.match ?? 0,
      applied: o.applied
    })) };
  });

  /* candidater à une mission : enregistrée et notifiée à son auteur */
  api.post('/missions/:id/apply', {
    preHandler: api.auth,
    schema: { body: { type: 'object', properties: { message: { type: 'string', maxLength: 2000 } } } }
  }, async (request, reply) => {
    const mission = (await db.query(
      "SELECT id, author_id FROM opportunities WHERE id = $1 AND type = 'freelance' AND status = 'published'", [request.params.id]
    ).catch(() => ({ rows: [] }))).rows[0];
    if (!mission) return fail(reply, 404, 'NOT_FOUND', 'Mission introuvable');
    if (mission.author_id === request.user.sub) return fail(reply, 400, 'INVALID_REQUEST', 'Tu ne peux pas candidater à ta propre mission');
    const inserted = await db.query(
      'INSERT INTO opportunity_applications (opportunity_id, user_id, message) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
      [mission.id, request.user.sub, request.body?.message ?? '']
    );
    if (inserted.rowCount) {
      await db.query('INSERT INTO notifications (user_id, type, payload) VALUES ($1, $2, $3)',
        [mission.author_id, 'mission.application', { opportunityId: mission.id, applicantId: request.user.sub }]);
    }
    return reply.code(inserted.rowCount ? 201 : 200).send({ applied: true });
  });

  api.get('/hackathons', async () => {
    const { rows } = await db.query("SELECT id, payload FROM feature_documents WHERE feature = 'hackathon' AND status = 'published' AND deleted_at IS NULL ORDER BY created_at ASC LIMIT 100");
    return { hackathons: rows.map((h) => ({
      id: h.id,
      name: h.payload.name ?? '',
      tagline: h.payload.tagline ?? '',
      date: h.payload.date ?? '',
      mode: h.payload.mode ?? 'En ligne',
      place: h.payload.place ?? '',
      prize: h.payload.prize ?? '',
      teams: h.payload.teams ?? 0,
      deadline: h.payload.deadline ?? '',
      color: h.payload.color ?? DEFAULT_GRADIENT
    })) };
  });

  api.get('/stats', async () => {
    const { rows } = await db.query(
      `SELECT (SELECT count(*)::int FROM users WHERE deleted_at IS NULL AND username <> $1) AS devs,
              (SELECT count(*)::int FROM projects WHERE deleted_at IS NULL) AS projects,
              (SELECT count(*)::int FROM posts WHERE deleted_at IS NULL) AS posts,
              (SELECT count(*)::int FROM collaboration_spaces WHERE is_channel AND NOT is_private AND archived_at IS NULL) AS channels,
              (SELECT count(DISTINCT country)::int FROM users WHERE deleted_at IS NULL AND COALESCE(country, '') <> '') AS countries`,
      [NORA_AGENT]
    );
    return { stats: rows[0] };
  });

  /* ============================================================
     Messagerie privée (validée par le destinataire)
     ============================================================ */
  const requestBetween = async (a, b) => (await db.query(
    'SELECT * FROM contact_requests WHERE (from_id = $1 AND to_id = $2) OR (from_id = $2 AND to_id = $1) LIMIT 1', [a, b]
  )).rows[0];

  api.get('/contact-requests', { preHandler: api.auth }, async (request) => {
    const { rows } = await db.query(
      `SELECT r.status, r.from_id, f.username AS from_username, t.username AS to_username
       FROM contact_requests r JOIN users f ON f.id = r.from_id JOIN users t ON t.id = r.to_id
       WHERE r.from_id = $1 OR r.to_id = $1 ORDER BY r.created_at DESC`,
      [request.user.sub]
    );
    return {
      incoming: rows.filter((r) => r.from_id !== request.user.sub && r.status === 'pending').map((r) => ({ username: r.from_username })),
      outgoing: rows.filter((r) => r.from_id === request.user.sub).map((r) => ({ username: r.to_username, status: r.status }))
    };
  });

  api.post('/contact-requests', {
    preHandler: api.auth,
    schema: { body: { type: 'object', required: ['username'], properties: { username: { type: 'string', maxLength: 30 } } } }
  }, async (request, reply) => {
    const target = await userByUsername(request.body.username);
    if (!target || target.username === NORA_AGENT) return fail(reply, 404, 'NOT_FOUND', 'Dev introuvable');
    if (target.id === request.user.sub) return fail(reply, 400, 'INVALID_REQUEST', 'Impossible de se contacter soi-même');
    const existing = await requestBetween(request.user.sub, target.id);
    if (existing) return { status: existing.status };
    const { rows } = await db.query("INSERT INTO contact_requests (from_id, to_id) VALUES ($1, $2) RETURNING status", [request.user.sub, target.id]);
    return reply.code(201).send({ status: rows[0].status });
  });

  api.post('/contact-requests/:username', {
    preHandler: api.auth,
    schema: { body: { type: 'object', required: ['action'], properties: { action: { type: 'string', enum: ['accept', 'decline'] } } } }
  }, async (request, reply) => {
    const sender = await userByUsername(request.params.username);
    const pending = sender && (await db.query('SELECT * FROM contact_requests WHERE from_id = $1 AND to_id = $2', [sender.id, request.user.sub])).rows[0];
    if (!pending) return fail(reply, 404, 'NOT_FOUND', 'Demande introuvable');
    if (pending.status !== 'pending') return { status: pending.status };
    const { rows } = await db.query('UPDATE contact_requests SET status = $1 WHERE id = $2 RETURNING status', [request.body.action === 'accept' ? 'accepted' : 'declined', pending.id]);
    return { status: rows[0].status };
  });

  api.get('/dms', { preHandler: api.auth }, async (request) => {
    const me = request.user.sub;
    const { rows: requests } = await db.query(
      `SELECT r.status, r.from_id, f.username AS from_username, t.username AS to_username
       FROM contact_requests r JOIN users f ON f.id = r.from_id JOIN users t ON t.id = r.to_id
       WHERE r.from_id = $1 OR r.to_id = $1 ORDER BY r.created_at ASC`,
      [me]
    );
    const contacts = [];
    const incoming = [];
    const outgoing = [];
    for (const r of requests) {
      const other = r.from_id === me ? r.to_username : r.from_username;
      if (r.status === 'accepted') contacts.push(other);
      else if (r.status === 'pending' && r.from_id !== me) incoming.push(other);
      else if (r.status === 'pending') outgoing.push({ username: other, status: 'pending' });
    }
    const peers = [...contacts, NORA_AGENT];
    const { rows: messages } = await db.query(
      `SELECT d.id, d.content, d.created_at, s.username AS author_username,
              CASE WHEN d.sender_id = $1 THEN r.username ELSE s.username END AS peer
       FROM direct_messages d JOIN users s ON s.id = d.sender_id JOIN users r ON r.id = d.recipient_id
       WHERE (d.sender_id = $1 OR d.recipient_id = $1)
         AND (CASE WHEN d.sender_id = $1 THEN r.username ELSE s.username END) = ANY($2::text[])
       ORDER BY d.created_at ASC LIMIT 2000`,
      [me, peers]
    );
    const threads = Object.fromEntries(peers.map((peer) => [peer, []]));
    for (const m of messages) threads[m.peer].push(serMessage(m));
    return { contacts, incoming, outgoing, threads };
  });

  api.post('/dms/:username', {
    preHandler: api.auth,
    schema: { body: { type: 'object', required: ['content'], properties: { content: { type: 'string', minLength: 1, maxLength: 4000 } } } }
  }, async (request, reply) => {
    const me = request.user.sub;
    const insert = async (sender, recipient, content) => (await db.query(
      `WITH created AS (INSERT INTO direct_messages (sender_id, recipient_id, content) VALUES ($1, $2, $3) RETURNING *)
       SELECT created.*, u.username AS author_username FROM created JOIN users u ON u.id = created.sender_id`,
      [sender, recipient, content]
    )).rows[0];

    if (request.params.username === NORA_AGENT) {
      const agent = await noraAgentId();
      await insert(me, agent, request.body.content);
      const answer = await aiReply(request.body.content);
      const saved = await insert(agent, me, answer.content);
      return reply.code(201).send({ messages: [serMessage(saved)], aiCode: answer.code ?? null });
    }

    const target = await userByUsername(request.params.username);
    if (!target) return fail(reply, 404, 'NOT_FOUND', 'Dev introuvable');
    const contact = await requestBetween(me, target.id);
    if (contact?.status !== 'accepted') return fail(reply, 403, 'CONTACT_NOT_ACCEPTED', 'Demande de contact non validée');
    return reply.code(201).send({ messages: [serMessage(await insert(me, target.id, request.body.content))] });
  });

  /* ============================================================
     Assistant IA
     ============================================================ */
  api.post('/ai/chat', {
    preHandler: api.auth,
    config: { rateLimit: { max: 20, timeWindow: 60000 } },
    schema: { body: { type: 'object', required: ['prompt'], properties: { prompt: { type: 'string', minLength: 1, maxLength: 4000 } } } }
  }, async (request) => ({ answer: await aiReply(request.body.prompt) }));

  /* ============================================================
     Notifications calculées (contacts, likes, étoiles, messages)
     ============================================================ */
  api.get('/notifications', { preHandler: api.auth }, async (request) => {
    const me = request.user.sub;
    const [contacts, likes, stars, messages] = await Promise.all([
      db.query(`SELECT r.id, u.username, r.created_at FROM contact_requests r JOIN users u ON u.id = r.from_id
                WHERE r.to_id = $1 AND r.status = 'pending' ORDER BY r.created_at DESC LIMIT 6`, [me]),
      db.query(`SELECT l.post_id, u.username, left(p.content, 60) AS target, l.created_at FROM post_likes l
                JOIN posts p ON p.id = l.post_id JOIN users u ON u.id = l.user_id
                WHERE p.author_id = $1 AND l.user_id <> $1 ORDER BY l.created_at DESC LIMIT 6`, [me]),
      db.query(`SELECT s.project_id, u.username, p.title AS target, s.created_at FROM project_stars s
                JOIN projects p ON p.id = s.project_id JOIN users u ON u.id = s.user_id
                WHERE p.owner_id = $1 AND s.user_id <> $1 ORDER BY s.created_at DESC LIMIT 6`, [me]),
      db.query(`SELECT d.id, u.username, left(d.content, 60) AS target, d.created_at FROM direct_messages d
                JOIN users u ON u.id = d.sender_id WHERE d.recipient_id = $1 ORDER BY d.created_at DESC LIMIT 6`, [me])
    ]);
    const iso = (date) => new Date(date).toISOString();
    const notifications = [
      ...contacts.rows.map((r) => ({ id: `contact-${r.id}`, kind: 'contact', from: r.username, createdAtIso: iso(r.created_at) })),
      ...likes.rows.map((r) => ({ id: `like-${r.post_id}-${r.username}`, kind: 'like', from: r.username, target: r.target, createdAtIso: iso(r.created_at) })),
      ...stars.rows.map((r) => ({ id: `star-${r.project_id}-${r.username}`, kind: 'star', from: r.username, target: r.target, createdAtIso: iso(r.created_at) })),
      ...messages.rows.map((r) => ({ id: `message-${r.id}`, kind: 'message', from: r.username, target: r.target, createdAtIso: iso(r.created_at) }))
    ].sort((a, b) => b.createdAtIso.localeCompare(a.createdAtIso));
    return { notifications };
  });

  /* ============================================================
     Studio — fichiers de code persistés par dev
     ============================================================ */
  const serFile = (f) => ({ id: f.id, path: f.path, content: f.content, language: f.language, updatedAt: new Date(f.updated_at).toISOString() });

  api.get('/workspace', { preHandler: api.auth }, async (request) => {
    const list = () => db.query('SELECT * FROM workspace_files WHERE user_id = $1 ORDER BY path ASC', [request.user.sub]);
    let { rows } = await list();
    if (!rows.length) {
      for (const starter of WORKSPACE_STARTERS) {
        await db.query('INSERT INTO workspace_files (user_id, path, content, language) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING', [request.user.sub, starter.path, starter.content, starter.language]);
      }
      ({ rows } = await list());
    }
    return { files: rows.map(serFile) };
  });

  api.post('/workspace', {
    preHandler: api.auth,
    schema: { body: { type: 'object', required: ['path'], properties: {
      path: { type: 'string', maxLength: 200 }, content: { type: 'string', maxLength: 500000 }, language: { type: 'string', maxLength: 30 } } } }
  }, async (request, reply) => {
    const path = request.body.path.trim().replace(/^\/+/, '');
    if (!path || path.length > 120 || path.split('/').includes('..')) return fail(reply, 400, 'INVALID_PATH', 'Chemin invalide');
    const { rows } = await db.query(
      `INSERT INTO workspace_files (user_id, path, content, language) VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id, path) DO UPDATE SET content = EXCLUDED.content, language = EXCLUDED.language, updated_at = now() RETURNING *`,
      [request.user.sub, path, request.body.content ?? '', request.body.language ?? guessLanguage(path)]
    );
    return { file: serFile(rows[0]) };
  });

  api.delete('/workspace', { preHandler: api.auth }, async (request) => {
    await db.query('DELETE FROM workspace_files WHERE user_id = $1 AND path = $2', [request.user.sub, String(request.query.path ?? '')]);
    return { ok: true };
  });

  /* ============================================================
     GitHub — dépôts publics d'un utilisateur
     ============================================================ */
  api.get('/github/repos', { preHandler: api.auth }, async (request, reply) => {
    const user = String(request.query.user ?? '').trim();
    if (!/^[a-zA-Z0-9-]{1,39}$/.test(user)) return fail(reply, 400, 'INVALID_REQUEST', 'Paramètre user invalide');
    const headers = { accept: 'application/vnd.github+json', 'user-agent': 'nora-api' };
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${user}`, { headers, signal: AbortSignal.timeout(10000) }),
        fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=8`, { headers, signal: AbortSignal.timeout(10000) })
      ]);
      if (userRes.status === 404) return fail(reply, 404, 'NOT_FOUND', 'Utilisateur GitHub introuvable.');
      if (!userRes.ok || !reposRes.ok) return fail(reply, 502, 'GITHUB_UNAVAILABLE', 'GitHub est momentanément indisponible.');
      const u = await userRes.json();
      const repos = await reposRes.json();
      return {
        user: { login: u.login, avatarUrl: u.avatar_url, publicRepos: u.public_repos, bio: u.bio ?? '' },
        repos: repos.map((r) => ({
          name: r.name, fullName: r.full_name, description: r.description ?? '', language: r.language,
          stars: r.stargazers_count, forks: r.forks_count, url: r.html_url, updatedAtIso: r.updated_at, topics: r.topics?.slice(0, 4) ?? []
        }))
      };
    } catch {
      return fail(reply, 502, 'GITHUB_UNAVAILABLE', 'GitHub injoignable depuis le serveur.');
    }
  });
}
