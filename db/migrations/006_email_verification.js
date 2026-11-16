export const shorthands = undefined;

export async function up(pgm) {
  pgm.addColumn('users', {
    email_verified_at: { type: 'timestamptz' }
  });
  pgm.createTable('email_verification_tokens', {
    token_hash: { type: 'char(64)', primaryKey: true },
    user_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    expires_at: { type: 'timestamptz', notNull: true },
    consumed_at: { type: 'timestamptz' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.createIndex('email_verification_tokens', ['user_id', 'created_at']);
}

export async function down(pgm) {
  pgm.dropTable('email_verification_tokens');
  pgm.dropColumn('users', 'email_verified_at');
}
