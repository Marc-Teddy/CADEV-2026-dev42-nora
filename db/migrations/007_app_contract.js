/* ============================================================
   007 — Contrat applicatif du frontend NORA
   Ajoute les colonnes et tables dont l'interface a besoin
   (profils enrichis, étoiles, likes, équipes, salons publics,
   messagerie privée, workspace) sans modifier le comportement
   des routes REST existantes.
   ============================================================ */

export const shorthands = undefined;

const DEFAULT_GRADIENT = `'["#8b5cf6","#22d3ee"]'::jsonb`;

export async function up(pgm) {
  /* ---------- profils développeurs ---------- */
  pgm.addColumns('users', {
    headline: { type: 'varchar(120)', notNull: true, default: '' },
    flag: { type: 'varchar(16)', notNull: true, default: '🌍' },
    skills: { type: 'jsonb', notNull: true, default: pgm.func("'[]'::jsonb") },
    badges: { type: 'jsonb', notNull: true, default: pgm.func("'[]'::jsonb") },
    langs: { type: 'jsonb', notNull: true, default: pgm.func("'[]'::jsonb") },
    gradient: { type: 'jsonb', notNull: true, default: pgm.func(DEFAULT_GRADIENT) },
    availability: { type: 'varchar(20)', notNull: true, default: 'ouverte' },
    articles: { type: 'integer', notNull: true, default: 0 },
    challenges_won: { type: 'integer', notNull: true, default: 0 },
    followers_count: { type: 'integer', notNull: true, default: 0 },
    projects_count: { type: 'integer', notNull: true, default: 0 },
    online: { type: 'boolean', notNull: true, default: false },
    joined_label: { type: 'varchar(40)' }
  });
  // photo de profil téléversée depuis l'interface (data URL) : ne tient pas en 500 caractères
  pgm.alterColumn('users', 'avatar_url', { type: 'text' });
  pgm.addConstraint('users', 'users_availability_check', {
    check: "availability IN ('ouverte', 'hackathon', 'mentorat', 'missions', 'occupe')"
  });

  pgm.createTable('follows', {
    follower_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    followee_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.addConstraint('follows', 'follows_pk', { primaryKey: ['follower_id', 'followee_id'] });
  pgm.addConstraint('follows', 'follows_not_self', { check: 'follower_id <> followee_id' });
  pgm.createIndex('follows', 'followee_id');

  /* ---------- projets ---------- */
  pgm.addColumns('projects', {
    tagline: { type: 'varchar(300)', notNull: true, default: '' },
    domain: { type: 'varchar(60)', notNull: true, default: 'Communautaire' },
    status: { type: 'varchar(20)', notNull: true, default: 'dev' },
    icon: { type: 'varchar(16)', notNull: true, default: '🚀' },
    cover: { type: 'varchar(500)' },
    repo: { type: 'varchar(200)', notNull: true, default: '' },
    progress: { type: 'integer', notNull: true, default: 0 },
    gradient: { type: 'jsonb', notNull: true, default: pgm.func(DEFAULT_GRADIENT) },
    open_roles: { type: 'jsonb', notNull: true, default: pgm.func("'[]'::jsonb") },
    stars_base: { type: 'integer', notNull: true, default: 0 },
    forks: { type: 'integer', notNull: true, default: 0 }
  });
  pgm.addConstraint('projects', 'projects_status_check', { check: "status IN ('production', 'dev', 'equipe', 'idee')" });
  pgm.addConstraint('projects', 'projects_progress_check', { check: 'progress BETWEEN 0 AND 100' });

  pgm.createTable('project_members', {
    project_id: { type: 'uuid', notNull: true, references: 'projects(id)', onDelete: 'CASCADE' },
    user_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    joined_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.addConstraint('project_members', 'project_members_pk', { primaryKey: ['project_id', 'user_id'] });

  pgm.createTable('project_stars', {
    project_id: { type: 'uuid', notNull: true, references: 'projects(id)', onDelete: 'CASCADE' },
    user_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.addConstraint('project_stars', 'project_stars_pk', { primaryKey: ['project_id', 'user_id'] });

  /* ---------- fil d'actualité ---------- */
  pgm.addColumns('posts', {
    type: { type: 'varchar(20)', notNull: true, default: 'text' },
    tags: { type: 'jsonb', notNull: true, default: pgm.func("'[]'::jsonb") },
    likes_base: { type: 'integer', notNull: true, default: 0 },
    comments_count: { type: 'integer', notNull: true, default: 0 },
    shares: { type: 'integer', notNull: true, default: 0 },
    code_lang: { type: 'varchar(40)' },
    code_title: { type: 'varchar(200)' },
    code_snippet: { type: 'varchar(20000)' },
    project_id: { type: 'uuid', references: 'projects(id)', onDelete: 'SET NULL' }
  });
  pgm.addConstraint('posts', 'posts_type_check', { check: "type IN ('text', 'project', 'code', 'article', 'challenge', 'milestone')" });

  pgm.createTable('post_likes', {
    post_id: { type: 'uuid', notNull: true, references: 'posts(id)', onDelete: 'CASCADE' },
    user_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.addConstraint('post_likes', 'post_likes_pk', { primaryKey: ['post_id', 'user_id'] });

  /* ---------- salons publics (= espaces de collaboration publics) ---------- */
  pgm.addColumns('collaboration_spaces', {
    slug: { type: 'varchar(80)', unique: true },
    is_channel: { type: 'boolean', notNull: true, default: false },
    kind: { type: 'varchar(10)', notNull: true, default: 'text' },
    topic: { type: 'varchar(300)', notNull: true, default: '' },
    position: { type: 'integer', notNull: true, default: 0 },
    members_base: { type: 'integer', notNull: true, default: 0 }
  });
  pgm.addColumns('collaboration_messages', {
    kind: { type: 'varchar(10)', notNull: true, default: 'text' },
    code_lang: { type: 'varchar(40)' },
    code_snippet: { type: 'varchar(20000)' }
  });

  /* ---------- messagerie privée ---------- */
  pgm.createTable('contact_requests', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },
    from_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    to_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    status: { type: 'varchar(20)', notNull: true, default: 'pending' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.addConstraint('contact_requests', 'contact_requests_pair_unique', { unique: ['from_id', 'to_id'] });
  pgm.addConstraint('contact_requests', 'contact_requests_status_check', { check: "status IN ('pending', 'accepted', 'declined')" });
  pgm.createIndex('contact_requests', 'to_id');

  pgm.createTable('direct_messages', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },
    sender_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    recipient_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    content: { type: 'varchar(8000)', notNull: true },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.createIndex('direct_messages', ['sender_id', 'recipient_id', 'created_at']);
  pgm.createIndex('direct_messages', ['recipient_id', 'created_at']);

  /* ---------- challenges, missions ---------- */
  pgm.addColumns('challenges', {
    language: { type: 'varchar(60)', notNull: true, default: '' },
    points: { type: 'integer', notNull: true, default: 0 },
    participants_base: { type: 'integer', notNull: true, default: 0 },
    success_rate: { type: 'integer', notNull: true, default: 0 }
  });
  pgm.addColumns('opportunities', {
    details: { type: 'jsonb', notNull: true, default: pgm.func("'{}'::jsonb") }
  });

  /* ---------- Studio : fichiers de code ---------- */
  pgm.createTable('workspace_files', {
    id: { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') },
    user_id: { type: 'uuid', notNull: true, references: 'users(id)', onDelete: 'CASCADE' },
    path: { type: 'varchar(120)', notNull: true },
    content: { type: 'text', notNull: true, default: '' },
    language: { type: 'varchar(30)', notNull: true, default: 'plaintext' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') }
  });
  pgm.addConstraint('workspace_files', 'workspace_files_path_unique', { unique: ['user_id', 'path'] });

  /* ---------- compte système de l'agent NORA ----------
     Sans mot de passe : impossible de s'y connecter. Il porte
     les réponses de l'IA en messagerie et le contenu officiel. */
  pgm.sql(`INSERT INTO users (email, username, display_name, headline, bio)
           VALUES ('agent@nora.system', 'nora', 'NORA', 'Assistante IA', 'Agent IA de la plateforme NORA')
           ON CONFLICT DO NOTHING`);
}

export async function down(pgm) {
  pgm.sql("DELETE FROM users WHERE username = 'nora' AND password_hash IS NULL");
  pgm.dropTable('workspace_files');
  pgm.dropColumns('opportunities', ['details']);
  pgm.dropColumns('challenges', ['language', 'points', 'participants_base', 'success_rate']);
  pgm.dropTable('direct_messages');
  pgm.dropTable('contact_requests');
  pgm.dropColumns('collaboration_messages', ['kind', 'code_lang', 'code_snippet']);
  pgm.dropColumns('collaboration_spaces', ['slug', 'is_channel', 'kind', 'topic', 'position', 'members_base']);
  pgm.dropTable('post_likes');
  pgm.dropConstraint('posts', 'posts_type_check');
  pgm.dropColumns('posts', ['type', 'tags', 'likes_base', 'comments_count', 'shares', 'code_lang', 'code_title', 'code_snippet', 'project_id']);
  pgm.dropTable('project_stars');
  pgm.dropTable('project_members');
  pgm.dropConstraint('projects', 'projects_progress_check');
  pgm.dropConstraint('projects', 'projects_status_check');
  pgm.dropColumns('projects', ['tagline', 'domain', 'status', 'icon', 'cover', 'repo', 'progress', 'gradient', 'open_roles', 'stars_base', 'forks']);
  pgm.dropTable('follows');
  pgm.dropConstraint('users', 'users_availability_check');
  pgm.sql("UPDATE users SET avatar_url = NULL WHERE length(avatar_url) > 500");
  pgm.alterColumn('users', 'avatar_url', { type: 'varchar(500)' });
  pgm.dropColumns('users', ['headline', 'flag', 'skills', 'badges', 'langs', 'gradient', 'availability', 'articles', 'challenges_won', 'followers_count', 'projects_count', 'online', 'joined_label']);
}
