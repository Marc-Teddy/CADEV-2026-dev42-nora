import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.js', 'test/**/*.js', 'scripts/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        URLSearchParams: 'readonly', fetch: 'readonly', process: 'readonly', Buffer: 'readonly',
        console: 'readonly', performance: 'readonly', setTimeout: 'readonly', clearTimeout: 'readonly'
      }
    },
    rules: { 'no-unused-vars': ['error', { argsIgnorePattern: '^_' }] }
  }
];
