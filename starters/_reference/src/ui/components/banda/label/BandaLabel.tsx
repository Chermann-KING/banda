import type { ComponentPropsWithRef } from 'react';

export interface BandaLabelProps extends ComponentPropsWithRef<'label'> {
  required?: boolean | undefined;
  /** Masque visuellement le label tout en le gardant accessible (sr-only). */
  hidden?: boolean | undefined;
}

/** Étend <label> natif. */
export function BandaLabel({ required, hidden = false, className, children, ...rest }: BandaLabelProps) {
  const classes = [
    hidden ? 'sr-only' : 'mb-1 block font-sans text-sm font-medium text-banda-text',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={classes} {...rest}>
      {children}
      {required ? (
        <span className="text-banda-danger" aria-hidden="true">
          {' '}
          *
        </span>
      ) : null}
    </label>
  );
}
