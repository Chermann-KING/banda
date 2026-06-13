# ui/

Composants React et hooks UI du design system Banda.

## Structure

```
ui/
├── components/banda/   composants Banda (BandaButton, BandaInput…)
├── forms/              logique de formulaire (Form.tsx, champs smart)
├── hooks/              hooks UI (useDialog, useToast…)
└── theme/              provider de thème (ThemeProvider, useTheme)
```

## Règles d'import

`ui/` peut importer depuis `core/` et `shared/` uniquement.

```ts
// ✅ OK
import { SuspenseBoundary } from '@/shared/components';
import type { Theme } from '@/core/theme/theme';

// ❌ Interdit
import { useUserFeature } from '@/features/user'; // features est au-dessus de ui
```

## Structure d'un composant Banda

```
ui/components/banda/{nom}/
├── Banda{Nom}.tsx      composant de base — étend l'élément HTML natif
├── index.ts            interface publique (exports sélectifs)
└── models/             variantes composées (optionnel)
    ├── static-models.tsx
    └── animated-models.tsx
```
