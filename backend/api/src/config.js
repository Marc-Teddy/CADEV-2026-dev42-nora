import process from 'node:process';

const required = (name) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

export function loadConfig() {
  const accessSecret = required('JWT_ACCESS_SECRET');
  const refreshSecret = required('JWT_REFRESH_SECRET');
  if (accessSecret.length < 32 || refreshSecret.length < 32 || accessSecret === refreshSecret) {
    throw new Error('JWT secrets must be distinct and at least 32 characters long');
  }
  return {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    host: process.env.HOST ?? '0.0.0.0',
    port: Number(process.env.PORT ?? 8080),
    corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
    databaseUrl: required('DATABASE_URL'),
    poolMax: Number(process.env.DATABASE_POOL_MAX ?? 10),
    accessSecret,
    refreshSecret,
    accessTtl: process.env.JWT_ACCESS_TTL ?? '15m',
    refreshTtl: process.env.JWT_REFRESH_TTL ?? '7d',
    cookieSecure: process.env.COOKIE_SECURE === 'true',
    rateLimitMax: Number(process.env.RATE_LIMIT_MAX ?? 100),
    rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60000),
    logLevel: process.env.LOG_LEVEL ?? 'info',
    githubClientId: process.env.OAUTH_GITHUB_CLIENT_ID,
    githubClientSecret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
    githubCallbackUrl: process.env.OAUTH_GITHUB_CALLBACK_URL,
    smtpHost: process.env.SMTP_HOST,
    smtpPort: Number(process.env.SMTP_PORT ?? 587),
    smtpSecure: process.env.SMTP_SECURE === 'true',
    smtpUser: process.env.SMTP_USER,
    smtpPassword: process.env.SMTP_PASSWORD,
    smtpFrom: process.env.SMTP_FROM,
    emailVerificationUrl: process.env.EMAIL_VERIFICATION_URL ?? 'http://localhost:5173/verify-email',
    emailVerificationTtl: process.env.EMAIL_VERIFICATION_TTL ?? '24 hours'
  };
}
