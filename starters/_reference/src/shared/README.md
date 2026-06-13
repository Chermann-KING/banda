# shared/

Utilitaires et composants partagés entre les couches `ui/`, `features/`, et `pages/`.

## Contenu

| Dossier | Rôle |
|---|---|
| `components/` | Composants React transverses : `ErrorBoundary`, `SuspenseBoundary` |
| `hooks/` | Hooks React génériques sans logique métier |
| `utils/` | Fonctions utilitaires pures (formatage, parsing…) |
| `types/` | Types TypeScript partagés entre plusieurs couches |
| `constants/` | Constantes partagées (routes, clés, config UI) |

## Règles d'import

`shared/` peut importer uniquement depuis `core/`.

```ts
// ✅ OK
import type { Theme } from '@/core/theme/theme';

// ❌ Interdit
import { BandaButton } from '@/ui/...'; // ui est au-dessus de shared
```
