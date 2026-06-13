# Règles d'import par couche

Ce document est la référence des règles d'import entre les couches de l'architecture.
Les violations sont détectées **automatiquement** par ESLint (erreur bloquante — ne jamais désactiver).

## Matrice des dépendances autorisées

```
          core  infra  shared  ui  features  views  app
core       —     ✗      ✗      ✗     ✗        ✗      ✗
infra      ✓     —      ✗      ✗     ✗        ✗      ✗
shared     ✓     ✗      —      ✗     ✗        ✗      ✗
ui         ✓     ✗      ✓      —     ✗        ✗      ✗
features   ✓     ✗      ✓      ✓     —*       ✗      ✗
views      ✓     ✗      ✓      ✓     ✓        —      ✗
app        ✓     ✓      ✓      ✓     ✓        ✓      —
```

`*` features → features : uniquement via l'`index.ts` de la feature cible.

## Règles par couche

### `core/`
- Importe : **rien** d'interne au projet
- Peut utiliser : dépendances npm tierces (zod, date-fns…)

### `infrastructure/`
- Importe : `@/core/**`
- Instanciée uniquement dans `app/`

### `shared/`
- Importe : `@/core/**`
- Exemples : ErrorBoundary, SuspenseBoundary, hooks génériques, utilitaires purs

### `ui/`
- Importe : `@/core/**`, `@/shared/**`
- N'importe jamais : `@/features/**`, `@/views/**`, `@/infrastructure/**`

### `features/`
- Importe : `@/core/**`, `@/shared/**`, `@/ui/**`
- N'importe jamais : l'intérieur d'une autre feature (seulement son `index.ts`)
- N'importe jamais : `@/views/**`, `@/infrastructure/**`

### `views/`
- Importe : `@/core/**`, `@/shared/**`, `@/ui/**`, `@/features/**`
- N'importe jamais : `@/infrastructure/**`
- Nommée `views/` pour éviter le conflit avec le Pages Router de Next.js

### `app/`
- Importe : tout
- Seule couche autorisée à utiliser `@/infrastructure/**`

## Exemples

```ts
// ✅ ui/ → shared/ : OK
import { SuspenseBoundary } from '@/shared/components';

// ✅ features/ → features/ via index : OK
import { useAuth } from '@/features/auth';

// ❌ ui/ → features/ : ERREUR ESLint
import { useUserStore } from '@/features/user/store';

// ❌ features/ → infrastructure/ : ERREUR ESLint
import { localStorageAdapter } from '@/infrastructure/storage';
```
