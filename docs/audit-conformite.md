# Audit de conformité Banda — 2026-06-13

> Périmètre : état du monorepo à la date de l'audit.  
> **Corrections appliquées le 2026-06-13** — toutes les priorités P0, P1 et P2 ont été traitées.  
> Voir la section [Statut des corrections](#statut-des-corrections) en fin de document.

---

## PHASE 1 — Cartographie de l'existant

### `packages/banda-tokens`

| Fichier | Rôle réel | Rôle attendu | Statut |
|---|---|---|---|
| `src/tokens.json` | Source de vérité : primitives (couleurs, typo, spacing, radii, shadows, z, motion) + sémantiques light/dark avec alias `{a.b.c}` | Source de vérité unique des tokens | ✅ |
| `scripts/build.mjs` | Génère CSS + JS + d.ts + JSON résolu, aucune dépendance externe | Build autonome du package | ✅ |
| `dist/banda.css` | Variables CSS `:root` (primitives + light) + `[data-theme='dark']` + `@media` | CSS tokens exportés | ✅ |
| `dist/base.css` | Reset minimal (box-sizing, font-family, background, color) | Reset optionnel | ✅ |
| `dist/index.js` | Exports JS : `prefix`, `tokens` (résolu), `themes`, `cssVar` | Exports JS typés | ✅ |
| `dist/index.d.ts` | Types des exports JS | Typings TS | ⚠️ `tokens` typé `Record<string,unknown>` — trop permissif |
| `dist/tokens.resolved.json` | JSON alias résolus | Pour outillage | ✅ |
| `tests/build.test.mjs` | Tests de génération des 3 sorties | Tests | ✅ |
| `package.json` | `exports` : `.`, `./css`, `./base.css`, `./tokens.json` | Exports corrects | ✅ |

### `packages/banda-tailwind`

| Fichier | Rôle réel | Rôle attendu | Statut |
|---|---|---|---|
| `preset.js` | Preset Tailwind : couleurs sémantiques via `var(--banda-color-*)`, spacing, radii, shadows, z-index, motion, 7 keyframes banda-* | Preset partagé consommant @banda/tokens | ⚠️ Voir AXE 2 — fontWeight/lineHeight/letterSpacing absents |
| `tests/preset.test.mjs` | Tests du preset | Tests | ✅ |
| `package.json` | `main: ./preset.js`, dep workspace `@banda/tokens`, peer `tailwindcss ^3.4` | Package correct | ✅ |
| **`tsconfig.json`** | **Absent** | Cohérence monorepo | ⚠️ Acceptable (fichier `.js`) |

### `packages/banda-fields`

| Fichier | Rôle réel | Rôle attendu | Statut |
|---|---|---|---|
| `src/sanitize.ts` | 13 fonctions pures (stripDangerous, sanitizeName, sanitizeEmail, sanitizeAmount, formatTitleCase, collapseWhitespace, ensureHttps, …) | Sanitizers/formatters framework-agnostic | ✅ |
| `src/password.ts` | Constante `PASSWORD_MIN_LENGTH` + logique de force | Règles mot de passe | ✅ |
| `src/phone/countries.ts` | Liste de 15 pays africains + données dial | Données téléphone | ✅ |
| `src/phone/phone.ts` | sanitizePhone, formatPhoneDigits, isPhoneComplete, phonePlaceholder | Logique masque téléphone | ✅ |
| `src/specs/field-spec.ts` | Interface `FieldSpec` + `defineFieldSpec` factory | Contrat type d'un champ | ✅ |
| `src/specs/specs.ts` | 12 specs prédéfinies (firstName, lastName, email, password, city, street, houseNumber, date, birthDate, amount, url, otp, search) + `makePhoneSpec` factory + registre `fieldSpecs` | Specs DRY pour tous les starters | ✅ |
| `tests/*.test.ts` | 4 fichiers de tests (sanitize, phone, specs, password) | Tests | ✅ |
| `package.json` | `exports: { ".": "./src/index.ts" }` — pointe vers source TS | Package | ⚠️ Voir AXE 4 |
| `tsconfig.json` | Présent | Cohérence | ✅ |

### `starters/_reference`

| Fichier/dossier | Rôle réel | Rôle attendu | Statut |
|---|---|---|---|
| `src/core/theme/` | `Theme`, `ThemePreference`, `resolveTheme`, `isThemePreference` — logique pure sans import DOM/React | Core sans dépendances | ✅ |
| `src/core/theme/theme-storage.port.ts` | Port `ThemeStoragePort` (interface, couche core) | Inversion de dépendances | ✅ |
| `src/core/notifications/notification.ts` | Entité `AppNotification` + factory `createNotification` | Logique core | ✅ |
| `src/infrastructure/storage/local-storage-theme.adapter.ts` | Implémentation `ThemeStoragePort` via `localStorage` | Adaptateur infra | ✅ |
| `src/app/App.tsx` | Composition root : instancie l'adaptateur localStorage, injecte dans ThemeProvider, monte BandaToastProvider | Composition root | ✅ |
| `src/ui/theme/ThemeProvider.tsx` | Context + pose `data-theme` sur `<html>`, suit `prefers-color-scheme` | Provider theme | ✅ |
| `src/ui/theme/useTheme.ts` | Hook `useTheme` avec garde de contexte | Hook | ✅ |
| `src/ui/components/banda/_shared/field-control.ts` | Classes Tailwind partagées Input/Select/Textarea (BASE, SIZE, VARIANT, ERROR, `controlClasses`) | Module privé | ✅ |
| `src/ui/components/banda/_shared/field-footer.tsx` | Pied de champ partagé (hint / erreur) avec icônes Lucide | Module privé | ✅ |
| `src/ui/components/banda/_shared/sanitize-events.ts` | Présent mais **non utilisé** par les composants Banda v2 | Handlers sanitize | ⚠️ Vestige potentiel |
| `src/ui/components/banda/button/` | BandaButton + 2 fichiers de modèles (static + animated) | Atome button | ✅ |
| `src/ui/components/banda/input/` | BandaInput + 4 fichiers de modèles + test | Atome input | ✅ |
| `src/ui/components/banda/select/` | BandaSelect (listbox custom + `<select>` natif caché) + 3 modèles | Atome select | ✅ |
| `src/ui/components/banda/textarea/` | BandaTextarea + 2 modèles | Atome textarea | ⚠️ Voir AXE 1 |
| `src/ui/components/banda/label/` | BandaLabel + 2 modèles | Atome label | ✅ |
| `src/ui/components/banda/checkbox/` | BandaCheckbox + 3 modèles | Atome checkbox | ⚠️ Voir AXE 1 |
| `src/ui/components/banda/radio/` | BandaRadio + 3 modèles | Atome radio | ⚠️ Voir AXE 1 |
| `src/ui/components/banda/switch/` | BandaSwitch + 2 modèles | Atome switch | ✅ |
| `src/ui/components/banda/form/` | BandaForm (2 régimes : FormApi + FormData natif) + 1 modèle | Atome form | ✅ |
| `src/ui/components/banda/badge/` | BandaBadge (tone × fill × size) + 3 modèles | Atome badge | ✅ |
| `src/ui/components/banda/card/` | BandaCard (pattern composé .Header/.Body/.Footer/.Media) + 1 modèle | Surface card | ✅ |
| `src/ui/components/banda/dialog/` | BandaDialog (base `<dialog>` natif, focus trap natif) + 1 modèle | Surface dialog | ✅ |
| `src/ui/components/banda/toast/` | BandaToastProvider + useToast | Surface toast | ❌ Voir AXE 1 |
| `src/ui/components/banda/tabs/` | BandaTabs (4 variantes, 2 orientations, APG) + BandaTabs.Panel | Nav tabs | ⚠️ Voir AXE 1 |
| `src/ui/components/banda/stepper/` | BandaStepper (3 layouts, 2 variantes) + useStepper | Nav stepper | ⚠️ Voir AXE 1 |
| `src/ui/components/banda/dropdown-menu/` | BandaDropdownMenu (items, checkbox, radio group, séparateurs) | Surface dropdown | ⚠️ Voir AXE 1 |
| `src/ui/components/banda/table/` | BandaTable (pattern composé) + 2 modèles | Données table | ✅ |
| `src/ui/forms/useForm.ts` | Moteur formulaire Zod minimaliste, contrat `FormApi` | Smart fields core | ✅ |
| `src/ui/forms/Form.tsx` | Provider + `<form noValidate>` | Smart fields | ✅ |
| `src/ui/forms/useSmartField.ts` | Branche FieldSpec sur FormApi | Smart fields | ✅ |
| `src/ui/forms/FormField.tsx` | Chrome commun label/hint/erreur/compteur (CSS Modules) | Smart fields | ⚠️ CSS Modules parallèle aux composants Tailwind |
| `src/ui/forms/createSmartField.tsx` | Factory spec → composant en 1 ligne | Smart fields | ✅ |
| `src/ui/forms/fields.ts` | 12 smart fields en 12 lignes | Smart fields | ✅ |
| `src/ui/forms/PhoneField.tsx` | Sélecteur pays + masque (CSS Modules) | Smart fields | ⚠️ CSS Modules (exception documentée) |
| `src/ui/forms/PasswordField.tsx` | Jauge de force + afficher/masquer (CSS Modules) | Smart fields | ⚠️ CSS Modules (exception documentée) |
| `src/ui/forms/*.module.css` | CSS Modules avec `var(--banda-*)` — aucune valeur brute | Style formulaires | ✅ |
| `src/ui/hooks/useAnchoredDropdown.ts` | Hook de positionnement des dropdowns | Hook partagé | ✅ |
| `src/ui/index.ts` | Barrel unique | Export | ✅ |
| `src/pages/catalog/registry.tsx` | Registre des 58 familles avec statut Demo | Catalogue vivant | ✅ |
| `src/pages/catalog/CatalogPage.tsx` | Page catalogue avec routing hash manuel | Page | ⚠️ Voir AXE 3 |
| `tailwind.config.ts` | `presets: [bandaPreset]` uniquement | Config Tailwind | ✅ |
| `tsconfig.json` | strict, paths `@/*`, noUnusedLocals, noUnusedParameters | TypeScript | ✅ |
| `eslint.config.js` | ESLint 9 flat, typescript-eslint, react-hooks, react-refresh | ESLint | ⚠️ Voir AXE 4 |
| `ARCHITECTURE.md` | Bien documenté | Doc | ✅ |
| `PATTERNS.md` | Patterns React 19 + architecture + smart fields | Doc | ✅ |

### `starters/react`

| Fichier/dossier | Rôle réel | Statut |
|---|---|---|
| `starters/react/` | **Dossier vide** | 🗑️ À supprimer |

### `docs/`

| Fichier | Contenu | Statut |
|---|---|---|
| `README.md` | Index et état des starters | ✅ |
| `design-system.md` | Tokens, theming, icônes, sanitize | ✅ |
| `atom-architecture.md` | Pattern obligatoire (dossier/models/index) | ✅ |
| `components-catalog.md` | 58 familles, phases A→E | ✅ |
| `contributing-a-starter.md` | Checklist portage | ✅ |

---

## PHASE 2 — Audit de conformité par axe

### AXE 1 — Composants (`starters/_reference/src/ui/`)

#### Atomicité et nomenclature

- ✅ Chaque composant livré étend un élément HTML natif (`<button>`, `<input>`, `<label>`, `<select>` caché + listbox, `<textarea>`, `<dialog>`, `<article>`, `<span>`, `<table>`, `<ol>`, `<form>`, `<menu>`, `role="tablist"`)
- ✅ Nommage 100 % conforme à la liste officielle (`BandaButton`, `BandaInput`, etc.)
- ⚠️ La hiérarchie atoms/molecules/organisms **n'est pas segmentée** en dossiers : `Dialog`, `DropdownMenu`, `Table`, `Tabs` ont la complexité de molecules/organisms mais vivent au même niveau que `Label`. La vision `atom-architecture.md` ne mentionne que "atomes", mais le catalogue livre clairement des composants de niveaux supérieurs sans nomenclature explicite.
- ✅ Autosuffisance : chaque composant est autoporté, pas de dépendance implicite non déclarée

#### Cohérence interne

- ✅ Aucun composant ne réimplémente la logique d'un autre (les composants complexes composent les atomes : BandaDropdownMenu utilise `useAnchoredDropdown`, BandaForm utilise `FormContext`)
- ⚠️ **API prop non uniforme entre les systèmes** : `BandaInput` expose `validate / error / hint / sanitize` en props directes, tandis que les smart fields exposent ces comportements via la `FieldSpec`. Les deux systèmes coexistent sans passerelle claire. Un développeur ne sait pas lequel utiliser.
- ⚠️ **`BandaTextarea` duplique `VARIANT`** : les classes de variantes (default/filled/ghost) sont recopiées mot pour mot de `_shared/field-control.ts`. Seule la clé `SIZE` diffère légitimement (min-height vs height). La `textareaClasses()` devrait réutiliser la `VARIANT` privée exportée, ou `field-control.ts` devrait exposer les maps séparément.

#### Icônes

- ✅ 100 % Lucide (`lucide-react`) — vérifié sur l'ensemble des composants livrés
- ✅ Aucun SVG inline, emoji fonctionnel, ni autre librairie
- ✅ `aria-hidden="true"` systématique sur toutes les icônes décoratives
- ✅ `aria-label` sur les boutons icône (`"Fermer la fenêtre"`, `"Fermer la notification"`, etc.)
- ✅ Exception correctement documentée dans `PATTERNS.md` : drapeaux de pays (données), étoile `*` (typographie)

#### Design system

- ✅ **Zéro valeur Tailwind arbitraire** (`w-[...]`, `text-[#...]`, etc.) — vérifié par grep sur l'ensemble de `src/`
- ✅ Toutes les classes de couleur passent par le preset (`banda-*` → `var(--banda-color-*)`)
- ✅ `BandaInput` et `BandaSelect` partagent `controlClasses` → alignement visuel garanti
- ✅ 4 états couverts sur les composants de formulaire : default / focus-visible / error (aria-invalid + ring danger) / disabled (opacity-50 + pointer-events-none)
- ✅ Dark mode exclusivement via `data-theme` → CSS variables
- ⚠️ **`font-medium`, `font-semibold`, `leading-tight`, `leading-snug`** dans les composants Tailwind viennent du **core Tailwind**, pas du preset Banda. `tokens.json` définit `font.weight.*` et `font.line-height.*` mais `preset.js` ne les mappe pas (`extend.fontWeight` et `extend.lineHeight` sont absents). Les valeurs numériques coïncident, mais elles ne sont pas token-contrôlées.
- ⚠️ **`border-l-4`** dans `BandaToast` est une épaisseur built-in Tailwind, pas issue du preset.
- ❌ **Token `danger-active` absent** : les variantes `primary`, `secondary`, `outline` de `BandaButton` utilisent toutes `active:bg-banda-*-active`. La variante `danger` n'a pas d'état `active:` car le token `danger-active` n'existe pas dans `tokens.json`.

#### Sanitize & validation

- ✅ `BandaInput` : `sanitize={true}` par défaut (stripDangerous sur `onChange`, collapseWhitespace sur `onBlur`)
- ✅ `BandaTextarea` : `sanitize={true}` par défaut (même pipeline)
- ✅ Les deux exposent `sanitize / validate / error / hint`
- ✅ Sanitization avant propagation de l'événement `onChange` (mutation de `event.target.value`)
- ✅ `BandaCheckbox`, `BandaRadio`, `BandaSwitch` : pas de sanitize (correct — pas de saisie texte)
- ⚠️ **`_shared/sanitize-events.ts`** : fichier présent mais non importé par les composants Banda v2. Vestige du système précédent, à vérifier.

#### Problèmes spécifiques par composant

**BandaToast** ❌
- Les items individuels de notification utilisent `<output>` comme wrapper. `<output>` est un élément HTML5 prévu pour les résultats de calcul de formulaire (son role implicite ARIA est `status`), pas pour des messages de notification fugaces. La spec Banda indique `<aside role=status>` pour le container (correct), mais les items devraient être `<div role="status">` ou `<article>`. L'utilisation de `<output>` est sémantiquement incorrecte.

**BandaDropdownMenu** ⚠️
- Les items utilisent `focus:bg-banda-surface-muted` et `focus:outline-none` au lieu de `focus-visible:`. Cela ne distingue pas focus clavier vs focus souris, ce qui diminue la qualité de l'expérience non-pointeur.

**BandaCheckbox** ⚠️
- Les couleurs `success`, `warning`, `info`, `secondary` de la coche utilisent `text-banda-primary-contrast` (blanc) comme couleur de l'icône check/minus. Il n'existe pas de tokens `success-contrast`, `warning-contrast`, `info-contrast` pour garantir un contraste correct selon la couleur de fond réelle. Risque d'accessibilité si ces teintes ont un lumineux suffisamment élevé.

**BandaRadio** ⚠️
- La technique de rendu du point sélectionné repose sur `checked:border-4` — une épaisseur de bordure Tailwind built-in. Le résultat visuel est correct mais la valeur (`4px`) ne passe pas par les tokens.

**BandaStepper** ⚠️
- `key={index}` sur les éléments de la liste `<ol>`. Acceptable pour un composant en lecture seule à ordre fixe, mais non idiomatique.

**BandaTabs** ⚠️
- La variante `solid` badge utilise `bg-banda-primary-contrast text-banda-primary` pour inverser les couleurs. Correct visuellement, mais fragile si `primary-contrast` change (teinte foncée en dark mode).

---

### AXE 2 — Design tokens (`packages/banda-tokens`)

- ✅ Tokens couvrent : couleurs (7 palettes × 11 teintes), typographie (famille, taille, poids, interligne, espacement lettre), spacing (14 valeurs), radii (6), shadows (4), z-index (5), motion (duration × 2, easing × 2)
- ✅ Exportés en 3 formats : JSON (`src/tokens.json`), CSS custom properties (`dist/banda.css`), JS/TS (`dist/index.js` + `dist/index.d.ts`)
- ✅ `banda-tailwind/preset.js` consomme exclusivement `@banda/tokens` — aucune valeur en dur
- ✅ Aucun token défini ailleurs que dans `banda-tokens`
- ✅ Deux couches (primitives → sémantiques) avec alias `{primitive.color.ochre.600}` résolus à la build
- ✅ Dark mode complet : 28 alias sémantiques light + 28 dark
- ⚠️ **`fontWeight`, `lineHeight`, `letterSpacing` absents du preset.js** : `extend.fontWeight`, `extend.lineHeight`, `extend.letterSpacing` ne sont pas définis. Les composants utilisent `font-medium`, `leading-tight`, `tracking-wide` qui viennent du core Tailwind, pas des tokens. Conséquence : modifier les tokens typo n'impacte pas les classes Tailwind dans les composants.
- ⚠️ **`index.d.ts` trop permissif** : `tokens` typé `{ primitive: Record<string, unknown>; semantic: ... }`. Une inférence structurelle depuis le JSON serait préférable pour les consommateurs TypeScript.
- ⚠️ **Tokens `success-contrast`, `warning-contrast`, `info-contrast` absents** : les tokens de statut ont `success`, `success-muted`, `warning`, `warning-muted`, `info`, `info-muted` — mais pas de `*-contrast` pour les icônes blanches sur fond coloré. Comparé aux tokens `primary-contrast`, `secondary-contrast`, `danger-contrast` qui sont présents. Asymétrie.

---

### AXE 3 — Starter `_reference`

#### Prêt-à-développer

- ✅ Démarre sans erreur (`pnpm dev` — Vite préconfigurée)
- ✅ Un développeur peut ajouter un module dans `src/features/` ou `src/pages/` sans toucher aux fondations
- ⚠️ **Routing** : le catalogue utilise `window.location.hash` avec un pattern `#/c/{slug}` implémenté manuellement dans `CatalogPage.tsx`. Il n'y a pas de React Router ou Tanstack Router. Pour un starter de démonstration, c'est délibéré et léger, mais un vrai projet nécessiterait un router. La checklist demandait "le routing est-il préconfiguré selon les best practices officielles du framework" — réponse : **non, intentionnellement**.
- ⚠️ **State management** : contexte React uniquement (theme, toast). Pas de Zustand/Jotai/etc. Délibéré et documenté dans `ARCHITECTURE.md`.
- ⚠️ **Fetching** : aucun. Pas de TanStack Query ni SWR. Attendu pour un starter composants.
- ✅ `src/core/`, `src/infrastructure/`, `src/ui/`, `src/pages/`, `src/app/` — structure clean architecture démontrée
- ⚠️ **`src/features/` et `src/shared/` absents** : couches documentées dans `ARCHITECTURE.md` comme zones à créer lors du développement d'une vraie application. Absents dans le starter actuel (starter = catalogue, pas une app).

#### Clean Architecture

- ✅ `core/` : aucun import React ni DOM (`theme.ts`, `notification.ts` sont du TypeScript pur)
- ✅ `infrastructure/` implémente les ports définis dans `core/`
- ✅ `ui/` dépend de `core`, jamais de `infrastructure`
- ✅ `app/App.tsx` est le seul point d'instanciation de l'infrastructure concrète
- ✅ Règle de dépendance respectée : `app → pages → ui → core ← infrastructure`
- ⚠️ **`BandaForm.tsx` importe `FormContext` depuis `ui/forms/useForm`** : crée un couplage entre la couche `components/banda/form/` et la couche `forms/`. Acceptable (BandaForm est la colle des deux systèmes), mais à noter.

#### Clean Code

- ✅ Nommage expressif partout — pas de `data`, `item`, `handleClick` génériques
- ✅ Chaque fichier a une responsabilité unique
- ✅ Zéro `console.log` de debug — vérifié par grep
- ✅ TypeScript strict (`"strict": true`, `noUnusedLocals`, `noUnusedParameters`)
- ⚠️ **`as unknown as RefObject<HTMLDivElement>`** dans `starters/_reference/src/ui/components/banda/select/models/multi-select.tsx:138` — seul `as unknown` de toute la codebase, à corriger proprement
- ⚠️ **`key={index}`** dans `BandaStepper` (mineur)

#### Patterns idiomatiques React 19

- ✅ `ComponentPropsWithRef<'...'>` (idiome React 19, sans `forwardRef`)
- ✅ Hooks custom (`useTheme`, `useToast`, `useAnchoredDropdown`, `useSmartField`, `useStepper`)
- ✅ Context + Provider (`ThemeProvider`, `BandaToastProvider`, `FormContext`, `TabsContext`, `MenuContext`, `RadioGroupContext`)
- ✅ Compound components (`BandaCard.*`, `BandaTable.*`, `BandaTabs.Panel`, `BandaDropdownMenu.*`)
- ✅ Lazy init de `useState` (`ThemeProvider`, `BandaTextarea`)
- ✅ Mémoïsation (`useMemo`/`useCallback`) dans les providers
- ✅ Ports & Adapters (`ThemeStoragePort`)
- ✅ Composition root unique (`app/App.tsx`)

---

### AXE 4 — Monorepo et infrastructure

- ✅ `pnpm-workspace.yaml` couvre `packages/*` et `starters/*`
- ✅ `turbo.json` : pipeline `build → test/lint/typecheck`, `dev` non caché et persistant, `dependsOn: ["^build"]` pour l'ordre correct
- ✅ Dépendances internes en workspace protocol : `"@banda/tokens": "workspace:*"`, `"@banda/tailwind": "workspace:*"`, `"@banda/fields": "workspace:*"`
- ✅ `package.json` avec `name`, `version`, `exports` corrects pour les 3 packages
- ❌ **Pas de `tsconfig.base.json` racine** : la checklist de l'audit demandait "un seul tsconfig.base.json à la racine, étendu par chaque package/starter". Aujourd'hui chaque package a son propre tsconfig indépendant. Cela fonctionne, mais la cohérence TypeScript inter-packages n'est pas garantie par héritage.
- ⚠️ **ESLint non partagé à la racine** : seul `starters/_reference` a un `eslint.config.js`. `packages/banda-fields` a un script `typecheck` mais pas d'ESLint. `packages/banda-tailwind` et `packages/banda-tokens` n'ont ni tsconfig ni ESLint (fichiers `.js` — acceptable).
- ⚠️ **`@banda/fields` exporte du TypeScript source** : `package.json#exports: { ".": "./src/index.ts" }`. Cela fonctionne avec Vite (bundler qui transpile TS), mais n'est pas standard — les outils qui ne transpilent pas (Jest sans transform, Node.js direct) ne peuvent pas consommer ce package sans configuration supplémentaire. Il manque un step de build ou une alternative.
- ✅ `prettier` configuré à la racine (`.prettierrc.json`) et partagé

---

## PHASE 3 — Rapport de décision

### ✅ Ce qui est conforme à la vision Banda

**Design tokens**
- `tokens.json` : source de vérité unique, deux couches (primitives/sémantiques), dark mode, identité culturelle punu (ocre + forêt)
- Build sans dépendances : génère CSS + JS + dts + JSON résolu depuis le JSON source
- Exports corrects (`.`, `./css`, `./base.css`, `./tokens.json`)
- Alias `{primitive.color.X}` → `var(--banda-color-X)` en CSS

**Preset Tailwind**
- Couleurs sémantiques uniquement (pas les primitives brutes) via `var(--banda-color-*)`
- Keyframes dans le preset (`banda-ripple`, `banda-shimmer`, `banda-heartbeat`, `banda-bounce-subtle`, `banda-pulse-ring`, `banda-slide-up`, `banda-zoom-in`) — jamais dans les composants
- Spacing, radii, shadows, z-index, motion depuis les tokens

**banda-fields**
- Pipeline DRY complet : `sanitize → format → finalize → Zod`
- 12 specs + `makePhoneSpec` factory + registre `fieldSpecs`
- Logique purement TypeScript, zéro dépendance framework
- 15 pays africains avec masques de saisie dédiés

**Starter _reference**
- Architecture clean rigoureuse (`core/infrastructure/ui/pages/app`)
- Inversion de dépendances : `ThemeStoragePort` + adaptateur localStorage
- 100 % icônes Lucide, sans exception
- Zéro valeur Tailwind arbitraire (`w-[...]`, etc.) dans tout le code source
- Dark mode exclusivement via `data-theme` → CSS variables
- Sanitize par défaut sur `BandaInput` et `BandaTextarea`
- Accesibilité : `aria-invalid`, `aria-current`, `aria-live`, `aria-label` sur tous les éléments critiques
- TypeScript strict + `noUnusedLocals` + `noUnusedParameters`
- Patterns React 19 idiomatiques (`ComponentPropsWithRef`, compound components, lazy init, mémoïsation)
- `BandaForm` gère les deux régimes (FormApi Zod + FormData natif)
- Smart fields DRY : 12 composants = 12 lignes dans `fields.ts`
- Catalogue vivant (`registry.tsx`) reflétant l'état réel de livraison
- `tailwind.config.ts` = preset uniquement + content — parfaitement minimal
- Zéro `console.log` de debug dans le code source

### ⚠️ Ce qui est partiellement conforme

| Point | Ce qui manque | Effort |
|---|---|---|
| **preset.js sans fontWeight/lineHeight/letterSpacing** | Ajouter `extend.fontWeight`, `extend.lineHeight`, `extend.letterSpacing` depuis `tokens.primitive.font` | 1h : preset + mise à jour des classes dans les composants (font-medium → font-banda-medium…) |
| **Token `danger-active` manquant** | Ajouter `danger-active` dans `tokens.json` semantic light + dark | 30min : tokens + BandaButton variante danger |
| **Tokens `success-contrast`, `warning-contrast`, `info-contrast` manquants** | Ajouter les 3 tokens × 2 thèmes, corriger `BandaCheckbox` | 1h |
| **`BandaTextarea` duplique `VARIANT`** | Extraire la map VARIANT de `field-control.ts` ou la réimporter | 30min |
| **`BandaDropdownMenu` items : `focus:` au lieu de `focus-visible:`** | Remplacer `focus:bg...` et `focus:outline-none` par `focus-visible:` | 15min |
| **`as unknown as RefObject<...>` dans multi-select.tsx** | Typer correctement `triggerRef` selon le vrai type retourné par `useAnchoredDropdown` | 30min |
| **`_shared/sanitize-events.ts` non utilisé** | Vérifier si c'est un vestige (à supprimer) ou s'il doit être utilisé | 15min |
| **`@banda/fields` exporte TS source** | Ajouter un build step (tsc ou tsup) ou documenter la contrainte bundler | 2h |
| **ESLint non partagé à la racine** | Créer `eslint.config.js` racine hérité dans `banda-fields` | 1h |
| **Routing hash manuel dans CatalogPage** | Décision produit : rester hash ou introduire un mini-router (React Router) | 4h si router complet |
| **`key={index}` dans BandaStepper** | Utiliser un identifiant stable (label stringifié ou index si les steps ne bougent pas) | 15min |
| **`index.d.ts` trop permissif** | Générer les types depuis le JSON avec assertion `as const` | 2h |

### ❌ Ce qui n'est pas conforme

| Point | Écart | Action corrective |
|---|---|---|
| **`<output>` pour les items toast** (`BandaToast.tsx:89`) | `<output>` est sémantiquement incorrect (prévu pour résultats de formulaire). La spec Banda indique `<aside role=status>` pour le container. Les items individuels doivent être `<div role="status">` (auto-fermants) ou `<article>` avec `aria-live="polite"`. | Remplacer `<output>` par `<div role="status">` dans `BandaToast.tsx` |
| **Pas de `tsconfig.base.json` racine** | La checklist de l'audit demandait un tsconfig de base racine hérité par tous les packages/starters. Actuellement chaque package a son tsconfig indépendant, sans héritage commun. | Créer `tsconfig.base.json` à la racine avec les options communes ; faire étendre chaque tsconfig |

### 🗑️ Ce qui doit être supprimé

| Élément | Raison |
|---|---|
| `starters/react/` (dossier vide) | Le starter React **est** `starters/_reference`. Un dossier `react/` vide crée une confusion sur la nomenclature (quelle est la différence ?). S'il anticipe un futur portage distinct, le créer quand il démarrera vraiment. |
| `_shared/sanitize-events.ts` (à confirmer) | Si les composants Banda v2 ne l'utilisent plus, c'est un vestige du système précédent. Vérifier avant suppression. |

---

## Plan de correction priorisé

### P0 — Bloquant (conformité sémantique ou cohérence fondamentale)

| Action | Fichier(s) concerné(s) |
|---|---|
| Remplacer `<output>` par `<div role="status">` dans les items toast | `starters/_reference/src/ui/components/banda/toast/BandaToast.tsx:89` |
| Créer `tsconfig.base.json` racine + faire étendre chaque tsconfig de packages/starters | `banda/tsconfig.base.json` (nouveau) + `packages/banda-fields/tsconfig.json` + `starters/_reference/tsconfig.json` |
| Supprimer `starters/react/` | `banda/starters/react/` |

### P1 — Important (affecte la cohérence du design system ou la librairie)

| Action | Fichier(s) concerné(s) |
|---|---|
| Mapper `fontWeight`, `lineHeight`, `letterSpacing` dans le preset | `packages/banda-tailwind/preset.js` |
| Ajouter token `danger-active` (light + dark) + mettre à jour BandaButton | `packages/banda-tokens/src/tokens.json` + `starters/_reference/src/ui/components/banda/button/BandaButton.tsx` |
| Ajouter tokens `success-contrast`, `warning-contrast`, `info-contrast` (light + dark) + corriger BandaCheckbox | `packages/banda-tokens/src/tokens.json` + `starters/_reference/src/ui/components/banda/checkbox/BandaCheckbox.tsx` |
| Éliminer la duplication de `VARIANT` dans BandaTextarea | `starters/_reference/src/ui/components/banda/textarea/BandaTextarea.tsx` + `_shared/field-control.ts` |
| Remplacer `focus:` par `focus-visible:` dans les items DropdownMenu | `starters/_reference/src/ui/components/banda/dropdown-menu/BandaDropdownMenu.tsx` |
| Corriger `as unknown as RefObject<HTMLDivElement>` | `starters/_reference/src/ui/components/banda/select/models/multi-select.tsx:138` |
| Clarifier ou supprimer `_shared/sanitize-events.ts` | `starters/_reference/src/ui/components/banda/_shared/sanitize-events.ts` |

### P2 — Amélioration (qualité, DX, cohérence à long terme)

| Action | Fichier(s) concerné(s) |
|---|---|
| Ajouter un build step à `@banda/fields` (ou documenter la contrainte bundler) | `packages/banda-fields/package.json` + nouveau `packages/banda-fields/tsconfig.build.json` |
| Créer un `eslint.config.js` racine partagé pour les packages TS | `banda/eslint.config.js` (nouveau) |
| Typer `tokens` de façon structurelle dans `dist/index.d.ts` | `packages/banda-tokens/scripts/build.mjs` |
| Corriger `key={index}` dans BandaStepper | `starters/_reference/src/ui/components/banda/stepper/BandaStepper.tsx` |
| Documenter explicitement la séparation atoms/molecules/organisms dans `atom-architecture.md` | `banda/docs/atom-architecture.md` |
| Décider si BandaRadio doit avoir un token pour l'épaisseur du point coché (vs `border-4` built-in) | `packages/banda-tokens/src/tokens.json` + `BandaRadio.tsx` |

---

---

## Statut des corrections

### P0 — Bloquant ✅ Tout corrigé

| Action | Statut | Détail |
|---|---|---|
| `<output>` → `<div role="status">` dans BandaToast | ✅ | `BandaToast.tsx` : chaque item est maintenant `<div role="status" aria-live="polite" aria-atomic="true">` |
| `tsconfig.base.json` racine + héritage | ✅ | `banda/tsconfig.base.json` créé ; `packages/banda-fields/tsconfig.json` et `starters/_reference/tsconfig.json` l'étendent. `baseUrl` deprecated retiré de `_reference`. |
| Suppression `starters/react/` | ✅ | Dossier vide supprimé |

### P1 — Important ✅ Tout corrigé

| Action | Statut | Détail |
|---|---|---|
| `fontWeight` / `lineHeight` / `letterSpacing` dans `preset.js` | ✅ | `extend.fontWeight`, `extend.lineHeight`, `extend.letterSpacing` ajoutés depuis `tokens.primitive.font` |
| Token `danger-active` + BandaButton | ✅ | `tokens.json` : light `red.900`, dark `red.300`. `BandaButton.tsx` : variante danger → `active:bg-banda-danger-active` |
| Tokens `success/warning/info-contrast` + BandaCheckbox | ✅ | 3 tokens × 2 thèmes ajoutés dans `tokens.json`. `BandaCheckbox.tsx` : icônes check/minus utilisent `text-banda-{color}-contrast` |
| Duplication `VARIANT` dans BandaTextarea | ✅ | `field-control.ts` exporte `CONTROL_VARIANT`. `BandaTextarea.tsx` l'importe, variable locale retirée |
| `focus:` → `focus-visible:` dans BandaDropdownMenu | ✅ | `ITEM_BASE` : `focus-visible:outline-none focus-visible:bg-banda-surface-muted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-banda-focus-ring` |
| `as unknown as RefObject<HTMLDivElement>` dans multi-select | ✅ | `useAnchoredDropdown` rendu générique sur `<List, Trigger>`. Appel dans multi-select : `useAnchoredDropdown<HTMLUListElement, HTMLDivElement>()`. Cast `as unknown` retiré, import `RefObject` retiré. |
| `_shared/sanitize-events.ts` — vestige ? | ✅ | Confirmé actif : importé par 4 fichiers (`editable-label.tsx`, `misc-inputs.tsx`, `addon-inputs.tsx`, `decorated-textareas.tsx`). Aucun changement nécessaire. |

### P2 — Amélioration ✅ Tout traité

| Action | Statut | Détail |
|---|---|---|
| Build step `@banda/fields` | ✅ | `tsconfig.build.json` créé (`rewriteRelativeImportExtensions: true` pour réécrire `.ts` → `.js`). `package.json` : script `build`, exports `types/default` vers `dist/`. Dist généré. |
| ESLint config racine | ✅ | `banda/eslint.config.js` créé (flat config, couvre `packages/**`). Root `package.json` : deps ESLint ajoutées. `@banda/fields/package.json` : script `lint` ajouté. |
| Typage `tokens` dans `dist/index.d.ts` | ✅ | Template `dts` dans `build.mjs` remplacé : `primitive` passe de `Record<string, unknown>` à un type structurel complet (`color`, `font`, `space`, `radius`, `shadow`, `z`, `motion`). Rebuild lancé → dist régénéré avec les nouveaux tokens. |
| `key={index}` dans BandaStepper | Décision | `key={index}` est intentionnel : les étapes d'un stepper sont positionnelles, jamais réordonnées dynamiquement. L'index **est** l'identifiant stable. Aucun changement de code. |
| Classification atoms/molecules/organisms | ✅ | Tableau de classification ajouté dans `docs/atom-architecture.md` (Atome / Atome de champ / Molécule / Organisme) |
| Token pour `border-4` dans BandaRadio | Décision | `checked:border-4` est une constante structurelle de la technique "inset ring" (border épaisse sur `appearance-none` = point radio). Ce n'est pas un token sémantique de thème. Aucun changement de code. |

### Rebuild tokens

Les nouvelles entrées sémantiques (`danger-active`, `success-contrast`, `warning-contrast`, `info-contrast`) sont présentes dans tous les artefacts dist :
- `dist/index.js` — 36 alias light + 36 dark (était 32)
- `dist/banda.css` — variables CSS custom properties regenerées
- `dist/index.d.ts` — types structurels améliorés
- `dist/tokens.resolved.json` — JSON résolu mis à jour

*Audit clôturé — toutes les actions correctives P0/P1/P2 ont été appliquées.*
