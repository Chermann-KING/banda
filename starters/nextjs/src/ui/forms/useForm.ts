import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import type { ZodType, ZodTypeDef } from 'zod';

export type FormValues = Record<string, string>;
export type FormErrors = Partial<Record<string, string>>;

export interface FormApi {
  values: FormValues;
  errors: FormErrors;
  submitting: boolean;
  setValue: (name: string, value: string) => void;
  setFieldError: (name: string, message: string | undefined) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  reset: () => void;
}

interface UseFormOptions<Output> {
  /** Schéma Zod du formulaire — composez-le depuis les specs : z.object({ email: fieldSpecs.email.schema }) */
  schema: ZodType<Output, ZodTypeDef, unknown>;
  initialValues: FormValues;
  onSubmit: (values: Output) => void | Promise<void>;
}

/**
 * Moteur de formulaire minimaliste validé par Zod.
 * Volontairement sans dépendance : suffisant pour un starter,
 * remplaçable par react-hook-form sans toucher aux smart fields
 * (ils ne connaissent que le contrat FormApi).
 */
export function useForm<Output>(options: UseFormOptions<Output>): FormApi {
  const { schema, initialValues, onSubmit } = options;
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const setValue = useCallback((name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
  }, []);

  const setFieldError = useCallback((name: string, message: string | undefined) => {
    setErrors((current) => ({ ...current, [name]: message }));
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const result = schema.safeParse(values);
      if (!result.success) {
        const nextErrors: FormErrors = {};
        for (const issue of result.error.issues) {
          const fieldName = String(issue.path[0] ?? '');
          // Première erreur par champ : la plus actionnable pour l'utilisateur.
          if (fieldName !== '' && nextErrors[fieldName] === undefined) {
            nextErrors[fieldName] = issue.message;
          }
        }
        setErrors(nextErrors);
        return;
      }
      setErrors({});
      setSubmitting(true);
      Promise.resolve(onSubmit(result.data)).finally(() => setSubmitting(false));
    },
    [schema, values, onSubmit],
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return useMemo(
    () => ({ values, errors, submitting, setValue, setFieldError, handleSubmit, reset }),
    [values, errors, submitting, setValue, setFieldError, handleSubmit, reset],
  );
}

export const FormContext = createContext<FormApi | null>(null);

export function useFormContext(): FormApi {
  const context = useContext(FormContext);
  if (context === null) {
    throw new Error('useFormContext doit être appelé sous <Form>.');
  }
  return context;
}
