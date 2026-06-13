/**
 * Groupe de checkboxes : fieldset/legend natifs, orientation, case parente
 * « tout sélectionner » indéterminée en sélection partielle.
 */
import { useState } from 'react';
import type { ReactNode } from 'react';
import { BandaCheckbox, type CheckboxSize } from '../BandaCheckbox';

export interface CheckboxGroupOption {
  value: string;
  label: ReactNode;
  description?: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  legend: string;
  /** Legend masquée visuellement mais accessible. */
  hideLegend?: boolean;
  options: readonly CheckboxGroupOption[];
  /** Mode contrôlé. */
  values?: readonly string[];
  defaultValues?: readonly string[];
  onChange?: (values: readonly string[]) => void;
  /** Case parente « tout sélectionner » — indéterminée si sélection partielle. */
  selectAllLabel?: string;
  orientation?: 'vertical' | 'horizontal';
  size?: CheckboxSize;
  /** Participe aux formulaires (name partagé, une valeur par case). */
  name?: string;
  className?: string;
}

export function CheckboxGroup({
  legend,
  hideLegend = false,
  options,
  values,
  defaultValues = [],
  onChange,
  selectAllLabel,
  orientation = 'vertical',
  size = 'md',
  name,
  className,
}: CheckboxGroupProps) {
  const [internalValues, setInternalValues] = useState<readonly string[]>(defaultValues);
  const currentValues = values ?? internalValues;

  const commit = (next: readonly string[]) => {
    if (values === undefined) setInternalValues(next);
    onChange?.(next);
  };

  const toggle = (optionValue: string) => {
    commit(
      currentValues.includes(optionValue)
        ? currentValues.filter((value) => value !== optionValue)
        : [...currentValues, optionValue],
    );
  };

  const enabled = options.filter((option) => !option.disabled);
  const allChecked = enabled.length > 0 && enabled.every((option) => currentValues.includes(option.value));
  const someChecked = enabled.some((option) => currentValues.includes(option.value));

  const toggleAll = () => {
    const enabledValues = enabled.map((option) => option.value);
    commit(
      allChecked
        ? currentValues.filter((value) => !enabledValues.includes(value))
        : [...new Set([...currentValues, ...enabledValues])],
    );
  };

  return (
    <fieldset className={['m-0 border-0 p-0', className].filter(Boolean).join(' ')}>
      <legend
        className={
          hideLegend ? 'sr-only' : 'mb-2 block p-0 font-sans text-sm font-medium text-banda-text'
        }
      >
        {legend}
      </legend>
      {selectAllLabel ? (
        <BandaCheckbox
          label={selectAllLabel}
          size={size}
          checked={allChecked}
          indeterminate={!allChecked && someChecked}
          onChange={toggleAll}
          className="mb-2"
        />
      ) : null}
      <div
        className={[
          orientation === 'horizontal' ? 'flex flex-wrap gap-x-4 gap-y-2' : 'flex flex-col gap-2',
          selectAllLabel ? 'pl-6' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {options.map((option) => (
          <BandaCheckbox
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            description={option.description}
            disabled={option.disabled}
            size={size}
            checked={currentValues.includes(option.value)}
            onChange={() => toggle(option.value)}
          />
        ))}
      </div>
    </fieldset>
  );
}
