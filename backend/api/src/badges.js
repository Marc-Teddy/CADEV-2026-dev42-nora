/* ============================================================
   NORA — Badges calculés
   Un badge se mérite : il est recalculé par le serveur à partir
   des données réelles, jamais déclaré par l'utilisateur.
   Recalcul : après chaque action concernée, au démarrage de l'API
   et à la fin du seed.
   ============================================================ */

/* Seuils des règles (modifiables en un seul endroit). */
export const THRESHOLDS = {
  challenges: 3,      // challenges réussis
  mentorships: 1,     // mentorats terminés en tant que mentor
  stars: 100,         // étoiles cumulées sur ses projets
  langs: 3,           // langues parlées
  newFollowers: 50,   // abonnés gagnés…
  newFollowersDays: 30, // …sur cette période
  teams: 3            // projets dont on est membre
};

/* Ordre d'affichage = ordre de prestige. */
export const BADGE_RULES = [
  { kind: 'mentor', label: 'Mentor vérifié', rule: `profil mentor actif et au moins ${THRESHOLDS.mentorships} mentorat terminé`, earned: (m) => m.mentor_active && m.mentorships_completed >= THRESHOLDS.mentorships },
  { kind: 'founder', label: 'Fondateur·rice', rule: 'a créé un projet passé en production', earned: (m) => m.production_projects > 0 },
  { kind: 'solo', label: 'Solo Shipper', rule: 'projet en production sans autre membre dans l’équipe', earned: (m) => m.solo_production_projects > 0 },
  { kind: 'challenger', label: 'Challenger', rule: `au moins ${THRESHOLDS.challenges} challenges réussis`, earned: (m) => m.challenges >= THRESHOLDS.challenges },
  { kind: 'opensource', label: 'Open Source', rule: `ses projets cumulent au moins ${THRESHOLDS.stars} étoiles`, earned: (m) => m.stars >= THRESHOLDS.stars },
  { kind: 'architect', label: 'Architecte', rule: `membre d’au moins ${THRESHOLDS.teams} projets`, earned: (m) => m.teams >= THRESHOLDS.teams },
  { kind: 'star', label: 'Étoile montante', rule: `au moins ${THRESHOLDS.newFollowers} abonnés gagnés en ${THRESHOLDS.newFollowersDays} jours`, earned: (m) => m.new_followers >= THRESHOLDS.newFollowers },
  { kind: 'polyglote', label: 'Polyglote', rule: `parle au moins ${THRESHOLDS.langs} langues`, earned: (m) => m.langs >= THRESHOLDS.langs }
];

/* Badges mérités à partir des métriques d'un utilisateur. */
export function badgesFor(metrics) {
  return BADGE_RULES.filter((b) => b.earned(metrics)).map(({ kind, label }) => ({ kind, label }));
}

const METRICS_SQL = `
  SELECT u.id,
    jsonb_array_length(u.langs) AS langs,
    u.challenges_won + (SELECT count(DISTINCT s.challenge_id)::int FROM challenge_submissions s
      WHERE s.user_id = u.id AND s.status IN ('passed', 'accepted')) AS challenges,
    EXISTS (SELECT 1 FROM mentor_profiles m WHERE m.user_id = u.id AND m.status = 'active') AS mentor_active,
    (SELECT count(*)::int FROM mentorship_requests r WHERE r.mentor_id = u.id AND r.status = 'completed') AS mentorships_completed,
    (SELECT count(*)::int FROM projects p WHERE p.owner_id = u.id AND p.deleted_at IS NULL AND p.status = 'production') AS production_projects,
    (SELECT count(*)::int FROM projects p WHERE p.owner_id = u.id AND p.deleted_at IS NULL AND p.status = 'production'
      AND NOT EXISTS (SELECT 1 FROM project_members pm WHERE pm.project_id = p.id AND pm.user_id <> u.id)) AS solo_production_projects,
    (SELECT COALESCE(sum(p.stars_base + (SELECT count(*) FROM project_stars s WHERE s.project_id = p.id)), 0)::int
      FROM projects p WHERE p.owner_id = u.id AND p.deleted_at IS NULL) AS stars,
    (SELECT count(*)::int FROM project_members pm JOIN projects p ON p.id = pm.project_id AND p.deleted_at IS NULL
      WHERE pm.user_id = u.id) AS teams,
    (SELECT count(*)::int FROM follows f WHERE f.followee_id = u.id
      AND f.created_at > now() - make_interval(days => ${THRESHOLDS.newFollowersDays})) AS new_followers
  FROM users u
  WHERE u.deleted_at IS NULL`;

/* Recalcule et enregistre les badges des utilisateurs donnés
   (tous si `userIds` est absent). Renvoie le nombre de profils modifiés. */
export async function refreshBadges(db, userIds) {
  const ids = userIds?.filter(Boolean);
  if (ids && !ids.length) return 0;
  const { rows } = await db.query(ids ? `${METRICS_SQL} AND u.id = ANY($1::uuid[])` : METRICS_SQL, ids ? [ids] : []);
  let changed = 0;
  for (const metrics of rows) {
    const result = await db.query(
      'UPDATE users SET badges = $1::jsonb WHERE id = $2 AND badges IS DISTINCT FROM $1::jsonb',
      [JSON.stringify(badgesFor(metrics)), metrics.id]
    );
    changed += result.rowCount;
  }
  return changed;
}
