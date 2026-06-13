/**
 * Modèles de statut : pastille, icône d'état, compteur.
 */
import { Ban, CircleCheck, Clock, type LucideIcon } from 'lucide-react';
import { BandaBadge, type BandaBadgeProps, type BandaBadgeTone } from '../BandaBadge';

/** Badge avec pastille colorée (● In Progress). */
export interface DotBadgeProps extends BandaBadgeProps {
  tone?: BandaBadgeTone;
}

const DOT_COLOR: Record<BandaBadgeTone, string> = {
  neutral: 'bg-banda-text-muted',
  primary: 'bg-banda-primary',
  secondary: 'bg-banda-secondary',
  success: 'bg-banda-success',
  warning: 'bg-banda-warning',
  danger: 'bg-banda-danger',
  info: 'bg-banda-info',
};

export function DotBadge({ tone = 'neutral', children, ...rest }: DotBadgeProps) {
  return (
    <BandaBadge tone={tone} fill="soft" {...rest}>
      <span className={`h-1.5 w-1.5 rounded-full ${DOT_COLOR[tone]}`} aria-hidden="true" />
      {children}
    </BandaBadge>
  );
}

/** Badge d'état avec icône Lucide (pending / failed / success). */
export type BadgeStatus = 'pending' | 'failed' | 'success';

const STATUS: Record<BadgeStatus, { tone: BandaBadgeTone; icon: LucideIcon }> = {
  pending: { tone: 'warning', icon: Clock },
  failed: { tone: 'danger', icon: Ban },
  success: { tone: 'success', icon: CircleCheck },
};

export interface StatusBadgeProps extends Omit<BandaBadgeProps, 'tone'> {
  status: BadgeStatus;
}

export function StatusBadge({ status, fill = 'outline', children, ...rest }: StatusBadgeProps) {
  const { tone, icon: Icon } = STATUS[status];
  return (
    <BandaBadge tone={tone} fill={fill} {...rest}>
      <Icon size={12} aria-hidden="true" />
      {children}
    </BandaBadge>
  );
}

/** Compteur compact (notifications). */
export interface CountBadgeProps extends BandaBadgeProps {
  count: number;
  /** Au-delà, affiche « max+ ». @default 99 */
  max?: number;
}

export function CountBadge({ count, max = 99, tone = 'neutral', className, ...rest }: CountBadgeProps) {
  return (
    <BandaBadge
      tone={tone}
      fill="solid"
      className={['min-w-5 justify-center px-1.5 tabular-nums', className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {count > max ? `${max}+` : count}
    </BandaBadge>
  );
}
