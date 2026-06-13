/**
 * Modèles décoratifs : double label, icônes dans le rail ou le curseur,
 * texte dans le rail, bascule de thème.
 * Les contenus internes au rail/curseur utilisent group-has-[:checked]
 * (peer ne cible que les frères directs de l'input).
 */
import { useId } from 'react';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { Check, Moon, Sun, X, type LucideIcon } from 'lucide-react';
import { BandaSwitch, type BandaSwitchProps } from '../BandaSwitch';

type NativeSwitchProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'size'>;

/** Rail + curseur de base (md) — partagés par les modèles à structure dédiée. */
const RAIL =
  'h-5 w-9 shrink-0 rounded-full bg-banda-border-strong transition-colors duration-fast ' +
  'peer-checked:bg-banda-primary ' +
  'peer-focus-visible:ring-2 peer-focus-visible:ring-banda-focus-ring peer-focus-visible:ring-offset-2 ring-offset-banda-background';

const THUMB =
  'pointer-events-none absolute left-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full ' +
  'bg-banda-surface shadow-sm transition-transform duration-fast peer-checked:translate-x-4';

/** Double label : le côté actif est mis en évidence (Oui ◯ Non). */
export interface DualLabelSwitchProps extends NativeSwitchProps {
  /** Libellé accessible de l'interrupteur. */
  label: string;
  /** Côté éteint (gauche) et côté allumé (droite). */
  offLabel: ReactNode;
  onLabel: ReactNode;
}

export function DualLabelSwitch({ label, offLabel, onLabel, id, className, disabled, ...rest }: DualLabelSwitchProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <label
      htmlFor={inputId}
      className={[
        'group inline-flex items-center gap-2 font-sans text-sm font-medium',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="text-banda-text transition-colors duration-fast group-has-[:checked]:text-banda-text-muted">
        {offLabel}
      </span>
      <span className="relative inline-flex shrink-0 items-center">
        <input id={inputId} type="checkbox" role="switch" disabled={disabled} className="peer sr-only" aria-label={label} {...rest} />
        <span aria-hidden="true" className={RAIL} />
        <span aria-hidden="true" className={THUMB} />
      </span>
      <span className="text-banda-text-muted transition-colors duration-fast group-has-[:checked]:text-banda-text">
        {onLabel}
      </span>
    </label>
  );
}

/** Icônes dans le rail : l'icône du côté libre reste visible (✓ / ✕). */
export interface IconSwitchProps extends NativeSwitchProps {
  label: string;
  onIcon?: LucideIcon;
  offIcon?: LucideIcon;
}

export function IconSwitch({
  label,
  onIcon: OnIcon = Check,
  offIcon: OffIcon = X,
  id,
  className,
  disabled,
  ...rest
}: IconSwitchProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <label
      htmlFor={inputId}
      className={[
        'group relative inline-flex items-center',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <input id={inputId} type="checkbox" role="switch" disabled={disabled} className="peer sr-only" aria-label={label} {...rest} />
      <span aria-hidden="true" className={`${RAIL} flex items-center justify-between px-1`}>
        <OnIcon size={10} className="text-banda-primary-contrast opacity-0 transition-opacity duration-fast group-has-[:checked]:opacity-100" />
        <OffIcon size={10} className="text-banda-text-muted opacity-100 transition-opacity duration-fast group-has-[:checked]:opacity-0" />
      </span>
      <span aria-hidden="true" className={THUMB} />
    </label>
  );
}

/** Icône dans le curseur : elle change avec l'état (✕ → ✓). */
export function ThumbIconSwitch({
  label,
  onIcon: OnIcon = Check,
  offIcon: OffIcon = X,
  id,
  className,
  disabled,
  ...rest
}: IconSwitchProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <label
      htmlFor={inputId}
      className={[
        'group relative inline-flex items-center',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <input id={inputId} type="checkbox" role="switch" disabled={disabled} className="peer sr-only" aria-label={label} {...rest} />
      <span aria-hidden="true" className="h-5 w-9 shrink-0 rounded-full bg-banda-border-strong transition-colors duration-fast peer-checked:bg-banda-primary peer-focus-visible:ring-2 peer-focus-visible:ring-banda-focus-ring peer-focus-visible:ring-offset-2 ring-offset-banda-background" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0.5 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center rounded-full bg-banda-surface shadow-sm transition-transform duration-fast peer-checked:translate-x-4"
      >
        <OffIcon size={10} className="absolute text-banda-text-muted transition-opacity duration-fast group-has-[:checked]:opacity-0" />
        <OnIcon size={10} className="absolute text-banda-primary opacity-0 transition-opacity duration-fast group-has-[:checked]:opacity-100" />
      </span>
    </label>
  );
}

/** Texte dans le rail (OUI / NON). */
export interface TextSwitchProps extends NativeSwitchProps {
  label: string;
  onText?: string;
  offText?: string;
}

export function TextSwitch({
  label,
  onText = 'OUI',
  offText = 'NON',
  id,
  className,
  disabled,
  ...rest
}: TextSwitchProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <label
      htmlFor={inputId}
      className={[
        'group relative inline-flex items-center',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <input id={inputId} type="checkbox" role="switch" disabled={disabled} className="peer sr-only" aria-label={label} {...rest} />
      <span
        aria-hidden="true"
        className={[
          'flex h-6 w-12 shrink-0 items-center justify-between rounded-full bg-banda-border-strong px-1.5',
          'font-sans text-xs font-semibold transition-colors duration-fast',
          'peer-checked:bg-banda-primary',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-banda-focus-ring peer-focus-visible:ring-offset-2 ring-offset-banda-background',
        ].join(' ')}
      >
        <span className="text-banda-primary-contrast opacity-0 transition-opacity duration-fast group-has-[:checked]:opacity-100">
          {onText}
        </span>
        <span className="text-banda-text-muted transition-opacity duration-fast group-has-[:checked]:opacity-0">
          {offText}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-banda-surface shadow-sm transition-transform duration-fast peer-checked:translate-x-6"
      />
    </label>
  );
}

/** Bascule de thème : soleil et lune encadrent l'interrupteur. */
export type ThemeSwitchProps = BandaSwitchProps;

export function ThemeSwitch({ label, className, ...rest }: ThemeSwitchProps) {
  return (
    <span className={['inline-flex items-center gap-2', className].filter(Boolean).join(' ')}>
      <Sun size={14} className="text-banda-text-muted" aria-hidden="true" />
      <BandaSwitch label={label} hideLabel {...rest} />
      <Moon size={14} className="text-banda-text-muted" aria-hidden="true" />
    </span>
  );
}
