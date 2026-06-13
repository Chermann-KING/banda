import { useId, useState } from 'react';
import type { ChangeEvent, ComponentPropsWithRef, FocusEvent } from 'react';
import { CheckCircle2, type LucideIcon } from 'lucide-react';
import { collapseWhitespace, stripDangerous } from '@banda/fields';
import { BandaLabel } from '@/ui/components/banda/label/BandaLabel';
import { FieldFooter } from '@/ui/components/banda/_shared/field-footer';
import { controlClasses, type ControlSize, type ControlVariant } from '@/ui/components/banda/_shared/field-control';

export interface SanitizeOptions {
  /** Retire chevrons et caractères de contrôle pendant la frappe. @default true */
  stripDangerous?: boolean;
  /** Trim au blur. @default true */
  trim?: boolean;
  /** Réduit les espaces multiples au blur. @default true */
  collapseWhitespace?: boolean;
}

const FULL_SANITIZE: Required<SanitizeOptions> = {
  stripDangerous: true,
  trim: true,
  collapseWhitespace: true,
};

export interface BandaInputProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  label?: string;
  /** Label masqué visuellement mais accessible. */
  hideLabel?: boolean;
  hint?: string;
  /** Erreur contrôlée — prioritaire sur l'erreur interne issue de `validate`. */
  error?: string;
  /** Validation embarquée : retourne le message d'erreur ou null. Évaluée au blur. */
  validate?: (value: string) => string | null;
  /** Signature Banda : sanitize ACTIF par défaut (trim + strip + collapse).
      Passer false pour désactiver explicitement. */
  sanitize?: boolean | SanitizeOptions;
  size?: ControlSize;
  variant?: ControlVariant;
  /** Icône Lucide décorative à gauche. */
  startIcon?: LucideIcon;
  /** Icône Lucide décorative à droite (masquée si l'icône de validation est affichée). */
  endIcon?: LucideIcon;
  /** Classes additionnelles de l'<input> (alignement, contour coloré…). */
  inputClassName?: string;
}

/** Étend <input> natif — label, hint, erreur, validation et sanitisation embarquées. */
export function BandaInput({
  label,
  hideLabel = false,
  hint,
  error,
  validate,
  sanitize = true,
  size = 'md',
  variant = 'default',
  startIcon: StartIcon,
  endIcon: EndIcon,
  inputClassName,
  id,
  required,
  className,
  onChange,
  onBlur,
  ...rest
}: BandaInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const helpId = `${inputId}-help`;
  const [internalError, setInternalError] = useState<string | null>(null);
  const [valid, setValid] = useState(false);

  const sanitizeOptions: SanitizeOptions | null =
    sanitize === true ? FULL_SANITIZE : sanitize || null;

  const shownError = error ?? internalError ?? undefined;
  const showValidIcon = valid && !shownError;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (sanitizeOptions?.stripDangerous !== false && sanitizeOptions) {
      event.target.value = stripDangerous(event.target.value);
    }
    if (internalError !== null) setInternalError(null);
    if (valid) setValid(false);
    onChange?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (sanitizeOptions) {
      let value = event.target.value;
      if (sanitizeOptions.collapseWhitespace !== false) value = collapseWhitespace(value);
      else if (sanitizeOptions.trim !== false) value = value.trim();
      event.target.value = value;
    }
    if (validate) {
      const message = validate(event.target.value);
      setInternalError(message);
      setValid(message === null && event.target.value !== '');
    }
    onBlur?.(event);
  };

  return (
    <div className={className}>
      {label ? (
        <BandaLabel htmlFor={inputId} required={required} hidden={hideLabel}>
          {label}
        </BandaLabel>
      ) : null}
      <div className="relative">
        <input
          id={inputId}
          required={required}
          aria-invalid={shownError ? true : undefined}
          aria-describedby={hint || shownError ? helpId : undefined}
          className={controlClasses({
            size,
            variant,
            invalid: shownError !== undefined,
            extra: [StartIcon ? 'pl-10' : '', showValidIcon || EndIcon ? 'pr-10' : '', inputClassName]
              .filter(Boolean)
              .join(' '),
          })}
          onChange={handleChange}
          onBlur={handleBlur}
          {...rest}
        />
        {StartIcon ? (
          <StartIcon
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-banda-text-muted"
            aria-hidden="true"
          />
        ) : null}
        {EndIcon && !showValidIcon ? (
          <EndIcon
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-banda-text-muted"
            aria-hidden="true"
          />
        ) : null}
        {showValidIcon ? (
          <CheckCircle2
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-banda-success"
            aria-hidden="true"
          />
        ) : null}
      </div>
      <FieldFooter helpId={helpId} hint={hint} error={shownError} />
    </div>
  );
}
