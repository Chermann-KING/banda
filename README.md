# Banda

[![CI](https://github.com/Chermann-KING/banda/actions/workflows/ci.yml/badge.svg)](https://github.com/Chermann-KING/banda/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> _Banda_ — « commencement » en Yipunu (langue bantoue du peuple Punu, Gabon).

Monorepo open-source de **starters front-end prêts à l'emploi**. Chaque starter
embarque le même design system exploitable immédiatement : l'utilisateur ne
touche qu'aux **tokens couleur** (`packages/banda-tokens/src/tokens.json`) et
tous les composants — modèles et animations compris — se mettent à jour
instantanément.

## Structure

```
banda/
├── packages/
│   ├── banda-tokens/      # Source de vérité : JSON → CSS variables + exports TS
│   ├── banda-tailwind/    # Preset Tailwind partagé (couleurs sémantiques, keyframes…)
│   └── banda-fields/      # Intelligence des champs (sanitize/format + Zod), framework-agnostic
├── starters/
│   └── _reference/        # Starter de référence (React + Vite + TS + Tailwind)
├── docs/                  # Design system, architecture des atomes, catalogue
├── pnpm-workspace.yaml
└── turbo.json
```

**Starter React disponible** : 18 composants livrés, architecture 7 couches complète,
guardrails IA intégrés. Portages prévus : `vue` · `svelte` · `astro` · `angular` · `nextjs` · `nuxt`.

## Démarrage

Prérequis : Node ≥ 22, pnpm 9 (`corepack enable`).

```bash
pnpm install
pnpm build                                      # tokens → preset → starter
pnpm --filter @banda/starter-reference dev      # catalogue sur localhost:5173
pnpm test
```

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
du starter (la grille de l'app de démo fait foi).

## Licence

MIT
