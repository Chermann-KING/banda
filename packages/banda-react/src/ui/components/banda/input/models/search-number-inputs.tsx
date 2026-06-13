/**
 * Modèles recherche (sanitizée) et nombre (stepper).
 */
import { useId, useState } from 'react';
import type { ChangeEvent, ComponentPropsWithRef } from 'react';
import { ChevronDown, ChevronUp, Loader2, Minus, Plus, Search, X } from 'lucide-react';
import { stripDangerous } from '@banda/fields';
import { BandaLabel } from '../../label/BandaLabel';
import { controlClasses } from '../../_shared/field-control';

export interface SearchInputProps extends Omit<ComponentPropsWithRef<'input'>, 'size' | 'type'> {
  label?: string;
  /** Raccourci affiché en <kbd> (ex : 'Ctrl K'). */
  kbd?: string;
  /** Affiche un Loader2 animé (recherche en cours). */
  loading?: boolean;
}

/** Recherche : icône Search, saisie sanitizée, effacement, kbd ou loader. */
export function SearchInput({
  label = 'Recherche',
  kbd,
  loading = false,
  id,
  placeholder = 'Rechercher…',
  onChange,
  className,
  ...rest
}: SearchInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value = stripDangerous(event.target.value);
    setValue(event.target.value);
    onChange?.(event);
  };

  return (
    <div className={className}>
      <BandaLabel htmlFor={inputId} hidden>
        {label}
      </BandaLabel>
      <div className="relative">
        <Search
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-banda-text-muted"
        />
        <input
          id={inputId}
          type="search"
          inputMode="search"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={controlClasses({ extra: 'pl-10 pr-10' })}
          {...rest}
        />
        <span className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
          {loading ? (
            <Loader2 size={16} className="animate-spin text-banda-text-muted" aria-hidden="true" />
          ) : value ? (
            <button
              type="button"
              onClick={() => setValue('')}
              aria-label="Effacer la recherche"
              className="rounded-sm p-1 text-banda-text-muted transition-colors duration-fast hover:text-banda-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring"
            >
              <X size={14} aria-hidden="true" />
            </button>
          ) : kbd ? (
            <kbd className="rounded-sm border border-banda-border bg-banda-surface-muted px-1 font-mono text-xs text-banda-text-muted">
              {kbd}
            </kbd>
          ) : null}
        </span>
      </div>
    </div>
  );
}

export interface NumberInputProps {
  label: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  /** Boutons empilés (chevrons) à droite plutôt que de part et d'autre. */
  stacked?: boolean;
  disabled?: boolean;
  id?: string;
  onValueChange?: (value: number) => void;
}

const STEP_BUTTON =
  'flex items-center justify-center border border-banda-border bg-banda-surface-muted ' +
  'text-banda-text-muted transition-colors duration-fast hover:text-banda-text ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring ' +
  'disabled:pointer-events-none disabled:opacity-50';

/** Nombre avec boutons +/- (côte à côte ou chevrons empilés). */
export function NumberInput({
  label,
  defaultValue = 0,
  min,
  max,
  step = 1,
  stacked = false,
  disabled = false,
  id,
  onValueChange,
}: NumberInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [value, setValue] = useState(defaultValue);

  const clamp = (next: number) => {
    if (min !== undefined && next < min) return min;
    if (max !== undefined && next > max) return max;
    return next;
  };

  const update = (next: number) => {
    const clamped = clamp(next);
    setValue(clamped);
    onValueChange?.(clamped);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/[^\d-]/g, '');
    const parsed = Number(digits);
    if (!Number.isNaN(parsed)) update(parsed);
  };

  const input = (
    <input
      id={inputId}
      type="text"
      inputMode="numeric"
      role="spinbutton"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      value={value}
      disabled={disabled}
      onChange={handleChange}
      className={controlClasses({
        extra: stacked
          ? 'rounded-r-none text-center'
          : 'rounded-none border-x-0 text-center',
      })}
    />
  );

  return (
    <div>
      <BandaLabel htmlFor={inputId}>{label}</BandaLabel>
      {stacked ? (
        <div className="flex">
          {input}
          <span className="flex flex-col">
            <button
              type="button"
              aria-label="Augmenter"
              disabled={disabled}
              onClick={() => update(value + step)}
              className={`${STEP_BUTTON} h-5 w-8 rounded-md rounded-b-none rounded-l-none border-l-0`}
            >
              <ChevronUp size={12} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Diminuer"
              disabled={disabled}
              onClick={() => update(value - step)}
              className={`${STEP_BUTTON} h-5 w-8 rounded-md rounded-t-none rounded-l-none border-l-0 border-t-0`}
            >
              <ChevronDown size={12} aria-hidden="true" />
            </button>
          </span>
        </div>
      ) : (
        <div className="flex">
          <button
            type="button"
            aria-label="Diminuer"
            disabled={disabled}
            onClick={() => update(value - step)}
            className={`${STEP_BUTTON} h-10 w-10 rounded-md rounded-r-none border-r-0`}
          >
            <Minus size={14} aria-hidden="true" />
          </button>
          {input}
          <button
            type="button"
            aria-label="Augmenter"
            disabled={disabled}
            onClick={() => update(value + step)}
            className={`${STEP_BUTTON} h-10 w-10 rounded-md rounded-l-none border-l-0`}
          >
            <Plus size={14} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
