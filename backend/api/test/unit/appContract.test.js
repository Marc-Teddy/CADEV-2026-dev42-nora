import test from 'node:test';
import assert from 'node:assert/strict';
import { relTime, endsIn, extractCode, serDev, serProject, serPost } from '../../src/appContract.js';
import { safeEqual } from '../../src/csrf.js';
import { loadConfig } from '../../src/config.js';

const withEnv = (vars, fn) => {
  const previous = { ...process.env };
  Object.assign(process.env, { DATABASE_URL: 'postgres://localhost/nora', JWT_ACCESS_SECRET: 'a'.repeat(32), JWT_REFRESH_SECRET: 'b'.repeat(32) }, vars);
  try { return fn(); } finally { process.env = previous; }
};

test('safeEqual never matches two missing CSRF values', () => {
  assert.equal(safeEqual(undefined, undefined), false);
  assert.equal(safeEqual('', ''), false);
  assert.equal(safeEqual('abc', 'abd'), false);
  assert.equal(safeEqual('abc', 'abc'), true);
});

test('loadConfig accepts a comma-separated list of origins', () => withEnv({ CORS_ORIGIN: 'http://localhost:3000, http://127.0.0.1:3000' }, () => {
  const config = loadConfig();
  assert.deepEqual(config.corsOrigins, ['http://localhost:3000', 'http://127.0.0.1:3000']);
  assert.equal(config.corsOrigin, 'http://localhost:3000');
}));

test('email auto-verification is never enabled in production', () => {
  withEnv({ NODE_ENV: 'production', EMAIL_AUTO_VERIFY: 'true', SMTP_HOST: '' }, () => assert.equal(loadConfig().autoVerifyEmail, false));
  withEnv({ NODE_ENV: 'development', SMTP_HOST: '', EMAIL_AUTO_VERIFY: '' }, () => assert.equal(loadConfig().autoVerifyEmail, true));
  withEnv({ NODE_ENV: 'development', SMTP_HOST: 'smtp.example', SMTP_FROM: 'a@b.c', EMAIL_AUTO_VERIFY: '' }, () => assert.equal(loadConfig().autoVerifyEmail, false));
});

test('relTime and endsIn use the frontend wording', () => {
  assert.equal(relTime(new Date()), "à l'instant");
  assert.equal(relTime(new Date(Date.now() - 5 * 60000)), 'il y a 5 min');
  assert.equal(relTime(new Date(Date.now() - 3 * 3600000)), 'il y a 3 h');
  assert.equal(endsIn(new Date(Date.now() + (2 * 24 + 14) * 3600000 + 60000)), '2 j 14 h');
  assert.equal(endsIn(new Date(Date.now() - 1000)), 'Terminé');
  assert.equal(endsIn(null), '');
});

test('extractCode splits text and the first markdown code block', () => {
  assert.deepEqual(extractCode('Salut'), { content: 'Salut' });
  assert.deepEqual(extractCode('Voici :\n```go\nfmt.Println(1)\n```'), { content: 'Voici :', code: { lang: 'go', snippet: 'fmt.Println(1)' } });
  assert.equal(extractCode('Avant\n\n```js\nx()\n```\n\nAprès').content, 'Avant\n\nAprès');
});

test('serializers produce the shapes declared in frontend/src/lib/types.ts', () => {
  const user = {
    id: 'u1', username: 'theoah', email: 't@n.a', display_name: 'Théo', headline: 'Fullstack', city: 'Cotonou', country: 'Bénin',
    flag: '🇧🇯', bio: '', skills: [{ name: 'Go', level: 60 }], reputation: 10, badges: [], projects_count: 2, followers_count: 3,
    online: true, availability: 'ouverte', gradient: ['#000', '#fff'], articles: 1, challenges_won: 0, langs: ['Fon'],
    joined_label: 'janv. 2026', avatar_url: null, role: 'member', created_at: new Date()
  };
  const dev = serDev(user, { following: true });
  assert.equal(dev.id, 'theoah');
  assert.equal(dev.role, 'Fullstack');
  assert.equal(dev.following, true);
  assert.equal(dev.email, undefined);
  assert.equal(serDev(user, { includePrivate: true }).email, 't@n.a');

  const project = serProject({
    id: 'p1', title: 'MobiPay', tagline: 't', description: 'd', domain: 'Fintech', technologies: ['Go'], status: 'dev',
    stars_base: 10, star_count: 2, forks: 1, owner_username: 'theoah', team: ['theoah'], open_roles: [], progress: 50,
    gradient: ['#000', '#fff'], icon: '💳', cover: null, updated_at: new Date(), created_at: new Date(), repo: 'nora/mobipay', starred_by_me: true
  });
  assert.equal(project.name, 'MobiPay');
  assert.equal(project.stars, 12);
  assert.equal(project.starredByMe, true);

  const post = serPost({
    id: 'n1', author_username: 'theoah', created_at: new Date(), type: 'code', content: 'c', tags: [], likes_base: 5, like_count: 1,
    comments_count: 0, shares: 0, liked_by_me: false, code_lang: 'ts', code_title: 'a.ts', code_snippet: 'x', project_id: null
  });
  assert.equal(post.likes, 6);
  assert.deepEqual(post.code, { lang: 'ts', title: 'a.ts', snippet: 'x' });
  assert.equal(post.projectId, undefined);
});
