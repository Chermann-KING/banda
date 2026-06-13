'use client';

import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

export interface FallbackProps {
  error: Error;
  reset: () => void;
}

interface ErrorBoundaryProps {
  /** UI affichée quand une erreur est capturée. */
  fallback: (props: FallbackProps) => ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * Attrape les erreurs de rendu React et affiche un fallback récupérable.
 * Doit être un class component — les hooks ne peuvent pas catcher les erreurs.
 * Usage recommandé : wrappez chaque feature ou route avec <ErrorBoundary>.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    // Ici : envoyer à un service de monitoring (Sentry, Datadog…)
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  reset = () => {
    this.setState({ error: null });
  };

  override render() {
    if (this.state.error !== null) {
      return this.props.fallback({ error: this.state.error, reset: this.reset });
    }
    return this.props.children;
  }
}
