/**
 * Modèles décoratifs : chip cliquable, checkbox-icône.
 * Construits sur l'<input type="checkbox"> natif (sr-only ou mini-case) —
 * la structure diffère du BandaCheckbox de base.
 */
import { useId } from 'react';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { Check, type LucideIcon } from 'lucide-react';
import type { CheckboxColor } from '@/ui/components/banda/checkbox/BandaCheckbox';

type NativeCheckboxProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'size'>;

/** Chip cochable : pilule qui s'inverse quand cochée (filtres, tags). */
export interface ChipCheckboxProps extends NativeCheckboxProps {
  label: ReactNode;
}

export function ChipCheckbox({ label, id, className, disabled, ...rest }: ChipCheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <label
      htmlFor={inputId}
      className={[
        'inline-flex items-center gap-2 rounded-md border border-banda-border bg-banda-surface px-3 py-1.5',
        'font-sans text-sm font-medium text-banda-text transition-colors duration-fast',
        'hover:border-banda-border-strong',
        'has-[:checked]:border-banda-primary has-[:checked]:bg-banda-primary has-[:checked]:text-banda-primary-contrast',
        'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-banda-focus-ring has-[:focus-visible]:ring-offset-2 ring-offset-banda-background',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="relative flex shrink-0 items-center justify-center">
        <input
          id={inputId}
          type="checkbox"
          disabled={disabled}
          className={[
            'peer h-3.5 w-3.5 appearance-none rounded-sm border border-banda-border-strong bg-banda-surface',
            'transition-colors duration-fast focus-visible:outline-none',
            'checked:border-banda-primary-contrast checked:bg-banda-primary-contrast',
            'disabled:cursor-not-allowed',
          ].join(' ')}
          {...rest}
        />
        <Check
          size={10}
          aria-hidden="true"
          className="pointer-events-none absolute text-banda-primary opacity-0 transition-opacity duration-fast peer-checked:opacity-100"
        />
      </span>
      {label}
    </label>
  );
}

/** Checkbox-icône : l'icône Lucide se remplit de couleur quand cochée. */
const ICON_COLOR: Record<CheckboxColor, string> = {
  primary: 'peer-checked:text-banda-primary',
  secondary: 'peer-checked:text-banda-secondary',
  success: 'peer-checked:text-banda-success',
  warning: 'peer-checked:text-banda-warning',
  danger: 'peer-checked:text-banda-danger',
  info: 'peer-checked:text-banda-info',
};

export interface IconCheckboxProps extends NativeCheckboxProps {
  icon: LucideIcon;
  /** Libellé accessible — l'icône seule ne suffit pas. */
  label: string;
  color?: CheckboxColor;
}

export function IconCheckbox({
  icon: Icon,
  label,
  color = 'primary',
  id,
  className,
  disabled,
  ...rest
}: IconCheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <label
      htmlFor={inputId}
      className={[
        'inline-flex rounded-full p-1',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <input id={inputId} type="checkbox" disabled={disabled} className="peer sr-only" {...rest} />
      <Icon
        size={22}
        aria-hidden="true"
        className={[
          'fill-transparent text-banda-border-strong transition-colors duration-fast',
          'peer-checked:fill-current',
          ICON_COLOR[color],
          'peer-focus-visible:rounded-full peer-focus-visible:ring-2 peer-focus-visible:ring-banda-focus-ring',
        ].join(' ')}
      />
      <span className="sr-only">{label}</span>
    </label>
  );
}
