export async function up(pgm) {
  pgm.createTable('products', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },
    seller_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    title: { type: 'varchar(180)', notNull: true }, description: { type: 'varchar(10000)', notNull: true },
    price_minor: { type: 'bigint', notNull: true }, currency: { type: 'varchar(3)', notNull: true },
    stock: { type: 'integer', notNull: true, default: 0 }, status: { type: 'varchar(20)', notNull: true, default: 'draft' },
    metadata: { type: 'jsonb', notNull: true, default: '{}' }, created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.addConstraint('products', 'products_price_check', { check: 'price_minor >= 0' });
  pgm.addConstraint('products', 'products_stock_check', { check: 'stock >= 0' });
  pgm.addConstraint('products', 'products_status_check', { check: "status IN ('draft', 'published', 'paused', 'archived')" });
  pgm.createIndex('products', ['status', 'created_at']);
  pgm.createTable('orders', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') }, buyer_id: { type: 'uuid', notNull: true, references: 'users(id)' },
    total_minor: { type: 'bigint', notNull: true }, currency: { type: 'varchar(3)', notNull: true },
    status: { type: 'varchar(20)', notNull: true, default: 'pending' }, shipping: { type: 'jsonb' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }, updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.createTable('order_items', {
    order_id: { type: 'uuid', notNull: true, references: 'orders(id)', onDelete: 'CASCADE' }, product_id: { type: 'uuid', notNull: true, references: 'products(id)' },
    seller_id: { type: 'uuid', notNull: true, references: 'users(id)' }, quantity: { type: 'integer', notNull: true }, unit_price_minor: { type: 'bigint', notNull: true },
    title_snapshot: { type: 'varchar(180)', notNull: true }
  });
  pgm.addConstraint('order_items', 'order_items_pk', { primaryKey: ['order_id', 'product_id'] });
  pgm.createTable('payment_intents', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') }, order_id: { type: 'uuid', notNull: true, unique: true, references: 'orders(id)' },
    provider: { type: 'varchar(40)', notNull: true }, provider_reference: { type: 'varchar(255)' }, amount_minor: { type: 'bigint', notNull: true },
    currency: { type: 'varchar(3)', notNull: true }, status: { type: 'varchar(20)', notNull: true, default: 'requires_action' },
    provider_payload: { type: 'jsonb' }, created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }, updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.createTable('payment_events', {
    provider: { type: 'varchar(40)', notNull: true }, event_id: { type: 'varchar(255)', notNull: true },
    payload_hash: { type: 'varchar(128)', notNull: true }, payload: { type: 'jsonb', notNull: true }, received_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.addConstraint('payment_events', 'payment_events_pk', { primaryKey: ['provider', 'event_id'] });
  pgm.createTable('payout_accounts', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') }, user_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    provider: { type: 'varchar(40)', notNull: true }, account_reference: { type: 'varchar(255)', notNull: true }, country: { type: 'varchar(2)', notNull: true },
    status: { type: 'varchar(20)', notNull: true, default: 'pending_verification' }, created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.createIndex('payout_accounts', ['user_id', 'provider']);

  pgm.createTable('feature_flags', { key: { type: 'varchar(100)', primaryKey: true }, enabled: { type: 'boolean', notNull: true, default: false }, rules: { type: 'jsonb', notNull: true, default: '{}' }, updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') } });
  pgm.createTable('platform_settings', { key: { type: 'varchar(100)', primaryKey: true }, value: { type: 'jsonb', notNull: true }, is_public: { type: 'boolean', notNull: true, default: false }, updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') } });
  pgm.createTable('catalog_items', { id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') }, kind: { type: 'varchar(40)', notNull: true }, slug: { type: 'varchar(120)', notNull: true, unique: true }, payload: { type: 'jsonb', notNull: true }, status: { type: 'varchar(20)', notNull: true, default: 'draft' }, created_by: { type: 'uuid', notNull: true, references: 'users(id)' }, updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') } });
  pgm.createTable('announcements', { id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') }, title: { type: 'varchar(180)', notNull: true }, body: { type: 'varchar(10000)', notNull: true }, audience: { type: 'jsonb', notNull: true, default: '{}' }, starts_at: { type: 'timestamptz' }, ends_at: { type: 'timestamptz' }, created_by: { type: 'uuid', notNull: true, references: 'users(id)' } });
  pgm.createTable('moderation_reports', { id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') }, reporter_id: { type: 'uuid', notNull: true, references: 'users(id)' }, target_type: { type: 'varchar(40)', notNull: true }, target_id: { type: 'uuid', notNull: true }, reason: { type: 'varchar(1000)', notNull: true }, status: { type: 'varchar(20)', notNull: true, default: 'open' }, resolution: { type: 'jsonb' }, reviewed_by: { type: 'uuid', references: 'users(id)' }, created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') } });
  pgm.createIndex('moderation_reports', ['status', 'created_at']);
  pgm.createTable('audit_logs', { id: { type: 'bigserial', primaryKey: true }, actor_id: { type: 'uuid', references: 'users(id)' }, action: { type: 'varchar(120)', notNull: true }, target_type: { type: 'varchar(40)' }, target_id: { type: 'uuid' }, metadata: { type: 'jsonb', notNull: true, default: '{}' }, ip_hash: { type: 'varchar(128)' }, created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') } });

  pgm.createTable('challenges', { id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') }, creator_id: { type: 'uuid', notNull: true, references: 'users(id)' }, title: { type: 'varchar(180)', notNull: true }, description: { type: 'varchar(10000)', notNull: true }, difficulty: { type: 'varchar(20)', notNull: true }, tests: { type: 'jsonb', notNull: true, default: '[]' }, starts_at: { type: 'timestamptz' }, ends_at: { type: 'timestamptz' }, status: { type: 'varchar(20)', notNull: true, default: 'draft' } });
  pgm.createTable('challenge_submissions', { id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') }, challenge_id: { type: 'uuid', notNull: true, references: 'challenges(id)', onDelete: 'CASCADE' }, user_id: { type: 'uuid', notNull: true, references: 'users(id)' }, code_hash: { type: 'varchar(128)', notNull: true }, status: { type: 'varchar(20)', notNull: true, default: 'queued' }, score: { type: 'integer' }, created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') } });
  pgm.createTable('opportunities', { id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') }, author_id: { type: 'uuid', notNull: true, references: 'users(id)' }, title: { type: 'varchar(180)', notNull: true }, description: { type: 'varchar(10000)', notNull: true }, type: { type: 'varchar(30)', notNull: true }, country: { type: 'varchar(2)' }, remote: { type: 'boolean', notNull: true, default: true }, compensation: { type: 'jsonb' }, status: { type: 'varchar(20)', notNull: true, default: 'draft' }, created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') } });
  pgm.createTable('notifications', { id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') }, user_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' }, type: { type: 'varchar(40)', notNull: true }, payload: { type: 'jsonb', notNull: true }, read_at: { type: 'timestamptz' }, created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') } });
  pgm.createIndex('notifications', ['user_id', 'created_at']);
}

export async function down(pgm) {
  for (const table of ['notifications', 'opportunities', 'challenge_submissions', 'challenges', 'audit_logs', 'moderation_reports', 'announcements', 'catalog_items', 'platform_settings', 'feature_flags', 'payout_accounts', 'payment_events', 'payment_intents', 'order_items', 'orders', 'products']) pgm.dropTable(table);
}
