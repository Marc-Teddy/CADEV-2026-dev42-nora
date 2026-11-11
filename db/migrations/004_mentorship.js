export async function up(pgm) {
  pgm.createTable('mentor_profiles', {
    user_id: { type: 'uuid', primaryKey: true, references: 'users(id)', onDelete: 'CASCADE' },
    specialties: { type: 'text[]', notNull: true, default: '{}' }, languages: { type: 'text[]', notNull: true, default: '{}' },
    availability: { type: 'jsonb', notNull: true, default: '{}' }, hourly_rate_minor: { type: 'bigint' },
    currency: { type: 'varchar(3)' }, bio: { type: 'varchar(3000)' }, status: { type: 'varchar(20)', notNull: true, default: 'active' }
  });
  pgm.createTable('mentorship_requests', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') }, mentor_id: { type: 'uuid', notNull: true, references: 'users(id)' },
    mentee_id: { type: 'uuid', notNull: true, references: 'users(id)' }, goal: { type: 'varchar(2000)', notNull: true },
    status: { type: 'varchar(20)', notNull: true, default: 'pending' }, created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.addConstraint('mentorship_requests', 'mentorship_requests_status_check', { check: "status IN ('pending', 'accepted', 'declined', 'completed', 'cancelled')" });
}
export async function down(pgm) {
  pgm.dropTable('mentorship_requests');
  pgm.dropTable('mentor_profiles');
}
