import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../views/catalog/catalog.component').then((m) => m.CatalogComponent),
  },
  {
    path: 'c/:slug',
    loadComponent: () =>
      import('../views/catalog/catalog.component').then((m) => m.CatalogComponent),
  },
];
