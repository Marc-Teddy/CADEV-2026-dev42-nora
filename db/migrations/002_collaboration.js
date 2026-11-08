export async function up(pgm) {
  pgm.createTable('collaboration_spaces', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },
    owner_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    name: { type: 'varchar(120)', notNull: true },
    description: { type: 'varchar(1000)' },
    is_private: { type: 'boolean', notNull: true, default: false },
    archived_at: { type: 'timestamptz' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.createIndex('collaboration_spaces', 'updated_at');
  pgm.createTable('collaboration_members', {
    space_id: { type: 'uuid', notNull: true, references: 'collaboration_spaces(id)', onDelete: 'CASCADE' },
    user_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    role: { type: 'varchar(20)', notNull: true, default: 'member' },
    joined_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.addConstraint('collaboration_members', 'collaboration_members_pk', { primaryKey: ['space_id', 'user_id'] });
  pgm.addConstraint('collaboration_members', 'collaboration_members_role_check', { check: "role IN ('owner', 'moderator', 'member')" });
  pgm.createTable('collaboration_messages', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },
    space_id: { type: 'uuid', notNull: true, references: 'collaboration_spaces(id)', onDelete: 'CASCADE' },
    author_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    content: { type: 'varchar(4000)', notNull: true },
    edited_at: { type: 'timestamptz' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.createIndex('collaboration_messages', ['space_id', { name: 'created_at', sort: 'DESC' }]);
}

export async function down(pgm) {
  pgm.dropTable('collaboration_messages');
  pgm.dropTable('collaboration_members');
  pgm.dropTable('collaboration_spaces');
}
