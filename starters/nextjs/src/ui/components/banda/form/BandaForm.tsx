import type { ComponentPropsWithRef, FormEvent } from 'react';
import { FormContext, type FormApi } from '@/ui/forms/useForm';

export type FormGap = 'sm' | 'md' | 'lg';

export interface BandaFormProps extends Omit<ComponentPropsWithRef<'form'>, 'onSubmit'> {
  /**
   * Moteur useForm (Zod) — branche le contexte des smart fields et
   * désactive la validation native (le schéma fait foi).
   */
  form?: FormApi;
  /**
   * Soumission simple sans moteur : valeurs extraites de FormData
   * (champs nommés ; valeurs multiples jointes par «, »).
   * La validation native (required…) reste active.
   */
  onSubmitValues?: (values: Record<string, string>) => void;
  /** Surface carte : contour + padding (formulaires encadrés). */
  card?: boolean;
  /** Espacement vertical entre les champs. @default 'md' */
  gap?: FormGap;
}

const GAP: Record<FormGap, string> = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
};

/**
 * Étend <form> natif. Deux régimes, jamais les deux :
 * - `form` (FormApi) pour les formulaires validés Zod + smart fields ;
 * - `onSubmitValues` pour les formulaires simples — les atomes Banda
 *   participent déjà aux formulaires natifs (name), FormData suffit.
 */
export function BandaForm({
  form,
  onSubmitValues,
  card = false,
  gap = 'md',
  className,
  children,
  ...rest
}: BandaFormProps) {
  const handleSimpleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!onSubmitValues) return;
    const data = new FormData(event.currentTarget);
    const values: Record<string, string> = {};
    for (const key of new Set(data.keys())) {
      values[key] = data
        .getAll(key)
        .map((entry) => String(entry))
        .join(', ');
    }
    onSubmitValues(values);
  };

  const formElement = (
    <form
      noValidate={form !== undefined}
      onSubmit={form ? form.handleSubmit : handleSimpleSubmit}
      className={[
        'flex flex-col',
        GAP[gap],
        card ? 'rounded-lg border border-banda-border bg-banda-surface p-6' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </form>
  );

  return form ? <FormContext value={form}>{formElement}</FormContext> : formElement;
}
