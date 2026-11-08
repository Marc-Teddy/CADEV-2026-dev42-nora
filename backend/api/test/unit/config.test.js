import test from 'node:test';
import assert from 'node:assert/strict';
import { loadConfig } from '../../src/config.js';

test('loadConfig rejects short or equal JWT secrets', () => {
  const previous = { ...process.env };
  process.env.DATABASE_URL = 'postgres://localhost/nora';
  process.env.JWT_ACCESS_SECRET = 'short';
  process.env.JWT_REFRESH_SECRET = 'short';
  assert.throws(() => loadConfig(), /JWT secrets must be distinct/);
  process.env = previous;
});

test('loadConfig accepts distinct strong secrets', () => {
  const previous = { ...process.env };
  process.env.DATABASE_URL = 'postgres://localhost/nora';
  process.env.JWT_ACCESS_SECRET = 'a'.repeat(32);
  process.env.JWT_REFRESH_SECRET = 'b'.repeat(32);
  assert.equal(loadConfig().poolMax, 10);
  process.env = previous;
});
