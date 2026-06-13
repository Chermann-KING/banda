import { useId } from 'react';
import type { ComponentPropsWithRef, ReactNode } from 'react';

export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type SwitchShape = 'pill' | 'square';

export interface BandaSwitchProps extends Omit<ComponentPropsWithRef<'input'>, 'type' | 'size'> {
  label: ReactNode;
  /** Label masqué visuellement (reste accessible). */
  hideLabel?: boolean;
  /** Texte secondaire sous le label. */
  description?: string;
  size?: SwitchSize;
  /** Couleur du rail activé — tokens sémantiques uniquement. @default 'primary' */
  color?: SwitchColor;
  shape?: SwitchShape;
  /** Position du label par rapport à l'interrupteur. @default 'end' */
  labelAlign?: 'start' | 'end';
  /** Classes additionnelles du rail (dégradé, contour…). */
  trackClassName?: string;
}

const SIZE: Record<SwitchSize, { rail: string; thumb: string; x: string; text: string }> = {
  sm: { rail: 'h-4 w-7', thumb: 'h-2.5 w-2.5', x: 'peer-checked:translate-x-2.5', text: 'text-xs' },
  md: { rail: 'h-5 w-9', thumb: 'h-3 w-3', x: 'peer-checked:translate-x-4', text: 'text-sm' },
  lg: { rail: 'h-6 w-11', thumb: 'h-4 w-4', x: 'peer-checked:translate-x-5', text: 'text-md' },
};

const COLOR: Record<SwitchColor, string> = {
  primary: 'peer-checked:bg-banda-primary',
  secondary: 'peer-checked:bg-banda-secondary',
  success: 'peer-checked:bg-banda-success',
  warning: 'peer-checked:bg-banda-warning',
  danger: 'peer-checked:bg-banda-danger',
  info: 'peer-checked:bg-banda-info',
};

/** Étend <input type="checkbox"> + role="switch" — interrupteur stylé tokens. */
export function BandaSwitch({
  label,
  hideLabel = false,
  description,
  size = 'md',
  color = 'primary',
  shape = 'pill',
  labelAlign = 'end',
  trackClassName,
  id,
  className,
  disabled,
  ...rest
}: BandaSwitchProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const sizes = SIZE[size];

  const control = (
    <span className="relative inline-flex shrink-0 items-center">
      <input
        id={inputId}
        type="checkbox"
        role="switch"
        disabled={disabled}
        className="peer sr-only"
        {...rest}
      />
      {/* Rail */}
      <span
        aria-hidden="true"
        className={[
          'shrink-0 bg-banda-border-strong',
          sizes.rail,
          shape === 'square' ? 'rounded-sm' : 'rounded-full',
          'transition-colors duration-fast',
          COLOR[color],
          'peer-focus-visible:ring-2 peer-focus-visible:ring-banda-focus-ring peer-focus-visible:ring-offset-2 ring-offset-banda-background',
          trackClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      />
      {/* Curseur */}
      <span
        aria-hidden="true"
        className={[
          'pointer-events-none absolute left-1 top-1/2 -translate-y-1/2 bg-banda-surface shadow-sm',
          sizes.thumb,
          shape === 'square' ? 'rounded-sm' : 'rounded-full',
          'transition-transform duration-fast',
          sizes.x,
        ].join(' ')}
      />
    </span>
  );

  const text = (
    <span className="flex flex-col">
      <span className={hideLabel ? 'sr-only' : `${sizes.text} font-medium text-banda-text`}>
        {label}
      </span>
      {description && !hideLabel ? (
        <span className="text-xs text-banda-text-muted">{description}</span>
      ) : null}
    </span>
  );

  return (
    <label
      htmlFor={inputId}
      className={[
        'inline-flex items-center gap-2 font-sans',
        description ? 'items-start' : 'items-center',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {labelAlign === 'start' ? (
        <>
          {text}
          {control}
        </>
      ) : (
        <>
          {control}
          {text}
        </>
      )}
    </label>
  );
}
