/**
 * Modèle confirmation : dialogue bloquant (role="alertdialog"), icône en
 * pastille AU-DESSUS du titre, alignement centrable, contenu additionnel
 * (liste, case « ne plus demander »…) entre la description et les actions.
 * Pas de croix ni de fermeture au clic extérieur — l'utilisateur doit choisir.
 */
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { BandaButton } from '@/ui/components/banda/button';
import { BandaDialog } from '@/ui/components/banda/dialog/BandaDialog';

export interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon?: LucideIcon;
  /** Contenu centré (icône, titre, description) façon confirmation de suppression. */
  align?: 'start' | 'center';
  /** Action irréversible : bouton de confirmation en danger. */
  destructive?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  /** Contenu additionnel entre la description et les actions. */
  children?: ReactNode;
}

export function AlertDialog({
  open,
  onClose,
  title,
  description,
  icon: Icon,
  align = 'start',
  destructive = false,
  confirmLabel = 'Continuer',
  cancelLabel = 'Annuler',
  onConfirm,
  children,
}: AlertDialogProps) {
  return (
    <BandaDialog
      open={open}
      onClose={onClose}
      alert
      size="sm"
      closeButton={false}
      closeOnBackdrop={false}
      title={title}
      description={description}
      headerAlign={align}
      headerIcon={
        Icon ? (
          <span
            className={[
              'flex h-10 w-10 items-center justify-center rounded-full',
              destructive
                ? 'bg-banda-danger-muted text-banda-danger'
                : 'bg-banda-primary-muted text-banda-primary',
            ].join(' ')}
          >
            <Icon size={18} aria-hidden="true" />
          </span>
        ) : undefined
      }
      footer={
        <>
          <BandaButton variant="outline" size="sm" onClick={onClose}>
            {cancelLabel}
          </BandaButton>
          <BandaButton
            variant={destructive ? 'danger' : 'primary'}
            size="sm"
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
          >
            {confirmLabel}
          </BandaButton>
        </>
      }
    >
      {children}
    </BandaDialog>
  );
}
