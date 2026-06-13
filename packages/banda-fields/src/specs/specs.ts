import { z } from 'zod';
import { defineFieldSpec } from './field-spec.ts';
import {
  collapseWhitespace,
  ensureHttps,
  formatLowercase,
  formatThousands,
  formatTitleCase,
  formatUppercase,
  parseAmount,
  sanitizeAlphanumeric,
  sanitizeAmount,
  sanitizeDigits,
  sanitizeEmail,
  sanitizeName,
  stripDangerous,
} from '../sanitize.ts';
import { PASSWORD_MIN_LENGTH } from '../password.ts';
import {
  formatPhoneDigits,
  getPhoneCountry,
  isPhoneComplete,
  phonePlaceholder,
  sanitizePhone,
} from '../phone/phone.ts';

const NAME_PATTERN = /^[\p{L}][\p{L}\s'’-]*$/u;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const isValidIsoDate = (value: string) => !Number.isNaN(new Date(`${value}T00:00:00`).getTime());

export const firstNameSpec = defineFieldSpec({
  id: 'first-name',
  type: 'text',
  autoComplete: 'given-name',
  placeholder: 'Ex : Hermann',
  hint: 'Lettres, espaces, tirets et apostrophes uniquement',
  maxLength: 50,
  counter: true,
  sanitize: sanitizeName,
  format: formatTitleCase,
  finalize: collapseWhitespace,
  schema: z
    .string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères.')
    .max(50, 'Le prénom ne peut pas dépasser 50 caractères.')
    .regex(NAME_PATTERN, 'Caractères non autorisés dans un prénom.'),
});

export const lastNameSpec = defineFieldSpec({
  id: 'last-name',
  type: 'text',
  autoComplete: 'family-name',
  placeholder: 'Ex : MOUSSAVOU',
  hint: 'Lettres, espaces, tirets et apostrophes uniquement',
  maxLength: 50,
  counter: true,
  sanitize: sanitizeName,
  format: formatUppercase,
  finalize: collapseWhitespace,
  schema: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères.')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères.')
    .regex(NAME_PATTERN, 'Caractères non autorisés dans un nom.'),
});

export const emailSpec = defineFieldSpec({
  id: 'email',
  type: 'email',
  inputMode: 'email',
  autoComplete: 'email',
  placeholder: 'Ex : vous@exemple.com',
  maxLength: 254,
  sanitize: sanitizeEmail,
  format: formatLowercase,
  schema: z
    .string()
    .min(1, "L'email est requis.")
    .max(254, "L'email est trop long.")
    .email('Adresse email invalide.'),
});

export const passwordSpec = defineFieldSpec({
  id: 'password',
  type: 'password',
  autoComplete: 'new-password',
  hint: `Au moins ${PASSWORD_MIN_LENGTH} caractères, avec majuscule, minuscule et chiffre`,
  maxLength: 128,
  schema: z
    .string()
    .min(PASSWORD_MIN_LENGTH, `Au moins ${PASSWORD_MIN_LENGTH} caractères.`)
    .regex(/\p{Ll}/u, 'Au moins une minuscule.')
    .regex(/\p{Lu}/u, 'Au moins une majuscule.')
    .regex(/\d/, 'Au moins un chiffre.'),
});

export const citySpec = defineFieldSpec({
  id: 'city',
  type: 'text',
  autoComplete: 'address-level2',
  placeholder: 'Ex : Libreville',
  hint: 'Lettres, chiffres, espaces, tirets et apostrophes uniquement',
  maxLength: 80,
  counter: true,
  sanitize: sanitizeAlphanumeric,
  format: formatTitleCase,
  finalize: collapseWhitespace,
  schema: z
    .string()
    .min(1, 'La ville est requise.')
    .max(80, 'La ville ne peut pas dépasser 80 caractères.'),
});

export const streetSpec = defineFieldSpec({
  id: 'street',
  type: 'text',
  autoComplete: 'address-line1',
  placeholder: 'Ex : Boulevard Triomphal',
  maxLength: 120,
  counter: true,
  sanitize: sanitizeAlphanumeric,
  finalize: collapseWhitespace,
  schema: z.string().max(120, 'La rue ne peut pas dépasser 120 caractères.'),
});

export const houseNumberSpec = defineFieldSpec({
  id: 'house-number',
  type: 'text',
  inputMode: 'numeric',
  placeholder: 'Ex : 12B',
  maxLength: 10,
  sanitize: (raw) => sanitizeAlphanumeric(raw).replace(/\s/g, ''),
  format: formatUppercase,
  schema: z.string().max(10, '10 caractères maximum.'),
});

