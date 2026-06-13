import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluatePasswordStrength } from '../src/password.ts';

test('mot de passe vide → score 0', () => {
  assert.equal(evaluatePasswordStrength('').score, 0);
});

test('mot de passe faible → score plancher 1', () => {
  const weak = evaluatePasswordStrength('abc');
  assert.equal(weak.score, 1);
  assert.equal(weak.criteria.minLength, false);
});

test('tous les critères → score 4', () => {
  const strong = evaluatePasswordStrength('Mbolo-Banda2026!');
  assert.equal(strong.score, 4);
  assert.deepEqual(strong.criteria, {
    minLength: true,
    lowercase: true,
    uppercase: true,
    digit: true,
    symbol: true,
  });
});

test('progression du score avec les critères', () => {
  assert.equal(evaluatePasswordStrength('azertyuiop').score, 1); // longueur + minuscules
  assert.equal(evaluatePasswordStrength('Azertyuiop').score, 2);
  assert.equal(evaluatePasswordStrength('Azertyuiop1').score, 3);
});
