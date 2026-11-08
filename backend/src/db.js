import pg from 'pg';

export function createDb(config) {
  const pool = new pg.Pool({
    connectionString: config.databaseUrl,
    max: config.poolMax,
    ssl: config.nodeEnv === 'production' ? { rejectUnauthorized: true } : false
  });
  return {
    query: (text, values) => pool.query(text, values),
    transaction: async () => {
      const client = await pool.connect();
      await client.query('BEGIN');
      return {
        query: (text, values) => client.query(text, values),
        commit: async () => { await client.query('COMMIT'); client.release(); },
        rollback: async () => { await client.query('ROLLBACK'); client.release(); }
      };
    },
    end: () => pool.end()
  };
}
