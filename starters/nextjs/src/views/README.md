# views/

Écrans de l'application. Chaque vue assemble des features et des composants UI.

> Nommé `views/` plutôt que `pages/` pour éviter le conflit avec le répertoire
> `pages/` du Pages Router de Next.js. Cette couche correspond à la couche
> "pages" du modèle Banda.

## Règle

Une vue ne contient **pas** de logique métier — elle orchestre des features.

```ts
// ✅ OK — la vue assemble
export function UserProfileView() {
  return (
    <PageLayout>
      <UserProfileFeature />
      <UserActivityFeature />
    </PageLayout>
  );
}
```

## Règles d'import

`views/` peut importer depuis `ui/`, `shared/`, `core/`, et `features/`.

```ts
// ❌ Interdit
import { localStorageAdapter } from '@/infrastructure/storage'; // infrastructure est instanciée dans app/
```
