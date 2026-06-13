/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // @banda/react exporte du TypeScript source — Vite ne le supporte pas
      // via package.json#exports. On pointe directement vers le source.
      '@banda/react': fileURLToPath(new URL('../../packages/banda-react/src/index.ts', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setup-tests.ts'],
    globals: false,
  },
});
