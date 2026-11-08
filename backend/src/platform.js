import crypto from 'node:crypto';

const adminOnly = async (request, reply) => {
  try {
    await request.jwtVerify({ onlyCookie: true });
  } catch {
    return reply.code(401).send({ error: 'UNAUTHENTICATED', message: 'Authentication required' });
  }
  if (request.user?.role !== 'admin') return reply.code(403).send({ error: 'FORBIDDEN', message: 'Administrator role required' });
};

async function audit(db, request, action, targetType, targetId, metadata = {}) {
  const ipHash = crypto.createHash('sha256').update(request.ip).digest('hex');
  await db.query('INSERT INTO audit_logs (actor_id, action, target_type, target_id, metadata, ip_hash) VALUES ($1, $2, $3, $4, $5, $6)', [request.user?.sub ?? null, action, targetType, targetId ?? null, metadata, ipHash]);
}

export function registerPlatform(api, db) {
  api.get('/catalog', async () => ({ items: (await db.query("SELECT * FROM catalog_items WHERE status = 'published' ORDER BY updated_at DESC LIMIT 100")).rows }));
  api.get('/catalog/:slug', async (request, reply) => {
    const { rows } = await db.query("SELECT * FROM catalog_items WHERE slug = $1 AND status = 'published'", [request.params.slug]);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Catalog item not found' });
    return { item: rows[0] };
  });
  api.get('/announcements', async () => ({ announcements: (await db.query("SELECT * FROM announcements WHERE (starts_at IS NULL OR starts_at <= now()) AND (ends_at IS NULL OR ends_at > now()) ORDER BY starts_at DESC NULLS LAST LIMIT 50")).rows }));
  api.get('/settings/public', async () => ({ settings: (await db.query('SELECT key, value FROM platform_settings WHERE is_public = true ORDER BY key')).rows }));
  api.get('/challenges', async () => ({ challenges: (await db.query("SELECT * FROM challenges WHERE status = 'published' AND (ends_at IS NULL OR ends_at > now()) ORDER BY starts_at DESC NULLS LAST LIMIT 100")).rows }));
  api.post('/challenges', { preHandler: api.auth, schema: { body: { type: 'object', required: ['title', 'description', 'difficulty'], additionalProperties: false, properties: { title: { type: 'string', maxLength: 180 }, description: { type: 'string', maxLength: 10000 }, difficulty: { type: 'string', enum: ['beginner', 'intermediate', 'advanced'] }, tests: { type: 'array', maxItems: 100 }, startsAt: { type: 'string', format: 'date-time' }, endsAt: { type: 'string', format: 'date-time' } } } } }, async (request, reply) => {
    const { rows } = await db.query('INSERT INTO challenges (creator_id, title, description, difficulty, tests, starts_at, ends_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, title, description, difficulty, starts_at, ends_at, status', [request.user.sub, request.body.title, request.body.description, request.body.difficulty, request.body.tests ?? [], request.body.startsAt ?? null, request.body.endsAt ?? null]);
    return reply.code(201).send({ challenge: rows[0] });
  });
  api.post('/challenges/:id/submissions', { preHandler: api.auth, schema: { body: { type: 'object', required: ['code'], additionalProperties: false, properties: { code: { type: 'string', minLength: 1, maxLength: 100000 } } } } }, async (request, reply) => {
    const codeHash = crypto.createHash('sha256').update(request.body.code).digest('hex');
    const { rows } = await db.query('INSERT INTO challenge_submissions (challenge_id, user_id, code_hash) SELECT id, $2, $3 FROM challenges WHERE id = $1 AND status = $4 RETURNING id, challenge_id, status, created_at', [request.params.id, request.user.sub, codeHash, 'published']);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Challenge is unavailable' });
    return reply.code(202).send({ submission: rows[0], nextAction: 'sandbox_execution_required' });
  });
  api.get('/challenges/:id/submissions', { preHandler: api.auth }, async (request) => ({ submissions: (await db.query('SELECT id, challenge_id, user_id, status, score, created_at FROM challenge_submissions WHERE challenge_id = $1 AND user_id = $2 ORDER BY created_at DESC LIMIT 100', [request.params.id, request.user.sub])).rows }));
  api.get('/submissions/:id', { preHandler: api.auth }, async (request, reply) => {
    const { rows } = await db.query('SELECT * FROM challenge_submissions WHERE id = $1 AND user_id = $2', [request.params.id, request.user.sub]);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Submission not found' });
    return { submission: rows[0] };
  });
  api.delete('/submissions/:id', { preHandler: api.auth }, async (request, reply) => {
    const result = await db.query('DELETE FROM challenge_submissions WHERE id = $1 AND user_id = $2 AND status = $3', [request.params.id, request.user.sub, 'queued']);
    if (!result.rowCount) return reply.code(409).send({ error: 'CANNOT_DELETE', message: 'Only queued submissions can be deleted' });
    return { ok: true };
  });
  api.get('/challenges/:id', async (request, reply) => {
    const { rows } = await db.query("SELECT * FROM challenges WHERE id = $1 AND status = 'published'", [request.params.id]);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Challenge not found' });
    return { challenge: rows[0] };
  });
  api.patch('/challenges/:id', { preHandler: api.auth }, async (request, reply) => {
    const { rows } = await db.query('UPDATE challenges SET title = COALESCE($1, title), description = COALESCE($2, description), difficulty = COALESCE($3, difficulty), tests = COALESCE($4, tests), starts_at = COALESCE($5, starts_at), ends_at = COALESCE($6, ends_at), status = COALESCE($7, status) WHERE id = $8 AND creator_id = $9 RETURNING *', [request.body.title, request.body.description, request.body.difficulty, request.body.tests, request.body.startsAt, request.body.endsAt, request.body.status, request.params.id, request.user.sub]);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Challenge not found' });
    return { challenge: rows[0] };
  });
  api.delete('/challenges/:id', { preHandler: api.auth }, async (request, reply) => {
    const result = await db.query("UPDATE challenges SET status = 'archived' WHERE id = $1 AND creator_id = $2", [request.params.id, request.user.sub]);
    if (!result.rowCount) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Challenge not found' });
    return { ok: true };
  });
  api.get('/opportunities', async () => ({ opportunities: (await db.query("SELECT o.*, u.username, u.display_name FROM opportunities o JOIN users u ON u.id = o.author_id WHERE o.status = 'published' ORDER BY o.created_at DESC LIMIT 100")).rows }));
  api.get('/opportunities/:id', async (request, reply) => {
    const { rows } = await db.query('SELECT o.*, u.username, u.display_name FROM opportunities o JOIN users u ON u.id = o.author_id WHERE o.id = $1 AND o.status = $2', [request.params.id, 'published']);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Opportunity not found' });
    return { opportunity: rows[0] };
  });
  api.post('/opportunities', { preHandler: api.auth, schema: { body: { type: 'object', required: ['title', 'description', 'type'], additionalProperties: false, properties: { title: { type: 'string', maxLength: 180 }, description: { type: 'string', maxLength: 10000 }, type: { type: 'string', enum: ['job', 'freelance', 'hackathon', 'volunteer', 'cofounder'] }, country: { type: 'string', pattern: '^[A-Z]{2}$' }, remote: { type: 'boolean' }, compensation: { type: 'object' } } } } }, async (request, reply) => {
    const { rows } = await db.query('INSERT INTO opportunities (author_id, title, description, type, country, remote, compensation) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [request.user.sub, request.body.title, request.body.description, request.body.type, request.body.country ?? null, request.body.remote ?? true, request.body.compensation ?? {}]);
    return reply.code(201).send({ opportunity: rows[0] });
  });
  api.patch('/opportunities/:id', { preHandler: api.auth }, async (request, reply) => {
    const { rows } = await db.query('UPDATE opportunities SET title = COALESCE($1, title), description = COALESCE($2, description), type = COALESCE($3, type), country = COALESCE($4, country), remote = COALESCE($5, remote), compensation = COALESCE($6, compensation) WHERE id = $7 AND author_id = $8 RETURNING *', [request.body.title, request.body.description, request.body.type, request.body.country, request.body.remote, request.body.compensation, request.params.id, request.user.sub]);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Opportunity not found' });
    return { opportunity: rows[0] };
  });
  api.delete('/opportunities/:id', { preHandler: api.auth }, async (request, reply) => {
    const result = await db.query("UPDATE opportunities SET status = 'archived' WHERE id = $1 AND author_id = $2", [request.params.id, request.user.sub]);
    if (!result.rowCount) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Opportunity not found' });
    return { ok: true };
  });
  api.get('/mentors', async () => ({ mentors: (await db.query("SELECT m.*, u.username, u.display_name, u.avatar_url FROM mentor_profiles m JOIN users u ON u.id = m.user_id WHERE m.status = 'active' LIMIT 100")).rows }));
  api.post('/mentors/me', { preHandler: api.auth }, async (request) => {
    const { rows } = await db.query('INSERT INTO mentor_profiles (user_id, specialties, languages, availability, hourly_rate_minor, currency, bio) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (user_id) DO UPDATE SET specialties = EXCLUDED.specialties, languages = EXCLUDED.languages, availability = EXCLUDED.availability, hourly_rate_minor = EXCLUDED.hourly_rate_minor, currency = EXCLUDED.currency, bio = EXCLUDED.bio RETURNING *', [request.user.sub, request.body.specialties ?? [], request.body.languages ?? [], request.body.availability ?? {}, request.body.hourlyRateMinor ?? null, request.body.currency ?? null, request.body.bio ?? null]);
    return { mentor: rows[0] };
  });
  api.delete('/mentors/me', { preHandler: api.auth }, async (request) => {
    await db.query("UPDATE mentor_profiles SET status = 'inactive' WHERE user_id = $1", [request.user.sub]);
    return { ok: true };
  });
  api.post('/mentors/:mentorId/requests', { preHandler: api.auth, schema: { body: { type: 'object', required: ['goal'], additionalProperties: false, properties: { goal: { type: 'string', minLength: 10, maxLength: 2000 } } } } }, async (request, reply) => {
    if (request.params.mentorId === request.user.sub) return reply.code(400).send({ error: 'INVALID_REQUEST', message: 'You cannot request yourself as a mentor' });
    const { rows } = await db.query('INSERT INTO mentorship_requests (mentor_id, mentee_id, goal) VALUES ($1, $2, $3) RETURNING *', [request.params.mentorId, request.user.sub, request.body.goal]);
    await db.query('INSERT INTO notifications (user_id, type, payload) VALUES ($1, $2, $3)', [request.params.mentorId, 'mentorship.requested', { requestId: rows[0].id }]);
    return reply.code(201).send({ request: rows[0] });
  });
  api.get('/mentorship/requests', { preHandler: api.auth }, async (request) => {
    const { rows } = await db.query('SELECT * FROM mentorship_requests WHERE mentor_id = $1 OR mentee_id = $1 ORDER BY created_at DESC LIMIT 100', [request.user.sub]);
    return { requests: rows };
  });
  api.patch('/mentorship/requests/:id', { preHandler: api.auth, schema: { body: { type: 'object', required: ['status'], additionalProperties: false, properties: { status: { type: 'string', enum: ['accepted', 'declined', 'completed', 'cancelled'] } } } } }, async (request, reply) => {
    const { rows } = await db.query('UPDATE mentorship_requests SET status = $1 WHERE id = $2 AND (mentor_id = $3 OR mentee_id = $3) RETURNING *', [request.body.status, request.params.id, request.user.sub]);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Mentorship request not found' });
    return { request: rows[0] };
  });
  api.get('/products', async (request) => {
    const limit = Math.min(Math.max(Number(request.query.limit ?? 24), 1), 100);
    const { rows } = await db.query('SELECT p.*, u.username, u.display_name FROM products p JOIN users u ON u.id = p.seller_id WHERE p.status = $1 ORDER BY p.created_at DESC LIMIT $2 OFFSET $3', ['published', limit, Math.max(Number(request.query.offset ?? 0), 0)]);
    return { products: rows };
  });
  api.post('/products', { preHandler: api.auth, schema: { body: { type: 'object', required: ['title', 'description', 'priceMinor', 'currency', 'stock'], additionalProperties: false, properties: { title: { type: 'string', minLength: 2, maxLength: 180 }, description: { type: 'string', minLength: 1, maxLength: 10000 }, priceMinor: { type: 'integer', minimum: 0 }, currency: { type: 'string', pattern: '^[A-Z]{3}$' }, stock: { type: 'integer', minimum: 0 }, metadata: { type: 'object' } } } } }, async (request, reply) => {
    const { rows } = await db.query('INSERT INTO products (seller_id, title, description, price_minor, currency, stock, metadata) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [request.user.sub, request.body.title.trim(), request.body.description, request.body.priceMinor, request.body.currency, request.body.stock, request.body.metadata ?? {}]);
    await audit(db, request, 'product.created', 'product', rows[0].id);
    return reply.code(201).send({ product: rows[0] });
  });
  api.patch('/products/:id/publish', { preHandler: api.auth }, async (request, reply) => {
    const { rows } = await db.query('UPDATE products SET status = $1, updated_at = now() WHERE id = $2 AND seller_id = $3 RETURNING *', ['published', request.params.id, request.user.sub]);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Product not found' });
    await audit(db, request, 'product.published', 'product', rows[0].id);
    return { product: rows[0] };
  });
  api.get('/products/:id', async (request, reply) => {
    const { rows } = await db.query('SELECT p.*, u.username, u.display_name FROM products p JOIN users u ON u.id = p.seller_id WHERE p.id = $1 AND p.status <> $2', [request.params.id, 'archived']);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Product not found' });
    return { product: rows[0] };
  });
  api.patch('/products/:id', { preHandler: api.auth }, async (request, reply) => {
    const { rows } = await db.query('UPDATE products SET title = COALESCE($1, title), description = COALESCE($2, description), price_minor = COALESCE($3, price_minor), currency = COALESCE($4, currency), stock = COALESCE($5, stock), metadata = COALESCE($6, metadata), updated_at = now() WHERE id = $7 AND seller_id = $8 AND status <> $9 RETURNING *', [request.body.title, request.body.description, request.body.priceMinor, request.body.currency, request.body.stock, request.body.metadata, request.params.id, request.user.sub, 'archived']);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Product not found' });
    return { product: rows[0] };
  });
  api.delete('/products/:id', { preHandler: api.auth }, async (request, reply) => {
    const result = await db.query("UPDATE products SET status = 'archived', updated_at = now() WHERE id = $1 AND seller_id = $2 AND status <> 'archived'", [request.params.id, request.user.sub]);
    if (!result.rowCount) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Product not found' });
    return { ok: true };
  });

  api.post('/orders', { preHandler: api.auth, schema: { body: { type: 'object', required: ['items', 'provider'], additionalProperties: false, properties: { items: { type: 'array', minItems: 1, maxItems: 50, items: { type: 'object', required: ['productId', 'quantity'], properties: { productId: { type: 'string', format: 'uuid' }, quantity: { type: 'integer', minimum: 1, maximum: 100 } } } }, provider: { type: 'string', enum: ['card', 'mtn_momo', 'celtiis', 'wave', 'orange_money', 'moov_money'] }, shipping: { type: 'object' } } } } }, async (request, reply) => {
    const client = await db.transaction();
    try {
      const ids = request.body.items.map((item) => item.productId);
      const { rows: products } = await client.query('SELECT * FROM products WHERE id = ANY($1::uuid[]) AND status = $2 FOR UPDATE', [ids, 'published']);
      if (products.length !== ids.length) { await client.rollback(); return reply.code(400).send({ error: 'INVALID_ITEMS', message: 'One or more products are unavailable' }); }
      const currency = products[0].currency;
      const lineItems = request.body.items.map((item) => ({ ...item, product: products.find((product) => product.id === item.productId) }));
      if (lineItems.some((item) => item.product.currency !== currency || item.quantity > item.product.stock)) { await client.rollback(); return reply.code(400).send({ error: 'INVALID_STOCK_OR_CURRENCY', message: 'Items must share currency and be in stock' }); }
      const total = lineItems.reduce((sum, item) => sum + Number(item.product.price_minor) * item.quantity, 0);
      const order = (await client.query('INSERT INTO orders (buyer_id, total_minor, currency, shipping) VALUES ($1, $2, $3, $4) RETURNING *', [request.user.sub, total, currency, request.body.shipping ?? null])).rows[0];
      for (const item of lineItems) {
        await client.query('INSERT INTO order_items (order_id, product_id, seller_id, quantity, unit_price_minor, title_snapshot) VALUES ($1, $2, $3, $4, $5, $6)', [order.id, item.product.id, item.product.seller_id, item.quantity, item.product.price_minor, item.product.title]);
        await client.query('UPDATE products SET stock = stock - $1, updated_at = now() WHERE id = $2', [item.quantity, item.product.id]);
      }
      const payment = (await client.query('INSERT INTO payment_intents (order_id, provider, amount_minor, currency) VALUES ($1, $2, $3, $4) RETURNING id, provider, amount_minor, currency, status', [order.id, request.body.provider, total, currency])).rows[0];
      await client.commit();
      await audit(db, request, 'order.created', 'order', order.id, { provider: request.body.provider });
      return reply.code(201).send({ order, payment, nextAction: 'provider_checkout_required' });
    } catch (error) { await client.rollback(); throw error; }
  });
  api.get('/orders', { preHandler: api.auth }, async (request) => ({ orders: (await db.query('SELECT * FROM orders WHERE buyer_id = $1 ORDER BY created_at DESC LIMIT 100', [request.user.sub])).rows }));
  api.get('/orders/:id', { preHandler: api.auth }, async (request, reply) => {
    const order = await db.query('SELECT * FROM orders WHERE id = $1 AND buyer_id = $2', [request.params.id, request.user.sub]);
    if (!order.rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Order not found' });
    const items = await db.query('SELECT * FROM order_items WHERE order_id = $1', [request.params.id]);
    return { order: order.rows[0], items: items.rows };
  });
  api.post('/orders/:id/cancel', { preHandler: api.auth }, async (request, reply) => {
    const { rows } = await db.query("UPDATE orders SET status = 'cancelled', updated_at = now() WHERE id = $1 AND buyer_id = $2 AND status = 'pending' RETURNING *", [request.params.id, request.user.sub]);
    if (!rows[0]) return reply.code(409).send({ error: 'CANNOT_CANCEL', message: 'Order cannot be cancelled' });
    return { order: rows[0] };
  });

  api.post('/payments/:provider/webhook', { config: { rawBody: true } }, async (request, reply) => {
    const signature = request.headers['x-provider-signature'];
    const secret = process.env[`PAYMENT_${String(request.params.provider).toUpperCase()}_WEBHOOK_SECRET`];
    if (!secret || typeof signature !== 'string') return reply.code(401).send({ error: 'INVALID_SIGNATURE', message: 'Webhook signature is not configured' });
    const raw = request.rawBody;
    if (typeof raw !== 'string') return reply.code(400).send({ error: 'RAW_BODY_REQUIRED', message: 'Raw webhook body is required' });
    const expected = crypto.createHmac('sha256', secret).update(raw).digest('hex');
    const actualBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);
    if (actualBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(actualBuffer, expectedBuffer)) return reply.code(401).send({ error: 'INVALID_SIGNATURE', message: 'Invalid webhook signature' });
    const eventId = request.headers['x-provider-event-id'];
    if (typeof eventId !== 'string') return reply.code(400).send({ error: 'MISSING_EVENT_ID', message: 'Provider event id is required' });
    const hash = crypto.createHash('sha256').update(raw).digest('hex');
    const inserted = await db.query('INSERT INTO payment_events (provider, event_id, payload_hash, payload) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING RETURNING event_id', [request.params.provider, eventId, hash, request.body]);
    if (!inserted.rowCount) return { received: true, duplicate: true };
    const { paymentIntentId, status } = request.body;
    if (paymentIntentId && ['succeeded', 'failed', 'cancelled'].includes(status)) {
      await db.query('UPDATE payment_intents SET status = $1, provider_payload = $2, updated_at = now() WHERE id = $3', [status, request.body, paymentIntentId]);
      await db.query('UPDATE orders SET status = CASE WHEN $1 = $2 THEN $3 ELSE $4 END, updated_at = now() WHERE id = (SELECT order_id FROM payment_intents WHERE id = $5)', [status, 'succeeded', 'paid', 'payment_failed', paymentIntentId]);
    }
    return { received: true };
  });

  api.get('/notifications', { preHandler: api.auth }, async (request) => {
    const { rows } = await db.query('SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 100', [request.user.sub]);
    return { notifications: rows };
  });
  api.get('/notifications/:id', { preHandler: api.auth }, async (request, reply) => {
    const { rows } = await db.query('SELECT * FROM notifications WHERE id = $1 AND user_id = $2', [request.params.id, request.user.sub]);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Notification not found' });
    return { notification: rows[0] };
  });
  api.patch('/notifications/:id/read', { preHandler: api.auth }, async (request, reply) => {
    const { rows } = await db.query('UPDATE notifications SET read_at = COALESCE(read_at, now()) WHERE id = $1 AND user_id = $2 RETURNING *', [request.params.id, request.user.sub]);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Notification not found' });
    return { notification: rows[0] };
  });
  api.delete('/notifications/:id', { preHandler: api.auth }, async (request, reply) => {
    const result = await db.query('DELETE FROM notifications WHERE id = $1 AND user_id = $2', [request.params.id, request.user.sub]);
    if (!result.rowCount) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Notification not found' });
    return { ok: true };
  });
  api.post('/reports', { preHandler: api.auth, schema: { body: { type: 'object', required: ['targetType', 'targetId', 'reason'], additionalProperties: false, properties: { targetType: { type: 'string', maxLength: 40 }, targetId: { type: 'string', format: 'uuid' }, reason: { type: 'string', minLength: 5, maxLength: 1000 } } } } }, async (request, reply) => {
    const { rows } = await db.query('INSERT INTO moderation_reports (reporter_id, target_type, target_id, reason) VALUES ($1, $2, $3, $4) RETURNING id, status, created_at', [request.user.sub, request.body.targetType, request.body.targetId, request.body.reason]);
    return reply.code(201).send({ report: rows[0] });
  });
  api.get('/reports', { preHandler: api.auth }, async (request) => ({ reports: (await db.query('SELECT * FROM moderation_reports WHERE reporter_id = $1 ORDER BY created_at DESC LIMIT 100', [request.user.sub])).rows }));
  api.get('/reports/:id', { preHandler: api.auth }, async (request, reply) => {
    const { rows } = await db.query('SELECT * FROM moderation_reports WHERE id = $1 AND reporter_id = $2', [request.params.id, request.user.sub]);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Report not found' });
    return { report: rows[0] };
  });
  api.delete('/reports/:id', { preHandler: api.auth }, async (request, reply) => {
    const result = await db.query("DELETE FROM moderation_reports WHERE id = $1 AND reporter_id = $2 AND status = 'open'", [request.params.id, request.user.sub]);
    if (!result.rowCount) return reply.code(409).send({ error: 'CANNOT_DELETE', message: 'Only open reports can be deleted' });
    return { ok: true };
  });
  api.get('/payments/:id', { preHandler: api.auth }, async (request, reply) => {
    const { rows } = await db.query('SELECT p.* FROM payment_intents p JOIN orders o ON o.id = p.order_id WHERE p.id = $1 AND o.buyer_id = $2', [request.params.id, request.user.sub]);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Payment not found' });
    return { payment: rows[0] };
  });
  api.get('/payout-accounts', { preHandler: api.auth }, async (request) => ({ accounts: (await db.query('SELECT id, provider, country, status, created_at FROM payout_accounts WHERE user_id = $1 ORDER BY created_at DESC', [request.user.sub])).rows }));
  api.post('/payout-accounts', { preHandler: api.auth, schema: { body: { type: 'object', required: ['provider', 'accountReference', 'country'], additionalProperties: false, properties: { provider: { type: 'string', maxLength: 40 }, accountReference: { type: 'string', minLength: 3, maxLength: 255 }, country: { type: 'string', pattern: '^[A-Z]{2}$' } } } } }, async (request, reply) => {
    const { rows } = await db.query('INSERT INTO payout_accounts (user_id, provider, account_reference, country) VALUES ($1, $2, $3, $4) RETURNING id, provider, country, status, created_at', [request.user.sub, request.body.provider, request.body.accountReference, request.body.country]);
    return reply.code(201).send({ account: rows[0] });
  });
  api.delete('/payout-accounts/:id', { preHandler: api.auth }, async (request, reply) => {
    const result = await db.query('DELETE FROM payout_accounts WHERE id = $1 AND user_id = $2', [request.params.id, request.user.sub]);
    if (!result.rowCount) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Payout account not found' });
    return { ok: true };
  });

  api.register(async (admin) => {
    admin.addHook('preHandler', adminOnly);
    admin.get('/reports', async (request) => ({ reports: (await db.query('SELECT * FROM moderation_reports WHERE status = $1 ORDER BY created_at ASC LIMIT 100', [request.query.status ?? 'open'])).rows }));
    admin.patch('/reports/:id', async (request, reply) => {
      const { rows } = await db.query('UPDATE moderation_reports SET status = $1, resolution = $2, reviewed_by = $3 WHERE id = $4 RETURNING *', [request.body.status, request.body.resolution ?? {}, request.user.sub, request.params.id]);
      if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Report not found' });
      await audit(db, request, 'moderation.resolved', 'report', rows[0].id);
      return { report: rows[0] };
    });
    admin.put('/flags/:key', async (request) => {
      const { rows } = await db.query('INSERT INTO feature_flags (key, enabled, rules) VALUES ($1, $2, $3) ON CONFLICT (key) DO UPDATE SET enabled = EXCLUDED.enabled, rules = EXCLUDED.rules, updated_at = now() RETURNING *', [request.params.key, Boolean(request.body.enabled), request.body.rules ?? {}]);
      await audit(db, request, 'feature_flag.updated', 'feature_flag', null, { key: request.params.key });
      return { flag: rows[0] };
    });
    admin.post('/catalog', async (request, reply) => {
      const { rows } = await db.query('INSERT INTO catalog_items (kind, slug, payload, status, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *', [request.body.kind, request.body.slug, request.body.payload, request.body.status ?? 'draft', request.user.sub]);
      await audit(db, request, 'catalog.created', 'catalog_item', rows[0].id);
      return reply.code(201).send({ item: rows[0] });
    });
    admin.patch('/catalog/:id', async (request, reply) => {
      const { rows } = await db.query('UPDATE catalog_items SET kind = COALESCE($1, kind), slug = COALESCE($2, slug), payload = COALESCE($3, payload), status = COALESCE($4, status), updated_at = now() WHERE id = $5 RETURNING *', [request.body.kind, request.body.slug, request.body.payload, request.body.status, request.params.id]);
      if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Catalog item not found' });
      await audit(db, request, 'catalog.updated', 'catalog_item', rows[0].id);
      return { item: rows[0] };
    });
    admin.delete('/catalog/:id', async (request, reply) => {
      const result = await db.query('DELETE FROM catalog_items WHERE id = $1', [request.params.id]);
      if (!result.rowCount) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Catalog item not found' });
      await audit(db, request, 'catalog.deleted', 'catalog_item', request.params.id);
      return { ok: true };
    });
    admin.post('/announcements', async (request, reply) => {
      const { rows } = await db.query('INSERT INTO announcements (title, body, audience, starts_at, ends_at, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [request.body.title, request.body.body, request.body.audience ?? {}, request.body.startsAt ?? null, request.body.endsAt ?? null, request.user.sub]);
      await audit(db, request, 'announcement.created', 'announcement', rows[0].id);
      return reply.code(201).send({ announcement: rows[0] });
    });
    admin.patch('/announcements/:id', async (request, reply) => {
      const { rows } = await db.query('UPDATE announcements SET title = COALESCE($1, title), body = COALESCE($2, body), audience = COALESCE($3, audience), starts_at = COALESCE($4, starts_at), ends_at = COALESCE($5, ends_at) WHERE id = $6 RETURNING *', [request.body.title, request.body.body, request.body.audience, request.body.startsAt, request.body.endsAt, request.params.id]);
      if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Announcement not found' });
      await audit(db, request, 'announcement.updated', 'announcement', rows[0].id);
      return { announcement: rows[0] };
    });
    admin.delete('/announcements/:id', async (request, reply) => {
      const result = await db.query('DELETE FROM announcements WHERE id = $1', [request.params.id]);
      if (!result.rowCount) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Announcement not found' });
      await audit(db, request, 'announcement.deleted', 'announcement', request.params.id);
      return { ok: true };
    });
    admin.delete('/flags/:key', async (request) => {
      await db.query('DELETE FROM feature_flags WHERE key = $1', [request.params.key]);
      return { ok: true };
    });
    admin.get('/audit', async () => ({ events: (await db.query('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 200')).rows }));
    admin.get('/users', async () => ({ users: (await db.query('SELECT id, email, username, role, reputation, created_at FROM users WHERE deleted_at IS NULL ORDER BY created_at DESC LIMIT 200')).rows }));
    admin.patch('/users/:id/role', async (request, reply) => {
      const { rows } = await db.query("UPDATE users SET role = $1, updated_at = now() WHERE id = $2 RETURNING id, username, role", [request.body.role, request.params.id]);
      if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'User not found' });
      await audit(db, request, 'user.role_changed', 'user', rows[0].id, { role: rows[0].role });
      return { user: rows[0] };
    });
    admin.delete('/users/:id', async (request, reply) => {
      if (request.params.id === request.user.sub) return reply.code(400).send({ error: 'INVALID_REQUEST', message: 'An administrator cannot delete their own account here' });
      const { rows } = await db.query('UPDATE users SET deleted_at = now(), updated_at = now() WHERE id = $1 AND deleted_at IS NULL RETURNING id, username', [request.params.id]);
      if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'User not found' });
      await audit(db, request, 'user.deleted', 'user', rows[0].id);
      return { user: rows[0] };
    });
    admin.get('/settings', async () => ({ settings: (await db.query('SELECT * FROM platform_settings ORDER BY key')).rows }));
    admin.put('/settings/:key', async (request) => {
      const { rows } = await db.query('INSERT INTO platform_settings (key, value, is_public) VALUES ($1, $2, $3) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, is_public = EXCLUDED.is_public, updated_at = now() RETURNING *', [request.params.key, request.body.value, Boolean(request.body.isPublic)]);
      return { setting: rows[0] };
    });
    admin.delete('/settings/:key', async (request) => {
      await db.query('DELETE FROM platform_settings WHERE key = $1', [request.params.key]);
      return { ok: true };
    });
  }, { prefix: '/admin' });
}
