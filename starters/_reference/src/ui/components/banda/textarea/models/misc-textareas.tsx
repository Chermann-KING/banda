/**
 * Modèles divers : bouton d'action attaché, auto-agrandissement.
 */
import type { ChangeEvent } from 'react';
import { BandaButton } from '@/ui/components/banda/button';
import { BandaTextarea, type BandaTextareaProps } from '@/ui/components/banda/textarea/BandaTextarea';

/** Textarea avec bouton d'action sous le champ (Envoyer un avis…). */
export interface ButtonTextareaProps extends BandaTextareaProps {
  buttonLabel: string;
  /** Alignement du bouton sous le champ. @default 'start' */
  buttonAlign?: 'start' | 'end';
  onAction?: () => void;
}

export function ButtonTextarea({
  buttonLabel,
  buttonAlign = 'start',
  onAction,
  className,
  ...rest
}: ButtonTextareaProps) {
  return (
    <div className={className}>
      <BandaTextarea {...rest} />
      <div className={['mt-2 flex', buttonAlign === 'end' ? 'justify-end' : 'justify-start'].join(' ')}>
        <BandaButton size="sm" onClick={onAction}>
          {buttonLabel}
        </BandaButton>
      </div>
    </div>
  );
}

/** Textarea qui grandit avec le contenu — poignée désactivée, pas de scroll. */
export type AutoGrowTextareaProps = Omit<BandaTextareaProps, 'resize'>;

export function AutoGrowTextarea({ textareaClassName, onChange, rows = 2, ...rest }: AutoGrowTextareaProps) {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const element = event.target;
    // border-box : scrollHeight + bordures = hauteur exacte du contenu.
    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight + element.offsetHeight - element.clientHeight}px`;
    onChange?.(event);
  };

  return (
    <BandaTextarea
      rows={rows}
      resize="none"
      // !min-h-0 : annule le min-h-24 de la taille md — la hauteur suit `rows` puis le contenu.
      textareaClassName={['!min-h-0 overflow-hidden', textareaClassName].filter(Boolean).join(' ')}
      onChange={handleChange}
      {...rest}
    />
  );
}
