import type { Config } from 'tailwindcss';
import bandaPreset from '@banda/tailwind';

const config: Config = {
  presets: [bandaPreset as Config],
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '../../packages/banda-react/src/**/*.{ts,tsx}',
  ],
};

export default config;
