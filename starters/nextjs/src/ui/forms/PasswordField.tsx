import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { evaluatePasswordStrength, passwordSpec } from '@banda/fields';
import { controlClasses } from '@/ui/components/banda/_shared/field-control';
import { FormField } from './FormField';
import { useSmartField } from './useSmartField';
import type { SmartFieldProps } from './createSmartField';
import styles from './password-field.module.css';

const STRENGTH_LABELS = ['', 'Faible', 'Moyen', 'Bon', 'Fort'] as const;
const STRENGTH_CLASSES = ['', styles.score1, styles.score2, styles.score3, styles.score4] as const;

/**
 * Champ mot de passe intelligent : jauge de force temps réel (4 segments),
 * bascule afficher/masquer, validation Zod de la spec partagée.
 */
export function PasswordField({ name, label, required, disabled, id, hint }: SmartFieldProps) {
  const field = useSmartField(name, passwordSpec);
  const [visible, setVisible] = useState(false);
  const inputId = id ?? name;

  const strength = evaluatePasswordStrength(field.value);
  const strengthClass = STRENGTH_CLASSES[strength.score];

  return (
    <FormField
      id={inputId}
      label={label}
      required={required}
      hint={hint ?? passwordSpec.hint}
      error={field.error}
    >
      <div className={styles.wrap}>
        <input
          id={inputId}
          name={name}
          type={visible ? 'text' : 'password'}
          autoComplete={passwordSpec.autoComplete}
          maxLength={passwordSpec.maxLength}
          disabled={disabled}
          className={`${controlClasses({ invalid: field.error !== undefined, extra: 'pr-10' })} ${styles.input}`}
          aria-invalid={field.error !== undefined || undefined}
          aria-describedby={`${inputId}-help`}
          aria-required={required || undefined}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          aria-pressed={visible}
          disabled={disabled}
        >
          {visible ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
        </button>
      </div>
      {field.value.length > 0 ? (
        <div className={styles.meterRow}>
          <div
            className={styles.meter}
            role="meter"
            aria-valuemin={0}
            aria-valuemax={4}
            aria-valuenow={strength.score}
            aria-label="Force du mot de passe"
          >
            {[1, 2, 3, 4].map((segment) => (
              <span
                key={segment}
                className={`${styles.segment} ${segment <= strength.score ? strengthClass : ''}`}
              />
            ))}
          </div>
          <span className={`${styles.label} ${strengthClass}`}>
            {STRENGTH_LABELS[strength.score]}
          </span>
        </div>
      ) : null}
    </FormField>
  );
}
