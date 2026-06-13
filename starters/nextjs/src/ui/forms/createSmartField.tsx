import type { FieldSpec } from '@banda/fields';
import { controlClasses } from '@/ui/components/banda/_shared/field-control';
import { FormField } from './FormField';
import { useSmartField } from './useSmartField';

export interface SmartFieldProps {
  /** Nom du champ dans le formulaire. */
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  /** id HTML (défaut : name). */
  id?: string;
  /** Surcharges ponctuelles des valeurs de la spec. */
  placeholder?: string;
  hint?: string;
}

/**
 * Factory DRY : une FieldSpec → un composant auto-porteur.
 * Toute l'intelligence vit dans la spec (@banda/fields) ;
 * ici on ne fait que câbler le rendu. Chaque champ concret = 1 ligne.
 */
export function createSmartField(spec: FieldSpec, displayName: string) {
  function SmartField({ name, label, required, disabled, id, placeholder, hint }: SmartFieldProps) {
    const field = useSmartField(name, spec);
    const inputId = id ?? name;

    return (
      <FormField
        id={inputId}
        label={label}
        required={required}
        hint={hint ?? spec.hint}
        error={field.error}
        counter={
          spec.counter && spec.maxLength
            ? { length: field.value.length, max: spec.maxLength }
            : undefined
        }
      >
        <input
          id={inputId}
          name={name}
          type={spec.type}
          inputMode={spec.inputMode}
          autoComplete={spec.autoComplete}
          placeholder={placeholder ?? spec.placeholder}
          maxLength={spec.maxLength}
          disabled={disabled}
          className={controlClasses({ invalid: field.error !== undefined })}
          aria-invalid={field.error !== undefined || undefined}
          aria-describedby={`${inputId}-help`}
          aria-required={required || undefined}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
      </FormField>
    );
  }
  SmartField.displayName = displayName;
  return SmartField;
}
