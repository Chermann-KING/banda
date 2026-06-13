/**
 * Modèles mot de passe — bascule afficher/masquer, et version avec
 * checklist de force (critères évalués par @banda/fields).
 */
import { useId, useState } from 'react';
import type { ChangeEvent, ComponentPropsWithRef } from 'react';
import { Check, Eye, EyeOff, X } from 'lucide-react';
import { evaluatePasswordStrength, PASSWORD_MIN_LENGTH } from '@banda/fields';
import { BandaLabel } from '@/ui/components/banda/label/BandaLabel';
import { FieldFooter } from '@/ui/components/banda/_shared/field-footer';
import { controlClasses } from '@/ui/components/banda/_shared/field-control';

export interface PasswordInputProps extends Omit<ComponentPropsWithRef<'input'>, 'size' | 'type'> {
  label?: string;
  hint?: string;
  error?: string;
}

/**
 * Mot de passe avec bascule de visibilité.
 * EXCEPTION à la règle sanitize : une saisie de mot de passe n'est JAMAIS
 * altérée (les caractères spéciaux y sont légitimes et voulus).
 */
export function PasswordInput({
  label = 'Mot de passe',
  hint,
  error,
  id,
  required,
  className,
  ...rest
}: PasswordInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const helpId = `${inputId}-help`;
  const [visible, setVisible] = useState(false);

  return (
    <div className={className}>
      <BandaLabel htmlFor={inputId} required={required}>
        {label}
      </BandaLabel>
      <div className="relative">
        <input
          id={inputId}
          type={visible ? 'text' : 'password'}
          autoComplete="new-password"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={hint || error ? helpId : undefined}
          className={controlClasses({ invalid: error !== undefined, extra: 'pr-10' })}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          aria-pressed={visible}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-banda-text-muted transition-colors duration-fast hover:text-banda-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring"
        >
          {visible ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
        </button>
      </div>
      <FieldFooter helpId={helpId} hint={hint} error={error} />
    </div>
  );
}

const CRITERIA_LABELS = [
  ['minLength', `Au moins ${PASSWORD_MIN_LENGTH} caractères`],
  ['lowercase', 'Au moins une minuscule'],
  ['uppercase', 'Au moins une majuscule'],
  ['digit', 'Au moins un chiffre'],
  ['symbol', 'Au moins un caractère spécial'],
] as const;

/** Mot de passe avec checklist de force en temps réel. */
export function PasswordStrengthInput({ onChange, ...rest }: PasswordInputProps) {
  const [value, setValue] = useState('');
  const { criteria } = evaluatePasswordStrength(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange?.(event);
  };

  return (
    <div>
      <PasswordInput onChange={handleChange} {...rest} />
      <ul className="mt-2 flex flex-col gap-1" aria-label="Exigences du mot de passe">
        {CRITERIA_LABELS.map(([key, criterionLabel]) => {
          const satisfied = criteria[key];
          return (
            <li
              key={key}
              className={[
                'flex items-center gap-2 font-sans text-xs',
                satisfied ? 'text-banda-success' : 'text-banda-text-muted',
              ].join(' ')}
            >
              {satisfied ? (
                <Check size={12} aria-hidden="true" />
              ) : (
                <X size={12} aria-hidden="true" />
              )}
              {criterionLabel}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
