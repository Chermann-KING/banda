/**
 * Modèles interactifs : lien, fermable, sélectionnable.
 * Quand le badge est interactif, sa base HTML devient <a> ou <button>.
 */
import { useState } from 'react';
import type { ComponentPropsWithRef } from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import {
  BandaBadge,
  type BandaBadgeProps,
  type BandaBadgeTone,
} from '../BandaBadge';

/** Badge-lien (<a>) avec flèche. */
export interface LinkBadgeProps extends ComponentPropsWithRef<'a'> {
  tone?: BandaBadgeTone;
}

export function LinkBadge({ tone = 'neutral', className, children, ...rest }: LinkBadgeProps) {
  return (
    <a
      className={[
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-sans text-xs font-medium no-underline',
        'bg-banda-text text-banda-text-inverted transition-opacity duration-fast hover:opacity-80',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring focus-visible:ring-offset-2 ring-offset-banda-background',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-tone={tone}
      {...rest}
    >
      {children}
      <ArrowRight size={12} aria-hidden="true" />
    </a>
  );
}

/** Badge fermable : croix Lucide, disparaît au clic (onClose notifié). */
export interface ClosableBadgeProps extends BandaBadgeProps {
  onClose?: () => void;
  closeLabel?: string;
}

export function ClosableBadge({
  onClose,
  closeLabel = 'Fermer le badge',
  children,
  ...rest
}: ClosableBadgeProps) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <BandaBadge {...rest}>
      {children}
      <button
        type="button"
        aria-label={closeLabel}
        onClick={() => {
          setVisible(false);
          onClose?.();
        }}
        className="rounded-full text-current opacity-70 transition-opacity duration-fast hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring"
      >
        <X size={12} aria-hidden="true" />
      </button>
    </BandaBadge>
  );
}

/** Badge sélectionnable (<button aria-pressed>) : bascule au clic. */
export interface SelectableBadgeProps extends ComponentPropsWithRef<'button'> {
  tone?: BandaBadgeTone;
  defaultSelected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
}

export function SelectableBadge({
  tone = 'primary',
  defaultSelected = false,
  onSelectedChange,
  className,
  children,
  ...rest
}: SelectableBadgeProps) {
  const [selected, setSelected] = useState(defaultSelected);

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => {
        const next = !selected;
        setSelected(next);
        onSelectedChange?.(next);
      }}
      className={[
        'inline-flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-0.5 font-sans text-xs font-medium',
        'transition-colors duration-fast',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring focus-visible:ring-offset-2 ring-offset-banda-background',
        selected
          ? 'bg-banda-primary text-banda-primary-contrast'
          : 'border border-banda-border-strong bg-banda-surface text-banda-text hover:border-banda-primary',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-tone={tone}
      {...rest}
    >
      {selected ? <Check size={12} aria-hidden="true" /> : null}
      {children}
    </button>
  );
}
