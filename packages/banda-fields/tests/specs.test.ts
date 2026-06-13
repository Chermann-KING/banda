import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fieldSpecs, makePhoneSpec } from '../src/specs/specs.ts';

const fails = (
  spec: { schema: { safeParse: (v: string) => { success: boolean } } },
  value: string,
) => !spec.schema.safeParse(value).success;

test('firstName : pipeline sanitize → format → finalize → schema', () => {
  const spec = fieldSpecs.firstName;
  // sanitizeName retire les caractères interdits (<, >, !, chiffres) mais
  // conserve les lettres : '<b>' laisserait un 'b'. Entrée 100 % non-lettres.
  const typed = spec.format!(spec.sanitize!('hermann<>!!2'));
  assert.equal(typed, 'Hermann');
  assert.equal(spec.finalize!('  Jean   Paul '), 'Jean Paul');
  assert.ok(spec.schema.safeParse('Hermann').success);
  assert.ok(fails(spec, 'J'));
});

test('lastName : majuscules forcées', () => {
  assert.equal(fieldSpecs.lastName.format!('moussavou'), 'MOUSSAVOU');
});

test('email : minuscules + validation', () => {
  const spec = fieldSpecs.email;
  assert.equal(spec.format!(spec.sanitize!('  Vous@Exemple.COM ')), 'vous@exemple.com');
  assert.ok(spec.schema.safeParse('vous@exemple.com').success);
  assert.ok(fails(spec, 'pas-un-email'));
});

test('password : exige longueur, casse et chiffre', () => {
  const spec = fieldSpecs.password;
  assert.ok(spec.schema.safeParse('Mbolo2026ok').success);
  assert.ok(fails(spec, 'court1A'));
  assert.ok(fails(spec, 'toutenminuscules1'));
});

test('birthDate : refuse le futur', () => {
  const future = new Date(Date.now() + 86_400_000 * 2).toISOString().slice(0, 10);
  assert.ok(fails(fieldSpecs.birthDate, future));
  assert.ok(fieldSpecs.birthDate.schema.safeParse('1990-06-15').success);
});

test('amount : format milliers validé', () => {
  const spec = fieldSpecs.amount;
  const typed = spec.format!(spec.sanitize!('25000,50'));
  assert.equal(typed, '25 000,50');
  assert.ok(spec.schema.safeParse(typed).success);
  assert.ok(fails(spec, ','));
});

test('url : https ajouté au blur puis validé', () => {
  const spec = fieldSpecs.url;
  const final = spec.finalize!('exemple.com');
  assert.equal(final, 'https://exemple.com');
  assert.ok(spec.schema.safeParse(final).success);
});

test('otp : exactement 6 chiffres', () => {
  assert.equal(fieldSpecs.otp.sanitize!('12a34567'), '123456');
  assert.ok(fieldSpecs.otp.schema.safeParse('123456').success);
  assert.ok(fails(fieldSpecs.otp, '12345'));
});

test('makePhoneSpec : validation dépendante du pays', () => {
  const gabonSpec = makePhoneSpec('GA');
  assert.ok(gabonSpec.schema.safeParse('07 12 34 56').success);
  assert.ok(fails(gabonSpec, '07 12 34'));
  assert.equal(gabonSpec.placeholder, 'XX XX XX XX');
});
