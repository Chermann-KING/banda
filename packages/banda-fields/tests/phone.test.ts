import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  formatPhoneDigits,
  getPhoneCountry,
  isPhoneComplete,
  phonePlaceholder,
  phoneTotalDigits,
  sanitizePhone,
  toE164,
} from '../src/phone/phone.ts';

const gabon = getPhoneCountry('GA');

test('le Gabon est le pays par défaut', () => {
  assert.equal(getPhoneCountry('ZZ').iso, 'GA');
  assert.equal(gabon.dialCode, '+241');
  assert.equal(phoneTotalDigits(gabon), 8);
  assert.equal(phonePlaceholder(gabon), 'XX XX XX XX');
});

test('masque appliqué au fil de la frappe', () => {
  assert.equal(formatPhoneDigits('0', gabon), '0');
  assert.equal(formatPhoneDigits('071', gabon), '07 1');
  assert.equal(formatPhoneDigits('07123456', gabon), '07 12 34 56');
});

test('saisie bloquée au-delà de la capacité du pays', () => {
  assert.equal(sanitizePhone('07 12 34 56 99 99', gabon), '07123456');
  assert.equal(sanitizePhone('abc07-12', gabon), '0712');
});

test('complétude et E.164', () => {
  assert.equal(isPhoneComplete('07 12 34 56', gabon), true);
  assert.equal(isPhoneComplete('07 12 34', gabon), false);
  assert.equal(toE164('07 12 34 56', gabon), '+24107123456');
});

test('les masques des autres pays diffèrent', () => {
  const cameroun = getPhoneCountry('CM');
  assert.equal(phoneTotalDigits(cameroun), 9);
  assert.equal(formatPhoneDigits('671234567', cameroun), '671 23 45 67');
});
