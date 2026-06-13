import { InjectionToken } from '@angular/core';
import type { ThemeStoragePort } from '@banda/core';

export const THEME_STORAGE = new InjectionToken<ThemeStoragePort>('ThemeStoragePort');
