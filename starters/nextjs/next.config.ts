import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Monorepo pnpm : node_modules est hoistée à la racine du repo.
  // Sans ce paramètre, "Collecting build traces" échoue car Next.js
  // cherche les traces dans starters/nextjs/ au lieu de la racine banda/.
  outputFileTracingRoot: path.join(import.meta.dirname, '../../'),
  // @banda/react exporte du TypeScript source ; SWC doit le compiler.
  transpilePackages: ['@banda/react'],
};

export default nextConfig;
