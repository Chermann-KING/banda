import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  collapseWhitespace,
  ensureHttps,
  formatThousands,
  formatTitleCase,
  parseAmount,
  sanitizeAmount,
  sanitizeAlphanumeric,
  sanitizeName,
  stripDangerous,
} from '../src/sanitize.ts';

test('stripDangerous neutralise chevrons et caractères de contrôle', () => {
  assert.equal(stripDangerous('<script>alert(1)</script>'), 'scriptalert(1)/script');
  assert.equal(stripDangerous('abc\u0000\u001Fdef'), 'abcdef');
});

test('sanitizeName ne garde que lettres, espaces, tirets, apostrophes', () => {
  assert.equal(sanitizeName("Jean-Christophe D'Almeida 3<b>"), "Jean-Christophe D'Almeida b");
  assert.equal(sanitizeName('Ondo; DROP TABLE--'), 'Ondo DROP TABLE--');
  assert.equal(sanitizeName('Ékang Mvé'), 'Ékang Mvé');
});

test('formatTitleCase capitalise après espace, tiret et apostrophe', () => {
  assert.equal(formatTitleCase('jean-christophe'), 'Jean-Christophe');
  assert.equal(formatTitleCase("n'guema ondo"), "N'Guema Ondo");
  assert.equal(formatTitleCase('PORT-GENTIL'), 'Port-Gentil');
});

test('sanitizeAlphanumeric accepte les chiffres', () => {
  assert.equal(sanitizeAlphanumeric('Akanda 2 <img>'), 'Akanda 2 img');
});

test('collapseWhitespace : trim + espaces multiples', () => {
  assert.equal(collapseWhitespace('  Jean   Paul  '), 'Jean Paul');
});

test('montants : sanitisation, formatage milliers, parsing', () => {
  assert.equal(sanitizeAmount('25a000,5x0'), '25000,50');
  assert.equal(sanitizeAmount('1.234.567'), '1,234567');
  assert.equal(formatThousands('1234567,89'), '1 234 567,89');
  assert.equal(formatThousands('500'), '500');
  assert.equal(parseAmount('1 234 567,89'), 1234567.89);
  assert.ok(Number.isNaN(parseAmount('')));
});

test('ensureHttps préfixe seulement si nécessaire', () => {
  assert.equal(ensureHttps('exemple.com'), 'https://exemple.com');
  assert.equal(ensureHttps('http://exemple.com'), 'http://exemple.com');
  assert.equal(ensureHttps(''), '');
});
