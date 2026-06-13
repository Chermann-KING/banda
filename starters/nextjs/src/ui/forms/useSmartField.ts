import type { ChangeEvent } from 'react';
import type { FieldSpec } from '@banda/fields';
import { useFormContext } from './useForm';

export interface SmartFieldState {
  value: string;
  error: string | undefined;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: () => void;
}

/**
 * Branche une FieldSpec (@banda/fields) sur le formulaire courant.
 * Pipeline : frappe → sanitize → format ; blur → finalize → validation Zod.
 */
export function useSmartField(name: string, spec: FieldSpec): SmartFieldState {
  const form = useFormContext();
  const value = form.values[name] ?? '';
  const error = form.errors[name];

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const raw = event.target.value;
    const sanitized = spec.sanitize ? spec.sanitize(raw) : raw;
    const formatted = spec.format ? spec.format(sanitized) : sanitized;
    form.setValue(name, formatted);
    // L'erreur disparaît dès que l'utilisateur corrige — pas avant le prochain blur.
    if (error !== undefined) {
      form.setFieldError(name, undefined);
    }
  };

  const onBlur = () => {
    const finalized = spec.finalize ? spec.finalize(value) : value;
    if (finalized !== value) {
      form.setValue(name, finalized);
    }
    const result = spec.schema.safeParse(finalized);
    form.setFieldError(name, result.success ? undefined : result.error.issues[0]?.message);
  };

  return { value, error, onChange, onBlur };
}
