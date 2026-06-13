export type Theme = 'light' | 'dark';

/** Préférence utilisateur : un thème explicite, ou suivre le système. */
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
