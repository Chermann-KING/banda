# Banda Angular — Instructions pour Claude Code

Ce fichier est lu automatiquement par Claude Code à chaque session.
Contenu identique en substance à `.github/copilot-instructions.md`.

---

## Architecture des couches — règle absolue

```
src/app/ → src/views/ → src/features/ → src/ui/ → src/shared/ → src/core/ ← src/infrastructure/
```

| Couche | Peut importer | Ne peut JAMAIS importer |
|---|---|---|
| `src/core/` | rien d'interne | toutes les autres couches |
| `src/shared/` | `core` | `ui`, `features`, `views`, `infrastructure`, `app` |
| `src/infrastructure/` | `core` | `ui`, `features`, `views`, `shared`, `app` |
| `src/ui/` | `core`, `shared` | `features`, `views`, `infrastructure`, `app` |
| `src/features/` | `ui`, `shared`, `core` | autres features (sauf leur `index.ts`), `views`, `infrastructure`, `app` |
| `src/views/` | `ui`, `shared`, `core`, `features` | `infrastructure`, `app` |
| `src/app/` | tout | — |

**Violation = erreur ESLint bloquante.** Ne jamais contourner avec `// eslint-disable`.

---

## Angular 19 — patterns obligatoires

- **Standalone** : `standalone: true` sur tous les composants. Zéro `NgModule`.
- **Signals** : `signal()`, `computed()`, `effect()` pour l'état UI — jamais `BehaviorSubject`.
- **Inject** : `inject()` dans la classe (field initializer ou constructor) — jamais injection par paramètre constructeur.
- **OnPush** : `ChangeDetectionStrategy.OnPush` obligatoire sur chaque composant.
- **Inputs** : `input()`, `input.required()` — jamais `@Input()`.
- **Outputs** : `output()` — jamais `new EventEmitter`.
- **Sélecteur composant** : `banda-{nom}` (kebab-case, préfixe `banda`).
- **Sélecteur directive** : `banda{Nom}` (camelCase, préfixe `banda`).
- Zéro `*ngIf`, `*ngFor` — utiliser `@if`, `@for`, `@switch` (Angular 17+).

---

## Design tokens — règle absolue

- **Toutes** les valeurs visuelles passent par les classes Tailwind du preset `@banda/tailwind`.
- **Zéro** classe arbitraire : pas de `w-[347px]`, `text-[#ff0000]`, `p-[13px]`.
- Classes Banda : `bg-banda-primary`, `text-banda-text-muted`, `rounded-md`.
- Dark mode exclusivement via `data-theme` → CSS custom properties. **Zéro** `dark:` Tailwind.
- Classes avec `hover:` / `focus-visible:` dans les templates : les écrire dans des méthodes TypeScript qui retournent une string, pas en `[class.hover:...]` (incompatible avec Tailwind JIT).

---

## Icônes — règle absolue

- **Uniquement** `lucide-angular`. Zéro SVG inline, zéro emoji fonctionnel.
- `<lucide-angular [img]="IconName" [size]="16" aria-hidden="true" />`
- Importer l'icône directement : `import { Moon } from 'lucide-angular'` et l'exposer en `protected readonly Moon = Moon`.
- Bouton icône sans texte visible : `aria-label="…"` obligatoire.

---

## TypeScript

- `strict: true` + `exactOptionalPropertyTypes: true` — pas d'exception.
- **Zéro** `any`, `as unknown`, `@ts-ignore`, `@ts-expect-error` sans commentaire justificatif.
- `import type { … }` pour les types purs.
- Props optionnelles : `input<Type | undefined>()` ou `input.required<Type>()`.

---

## Structure d'un composant Banda

```
src/ui/components/banda/{nom}/
├── banda-{nom}.component.ts    composant standalone OnPush
├── index.ts                    interface publique
└── models/                     variantes composées (optionnel)
```

- Sélecteur : `banda-{nom}`.
- Fichier de composant = uniquement le composant (les services vont dans leurs propres fichiers).
- Template inline (`template: \`...\``) pour les composants simples.

---

## Structure d'une feature

```
src/features/{nom}/
├── components/   composants Angular standalone de la feature
├── services/     logique métier + appels API (@Injectable)
├── store/        état local (signals)
├── types/        types internes
└── index.ts      SEULE interface publique
```

Créer via : `pnpm banda:feature {nom}`

---

## Sanitize & formulaires

- Tout `<input>` et `<textarea>` de saisie texte utilise le mécanisme sanitize Banda.
- Exception documentée : `type="password"` — jamais altéré.
- Validation : Zod uniquement (via `@banda/fields`).

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
- [ ] Zéro `@Input()` / `@Output()` — utiliser `input()` / `output()`
- [ ] Zéro `*ngIf` / `*ngFor` — utiliser `@if` / `@for`
- [ ] Zéro `NgModule` — uniquement standalone
