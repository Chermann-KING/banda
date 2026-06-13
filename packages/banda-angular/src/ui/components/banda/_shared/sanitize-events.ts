/**
 * Signature Banda : TOUT champ texte est sanitizé par défaut.
 * Helpers partagés par les composants Input/Textarea.
 * Exception documentée : les mots de passe (jamais altérés).
 */
import { collapseWhitespace, stripDangerous } from '@banda/fields';

/** À la frappe (event input) : retire chevrons et caractères de contrôle. */
export function sanitizeOnInput(event: Event): void {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  target.value = stripDangerous(target.value);
}

/** Au blur : trim + espaces multiples réduits. */
export function sanitizeOnBlur(event: FocusEvent): void {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  target.value = collapseWhitespace(target.value);
}
