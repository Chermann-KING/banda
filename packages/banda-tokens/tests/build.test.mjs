import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

test('le build produit des sorties valides', async () => {
  execFileSync(process.execPath, [join(root, 'scripts', 'build.mjs')]);

  const css = await readFile(join(root, 'dist', 'banda.css'), 'utf8');
  assert.match(css, /--banda-color-ochre-500: #C28A2C;/, 'primitives présentes');
  assert.match(css, /--banda-color-primary: var\(--banda-color-ochre-600\);/, 'alias light résolus en var()');
  assert.match(css, /\[data-theme='dark'\]/, 'bloc dark présent');
  assert.match(css, /prefers-color-scheme: dark/, 'fallback préférence système présent');

  const resolved = JSON.parse(await readFile(join(root, 'dist', 'tokens.resolved.json'), 'utf8'));
  assert.equal(resolved.semantic.light.color.primary, '#A66F1F', 'alias résolus en valeurs brutes');
  assert.ok(
    !JSON.stringify(resolved).includes('{primitive.'),
    'aucun alias non résolu ne subsiste',
  );

  // pathToFileURL : import() exige une URL file:// pour les chemins absolus Windows.
  const { tokens, cssVar } = await import(pathToFileURL(join(root, 'dist', 'index.js')).href);
  assert.equal(cssVar('color-primary'), 'var(--banda-color-primary)');
  assert.equal(tokens.semantic.dark.color.background, '#171411');
});
