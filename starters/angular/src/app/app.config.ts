import { provideRouter, withHashLocation } from '@angular/router';
import type { ApplicationConfig } from '@angular/core';
import { routes } from './app.routes';
import { LocalStorageThemeService } from '../infrastructure/storage/local-storage-theme.service';
import { THEME_STORAGE } from '@banda/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    { provide: THEME_STORAGE, useClass: LocalStorageThemeService },
  ],
};
