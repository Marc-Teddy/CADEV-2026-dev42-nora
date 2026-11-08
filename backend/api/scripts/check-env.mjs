import process from 'node:process';

const production = process.env.NODE_ENV === 'production';
const required = ['DATABASE_URL', 'JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'];
const missing = required.filter((name) => !process.env[name]);
const weak = ['JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'].filter((name) => {
  const value = process.env[name] ?? '';
  return value.length < 32 || value.includes('change-me') || value.includes('replace-with');
});

if (missing.length || weak.length) {
  console.error(JSON.stringify({ error: 'INVALID_ENVIRONMENT', missing, weak }));
  process.exitCode = 1;
} else if (production && process.env.COOKIE_SECURE !== 'true') {
  console.error('COOKIE_SECURE must be true in production');
  process.exitCode = 1;
} else {
  console.log('Environment configuration looks valid');
}
