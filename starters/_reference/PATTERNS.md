# Patterns — Starter React

## Patterns React idiomatiques (React 19)

| Pattern | Où | Pourquoi |
|---|---|---|
| **Ref en prop** (plus de `forwardRef`) | Button, Input, Select, Textarea via `ComponentPropsWithRef<'…'>` | Idiome React 19 ; les refs traversent naturellement |
| **Hooks custom** | `useTheme`, `useToast` | Encapsulent le contexte + l'erreur d'usage hors provider |
| **Provider + Context direct** | `<ThemeContext value={…}>` (pas `.Provider`) | Syntaxe React 19 ; `.Provider` est obsolète |
| **Compound components** | `BandaTable.Head / .Body / .Row / .Cell` | Composition explicite, pas de prop-drilling de slots |
| **Slots par props** | `BandaDialog` (footer), Navbar (brand, actions) | Variante slots quand l'ordre est imposé par le composant |
| **Composant contrôlé** | `BandaDialog` (open / onClose) | L'état appartient à l'appelant ; le composant reste prévisible |
| **Portal** | `BandaToastProvider` → `createPortal(document.body)` | Échappe aux contextes d'empilement parents |
| **Lazy init de `useState`** | `ThemeProvider` (`useState(() => storage.load())`) | La lecture du storage ne se produit qu'au montage |
| **Mémoïsation des valeurs de contexte** | `useMemo`/`useCallback` dans les providers | Évite les re-rendus de tous les consommateurs |

## Patterns d'architecture

| Pattern | Où |
|---|---|
| **Ports & Adapters** | `ThemeStoragePort` (core) ↔ `createLocalStorageThemeAdapter` (infrastructure) |
| **Composition root** | `app/App.tsx` — unique point d'instanciation de l'infra |
| **Factory** | `createNotification` — centralise id, défauts et invariants |
| **Logique pure extraite** | `resolveTheme(preference, systemPrefersDark)` — testée sans DOM |

## Conventions de style

- **Tailwind uniquement** avec le preset `@banda/tailwind` — classes sémantiques `banda-*`.
- **Zéro valeur arbitraire** : pas de `w-[347px]`, `text-[#ff0000]`, `p-[13px]`.
- **Zéro `dark:` Tailwind** — le dark mode passe par `data-theme` → CSS custom properties.
- Dark mode = `document.documentElement.setAttribute('data-theme', 'dark')`.
  Aucun composant n'a de logique de thème ; ils lisent les variables via leurs classes Tailwind.

## Conventions de code

- Un dossier par composant : `Banda{Nom}.tsx` + `index.ts` + `models/` (optionnel).
- Types exportés à côté du composant (`ButtonProps`…), ré-exportés par `ui/index.ts` (barrel unique).
- Spread des props natives **en dernier** pour laisser l'appelant surcharger.
- `type="button"` par défaut sur `BandaButton` (évite les submits accidentels).
- Props optionnelles : toujours `prop?: Type | undefined` (`exactOptionalPropertyTypes: true` actif).
- **Icônes : toujours Lucide** (`lucide-react`) — `aria-hidden="true"` sur les icônes décoratives.
- Accessibilité par défaut : `aria-invalid` sur les champs, `aria-live` sur les toasts, `aria-label` sur les boutons icône.

## Séparation des responsabilités dans un fichier

Un fichier `.tsx` doit exporter **uniquement des composants React** (ou des types).
Les hooks, contextes et utilitaires vont dans leurs propres fichiers :

```
ui/theme/
├── ThemeProvider.tsx    → export function ThemeProvider   (composant uniquement)
├── theme-context.ts     → ThemeContext + ThemeContextValue
└── useTheme.ts          → useTheme hook

ui/components/banda/toast/
├── BandaToast.tsx       → export function BandaToastProvider   (composant uniquement)
├── toast-context.ts     → BandaToastContext + useToast
└── index.ts             → barrel public
```

> Cette règle est appliquée par ESLint (`react-refresh/only-export-components`).
> Un fichier mixte composant + hook dégrade le HMR de Vite.

## Patterns smart fields

| Pattern | Où | Pourquoi |
|---|---|---|
| **Spec-driven components** | `FieldSpec` (`@banda/fields`) + `createSmartField` | L'intelligence est de la donnée, le composant du câblage — DRY radical |
| **Factory de composants** | `createSmartField(spec, displayName)` | 12 champs = 12 lignes dans `fields.ts` |
| **Pipeline de saisie** | `useSmartField` | frappe → sanitize → format ; blur → finalize → Zod |
| **Composition de schémas** | `z.object({ email: fieldSpecs.email.schema })` | Le schéma du formulaire est composé, jamais redéclaré |
| **Contrat étroit** | `FormApi` | Le moteur de formulaire est remplaçable (`react-hook-form`…) sans toucher aux champs |
| **Erreurs apaisées** | `useSmartField.onChange` | L'erreur s'efface dès la correction, réapparaît au blur suivant |

## Arbitrages

| Choix | Alternative écartée | Raison |
|---|---|---|
| Tailwind + preset `@banda/tailwind` | CSS Modules | Preset partagé entre tous les starters ; zéro duplication de variables ; coût runtime nul |
| `<dialog>` natif pour Modal | Portal + focus-trap maison | Focus trap, Échap, inertie : fournis par la plateforme ; moins de code à maintenir |
| Contexte React pour theme/toasts | Store externe (Zustand…) | État global minuscule ; une dépendance de moins dans un starter |
| `core/` séparé | Tout dans `ui/` | Le starter est un gabarit : la structure montre où la logique métier vivra |
| Hook `useForm` maison | Formik / react-hook-form | Zéro dépendance ; contrat `FormApi` minimal — react-hook-form peut remplacer le moteur sans toucher aux champs |
| Intelligence dans `@banda/fields` | Règles dans chaque composant | DRY à l'échelle du monorepo : Vue/Svelte/Angular réutiliseront les mêmes specs |
