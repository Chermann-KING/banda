/**
 * Modèles animés de BandaButton — chaque animation vient des keyframes
 * du preset @banda/tailwind (design system) : recolorer les tokens
 * met à jour tous les modèles, animations comprises.
 */
import { useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { BandaButton, type BandaButtonProps } from '@/ui/components/banda/button/BandaButton';

const join = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' ');

/** Enfonce le bouton au clic. */
export function TapButton({ className, ...rest }: BandaButtonProps) {
  return (
    <BandaButton
      className={join('transition-transform active:scale-95', className)}
      {...rest}
    />
  );
}

/** Grossit au survol. */
export function GrowButton({ className, ...rest }: BandaButtonProps) {
  return (
    <BandaButton
      className={join('transition-transform hover:scale-105', className)}
      {...rest}
    />
  );
}

/** Anneau qui apparaît au survol. */
export function RingHoverButton({ className, ...rest }: BandaButtonProps) {
  return (
    <BandaButton
      className={join('transition-shadow hover:ring-4 hover:ring-banda-primary-muted', className)}
      {...rest}
    />
  );
}

/** Rebond continu au survol. */
export function BounceButton({ className, ...rest }: BandaButtonProps) {
  return <BandaButton className={join('hover:animate-banda-bounce-subtle', className)} {...rest} />;
}

/** Battement de cœur continu. */
export function HeartbeatButton({ className, ...rest }: BandaButtonProps) {
  return <BandaButton className={join('animate-banda-heartbeat', className)} {...rest} />;
}

/** Onde qui se propage depuis le bouton. */
export function PulseButton({ className, ...rest }: BandaButtonProps) {
  return <BandaButton className={join('animate-banda-pulse-ring', className)} {...rest} />;
}

/** Reflet qui balaie le bouton en continu. */
export function ShimmerButton({ className, children, ...rest }: BandaButtonProps) {
  return (
    <BandaButton className={join('relative overflow-hidden', className)} {...rest}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-8 animate-banda-shimmer bg-banda-surface opacity-30 blur-sm"
      />
      <span className="relative">{children}</span>
    </BandaButton>
  );
}

/** Reflet déclenché au survol. */
export function ShineButton({ className, children, ...rest }: BandaButtonProps) {
  return (
    <BandaButton className={join('group relative overflow-hidden', className)} {...rest}>
      <span
        aria-hidden="true"
        className={join(
          'pointer-events-none absolute inset-y-0 left-0 w-8 -translate-x-12 skew-x-12',
          'bg-banda-surface opacity-30 blur-sm transition-transform duration-slow',
          'group-hover:translate-x-24',
        )}
      />
      <span className="relative">{children}</span>
    </BandaButton>
  );
}

/** Fond qui glisse depuis la gauche au survol. */
export function SwipeButton({ className, children, ...rest }: BandaButtonProps) {
  return (
    <BandaButton className={join('group relative overflow-hidden', className)} {...rest}>
      <span
        aria-hidden="true"
        className={join(
          'pointer-events-none absolute inset-0 -translate-x-full bg-banda-primary-active',
          'transition-transform duration-normal group-hover:translate-x-0',
        )}
      />
      <span className="relative">{children}</span>
    </BandaButton>
  );
}

/** Verre dépoli. */
export function GlassButton({ className, ...rest }: BandaButtonProps) {
  return (
    <BandaButton
      variant="ghost"
      className={join(
        'border border-banda-border bg-banda-surface-muted opacity-80 shadow-lg backdrop-blur-md hover:opacity-100',
        className,
      )}
      {...rest}
    />
  );
}

/** Onde au point de clic (ripple). */
export function RippleButton({ className, children, onClick, ...rest }: BandaButtonProps) {
  const [ripples, setRipples] = useState<readonly { id: number; x: number; y: number }[]>([]);
  const nextId = useRef(0);

  const handleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const id = nextId.current++;
    setRipples((current) => [
      ...current,
      { id, x: event.clientX - rect.left, y: event.clientY - rect.top },
    ]);
    setTimeout(() => setRipples((current) => current.filter((r) => r.id !== id)), 600);
    onClick?.(event);
  };

  return (
    <BandaButton
      className={join('relative overflow-hidden', className)}
      onClick={handleClick}
      {...rest}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          aria-hidden="true"
          className="pointer-events-none absolute h-10 w-10 animate-banda-ripple rounded-full bg-banda-surface"
          // Position dynamique au point de clic : logique, pas du style design system.
          style={{ left: ripple.x - 20, top: ripple.y - 20 }}
        />
      ))}
      <span className="relative">{children}</span>
    </BandaButton>
  );
}

/** Attiré par le curseur (magnetic). */
export function MagneticButton({ className, ...rest }: BandaButtonProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (event: ReactMouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setOffset({
      x: (event.clientX - rect.left - rect.width / 2) * 0.2,
      y: (event.clientY - rect.top - rect.height / 2) * 0.2,
    });
  };

  return (
    <BandaButton
      className={join('transition-transform duration-fast', className)}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      // Translation dynamique pilotée par la souris : logique, pas du style.
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      {...rest}
    />
  );
}
