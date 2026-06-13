# Design system Banda

## Principes

1. **Source de vérité unique** : tout part de `packages/banda-tokens/src/tokens.json`.
   Les sorties (`banda.css`, exports JS, JSON résolu) sont générées — jamais éditées.
2. **Deux couches de tokens** :
   - *primitives* — palettes brutes (`ochre`, `forest`, `neutral`, `red`, `green`,
     `amber`, `blue`), échelles typo/spacing/radii/shadows/z/motion ;
   - *sémantiques* — alias d'intention (`color-background`, `color-primary`,
     `color-danger-muted`…), seuls autorisés dans les composants.
3. **Theming sans logique composant** : light/dark ne change que la couche
   sémantique, via `[data-theme]` ou `prefers-color-scheme`.
4. **Aucune valeur brute dans les composants** : ni hex, ni px arbitraire — uniquement
   `var(--banda-*)`.

## Identité

La palette s'inspire des teintes terre des arts punu : **ocre** (`primary`),
**vert forêt** (`secondary`), neutres chauds. Les couleurs d'état (succès,
avertissement, danger, info) restent conventionnelles pour l'utilisabilité.

## Référence rapide des variables

| Groupe | Exemples |
| --- | --- |
| Couleurs sémantiques | `--banda-color-background`, `--banda-color-surface`, `--banda-color-text`, `--banda-color-text-muted`, `--banda-color-border`, `--banda-color-primary(-hover/-active/-contrast/-muted)`, `--banda-color-secondary…`, `--banda-color-danger…`, `--banda-color-success…`, `--banda-color-warning…`, `--banda-color-info…`, `--banda-color-focus-ring`, `--banda-color-overlay` |
| Typographie | `--banda-font-family-sans/mono`, `--banda-font-size-xs…5xl`, `--banda-font-weight-regular…bold`, `--banda-font-line-height-tight…relaxed`, `--banda-font-letter-spacing-*` |
| Espacement | `--banda-space-0…24` (échelle 0.25rem) |
| Rayons | `--banda-radius-none/sm/md/lg/xl/full` |
| Ombres | `--banda-shadow-sm/md/lg/xl` |
| Z-index | `--banda-z-dropdown/sticky/overlay/modal/toast` |
| Animation | `--banda-motion-duration-fast/normal/slow`, `--banda-motion-easing-standard/emphasized` |

## Theming

```html
<html data-theme="dark">   <!-- choix explicite -->
<html data-theme="light">  <!-- choix explicite -->
<html>                     <!-- suit prefers-color-scheme -->
```

Contrat appliqué par tous les starters : le `ThemeProvider` (ou équivalent) pose
`data-theme` sur `<html>`, persiste la préférence (`light` / `dark` / `system`)
et la retire en mode `system`.

## Icônes

Toutes les icônes proviennent de **Lucide** (`lucide-react`, `lucide-vue-next`,
`lucide-svelte`, `lucide-angular`, `lucide-static` selon le starter). Jamais
d'emoji ni de glyphe Unicode en guise d'icône. Toujours `aria-hidden="true"`
sur l'icône et un libellé accessible sur l'élément interactif qui la porte.

## Composants socle (contrat commun à tous les starters)

Button (primary/secondary/ghost/danger × sm/md/lg) · Input · Textarea · Select ·
Card (+Header/Body/Footer) · Badge (6 variants) · Modal/Dialog · Toast (4 variants,
durée configurable, persistant possible) · Navbar · Sidebar · Heading/Text/Label ·
ThemeProvider.

## Smart fields (`@banda/fields`)

Chaque type de champ est défini une seule fois par une **FieldSpec** :
sanitisation pendant la frappe, formatage temps réel, normalisation au blur,
validation **Zod** (messages français), attributs HTML (autoComplete, inputMode,
maxLength, placeholder, hint).

Catalogue : `firstName`, `lastName`, `email`, `password` (jauge de force),
`city`, `street`, `houseNumber`, `date`, `birthDate`, `amount`, `url`, `otp`,
`search` + `makePhoneSpec(iso)` (masque par pays, 15 pays africains, Gabon par
défaut, E.164).

Contrat pour chaque starter : consommer les specs telles quelles — ne JAMAIS
redéclarer une règle de champ dans un starter (DRY). Côté React :
`createSmartField(spec)` → composant complet en une ligne.
