/**
 * Classes partagées des contrôles de formulaire Banda (Input, Select, Textarea).
 * Module PRIVÉ (non exporté du barrel) : garantit l'alignement visuel exigé
 * par la spec — même hauteur, même border, même focus ring pour tous.
 * Toutes les classes proviennent du preset @banda/tailwind ou du core Tailwind.
 */

export type ControlSize = 'sm' | 'md' | 'lg';
export type ControlVariant = 'default' | 'filled' | 'ghost';

const BASE =
  'w-full rounded-md border font-sans text-banda-text outline-none ' +
  'transition-colors duration-fast ' +
  'placeholder:text-banda-text-placeholder ' +
  'focus-visible:border-banda-primary focus-visible:ring-2 focus-visible:ring-banda-focus-ring ' +
  'disabled:cursor-not-allowed disabled:bg-banda-surface-muted ' +
  'disabled:text-banda-text-muted disabled:border-banda-border-muted';

const SIZE: Record<ControlSize, string> = {
  sm: 'h-8 px-2 text-sm',
  md: 'h-10 px-3 text-md',
  lg: 'h-12 px-4 text-lg',
};

export const CONTROL_VARIANT: Record<ControlVariant, string> = {
  default: 'bg-banda-surface border-banda-border hover:border-banda-border-strong',
  filled: 'bg-banda-surface-muted border-transparent hover:border-banda-border',
  ghost: 'bg-transparent border-transparent hover:border-banda-border',
};

const ERROR =
  'border-banda-danger hover:border-banda-danger ' +
  'focus-visible:border-banda-danger focus-visible:ring-banda-danger';

export interface ControlClassOptions {
  size?: ControlSize;
  variant?: ControlVariant;
  invalid?: boolean;
  extra?: string;
}

export function controlClasses({
  size = 'md',
  variant = 'default',
  invalid = false,
  extra,
}: ControlClassOptions): string {
  return [BASE, SIZE[size], CONTROL_VARIANT[variant], invalid && ERROR, extra].filter(Boolean).join(' ');
}
