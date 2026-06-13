import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BandaInput } from './BandaInput';

describe('BandaInput', () => {
  it('sanitize PAR DÉFAUT : retire les caractères dangereux pendant la frappe', () => {
    render(<BandaInput label="Nom" />);
    const input = screen.getByLabelText('Nom');
    fireEvent.change(input, { target: { value: '<script>Ondo' } });
    expect(input).toHaveValue('scriptOndo');
  });

  it('opt-out explicite : sanitize={false} laisse la saisie intacte', () => {
    render(<BandaInput label="Brut" sanitize={false} />);
    const input = screen.getByLabelText('Brut');
    fireEvent.change(input, { target: { value: '<b>brut</b>' } });
    expect(input).toHaveValue('<b>brut</b>');
  });

  it('validate : erreur interne au blur, effacée à la frappe', () => {
    render(
      <BandaInput
        label="Nom"
        validate={(value) => (value.length < 3 ? 'Trop court.' : null)}
      />,
    );
    const input = screen.getByLabelText('Nom');
    fireEvent.change(input, { target: { value: 'ab' } });
    fireEvent.blur(input);
    expect(screen.getByText('Trop court.')).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(screen.queryByText('Trop court.')).not.toBeInTheDocument();
  });

  it("l'erreur contrôlée prime sur la validation interne", () => {
    render(<BandaInput label="Email" error="Erreur serveur." />);
    expect(screen.getByText('Erreur serveur.')).toBeInTheDocument();
  });

  it('sanitize au blur : trim + espaces multiples', () => {
    render(<BandaInput label="Ville" sanitize />);
    const input = screen.getByLabelText('Ville');
    fireEvent.change(input, { target: { value: '  Port   Gentil  ' } });
    fireEvent.blur(input);
    expect(input).toHaveValue('Port Gentil');
  });
});
