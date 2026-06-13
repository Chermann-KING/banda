import { createContext, useContext } from 'react';
import type { NotificationInput } from '@banda/core';

export interface BandaToastContextValue {
  show: (input: NotificationInput) => void;
  dismiss: (id: string) => void;
}

export const BandaToastContext = createContext<BandaToastContextValue | null>(null);

export function useToast(): BandaToastContextValue {
  const context = useContext(BandaToastContext);
  if (context === null) {
    throw new Error('useToast doit être appelé sous <BandaToastProvider>.');
  }
  return context;
}
