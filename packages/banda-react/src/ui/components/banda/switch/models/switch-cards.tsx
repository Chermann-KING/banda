/**
 * Modèles surfaces : carte de réglage et rangée de liste, interrupteur à droite.
 * Construits sur l'<input role="switch"> natif — structure dédiée.
 */
import { useId } from 'react';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

type NativeSwitchProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'size'>;

/** Interrupteur partagé des surfaces (carte, rangée). */
function SwitchControl({ inputId, disabled, ...rest }: NativeSwitchProps & { inputId: string }) {
  return (
    <span className="relative inline-flex shrink-0 items-center">
      <input
        id={inputId}
        type="checkbox"
        role="switch"
        disabled={disabled}
        className="peer sr-only"
        {...rest}
      />
      <span
        aria-hidden="true"
        className={[
          'h-5 w-9 shrink-0 rounded-full bg-banda-border-strong',
          'transition-colors duration-fast peer-checked:bg-banda-primary',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-banda-focus-ring',
        ].join(' ')}
      />
      <span
        aria-hidden="true"
        className={[
          'pointer-events-none absolute left-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full',
          'bg-banda-surface shadow-sm transition-transform duration-fast peer-checked:translate-x-4',
        ].join(' ')}
      />
    </span>
  );
}

/** Carte de réglage : icône, titre, description, interrupteur à droite. */
export interface SwitchCardProps extends NativeSwitchProps {
  label: ReactNode;
  description?: string;
  icon?: LucideIcon;
}

export function SwitchCard({ label, description, icon: Icon, id, className, disabled, ...rest }: SwitchCardProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <label
      htmlFor={inputId}
      className={[
        'flex w-full items-start gap-3 rounded-md border border-banda-border bg-banda-surface p-4',
        'transition-colors duration-fast hover:border-banda-border-strong',
        'has-[:checked]:border-banda-primary',
        'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-banda-focus-ring has-[:focus-visible]:ring-offset-2 ring-offset-banda-background',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {Icon ? <Icon size={18} className="mt-0.5 shrink-0 text-banda-text" aria-hidden="true" /> : null}
      <span className="flex flex-1 flex-col gap-0.5">
        <span className="font-sans text-sm font-medium text-banda-text">{label}</span>
        {description ? (
          <span className="font-sans text-xs text-banda-text-muted">{description}</span>
        ) : null}
      </span>
      <SwitchControl inputId={inputId} disabled={disabled} {...rest} />
    </label>
  );
}

/** Rangée de liste : icône à gauche, interrupteur à droite (réglages). */
export interface RowSwitchProps extends NativeSwitchProps {
  label: ReactNode;
  icon?: LucideIcon;
}

export function RowSwitch({ label, icon: Icon, id, className, disabled, ...rest }: RowSwitchProps) {
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
      <SwitchControl inputId={inputId} disabled={disabled} {...rest} />
    </label>
  );
}
