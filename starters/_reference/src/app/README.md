# app/

Composition root de l'application. Point d'entrée unique.

## Rôles

1. **Instancier** les adaptateurs d'infrastructure (localStorage, API clients…)
2. **Monter** les providers globaux (ThemeProvider, ToastProvider…)
3. **Composer** les pages avec le router

## Règle

`app/` est la **seule** couche autorisée à importer depuis `infrastructure/`.
C'est ici que les ports de `core/` sont liés à leurs implémentations concrètes.

```tsx
// app/App.tsx — exemple de composition root
import { localStorageAdapter } from '@/infrastructure/storage';
import { StorageContext } from '@/core/ports/storage.port';

export function App() {
  return (
    <StorageContext value={localStorageAdapter}>
      <ThemeProvider>
        <Router>
          <Routes />
        </Router>
      </ThemeProvider>
    </StorageContext>
  );
}
```
