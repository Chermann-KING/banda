import { useEffect, useId, useRef } from 'react';
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react';
import { X } from 'lucide-react';

export type DialogSize = 'sm' | 'md' | 'lg' | 'fullscreen';

export interface BandaDialogProps {
  open: boolean;
  onClose: () => void;
  /** Titre relié par aria-labelledby. */
  title?: string;
  /** Description reliée par aria-describedby. */
  description?: string;
  size?: DialogSize;
  /** Animation d'ouverture (keyframes du preset). */
  animation?: 'zoom' | 'slide';
  /** Croix de fermeture. @default true */
  closeButton?: boolean;
  /** Ferme au clic sur l'arrière-plan. @default true */
  closeOnBackdrop?: boolean;
  /** role="alertdialog" — confirmation bloquante. */
  alert?: boolean;
  /** Élément décoratif au-dessus du titre (icône en pastille…). */
  headerIcon?: ReactNode;
  /** Alignement de l'en-tête (et du corps si centré). @default 'start' */
  headerAlign?: 'start' | 'center';
  /** Filets sous l'en-tête et au-dessus du pied (en-tête/pied « sticky »). */
  dividers?: boolean;
  footer?: ReactNode;
  className?: string;
  children: ReactNode;
}

const SIZE: Record<DialogSize, string> = {
  sm: 'w-full max-w-sm',
  md: 'w-full max-w-md',
  lg: 'w-full max-w-xl',
  fullscreen: 'h-dvh max-h-none w-screen max-w-none rounded-none border-0',
};

/**
 * Étend <dialog> natif : focus trap, Échap et inertie du fond fournis par
 * la plateforme. L'en-tête et le pied restent visibles, seul le corps défile.
 */
export function BandaDialog({
  open,
  onClose,
  title,
  description,
  size = 'md',
  animation,
  closeButton = true,
  closeOnBackdrop = true,
  alert = false,
  headerIcon,
  headerAlign = 'start',
  dividers = false,
  footer,
  className,
  children,
}: BandaDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const baseId = useId();
  const titleId = `${baseId}-title`;
  const descriptionId = `${baseId}-description`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const onBackdropClick = (event: ReactMouseEvent<HTMLDialogElement>) => {
    if (closeOnBackdrop && event.target === dialogRef.current) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      role={alert ? 'alertdialog' : undefined}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : undefined}
      onClose={onClose}
      onClick={onBackdropClick}
      className={[
        'm-auto flex-col rounded-lg border border-banda-border bg-banda-surface p-0 shadow-lg',
        'open:flex',
        'backdrop:bg-banda-overlay',
        SIZE[size],
        animation === 'zoom' ? 'animate-banda-zoom-in' : '',
        animation === 'slide' ? 'animate-banda-slide-up' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {closeButton ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la fenêtre"
          className="absolute right-4 top-4 rounded-sm p-1 text-banda-text-muted transition-colors duration-fast hover:text-banda-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring"
        >
          <X size={16} aria-hidden="true" />
        </button>
      ) : null}
      {title || description || headerIcon ? (
        <header
          className={[
            'flex shrink-0 flex-col gap-1 px-6 pb-4 pt-6',
            headerAlign === 'center' ? 'items-center text-center' : '',
            dividers ? 'border-b border-banda-border' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {headerIcon ? <span className="mb-2">{headerIcon}</span> : null}
          {title ? (
            <h2
              id={titleId}
              className={[
                'm-0 font-sans text-lg font-semibold text-banda-text',
                headerAlign === 'center' ? '' : 'pr-6',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {title}
            </h2>
          ) : null}
          {description ? (
            <p id={descriptionId} className="m-0 font-sans text-sm text-banda-text-muted">
              {description}
            </p>
          ) : null}
        </header>
      ) : null}
      <div
        className={[
          'min-h-0 flex-1 overflow-y-auto px-6 pb-6',
          title || description || headerIcon ? 'pt-2' : 'pt-6',
          headerAlign === 'center' ? 'text-center' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
      {footer ? (
        <footer
          className={[
            'flex shrink-0 flex-wrap items-center justify-end gap-2 px-6 py-4',
            dividers ? 'border-t border-banda-border' : 'pt-0',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {footer}
        </footer>
      ) : null}
    </dialog>
  );
}
