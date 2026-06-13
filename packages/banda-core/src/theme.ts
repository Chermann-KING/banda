export type Theme = 'light' | 'dark';

export type ThemePreference = Theme | 'system';

export const DEFAULT_PREFERENCE: ThemePreference = 'system';

export function resolveTheme(preference: ThemePreference, systemPrefersDark: boolean): Theme {
  if (preference === 'system') {
    return systemPrefersDark ? 'dark' : 'light';
  }
  return preference;
}

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === 'light' || value === 'dark' || value === 'system';
}

/**
 * Port de persistance de la préférence de thème.
 * Le core définit le contrat ; l'infrastructure fournit l'implémentation
 * (inversion de dépendances — le core ne connaît ni localStorage ni le DOM).
 */
export interface ThemeStoragePort {
  load(): ThemePreference | null;
  save(preference: ThemePreference): void;
}
