# Architecture — Starter React

## Vue d'ensemble

```
src/
├── core/             # Logique métier pure — AUCUN import React ni DOM
│   ├── theme/        #   règles de résolution du thème + port de persistance
│   └── notifications/#   entité notification + factory
├── infrastructure/   # Implémentations concrètes des ports du core
│   └── storage/      #   adaptateur localStorage du ThemeStoragePort
├── shared/           # Utilitaires transverses (ErrorBoundary, hooks, utils, types)
│   └── components/   #   ErrorBoundary, SuspenseBoundary
├── ui/               # Composants React + hooks UI — dépend de core et shared
│   ├── components/   #   un dossier par composant Banda (base + models + index)
│   ├── forms/        #   smart fields, useForm, FormField
│   └── theme/        #   ThemeProvider, useTheme, ThemeContext
├── features/         # Modules métier isolés (votre code applicatif)
│   └── {nom}/        #   components / hooks / services / store / types / index.ts
├── pages/            # Écrans composés à partir de features et de ui/
└── app/              # Composition root : instancie l'infra, l'injecte, assemble
```

## Règle de dépendances

Les dépendances pointent vers l'intérieur :

```
app → pages → features → ui → shared → core ← infrastructure
```

| Couche | Peut importer | Ne peut JAMAIS importer |
|---|---|---|
| `core/` | rien d'interne | tout le reste |
| `infrastructure/` | `core/` | `ui/`, `shared/`, `features/`, `pages/`, `app/` |
| `shared/` | `core/` | `ui/`, `features/`, `pages/`, `infrastructure/`, `app/` |
| `ui/` | `core/`, `shared/` | `features/`, `pages/`, `infrastructure/`, `app/` |
| `features/` | `ui/`, `shared/`, `core/` | autres features (sauf leur `index.ts`), `pages/`, `infrastructure/`, `app/` |
| `pages/` | `features/`, `ui/`, `shared/`, `core/` | `infrastructure/`, `app/` |
| `app/` | tout | — |

**Violation = erreur ESLint bloquante** (`eslint-plugin-boundaries` + `no-restricted-imports`).
Ne jamais contourner avec `// eslint-disable`.

## Inversion de dépendances, concrètement

Le `ThemeProvider` a besoin de persister la préférence utilisateur. Plutôt que d'appeler
`localStorage` directement (couplage au navigateur, intestable), il reçoit un `ThemeStoragePort`
défini dans `core/`. Bénéfices :

- Tests du provider avec un faux storage en mémoire.
- Migration vers cookies/API sans toucher ni au core ni à l'UI.
- Le même contrat se transpose tel quel dans les autres starters.

## Design system

- `main.tsx` importe `@banda/tokens/css` (variables CSS) et `@banda/tokens/base.css` (reset).
- Chaque composant est stylé avec les classes Tailwind du preset `@banda/tailwind` —
  couleurs sémantiques `banda-*`, espacements, keyframes.
- **Aucune valeur brute** (hex, px, rem arbitraire) dans les composants.
- Dark mode = changement de `data-theme` sur `<html>` → CSS custom properties.
  Aucun composant n'a de logique de thème propre.

## Couche `shared/`

Utilitaires partagés entre `ui/`, `features/` et `pages/` :

| Dossier | Contenu |
|---|---|
| `components/` | `ErrorBoundary`, `SuspenseBoundary` |
| `hooks/` | Hooks React génériques sans logique métier |
| `utils/` | Fonctions pures (formatage, parsing…) |
| `types/` | Types TypeScript transverses |
| `constants/` | Constantes partagées (routes, clés…) |

## Couche `features/`

Chaque feature est un module métier autonome :

```
features/{nom}/
├── components/   composants React de la feature
├── hooks/        logique métier (use{Nom}*)
├── services/     appels API / adapters
├── store/        état local
├── types/        types internes
└── index.ts      SEULE interface publique
```

Créer via : `pnpm banda:feature {nom}`

## Couche formulaires (smart fields)

```
@banda/fields (workspace)        ← intelligence : FieldSpec (sanitize, format, Zod)
        ↑
ui/forms/                        ← câblage React uniquement
├── useForm.ts                   moteur validé Zod (contrat FormApi)
├── Form.tsx                     provider + <form noValidate>
├── useSmartField.ts             branche une FieldSpec sur le formulaire
├── FormField.tsx                chrome commun : label, étoile, hint, erreur, compteur
├── createSmartField.tsx         factory : 1 spec → 1 composant
├── fields.ts                    catalogue (12 champs = 12 lignes)
├── PhoneField.tsx               cas riche : sélecteur pays + masque
└── PasswordField.tsx            cas riche : jauge de force + afficher/masquer
```

## Arbitrages

| Choix | Alternative écartée | Raison |
|---|---|---|
| Tailwind + tokens `banda-*` | CSS Modules | Zéro coût runtime, consommation native des custom properties, preset partagé entre tous les starters sans duplication |
| `<dialog>` natif pour Modal | Portal + focus-trap maison | Focus trap, Échap, inertie : fournis par la plateforme |
| Contexte React pour theme/toasts | Store externe (Zustand…) | État global minuscule ; une dépendance de moins |
| `core/` séparé malgré la petite taille | Tout dans `ui/` | Le starter est un gabarit : la structure montre où la logique métier vivra quand l'app grossira |
| `shared/` séparé de `ui/` | Tout dans `ui/` | `ErrorBoundary` et les utils génériques n'ont pas à connaître les composants Banda |
| `features/` isolées avec index public | Imports directs entre features | Évite le couplage accidentel entre domaines métier |
