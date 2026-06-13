/**
 * Modèles surfaces : carte cochable et rangée de liste à case à droite.
 * Construits sur l'<input type="checkbox"> natif — structure dédiée.
 */
import { useId } from 'react';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { Check, type LucideIcon } from 'lucide-react';

type NativeCheckboxProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'size'>;

/** Case partagée des surfaces (carte, rangée). */
function CheckboxBox({ inputId, disabled, ...rest }: NativeCheckboxProps & { inputId: string }) {
  return (
    <span className="relative flex shrink-0 items-center justify-center">
      <input
        id={inputId}
        type="checkbox"
        disabled={disabled}
        className={[
          'peer h-4 w-4 appearance-none rounded-sm border border-banda-border-strong bg-banda-surface',
          'transition-colors duration-fast',
          'checked:border-banda-primary checked:bg-banda-primary',
          'focus-visible:outline-none',
          'disabled:cursor-not-allowed',
        ].join(' ')}
        {...rest}
      />
      <Check
        size={12}
        aria-hidden="true"
        className="pointer-events-none absolute text-banda-primary-contrast opacity-0 transition-opacity duration-fast peer-checked:opacity-100"
      />
    </span>
  );
}

/** Carte cochable : contour et fond s'activent avec la case (réglages, plans). */
export interface CheckboxCardProps extends NativeCheckboxProps {
  label: ReactNode;
  description?: string;
}

export function CheckboxCard({ label, description, id, className, disabled, ...rest }: CheckboxCardProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <label
      htmlFor={inputId}
      className={[
        'flex w-full items-start gap-3 rounded-md border border-banda-border bg-banda-surface p-4',
        'transition-colors duration-fast hover:border-banda-border-strong',
        'has-[:checked]:border-banda-primary has-[:checked]:bg-banda-primary-muted',
        'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-banda-focus-ring has-[:focus-visible]:ring-offset-2 ring-offset-banda-background',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="mt-0.5">
        <CheckboxBox inputId={inputId} disabled={disabled} {...rest} />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="font-sans text-sm font-medium text-banda-text">{label}</span>
        {description ? (
          <span className="font-sans text-xs text-banda-text-muted">{description}</span>
        ) : null}
      </span>
    </label>
  );
}

/** Rangée de liste : icône à gauche, case à droite (sélections multiples). */
export interface RowCheckboxProps extends NativeCheckboxProps {
  label: ReactNode;
  icon?: LucideIcon;
}

export function RowCheckbox({ label, icon: Icon, id, className, disabled, ...rest }: RowCheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <label
      htmlFor={inputId}
      className={[
        'flex w-full items-center gap-3 bg-banda-surface p-3',
        'transition-colors duration-fast hover:bg-banda-surface-muted',
        'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-inset has-[:focus-visible]:ring-banda-focus-ring',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {Icon ? <Icon size={16} className="shrink-0 text-banda-text" aria-hidden="true" /> : null}
      <span className="flex-1 font-sans text-sm font-medium text-banda-text">{label}</span>
      <CheckboxBox inputId={inputId} disabled={disabled} {...rest} />
    </label>
  );
}
