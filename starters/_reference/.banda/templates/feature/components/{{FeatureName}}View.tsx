import { use{{FeatureName}} } from '../hooks/use{{FeatureName}}';

/**
 * Composant principal de la feature {{FEATURE_NAME}}.
 * Délègue toute la logique à use{{FeatureName}} — reste un composant "bête".
 */
export function {{FeatureName}}View() {
  const { isLoading, error } = use{{FeatureName}}();

  if (isLoading) return <p>Chargement…</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <section>
      {/* TODO : implémenter la vue ici */}
    </section>
  );
}
