import { Injectable } from '@angular/core';
import { isThemePreference, type ThemePreference } from '@banda/core';
import type { ThemeStoragePort } from '@banda/core';

const STORAGE_KEY = 'banda.theme-preference';

/**
 * Implémentation Angular de ThemeStoragePort via localStorage.
 * try/catch : localStorage peut être indisponible (navigation privée, quotas).
 */
@Injectable()
export class LocalStorageThemeService implements ThemeStoragePort {
  load(): ThemePreference | null {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return isThemePreference(raw) ? raw : null;
    } catch {
      return null;
    }
  }

  save(preference: ThemePreference): void {
    try {
      window.localStorage.setItem(STORAGE_KEY, preference);
    } catch {
      // Échec silencieux : la préférence ne sera simplement pas persistée.
    }
  }
}
