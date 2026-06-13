import { useId, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown, type LucideIcon } from 'lucide-react';
import { useAnchoredDropdown } from '../../../hooks/useAnchoredDropdown';
import { BandaLabel } from '../label/BandaLabel';
import { FieldFooter } from '../_shared/field-footer';
import { controlClasses, type ControlSize, type ControlVariant } from '../_shared/field-control';

export interface BandaSelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
  /** En-tête de groupe affiché au-dessus de la première option du groupe. */
  group?: string;
  /** Trait de séparation au-dessus de cette option. */
  separator?: boolean;
}

export interface BandaSelectProps {
  options: readonly BandaSelectOption[];
  /** Mode contrôlé. */
  value?: string;
  /** Mode non contrôlé. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  hideLabel?: boolean;
  hint?: string;
  error?: string;
  /** Validation embarquée, évaluée à la sélection et au blur. */
  validate?: (value: string) => string | null;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  size?: ControlSize;
  variant?: ControlVariant;
  id?: string;
  /** Rendu de la valeur dans le déclencheur (texte d'amorce, icône…). */
  renderValue?: (option: BandaSelectOption) => ReactNode;
  /** Animation d'ouverture de la liste (keyframes du preset). */
  animation?: 'slide' | 'zoom';
  /** Icône Lucide dans le déclencheur, avant la valeur. */
  startIcon?: LucideIcon;
  /** Classes additionnelles du déclencheur (contour/fond colorés…). */
  triggerClassName?: string;
  /** Participe aux formulaires via le <select> natif caché. */
  name?: string;
  className?: string;
}

/**
 * Étend <select> natif. Arbitrage validé : le popup d'options d'un <select>
 * n'étant pas stylable, le rendu passe par un listbox custom 100 % tokens
 * (pattern APG « select-only combobox », comme shadcn) ; un <select> natif
 * caché et synchronisé conserve la participation aux formulaires (name,
 * required, submit) et la philosophie « élément HTML de base ».
 */
