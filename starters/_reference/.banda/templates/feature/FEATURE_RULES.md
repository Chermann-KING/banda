# Règles de la feature {{FEATURE_NAME}}

## Import autorisés

Cette feature peut importer depuis :
- `@/ui/**` — composants et hooks UI Banda
- `@/shared/**` — utilitaires partagés
- `@/core/**` — types et règles métier

Elle ne peut PAS importer depuis :
- `@/pages/**`
- `@/app/**`
- `@/infrastructure/**`
- L'intérieur d'une autre feature (`@/features/{autre}/**`)
  → seulement son index : `@/features/{autre}`

## Interface publique

Seul `index.ts` est l'interface publique.
Les couches supérieures (pages, app) n'importent que depuis `@/features/{{FEATURE_NAME}}`.

## Structure

```
features/{{FEATURE_NAME}}/
├── components/   composants React de la feature (pas exposés sauf si nécessaire)
├── hooks/        logique métier (use{{FeatureName}}*, useFetch*)
├── services/     appels API / adapters
├── store/        état local
├── types/        types internes
└── index.ts      seule interface publique
```
