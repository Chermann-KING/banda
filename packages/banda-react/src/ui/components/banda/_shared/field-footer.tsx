import { AlertCircle, Info } from 'lucide-react';

/**
 * Pied de champ partagé (hint / erreur) — module PRIVÉ, non exporté du barrel.
 * Spec v2 : hint = <Info>, erreur = <AlertCircle>, icônes Lucide uniquement.
 */
export interface FieldFooterProps {
  helpId: string;
  hint?: string | undefined;
  error?: string | undefined;
}

export function FieldFooter({ helpId, hint, error }: FieldFooterProps) {
  if (!hint && !error) return null;

  return (
    <p
      id={helpId}
      aria-live="polite"
      className={[
        'mt-1 flex items-center gap-1 font-sans text-xs',
        error ? 'font-medium text-banda-danger' : 'text-banda-text-muted',
      ].join(' ')}
    >
      {error ? (
        <AlertCircle size={12} className="shrink-0" aria-hidden="true" />
      ) : (
        <Info size={12} className="shrink-0" aria-hidden="true" />
      )}
      {error ?? hint}
    </p>
  );
}
