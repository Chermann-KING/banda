/**
 * Build des tokens Banda — volontairement sans dépendance externe :
 * la chaîne de build du design system ne doit jamais être bloquée par
 * l'écosystème d'un framework.
 *
 * Entrée  : src/tokens.json
 * Sorties : dist/banda.css            (custom properties, light + dark)
 *           dist/base.css             (reset minimal optionnel)
 *           dist/index.js + index.d.ts (exports JS typés)
 *           dist/tokens.resolved.json (alias résolus, pour outillage)
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(root, 'dist');

const tokens = JSON.parse(await readFile(join(root, 'src', 'tokens.json'), 'utf8'));
const PREFIX = tokens.$meta.prefix;

const isAlias = (value) => typeof value === 'string' && /^\{[^}]+\}$/.test(value);
const aliasPath = (value) => value.slice(1, -1).split('.');

function getAtPath(object, path) {
  const value = path.reduce((node, key) => node?.[key], object);
  if (value === undefined) {
    throw new Error(`Alias introuvable : {${path.join('.')}}`);
  }
  return value;
}

/** Aplatie un arbre de tokens en paires [cheminEnKebab, valeur]. */
function flatten(node, path = []) {
  if (typeof node !== 'object' || node === null) {
    return [[path.join('-'), node]];
  }
  return Object.entries(node).flatMap(([key, child]) => flatten(child, [...path, key]));
}

/** {primitive.color.ochre.600} → var(--banda-color-ochre-600) */
function toCssValue(value) {
  if (!isAlias(value)) return value;
  const [, ...rest] = aliasPath(value); // retire le segment "primitive"
  return `var(--${PREFIX}-${rest.join('-')})`;
}

/** Résout récursivement les alias vers leurs valeurs brutes. */
function resolve(node) {
  if (typeof node === 'string') {
    return isAlias(node) ? resolve(getAtPath(tokens, aliasPath(node))) : node;
  }
  if (typeof node !== 'object' || node === null) return node;
  return Object.fromEntries(Object.entries(node).map(([key, child]) => [key, resolve(child)]));
}

function cssBlock(selector, declarations) {
  const lines = declarations.map(([name, value]) => `  --${PREFIX}-${name}: ${value};`);
  return `${selector} {\n${lines.join('\n')}\n}`;
}

const primitiveVars = flatten(tokens.primitive);
const lightVars = flatten(tokens.semantic.light).map(([name, value]) => [name, toCssValue(value)]);
const darkVars = flatten(tokens.semantic.dark).map(([name, value]) => [name, toCssValue(value)]);

const banner = `/* ${tokens.$meta.name} v${tokens.$meta.version} — généré, ne pas éditer. */`;

const css = [
  banner,
  cssBlock(':root', [...primitiveVars, ...lightVars]),
  cssBlock(`[data-theme='dark']`, darkVars),
  `@media (prefers-color-scheme: dark) {\n${cssBlock(
    `  :root:not([data-theme='light'])`,
    darkVars,
  )
    .split('\n')
    .map((line) => (line.startsWith('  :root') ? line : `  ${line}`))
    .join('\n')}\n}`,
].join('\n\n');

const baseCss = `${banner}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--${PREFIX}-font-family-sans);
  font-size: var(--${PREFIX}-font-size-md);
  line-height: var(--${PREFIX}-font-line-height-normal);
  background-color: var(--${PREFIX}-color-background);
  color: var(--${PREFIX}-color-text);
  -webkit-font-smoothing: antialiased;
}
`;

const resolved = {
  primitive: resolve(tokens.primitive),
  semantic: resolve(tokens.semantic),
};

const js = `${banner}
export const prefix = '${PREFIX}';
export const tokens = ${JSON.stringify(resolved, null, 2)};
export const themes = ['light', 'dark'];

/** Nom de variable CSS d'un token : cssVar('color-primary') → 'var(--banda-color-primary)' */
export const cssVar = (name) => \`var(--\${prefix}-\${name})\`;
`;

const dts = `export declare const prefix: string;
export declare const themes: readonly ['light', 'dark'];
export declare const tokens: {
  primitive: {
    color: Record<string, Record<string, string>>;
    font: {
      family: Record<string, string>;
      size: Record<string, string>;
      weight: Record<string, string>;
      'line-height': Record<string, string>;
      'letter-spacing': Record<string, string>;
    };
    space: Record<string, string>;
    radius: Record<string, string>;
    shadow: Record<string, string>;
    z: Record<string, string>;
    motion: { duration: Record<string, string>; easing: Record<string, string> };
  };
  semantic: {
    light: { color: Record<string, string> };
    dark: { color: Record<string, string> };
  };
};
export declare const cssVar: (name: string) => string;
`;

await mkdir(distDir, { recursive: true });
await Promise.all([
  writeFile(join(distDir, 'banda.css'), `${css}\n`),
  writeFile(join(distDir, 'base.css'), baseCss),
  writeFile(join(distDir, 'index.js'), js),
  writeFile(join(distDir, 'index.d.ts'), dts),
  writeFile(join(distDir, 'tokens.resolved.json'), `${JSON.stringify(resolved, null, 2)}\n`),
]);

console.log(`@banda/tokens : ${primitiveVars.length} primitives, ${lightVars.length} alias sémantiques × 2 thèmes → dist/`);
