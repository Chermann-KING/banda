import { DEFAULT_PHONE_COUNTRY, PHONE_COUNTRIES, type PhoneCountry } from './countries.ts';
import { sanitizeDigits } from '../sanitize.ts';

export function getPhoneCountry(iso: string): PhoneCountry {
  return PHONE_COUNTRIES.find((country) => country.iso === iso) ?? DEFAULT_PHONE_COUNTRY;
}

export function phoneTotalDigits(country: PhoneCountry): number {
  return country.groups.reduce((total, group) => total + group, 0);
}

/** 'XX XX XX XX' pour le Gabon — sert de placeholder. */
export function phonePlaceholder(country: PhoneCountry): string {
  return country.groups.map((group) => 'X'.repeat(group)).join(' ');
}

/** Chiffres bruts, tronqués à la capacité du pays. */
export function sanitizePhone(raw: string, country: PhoneCountry): string {
  return sanitizeDigits(raw).slice(0, phoneTotalDigits(country));
}

/** '07123456' + Gabon → '07 12 34 56' (masque appliqué au fil de la frappe). */
export function formatPhoneDigits(digits: string, country: PhoneCountry): string {
  const parts: string[] = [];
  let cursor = 0;
  for (const group of country.groups) {
    if (cursor >= digits.length) break;
    parts.push(digits.slice(cursor, cursor + group));
    cursor += group;
  }
  return parts.join(' ');
}

export function isPhoneComplete(digits: string, country: PhoneCountry): boolean {
  return sanitizeDigits(digits).length === phoneTotalDigits(country);
}

/** Valeur E.164 pour la persistance : '+24107123456'. */
export function toE164(digits: string, country: PhoneCountry): string {
  return `${country.dialCode}${sanitizeDigits(digits)}`;
}
