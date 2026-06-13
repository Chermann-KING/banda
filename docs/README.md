# Documentation Banda

| Document | Contenu |
| --- | --- |
| [`design-system.md`](./design-system.md) | Tokens, preset Tailwind, theming, icônes, sanitize |
| [`atom-architecture.md`](./atom-architecture.md) | Le pattern obligatoire d'un atome (base + models/ + index) |
| [`components-catalog.md`](./components-catalog.md) | Feuille de route des 58 familles (phases A→E) |
| [`contributing-a-starter.md`](./contributing-a-starter.md) | Checklist pour porter Banda vers un autre framework |

## En une phrase

Banda fournit, pour chaque framework web majeur, un starter embarquant **le
même design system** — l'utilisateur ne change que les tokens couleur, tout le
reste (composants, modèles, animations) se met à jour instantanément.

## État

| Starter | Statut | Stack |
| --- | --- | --- |
| `_reference` | 🚧 18/58 familles livrées (phase A complète + C/D/E partiels) | React 19 + Vite + TS + Tailwind 3.4 |
| `vue`, `svelte`, `astro`, `angular`, `nextjs`, `nuxt` | ⏳ après validation du référent | — |

Le **statut vivant** des composants est dans
`starters/_reference/src/pages/catalog/registry.tsx` (et visible dans la
grille de l'app de démo) — ce tableau de docs n'est qu'un instantané.
