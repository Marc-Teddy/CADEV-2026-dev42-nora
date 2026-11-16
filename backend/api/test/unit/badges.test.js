import test from 'node:test';
import assert from 'node:assert/strict';
import { badgesFor, BADGE_RULES, THRESHOLDS } from '../../src/badges.js';

const none = { langs: 0, challenges: 0, mentor_active: false, mentorships_completed: 0, production_projects: 0, solo_production_projects: 0, stars: 0, teams: 0, new_followers: 0 };
const kinds = (metrics) => badgesFor({ ...none, ...metrics }).map((b) => b.kind);

test('a brand-new account earns no badge', () => {
  assert.deepEqual(kinds({}), []);
});

test('each rule triggers exactly at its threshold', () => {
  assert.deepEqual(kinds({ challenges: THRESHOLDS.challenges - 1 }), []);
  assert.deepEqual(kinds({ challenges: THRESHOLDS.challenges }), ['challenger']);
  assert.deepEqual(kinds({ langs: THRESHOLDS.langs }), ['polyglote']);
  assert.deepEqual(kinds({ stars: THRESHOLDS.stars }), ['opensource']);
  assert.deepEqual(kinds({ teams: THRESHOLDS.teams }), ['architect']);
  assert.deepEqual(kinds({ new_followers: THRESHOLDS.newFollowers }), ['star']);
});

test('mentor badge needs an active profile AND a completed mentorship', () => {
  assert.deepEqual(kinds({ mentor_active: true }), []);
  assert.deepEqual(kinds({ mentorships_completed: 1 }), []);
  assert.deepEqual(kinds({ mentor_active: true, mentorships_completed: 1 }), ['mentor']);
});

test('a solo production project gives founder and solo shipper', () => {
  assert.deepEqual(kinds({ production_projects: 1, solo_production_projects: 1 }), ['founder', 'solo']);
  assert.deepEqual(kinds({ production_projects: 1 }), ['founder']);
});

test('every badge kind known by the frontend has a rule', () => {
  const frontendKinds = ['mentor', 'solo', 'architect', 'challenger', 'founder', 'polyglote', 'opensource', 'star'];
  assert.deepEqual(BADGE_RULES.map((b) => b.kind).sort(), frontendKinds.sort());
});
