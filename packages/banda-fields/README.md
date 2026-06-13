# @banda/fields

Intelligence des champs du design system Banda — **framework-agnostic**, validée par **Zod**.

## Le principe DRY : `FieldSpec`

Toute l'intelligence d'un type de champ est déclarée **une seule fois** :

```ts
export const firstNameSpec = defineFieldSpec({
  id: 'first-name',
  type: 'text',
  autoComplete: 'given-name',
  maxLength: 50,
  counter: true,
  sanitize: sanitizeName, // pendant la frappe : retire l'illégal
  format: formatTitleCase, // pendant la frappe : Hermann
  finalize: collapseWhitespace, // au blur : trim, espaces multiples
  schema: z.string().min(2).max(50).regex(NAME_PATTERN), // validation Zod
});
```

Chaque starter (React, Vue, Svelte…) consomme ces specs et n'écrit **que le rendu**.
Côté React : `createSmartField(firstNameSpec)` → composant complet en une ligne.

## Contenu

| Module           | Rôle                                                                                                                                                                   |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sanitize.ts`    | Sanitizers (anti-injection, jeux de caractères) et formatters (title case, milliers, masques)                                                                          |
| `specs/specs.ts` | Registre : `firstName`, `lastName`, `email`, `password`, `city`, `street`, `houseNumber`, `date`, `birthDate`, `amount`, `url`, `otp`, `search` + `makePhoneSpec(iso)` |
| `phone/`         | 15 pays africains (Gabon par défaut), masques par pays, E.164                                                                                                          |
| `password.ts`    | Force de mot de passe (score 0–4 + critères)                                                                                                                           |

## Cycle de vie d'une saisie

```
frappe  → sanitize(raw)   retire les caractères interdits
        → format(value)   met en forme en temps réel
blur    → finalize(value) normalise (trim, https://…)
        → schema.parse    valide (Zod) → message d'erreur français
```

## Build

```bash
pnpm --filter @banda/fields build   # src/ → dist/ (tsc)
pnpm --filter @banda/fields test    # node --experimental-strip-types --test
```

Le package compile vers `dist/` via `tsc -p tsconfig.build.json`.
Les exports pointent vers `dist/index.js` (types : `dist/index.d.ts`).
Pour modifier la logique : éditer `src/` uniquement, puis rebuilder.

## Composer un schéma de formulaire

```ts
import { z } from 'zod';
import { fieldSpecs, makePhoneSpec } from '@banda/fields';

const registrationSchema = z.object({
  firstName: fieldSpecs.firstName.schema,
  email: fieldSpecs.email.schema,
  phone: makePhoneSpec('GA').schema,
});
```
