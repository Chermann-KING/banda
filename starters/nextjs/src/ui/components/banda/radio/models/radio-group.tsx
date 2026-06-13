/**
 * Groupe de radios : fieldset/legend natifs, name partagé généré si absent,
 * orientation, contrôlé ou non.
 */
import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import { BandaRadio, type RadioSize } from '@/ui/components/banda/radio/BandaRadio';

export interface RadioGroupOption {
  value: string;
  label: ReactNode;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  legend: string;
  /** Legend masquée visuellement mais accessible. */
  hideLegend?: boolean;
  options: readonly RadioGroupOption[];
  /** Mode contrôlé. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: 'vertical' | 'horizontal';
  size?: RadioSize;
  /** Name partagé du groupe — généré automatiquement si absent. */
  name?: string;
  className?: string;
}

export function RadioGroup({
  legend,
  hideLegend = false,
  options,
  value,
  defaultValue = '',
  onChange,
  orientation = 'vertical',
  size = 'md',
  name,
  className,
}: RadioGroupProps) {
  const autoName = useId();
  const groupName = name ?? autoName;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;

  const commit = (next: string) => {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
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
      <div
        className={
          orientation === 'horizontal' ? 'flex flex-wrap gap-x-4 gap-y-2' : 'flex flex-col gap-2'
        }
      >
        {options.map((option) => (
          <BandaRadio
            key={option.value}
            name={groupName}
            value={option.value}
            label={option.label}
            description={option.description}
            disabled={option.disabled}
            size={size}
            checked={currentValue === option.value}
            onChange={() => commit(option.value)}
          />
        ))}
      </div>
    </fieldset>
  );
}
