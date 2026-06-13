/**
 * Signature Banda : TOUT champ texte est sanitizé par défaut.
 * Helpers partagés par les modèles qui rendent un <input>/<textarea> brut.
 * Exception documentée : les mots de passe (jamais altérés).
 */
import type { ChangeEvent, FocusEvent } from 'react';
import { collapseWhitespace, stripDangerous } from '@banda/fields';

type TextField = HTMLInputElement | HTMLTextAreaElement;

/** À la frappe : retire chevrons et caractères de contrôle. */
export function sanitizeOnType(event: ChangeEvent<TextField>): void {
  event.target.value = stripDangerous(event.target.value);
}

/** Au blur : trim + espaces multiples réduits. */
export function sanitizeOnBlur(event: FocusEvent<TextField>): void {
  event.target.value = collapseWhitespace(event.target.value);
}
