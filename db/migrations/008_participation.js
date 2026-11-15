/* ============================================================
   008 — Participation : inscriptions aux challenges et
   candidatures aux missions (opportunités), jusque-là simulées
   côté interface.
   ============================================================ */

export const shorthands = undefined;

export async function up(pgm) {
  pgm.createTable('challenge_participants', {
    challenge_id: { type: 'uuid', notNull: true, references: 'challenges(id)', onDelete: 'CASCADE' },
    user_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    joined_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.addConstraint('challenge_participants', 'challenge_participants_pk', { primaryKey: ['challenge_id', 'user_id'] });
  pgm.createIndex('challenge_participants', 'user_id');

  pgm.createTable('opportunity_applications', {
    opportunity_id: { type: 'uuid', notNull: true, references: 'opportunities(id)', onDelete: 'CASCADE' },
    user_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    message: { type: 'varchar(2000)', notNull: true, default: '' },
    status: { type: 'varchar(20)', notNull: true, default: 'sent' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.addConstraint('opportunity_applications', 'opportunity_applications_pk', { primaryKey: ['opportunity_id', 'user_id'] });
  pgm.addConstraint('opportunity_applications', 'opportunity_applications_status_check', { check: "status IN ('sent', 'accepted', 'declined', 'withdrawn')" });
  pgm.createIndex('opportunity_applications', 'user_id');
}

export async function down(pgm) {
  pgm.dropTable('opportunity_applications');
  pgm.dropTable('challenge_participants');
}
