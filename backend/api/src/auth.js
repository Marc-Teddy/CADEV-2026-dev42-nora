import argon2 from 'argon2';
import crypto from 'node:crypto';

const ACCESS_COOKIE = 'nora_access';
const REFRESH_COOKIE = 'nora_refresh';

function createVerificationToken() {
  const token = crypto.randomBytes(32).toString('base64url');
  return { token, hash: crypto.createHash('sha256').update(token).digest('hex') };
}

export function registerAuth(app, db, config, emailSender) {
  app.register(import('@fastify/jwt'), {
    secret: config.accessSecret,
    cookie: { cookieName: ACCESS_COOKIE, signed: false },
    namespace: 'access',
    jwtVerify: 'verifyAccess',
    jwtSign: 'signAccess'
  });
  app.decorate('auth', async (request, reply) => {
    try {
      await request.jwtVerify({ onlyCookie: true });
    } catch {
      return reply.code(401).send({ error: 'UNAUTHENTICATED', message: 'Authentication required' });
    }
  });

  const cookieOptions = { httpOnly: true, secure: config.cookieSecure, sameSite: 'lax', path: '/' };
  const issueTokens = async (reply, user) => {
    const access = app.jwt.signAccess({ sub: user.id, role: user.role }, { expiresIn: config.accessTtl });
    const refreshJti = crypto.randomUUID();
    const refresh = app.jwt.signAccess({ sub: user.id, jti: refreshJti, type: 'refresh' }, {
      secret: config.refreshSecret, expiresIn: config.refreshTtl
    });
    await db.query(
      'INSERT INTO refresh_tokens (jti, user_id, expires_at) VALUES ($1, $2, now() + $3::interval)',
      [refreshJti, user.id, config.refreshTtl]
    );
    reply.setCookie(ACCESS_COOKIE, access, { ...cookieOptions, maxAge: 900 });
    reply.setCookie(REFRESH_COOKIE, refresh, { ...cookieOptions, maxAge: 604800 });
  };

  app.get('/auth/github', async (request, reply) => {
    if (!config.githubClientId || !config.githubCallbackUrl) {
      return reply.code(503).send({ error: 'OAUTH_UNAVAILABLE', message: 'GitHub OAuth is not configured' });
    }
    const state = crypto.randomBytes(32).toString('hex');
    reply.setCookie('nora_oauth_state', state, { ...cookieOptions, maxAge: 600 });
    const params = new URLSearchParams({ client_id: config.githubClientId, redirect_uri: config.githubCallbackUrl, scope: 'read:user user:email', state });
    return reply.redirect(`https://github.com/login/oauth/authorize?${params}`);
  });

  app.get('/auth/github/callback', async (request, reply) => {
    const { code, state } = request.query;
    if (!code || !state || state !== request.cookies?.nora_oauth_state) return reply.code(400).send({ error: 'INVALID_OAUTH_STATE', message: 'Invalid OAuth state' });
    if (!config.githubClientId || !config.githubClientSecret || !config.githubCallbackUrl) return reply.code(503).send({ error: 'OAUTH_UNAVAILABLE', message: 'GitHub OAuth is not configured' });
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST', headers: { accept: 'application/json', 'content-type': 'application/json' },
      body: JSON.stringify({ client_id: config.githubClientId, client_secret: config.githubClientSecret, code, redirect_uri: config.githubCallbackUrl })
    });
    if (!tokenResponse.ok) return reply.code(502).send({ error: 'OAUTH_PROVIDER_ERROR', message: 'OAuth provider token exchange failed' });
    const token = await tokenResponse.json();
    const profileResponse = await fetch('https://api.github.com/user', { headers: { authorization: `Bearer ${token.access_token}`, accept: 'application/vnd.github+json', 'user-agent': 'nora-api' } });
    const emailsResponse = await fetch('https://api.github.com/user/emails', { headers: { authorization: `Bearer ${token.access_token}`, accept: 'application/vnd.github+json', 'user-agent': 'nora-api' } });
    if (!profileResponse.ok || !emailsResponse.ok) return reply.code(502).send({ error: 'OAUTH_PROVIDER_ERROR', message: 'OAuth profile request failed' });
    const profile = await profileResponse.json();
    const emails = await emailsResponse.json();
    const email = emails.find((item) => item.primary && item.verified)?.email ?? emails.find((item) => item.verified)?.email;
    if (!email) return reply.code(400).send({ error: 'OAUTH_EMAIL_REQUIRED', message: 'A verified GitHub email is required' });
    const client = await db.transaction();
    try {
      const identity = await client.query('SELECT user_id FROM oauth_identities WHERE provider = $1 AND provider_user_id = $2', ['github', String(profile.id)]);
      let user;
      if (identity.rows[0]) {
        user = (await client.query('SELECT id, email, username, role FROM users WHERE id = $1', [identity.rows[0].user_id])).rows[0];
      } else {
        const username = `${String(profile.login).replace(/[^a-zA-Z0-9_]/g, '_').slice(0, 24)}_${String(profile.id).slice(-5)}`;
        user = (await client.query('INSERT INTO users (email, username, password_hash, display_name, avatar_url, email_verified_at) VALUES ($1, $2, NULL, $3, $4, now()) ON CONFLICT (email) DO UPDATE SET display_name = EXCLUDED.display_name, avatar_url = EXCLUDED.avatar_url RETURNING id, email, username, role', [email.toLowerCase(), username, profile.name ?? profile.login, profile.avatar_url])).rows[0];
        await client.query('INSERT INTO oauth_identities (provider, provider_user_id, user_id) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING', ['github', String(profile.id), user.id]);
      }
      await client.commit();
      await issueTokens(reply, user);
      reply.clearCookie('nora_oauth_state', cookieOptions);
      return { user };
    } catch (error) {
      await client.rollback();
      throw error;
    }
  });

  app.post('/auth/register', {
    config: { rateLimit: { max: 5, timeWindow: 60000 } },
    schema: { body: { type: 'object', required: ['email', 'password', 'username'], additionalProperties: false,
      properties: { email: { type: 'string', format: 'email', maxLength: 320 }, password: { type: 'string', minLength: 12, maxLength: 128 }, username: { type: 'string', pattern: '^[a-zA-Z0-9_]{3,30}$' } } } }
  }, async (request, reply) => {
    const email = request.body.email.trim().toLowerCase();
    const hash = await argon2.hash(request.body.password, { type: argon2.argon2id });
    const verification = createVerificationToken();
    const client = await db.transaction();
    try {
      const { rows } = await client.query(
        'INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING id, email, username, role',
        [email, request.body.username, hash]
      );
      await client.query(
        'INSERT INTO email_verification_tokens (token_hash, user_id, expires_at) VALUES ($1, $2, now() + $3::interval)',
        [verification.hash, rows[0].id, config.emailVerificationTtl]
      );
      await emailSender.sendVerification({ email, token: verification.token });
      await client.commit();
      return reply.code(201).send({ user: rows[0], emailVerificationRequired: true });
    } catch (error) {
      await client.rollback();
      if (error.code === '23505') return reply.code(409).send({ error: 'CONFLICT', message: 'Email or username already exists' });
      if (error.code === 'EMAIL_PROVIDER_NOT_CONFIGURED') return reply.code(503).send({ error: 'EMAIL_UNAVAILABLE', message: 'Email verification is not configured' });
      throw error;
    }
  });

  app.post('/auth/verify-email', {
    config: { rateLimit: { max: 10, timeWindow: 60000 } },
    schema: { body: { type: 'object', required: ['token'], additionalProperties: false, properties: { token: { type: 'string', minLength: 40, maxLength: 100 } } } }
  }, async (request, reply) => {
    const tokenHash = crypto.createHash('sha256').update(request.body.token).digest('hex');
    const client = await db.transaction();
    try {
      const result = await client.query(
        `UPDATE email_verification_tokens
         SET consumed_at = now()
         WHERE token_hash = $1 AND consumed_at IS NULL AND expires_at > now()
         RETURNING user_id`,
        [tokenHash]
      );
      if (!result.rows[0]) {
        await client.rollback();
        return reply.code(400).send({ error: 'INVALID_VERIFICATION_TOKEN', message: 'Verification link is invalid or expired' });
      }
      await client.query('UPDATE users SET email_verified_at = now(), updated_at = now() WHERE id = $1 AND deleted_at IS NULL', [result.rows[0].user_id]);
      await client.commit();
      return { verified: true };
    } catch (error) {
      await client.rollback();
      throw error;
    }
  });

  app.post('/auth/resend-verification', {
    config: { rateLimit: { max: 3, timeWindow: 60000 } },
    schema: { body: { type: 'object', required: ['email'], additionalProperties: false, properties: { email: { type: 'string', format: 'email', maxLength: 320 } } } }
  }, async (request, reply) => {
    const email = request.body.email.trim().toLowerCase();
    const userResult = await db.query('SELECT id, email, email_verified_at FROM users WHERE email = $1 AND deleted_at IS NULL', [email]);
    if (!userResult.rows[0] || userResult.rows[0].email_verified_at) return { accepted: true };
    const verification = createVerificationToken();
    await db.query('DELETE FROM email_verification_tokens WHERE user_id = $1 AND consumed_at IS NULL', [userResult.rows[0].id]);
    await db.query('INSERT INTO email_verification_tokens (token_hash, user_id, expires_at) VALUES ($1, $2, now() + $3::interval)', [verification.hash, userResult.rows[0].id, config.emailVerificationTtl]);
    try {
      await emailSender.sendVerification({ email, token: verification.token });
    } catch (error) {
      await db.query('DELETE FROM email_verification_tokens WHERE token_hash = $1', [verification.hash]);
      if (error.code === 'EMAIL_PROVIDER_NOT_CONFIGURED') return reply.code(503).send({ error: 'EMAIL_UNAVAILABLE', message: 'Email verification is not configured' });
      throw error;
    }
    return { accepted: true };
  });

  app.post('/auth/login', {
    config: { rateLimit: { max: 10, timeWindow: 60000 } },
    schema: { body: { type: 'object', required: ['email', 'password'], additionalProperties: false,
      properties: { email: { type: 'string', format: 'email' }, password: { type: 'string', maxLength: 128 } } } }
  }, async (request, reply) => {
    const { rows } = await db.query('SELECT id, email, username, role, password_hash, email_verified_at FROM users WHERE email = $1 AND deleted_at IS NULL', [request.body.email.trim().toLowerCase()]);
    const valid = Boolean(rows[0]?.password_hash)
      && await argon2.verify(rows[0].password_hash, request.body.password);
    if (!valid) return reply.code(401).send({ error: 'INVALID_CREDENTIALS', message: 'Invalid email or password' });
    if (!rows[0].email_verified_at) return reply.code(403).send({ error: 'EMAIL_NOT_VERIFIED', message: 'Confirm your email address before signing in' });
    const user = { ...rows[0] };
    delete user.password_hash;
    await issueTokens(reply, user);
    return { user };
  });

  app.post('/auth/refresh', async (request, reply) => {
    const token = request.cookies?.[REFRESH_COOKIE];
    if (!token) return reply.code(401).send({ error: 'UNAUTHENTICATED', message: 'Refresh token required' });
    try {
      const payload = app.jwt.verify(token, { secret: config.refreshSecret });
      if (payload.type !== 'refresh') throw new Error('Invalid token type');
      const result = await db.query('DELETE FROM refresh_tokens WHERE jti = $1 AND user_id = $2 AND revoked_at IS NULL AND expires_at > now() RETURNING user_id', [payload.jti, payload.sub]);
      if (!result.rowCount) throw new Error('Revoked refresh token');
      const { rows } = await db.query('SELECT id, email, username, role FROM users WHERE id = $1 AND deleted_at IS NULL', [payload.sub]);
      if (!rows[0]) throw new Error('Unknown user');
      await issueTokens(reply, rows[0]);
      return { user: rows[0] };
    } catch {
      reply.clearCookie(ACCESS_COOKIE, cookieOptions).clearCookie(REFRESH_COOKIE, cookieOptions);
      return reply.code(401).send({ error: 'INVALID_REFRESH_TOKEN', message: 'Invalid or expired refresh token' });
    }
  });

  app.post('/auth/logout', { preHandler: app.auth }, async (request, reply) => {
    await db.query('UPDATE refresh_tokens SET revoked_at = now() WHERE user_id = $1 AND revoked_at IS NULL', [request.user.sub]);
    return reply.clearCookie(ACCESS_COOKIE, cookieOptions).clearCookie(REFRESH_COOKIE, cookieOptions).send({ ok: true });
  });

  app.patch('/auth/password', { preHandler: app.auth, config: { rateLimit: { max: 5, timeWindow: 60000 } }, schema: { body: { type: 'object', required: ['currentPassword', 'newPassword'], additionalProperties: false, properties: { currentPassword: { type: 'string', maxLength: 128 }, newPassword: { type: 'string', minLength: 12, maxLength: 128 } } } } }, async (request, reply) => {
    const { rows } = await db.query('SELECT password_hash FROM users WHERE id = $1 AND deleted_at IS NULL', [request.user.sub]);
    if (!rows[0]?.password_hash || !(await argon2.verify(rows[0].password_hash, request.body.currentPassword))) return reply.code(401).send({ error: 'INVALID_CREDENTIALS', message: 'Current password is incorrect' });
    const hash = await argon2.hash(request.body.newPassword, { type: argon2.argon2id });
    await db.query('UPDATE users SET password_hash = $1, updated_at = now() WHERE id = $2', [hash, request.user.sub]);
    await db.query('UPDATE refresh_tokens SET revoked_at = now() WHERE user_id = $1 AND revoked_at IS NULL', [request.user.sub]);
    return { ok: true, requiresLogin: true };
  });
}
