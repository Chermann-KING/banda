import { CONTROL_VARIANT, type ControlSize, type ControlVariant } from '../_shared/field-control';

export type TextareaResize = 'none' | 'y' | 'both';

export interface TextareaClassOptions {
  size?: ControlSize;
  variant?: ControlVariant;
  resize?: TextareaResize;
  invalid?: boolean;
  extra?: string;
}

const SIZE: Record<ControlSize, string> = {
  sm: 'min-h-16 p-2 text-sm',
  md: 'min-h-24 p-3 text-md',
  lg: 'min-h-32 p-4 text-lg',
};

const RESIZE: Record<TextareaResize, string> = {
  none: 'resize-none',
  y: 'resize-y',
  both: 'resize',
};

export function textareaClasses({
  size = 'md',
  variant = 'default',
  resize = 'y',
  invalid = false,
  extra,
}: TextareaClassOptions): string {
  return [
    'w-full rounded-md border font-sans text-banda-text',
    'outline-none transition-colors duration-fast',
    'placeholder:text-banda-text-placeholder',
    'focus-visible:border-banda-primary focus-visible:ring-2 focus-visible:ring-banda-focus-ring',
    'disabled:cursor-not-allowed disabled:bg-banda-surface-muted disabled:text-banda-text-muted disabled:border-banda-border-muted',
    'read-only:bg-banda-surface-muted read-only:text-banda-text-muted',
    SIZE[size],
    RESIZE[resize],
    CONTROL_VARIANT[variant],
    invalid
      ? 'border-banda-danger hover:border-banda-danger focus-visible:border-banda-danger focus-visible:ring-banda-danger'
      : '',
    extra,
  ]
    .filter(Boolean)
    .join(' ');
}
