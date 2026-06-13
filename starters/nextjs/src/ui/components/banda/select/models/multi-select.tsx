/**
 * MultiSelect — sélection multiple avec chips dans le déclencheur,
 * suppression unitaire, effacement global, listbox custom 100 % tokens.
 * Un <select multiple> natif caché assure la participation aux formulaires.
 */
import { useId, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown, X } from 'lucide-react';
import { useAnchoredDropdown } from '@/ui/hooks/useAnchoredDropdown';
import { BandaLabel } from '@/ui/components/banda/label/BandaLabel';
import { FieldFooter } from '@/ui/components/banda/_shared/field-footer';
import type { BandaSelectOption } from '@/ui/components/banda/select/BandaSelect';

export interface MultiSelectProps {
  options: readonly BandaSelectOption[];
  /** Mode contrôlé. */
  values?: readonly string[];
  defaultValues?: readonly string[];
  onChange?: (values: readonly string[]) => void;
  label?: string;
  hideLabel?: boolean;
  hint?: string;
  error?: string;
  placeholder?: string;
  /** Bouton d'effacement global. @default true */
  clearable?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

export function MultiSelect({
  options,
  values,
  defaultValues = [],
  onChange,
  label,
  hideLabel = false,
  hint,
  error,
  placeholder = 'Sélectionner…',
  clearable = true,
  disabled = false,
  id,
  name,
  className,
}: MultiSelectProps) {
  const autoId = useId();
  const triggerId = id ?? autoId;
  const helpId = `${triggerId}-help`;
  const listboxId = `${triggerId}-listbox`;

  const { open, setOpen, triggerRef, listRef, style } = useAnchoredDropdown<HTMLUListElement, HTMLDivElement>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [internalValues, setInternalValues] = useState<readonly string[]>(defaultValues);

  const currentValues = values ?? internalValues;
  const selectedOptions = options.filter((option) => currentValues.includes(option.value));

  const commit = (next: readonly string[]) => {
    if (values === undefined) setInternalValues(next);
    onChange?.(next);
  };

  const toggleOption = (option: BandaSelectOption) => {
    if (option.disabled) return;
    commit(
      currentValues.includes(option.value)
        ? currentValues.filter((v) => v !== option.value)
        : [...currentValues, option.value],
    );
    // La liste reste ouverte : c'est une sélection multiple.
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        if (!open) setOpen(true);
        else
          setActiveIndex((index) =>
            event.key === 'ArrowDown'
              ? Math.min(index + 1, options.length - 1)
              : Math.max(index - 1, 0),
          );
        break;
      case 'Enter':
      case ' ': {
        event.preventDefault();
        if (!open) setOpen(true);
        else {
          const active = options[activeIndex];
          if (active) toggleOption(active);
        }
        break;
      }
      case 'Escape':
      case 'Tab':
        setOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className={className}>
      {label ? (
        <BandaLabel htmlFor={triggerId} hidden={hideLabel}>
          {label}
        </BandaLabel>
      ) : null}

      {/* Élément natif caché : participation aux formulaires. */}
      <select
        multiple
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        name={name}
        value={[...currentValues]}
        disabled={disabled}
        onChange={() => undefined}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {typeof option.label === 'string' ? option.label : option.value}
          </option>
        ))}
      </select>

      {/* div role=combobox : les chips contiennent de vrais boutons (interdit dans un <button>). */}
      <div
        ref={triggerRef}
        id={triggerId}
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-invalid={error ? true : undefined}
        aria-describedby={hint || error ? helpId : undefined}
        onClick={() => (disabled ? null : setOpen(!open))}
        onKeyDown={onTriggerKeyDown}
        className={[
          'flex min-h-10 w-full cursor-pointer flex-wrap items-center gap-1 rounded-md border px-2 py-1',
          'bg-banda-surface font-sans text-md text-banda-text outline-none transition-colors duration-fast',
          'focus-visible:border-banda-primary focus-visible:ring-2 focus-visible:ring-banda-focus-ring',
          error
            ? 'border-banda-danger'
            : 'border-banda-border hover:border-banda-border-strong',
          disabled ? 'pointer-events-none bg-banda-surface-muted opacity-50' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {selectedOptions.length === 0 ? (
          <span className="px-1 text-banda-text-placeholder">{placeholder}</span>
        ) : (
          selectedOptions.map((option) => (
            <span
              key={option.value}
              className="flex items-center gap-1 rounded-sm bg-banda-surface-muted px-2 font-sans text-xs font-medium text-banda-text"
            >
              {option.label}
              <button
                type="button"
                aria-label={`Retirer ${typeof option.label === 'string' ? option.label : option.value}`}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleOption(option);
                }}
                className="rounded-sm text-banda-text-muted hover:text-banda-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring"
              >
                <X size={12} aria-hidden="true" />
              </button>
            </span>
          ))
        )}
        <span className="ml-auto flex items-center gap-1">
          {clearable && selectedOptions.length > 0 ? (
            <button
              type="button"
              aria-label="Tout effacer"
              onClick={(event) => {
                event.stopPropagation();
                commit([]);
              }}
              className="rounded-sm p-1 text-banda-text-muted hover:text-banda-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring"
            >
              <X size={14} aria-hidden="true" />
            </button>
          ) : null}
          <ChevronDown
            size={16}
            aria-hidden="true"
            className={[
              'pointer-events-none shrink-0 text-banda-text-muted transition-transform duration-fast',
              open ? 'rotate-180' : '',
            ].join(' ')}
          />
        </span>
      </div>

      {open
        ? createPortal(
            <ul
              ref={listRef}
              id={listboxId}
              role="listbox"
              aria-multiselectable="true"
              aria-label={label}
              style={style}
              className="z-dropdown m-0 max-h-64 list-none overflow-y-auto rounded-md border border-banda-border bg-banda-surface p-1 shadow-lg"
            >
              {options.map((option, index) => {
                const checked = currentValues.includes(option.value);
                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={checked}
                    aria-disabled={option.disabled || undefined}
                    className={[
                      'flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 font-sans text-sm text-banda-text',
                      index === activeIndex ? 'bg-banda-surface-muted' : '',
                      option.disabled ? 'pointer-events-none opacity-50' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => toggleOption(option)}
                  >
                    <span
                      aria-hidden="true"
                      className={[
                        'flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border',
                        checked
                          ? 'border-banda-primary bg-banda-primary text-banda-primary-contrast'
                          : 'border-banda-border-strong bg-banda-surface',
                      ].join(' ')}
                    >
                      {checked ? <Check size={12} /> : null}
                    </span>
                    <span className="min-w-0 flex-1">{option.label}</span>
                  </li>
                );
              })}
            </ul>,
            document.body,
          )
        : null}

      <FieldFooter helpId={helpId} hint={hint} error={error} />
    </div>
  );
}
