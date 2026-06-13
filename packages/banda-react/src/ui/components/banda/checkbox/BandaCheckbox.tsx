import { useId } from 'react';
import type { ComponentPropsWithRef, ReactNode, Ref } from 'react';
import { Check, Minus } from 'lucide-react';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type CheckboxShape = 'square' | 'circle';

export interface BandaCheckboxProps extends Omit<ComponentPropsWithRef<'input'>, 'type' | 'size'> {
  label: ReactNode;
  /** Texte secondaire sous le label. */
  description?: string | undefined;
  error?: string | undefined;
  /** État indéterminé (sélection partielle) — propriété DOM, pas un attribut. */
  indeterminate?: boolean;
  size?: CheckboxSize;
  /** Couleur de la case cochée — tokens sémantiques uniquement. @default 'primary' */
  color?: CheckboxColor;
  shape?: CheckboxShape;
  /** Label barré et atténué quand coché (todo list). */
  strikeOnCheck?: boolean;
  /** Classes additionnelles de la case (border-dashed…). */
  boxClassName?: string;
}

const SIZE: Record<CheckboxSize, { box: string; icon: number; text: string }> = {
  sm: { box: 'h-3.5 w-3.5', icon: 10, text: 'text-xs' },
  md: { box: 'h-4 w-4', icon: 12, text: 'text-sm' },
  lg: { box: 'h-5 w-5', icon: 14, text: 'text-md' },
};

/** Couleurs cochées/indéterminées — la coche reprend le contrast du token. */
const COLOR: Record<CheckboxColor, { box: string; icon: string }> = {
  primary: {
    box: 'checked:border-banda-primary checked:bg-banda-primary indeterminate:border-banda-primary indeterminate:bg-banda-primary',
    icon: 'text-banda-primary-contrast',
  },
  secondary: {
    box: 'checked:border-banda-secondary checked:bg-banda-secondary indeterminate:border-banda-secondary indeterminate:bg-banda-secondary',
    icon: 'text-banda-secondary-contrast',
  },
  success: {
    box: 'checked:border-banda-success checked:bg-banda-success indeterminate:border-banda-success indeterminate:bg-banda-success',
    icon: 'text-banda-success-contrast',
  },
  warning: {
    box: 'checked:border-banda-warning checked:bg-banda-warning indeterminate:border-banda-warning indeterminate:bg-banda-warning',
    icon: 'text-banda-warning-contrast',
  },
  danger: {
    box: 'checked:border-banda-danger checked:bg-banda-danger indeterminate:border-banda-danger indeterminate:bg-banda-danger',
    icon: 'text-banda-danger-contrast',
  },
  info: {
    box: 'checked:border-banda-info checked:bg-banda-info indeterminate:border-banda-info indeterminate:bg-banda-info',
    icon: 'text-banda-info-contrast',
  },
};

/** Fusionne la ref appelant avec la pose de la propriété DOM `indeterminate`. */
function mergeIndeterminateRef(
  refProp: Ref<HTMLInputElement> | undefined,
  indeterminate: boolean,
) {
  return (node: HTMLInputElement | null) => {
    if (node) node.indeterminate = indeterminate;
    if (typeof refProp === 'function') refProp(node);
    else if (refProp && node) (refProp as { current: HTMLInputElement | null }).current = node;
  };
}

/** Étend <input type="checkbox"> natif — visuel custom tokens, coche Lucide. */
export function BandaCheckbox({
  label,
  description,
  error,
  indeterminate = false,
  size = 'md',
  color = 'primary',
  shape = 'square',
  strikeOnCheck = false,
  boxClassName,
  id,
  className,
  disabled,
  ref,
  ...rest
}: BandaCheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const sizes = SIZE[size];
  const colors = COLOR[color];

  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        className={[
          'group flex items-start gap-2 font-sans',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        ].join(' ')}
      >
        <span className="relative mt-1 flex shrink-0 items-center justify-center">
          <input
            id={inputId}
            type="checkbox"
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            ref={mergeIndeterminateRef(ref, indeterminate)}
            className={[
              'peer appearance-none border bg-banda-surface',
              sizes.box,
              shape === 'circle' ? 'rounded-full' : 'rounded-sm',
              'transition-colors duration-fast',
              colors.box,
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring focus-visible:ring-offset-2 ring-offset-banda-background',
              'disabled:cursor-not-allowed',
              error ? 'border-banda-danger' : 'border-banda-border-strong',
              boxClassName,
            ]
              .filter(Boolean)
              .join(' ')}
            {...rest}
          />
          <Check
            size={sizes.icon}
            aria-hidden="true"
            className={`pointer-events-none absolute ${colors.icon} opacity-0 transition-opacity duration-fast peer-checked:opacity-100`}
          />
          <Minus
            size={sizes.icon}
            aria-hidden="true"
            className={`pointer-events-none absolute ${colors.icon} opacity-0 transition-opacity duration-fast peer-indeterminate:opacity-100`}
          />
        </span>
        <span className="flex flex-col">
          <span
            className={[
              `${sizes.text} font-medium text-banda-text`,
              strikeOnCheck
                ? 'transition-colors duration-fast group-has-[:checked]:text-banda-text-muted group-has-[:checked]:line-through'
                : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {label}
          </span>
          {description ? (
            <span className="text-xs text-banda-text-muted">{description}</span>
          ) : null}
          {error ? <span className="text-xs font-medium text-banda-danger">{error}</span> : null}
        </span>
      </label>
    </div>
  );
}
