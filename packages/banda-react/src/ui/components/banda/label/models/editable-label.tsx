/**
 * Label éditable : la valeur se modifie en place via le crayon.
 * Sanitize Banda actif sur la saisie (signature de la librairie).
 */
import { useId, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Pencil } from 'lucide-react';
import { BandaLabel } from '../BandaLabel';
import { controlClasses } from '../../_shared/field-control';
import { sanitizeOnBlur, sanitizeOnType } from '../../_shared/sanitize-events';

export interface EditableLabelProps {
  label: string;
  /** Mode contrôlé. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Libellé accessible du bouton d'édition. @default 'Modifier' */
  editLabel?: string;
  className?: string;
}

export function EditableLabel({
  label,
  value,
  defaultValue = '',
  onChange,
  editLabel = 'Modifier',
  className,
}: EditableLabelProps) {
  const inputId = useId();
  const [editing, setEditing] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const currentValue = value ?? internalValue;

  const commit = (next: string) => {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
    setEditing(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') event.currentTarget.blur();
    // Échap : on abandonne la saisie sans valider.
    if (event.key === 'Escape') setEditing(false);
  };

  return (
    <div className={className}>
      <span className="flex items-center gap-2">
        <BandaLabel htmlFor={editing ? inputId : undefined}>{label}</BandaLabel>
        <button
          type="button"
          aria-label={`${editLabel} : ${label}`}
          onClick={() => setEditing(true)}
          className="mb-1 rounded-sm p-1 text-banda-text-muted transition-colors duration-fast hover:text-banda-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring"
        >
          <Pencil size={14} aria-hidden="true" />
        </button>
      </span>
      {editing ? (
        <input
          id={inputId}
          autoFocus
          defaultValue={currentValue}
          className={controlClasses({ size: 'sm' })}
          onChange={sanitizeOnType}
          onKeyDown={onKeyDown}
          onBlur={(event) => {
            sanitizeOnBlur(event);
            commit(event.target.value);
          }}
        />
      ) : (
        <span className="block font-sans text-md text-banda-text-muted">
          {currentValue || '—'}
        </span>
      )}
    </div>
  );
}
