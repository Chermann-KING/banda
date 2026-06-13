# @banda/starter-reference

Starter de **référence** du monorepo Banda — Vite + React 19 + TypeScript strict + Tailwind.

Il est la source de vérité avant portage vers Vue, Svelte, Next.js, etc.
Ne pas l'utiliser directement en production : copier son contenu dans votre propre repo.

---

## Démarrage rapide

**Prérequis :** Node ≥ 22, pnpm 9 (`corepack enable`).

Ce starter fait partie d'un monorepo pnpm. Il ne peut pas être installé isolément.

```bash
# 1. Cloner le monorepo
git clone https://github.com/<org>/banda.git
cd banda

# 2. Installer toutes les dépendances (packages + starters)
pnpm install

# 3. Builder les packages (tokens → preset → starter)
pnpm build

# 4. Lancer le catalogue de composants
pnpm --filter @banda/starter-reference dev
# → http://localhost:5173
```

> **Utiliser ce starter dans votre propre projet**
> Copiez le dossier `starters/_reference/` dans votre repo, supprimez les
> références `workspace:*` dans `package.json` et remplacez-les par les
> versions publiées de `@banda/tokens`, `@banda/tailwind` et `@banda/fields`.

---

## Ce qui est inclus

### Composants disponibles (18 familles)

| Famille | Composant de base | Modèles inclus |
|---|---|---|
| Badge | `BandaBadge` | dot, icon, removable |
| Button | `BandaButton` | icon, loading, split |
| Card | `BandaCard` | media, action, compact |
| Checkbox | `BandaCheckbox` | group, indeterminate |
| Dialog | `BandaDialog` | confirm, sheet |
| Dropdown menu | `BandaDropdownMenu` | radio group, checkbox group |
| Form | `BandaForm` | smart fields, validation Zod |
| Input | `BandaInput` | addon, floating label, OTP |
| Label | `BandaLabel` | required indicator |
| Radio | `BandaRadio` | group |
| Select | `BandaSelect` | multi-select |
| Stepper | `BandaStepper` | — |
| Switch | `BandaSwitch` | label inline |
| Table | `BandaTable` | data table, sortable |
| Tabs | `BandaTabs` | — |
| Textarea | `BandaTextarea` | floating label, auto-grow |
| Toast | `BandaToastProvider` + `useToast` | — |
| Smart fields | 12 champs typés | email, phone, amount, date… |

### Infrastructure en place

- Architecture 7 couches (`core / infrastructure / shared / ui / features / pages / app`)
- Enforcement ESLint des règles d'import inter-couches (`eslint-plugin-boundaries`)
- `ErrorBoundary` + `SuspenseBoundary` dans `src/shared/components/`
- Thème dark/light persisté en localStorage, bascule via `useTheme()`
- Système de toasts via `useToast()`
- Générateur de features : `pnpm banda:feature {nom}`
- Guardrails IA : `CLAUDE.md`, `.github/copilot-instructions.md`, `.cursorrules`

### Ce qui reste à faire (votre application)

- Vos propres features dans `src/features/`
- Vos propres pages dans `src/pages/`
- Vos propres ports/adaptateurs dans `src/core/` et `src/infrastructure/`
- Personnalisation des tokens dans `packages/banda-tokens/src/tokens.json`

---

## Scripts

```bash
pnpm dev          # Catalogue de composants (Vite HMR)
pnpm build        # typecheck + bundle production
pnpm typecheck    # tsc --noEmit
pnpm lint         # ESLint (0 erreur, 0 warning attendu)
pnpm test         # Vitest

pnpm banda:feature {nom}   # Génère src/features/{nom}/ avec la structure complète
```

---

## Import des composants

Les composants s'importent via l'alias `@/ui` défini dans `vite.config.ts` :

```ts
import { BandaButton, BandaInput, useToast } from '@/ui';
```

> L'alias `@` pointe vers `src/`. Si vous changez de bundler, mettez à jour
> l'alias dans `vite.config.ts` et `tsconfig.json` en conséquence.

---

## Architecture

Voir [`ARCHITECTURE.md`](./ARCHITECTURE.md) pour le détail des couches et leurs règles d'import.
Voir [`PATTERNS.md`](./PATTERNS.md) pour les conventions et patterns React 19 appliqués.
Voir [`src/RULES.md`](./src/RULES.md) pour la matrice complète des dépendances autorisées.
Voir [`CONTRIBUTING.md`](./CONTRIBUTING.md) pour les règles de contribution.
