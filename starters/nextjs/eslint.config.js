import js from '@eslint/js';
import boundaries from 'eslint-plugin-boundaries';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * Architecture des couches (règle de dépendance — du plus haut vers le plus bas) :
 *
 *  app → pages → features → ui → shared → core ← infrastructure
 *
 * - core     : logique métier pure (zéro import des autres couches)
 * - shared   : utilitaires partagés (importe uniquement core)
 * - infrastructure : adaptateurs (importe uniquement core)
 * - ui       : composants Banda + hooks (importe core + shared)
 * - features : modules métier (importe ui + shared + core)
 * - pages    : écrans (importe ui + shared + core + features)
 * - app      : composition root — Next.js routing + providers (importe tout)
 */
const ARCH_ELEMENTS = [
  { type: 'core',           pattern: 'src/core/**/*' },
  { type: 'infrastructure', pattern: 'src/infrastructure/**/*' },
  { type: 'shared',         pattern: 'src/shared/**/*' },
  { type: 'ui',             pattern: 'src/ui/**/*' },
  { type: 'features',       pattern: 'src/features/**/*' },
  { type: 'pages',          pattern: 'src/views/**/*' },
  { type: 'app',            pattern: 'app/**/*' },
];

export default tseslint.config(
  { ignores: ['dist', '.next', 'next-env.d.ts', '.banda/**'] },

  /* ── Règles générales TypeScript + React ─────────────────────────── */
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },

  /* ── Boundaries architecturaux ───────────────────────────────────── */
  {
    files: ['src/**/*.{ts,tsx}', 'app/**/*.{ts,tsx}'],
    plugins: { boundaries },
    settings: {
      'boundaries/elements': ARCH_ELEMENTS,
      'boundaries/ignore': ['**/*.test.*', '**/*.spec.*', 'next-env.d.ts'],
    },
    rules: {
      'boundaries/element-types': ['error', {
        default: 'disallow',
        rules: [
          { from: 'app',            allow: ['pages', 'ui', 'shared', 'infrastructure', 'core'] },
          { from: 'pages',          allow: ['ui', 'shared', 'core', 'features'] },
          { from: 'features',       allow: ['ui', 'shared', 'core'] },
          { from: 'ui',             allow: ['core', 'shared'] },
          { from: 'shared',         allow: ['core'] },
          { from: 'infrastructure', allow: ['core'] },
          { from: 'core',           allow: [] },
        ],
      }],
    },
  },

  /* ── no-restricted-imports : enforcement via alias @/ ───────────────
     Mêmes garanties que les boundaries pour les imports @/ (alias Next.js). */
  {
    files: ['src/core/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          { group: ['@/ui/*', '../ui/*'], message: 'core ne peut pas importer depuis ui/' },
          { group: ['@/views/*', '../views/*'], message: 'core ne peut pas importer depuis views/' },
          { group: ['@/app/*', '../app/*'], message: 'core ne peut pas importer depuis app/' },
          { group: ['@/infrastructure/*', '../infrastructure/*'], message: 'core ne peut pas importer depuis infrastructure/' },
          { group: ['@/features/*', '../features/*'], message: 'core ne peut pas importer depuis features/' },
          { group: ['@/shared/*', '../shared/*'], message: 'core ne peut pas importer depuis shared/' },
        ],
      }],
    },
  },
  {
    files: ['src/shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          { group: ['@/ui/*', '../ui/*'], message: 'shared ne peut pas importer depuis ui/' },
          { group: ['@/views/*', '../views/*'], message: 'shared ne peut pas importer depuis views/' },
          { group: ['@/app/*', '../app/*'], message: 'shared ne peut pas importer depuis app/' },
          { group: ['@/infrastructure/*', '../infrastructure/*'], message: 'shared ne peut pas importer depuis infrastructure/' },
          { group: ['@/features/*', '../features/*'], message: 'shared ne peut pas importer depuis features/' },
        ],
      }],
    },
  },
  {
    files: ['src/infrastructure/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          { group: ['@/ui/*', '../ui/*'], message: 'infrastructure ne peut pas importer depuis ui/' },
          { group: ['@/views/*', '../views/*'], message: 'infrastructure ne peut pas importer depuis views/' },
          { group: ['@/app/*', '../app/*'], message: 'infrastructure ne peut pas importer depuis app/' },
          { group: ['@/features/*', '../features/*'], message: 'infrastructure ne peut pas importer depuis features/' },
          { group: ['@/shared/*', '../shared/*'], message: 'infrastructure ne peut pas importer depuis shared/' },
        ],
      }],
    },
  },
  {
    files: ['src/ui/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          { group: ['@/views/*', '../views/*'], message: 'ui ne peut pas importer depuis views/' },
          { group: ['@/app/*', '../app/*'], message: 'ui ne peut pas importer depuis app/' },
          { group: ['@/infrastructure/*', '../infrastructure/*'], message: 'ui ne peut pas importer depuis infrastructure/' },
          { group: ['@/features/*', '../features/*'], message: 'ui ne peut pas importer depuis features/' },
        ],
      }],
    },
  },
  {
    files: ['src/features/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          { group: ['@/views/*', '../views/*'], message: 'features ne peut pas importer depuis views/' },
          { group: ['@/app/*', '../app/*'], message: 'features ne peut pas importer depuis app/' },
          { group: ['@/infrastructure/*', '../infrastructure/*'], message: 'features ne peut pas importer depuis infrastructure/' },
        ],
      }],
    },
  },
);
