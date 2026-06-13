# pages/

Écrans de l'application. Chaque page assemble des features et des composants UI.

## Règle

Une page ne contient **pas** de logique métier — elle orchestre des features.

```ts
// ✅ OK — la page assemble
export function UserProfilePage() {
  return (
    <PageLayout>
      <UserProfileFeature />
      <UserActivityFeature />
    </PageLayout>
  );
}
```

## Règles d'import

`pages/` peut importer depuis `ui/`, `shared/`, `core/`, et `features/`.

```ts
// ❌ Interdit
import { localStorageAdapter } from '@/infrastructure/storage'; // infrastructure est instanciée dans app/
```
