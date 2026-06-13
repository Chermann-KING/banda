/**
 * Modèles statiques de BandaButton — compositions prêtes à l'emploi.
 * Un modèle = une intention d'usage ; tous héritent des tokens via BandaButton.
 */
import type { ReactNode } from 'react';
import { Bell, Chrome, Facebook, Github, Twitter, type LucideIcon } from 'lucide-react';
import { BandaButton, type BandaButtonProps } from '@/ui/components/banda/button/BandaButton';

/** Bouton icône seule — aria-label obligatoire. */
export interface IconButtonProps extends Omit<BandaButtonProps, 'size' | 'children'> {
  icon: LucideIcon;
  'aria-label': string;
}

export function IconButton({ icon: Icon, ...rest }: IconButtonProps) {
  return (
    <BandaButton size="icon" {...rest}>
      <Icon size={16} aria-hidden="true" />
    </BandaButton>
  );
}

/** Bouton avec compteur (Messages 99+). */
export interface CounterButtonProps extends BandaButtonProps {
  count: string;
}

export function CounterButton({ count, children, ...rest }: CounterButtonProps) {
  return (
    <BandaButton variant="outline" {...rest}>
      {children}
      <span className="rounded-full bg-banda-danger-muted px-2 font-sans text-xs font-semibold text-banda-danger">
        {count}
      </span>
    </BandaButton>
  );
}

/** Bouton avec pastille de notification. */
export interface NotificationButtonProps extends Omit<BandaButtonProps, 'children'> {
  children?: ReactNode;
}

export function NotificationButton({ children = 'Notifications', ...rest }: NotificationButtonProps) {
  return (
    <BandaButton variant="outline" className="relative" {...rest}>
      <Bell size={16} aria-hidden="true" />
      {children}
      <span
        className="absolute right-1 top-1 h-2 w-2 rounded-full bg-banda-danger"
        aria-hidden="true"
      />
    </BandaButton>
  );
}

/** Bouton pilule (rounded-full). */
export function PillButton({ className, ...rest }: BandaButtonProps) {
  return <BandaButton className={['rounded-full', className].filter(Boolean).join(' ')} {...rest} />;
}

/** Outline pointillé (Download…). */
export function DashedButton({ className, ...rest }: BandaButtonProps) {
  return (
    <BandaButton
      variant="outline"
      className={['border-dashed', className].filter(Boolean).join(' ')}
      {...rest}
    />
  );
}

/** Connexion sociale — icônes de marque Lucide uniquement. */
const SOCIAL = {
  google: { icon: Chrome, label: 'Continuer avec Google' },
  x: { icon: Twitter, label: 'Continuer avec X' },
  facebook: { icon: Facebook, label: 'Continuer avec Facebook' },
  github: { icon: Github, label: 'Continuer avec GitHub' },
} as const;

export type SocialProvider = keyof typeof SOCIAL;

export interface SocialButtonProps extends Omit<BandaButtonProps, 'children'> {
  provider: SocialProvider;
  children?: ReactNode;
}

export function SocialButton({ provider, children, className, ...rest }: SocialButtonProps) {
  const { icon: Icon, label } = SOCIAL[provider];
  return (
    <BandaButton
      variant="outline"
      className={['w-full justify-start', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <Icon size={16} aria-hidden="true" />
      <span className="flex-1 text-center">{children ?? label}</span>
    </BandaButton>
  );
}
