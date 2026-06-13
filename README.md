# Banda

[![CI](https://github.com/Chermann-KING/banda/actions/workflows/ci.yml/badge.svg)](https://github.com/Chermann-KING/banda/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> _Banda_ — « commencement » en Yipunu (langue bantoue du peuple Punu, Gabon).

Monorepo open-source de **starters front-end**. Chaque starter embarque le même
design system : l'utilisateur ne touche qu'aux **tokens** (`packages/banda-tokens/src/tokens.json`)
— couleurs, typographie, espacements, animations — et tous les composants se
mettent à jour après un `pnpm build`.

## Structure

```
banda/
├── packages/
│   ├── banda-tokens/      # Source de vérité : JSON → CSS variables + exports TS
│   ├── banda-tailwind/    # Preset Tailwind partagé (couleurs sémantiques, keyframes…)
│   ├── banda-core/        # Types domaine framework-agnostic (thème, notifications, ports)
│   ├── banda-react/       # Bibliothèque de composants React du design system
│   ├── banda-angular/     # Bibliothèque de composants Angular du design system
│   └── banda-fields/      # Intelligence des champs (sanitize/format + Zod), framework-agnostic
├── starters/
│   ├── _reference/        # Starter React + Vite (référence — catalogue complet des composants)
│   ├── nextjs/            # Starter Next.js 15 (App Router) + React + TS + Tailwind
│   └── angular/           # Starter Angular 19 (standalone) + TS + Tailwind
├── docs/                  # Design system, architecture des atomes, catalogue
├── pnpm-workspace.yaml
└── turbo.json
```

## Démarrage

Prérequis : Node ≥ 22, pnpm 9 (`corepack enable`).

```bash
pnpm install
pnpm build                                       # tokens → preset → fields → core

# Lancer un starter au choix
pnpm --filter @banda/starter-reference dev       # → http://localhost:5173
pnpm --filter @banda/starter-nextjs dev          # → http://localhost:3000
pnpm --filter @banda/starter-angular dev         # → http://localhost:4200

pnpm test
```

> **Note :** `@banda/core` doit être buildé avant de démarrer les starters Angular et Next.js.
> `pnpm build` le fait automatiquement depuis la racine.

## Principes non négociables

1. **Tokens uniques** : aucune couleur/dimension en dur ; deux couches
   (primitives / sémantiques), dark mode par `data-theme`.
2. **Tailwind partagé** : toutes les classes des composants viennent du preset
   `@banda/tailwind` — zéro valeur arbitraire.
3. **Base HTML native** : chaque atome étend un élément HTML (`BandaButton` =
   `<button>`…). Les surfaces non stylables (popup de `<select>`) sont rendues
   en custom, l'élément natif restant caché pour les formulaires.
4. **Sanitize par défaut** sur toute saisie texte (exception : mots de passe).
5. **Icônes : Lucide uniquement.**
6. **Un dossier par atome** + `models/` + `index.ts` — voir
   [`docs/atom-architecture.md`](./docs/atom-architecture.md).

Documentation : [`/docs`](./docs/README.md) · Catalogue vivant : `registry.tsx`
du starter `_reference` (la grille de l'app de démo fait foi).

## Licence

MIT
