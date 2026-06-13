import { useId } from 'react';
import type { ComponentPropsWithRef, ReactNode } from 'react';

export type RadioSize = 'sm' | 'md' | 'lg';
export type RadioColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

export interface BandaRadioProps extends Omit<ComponentPropsWithRef<'input'>, 'type' | 'size'> {
  label: ReactNode;
  /** Texte secondaire sous le label. */
  description?: string | undefined;
  error?: string | undefined;
  size?: RadioSize;
  /** Couleur du point coché — tokens sémantiques uniquement. @default 'primary' */
  color?: RadioColor;
  /** Classes additionnelles du bouton (border-dashed…). */
  boxClassName?: string;
}

const SIZE: Record<RadioSize, { box: string; text: string }> = {
  sm: { box: 'h-3.5 w-3.5', text: 'text-xs' },
  md: { box: 'h-4 w-4', text: 'text-sm' },
  lg: { box: 'h-5 w-5', text: 'text-md' },
};

const COLOR: Record<RadioColor, string> = {
  primary: 'checked:border-banda-primary',
  secondary: 'checked:border-banda-secondary',
  success: 'checked:border-banda-success',
  warning: 'checked:border-banda-warning',
  danger: 'checked:border-banda-danger',
  info: 'checked:border-banda-info',
};

/** Étend <input type="radio"> natif — le point est rendu par checked:border-4 (centre = bg). */
export function BandaRadio({
  label,
  description,
  error,
  size = 'md',
  color = 'primary',
  boxClassName,
  id,
  className,
  disabled,
  ...rest
}: BandaRadioProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const sizes = SIZE[size];

  return (
    <label
      htmlFor={inputId}
      className={[
        'flex items-start gap-2 font-sans',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        id={inputId}
        type="radio"
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        className={[
          'mt-1 shrink-0 appearance-none rounded-full border bg-banda-surface',
          sizes.box,
          'transition-colors duration-fast',
          'checked:border-4',
          COLOR[color],
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring focus-visible:ring-offset-2 ring-offset-banda-background',
          'disabled:cursor-not-allowed',
          error ? 'border-banda-danger' : 'border-banda-border-strong',
          boxClassName,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      />
      <span className="flex flex-col">
        <span className={`${sizes.text} font-medium text-banda-text`}>{label}</span>
        {description ? (
          <span className="text-xs text-banda-text-muted">{description}</span>
        ) : null}
        {error ? <span className="text-xs font-medium text-banda-danger">{error}</span> : null}
      </span>
    </label>
  );
}
