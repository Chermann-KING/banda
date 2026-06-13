import type { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { BandaLabel } from '@/ui/components/banda/label/BandaLabel';
import styles from './form-field.module.css';

export interface FormFieldProps {
  /** id du contrôle enfant — le footer d'aide reçoit `${id}-help` pour aria-describedby. */
  id: string;
  label: string;
  required?: boolean | undefined;
  hint?: string | undefined;
  error?: string | undefined;
  counter?: { length: number; max: number } | undefined;
  children: ReactNode;
}

/**
 * Chrome commun à tous les champs : label + étoile, aide, erreur, compteur.
 * Écrit une seule fois — les contrôles restent « bêtes ».
 */
export function FormField({ id, label, required, hint, error, counter, children }: FormFieldProps) {
  const helpId = `${id}-help`;
  const hasFooter = Boolean(hint || error || counter);

  const counterRatio = counter ? counter.length / counter.max : 0;
  const counterClass =
    counterRatio >= 1 ? styles.counterDanger : counterRatio >= 0.8 ? styles.counterWarning : '';

  return (
    <div className={styles.field}>
      <BandaLabel htmlFor={id} className="mb-0">
        {label}
        {required ? (
          <span className={styles.required} aria-hidden="true">
            {' '}
            *
          </span>
        ) : null}
      </BandaLabel>
      {children}
      {hasFooter ? (
        <div className={styles.footer}>
          <p id={helpId} className={error ? styles.error : styles.hint} aria-live="polite">
            {error ? <AlertCircle size={12} aria-hidden="true" className={styles.errorIcon} /> : null}
            {error ?? hint ?? ''}
          </p>
          {counter ? (
            <span className={`${styles.counter} ${counterClass}`} aria-live="polite">
              {counter.length}/{counter.max}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
