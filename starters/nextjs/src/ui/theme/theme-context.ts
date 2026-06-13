'use client';

import { createContext } from 'react';
import type { Theme, ThemePreference } from '@/core/theme/theme';

export interface ThemeContextValue {
  theme: Theme;
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