export function BandaSelect({
  options,
  value,
  defaultValue,
  onChange,
  label,
  hideLabel = false,
  hint,
  error,
  validate,
  placeholder = 'Sélectionner…',
  disabled = false,
  required,
  size = 'md',
  variant = 'default',
  id,
  name,
  renderValue,
  animation,
  startIcon: StartIcon,
  triggerClassName,
  className,
}: BandaSelectProps) {
  const autoId = useId();
  const triggerId = id ?? autoId;
  const helpId = `${triggerId}-help`;
  const listboxId = `${triggerId}-listbox`;

  const { open, setOpen, triggerRef, listRef, style } = useAnchoredDropdown();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const [internalError, setInternalError] = useState<string | null>(null);

  const currentValue = value ?? internalValue;
  const selectedIndex = options.findIndex((option) => option.value === currentValue);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;
  const shownError = error ?? internalError ?? undefined;
  const optionId = (index: number) => `${listboxId}-option-${index}`;

  const firstEnabled = options.findIndex((option) => !option.disabled);

  /** Déplace l'index actif en sautant les options désactivées. */
  const moveActive = (from: number, direction: 1 | -1) => {
    let index = from + direction;
    while (index >= 0 && index < options.length && options[index]?.disabled) {
      index += direction;
    }
    return index >= 0 && index < options.length ? index : from;
  };

  const openList = () => {
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : firstEnabled);
    setOpen(true);
  };

  const runValidate = (nextValue: string) => {
    if (validate) setInternalError(validate(nextValue));
  };

  const selectOption = (option: BandaSelectOption) => {
    if (option.disabled) return;
    if (value === undefined) setInternalValue(option.value);
    onChange?.(option.value);
    runValidate(option.value);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!open) openList();
        else setActiveIndex((index) => moveActive(index, 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!open) openList();
        else setActiveIndex((index) => moveActive(index, -1));
        break;
      case 'Home':
      case 'End':
        if (open) {
          event.preventDefault();
          setActiveIndex(
            event.key === 'Home' ? firstEnabled : moveActive(options.length, -1),
          );
        }
        break;
      case 'Enter':
      case ' ': {
        event.preventDefault();
        if (!open) {
          openList();
        } else {
          const active = options[activeIndex];
          if (active) selectOption(active);
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
        <BandaLabel htmlFor={triggerId} required={required} hidden={hideLabel}>
          {label}
        </BandaLabel>
      ) : null}

      {/* Élément natif caché : participation aux formulaires + base HTML. */}
      <select
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        name={name}
        value={currentValue}
        required={required}
        disabled={disabled}
        onChange={() => undefined}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {typeof option.label === 'string' ? option.label : option.value}
          </option>
        ))}
      </select>

      <button
        ref={triggerRef}
        type="button"
        id={triggerId}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-activedescendant={open && activeIndex >= 0 ? optionId(activeIndex) : undefined}
        aria-invalid={shownError ? true : undefined}
        aria-describedby={hint || shownError ? helpId : undefined}
        aria-required={required || undefined}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onTriggerKeyDown}
        onBlur={() => runValidate(currentValue)}
        className={controlClasses({
          size,
          variant,
          invalid: shownError !== undefined,
          extra: [
            'flex cursor-pointer items-center justify-between gap-2 text-left disabled:cursor-not-allowed',
            triggerClassName,
          ]
            .filter(Boolean)
            .join(' '),
        })}
      >
        {StartIcon ? (
          <StartIcon size={16} className="shrink-0 text-banda-text-muted" aria-hidden="true" />
        ) : null}
        <span className="min-w-0 flex-1 truncate">
          {selected ? (
            (renderValue?.(selected) ?? selected.label)
          ) : (
            <span className="text-banda-text-placeholder">{placeholder}</span>
          )}
        </span>
        <ChevronDown
          size={16}
          className={[
            'pointer-events-none shrink-0 text-banda-text-muted transition-transform duration-fast',
            open ? 'rotate-180' : '',
          ].join(' ')}
          aria-hidden="true"
        />
      </button>

      {open
        ? createPortal(
            <ul
              ref={listRef}
              id={listboxId}
              role="listbox"
              aria-label={label}
              style={style}
              className={[
                'z-dropdown m-0 max-h-64 list-none overflow-y-auto rounded-md border border-banda-border bg-banda-surface p-1 shadow-lg',
                animation === 'slide' ? 'animate-banda-slide-up' : '',
                animation === 'zoom' ? 'animate-banda-zoom-in' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {options.map((option, index) => (
                <li key={option.value} className="m-0 list-none p-0">
                  {option.separator ? (
                    <hr role="presentation" className="my-1 border-banda-border" />
                  ) : null}
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
                  aria-selected={option.value === currentValue}
                  aria-disabled={option.disabled || undefined}
                  className={[
                    'flex cursor-pointer items-center justify-between gap-3 rounded-sm px-3 py-2 font-sans text-sm text-banda-text',
                    index === activeIndex && !option.disabled ? 'bg-banda-surface-muted' : '',
                    option.value === currentValue
                      ? 'bg-banda-primary-muted font-medium text-banda-primary'
                      : '',
                    option.disabled ? 'pointer-events-none opacity-50' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onMouseEnter={() => (option.disabled ? null : setActiveIndex(index))}
                  // mousedown empêché : le focus reste sur le déclencheur
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectOption(option)}
                >
                  <span className="min-w-0 flex-1">{option.label}</span>
                  {option.value === currentValue ? (
                    <Check size={14} className="shrink-0" aria-hidden="true" />
                  ) : null}
                  </div>
                </li>
              ))}
            </ul>,
            document.body,
          )
        : null}

      <FieldFooter helpId={helpId} hint={hint} error={shownError} />
    </div>
  );
}
