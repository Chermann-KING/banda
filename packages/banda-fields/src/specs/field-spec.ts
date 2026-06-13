import type { ZodType, ZodTypeDef } from 'zod';

/**
 * FieldSpec — la pièce maîtresse DRY du système de champs Banda.
 *
 * Toute l'intelligence d'un type de champ est déclarée UNE fois ici
 * (règles de saisie, formatage temps réel, validation Zod, attributs HTML),
 * puis consommée par chaque starter qui n'écrit que le rendu.
 */
export interface FieldSpec {
  /** Identifiant du type de champ ('first-name', 'email'…). */
  readonly id: string;
  /** Attribut HTML `type` du contrôle. */
  readonly type: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' | 'date';
  /** Clavier mobile adapté. */
  readonly inputMode?: 'text' | 'numeric' | 'decimal' | 'email' | 'tel' | 'url' | 'search';
  readonly autoComplete?: string;
  readonly placeholder?: string;
  /** Aide affichée sous le champ (les règles, pas la répétition du label). */
  readonly hint?: string;
  readonly maxLength?: number;
  /** Affiche le compteur de caractères (nécessite maxLength). */
  readonly counter?: boolean;
  /** Pendant la frappe : retire les caractères interdits. */
  readonly sanitize?: (raw: string) => string;
  /** Pendant la frappe : met en forme (title case, masque…). */
  readonly format?: (value: string) => string;
  /** Au blur : normalisation finale (trim, préfixe https…). */
  readonly finalize?: (value: string) => string;
  /** Validation Zod de la valeur saisie (chaîne). */
  readonly schema: ZodType<string, ZodTypeDef, string>;
}

/** Garde l'inférence stricte tout en validant la forme. */
export function defineFieldSpec<S extends FieldSpec>(spec: S): S {
  return spec;
}
