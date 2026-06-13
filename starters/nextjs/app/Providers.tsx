'use client';

import { useMemo } from 'react';
import type { ReactNode } from 'react';
import { createLocalStorageThemeAdapter } from '@/infrastructure/storage/local-storage-theme.adapter';
import { SuspenseBoundary } from '@/shared/components';
import { ThemeProvider, BandaToastProvider } from '@/ui';

export function Providers({ children }: { children: ReactNode }) {
  const themeStorage = useMemo(() => createLocalStorageThemeAdapter(), []);

  return (
    <ThemeProvider storage={themeStorage}>
      <BandaToastProvider>
        <SuspenseBoundary>{children}</SuspenseBoundary>
      </BandaToastProvider>
    </ThemeProvider>
  );
}
