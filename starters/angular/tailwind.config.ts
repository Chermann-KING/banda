import type { Config } from 'tailwindcss';
import bandaPreset from '@banda/tailwind';

const config: Config = {
  presets: [bandaPreset as Config],
  content: [
    './src/**/*.{ts,html}',
    '../../packages/banda-angular/src/**/*.{ts,html}',
  ],
};

export default config;
