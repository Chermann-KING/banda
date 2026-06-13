# Banda _reference — Instructions pour GitHub Copilot

Ce starter est la **source de vérité** du design system Banda.
Toute suggestion doit respecter les règles ci-dessous. En cas de doute, lis `ARCHITECTURE.md`.

---

## 1. Architecture des couches — règle absolue

```
app → pages → features → ui → shared → core ← infrastructure
```

| Couche | Peut importer | Ne peut JAMAIS importer |
|---|---|---|
| `src/core/` | rien d'interne | toutes les autres couches |
| `src/shared/` | `core` | `ui`, `features`, `pages`, `infrastructure`, `app` |
| `src/infrastructure/` | `core` | `ui`, `features`, `pages`, `shared`, `app` |
| `src/ui/` | `core`, `shared` | `features`, `pages`, `infrastructure`, `app` |
| `src/features/` | `ui`, `shared`, `core` | autres features (sauf leur index.ts), `pages`, `infrastructure`, `app` |
| `src/pages/` | `ui`, `shared`, `core`, `features` | `infrastructure`, `app` |
| `src/app/` | tout | — |

**Violation = erreur ESLint bloquante.** Ne jamais contourner avec `// eslint-disable`.

---

## 2. Design tokens — règle absolue

- **Toutes** les valeurs de couleur, espacement, radius, shadow, z-index, typographie
  passent par les classes Tailwind du preset `@banda/tailwind`.
- **Zéro** classe arbitraire Tailwind : pas de `w-[347px]`, `text-[#ff0000]`, `p-[13px]`.
- Les classes Banda s'écrivent `banda-{token}` : `bg-banda-primary`, `text-banda-text-muted`, `rounded-md`.
- Dark mode exclusivement via `data-theme` → CSS custom properties. Zéro `dark:` Tailwind.

---

## 3. Icônes — règle absolue

- **Uniquement** `lucide-react`. Zéro SVG inline, zéro emoji fonctionnel, zéro autre librairie.
- Toute icône décorative porte `aria-hidden="true"`.
- Tout bouton icône sans texte visible porte `aria-label="…"`.

---

## 4. Composants React 19

- `ref` passé directement comme prop — **zéro** `forwardRef()`.
- Providers : `<MyContext value={…}>` — **zéro** `<MyContext.Provider>`.
- Typage : `ComponentPropsWithRef<'element'>` pour étendre un élément HTML.
- Props types : interface nommée `[ComponentName]Props` dans le même fichier.
- **Zéro** class component, `defaultProps`, `PropTypes`.

---

## 5. Sanitize & formulaires

- Tout `<input>` et `<textarea>` de saisie texte utilise `sanitize={true}` (défaut Banda).
- Exception documentée : `type="password"` — jamais altéré.
- Smart fields : utiliser `createSmartField(fieldSpecs.X)` pour les champs récurrents.
- Validation : Zod uniquement via `useForm(schema)`.

---

## 6. Composants Banda — patterns

- Un composant = un dossier dans `src/ui/components/banda/{nom}/`.
- Structure obligatoire : `Banda{Nom}.tsx` + `index.ts` + `models/` (optionnel).
- Les modèles composent le composant de base — **jamais** le dupliquer.
- `BandaButton`, `BandaInput`, `BandaSelect`, etc. : préfixe `Banda` obligatoire.
- Extend l'élément HTML natif : `extends ComponentPropsWithRef<'button'>`.

---

## 7. TypeScript

- `strict: true` — pas d'exception.
- **Zéro** `any`, `as unknown`, `@ts-ignore`, `@ts-expect-error` sans commentaire justificatif.
- Imports de types : `import type { … }` obligatoire (verbatimModuleSyntax).
- Exports : `export type { … }` pour les types re-exportés.

---

## 8. Clean code

- Zéro `console.log/warn/error` de debug.
- Zéro `TODO` sans référence de ticket.
- Nommage : booléens en `is/has/can/should`, fonctions en verbes d'action.
- Aucune fonction ne dépasse 20 lignes sans commentaire justificatif.
