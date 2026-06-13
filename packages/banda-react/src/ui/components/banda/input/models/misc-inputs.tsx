/**
 * Modèles divers : pilule, fichier, label flottant, compteur, effacement.
 */
import { useId, useState } from 'react';
import type { ChangeEvent, ComponentPropsWithRef } from 'react';
import { X } from 'lucide-react';
import { BandaInput, type BandaInputProps } from '../BandaInput';
import { BandaLabel } from '../../label/BandaLabel';
import { FieldFooter } from '../../_shared/field-footer';
import { controlClasses } from '../../_shared/field-control';
import { sanitizeOnBlur, sanitizeOnType } from '../../_shared/sanitize-events';

/** Input pilule (rounded-full). */
export interface PillInputProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  label?: string;
}

export function PillInput({ label, id, className, onChange, onBlur, ...rest }: PillInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div className={className}>
      {label ? <BandaLabel htmlFor={inputId}>{label}</BandaLabel> : null}
      <input
        id={inputId}
        className={controlClasses({ extra: 'rounded-full px-4' })}
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
    </div>
  );
}

/** Input fichier — bouton stylé via les variantes file: de Tailwind. */
export interface FileInputProps extends Omit<ComponentPropsWithRef<'input'>, 'size' | 'type'> {
  label?: string;
  hint?: string;
  error?: string;
}

export function FileInput({ label = 'Fichier', hint, error, id, required, className, ...rest }: FileInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const helpId = `${inputId}-help`;

  return (
    <div className={className}>
      <BandaLabel htmlFor={inputId} required={required}>
        {label}
      </BandaLabel>
      <input
        id={inputId}
        type="file"
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={hint || error ? helpId : undefined}
        className={controlClasses({
          invalid: error !== undefined,
          extra:
            // file:h-full : le bouton remplit la hauteur du champ, collé à gauche.
            // pl-0 (et non p-0) : dans l'ordre Tailwind, px-3 de la taille md passe
            // après p-0 et gagnerait ; pl-0/pr-3 passent après px-3 et s'imposent.
            'cursor-pointer pl-0 pr-3 text-sm text-banda-text-muted ' +
            'file:mr-3 file:h-full file:cursor-pointer file:rounded-md file:rounded-r-none ' +
            'file:border-0 file:bg-banda-surface-muted file:px-3 file:font-sans ' +
            'file:text-sm file:font-medium file:text-banda-text',
        })}
        {...rest}
      />
      <FieldFooter helpId={helpId} hint={hint} error={error} />
    </div>
  );
}

/** Label flottant : centré quand vide, remonte au focus/saisie. */
export interface FloatingLabelInputProps
  extends Omit<ComponentPropsWithRef<'input'>, 'size' | 'placeholder'> {
  label: string;
}

export function FloatingLabelInput({ label, id, className, onChange, onBlur, ...rest }: FloatingLabelInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <div className={['relative', className].filter(Boolean).join(' ')}>
      <input
        id={inputId}
        placeholder=" "
        className={controlClasses({ size: 'lg', extra: 'peer pt-4' })}
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
        htmlFor={inputId}
        className={[
          'pointer-events-none absolute left-3 top-1 font-sans text-xs text-banda-text-muted',
          'transition-all duration-fast',
          'peer-placeholder-shown:top-3 peer-placeholder-shown:text-md',
          'peer-focus:top-1 peer-focus:text-xs peer-focus:text-banda-primary',
        ].join(' ')}
      >
        {label}
      </label>
    </div>
  );
}

/** Input avec compteur de caractères (nécessite maxLength). */
export interface CharacterCountInputProps extends BandaInputProps {
  maxLength: number;
}

export function CharacterCountInput({ maxLength, onChange, ...rest }: CharacterCountInputProps) {
  const [length, setLength] = useState(String(rest.defaultValue ?? '').length);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLength(event.target.value.length);
    onChange?.(event);
  };

  const ratio = length / maxLength;

  return (
    <div className="relative">
      <BandaInput maxLength={maxLength} onChange={handleChange} {...rest} />
      <span
        aria-live="polite"
        className={[
          'absolute right-0 top-0 font-sans text-xs tabular-nums',
          ratio >= 1
            ? 'font-semibold text-banda-danger'
            : ratio >= 0.8
              ? 'text-banda-warning'
              : 'text-banda-text-muted',
        ].join(' ')}
      >
        {length}/{maxLength}
      </span>
    </div>
  );
}

/** Input avec bouton d'effacement. */
export interface ClearInputProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  label?: string;
}

export function ClearInput({ label = 'Texte', id, onChange, className, ...rest }: ClearInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    sanitizeOnType(event);
    setValue(event.target.value);
    onChange?.(event);
  };

  return (
    <div className={className}>
      <BandaLabel htmlFor={inputId}>{label}</BandaLabel>
      <div className="relative">
        <input
          id={inputId}
          value={value}
          onChange={handleChange}
          className={controlClasses({ extra: value ? 'pr-10' : '' })}
          {...rest}
        />
        {value ? (
          <button
            type="button"
            onClick={() => setValue('')}
            aria-label="Effacer"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-banda-text-muted transition-colors duration-fast hover:text-banda-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring"
          >
            <X size={14} aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
