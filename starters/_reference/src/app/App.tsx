import { createLocalStorageThemeAdapter } from '@/infrastructure/storage/local-storage-theme.adapter';
import { ThemeProvider, BandaToastProvider } from '@banda/react';
import { CatalogPage } from '@/pages/catalog/CatalogPage';
import { SuspenseBoundary } from '@/shared/components';

/**
 * Composition root : seul endroit où l'infrastructure concrète
 * est instanciée et injectée dans l'UI.
 */
const themeStorage = createLocalStorageThemeAdapter();

export function App() {
  return (
    <ThemeProvider storage={themeStorage}>
      <BandaToastProvider>
        <SuspenseBoundary>
          <CatalogPage />
        </SuspenseBoundary>
      </BandaToastProvider>
    </ThemeProvider>
  );
}
