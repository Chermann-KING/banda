import type { ThemeStoragePort } from '@banda/core';
import { isThemePreference, type ThemePreference } from '@banda/core';

const STORAGE_KEY = 'banda.theme-preference';

/**
 * Adaptateur localStorage du ThemeStoragePort.
 * try/catch : localStorage peut être indisponible (SSR, navigation privée, quotas).
 */
export function createLocalStorageThemeAdapter(): ThemeStoragePort {
  return {
    load(): ThemePreference | null {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        return isThemePreference(raw) ? raw : null;
      } catch {
        return null;
      }
    },
    save(preference: ThemePreference): void {
      try {
        window.localStorage.setItem(STORAGE_KEY, preference);
      } catch {
        // Échec silencieux : la préférence ne sera simplement pas persistée.
      }
    },
  };
}
