/**
 * Preset Tailwind partagé — UNIQUE source des classes utilisées par les
 * composants Banda. Chaque starter l'étend via `presets: [bandaPreset]`.
 *
 * Règles :
 * - les couleurs n'exposent QUE la couche sémantique, en var(--banda-color-*) :
 *   le theming light/dark reste piloté par le CSS des tokens, pas par Tailwind ;
 * - spacing/radii/shadows/fonts/z/motion viennent des primitives résolues ;
 * - aucune valeur arbitraire dans les composants (pas de w-[347px]).
 */
import { tokens } from '@banda/tokens';

const semanticColorNames = Object.keys(tokens.semantic.light.color);

const colors = Object.fromEntries(
  semanticColorNames.map((name) => [`banda-${name}`, `var(--banda-color-${name})`]),
);

/** @type {import('tailwindcss').Config} */
const bandaPreset = {
  theme: {
    extend: {
      colors,
      fontFamily: {
        sans: tokens.primitive.font.family.sans.split(',').map((f) => f.trim()),
        mono: tokens.primitive.font.family.mono.split(',').map((f) => f.trim()),
      },
      fontSize: { ...tokens.primitive.font.size },
      fontWeight: { ...tokens.primitive.font.weight },
      lineHeight: { ...tokens.primitive.font['line-height'] },
      letterSpacing: { ...tokens.primitive.font['letter-spacing'] },
      spacing: { ...tokens.primitive.space },
      borderRadius: { ...tokens.primitive.radius },
      boxShadow: { ...tokens.primitive.shadow },
      zIndex: { ...tokens.primitive.z },
      transitionDuration: { ...tokens.primitive.motion.duration },
      transitionTimingFunction: { ...tokens.primitive.motion.easing },
      ringColor: { 'banda-focus-ring': 'var(--banda-color-focus-ring)' },
      /* Animations du design system — partagées par tous les modèles animés. */
      keyframes: {
        'banda-ripple': {
          '0%': { transform: 'scale(0)', opacity: '0.35' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        'banda-shimmer': {
          '0%': { transform: 'translateX(-150%) skewX(-12deg)' },
          '100%': { transform: 'translateX(350%) skewX(-12deg)' },
        },
        'banda-heartbeat': {
          '0%, 28%, 70%, 100%': { transform: 'scale(1)' },
          '14%, 42%': { transform: 'scale(1.08)' },
        },
        'banda-bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25%)' },
        },
        'banda-pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 var(--banda-color-focus-ring)' },
          '100%': { boxShadow: '0 0 0 0.75rem transparent' },
        },
        'banda-slide-up': {
          '0%': { opacity: '0', transform: 'translateY(0.5rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'banda-zoom-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'banda-ripple': `banda-ripple 600ms ${tokens.primitive.motion.easing.standard} forwards`,
        'banda-shimmer': 'banda-shimmer 2.5s linear infinite',
        'banda-heartbeat': 'banda-heartbeat 1.4s ease-in-out infinite',
        'banda-bounce-subtle': 'banda-bounce-subtle 0.6s ease-in-out infinite',
        'banda-pulse-ring': 'banda-pulse-ring 1.2s ease-out infinite',
        'banda-slide-up': `banda-slide-up 200ms ${tokens.primitive.motion.easing.standard}`,
        'banda-zoom-in': `banda-zoom-in 200ms ${tokens.primitive.motion.easing.standard}`,
      },
    },
  },
};

export default bandaPreset;
