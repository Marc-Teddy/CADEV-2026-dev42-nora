const ALLOWED_FEATURES = new Set([
  'hackathon', 'hackathon_team', 'hackathon_task', 'idea', 'idea_membership', 'guild',
  'reputation_proof', 'developer_passport', 'badge', 'portfolio', 'cv', 'learning_path',
  'duel', 'code_review', 'classroom', 'certificate', 'escrow', 'milestone', 'tip',
  'bounty', 'grant', 'api_catalog', 'dataset', 'meetup', 'ambassador', 'admin_report',
  'fraud_alert', 'kyc_case', 'experiment', 'crisis_announcement', 'voice_note',
  'translation', 'ai_session', 'deployment', 'repository', 'dev_environment'
]);

const isAdmin = (request) => request.user?.role === 'admin';
const featureGuard = (request, reply) => {
  if (!ALLOWED_FEATURES.has(request.params.feature)) return reply.code(404).send({ error: 'UNKNOWN_FEATURE', message: 'Feature type is not enabled' });
};

function payloadHash(payload) {
  return JSON.stringify(payload);
}

export function registerExtensibleFeatures(api, db) {
  api.get('/features', async () => ({ features: [...ALLOWED_FEATURES].sort() }));

  api.post('/features/:feature', { preHandler: [api.auth, featureGuard], schema: { body: { type: 'object', additionalProperties: false, properties: { status: { type: 'string', maxLength: 30 }, payload: { type: 'object', additionalProperties: true } } } } }, async (request, reply) => {
    const payload = request.body.payload ?? {};
    const client = await db.transaction();
    try {
      const { rows } = await client.query('INSERT INTO feature_documents (feature, owner_id, status, payload) VALUES ($1, $2, $3, $4) RETURNING *', [request.params.feature, request.user.sub, request.body.status ?? 'draft', payload]);
      await client.query('INSERT INTO feature_document_revisions (document_id, version, payload, changed_by) VALUES ($1, $2, $3, $4)', [rows[0].id, rows[0].version, payload, request.user.sub]);
      await client.query('INSERT INTO outbox_events (topic, aggregate_type, aggregate_id, payload) VALUES ($1, $2, $3, $4)', [`${request.params.feature}.created`, request.params.feature, rows[0].id, { ownerId: request.user.sub }]);
      await client.commit();
      return reply.code(201).send({ item: rows[0] });
    } catch (error) { await client.rollback(); throw error; }
  });

  api.get('/features/:feature', { preHandler: featureGuard }, async (request) => {
    const limit = Math.min(Math.max(Number(request.query.limit ?? 50), 1), 100);
    const { rows } = await db.query('SELECT * FROM feature_documents WHERE feature = $1 AND deleted_at IS NULL ORDER BY updated_at DESC LIMIT $2 OFFSET $3', [request.params.feature, limit, Math.max(Number(request.query.offset ?? 0), 0)]);
    return { items: rows, limit };
  });
  api.get('/features/:feature/:id', { preHandler: featureGuard }, async (request, reply) => {
    const { rows } = await db.query('SELECT * FROM feature_documents WHERE feature = $1 AND id = $2 AND deleted_at IS NULL', [request.params.feature, request.params.id]);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Feature item not found' });
    return { item: rows[0] };
  });
  api.patch('/features/:feature/:id', { preHandler: [api.auth, featureGuard], schema: { body: { type: 'object', additionalProperties: false, properties: { status: { type: 'string', maxLength: 30 }, payload: { type: 'object', additionalProperties: true } } } } }, async (request, reply) => {
    const client = await db.transaction();
    try {
      const existing = await client.query('SELECT * FROM feature_documents WHERE feature = $1 AND id = $2 AND deleted_at IS NULL FOR UPDATE', [request.params.feature, request.params.id]);
      if (!existing.rows[0] || (existing.rows[0].owner_id !== request.user.sub && !isAdmin(request))) { await client.rollback(); return reply.code(404).send({ error: 'NOT_FOUND', message: 'Feature item not found' }); }
      const payload = request.body.payload ?? existing.rows[0].payload;
      const next = await client.query('UPDATE feature_documents SET status = COALESCE($1, status), payload = $2, version = version + 1, updated_at = now() WHERE id = $3 RETURNING *', [request.body.status, payload, request.params.id]);
      await client.query('INSERT INTO feature_document_revisions (document_id, version, payload, changed_by) VALUES ($1, $2, $3, $4)', [request.params.id, next.rows[0].version, payload, request.user.sub]);
      await client.query('INSERT INTO outbox_events (topic, aggregate_type, aggregate_id, payload) VALUES ($1, $2, $3, $4)', [`${request.params.feature}.updated`, request.params.feature, request.params.id, { hash: payloadHash(payload) }]);
      await client.commit();
      return { item: next.rows[0] };
    } catch (error) { await client.rollback(); throw error; }
  });
  api.delete('/features/:feature/:id', { preHandler: [api.auth, featureGuard] }, async (request, reply) => {
    const query = isAdmin(request)
      ? 'UPDATE feature_documents SET deleted_at = now(), updated_at = now() WHERE feature = $1 AND id = $2 AND deleted_at IS NULL RETURNING id'
      : 'UPDATE feature_documents SET deleted_at = now(), updated_at = now() WHERE feature = $1 AND id = $2 AND owner_id = $3 AND deleted_at IS NULL RETURNING id';
    const values = isAdmin(request) ? [request.params.feature, request.params.id] : [request.params.feature, request.params.id, request.user.sub];
    const { rows } = await db.query(query, values);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Feature item not found' });
    return { ok: true };
  });

  api.get('/features/:feature/:id/revisions', { preHandler: [api.auth, featureGuard] }, async (request, reply) => {
    const access = await db.query('SELECT owner_id FROM feature_documents WHERE feature = $1 AND id = $2', [request.params.feature, request.params.id]);
    if (!access.rows[0] || (access.rows[0].owner_id !== request.user.sub && !isAdmin(request))) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Feature item not found' });
    return { revisions: (await db.query('SELECT * FROM feature_document_revisions WHERE document_id = $1 ORDER BY version DESC', [request.params.id])).rows };
  });
}
