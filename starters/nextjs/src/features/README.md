# features/

Modules métier isolés. Chaque feature encapsule un domaine fonctionnel complet.

## Structure d'une feature

```
features/
└── {nom}/
    ├── components/   composants React spécifiques à la feature
    ├── hooks/        hooks métier (useFeature*, useFetch*)
    ├── services/     appels API / side effects
    ├── store/        état local (Zustand, Context, useState)
    ├── types/        types propres à cette feature
    └── index.ts      SEULE interface publique — exporte uniquement ce que les autres couches ont besoin de voir
```

## Règles d'import

| Peut importer | Ne peut PAS importer |
|---|---|
| `@/ui/*` | `@/pages/*` |
| `@/shared/*` | `@/app/*` |
| `@/core/*` | `@/infrastructure/*` |
| `@/features/{same}/` (interne) | `@/features/{autre}/*` (sous-modules) |

Une feature ne peut importer d'une autre feature **que via son `index.ts`** :
```ts
// ✅ OK
import { useAuth } from '@/features/auth';

// ❌ Interdit — accès direct au sous-module
import { useAuthStore } from '@/features/auth/store';
```

## Créer une nouvelle feature

```bash
pnpm banda:feature {nom}
```

Génère la structure complète avec les fichiers template.
