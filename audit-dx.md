# BANDA — Audit DX : expérience du premier contact

> Simulé le 2026-06-13. Rôle : développeur front-end expérimenté, première découverte du repo.

---

## 🟢 Flow fluide — étapes sans friction

- Le `README.md` racine explique Banda en < 30 secondes avec l'étymologie Yipunu.
- Les principes non négociables (tokens, Tailwind, sanitize, Lucide) sont listés.
- `ARCHITECTURE.md` et `PATTERNS.md` existent et sont référencés depuis le README du starter.
- `src/RULES.md` + un README dans chaque sous-dossier de `src/` — la structure s'explique d'elle-même.
- `pnpm banda:feature {nom}` existe et génère le scaffold.
- Les trois guardrails IA sont en place : `CLAUDE.md`, `.github/copilot-instructions.md`, `.cursorrules`.
- `pnpm lint`, `pnpm typecheck`, `pnpm test` passent tous à zéro problème.
- La page de démo affiche un catalogue complet avec navigation et bascule dark mode.

---

## 🟡 Friction détectée

---

**Étape 1 — Découverte GitHub**

> Problème : Le README annonce "🚧 18/58 familles" visible dès la première lecture.
> Impact : Un développeur qui découvre le projet se demande si c'est production-ready ou un chantier. Risque d'abandon immédiat.
> Correction : Reformuler en positif — "18 composants disponibles, portage Vue/Svelte/Next planifié" — ou masquer le compteur jusqu'à la v1.
> Priorité : P1

---

**Étape 1 — Découverte GitHub**

> Problème : Pas de badges (CI, version, licence) visibles en haut du README.
> Impact : Aucun signal de confiance — un dev ne sait pas si le projet est actif ou à l'abandon.
> Correction : Ajouter badges GitHub Actions + licence MIT.
> Priorité : P2

---

**Étape 2 — Choix du starter**

> Problème : Le README de `_reference` dit `pnpm --filter @banda/starter-react dev` mais le `name` dans `package.json` est `@banda/starter-reference`.
> Impact : La première commande copiée-collée échoue. Friction maximale au démarrage.
> Correction : Corriger le filtre → `pnpm --filter @banda/starter-reference dev`.
> Fichier : `starters/_reference/README.md`
> Priorité : P0

---

**Étape 2 — Choix du starter**

> Problème : Le README ne dit pas comment utiliser le starter isolément (git sparse-checkout ? copie manuelle ? CLI ?). Il suppose que le dev clone le monorepo entier.
> Impact : Un dev qui veut "juste utiliser le starter" ne sait pas par où commencer.
> Correction : Ajouter une section "Utiliser ce starter" avec les options : clone complet du monorepo OU copie du dossier `starters/_reference/` dans son propre repo + adapter le `package.json`.
> Fichier : `starters/_reference/README.md`
> Priorité : P1

---

**Étape 2 — Choix du starter**

> Problème : Le README du starter ne liste pas ce qui est déjà livré (18 composants) ni ce qui reste à faire. On ne sait pas ce qu'on obtient.
> Impact : Le dev doit lancer `pnpm dev` pour découvrir le contenu — friction inutile.
> Correction : Ajouter une section "Ce qui est inclus" avec la liste des composants disponibles.
> Fichier : `starters/_reference/README.md`
> Priorité : P1

---

**Étape 3 — Initialisation**

> Problème : Pas de `.env.example`. Si une variable d'environnement est un jour nécessaire (API URL, feature flags…), le dev découvrira le problème au runtime, pas au `pnpm install`.
> Impact : Friction latente — pas bloquant aujourd'hui mais piège futur.
> Correction : Créer `starters/_reference/.env.example` vide ou commenté, même si aucune variable n'est requise actuellement. Un fichier vide avec un commentaire suffit.
> Fichier : `starters/_reference/.env.example` (à créer)
> Priorité : P2

---

**Étape 4 — Compréhension de la structure**

> Problème : `ARCHITECTURE.md` documente l'architecture **à 5 couches** (core / infra / ui / pages / app) mais le projet en compte désormais **7** (`shared/` et `features/` ont été ajoutées). La matrice de dépendances dans ce fichier est obsolète.
> Impact : Un dev qui lit `ARCHITECTURE.md` obtient une image inexacte de la structure réelle.
> Correction : Mettre à jour `ARCHITECTURE.md` pour inclure `shared/` et `features/` dans le diagramme et la matrice.
> Fichier : `starters/_reference/ARCHITECTURE.md`
> Priorité : P1

---

**Étape 4 — Compréhension de la structure**

> Problème : `PATTERNS.md` mentionne "CSS Modules" dans les conventions et dans le tableau d'arbitrages. Le starter utilise **Tailwind**, pas CSS Modules. La doc contredit le code.
> Impact : Un dev qui lit les conventions suit des règles qui ne s'appliquent pas. Confusion assurée.
> Correction : Remplacer les références à CSS Modules par Tailwind + tokens `banda-*` dans `PATTERNS.md`. Mettre à jour le tableau d'arbitrages en conséquence.
> Fichier : `starters/_reference/PATTERNS.md`
> Priorité : P1

