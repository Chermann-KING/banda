import { computed, effect, inject, Injectable, signal } from '@angular/core';
import {
  DEFAULT_PREFERENCE,
  resolveTheme,
  type Theme,
  type ThemePreference,
} from '@banda/core';
import type { ThemeStoragePort } from '@banda/core';
import { THEME_STORAGE } from './theme-storage.token';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storage = inject<ThemeStoragePort>(THEME_STORAGE);

  readonly preference = signal<ThemePreference>(this.storage.load() ?? DEFAULT_PREFERENCE);
  private readonly systemPrefersDark = signal<boolean>(false);
  readonly theme = computed<Theme>(() => resolveTheme(this.preference(), this.systemPrefersDark()));

  constructor() {
    // Synchronise [data-theme] sur <html> à chaque changement de préférence.
    effect(() => {
      const pref = this.preference();
      if (pref === 'system') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', pref);
      }
    });

    // Suit les changements de préférence système (pertinent en mode 'system').
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    this.systemPrefersDark.set(query.matches);
    query.addEventListener('change', (e) => this.systemPrefersDark.set(e.matches));
  }

  setPreference(next: ThemePreference): void {
    this.preference.set(next);
    this.storage.save(next);
  }

  toggle(): void {
    this.setPreference(this.theme() === 'dark' ? 'light' : 'dark');
  }
}
