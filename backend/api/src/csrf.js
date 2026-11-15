import crypto from 'node:crypto';

const COOKIE = 'nora_csrf';
const EXEMPT_PREFIXES = ['/auth/', '/payments/'];
const MUTATING = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

export function safeEqual(left, right) {
  const a = Buffer.from(left ?? '');
  const b = Buffer.from(right ?? '');
  // Deux valeurs absentes ne doivent jamais être considérées comme égales.
  return a.length > 0 && a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function registerCsrf(app, config) {
  app.get('/csrf', async (request, reply) => {
    const token = crypto.randomBytes(32).toString('hex');
    reply.setCookie(COOKIE, token, {
      httpOnly: false, secure: config.cookieSecure, sameSite: 'lax', path: '/', maxAge: 86400
    });
    return { token };
  });

  app.addHook('onRequest', async (request, reply) => {
    if (!MUTATING.has(request.method) || EXEMPT_PREFIXES.some((prefix) => request.url.startsWith(`/api/v1${prefix}`))) return;
    const origin = request.headers.origin;
    const referer = request.headers.referer;
    if (origin && !config.corsOrigins.includes(origin)) return reply.code(403).send({ error: 'CSRF_ORIGIN_REJECTED', message: 'Request origin is not allowed' });
    if (!origin && referer && !config.corsOrigins.some((allowed) => referer.startsWith(allowed))) return reply.code(403).send({ error: 'CSRF_ORIGIN_REJECTED', message: 'Request origin is not allowed' });
    if (request.cookies?.nora_access && !safeEqual(request.cookies[COOKIE], request.headers['x-csrf-token'])) {
      return reply.code(403).send({ error: 'CSRF_TOKEN_REQUIRED', message: 'A valid CSRF token is required' });
    }
  });
}