---

**Étape 5 — Création du premier module métier**

> Problème : Les fichiers générés par `pnpm banda:feature` sont quasi-vides — des commentaires désactivés, pas de code fonctionnel minimal. Le message post-génération dit seulement "Remember to export from index.ts".
> Impact : Le dev se retrouve devant des fichiers vides sans savoir quoi écrire en premier. Le scaffold ne guide pas.
> Correction : (1) Ajouter du code de départ réel dans les fichiers template (un hook `useFEATURE_NAME.ts` avec export vide typé, un composant squelette dans `components/`). (2) Enrichir le message terminal avec les 3 prochaines étapes concrètes.
> Fichiers : `starters/_reference/.banda/templates/feature/hooks/`, `starters/_reference/.banda/scripts/create-feature.mjs`
> Priorité : P1

---

**Étape 7 — Utilisation des composants**

> Problème : L'import se fait via l'alias local `@/ui` (Vite), pas via un package npm `@banda/ui`. Un dev qui copie son starter dans un repo séparé doit re-configurer l'alias manuellement — et rien ne le documente.
> Impact : Si le starter est utilisé hors du monorepo, les imports cassent silencieusement.
> Correction : Documenter explicitement dans le README que `@/ui` est un alias Vite défini dans `vite.config.ts`, et qu'il doit être conservé tel quel (ou adapté si le bundler change).
> Fichier : `starters/_reference/README.md`
> Priorité : P1

---

## 🔴 Bloquant

---

**Étape 2 / 3 — Choix du starter + Initialisation**

> Étape : 2 & 3 — Choix du starter + Initialisation
> Problème : Il n'existe **aucune commande pour initialiser un starter isolément**. La seule façon d'utiliser Banda est de cloner l'intégralité du monorepo. Aucun `npx create-banda-app`, `pnpm banda:init`, ni instruction de copie manuelle n'est documentée.
> Impact : Un dev qui veut "juste le starter React" doit cloner ~50 Mo de monorepo avec les packages, les docs et les outils de build. Rien ne lui dit que c'est ce qu'il doit faire. Probable abandon.
> Correction : Documenter clairement dans `starters/_reference/README.md` que la procédure est : `git clone` du monorepo + `pnpm install` à la racine. À terme, créer un `npx create-banda@latest` ou une commande `degit`.
> Priorité : P0

---

**Étape 8 — Build et vérification qualité**

> Étape : 8 — Qualité
> Problème : Aucun hook pre-commit (Husky + lint-staged). Un développeur peut commiter du code avec des erreurs TypeScript, des violations de lint ou des imports inter-couches interdits.
> Impact : Les règles architecturales ne sont appliquées qu'à la CI (si elle existe) — jamais en local. Un dev pressé bypass tout.
> Correction : Ajouter Husky + lint-staged dans `starters/_reference/package.json` avec un hook pre-commit qui lance `tsc --noEmit` et `eslint --max-warnings 0` sur les fichiers stagés.
> Fichiers à créer : `starters/_reference/.husky/pre-commit`, entrée `lint-staged` dans `package.json`
> Priorité : P1

---

## Verdict final DX

| Question | Réponse |
|---|---|
| Comprendre le projet en moins de 5 min ? | ⚠️ Partiel — README clair mais architecture doc obsolète (7 vs 5 couches) |
| Lancer un starter en moins de 10 min ? | ❌ NON — commande filtre erronée + aucune instruction de clonage |
| Créer sa première feature en moins de 30 min ? | ⚠️ Partiel — `pnpm banda:feature` existe mais scaffold trop vide |
| Utiliser une IA sans qu'elle sorte du cadre ? | ✅ OUI — CLAUDE.md, copilot-instructions, cursorrules en place |

**Score DX : 1.5 / 4**

**Prêt pour mise en ligne publique : NON**

Les deux bloquants à corriger avant toute publication :
1. Commande README erronée (`@banda/starter-react` → `@banda/starter-reference`)
2. Absence totale d'instruction d'initialisation pour un usage hors-monorepo

---

## Récapitulatif des corrections par priorité

| Priorité | Fichier | Action |
|---|---|---|
| **P0** | `starters/_reference/README.md` | Corriger le nom du filtre pnpm |
| **P0** | `starters/_reference/README.md` | Ajouter les instructions d'initialisation (clone monorepo) |
| **P1** | `starters/_reference/README.md` | Documenter le contenu inclus + l'alias `@/ui` |
| **P1** | `starters/_reference/ARCHITECTURE.md` | Mettre à jour : 7 couches (+ shared, features) |
| **P1** | `starters/_reference/PATTERNS.md` | Remplacer CSS Modules → Tailwind tokens |
| **P1** | `.banda/templates/` + `create-feature.mjs` | Enrichir le scaffold et le message post-génération |
| **P1** | `starters/_reference/package.json` + `.husky/` | Ajouter Husky + lint-staged |
| **P2** | `starters/_reference/.env.example` | Créer le fichier (vide commenté) |
| **P2** | `README.md` racine | Ajouter badges CI + reformuler le compteur de composants |
