import type { Config } from 'tailwindcss';
import bandaPreset from '@banda/tailwind';

export default {
  presets: [bandaPreset],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
} satisfies Config;
