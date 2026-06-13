/**
 * Modèles surfaces : carte sélectionnable et rangée de liste à bouton à droite.
 * Construits sur l'<input type="radio"> natif — structure dédiée.
 */
import { useId } from 'react';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

type NativeRadioProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'size'>;

/** Bouton radio partagé des surfaces (carte, rangée). */
function RadioDot({ inputId, disabled, ...rest }: NativeRadioProps & { inputId: string }) {
  return (
    <input
      id={inputId}
      type="radio"
      disabled={disabled}
      className={[
        'h-4 w-4 shrink-0 appearance-none rounded-full border border-banda-border-strong bg-banda-surface',
        'transition-colors duration-fast',
        'checked:border-4 checked:border-banda-primary',
        'focus-visible:outline-none',
        'disabled:cursor-not-allowed',
      ].join(' ')}
      {...rest}
    />
  );
}

/** Carte sélectionnable : contour et fond s'activent avec le bouton (plans, options). */
export interface RadioCardProps extends NativeRadioProps {
  label: ReactNode;
  description?: string;
}

export function RadioCard({ label, description, id, className, disabled, ...rest }: RadioCardProps) {
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
        <RadioDot inputId={inputId} disabled={disabled} {...rest} />
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

/** Rangée de liste : icône à gauche, bouton à droite (choix exclusif). */
export interface RowRadioProps extends NativeRadioProps {
  label: ReactNode;
  icon?: LucideIcon;
}

export function RowRadio({ label, icon: Icon, id, className, disabled, ...rest }: RowRadioProps) {
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
      <RadioDot inputId={inputId} disabled={disabled} {...rest} />
    </label>
  );
}
