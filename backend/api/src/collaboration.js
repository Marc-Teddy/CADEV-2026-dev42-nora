const ACCESS_COOKIE = 'nora_access';
const MAX_MESSAGE_LENGTH = 4000;

function parseLimit(value) {
  const parsed = Number(value ?? 50);
  return Number.isInteger(parsed) ? Math.min(Math.max(parsed, 1), 100) : 50;
}

export function registerCollaboration(api, db) {
  const sockets = new Map();

  const getMembership = async (spaceId, userId) => {
    const { rows } = await db.query(
      'SELECT role FROM collaboration_members WHERE space_id = $1 AND user_id = $2',
      [spaceId, userId]
    );
    return rows[0];
  };

  const broadcast = (spaceId, payload, excluded) => {
    const members = sockets.get(spaceId) ?? new Set();
    const message = JSON.stringify(payload);
    for (const socket of members) {
      if (socket !== excluded && socket.readyState === 1) socket.send(message);
    }
  };

  api.post('/spaces', {
    preHandler: api.auth,
    schema: { body: { type: 'object', required: ['name'], additionalProperties: false,
      properties: { name: { type: 'string', minLength: 2, maxLength: 120 }, description: { type: 'string', maxLength: 1000 }, isPrivate: { type: 'boolean' } } } }
  }, async (request, reply) => {
    const { rows } = await db.query(
      `WITH created AS (
        INSERT INTO collaboration_spaces (owner_id, name, description, is_private)
        VALUES ($1, $2, $3, $4) RETURNING *
      )
      SELECT created.*, json_build_object('role', 'owner') AS membership FROM created`,
      [request.user.sub, request.body.name.trim(), request.body.description ?? null, request.body.isPrivate ?? false]
    );
    await db.query(
      'INSERT INTO collaboration_members (space_id, user_id, role) VALUES ($1, $2, $3)',
      [rows[0].id, request.user.sub, 'owner']
    );
    return reply.code(201).send({ space: rows[0] });
  });

  api.get('/spaces', { preHandler: api.auth }, async (request) => {
    const { rows } = await db.query(
      `SELECT s.*, m.role AS membership_role, COUNT(cm.user_id)::integer AS member_count
       FROM collaboration_spaces s
       JOIN collaboration_members m ON m.space_id = s.id AND m.user_id = $1
       LEFT JOIN collaboration_members cm ON cm.space_id = s.id
       WHERE s.archived_at IS NULL
       GROUP BY s.id, m.role ORDER BY s.updated_at DESC LIMIT 100`,
      [request.user.sub]
    );
    return { spaces: rows };
  });
  api.get('/spaces/:spaceId', { preHandler: api.auth }, async (request, reply) => {
    const membership = await getMembership(request.params.spaceId, request.user.sub);
    if (!membership) return reply.code(403).send({ error: 'FORBIDDEN', message: 'Space membership required' });
    const { rows } = await db.query('SELECT s.*, $2::text AS membership_role FROM collaboration_spaces s WHERE s.id = $1 AND s.archived_at IS NULL', [request.params.spaceId, membership.role]);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Space not found' });
    return { space: rows[0] };
  });
  api.patch('/spaces/:spaceId', { preHandler: api.auth, schema: { body: { type: 'object', additionalProperties: false, properties: { name: { type: 'string', minLength: 2, maxLength: 120 }, description: { type: 'string', maxLength: 1000 }, isPrivate: { type: 'boolean' } } } } }, async (request, reply) => {
    const membership = await getMembership(request.params.spaceId, request.user.sub);
    if (!membership || membership.role !== 'owner') return reply.code(403).send({ error: 'FORBIDDEN', message: 'Only the owner can edit this space' });
    const { rows } = await db.query('UPDATE collaboration_spaces SET name = COALESCE($1, name), description = COALESCE($2, description), is_private = COALESCE($3, is_private), updated_at = now() WHERE id = $4 AND archived_at IS NULL RETURNING *', [request.body.name, request.body.description, request.body.isPrivate, request.params.spaceId]);
    return { space: rows[0] };
  });
  api.delete('/spaces/:spaceId', { preHandler: api.auth }, async (request, reply) => {
    const membership = await getMembership(request.params.spaceId, request.user.sub);
    if (!membership || membership.role !== 'owner') return reply.code(403).send({ error: 'FORBIDDEN', message: 'Only the owner can archive this space' });
    await db.query('UPDATE collaboration_spaces SET archived_at = now(), updated_at = now() WHERE id = $1', [request.params.spaceId]);
    return { ok: true };
  });

  api.post('/spaces/:spaceId/members', {
    preHandler: api.auth,
    schema: { body: { type: 'object', required: ['username'], additionalProperties: false,
      properties: { username: { type: 'string', minLength: 3, maxLength: 30 } } } }
  }, async (request, reply) => {
    const membership = await getMembership(request.params.spaceId, request.user.sub);
    if (!membership || !['owner', 'moderator'].includes(membership.role)) {
      return reply.code(403).send({ error: 'FORBIDDEN', message: 'Only space moderators can invite members' });
    }
    const user = await db.query('SELECT id, username, display_name FROM users WHERE username = $1 AND deleted_at IS NULL', [request.body.username]);
    if (!user.rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'User not found' });
    try {
      await db.query('INSERT INTO collaboration_members (space_id, user_id, role) VALUES ($1, $2, $3)', [request.params.spaceId, user.rows[0].id, 'member']);
    } catch (error) {
      if (error.code === '23505') return reply.code(409).send({ error: 'CONFLICT', message: 'User is already a member' });
      throw error;
    }
    return reply.code(201).send({ member: user.rows[0] });
  });
  api.delete('/spaces/:spaceId/members/:userId', { preHandler: api.auth }, async (request, reply) => {
    const membership = await getMembership(request.params.spaceId, request.user.sub);
    if (!membership || !['owner', 'moderator'].includes(membership.role)) return reply.code(403).send({ error: 'FORBIDDEN', message: 'Moderator role required' });
    const result = await db.query('DELETE FROM collaboration_members WHERE space_id = $1 AND user_id = $2 AND role <> $3', [request.params.spaceId, request.params.userId, 'owner']);
    if (!result.rowCount) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Member not found or cannot be removed' });
    return { ok: true };
  });
  api.patch('/spaces/:spaceId/members/:userId', { preHandler: api.auth, schema: { body: { type: 'object', required: ['role'], additionalProperties: false, properties: { role: { type: 'string', enum: ['moderator', 'member'] } } } } }, async (request, reply) => {
    const membership = await getMembership(request.params.spaceId, request.user.sub);
    if (!membership || membership.role !== 'owner') return reply.code(403).send({ error: 'FORBIDDEN', message: 'Only the owner can change member roles' });
    const { rows } = await db.query("UPDATE collaboration_members SET role = $1 WHERE space_id = $2 AND user_id = $3 AND role <> 'owner' RETURNING space_id, user_id, role", [request.body.role, request.params.spaceId, request.params.userId]);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Member not found or cannot be changed' });
    return { member: rows[0] };
  });

  api.get('/spaces/:spaceId/messages', {
    preHandler: api.auth,
    schema: { querystring: { type: 'object', additionalProperties: false, properties: { before: { type: 'string', format: 'date-time' }, limit: { type: 'integer', minimum: 1, maximum: 100 } } } }
  }, async (request, reply) => {
    if (!await getMembership(request.params.spaceId, request.user.sub)) return reply.code(403).send({ error: 'FORBIDDEN', message: 'Space membership required' });
    const limit = parseLimit(request.query.limit);
    const { rows } = await db.query(
      `SELECT m.id, m.content, m.created_at, m.edited_at, u.id AS author_id, u.username, u.display_name, u.avatar_url
       FROM collaboration_messages m JOIN users u ON u.id = m.author_id
       WHERE m.space_id = $1 AND ($2::timestamptz IS NULL OR m.created_at < $2)
       ORDER BY m.created_at DESC LIMIT $3`,
      [request.params.spaceId, request.query.before ?? null, limit]
    );
    return { messages: rows.reverse(), hasMore: rows.length === limit };
  });
  api.patch('/spaces/:spaceId/messages/:messageId', { preHandler: api.auth, schema: { body: { type: 'object', required: ['content'], additionalProperties: false, properties: { content: { type: 'string', minLength: 1, maxLength: MAX_MESSAGE_LENGTH } } } } }, async (request, reply) => {
    const { rows } = await db.query('UPDATE collaboration_messages SET content = $1, edited_at = now() WHERE id = $2 AND space_id = $3 AND author_id = $4 RETURNING *', [request.body.content.trim(), request.params.messageId, request.params.spaceId, request.user.sub]);
    if (!rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Message not found' });
    broadcast(request.params.spaceId, { type: 'message.updated', message: rows[0] });
    return { message: rows[0] };
  });
  api.delete('/spaces/:spaceId/messages/:messageId', { preHandler: api.auth }, async (request, reply) => {
    const membership = await getMembership(request.params.spaceId, request.user.sub);
    const result = await db.query('DELETE FROM collaboration_messages WHERE id = $1 AND space_id = $2 AND (author_id = $3 OR $4 IN ($5, $6)) RETURNING id', [request.params.messageId, request.params.spaceId, request.user.sub, membership?.role, 'owner', 'moderator']);
    if (!result.rows[0]) return reply.code(404).send({ error: 'NOT_FOUND', message: 'Message not found' });
    broadcast(request.params.spaceId, { type: 'message.deleted', messageId: result.rows[0].id });
    return { ok: true };
  });

  api.get('/spaces/:spaceId/live', { websocket: true }, (socket, request) => {
    let user;
    try {
      user = api.jwt.verify(request.cookies?.[ACCESS_COOKIE]);
      if (!user?.sub) throw new Error('Invalid identity');
    } catch {
      socket.close(1008, 'Authentication required');
      return;
    }
    getMembership(request.params.spaceId, user.sub).then((membership) => {
      if (!membership) {
        socket.close(1008, 'Space membership required');
        return;
      }
      const current = sockets.get(request.params.spaceId) ?? new Set();
      current.add(socket);
      sockets.set(request.params.spaceId, current);
      socket.send(JSON.stringify({ type: 'ready', spaceId: request.params.spaceId }));
      broadcast(request.params.spaceId, { type: 'presence', userId: user.sub, status: 'online' }, socket);

      socket.on('message', async (raw) => {
        try {
          const input = JSON.parse(raw.toString());
          if (input.type !== 'message' || typeof input.content !== 'string' || input.content.trim().length === 0 || input.content.length > MAX_MESSAGE_LENGTH) {
            socket.send(JSON.stringify({ type: 'error', code: 'INVALID_MESSAGE' }));
            return;
          }
          const { rows } = await db.query(
            `INSERT INTO collaboration_messages (space_id, author_id, content)
             VALUES ($1, $2, $3)
             RETURNING id, space_id, author_id, content, created_at`,
            [request.params.spaceId, user.sub, input.content.trim()]
          );
          broadcast(request.params.spaceId, { type: 'message', message: rows[0] });
        } catch {
          socket.send(JSON.stringify({ type: 'error', code: 'INVALID_PAYLOAD' }));
        }
      });
      socket.on('close', () => {
        current.delete(socket);
        if (!current.size) sockets.delete(request.params.spaceId);
        broadcast(request.params.spaceId, { type: 'presence', userId: user.sub, status: 'offline' }, socket);
      });
    }).catch(() => socket.close(1011, 'Unable to join space'));
  });
}
