import { Suspense } from 'react';
import type { ReactNode } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import type { FallbackProps } from './ErrorBoundary';

interface SuspenseBoundaryProps {
  /** Skeleton ou spinner affiché pendant le chargement. */
  fallback?: ReactNode;
  /** UI affichée en cas d'erreur. Par défaut : message minimaliste + bouton reset. */
  errorFallback?: (props: FallbackProps) => ReactNode;
  children: ReactNode;
}

function DefaultErrorFallback({ error, reset }: FallbackProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-md border border-banda-danger bg-banda-danger/5 p-6 text-center font-sans"
    >
      <p className="text-sm font-medium text-banda-danger">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-md bg-banda-danger px-3 py-1.5 text-xs font-medium text-banda-danger-contrast transition-colors hover:bg-banda-danger-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring"
      >
        Réessayer
      </button>
    </div>
  );
}

/**
 * Composant composite Suspense + ErrorBoundary.
 * Couvre les deux cas d'erreur asynchrone : chargement (Suspense) et crash (ErrorBoundary).
 * Déclarez-le au niveau feature ou route, pas au niveau composant leaf.
 *
 * @example
 * <SuspenseBoundary fallback={<SkeletonCard />}>
 *   <MyFeature />
 * </SuspenseBoundary>
 */
export function SuspenseBoundary({
  fallback = null,
  errorFallback = DefaultErrorFallback,
  children,
}: SuspenseBoundaryProps) {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
