import test from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const migrationsDirectory = join(dirname(fileURLToPath(import.meta.url)), '../../../../db/migrations');

test('all migrations expose reversible up and down functions', async () => {
  for (const file of ['001_initial.js', '002_collaboration.js', '003_platform.js', '004_mentorship.js', '005_extensibility.js']) {
    const migration = await import(`${migrationsDirectory}/${file}`);
    assert.equal(typeof migration.up, 'function');
    assert.equal(typeof migration.down, 'function');
    await access(join(migrationsDirectory, file));
  }
});
