import { useMemo, useState } from 'react';
import { Check, X } from 'lucide-react';
import {
  PHONE_COUNTRIES,
  getPhoneCountry,
  isPhoneComplete,
  makePhoneSpec,
  sanitizeDigits,
} from '@banda/fields';
import { FormField } from './FormField';
import { useFormContext } from './useForm';
import { useSmartField } from './useSmartField';
import type { SmartFieldProps } from './createSmartField';
import styles from './phone-field.module.css';

export interface PhoneFieldProps extends SmartFieldProps {
  /** Pays présélectionné (ISO 3166-1). @default 'GA' (Gabon) */
  defaultCountry?: string;
}

/**
 * Champ téléphone intelligent : sélecteur de pays (15 pays africains),
 * masque de saisie par pays, indicateur de complétude, E.164 prêt.
 * Arbitrage : <select> natif plutôt qu'un dropdown maison — accessible
 * d'office, zéro gestion de portal/focus, idiomatique pour un starter.
 */
export function PhoneField({
  name,
  label,
  required,
  disabled,
  id,
  hint,
  defaultCountry = 'GA',
}: PhoneFieldProps) {
  const [iso, setIso] = useState(defaultCountry);
  const spec = useMemo(() => makePhoneSpec(iso), [iso]);
  const field = useSmartField(name, spec);
  const form = useFormContext();

  const country = getPhoneCountry(iso);
  const digits = sanitizeDigits(field.value);
  const complete = isPhoneComplete(digits, country);
  const inputId = id ?? name;

  const selectCountry = (nextIso: string) => {
    setIso(nextIso);
    // Les masques diffèrent : on repart d'une saisie vide.
    form.setValue(name, '');
    form.setFieldError(name, undefined);
  };

  return (
    <FormField
      id={inputId}
      label={label}
      required={required}
      hint={hint ?? spec.hint}
      error={field.error}
    >
      <div className={`${styles.group} ${field.error ? styles.groupError : ''}`}>
        <select
          className={styles.country}
          value={iso}
          onChange={(event) => selectCountry(event.target.value)}
          disabled={disabled}
          aria-label="Indicatif pays"
        >
          {PHONE_COUNTRIES.map((phoneCountry) => (
            <option key={phoneCountry.iso} value={phoneCountry.iso}>
              {phoneCountry.flag} {phoneCountry.dialCode} · {phoneCountry.name}
            </option>
          ))}
        </select>
        <input
          id={inputId}
          name={name}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          className={styles.input}
          placeholder={spec.placeholder}
          disabled={disabled}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          aria-describedby={`${inputId}-help`}
          aria-invalid={field.error !== undefined || undefined}
          aria-required={required || undefined}
        />
        {digits.length > 0 ? (
          complete ? (
            <span className={styles.complete} aria-label="Numéro complet">
              <Check size={16} aria-hidden="true" />
            </span>
          ) : (
            <button
              type="button"
              className={styles.clear}
              onClick={() => form.setValue(name, '')}
              aria-label="Effacer le numéro"
            >
              <X size={14} aria-hidden="true" />
            </button>
          )
        ) : null}
      </div>
    </FormField>
  );
}
