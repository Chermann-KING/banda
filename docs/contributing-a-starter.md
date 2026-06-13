# Ajouter un starter Banda

Le starter `react` est la référence : alignez-vous sur lui.

## Checklist de conformité

### Design system
- [ ] Dépend de `@banda/tokens` (`workspace:*`), importe `banda.css` + `base.css`
- [ ] Composants stylés uniquement avec les variables **sémantiques** (`--banda-color-*`, `--banda-space-*`…)
- [ ] Aucune couleur/dimension codée en dur
- [ ] ThemeProvider (ou équivalent idiomatique) : `light`/`dark`/`system`, `data-theme` sur `<html>`, persistance

### Smart fields
- [ ] Dépend de `@banda/fields` ; aucune règle de champ redéclarée localement
- [ ] Équivalent de `createSmartField(spec)` : un composant par spec, câblage uniquement
- [ ] Pipeline respecté : frappe → sanitize → format ; blur → finalize → validation Zod
- [ ] PhoneField (masque par pays) et PasswordField (jauge de force) implémentés

### Icônes
- [ ] Uniquement Lucide (package officiel du framework) ; aucun emoji/glyphe Unicode comme icône
- [ ] `aria-hidden="true"` sur l'icône, libellé accessible sur le bouton

### Composants socle
- [ ] Button (4 variants × 3 tailles), Input, Textarea, Select, Card, Badge,
      Modal, Toast, Navbar, Sidebar, Heading/Text/Label
- [ ] Page de démo les présentant tous, avec bascule de thème

### Architecture
- [ ] Couches séparées : logique pure (sans framework) / UI / infrastructure
- [ ] Persistance du thème derrière un port/contrat, implémentation injectée
- [ ] `ARCHITECTURE.md` (couches + arbitrages) et `PATTERNS.md` (patterns idiomatiques)

### Qualité
- [ ] Conventions et tooling officiels du framework (linter, formatter, tests)
- [ ] TypeScript strict (sauf `vanilla`)
- [ ] Scripts `dev` / `build` / `lint` / `typecheck` / `test` (pour Turborepo)
- [ ] `pnpm build` passe depuis la racine

## Équivalences idiomatiques attendues

| Concept | React (réf.) | Vue | Svelte | Angular |
| --- | --- | --- | --- | --- |
| État de thème | Context + hooks | `provide/inject` + composable | store + contexte | service + signals |
| Toast | Context + portal | composable + `<Teleport>` | store + portal action | service + CDK overlay |
| Variants | props TS union | props TS union | props TS union | inputs typés |
| Styles | CSS Modules | SFC `<style scoped>` | `<style>` scopé | styles de composant |
