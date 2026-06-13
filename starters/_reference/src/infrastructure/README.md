# infrastructure/

Adaptateurs qui implémentent les ports définis dans `core/`.

Ce qui vit ici :
- **Adaptateurs de stockage** : localStorage, sessionStorage, IndexedDB
- **Clients API** : fetch, axios, WebSockets
- **Adaptateurs tiers** : analytics, feature flags, loggers externes

## Règles d'import

`infrastructure/` peut importer uniquement depuis `core/`.
Elle ne connaît ni React, ni les composants UI, ni les features.

```ts
// ✅ OK — implémente un port de core/
import type { StoragePort } from '@/core/ports/storage.port';

// ❌ Interdit
import { useTheme } from '@/ui/theme';
```

## Instanciation

Les adaptateurs sont instanciés **uniquement** dans `app/` (composition root).
Jamais importés directement depuis `features/` ou `pages/`.
