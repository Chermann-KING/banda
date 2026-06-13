# Banda Next.js — Instructions pour Claude Code

Ce fichier est lu automatiquement par Claude Code à chaque session.
Contenu identique en substance à `.github/copilot-instructions.md`.

---

## Architecture des couches — règle absolue

```
app/ (Next.js) → src/views/ → src/features/ → src/ui/ → src/shared/ → src/core/ ← src/infrastructure/
```

| Couche | Peut importer | Ne peut JAMAIS importer |
|---|---|---|
| `src/core/` | rien d'interne | toutes les autres couches |
| `src/shared/` | `core` | `ui`, `features`, `views`, `infrastructure`, `app` |
| `src/infrastructure/` | `core` | `ui`, `features`, `views`, `shared`, `app` |
| `src/ui/` | `core`, `shared` | `features`, `views`, `infrastructure`, `app` |
| `src/features/` | `ui`, `shared`, `core` | autres features (sauf leur `index.ts`), `views`, `infrastructure`, `app` |
| `src/views/` | `ui`, `shared`, `core`, `features` | `infrastructure`, `app` |
| `app/` | tout | — |

> `src/views/` = couche "pages" Banda. Nommée `views/` pour éviter le conflit avec le Pages Router de Next.js.

**Violation = erreur ESLint bloquante.** Ne jamais contourner avec `// eslint-disable`.

---

## Next.js App Router — règles obligatoires

- **`'use client'`** obligatoire sur tout fichier qui utilise des hooks React (`useState`, `useEffect`, `useContext`…) ou des APIs browser (`window`, `document`).
- **Jamais** accéder à `window` ou `document` dans un `useState` initializer ou au niveau module — utiliser `useEffect` pour les APIs browser.
- `app/layout.tsx` = composition root (Providers). `app/page.tsx` = entrée de route.
- `app/Providers.tsx` = client component avec tous les providers React.
- `suppressHydrationWarning` sur `<html>` pour le thème piloté par `data-theme`.

---

## Design tokens — règle absolue

- **Toutes** les valeurs visuelles passent par les classes Tailwind du preset `@banda/tailwind`.
- **Zéro** classe arbitraire : pas de `w-[347px]`, `text-[#ff0000]`, `p-[13px]`.
- Classes Banda : `bg-banda-primary`, `text-banda-text-muted`, `rounded-md`.
- Dark mode exclusivement via `data-theme` → CSS custom properties. **Zéro** `dark:` Tailwind.

---

## Icônes — règle absolue

- **Uniquement** `lucide-react`. Zéro SVG inline, zéro emoji fonctionnel.
- Icône décorative : `aria-hidden="true"` obligatoire.
- Bouton icône sans texte visible : `aria-label="…"` obligatoire.

---

## React 19 — patterns obligatoires

- `ref` passé directement comme prop — **zéro** `forwardRef()`.
- Providers : `<MyContext value={…}>` — **zéro** `<MyContext.Provider>`.
- Typage : `ComponentPropsWithRef<'element'>` pour étendre un élément HTML.
- Props : interface nommée `[ComponentName]Props` dans le même fichier.
- **Zéro** class component, `defaultProps`, `PropTypes`.

---

## TypeScript

- `strict: true` + `exactOptionalPropertyTypes: true` — pas d'exception.
- **Zéro** `any`, `as unknown`, `@ts-ignore`, `@ts-expect-error` sans commentaire justificatif.
- `import type { … }` obligatoire pour les types (`verbatimModuleSyntax` actif).
- Props optionnelles : toujours `prop?: Type | undefined`.

---

## Structure d'un composant Banda

```
src/ui/components/banda/{nom}/
├── Banda{Nom}.tsx    'use client' + composant uniquement
├── index.ts          interface publique
└── models/           variantes composées (optionnel)
```

- Un fichier ne doit exporter **que des composants React** (ou des types).
- Les hooks et utilitaires vont dans leurs propres fichiers (`use{Nom}.ts`, `{nom}-utils.ts`).
- Préfixe `Banda` obligatoire sur le composant de base.
- Extend toujours l'élément HTML natif : `extends ComponentPropsWithRef<'button'>`.

---

## Structure d'une feature

```
src/features/{nom}/
├── components/
├── hooks/
├── services/
├── store/
├── types/
└── index.ts    SEULE interface publique
```

Créer via : `pnpm banda:feature {nom}`

---

## Sanitize & formulaires

- Tout `<input>` et `<textarea>` de saisie texte utilise `sanitize={true}` (défaut Banda).
- Exception documentée : `type="password"` — jamais altéré.
- Validation : Zod uniquement via `useForm(schema)`.

---

## Clean code

- Zéro `console.log/warn/error` de debug.
- Zéro `TODO` sans référence de ticket.
- Nommage : booléens en `is/has/can/should`, fonctions en verbes d'action.

---

## Checklist avant de terminer une tâche

- [ ] `pnpm typecheck` — 0 erreur
- [ ] `pnpm lint` — 0 erreur, 0 warning
- [ ] `pnpm test` — tous les tests passent
- [ ] Zéro import inutilisé
- [ ] Zéro valeur Tailwind arbitraire
- [ ] Zéro `Context.Provider` — utiliser `<Context value={…}>`
- [ ] Zéro accès `window`/`document` hors `useEffect`
