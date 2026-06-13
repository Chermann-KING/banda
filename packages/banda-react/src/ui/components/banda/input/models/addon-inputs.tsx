/**
 * Modèles add-ons & actions — l'input est combiné à des segments attachés.
 * Construits sur les primitives partagées (controlClasses, BandaLabel,
 * FieldFooter) car la structure diffère du BandaInput de base.
 */
import { useId } from 'react';
import type { ComponentPropsWithRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import { BandaButton } from '../../button';
import { BandaLabel } from '../../label/BandaLabel';
import { FieldFooter } from '../../_shared/field-footer';
import { controlClasses } from '../../_shared/field-control';
import { sanitizeOnBlur, sanitizeOnType } from '../../_shared/sanitize-events';

/** Champs groupés — sanitize Banda actif d'office (non désactivable). */
interface GroupFieldProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
}

const ADDON_BASE =
  'inline-flex items-center border border-banda-border px-3 font-sans text-sm text-banda-text-muted';

/** Input avec add-on texte au début et/ou à la fin (https:// … .com). */
export interface AddonInputProps extends GroupFieldProps {
  startAddon?: string;
  endAddon?: string;
  /** Add-ons encadrés (fond grisé) plutôt qu'inline. */
  boxed?: boolean;
}

export function AddonInput({
  label,
  hint,
  error,
  startAddon,
  endAddon,
  boxed = false,
  id,
  required,
  className,
  onChange,
  onBlur,
  ...rest
}: AddonInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const helpId = `${inputId}-help`;
  const addonBg = boxed ? 'bg-banda-surface-muted' : 'bg-banda-surface';

  return (
    <div className={className}>
      {label ? (
        <BandaLabel htmlFor={inputId} required={required}>
          {label}
        </BandaLabel>
      ) : null}
      <div className="flex">
        {startAddon ? (
          <span className={`${ADDON_BASE} ${addonBg} rounded-md rounded-r-none border-r-0`}>
            {startAddon}
          </span>
        ) : null}
        <input
          id={inputId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={hint || error ? helpId : undefined}
          className={controlClasses({
            invalid: error !== undefined,
            extra: [
              startAddon ? 'rounded-l-none' : '',
              endAddon ? 'rounded-r-none' : '',
            ]
              .join(' ')
              .trim(),
          })}
          onChange={(event) => {
            sanitizeOnType(event);
            onChange?.(event);
          }}
          onBlur={(event) => {
            sanitizeOnBlur(event);
            onBlur?.(event);
          }}
          {...rest}
        />
        {endAddon ? (
          <span className={`${ADDON_BASE} ${addonBg} rounded-md rounded-l-none border-l-0`}>
            {endAddon}
          </span>
        ) : null}
      </div>
      <FieldFooter helpId={helpId} hint={hint} error={error} />
    </div>
  );
}

/** Input avec bouton d'action attaché (Subscribe…). */
export interface ButtonInputProps extends GroupFieldProps {
  buttonLabel: string;
  onAction?: () => void;
}

export function ButtonInput({
  label,
  hint,
  error,
  buttonLabel,
  onAction,
  id,
  required,
  className,
  onChange,
  onBlur,
  ...rest
}: ButtonInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const helpId = `${inputId}-help`;

  return (
    <div className={className}>
      {label ? (
        <BandaLabel htmlFor={inputId} required={required}>
          {label}
        </BandaLabel>
      ) : null}
      <div className="flex">
        <input
          id={inputId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={hint || error ? helpId : undefined}
          className={controlClasses({ invalid: error !== undefined, extra: 'rounded-r-none' })}
          onChange={(event) => {
            sanitizeOnType(event);
            onChange?.(event);
          }}
          onBlur={(event) => {
            sanitizeOnBlur(event);
            onBlur?.(event);
          }}
          {...rest}
        />
        <BandaButton className="shrink-0 rounded-l-none" onClick={onAction}>
          {buttonLabel}
        </BandaButton>
      </div>
      <FieldFooter helpId={helpId} hint={hint} error={error} />
    </div>
  );
}

/** Input avec bouton-icône intégré à droite (envoyer, télécharger…). */
export interface InlineIconButtonInputProps extends GroupFieldProps {
  icon: LucideIcon;
  actionLabel: string;
  onAction?: () => void;
}

export function InlineIconButtonInput({
  label,
  hint,
  error,
  icon: Icon,
  actionLabel,
  onAction,
  id,
  required,
  className,
  onChange,
  onBlur,
  ...rest
}: InlineIconButtonInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const helpId = `${inputId}-help`;

  return (
    <div className={className}>
      {label ? (
        <BandaLabel htmlFor={inputId} required={required}>
          {label}
        </BandaLabel>
      ) : null}
      <div className="relative">
        <input
          id={inputId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={hint || error ? helpId : undefined}
          className={controlClasses({ invalid: error !== undefined, extra: 'pr-10' })}
          onChange={(event) => {
            sanitizeOnType(event);
            onChange?.(event);
          }}
          onBlur={(event) => {
            sanitizeOnBlur(event);
            onBlur?.(event);
          }}
          {...rest}
        />
        <button
          type="button"
          onClick={onAction}
          aria-label={actionLabel}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-banda-text-muted transition-colors duration-fast hover:text-banda-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring"
        >
          <Icon size={16} aria-hidden="true" />
        </button>
      </div>
      <FieldFooter helpId={helpId} hint={hint} error={error} />
    </div>
  );
}
