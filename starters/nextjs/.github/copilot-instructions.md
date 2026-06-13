# Banda Next.js — Instructions pour GitHub Copilot

Ce starter est un portage Next.js 15 (App Router) du design system Banda.
Toute suggestion doit respecter les règles ci-dessous. En cas de doute, lis `ARCHITECTURE.md`.

---

## 1. Architecture des couches — règle absolue

```
app/ (Next.js) → src/views/ → src/features/ → src/ui/ → src/shared/ → src/core/ ← src/infrastructure/
```

| Couche | Peut importer | Ne peut JAMAIS importer |
|---|---|---|
| `src/core/` | rien d'interne | toutes les autres couches |
| `src/shared/` | `core` | `ui`, `features`, `views`, `infrastructure`, `app` |
| `src/infrastructure/` | `core` | `ui`, `features`, `views`, `shared`, `app` |
| `src/ui/` | `core`, `shared` | `features`, `views`, `infrastructure`, `app` |
| `src/features/` | `ui`, `shared`, `core` | autres features (sauf leur index.ts), `views`, `infrastructure`, `app` |
| `src/views/` | `ui`, `shared`, `core`, `features` | `infrastructure`, `app` |
| `app/` | tout | — |

> `src/views/` = couche "pages" Banda (renommée pour éviter le conflit Next.js Pages Router).

**Violation = erreur ESLint bloquante.** Ne jamais contourner avec `// eslint-disable`.

---

## 2. Next.js App Router — règles obligatoires

- `'use client'` en tête de tout fichier qui utilise des hooks ou des APIs browser.
- Ne jamais appeler `window` / `document` dans un `useState(() => ...)` initializer ou au niveau module — toujours dans `useEffect`.
- Les portals (`createPortal`) doivent être gardés par un état `mounted` initialisé à `false` et mis à `true` dans `useEffect`.
- `app/layout.tsx` importe `@banda/tokens/css` et `@banda/tokens/base.css` pour les CSS variables.

---

## 3. Design tokens — règle absolue

- **Toutes** les valeurs visuelles passent par les classes Tailwind du preset `@banda/tailwind`.
- **Zéro** classe arbitraire Tailwind : pas de `w-[347px]`, `text-[#ff0000]`, `p-[13px]`.
- Classes Banda : `bg-banda-primary`, `text-banda-text-muted`, `rounded-md`.
- Dark mode exclusivement via `data-theme` → CSS custom properties. Zéro `dark:` Tailwind.

---

## 4. Icônes — règle absolue

- **Uniquement** `lucide-react`. Zéro SVG inline, zéro emoji fonctionnel, zéro autre librairie.
- Toute icône décorative porte `aria-hidden="true"`.
- Tout bouton icône sans texte visible porte `aria-label="…"`.

---

## 5. Composants React 19

- `ref` passé directement comme prop — **zéro** `forwardRef()`.
- Providers : `<MyContext value={…}>` — **zéro** `<MyContext.Provider>`.
- Typage : `ComponentPropsWithRef<'element'>` pour étendre un élément HTML.
- Props types : interface nommée `[ComponentName]Props` dans le même fichier.
- **Zéro** class component, `defaultProps`, `PropTypes`.

---

## 6. Sanitize & formulaires

- Tout `<input>` et `<textarea>` de saisie texte utilise `sanitize={true}` (défaut Banda).
- Exception documentée : `type="password"` — jamais altéré.
- Smart fields : utiliser `createSmartField(fieldSpecs.X)` pour les champs récurrents.
- Validation : Zod uniquement via `useForm(schema)`.

---

## 7. Composants Banda — patterns

- Un composant = un dossier dans `src/ui/components/banda/{nom}/`.
- Structure obligatoire : `Banda{Nom}.tsx` (`'use client'`) + `index.ts` + `models/` (optionnel).
- Les modèles composent le composant de base — **jamais** le dupliquer.
- Préfixe `Banda` obligatoire. Extend l'élément HTML natif : `extends ComponentPropsWithRef<'button'>`.

---

## 8. TypeScript

- `strict: true` + `exactOptionalPropertyTypes: true` — pas d'exception.
- **Zéro** `any`, `as unknown`, `@ts-ignore`, `@ts-expect-error` sans commentaire justificatif.
- `import type { … }` obligatoire pour les types (`verbatimModuleSyntax`).
- Props optionnelles : toujours `prop?: Type | undefined`.

---

## 9. Clean code

- Zéro `console.log/warn/error` de debug.
- Zéro `TODO` sans référence de ticket.
- Nommage : booléens en `is/has/can/should`, fonctions en verbes d'action.
