import { useState } from 'react';

// Types internes à la feature — à déplacer dans ../types/ si ils grossissent.
interface {{FeatureName}}State {
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook principal de la feature {{FEATURE_NAME}}.
 * Contient la logique métier — les composants ne font qu'appeler ce hook.
 */
export function use{{FeatureName}}() {
  const [state, setState] = useState<{{FeatureName}}State>({
    isLoading: false,
    error: null,
  });

  // TODO : implémenter la logique métier ici.

  return {
    ...state,
  };
}
