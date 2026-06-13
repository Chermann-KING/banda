import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import { fieldSpecs } from '@banda/fields';
import { Form } from './Form';
import { useForm } from './useForm';
import { FirstNameField, EmailField } from './fields';

function TestForm({ onSubmit = vi.fn() }: { onSubmit?: (values: unknown) => void }) {
  const form = useForm({
    schema: z.object({
      firstName: fieldSpecs.firstName.schema,
      email: fieldSpecs.email.schema,
    }),
    initialValues: { firstName: '', email: '' },
    onSubmit,
  });
  return (
    <Form form={form} aria-label="Formulaire de test">
      <FirstNameField name="firstName" label="Prénom" required />
      <EmailField name="email" label="Email" required />
      <button type="submit">Envoyer</button>
    </Form>
  );
}

describe('Smart fields', () => {
  it('formate le prénom en title case et bloque les caractères interdits', () => {
    render(<TestForm />);
    const input = screen.getByLabelText(/Prénom/);
    // sanitizeName garde les lettres : '<b>' laisserait un 'b'.
    // Entrée dont les caractères interdits sont 100 % non-lettres.
    fireEvent.change(input, { target: { value: 'hermann<>!!2' } });
    expect(input).toHaveValue('Hermann');
  });

  it('affiche une erreur Zod au blur et la retire à la correction', () => {
    render(<TestForm />);
    const input = screen.getByLabelText(/Prénom/);
    fireEvent.change(input, { target: { value: 'J' } });
    fireEvent.blur(input);
    expect(screen.getByText('Le prénom doit contenir au moins 2 caractères.')).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'Jean' } });
    expect(
      screen.queryByText('Le prénom doit contenir au moins 2 caractères.'),
    ).not.toBeInTheDocument();
  });

  it('met l’email en minuscules et valide à la soumission', () => {
    const onSubmit = vi.fn();
    render(<TestForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText(/Prénom/), { target: { value: 'Mukagni' } });
    const email = screen.getByLabelText(/Email/);
    fireEvent.change(email, { target: { value: 'Vous@Exemple.COM' } });
    expect(email).toHaveValue('vous@exemple.com');
    fireEvent.click(screen.getByRole('button', { name: 'Envoyer' }));
    expect(onSubmit).toHaveBeenCalledWith({ firstName: 'Mukagni', email: 'vous@exemple.com' });
  });

  it('bloque la soumission si le schéma échoue', () => {
    const onSubmit = vi.fn();
    render(<TestForm onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: 'Envoyer' }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText("L'email est requis.")).toBeInTheDocument();
  });
});
