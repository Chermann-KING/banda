/**
 * Modèle décoratif : chip cochable exclusive (segmented filter).
 * Construit sur l'<input type="radio"> natif — structure dédiée.
 */
import { useId } from 'react';
import type { ComponentPropsWithRef, ReactNode } from 'react';

type NativeRadioProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'size'>;

/** Chip radio : pilule qui s'inverse quand sélectionnée (choix exclusif). */
export interface ChipRadioProps extends NativeRadioProps {
  label: ReactNode;
}

export function ChipRadio({ label, id, className, disabled, ...rest }: ChipRadioProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <label
      htmlFor={inputId}
      className={[
        'inline-flex items-center gap-2 rounded-full border border-banda-border bg-banda-surface px-3 py-1.5',
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
      <input
        id={inputId}
        type="radio"
        disabled={disabled}
        className={[
          'peer h-3.5 w-3.5 appearance-none rounded-full border border-banda-border-strong bg-banda-surface',
          'transition-colors duration-fast focus-visible:outline-none',
          'checked:border-4 checked:border-banda-primary-contrast',
          'disabled:cursor-not-allowed',
        ].join(' ')}
        {...rest}
      />
      {label}
    </label>
  );
}
