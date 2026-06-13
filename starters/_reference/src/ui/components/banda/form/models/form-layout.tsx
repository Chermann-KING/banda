/**
 * Modèles de mise en page de formulaire : en-tête (titre + description)
 * et rangée d'actions (boutons).
 */
import type { ReactNode } from 'react';

/** En-tête de formulaire ou de section (Signaler un problème…). */
export interface FormHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function FormHeader({ title, description, className }: FormHeaderProps) {
  return (
    <div className={['flex flex-col gap-1', className].filter(Boolean).join(' ')}>
      <h3 className="m-0 font-sans text-md font-semibold text-banda-text">{title}</h3>
      {description ? (
        <p className="m-0 font-sans text-sm text-banda-text-muted">{description}</p>
      ) : null}
    </div>
  );
}

/** Rangée d'actions : reset/submit, alignée à gauche ou à droite. */
export interface FormActionsProps {
  /** @default 'start' */
  align?: 'start' | 'end';
  children: ReactNode;
  className?: string;
}

export function FormActions({ align = 'start', children, className }: FormActionsProps) {
  return (
    <div
      className={[
        'flex flex-wrap items-center gap-2',
        align === 'end' ? 'justify-end' : 'justify-start',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
