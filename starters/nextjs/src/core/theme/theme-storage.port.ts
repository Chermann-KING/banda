import type { ThemePreference } from './theme';

/**
 * Port de persistance de la préférence de thème.
 * Le core définit le contrat ; l'infrastructure fournit l'implémentation
 * (inversion de dépendances — le core ne connaît ni localStorage ni le DOM).
 */
export interface ThemeStoragePort {
  load(): ThemePreference | null;
  save(preference: ThemePreference): void;
}
