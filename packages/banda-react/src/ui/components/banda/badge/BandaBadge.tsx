import type { ComponentPropsWithRef } from 'react';

/**
 * Étend <span>. Grille DRY : tone (sémantique) × fill (solid/soft/outline)
 * — couvre toutes les variantes colorées d'un coup, recolorables par tokens.
 */
export type BandaBadgeTone =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export type BandaBadgeFill = 'solid' | 'soft' | 'outline';
export type BandaBadgeSize = 'sm' | 'md' | 'lg';

export interface BandaBadgeProps extends ComponentPropsWithRef<'span'> {
  tone?: BandaBadgeTone;
  fill?: BandaBadgeFill;
  size?: BandaBadgeSize;
  /** Coins légèrement arrondis au lieu de la pilule. */
  square?: boolean;
}

const BASE =
  'inline-flex items-center gap-1 font-sans font-medium leading-tight whitespace-nowrap';

const SIZE: Record<BandaBadgeSize, string> = {
  sm: 'px-2 text-xs',
  md: 'px-2.5 py-0.5 text-xs',
  lg: 'px-3 py-1 text-sm',
};

const SOLID: Record<BandaBadgeTone, string> = {
  neutral: 'bg-banda-text text-banda-text-inverted',
  primary: 'bg-banda-primary text-banda-primary-contrast',
  secondary: 'bg-banda-secondary text-banda-secondary-contrast',
  success: 'bg-banda-success text-banda-text-inverted',
  warning: 'bg-banda-warning text-banda-text-inverted',
  danger: 'bg-banda-danger text-banda-danger-contrast',
  info: 'bg-banda-info text-banda-text-inverted',
};

const SOFT: Record<BandaBadgeTone, string> = {
  neutral: 'bg-banda-surface-muted text-banda-text-muted',
  primary: 'bg-banda-primary-muted text-banda-primary',
  secondary: 'bg-banda-secondary-muted text-banda-secondary',
  success: 'bg-banda-success-muted text-banda-success',
  warning: 'bg-banda-warning-muted text-banda-warning',
  danger: 'bg-banda-danger-muted text-banda-danger',
  info: 'bg-banda-info-muted text-banda-info',
};

const OUTLINE: Record<BandaBadgeTone, string> = {
  neutral: 'border border-banda-border-strong text-banda-text',
  primary: 'border border-banda-primary text-banda-primary',
  secondary: 'border border-banda-secondary text-banda-secondary',
  success: 'border border-banda-success text-banda-success',
  warning: 'border border-banda-warning text-banda-warning',
  danger: 'border border-banda-danger text-banda-danger',
  info: 'border border-banda-info text-banda-info',
};

const FILL: Record<BandaBadgeFill, Record<BandaBadgeTone, string>> = {
  solid: SOLID,
  soft: SOFT,
  outline: OUTLINE,
};

export function BandaBadge({
  tone = 'neutral',
  fill = 'soft',
  size = 'md',
  square = false,
  className,
  ...rest
}: BandaBadgeProps) {
  return (
    <span
      className={[
        BASE,
        SIZE[size],
        FILL[fill][tone],
        square ? 'rounded-sm' : 'rounded-full',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    />
  );
}
