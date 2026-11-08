import Fastify from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import websocket from '@fastify/websocket';
import rawBody from 'fastify-raw-body';
import { loadConfig } from './config.js';
import { createDb } from './db.js';
import { registerAuth } from './auth.js';
import { registerCollaboration } from './collaboration.js';
import { registerPlatform } from './platform.js';
import { registerCsrf } from './csrf.js';
import { registerExtensibleFeatures } from './extensibleFeatures.js';
import { createEmailSender } from './email.js';

const config = loadConfig();
const db = createDb(config);
const emailSender = createEmailSender(config);
const app = Fastify({ logger: { level: config.logLevel }, bodyLimit: 1024 * 1024 });

await app.register(cors, { origin: config.corsOrigin, credentials: true });
await app.register(cookie);
await app.register(websocket, { options: { maxPayload: 64 * 1024 } });
await app.register(rawBody, { field: 'rawBody', global: false, encoding: 'utf8', runFirst: true });
await app.register(helmet);
await app.register(rateLimit, { global: true, max: config.rateLimitMax, timeWindow: config.rateLimitWindowMs });
await app.register(swagger, { openapi: { info: { title: 'NORA API', version: '0.1.0' }, servers: [{ url: '/api/v1' }] } });
await app.register(swaggerUi, { routePrefix: '/docs' });
registerCsrf(app, config);
app.addHook('onClose', async () => db.end());

