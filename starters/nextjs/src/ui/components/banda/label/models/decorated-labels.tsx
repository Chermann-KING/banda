/**
 * Modèles décoratifs de label : icône d'information, badge, pastille de statut.
 * Composent BandaLabel — le contenu accessoire reste accessible (sr-only/title).
 */
import { Info } from 'lucide-react';
import { BandaBadge, type BandaBadgeTone } from '@/ui/components/banda/badge';
import { BandaLabel, type BandaLabelProps } from '@/ui/components/banda/label/BandaLabel';

/** Label avec icône d'information — l'aide est portée par le title natif. */
export interface InfoLabelProps extends BandaLabelProps {
  /** Texte d'aide affiché au survol de l'icône. */
  info: string;
}

export function InfoLabel({ info, children, ...rest }: InfoLabelProps) {
  return (
    <BandaLabel {...rest}>
      <span className="inline-flex items-center gap-1">
        {children}
        <span title={info} className="inline-flex cursor-help">
          <Info size={14} className="text-banda-text-muted" aria-hidden="true" />
          <span className="sr-only">{info}</span>
        </span>
      </span>
    </BandaLabel>
  );
}

/** Label avec badge attaché (Live, Beta, Nouveau…). */
export interface BadgeLabelProps extends BandaLabelProps {
  badge: string;
  badgeTone?: BandaBadgeTone;
}

export function BadgeLabel({ badge, badgeTone = 'success', children, ...rest }: BadgeLabelProps) {
  return (
    <BandaLabel {...rest}>
      <span className="inline-flex items-center gap-2">
        {children}
        <BandaBadge tone={badgeTone}>{badge}</BandaBadge>
      </span>
    </BandaLabel>
  );
}

/** Label avec pastille de statut colorée. */
export type LabelStatus = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

const DOT: Record<LabelStatus, string> = {
  success: 'bg-banda-success',
  warning: 'bg-banda-warning',
  danger: 'bg-banda-danger',
  info: 'bg-banda-info',
  neutral: 'bg-banda-border-strong',
};

export interface StatusDotLabelProps extends BandaLabelProps {
  status?: LabelStatus;
  /** Libellé accessible du statut (« En ligne »…) — la couleur seule ne suffit pas. */
  statusLabel?: string;
}

export function StatusDotLabel({ status = 'success', statusLabel, children, ...rest }: StatusDotLabelProps) {
  return (
    <BandaLabel {...rest}>
      <span className="inline-flex items-center gap-2">
        {children}
        <span className={`h-2 w-2 rounded-full ${DOT[status]}`} aria-hidden="true" />
        {statusLabel ? <span className="sr-only">{statusLabel}</span> : null}
      </span>
    </BandaLabel>
  );
}
