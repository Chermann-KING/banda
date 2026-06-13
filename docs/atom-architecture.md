# Architecture d'un atome Banda

Pattern **obligatoire et répliqué** pour chaque élément atomique (puis adapté
aux blocs). Référence d'étendue : shadcn/studio (plusieurs modèles par famille).

## Structure (starter React, transposable à chaque framework)

```
src/ui/components/banda/
├── _shared/                    # privé : classes de contrôle, footer de champ
├── button/
│   ├── BandaButton.tsx         # composant de base (variant / size / états)
│   ├── models/
│   │   ├── static-models.tsx   # compositions : IconButton, SocialButton, CounterButton…
│   │   └── animated-models.tsx # animés : RippleButton, ShimmerButton, MagneticButton…
│   └── index.ts                # exports sélectifs du dossier
├── input/
│   ├── BandaInput.tsx
│   ├── BandaInput.test.tsx
│   └── index.ts                # (models/ viendra avec les variantes avancées)
├── select/ · textarea/ · label/ · checkbox/ · radio/ · switch/ …
```

## Règles du pattern

1. **Un dossier par atome**, nommé d'après l'élément HTML de base.
2. **`index.ts` à la racine du dossier** : on importe un modèle précis sans
   connaître l'arborescence interne — `import { RippleButton } from '@/ui'`
   ou `from '@/ui/components/banda/button'`.
3. **Un modèle = une intention d'usage**, construit en composant le composant
   de base (jamais en le dupliquant). Props du base toujours transmises.
4. **Les animations appartiennent au design system** : keyframes et
   `animation` déclarées dans `@banda/tailwind` (`banda-ripple`,
   `banda-shimmer`, `banda-heartbeat`, `banda-bounce-subtle`,
   `banda-pulse-ring`), jamais dans un starter. Chaque starter les consomme
   via ses classes (`animate-banda-ripple`…).
5. **Couleurs uniquement via tokens** : changer `tokens.json` recolore
   instantanément tous les modèles, animations comprises — c'est la promesse
   du starter (l'utilisateur ne touche qu'aux tokens).
6. Le JS d'un modèle (coordonnées du ripple, attraction magnétique) est de la
   **logique**, pas du style : seules les positions dynamiques passent par
   `style=`, tout le reste par les classes du preset.
7. **Sanitize par défaut sur toute saisie texte** : le composant de base et
   chaque modèle à `<input>` brut passent par `sanitizeOnType`/`sanitizeOnBlur`
   (`_shared/sanitize-events.ts`). Opt-out explicite (`sanitize={false}`) sur le
   composant de base uniquement. Exceptions documentées : mots de passe (saisie
   jamais altérée), champs non-texte (checkbox, radio, switch, file).
8. Chaque modèle apparaît dans la **page catalogue** de l'atome
   (`ModelCell` : rendu + nom), grille façon shadcn/studio.

## Classification des composants

| Tier | Définition | Composants actuels |
|------|-----------|-------------------|
| **Atome** | Un seul élément HTML, aucune dépendance à un autre composant Banda | Badge, Button, Label, Switch |
| **Atome de champ** | Contrôle de formulaire natif enrichi par les tokens (Input, etc.) | Input, Textarea, Checkbox, Radio, Select |
| **Molécule** | Composition d'atomes Banda avec logique d'interaction propre | Card, Toast, Tabs, Stepper |
| **Organisme** | Blocs fonctionnels complexes, souvent avec portal/overlay/état riche | Dialog, DropdownMenu, Form, Table |

Règle de promotion : un composant monte de tier dès qu'il *importe* un autre composant Banda
(pas simplement des primitives HTML). La promotion ne change pas le dossier de résidence
mais documente les dépendances dans ce tableau.

## Transposition aux autres starters

Même arborescence par framework (`.vue`, `.svelte`, composant Angular…),
mêmes noms de modèles, mêmes classes du preset partagé : seul le langage de
rendu change. Les keyframes étant dans `@banda/tailwind`, aucun starter ne
redéclare une animation.
