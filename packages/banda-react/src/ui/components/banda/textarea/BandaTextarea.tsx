import { useId, useState } from 'react';
import type { ChangeEvent, ComponentPropsWithRef, FocusEvent, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { collapseWhitespace, stripDangerous } from '@banda/fields';
import { BandaLabel } from '../label/BandaLabel';
import { FieldFooter } from '../_shared/field-footer';
import type { ControlSize, ControlVariant } from '../_shared/field-control';
import type { SanitizeOptions } from '../input/BandaInput';
import { textareaClasses, type TextareaResize } from './textarea-utils';

/** Décalage des icônes pour rester centrées sur la première ligne de texte. */
const ICON_TOP: Record<ControlSize, string> = {
  sm: 'top-2.5',
  md: 'top-4',
  lg: 'top-5',
};

export interface BandaTextareaProps extends ComponentPropsWithRef<'textarea'> {
  label?: string | undefined;
  hideLabel?: boolean | undefined;
  hint?: string | undefined;
  /** Alignement du hint sous le champ. @default 'start' */
  hintAlign?: 'start' | 'end' | undefined;
  /** Texte discret à droite du label (« Champ optionnel »…). */
  cornerHint?: string | undefined;
  error?: string | undefined;
  validate?: ((value: string) => string | null) | undefined;
  /** Sanitize par défaut : c'est la signature Banda. Passer false pour désactiver. */
  sanitize?: boolean | SanitizeOptions | undefined;
  size?: ControlSize | undefined;
  variant?: ControlVariant | undefined;
  /** Poignée de redimensionnement. @default 'y' */
  resize?: TextareaResize | undefined;
  /** Icône Lucide décorative, alignée sur la première ligne. */
  startIcon?: LucideIcon | undefined;
  endIcon?: LucideIcon | undefined;
  /** Classes additionnelles du <textarea> (contour/ring colorés, padding…). */
  textareaClassName?: string | undefined;
  /** Compteur de caractères (nécessite maxLength). */
  showCounter?: boolean | undefined;
  /** Alignement du compteur sous le champ. @default 'end' */
  counterAlign?: 'start' | 'end' | undefined;
}

function FooterRow({
  hintAlign,
  counterAlign,
  hasFooter,
  counter,
  children,
}: {
  hintAlign: 'start' | 'end';
  counterAlign: 'start' | 'end';
  hasFooter: boolean;
  counter: ReactNode;
  children: ReactNode;
}) {
  if (!hasFooter && !counter) return null;

  const sides = [hasFooter ? hintAlign : null, counter ? counterAlign : null].filter(Boolean);
  const justify =
    sides.includes('start') && sides.includes('end')
      ? 'justify-between'
      : sides.includes('end')
        ? 'justify-end'
        : 'justify-start';
  const counterFirst = counter !== null && counterAlign === 'start' && hintAlign === 'end';

  return (
    <div className={`flex items-start gap-2 ${justify}`}>
      {counterFirst ? counter : null}
      {children}
      {counterFirst ? null : counter}
    </div>
  );
}

/** Étend <textarea> natif — sanitize actif par défaut. */
export function BandaTextarea({
  label,
  hideLabel = false,
  hint,
  hintAlign = 'start',
  cornerHint,
  error,
  validate,
  sanitize = true,
  size = 'md',
  variant = 'default',
  resize = 'y',
  startIcon: StartIcon,
  endIcon: EndIcon,
  textareaClassName,
  showCounter = false,
  counterAlign = 'end',
  id,
  required,
  maxLength,
  className,
  onChange,
  onBlur,
  ...rest
}: BandaTextareaProps) {
  const autoId = useId();
  const textareaId = id ?? autoId;
  const helpId = `${textareaId}-help`;
  const [internalError, setInternalError] = useState<string | null>(null);
  const [length, setLength] = useState(
    () => String(rest.defaultValue ?? rest.value ?? '').length,
  );

  const shownError = error ?? internalError ?? undefined;
  const counterVisible = showCounter && typeof maxLength === 'number';

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (sanitize) {
      event.target.value = stripDangerous(event.target.value);
    }
    setLength(event.target.value.length);
    if (internalError !== null) setInternalError(null);
    onChange?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
    if (sanitize === true || (typeof sanitize === 'object' && sanitize.trim !== false)) {
      event.target.value = collapseWhitespace(event.target.value);
      setLength(event.target.value.length);
    }
    if (validate) setInternalError(validate(event.target.value));
    onBlur?.(event);
  };

  const counterRatio = counterVisible && maxLength ? length / maxLength : 0;

  const labelElement = label ? (
    <BandaLabel htmlFor={textareaId} required={required} hidden={hideLabel}>
      {label}
    </BandaLabel>
  ) : null;

  return (
    <div className={className}>
      {cornerHint && label && !hideLabel ? (
        <div className="flex items-baseline justify-between gap-2">
          {labelElement}
          <span className="font-sans text-xs text-banda-text-muted">{cornerHint}</span>
        </div>
      ) : (
        labelElement
      )}
      <div className="relative">
        <textarea
          id={textareaId}
          required={required}
          maxLength={maxLength}
          aria-invalid={shownError ? true : undefined}
          aria-describedby={hint || shownError ? helpId : undefined}
          className={textareaClasses({
            size,
            variant,
            resize,
            invalid: shownError !== undefined,
            extra: [StartIcon ? 'pl-10' : '', EndIcon ? 'pr-10' : '', textareaClassName]
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
            className={`pointer-events-none absolute left-3 ${ICON_TOP[size]} text-banda-text-muted`}
            aria-hidden="true"
          />
        ) : null}
        {EndIcon ? (
          <EndIcon
            size={16}
            className={`pointer-events-none absolute right-3 ${ICON_TOP[size]} text-banda-text-muted`}
            aria-hidden="true"
          />
        ) : null}
      </div>
      <FooterRow
        hintAlign={hintAlign}
        counterAlign={counterAlign}
        hasFooter={Boolean(hint || shownError)}
        counter={
          counterVisible ? (
            <span
              aria-live="polite"
              className={[
                'mt-1 shrink-0 font-sans text-xs tabular-nums',
                counterRatio >= 1
                  ? 'font-semibold text-banda-danger'
                  : counterRatio >= 0.8
                    ? 'text-banda-warning'
                    : 'text-banda-text-muted',
              ].join(' ')}
            >
              {length}/{maxLength}
            </span>
          ) : null
        }
      >
        <FieldFooter helpId={helpId} hint={hint} error={shownError} />
      </FooterRow>
    </div>
  );
}
