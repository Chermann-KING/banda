# Règles de la feature {{FEATURE_NAME}}

## Imports autorisés

Cette feature peut importer depuis :
- `@/shared/**` — utilitaires partagés
- `@/core/**` — types et règles métier

Elle ne peut PAS importer depuis :
- `@/app/**`
- `@/views/**`
- `@/infrastructure/**`
- L'intérieur d'une autre feature (`@/features/{autre}/**`)
  → seulement son index : `@/features/{autre}`

## Interface publique

Seul `index.ts` est l'interface publique.
Les couches supérieures (views/, app/) n'importent que depuis `@/features/{{FEATURE_NAME}}`.

## Structure

```
features/{{FEATURE_NAME}}/
├── components/   composants React 'use client' de la feature
├── hooks/        logique métier (use{{FeatureName}}*, useFetch*)
├── services/     appels API / adapters
├── store/        état local
├── types/        types internes
└── index.ts      seule interface publique
```

## Conventions Next.js App Router

- Ajouter `'use client'` sur tout composant qui utilise des hooks React
- Les Server Components (sans `'use client'`) ne peuvent pas utiliser useState, useEffect, etc.
- Préférer async Server Components pour le data fetching côté serveur
- Les hooks (`use*`) s'exécutent uniquement côté client
