import js from '@eslint/js';
import boundaries from 'eslint-plugin-boundaries';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
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
 * - app      : composition root (importe tout)
 */
const ARCH_ELEMENTS = [
  { type: 'core',           pattern: 'src/core/**/*' },
  { type: 'infrastructure', pattern: 'src/infrastructure/**/*' },
  { type: 'shared',         pattern: 'src/shared/**/*' },
  { type: 'ui',             pattern: 'src/ui/**/*' },
  { type: 'features',       pattern: 'src/features/**/*' },
  { type: 'pages',          pattern: 'src/pages/**/*' },
  { type: 'app',            pattern: 'src/app/**/*' },
];

export default tseslint.config(
  { ignores: ['dist', 'src/vite-env.d.ts', '.banda/**'] },

  /* ── Règles générales TypeScript + React ─────────────────────────── */
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  /* ── Boundaries architecturaux ───────────────────────────────────── */
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { boundaries },
    settings: {
      'boundaries/elements': ARCH_ELEMENTS,
      'boundaries/ignore': ['**/*.test.*', '**/*.spec.*', 'src/vite-env.d.ts'],
    },
    rules: {
      'boundaries/element-types': ['error', {
        default: 'disallow',
        rules: [
          // app peut importer de toutes les couches
          { from: 'app',            allow: ['pages', 'ui', 'shared', 'infrastructure', 'core'] },
          // pages : ui + shared + core + features (pas infrastructure ni app)
          { from: 'pages',          allow: ['ui', 'shared', 'core', 'features'] },
          // features : ui + shared + core (jamais une autre feature directement)
          { from: 'features',       allow: ['ui', 'shared', 'core'] },
          // ui : core + shared uniquement (jamais features, pages, infrastructure)
          { from: 'ui',             allow: ['core', 'shared'] },
          // shared : core uniquement
          { from: 'shared',         allow: ['core'] },
          // infrastructure : core uniquement
          { from: 'infrastructure', allow: ['core'] },
          // core : aucun import interne Banda
          { from: 'core',           allow: [] },
        ],
      }],
    },
  },

  /* ── no-restricted-imports : enforcement via alias @/ ───────────────
     eslint-plugin-boundaries résout les chemins relatifs ; ces règles
     couvrent les imports @/ (alias Vite) pour les mêmes garanties.   */
  {
    files: ['src/core/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          { group: ['@/ui/*', '../ui/*'], message: 'core ne peut pas importer depuis ui/' },
          { group: ['@/pages/*', '../pages/*'], message: 'core ne peut pas importer depuis pages/' },
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
          { group: ['@/pages/*', '../pages/*'], message: 'shared ne peut pas importer depuis pages/' },
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
          { group: ['@/pages/*', '../pages/*'], message: 'infrastructure ne peut pas importer depuis pages/' },
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
          { group: ['@/pages/*', '../pages/*'], message: 'ui ne peut pas importer depuis pages/' },
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
          { group: ['@/pages/*', '../pages/*'], message: 'features ne peut pas importer depuis pages/' },
          { group: ['@/app/*', '../app/*'], message: 'features ne peut pas importer depuis app/' },
          { group: ['@/infrastructure/*', '../infrastructure/*'], message: 'features ne peut pas importer depuis infrastructure/' },
        ],
      }],
    },
  },
);
