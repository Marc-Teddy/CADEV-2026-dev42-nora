export const shorthands = undefined;

export async function up(pgm) {
  pgm.sql('CREATE EXTENSION IF NOT EXISTS pgcrypto');
  pgm.sql('CREATE EXTENSION IF NOT EXISTS citext');
  pgm.createTable('users', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },
    email: { type: 'citext', notNull: true, unique: true },
    username: { type: 'citext', notNull: true, unique: true },
    password_hash: { type: 'text' },
    display_name: { type: 'varchar(100)' }, bio: { type: 'varchar(2000)' },
    country: { type: 'varchar(80)' }, city: { type: 'varchar(120)' }, avatar_url: { type: 'varchar(500)' },
    role: { type: 'varchar(20)', notNull: true, default: 'member' },
    reputation: { type: 'integer', notNull: true, default: 0 },
    deleted_at: { type: 'timestamptz' }, created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.addConstraint('users', 'users_role_check', { check: "role IN ('member', 'moderator', 'admin')" });
  pgm.addConstraint('users', 'users_reputation_check', { check: 'reputation >= 0' });
  pgm.createTable('refresh_tokens', {
    jti: { type: 'uuid', primaryKey: true }, user_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    expires_at: { type: 'timestamptz', notNull: true }, revoked_at: { type: 'timestamptz' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.createIndex('refresh_tokens', 'user_id');
  pgm.createTable('oauth_identities', {
    provider: { type: 'varchar(40)', notNull: true },
    provider_user_id: { type: 'varchar(255)', notNull: true },
    user_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.addConstraint('oauth_identities', 'oauth_identities_pk', { primaryKey: ['provider', 'provider_user_id'] });
  pgm.createIndex('oauth_identities', 'user_id');
  pgm.createTable('projects', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') }, owner_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    title: { type: 'varchar(160)', notNull: true }, description: { type: 'varchar(10000)', notNull: true },
    repository_url: { type: 'varchar(500)' }, demo_url: { type: 'varchar(500)' },
    technologies: { type: 'text[]', notNull: true, default: '{}' }, deleted_at: { type: 'timestamptz' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }, updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.sql('CREATE INDEX projects_created_idx ON projects(created_at DESC) WHERE deleted_at IS NULL');
  pgm.createTable('posts', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') }, author_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    content: { type: 'varchar(5000)', notNull: true }, deleted_at: { type: 'timestamptz' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.sql('CREATE INDEX posts_feed_idx ON posts(created_at DESC) WHERE deleted_at IS NULL');
}

export async function down(pgm) {
  pgm.dropTable('posts');
  pgm.dropTable('projects');
  pgm.dropTable('refresh_tokens');
  pgm.dropTable('oauth_identities');
  pgm.dropTable('users');
}
