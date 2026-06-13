import type { ComponentPropsWithRef } from 'react';
import { FormContext, type FormApi } from './useForm';

export interface FormProps extends Omit<ComponentPropsWithRef<'form'>, 'onSubmit'> {
  form: FormApi;
}

/** Branche le FormApi dans le contexte et gère la soumission (noValidate : Zod fait foi). */
export function Form({ form, children, ...rest }: FormProps) {
  return (
    <FormContext value={form}>
      <form noValidate onSubmit={form.handleSubmit} {...rest}>
        {children}
      </form>
    </FormContext>
  );
}
