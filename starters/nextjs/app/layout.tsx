import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Providers } from './Providers';
import '@banda/tokens/css';
import '@banda/tokens/base.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Banda — Starter Next.js',
  description: 'Starter Next.js du design system Banda',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
