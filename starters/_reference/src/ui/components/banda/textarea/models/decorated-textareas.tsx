/**
 * Modèles décoratifs : label chevauchant le contour, label inset, label flottant.
 * Composent BandaTextarea (ou un <textarea> brut pour le label flottant,
 * qui exige le pattern peer) — 100 % tokens, sanitize Banda conservé.
 */
import { useId } from 'react';
import type { ComponentPropsWithRef } from 'react';
import { BandaTextarea, type BandaTextareaProps } from '@/ui/components/banda/textarea/BandaTextarea';
import { textareaClasses } from '@/ui/components/banda/textarea/textarea-utils';
import { sanitizeOnBlur, sanitizeOnType } from '@/ui/components/banda/_shared/sanitize-events';

export interface DecoratedTextareaProps extends Omit<BandaTextareaProps, 'hideLabel'> {
  label: string;
}

/** Label posé sur le contour du champ (overlapping). */
export function OverlappingLabelTextarea({ label, className, ...rest }: DecoratedTextareaProps) {
  return (
    <div className={['relative', className].filter(Boolean).join(' ')}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-2 left-2 z-sticky bg-banda-surface px-1 font-sans text-xs font-medium text-banda-text-muted"
      >
        {label}
      </span>
      <BandaTextarea label={label} hideLabel {...rest} />
    </div>
  );
}

/** Label inset : à l'intérieur du champ, au-dessus de la zone de saisie. */
export function InsetLabelTextarea({ label, textareaClassName, className, ...rest }: DecoratedTextareaProps) {
  return (
    <div className={['relative', className].filter(Boolean).join(' ')}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-2 z-sticky font-sans text-xs font-medium text-banda-text-muted"
      >
        {label}
      </span>
      <BandaTextarea
        label={label}
        hideLabel
        // pt-7 dégage la première ligne sous le label (pt-* gagne sur p-* dans l'ordre Tailwind).
        textareaClassName={['pt-7', textareaClassName].filter(Boolean).join(' ')}
        {...rest}
      />
    </div>
  );
}

/** Label flottant : posé sur la première ligne quand vide, remonte au focus/saisie. */
export interface FloatingLabelTextareaProps
  extends Omit<ComponentPropsWithRef<'textarea'>, 'placeholder'> {
  label: string;
}

export function FloatingLabelTextarea({ label, id, className, onChange, onBlur, ...rest }: FloatingLabelTextareaProps) {
  const autoId = useId();
  const textareaId = id ?? autoId;

  return (
    <div className={['relative', className].filter(Boolean).join(' ')}>
      <textarea
        id={textareaId}
        placeholder=" "
        className={textareaClasses({ extra: 'peer pt-6' })}
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
      <label
        htmlFor={textareaId}
        className={[
          'pointer-events-none absolute left-3 top-2 font-sans text-xs text-banda-text-muted',
          'transition-all duration-fast',
          'peer-placeholder-shown:top-3 peer-placeholder-shown:text-md',
          'peer-focus:top-2 peer-focus:text-xs peer-focus:text-banda-primary',
        ].join(' ')}
      >
        {label}
      </label>
    </div>
  );
}
