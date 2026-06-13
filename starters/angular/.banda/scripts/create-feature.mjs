#!/usr/bin/env node
/**
 * Usage: node .banda/scripts/create-feature.mjs <feature-name>
 * Crée src/features/<name>/ depuis .banda/templates/feature/
 */
import { cpSync, existsSync, readFileSync, readdirSync, renameSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dir = dirname(fileURLToPath(import.meta.url));
const root = join(__dir, '../..');

const name = process.argv[2];
if (!name || !/^[a-z][a-z0-9-]*$/.test(name)) {
  console.error('Usage: pnpm banda:feature <kebab-case-name>');
  process.exit(1);
}

const featurePascal = name
  .split('-')
  .map(s => s[0].toUpperCase() + s.slice(1))
  .join('');

const dest = join(root, 'src/features', name);
if (existsSync(dest)) {
  console.error(`Feature "${name}" existe déjà dans ${dest}`);
  process.exit(1);
}

// 1. Copier le template
cpSync(join(__dir, '../templates/feature'), dest, { recursive: true });

// 2. Renommer les fichiers dont le nom contient {{FeatureName}} ou {{FEATURE_NAME}}
function renameInDir(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      renameInDir(full);
    } else if (entry.name.includes('{{FeatureName}}') || entry.name.includes('{{FEATURE_NAME}}')) {
      const newName = entry.name
        .replaceAll('{{FeatureName}}', featurePascal)
        .replaceAll('{{FEATURE_NAME}}', name);
      renameSync(full, join(dir, newName));
    }
  }
}
renameInDir(dest);

// 3. Remplacer les placeholders dans le contenu des fichiers texte
function replaceInDir(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      replaceInDir(full);
    } else if (entry.isFile() && /\.(ts|md)$/.test(entry.name)) {
      const content = readFileSync(full, 'utf-8')
        .replaceAll('{{FEATURE_NAME}}', name)
        .replaceAll('{{FeatureName}}', featurePascal);
      writeFileSync(full, content, 'utf-8');
    }
  }
}
replaceInDir(dest);

// 4. Afficher le résultat et les prochaines étapes
const g = '\x1b[32m', c = '\x1b[36m', b = '\x1b[1m', r = '\x1b[0m';

console.log(`\n${g}${b}✓ Feature "${name}" créée${r}`);
console.log(`\nFichiers générés dans ${c}src/features/${name}/${r} :\n`);
console.log(`  components/${name}-view.component.ts  → composant Angular standalone`);
console.log(`  services/${name}.service.ts            → logique métier (signals)`);
console.log(`  store/                                  → état partagé de la feature`);
console.log(`  types/index.ts                          → types internes`);
console.log(`  index.ts                                → interface publique`);
console.log(`  FEATURE_RULES.md                        → règles d'import`);
console.log(`\n${b}Prochaines étapes :${r}`);
console.log(`  1. Implémenter ${c}${featurePascal}Service${r} dans ${c}services/${name}.service.ts${r}`);
console.log(`  2. Compléter ${c}${featurePascal}ViewComponent${r} dans ${c}components/${name}-view.component.ts${r}`);
console.log(`  3. Exporter depuis ${c}index.ts${r} ce dont les vues ont besoin`);
console.log(`  4. Utiliser la feature dans une vue :`);
console.log(`     ${c}import { ${featurePascal}ViewComponent } from '@/features/${name}';${r}`);
console.log(`  5. Vérifier : ${c}pnpm typecheck${r}\n`);