export const dateSpec = defineFieldSpec({
  id: 'date',
  type: 'date',
  schema: z
    .string()
    .min(1, 'La date est requise.')
    .regex(ISO_DATE_PATTERN, 'Format de date invalide.')
    .refine(isValidIsoDate, 'Cette date n’existe pas.'),
});

export const birthDateSpec = defineFieldSpec({
  id: 'birth-date',
  type: 'date',
  autoComplete: 'bday',
  schema: z
    .string()
    .min(1, 'La date de naissance est requise.')
    .regex(ISO_DATE_PATTERN, 'Format de date invalide.')
    .refine(isValidIsoDate, 'Cette date n’existe pas.')
    .refine(
      (value) => new Date(`${value}T00:00:00`) <= new Date(),
      'La date de naissance ne peut pas être dans le futur.',
    )
    .refine((value) => {
      const age = (Date.now() - new Date(`${value}T00:00:00`).getTime()) / 31_557_600_000;
      return age <= 120;
    }, 'Vérifiez l’année de naissance.'),
});

export const amountSpec = defineFieldSpec({
  id: 'amount',
  type: 'text',
  inputMode: 'decimal',
  placeholder: 'Ex : 25 000',
  hint: 'Chiffres uniquement, virgule pour les décimales',
  maxLength: 20,
  sanitize: sanitizeAmount,
  format: formatThousands,
  schema: z
    .string()
    .min(1, 'Le montant est requis.')
    .refine((value) => !Number.isNaN(parseAmount(value)), 'Montant invalide.')
    .refine((value) => parseAmount(value) >= 0, 'Le montant doit être positif.'),
});

export const urlSpec = defineFieldSpec({
  id: 'url',
  type: 'url',
  inputMode: 'url',
  autoComplete: 'url',
  placeholder: 'Ex : exemple.com',
  hint: 'https:// sera ajouté automatiquement',
  maxLength: 2048,
  sanitize: (raw) => stripDangerous(raw).replace(/\s/g, ''),
  finalize: ensureHttps,
  schema: z.string().min(1, "L'URL est requise.").url('URL invalide.'),
});

export const otpSpec = defineFieldSpec({
  id: 'otp',
  type: 'text',
  inputMode: 'numeric',
  autoComplete: 'one-time-code',
  placeholder: '······',
  hint: 'Code à 6 chiffres reçu par SMS ou email',
  maxLength: 6,
  sanitize: (raw) => sanitizeDigits(raw).slice(0, 6),
  schema: z.string().regex(/^\d{6}$/, 'Le code doit contenir exactement 6 chiffres.'),
});

export const searchSpec = defineFieldSpec({
  id: 'search',
  type: 'search',
  inputMode: 'search',
  placeholder: 'Rechercher…',
  maxLength: 200,
  sanitize: stripDangerous,
  finalize: collapseWhitespace,
  schema: z.string().max(200),
});

/**
 * Le numéro dépend du pays sélectionné : la spec est donc une factory.
 * La valeur validée est la chaîne formatée ('07 12 34 56').
 */
export function makePhoneSpec(iso: string) {
  const country = getPhoneCountry(iso);
  return defineFieldSpec({
    id: `phone-${country.iso.toLowerCase()}`,
    type: 'tel',
    inputMode: 'tel',
    autoComplete: 'tel-national',
    placeholder: phonePlaceholder(country),
    hint: `Format : ${phonePlaceholder(country)} · ${country.name}`,
    sanitize: (raw) => sanitizePhone(raw, country),
    format: (digits) => formatPhoneDigits(digits, country),
    schema: z
      .string()
      .min(1, 'Le numéro de téléphone est requis.')
      .refine((value) => isPhoneComplete(value, country), 'Numéro incomplet pour ce pays.'),
  });
}

/** Registre par défaut — pratique pour itérer ou composer un z.object(). */
export const fieldSpecs = {
  firstName: firstNameSpec,
  lastName: lastNameSpec,
  email: emailSpec,
  password: passwordSpec,
  city: citySpec,
  street: streetSpec,
  houseNumber: houseNumberSpec,
  date: dateSpec,
  birthDate: birthDateSpec,
  amount: amountSpec,
  url: urlSpec,
  otp: otpSpec,
  search: searchSpec,
} as const;
