# Règles de la feature {{FEATURE_NAME}}

## Imports autorisés

Cette feature peut importer depuis :
- `@/ui/**` — composants et services UI Banda
- `@/shared/**` — utilitaires partagés
- `@/core/**` — types et règles métier

Elle ne peut PAS importer depuis :
- `@/views/**`
- `@/app/**`
- `@/infrastructure/**`
- L'intérieur d'une autre feature (`@/features/{autre}/**`)
  → seulement son index : `@/features/{autre}`

## Interface publique

Seul `index.ts` est l'interface publique.
Les couches supérieures (views/, app/) n'importent que depuis `@/features/{{FEATURE_NAME}}`.

## Structure

```
features/{{FEATURE_NAME}}/
├── components/   composants Angular standalone de la feature
├── services/     logique métier + appels API (@Injectable)
├── store/        état local (signals)
├── types/        types internes
└── index.ts      seule interface publique
```

## Conventions Angular

- Composants : standalone, ChangeDetectionStrategy.OnPush, inject() pour les dépendances
- État réactif : signal(), computed(), effect() — pas de BehaviorSubject sauf interop RxJS
- Services : @Injectable({ providedIn: 'root' }) sauf si le scope doit être limité au composant
