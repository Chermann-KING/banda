/**
 * Modèles dégradés — uniquement des couleurs de tokens dans les dégradés :
 * recolorer tokens.json met à jour ces badges comme le reste.
 */
import type { ComponentPropsWithRef } from 'react';

/** Badge plein sur dégradé de tokens. */
export function GradientBadge({ className, ...rest }: ComponentPropsWithRef<'span'>) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-sans text-xs font-medium',
        'bg-gradient-to-r from-banda-primary to-banda-secondary text-banda-primary-contrast',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    />
  );
}

/** Contour dégradé : wrapper p-px en dégradé, intérieur sur la surface. */
export function GradientOutlineBadge({ className, children, ...rest }: ComponentPropsWithRef<'span'>) {
  return (
    <span
      className={[
        'inline-flex rounded-full bg-gradient-to-r from-banda-primary to-banda-info p-px',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <span className="inline-flex items-center gap-1 rounded-full bg-banda-surface px-2.5 py-0.5 font-sans text-xs font-medium text-banda-text">
        {children}
      </span>
    </span>
  );
}