app.get('/health', async () => ({ status: 'ok' }));
await app.register(async (api) => {
  registerAuth(api, db, config, emailSender);
  registerCollaboration(api, db);
  registerPlatform(api, db);
  registerExtensibleFeatures(api, db);
  api.get('/me', { preHandler: api.auth }, async (request, reply) => {
    const { rows } = await db.query('SELECT id, email, username, display_name, bio, country, city, avatar_url, role, created_at FROM users WHERE id = $1 AND deleted_at IS NULL', [request.user.sub]);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'User not found' });
    return { user: rows[0] };
  });
  api.patch('/me', { preHandler: api.auth, schema: { body: { type: 'object', additionalProperties: false,
    properties: { displayName: { type: 'string', maxLength: 100 }, bio: { type: 'string', maxLength: 2000 }, country: { type: 'string', maxLength: 80 }, city: { type: 'string', maxLength: 120 }, avatarUrl: { type: 'string', format: 'uri', maxLength: 500 } } } } },
  async (request) => {
    const { displayName, bio, country, city, avatarUrl } = request.body;
    const { rows } = await db.query(`UPDATE users SET display_name = COALESCE($1, display_name), bio = COALESCE($2, bio), country = COALESCE($3, country), city = COALESCE($4, city), avatar_url = COALESCE($5, avatar_url), updated_at = now() WHERE id = $6 RETURNING id, email, username, display_name, bio, country, city, avatar_url, role`, [displayName, bio, country, city, avatarUrl, request.user.sub]);
    return { user: rows[0] };
  });
  api.delete('/me', { preHandler: api.auth }, async (request, reply) => {
    await db.query('UPDATE users SET deleted_at = now(), updated_at = now() WHERE id = $1 AND deleted_at IS NULL', [request.user.sub]);
    await db.query('UPDATE refresh_tokens SET revoked_at = now() WHERE user_id = $1 AND revoked_at IS NULL', [request.user.sub]);
    return reply.clearCookie('nora_access', { httpOnly: true, secure: config.cookieSecure, sameSite: 'lax', path: '/' })
      .clearCookie('nora_refresh', { httpOnly: true, secure: config.cookieSecure, sameSite: 'lax', path: '/' })
      .send({ ok: true });
  });
  api.get('/profiles/:username', async (request, reply) => {
    const { rows } = await db.query('SELECT id, username, display_name, bio, country, city, avatar_url, reputation, created_at FROM users WHERE username = $1 AND deleted_at IS NULL', [request.params.username]);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Profile not found' });
    return { profile: rows[0] };
  });
  api.post('/projects', { preHandler: api.auth, schema: { body: { type: 'object', required: ['title', 'description'], additionalProperties: false,
    properties: { title: { type: 'string', minLength: 1, maxLength: 160 }, description: { type: 'string', minLength: 1, maxLength: 10000 }, repositoryUrl: { type: 'string', format: 'uri', maxLength: 500 }, demoUrl: { type: 'string', format: 'uri', maxLength: 500 }, technologies: { type: 'array', maxItems: 30, items: { type: 'string', maxLength: 50 } } } } } },
  async (request, reply) => {
    const { rows } = await db.query('INSERT INTO projects (owner_id, title, description, repository_url, demo_url, technologies) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [request.user.sub, request.body.title, request.body.description, request.body.repositoryUrl ?? null, request.body.demoUrl ?? null, request.body.technologies ?? []]);
    return reply.code(201).send({ project: rows[0] });
  });
  api.get('/projects', async (request) => {
    const limit = Math.min(Number(request.query.limit ?? 20), 50);
    const offset = Math.max(Number(request.query.offset ?? 0), 0);
    const { rows } = await db.query('SELECT p.*, u.username, u.display_name FROM projects p JOIN users u ON u.id = p.owner_id WHERE p.deleted_at IS NULL ORDER BY p.created_at DESC LIMIT $1 OFFSET $2', [limit, offset]);
    return { projects: rows, limit, offset };
  });
  api.get('/projects/:id', async (request, reply) => {
    const { rows } = await db.query('SELECT p.*, u.username, u.display_name FROM projects p JOIN users u ON u.id = p.owner_id WHERE p.id = $1 AND p.deleted_at IS NULL', [request.params.id]);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Project not found' });
    return { project: rows[0] };
  });
  api.patch('/projects/:id', { preHandler: api.auth, schema: { body: { type: 'object', additionalProperties: false, properties: { title: { type: 'string', minLength: 1, maxLength: 160 }, description: { type: 'string', minLength: 1, maxLength: 10000 }, repositoryUrl: { type: 'string', format: 'uri', maxLength: 500 }, demoUrl: { type: 'string', format: 'uri', maxLength: 500 }, technologies: { type: 'array', maxItems: 30, items: { type: 'string', maxLength: 50 } } } } } }, async (request, reply) => {
    const { title, description, repositoryUrl, demoUrl, technologies } = request.body;
    const { rows } = await db.query('UPDATE projects SET title = COALESCE($1, title), description = COALESCE($2, description), repository_url = COALESCE($3, repository_url), demo_url = COALESCE($4, demo_url), technologies = COALESCE($5, technologies), updated_at = now() WHERE id = $6 AND owner_id = $7 AND deleted_at IS NULL RETURNING *', [title, description, repositoryUrl, demoUrl, technologies, request.params.id, request.user.sub]);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Project not found' });
    return { project: rows[0] };
  });
  api.delete('/projects/:id', { preHandler: api.auth }, async (request, reply) => {
    const result = await db.query('UPDATE projects SET deleted_at = now(), updated_at = now() WHERE id = $1 AND owner_id = $2 AND deleted_at IS NULL', [request.params.id, request.user.sub]);
    if (!result.rowCount) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Project not found' });
    return { ok: true };
  });
  api.post('/posts', { preHandler: api.auth, schema: { body: { type: 'object', required: ['content'], additionalProperties: false, properties: { content: { type: 'string', minLength: 1, maxLength: 5000 } } } } },
  async (request, reply) => {
    const { rows } = await db.query('INSERT INTO posts (author_id, content) VALUES ($1, $2) RETURNING *', [request.user.sub, request.body.content]);
    return reply.code(201).send({ post: rows[0] });
  });
  api.get('/posts/:id', async (request, reply) => {
    const { rows } = await db.query('SELECT p.*, u.username, u.display_name, u.avatar_url FROM posts p JOIN users u ON u.id = p.author_id WHERE p.id = $1 AND p.deleted_at IS NULL', [request.params.id]);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Post not found' });
    return { post: rows[0] };
  });
  api.patch('/posts/:id', { preHandler: api.auth, schema: { body: { type: 'object', required: ['content'], additionalProperties: false, properties: { content: { type: 'string', minLength: 1, maxLength: 5000 } } } } }, async (request, reply) => {
    const { rows } = await db.query('UPDATE posts SET content = $1 WHERE id = $2 AND author_id = $3 AND deleted_at IS NULL RETURNING *', [request.body.content, request.params.id, request.user.sub]);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Post not found' });
    return { post: rows[0] };
  });
  api.delete('/posts/:id', { preHandler: api.auth }, async (request, reply) => {
    const result = await db.query('UPDATE posts SET deleted_at = now() WHERE id = $1 AND author_id = $2 AND deleted_at IS NULL', [request.params.id, request.user.sub]);
    if (!result.rowCount) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Post not found' });
    return { ok: true };
  });
  api.get('/feed', async () => {
    const { rows } = await db.query('SELECT p.*, u.username, u.display_name, u.avatar_url FROM posts p JOIN users u ON u.id = p.author_id WHERE p.deleted_at IS NULL ORDER BY p.created_at DESC LIMIT 50');
    return { posts: rows };
  });
}, { prefix: '/api/v1' });

app.setErrorHandler((error, request, reply) => {
  if (error.validation) return reply.code(400).send({ error: 'VALIDATION_ERROR', message: error.message });
  request.log.error({ err: error }, 'request failed');
  return reply.code(error.statusCode ?? 500).send({ error: 'INTERNAL_ERROR', message: config.nodeEnv === 'production' ? 'Internal server error' : error.message });
});

await app.listen({ port: config.port, host: config.host });
