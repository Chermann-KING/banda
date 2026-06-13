import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  DEFAULT_PREFERENCE,
  resolveTheme,
  type ThemePreference,
} from '@banda/core';
import type { ThemeStoragePort } from '@banda/core';
import { ThemeContext } from './theme-context';

interface ThemeProviderProps {
  /** Port injecté par la composition root (app/) — jamais instancié ici. */
  storage: ThemeStoragePort;
  children: ReactNode;
}

export function ThemeProvider({ storage, children }: ThemeProviderProps) {
  const [preference, setPreferenceState] = useState<ThemePreference>(
    () => storage.load() ?? DEFAULT_PREFERENCE,
  );
  // false par défaut pour le SSR — mis à jour côté client au premier montage.
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);

  // Suit les changements de préférence système (pertinent en mode 'system').
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemPrefersDark(query.matches);
    const onChange = (event: MediaQueryListEvent) => setSystemPrefersDark(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const theme = resolveTheme(preference, systemPrefersDark);

  // Le CSS des tokens lit [data-theme] ; en mode 'system', on retire
  // l'attribut pour laisser prefers-color-scheme s'appliquer.
  useEffect(() => {
    const root = document.documentElement;
    if (preference === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', preference);
    }
  }, [preference]);

  const setPreference = useCallback(
    (next: ThemePreference) => {
      setPreferenceState(next);
      storage.save(next);
    },
    [storage],
  );

  const toggle = useCallback(() => {
    setPreference(theme === 'dark' ? 'light' : 'dark');
  }, [setPreference, theme]);

  const value = useMemo(
    () => ({ theme, preference, setPreference, toggle }),
    [theme, preference, setPreference, toggle],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
