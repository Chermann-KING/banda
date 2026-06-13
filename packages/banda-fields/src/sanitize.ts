/**
 * Sanitizers et formatters purs — aucune dépendance.
 *
 * Convention :
 * - `sanitize*`  : retire les caractères interdits PENDANT la frappe ;
 * - `format*`    : met en forme PENDANT la frappe (title case, masques…) ;
 * - `collapse*` / `ensure*` : normalisation AU BLUR (trim, préfixes…).
 */

/** Caractères de contrôle et chevrons — neutralise les injections HTML basiques. */
const DANGEROUS_PATTERN = /[<>\u0000-\u001F\u007F]/g;

export function stripDangerous(raw: string): string {
  return raw.replace(DANGEROUS_PATTERN, '');
}

/** Lettres (tous alphabets), espaces, tirets, apostrophes — pour les noms de personnes. */
const NOT_NAME_PATTERN = /[^\p{L}\s'’-]/gu;

export function sanitizeName(raw: string): string {
  return stripDangerous(raw).replace(NOT_NAME_PATTERN, '');
}

/** Lettres, chiffres, espaces, tirets, apostrophes — villes, rues, quartiers. */
const NOT_ALPHANUMERIC_PATTERN = /[^\p{L}\p{N}\s'’-]/gu;

export function sanitizeAlphanumeric(raw: string): string {
  return stripDangerous(raw).replace(NOT_ALPHANUMERIC_PATTERN, '');
}

export function sanitizeDigits(raw: string): string {
  return raw.replace(/\D/g, '');
}

/** Pour les emails : pas d'espaces ni de caractères dangereux. */
export function sanitizeEmail(raw: string): string {
  return stripDangerous(raw).replace(/\s/g, '');
}

/** Montants : chiffres + un seul séparateur décimal (virgule ou point). */
export function sanitizeAmount(raw: string): string {
  const cleaned = raw.replace(/[^\d.,]/g, '').replace(/\./g, ',');
  const [integer, ...decimals] = cleaned.split(',');
  return decimals.length > 0 ? `${integer},${decimals.join('')}` : (integer ?? '');
}

/** Majuscule en début de chaque mot (séparateurs : espace, tiret, apostrophe), reste en minuscules. */
export function formatTitleCase(value: string): string {
  return value
    .toLocaleLowerCase()
    .replace(/(^|[\s'’-])(\p{L})/gu, (_match, separator: string, letter: string) => {
      return separator + letter.toLocaleUpperCase();
    });
}

export function formatUppercase(value: string): string {
  return value.toLocaleUpperCase();
}

export function formatLowercase(value: string): string {
  return value.toLocaleLowerCase();
}

/** Groupe la partie entière par milliers : '1234567,5' → '1 234 567,5'. */
export function formatThousands(value: string): string {
  const [integer = '', decimals] = value.split(',');
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return decimals === undefined ? grouped : `${grouped},${decimals}`;
}

/** '1 234,56' → 1234.56 — NaN si non numérique. */
export function parseAmount(value: string): number {
  const normalized = value.replace(/\s/g, '').replace(',', '.');
  return normalized === '' ? Number.NaN : Number(normalized);
}

/** Trim + espaces multiples réduits — au blur, jamais pendant la frappe. */
export function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

/** Préfixe https:// si aucun schéma n'est présent. */
export function ensureHttps(value: string): string {
  const trimmed = value.trim();
  if (trimmed === '' || /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}
