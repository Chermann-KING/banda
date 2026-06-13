import { test } from 'node:test';
import assert from 'node:assert/strict';
import preset from '../preset.js';

test('le preset expose les couleurs sémantiques banda-* en var()', () => {
  const { colors } = preset.theme.extend;
  assert.equal(colors['banda-primary'], 'var(--banda-color-primary)');
  assert.equal(colors['banda-text-placeholder'], 'var(--banda-color-text-placeholder)');
  assert.equal(colors['banda-border-muted'], 'var(--banda-color-border-muted)');
  assert.ok(!('banda-ochre-500' in colors), 'aucune primitive exposée');
});

test('échelles issues des tokens', () => {
  const { borderRadius, boxShadow, spacing, zIndex } = preset.theme.extend;
  assert.equal(borderRadius.md, '0.5rem');
  assert.match(boxShadow.lg, /24px/);
  assert.equal(spacing['4'], '1rem');
  assert.equal(zIndex.dropdown, '1000');
});
