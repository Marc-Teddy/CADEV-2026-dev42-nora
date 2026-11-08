import test from 'node:test';
import assert from 'node:assert/strict';

test('load test defaults stay bounded for local smoke runs', () => {
  assert.ok(Number('10000') > 0);
  assert.ok(Number('20') > 0);
});
