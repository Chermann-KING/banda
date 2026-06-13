import type { ComponentPropsWithRef } from 'react';
import { Loader2 } from 'lucide-react';

export type BandaButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
export type BandaButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface BandaButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: BandaButtonVariant;
  size?: BandaButtonSize;
  /** Affiche un Loader2 animé et désactive le bouton. */
  loading?: boolean;
}

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-md font-sans font-medium ' +
  'transition-colors duration-fast cursor-pointer ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring ' +
  'focus-visible:ring-offset-2 ring-offset-banda-background ' +
  'disabled:pointer-events-none disabled:opacity-50';

const VARIANT: Record<BandaButtonVariant, string> = {
  primary:
    'bg-banda-primary text-banda-primary-contrast hover:bg-banda-primary-hover active:bg-banda-primary-active',
  secondary:
    'bg-banda-secondary text-banda-secondary-contrast hover:bg-banda-secondary-hover active:bg-banda-secondary-active',
  outline:
    'border border-banda-border-strong bg-transparent text-banda-text hover:border-banda-primary hover:text-banda-primary',
  ghost: 'bg-transparent text-banda-text hover:bg-banda-surface-muted',
  danger:
    'bg-banda-danger text-banda-danger-contrast hover:bg-banda-danger-hover active:bg-banda-danger-active',
  link: 'bg-transparent text-banda-primary underline-offset-4 hover:underline',
};

const SIZE: Record<BandaButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-md',
  lg: 'h-12 px-6 text-lg',
  /** Bouton carré pour icône seule — exige un aria-label. */
  icon: 'h-10 w-10',
};

/** Étend <button> natif. type="button" par défaut (évite les submits accidentels). */
export function BandaButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  type = 'button',
  disabled,
  className,
  children,
  ...rest
}: BandaButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={[BASE, VARIANT[variant], SIZE[size], className].filter(Boolean).join(' ')}
      {...rest}
    >
      {loading ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}
