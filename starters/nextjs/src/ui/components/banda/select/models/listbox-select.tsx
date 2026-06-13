/**
 * ListboxSelect — liste toujours visible (pas de dropdown), sélection
 * simple, groupes optionnels. 100 % tokens, clavier complet.
 */
import { useId, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Check } from 'lucide-react';
import { BandaLabel } from '@/ui/components/banda/label/BandaLabel';
import type { BandaSelectOption } from '@/ui/components/banda/select/BandaSelect';

export interface ListboxSelectProps {
  options: readonly BandaSelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Sélection multiple (équivalent custom du <select multiple>). */
  multiple?: boolean;
  defaultValues?: readonly string[];
  onValuesChange?: (values: readonly string[]) => void;
  label?: string;
  hideLabel?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
}

export function ListboxSelect({
  options,
  value,
  defaultValue = '',
  onChange,
  multiple = false,
  defaultValues = [],
  onValuesChange,
  label,
  hideLabel = false,
  disabled = false,
  id,
  name,
  className,
}: ListboxSelectProps) {
  const autoId = useId();
  const listboxId = id ?? autoId;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [internalValues, setInternalValues] = useState<readonly string[]>(defaultValues);
  const currentValue = value ?? internalValue;
  const isSelected = (option: BandaSelectOption) =>
    multiple ? internalValues.includes(option.value) : option.value === currentValue;
  const selectedIndex = options.findIndex((option) => option.value === currentValue);
  const [activeIndex, setActiveIndex] = useState(selectedIndex >= 0 ? selectedIndex : 0);
  const optionId = (index: number) => `${listboxId}-option-${index}`;

  const select = (option: BandaSelectOption) => {
    if (option.disabled) return;
    if (multiple) {
      const next = internalValues.includes(option.value)
        ? internalValues.filter((v) => v !== option.value)
        : [...internalValues, option.value];
      setInternalValues(next);
      onValuesChange?.(next);
      return;
    }
    if (value === undefined) setInternalValue(option.value);
    onChange?.(option.value);
  };

  const moveActive = (from: number, direction: 1 | -1) => {
    let index = from + direction;
    while (index >= 0 && index < options.length && options[index]?.disabled) {
      index += direction;
    }
    return index >= 0 && index < options.length ? index : from;
  };

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (disabled) return;
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((index) => moveActive(index, event.key === 'ArrowDown' ? 1 : -1));
        break;
      case 'Enter':
      case ' ': {
        event.preventDefault();
        const active = options[activeIndex];
        if (active) select(active);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className={className}>
      {label ? (
        <BandaLabel htmlFor={listboxId} hidden={hideLabel}>
          {label}
        </BandaLabel>
      ) : null}

      {/* Élément natif caché : participation aux formulaires. */}
      <select
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        name={name}
        multiple={multiple || undefined}
        value={multiple ? [...internalValues] : currentValue}
        disabled={disabled}
        onChange={() => undefined}
      >
        <option value="" />
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {typeof option.label === 'string' ? option.label : option.value}
          </option>
        ))}
      </select>

      <ul
        id={listboxId}
        role="listbox"
        aria-multiselectable={multiple || undefined}
        aria-label={label}
        aria-activedescendant={optionId(activeIndex)}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={onKeyDown}
        className={[
          'm-0 max-h-64 list-none overflow-y-auto rounded-md border border-banda-border bg-banda-surface p-1',
          'outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring',
          disabled ? 'pointer-events-none opacity-50' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {options.map((option, index) => (
          <li key={option.value} className="m-0 list-none p-0">
            {option.group && options[index - 1]?.group !== option.group ? (
              <span
                role="presentation"
                className="block px-3 pb-1 pt-2 font-sans text-xs font-semibold uppercase tracking-wide text-banda-text-muted"
              >
                {option.group}
              </span>
            ) : null}
            <div
              id={optionId(index)}
              role="option"
              aria-selected={isSelected(option)}
              aria-disabled={option.disabled || undefined}
              className={[
                'flex cursor-pointer items-center justify-between gap-3 rounded-sm px-3 py-2 font-sans text-sm text-banda-text',
                index === activeIndex && !option.disabled ? 'bg-banda-surface-muted' : '',
                isSelected(option) ? 'bg-banda-primary-muted font-medium text-banda-primary' : '',
                option.disabled ? 'pointer-events-none opacity-50' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onMouseEnter={() => (option.disabled ? null : setActiveIndex(index))}
              onClick={() => select(option)}
            >
              <span className="min-w-0 flex-1">{option.label}</span>
              {isSelected(option) ? (
                <Check size={14} className="shrink-0" aria-hidden="true" />
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
