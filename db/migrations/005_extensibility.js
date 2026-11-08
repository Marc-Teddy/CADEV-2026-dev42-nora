export async function up(pgm) {
  pgm.createTable('feature_documents', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },
    feature: { type: 'varchar(80)', notNull: true },
    owner_id: { type: 'uuid', references: 'users(id)', onDelete: 'SET NULL' },
    status: { type: 'varchar(30)', notNull: true, default: 'draft' },
    version: { type: 'integer', notNull: true, default: 1 },
    payload: { type: 'jsonb', notNull: true, default: '{}' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    deleted_at: { type: 'timestamptz' }
  });
  pgm.createIndex('feature_documents', ['feature', 'status', 'updated_at']);
  pgm.createIndex('feature_documents', ['owner_id', 'feature']);
  pgm.createTable('feature_document_revisions', {
    id: { type: 'bigserial', primaryKey: true },
    document_id: { type: 'uuid', notNull: true, references: 'feature_documents(id)', onDelete: 'CASCADE' },
    version: { type: 'integer', notNull: true },
    payload: { type: 'jsonb', notNull: true },
    changed_by: { type: 'uuid', references: 'users(id)', onDelete: 'SET NULL' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.addConstraint('feature_document_revisions', 'feature_document_revisions_unique', { unique: ['document_id', 'version'] });
  pgm.createTable('outbox_events', {
    id: { type: 'bigserial', primaryKey: true },
    topic: { type: 'varchar(120)', notNull: true },
    aggregate_type: { type: 'varchar(80)', notNull: true },
    aggregate_id: { type: 'uuid', notNull: true },
    payload: { type: 'jsonb', notNull: true },
    attempts: { type: 'integer', notNull: true, default: 0 },
    available_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    processed_at: { type: 'timestamptz' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.createIndex('outbox_events', ['processed_at', 'available_at']);
  pgm.createTable('idempotency_keys', {
    key: { type: 'varchar(255)', primaryKey: true },
    user_id: { type: 'uuid', references: 'users(id)', onDelete: 'CASCADE' },
    request_hash: { type: 'varchar(128)', notNull: true },
    response_status: { type: 'integer' },
    response_body: { type: 'jsonb' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    expires_at: { type: 'timestamptz', notNull: true }
  });
}

export async function down(pgm) {
  pgm.dropTable('idempotency_keys');
  pgm.dropTable('outbox_events');
  pgm.dropTable('feature_document_revisions');
  pgm.dropTable('feature_documents');
}
