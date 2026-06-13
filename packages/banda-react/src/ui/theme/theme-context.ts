import { createContext } from 'react';
import type { Theme, ThemePreference } from '@banda/core';

export interface ThemeContextValue {
  theme: Theme;
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
