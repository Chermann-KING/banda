# @banda/tokens

Source de vérité unique du design system Banda.

## Architecture en deux couches

1. **Primitives** (`primitive.*`) : palettes brutes (`ochre`, `forest`, `neutral`…), échelles de
   typo, spacing, radii, shadows. Jamais consommées directement par un composant.
2. **Sémantiques** (`semantic.light` / `semantic.dark`) : alias d'intention
   (`color-background`, `color-primary`, `color-danger`…). **Seule couche autorisée dans les
   composants** — c'est elle qui rend le theming light/dark possible sans toucher aux composants.

## Consommation

```css
/* CSS — dans n'importe quel starter */
@import '@banda/tokens/css';      /* variables */
@import '@banda/tokens/base.css'; /* reset minimal optionnel */

.button {
  background: var(--banda-color-primary);
  border-radius: var(--banda-radius-md);
  padding: var(--banda-space-2) var(--banda-space-4);
}
```

```ts
// TypeScript — pour l'outillage ou les styles dynamiques
import { tokens, cssVar } from '@banda/tokens';

cssVar('color-primary'); // 'var(--banda-color-primary)'
tokens.semantic.light.color.primary; // '#A66F1F'
```

## Thème dark

Trois mécanismes, par ordre de priorité :

1. `<html data-theme="dark">` — choix explicite de l'utilisateur ;
2. `<html data-theme="light">` — idem ;
3. sans attribut, `prefers-color-scheme` du système s'applique.

## Build

```bash
pnpm --filter @banda/tokens build   # src/tokens.json → dist/
pnpm --filter @banda/tokens test    # vérifie les sorties générées
```

Le build est un script Node sans dépendance (`scripts/build.mjs`).
Pour modifier un token : éditer `src/tokens.json` uniquement, jamais `dist/`.
