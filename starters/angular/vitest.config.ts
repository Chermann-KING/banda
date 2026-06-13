import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vitest-angular';

export default defineConfig({
  plugins: [angular()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/setup-tests.ts'],
    include: ['src/**/*.spec.ts', 'src/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
