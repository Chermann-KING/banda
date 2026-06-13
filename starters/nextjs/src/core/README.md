# core/

Logique métier pure. Aucune dépendance React, aucune dépendance d'infrastructure.

Ce qui vit ici :
- **Entités** : types et interfaces représentant les concepts métier
- **Ports** : interfaces (contrats) que l'infrastructure doit implémenter
- **Règles métier** : fonctions pures sans effets de bord

## Règle absolue

`core/` n'importe **rien** depuis d'autres couches de ce projet.
Seules les dépendances npm tierces (ex: `zod`) sont autorisées.

```ts
// ✅ OK — dépendance npm tierce
import { z } from 'zod';

// ❌ Interdit — toute autre couche du projet
import { storage } from '@/infrastructure/storage';
```
