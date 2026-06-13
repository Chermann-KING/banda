/**
 * Modèles animés : halo qui suit le curseur, inclinaison 3D.
 * Les positions du curseur passent par le style inline (valeurs dynamiques) ;
 * les couleurs restent des tokens via var(--banda-color-*).
 */
import { useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react';

interface AnimatedCardProps {
  className?: string;
  children: ReactNode;
}

/** Halo lumineux suivant le curseur (spotlight). */
export function GlowCard({ className, children }: AnimatedCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [spot, setSpot] = useState<{ x: number; y: number } | null>(null);

  const onMouseMove = (event: ReactMouseEvent<HTMLElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpot({ x: event.clientX - rect.left, y: event.clientY - rect.top });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setSpot(null)}
      className={[
        'relative overflow-hidden rounded-lg border border-banda-border bg-banda-surface text-banda-text shadow-sm',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-fast"
        style={{
          opacity: spot ? 1 : 0,
          background: spot
            ? `radial-gradient(240px circle at ${spot.x}px ${spot.y}px, var(--banda-color-primary-muted), transparent 70%)`
            : undefined,
        }}
      />
      <div className="relative">{children}</div>
    </article>
  );
}

/** Inclinaison 3D pilotée par le curseur. */
export function TiltCard({ className, children }: AnimatedCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState<string | undefined>(undefined);

  const onMouseMove = (event: ReactMouseEvent<HTMLElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const ratioX = (event.clientX - rect.left) / rect.width - 0.5;
    const ratioY = (event.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `perspective(800px) rotateY(${(ratioX * 10).toFixed(2)}deg) rotateX(${(-ratioY * 10).toFixed(2)}deg)`,
    );
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setTransform(undefined)}
      style={{ transform }}
      className={[
        'rounded-lg border border-banda-border bg-banda-surface text-banda-text shadow-sm',
        'transition-transform duration-fast will-change-transform',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </article>
  );
}
