# Contributing au starter _reference

Ce document synthétise toutes les règles à respecter pour contribuer à ce starter.
Il est la référence humaine ; `.github/copilot-instructions.md` en est la version IA.

---

## Architecture des couches

```
┌────────────────────────────────────────┐
│  app/         Composition root         │  → instancie l'infrastructure, monte les providers
├────────────────────────────────────────┤
│  pages/       Écrans                   │  → assemble des features et composants UI
├────────────────────────────────────────┤
│  features/    Modules métier           │  → logique métier, hooks, services, état local
├────────────────────────────────────────┤
│  ui/          Composants & hooks       │  → composants Banda, hooks UI, smart fields
├────────────────────────────────────────┤
│  shared/      Utilitaires partagés     │  → ErrorBoundary, SuspenseBoundary, helpers
├────────────────────────────────────────┤
│  core/        Logique pure             │  → entités, ports, règles métier (zéro React)
│  infrastructure/ Adaptateurs          │  → localStorage, API calls (implémentent les ports)
└────────────────────────────────────────┘
```

**Règle :** chaque couche ne peut importer que depuis les couches en dessous d'elle.
Les violations sont détectées automatiquement par ESLint (erreur bloquante).

### ✅ Correct
```ts
// Dans src/ui/components/banda/button/BandaButton.tsx
import type { Theme } from '@/core/theme/theme'; // ui → core ✓
```

### ❌ Interdit
```ts
// Dans src/ui/components/banda/button/BandaButton.tsx
import { useUserStore } from '@/features/auth/store'; // ui → features ✗ ERREUR ESLint
```

---

## Design tokens

Toutes les valeurs visuelles passent par le preset `@banda/tailwind`.

### ✅ Correct
```tsx
<div className="bg-banda-primary text-banda-primary-contrast rounded-md p-4 shadow-md">
```

### ❌ Interdit
```tsx
<div className="bg-[#A66F1F] text-white rounded-[8px] p-[16px]">
//              ↑ valeur arbitraire — jamais
```

Pour modifier les couleurs, espacements ou typographie : éditer `packages/banda-tokens/src/tokens.json`.
Tout le reste se met à jour automatiquement.

---

## Icônes

- **Uniquement** `lucide-react`. Pas de SVG inline, pas d'emoji fonctionnel.
- Toujours `aria-hidden="true"` sur les icônes décoratives.
- `aria-label` obligatoire sur tout bouton icône sans texte visible.

```tsx
// ✅ Correct
import { Settings } from 'lucide-react';
<button aria-label="Paramètres"><Settings size={16} aria-hidden="true" /></button>

// ❌ Interdit
<button><svg>…</svg></button>
<button>⚙️</button>
```

---

## React 19 — patterns obligatoires

### Ref comme prop (pas de forwardRef)
```tsx
// ✅ React 19
export function BandaInput({ ref, ...props }: ComponentPropsWithRef<'input'>) {
  return <input ref={ref} {...props} />;
}

// ❌ Obsolète
export const BandaInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} {...props} />;
});
```

### Context provider direct
```tsx
// ✅ React 19
return <MyContext value={contextValue}>{children}</MyContext>;

// ❌ Obsolète
return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
```

---

## Composants Banda — structure obligatoire

Chaque composant suit ce patron :

```
src/ui/components/banda/
└── button/
    ├── BandaButton.tsx    # composant de base : étend <button>
    ├── index.ts           # exports sélectifs (interface publique)
    └── models/
        ├── static-models.tsx   # variantes composées statiques
        └── animated-models.tsx # variantes avec animations
```

Règles :
1. Préfixe `Banda` obligatoire sur le composant de base.
2. `index.ts` = seule interface publique — les consommateurs importent depuis `@/ui/`.
3. Les modèles **composent** le composant de base, ne le dupliquent pas.
4. Extend toujours l'élément HTML natif : `ComponentPropsWithRef<'button'>`.

---

## Features — structure obligatoire

```
src/features/
└── {nom}/
    ├── components/       # composants spécifiques à la feature
    ├── hooks/            # logique métier (useFeature...)
    ├── services/         # appels API / side effects
    ├── store/            # état local (Zustand slice, Context...)
    ├── types/            # types propres à la feature
    └── index.ts          # SEULE interface publique
```

- Une feature A ne peut pas importer depuis `@/features/B/hooks/...` — seulement `@/features/B` (son index).
- Pour créer une feature : `pnpm banda:feature {nom}`.

---

## TypeScript

| Règle | Exemple |
|---|---|
| Zéro `any` | Utiliser `unknown` + type guard |
| Zéro `as unknown as X` | Corriger le type à la source |
| Zéro `@ts-ignore` | Corriger le problème |
| `import type` obligatoire | `import type { User } from './types'` |
| Interface nommée pour les props | `interface BandaButtonProps extends ComponentPropsWithRef<'button'>` |

---

## Accessibilité — checklist

- [ ] `aria-invalid={error ? true : undefined}` sur les inputs en erreur
- [ ] `aria-describedby` lié au message d'erreur/hint
- [ ] `aria-live="polite"` sur les régions dynamiques
- [ ] `aria-label` sur tous les boutons sans texte visible
- [ ] `focus-visible:ring-2 focus-visible:ring-banda-focus-ring` sur tous les éléments focusables
- [ ] Pas de `focus:` sans `focus-visible:` — distinguer clavier et souris

---

## Sanitize

- `BandaInput` et `BandaTextarea` sanitizent par défaut (`sanitize={true}`).
- Exception documentée : `type="password"` — jamais modifier la valeur saisie.
- Pour les modèles qui rendent un `<input>` brut : utiliser `sanitizeOnType`/`sanitizeOnBlur` depuis `_shared/sanitize-events.ts`.

---

## Checklist avant PR

- [ ] `pnpm typecheck` passe sans erreur
- [ ] `pnpm lint` passe sans erreur
- [ ] `pnpm test` passe
- [ ] Zéro `console.log` de debug
- [ ] Zéro import inutilisé
- [ ] Zéro valeur Tailwind arbitraire (`w-[...]`, `text-[#...]`)
- [ ] Zéro `Context.Provider` — utiliser `<Context value={…}>`
- [ ] Les nouvelles icônes viennent de `lucide-react` uniquement
