# Catalogue des composants Banda

Référence d'étendue : la section *Components* de shadcn/studio (~55 familles,
plusieurs variantes par famille). Banda conçoit **ses propres composants**,
basés sur les éléments HTML natifs, stylés par le preset `@banda/tailwind`,
icônes **Lucide** uniquement. Différenciateur Banda : **tout composant qui
accepte une saisie est sanitizé par défaut** (`@banda/fields`).

Chaque starter implémente ce catalogue dans son dossier `src/ui/` idiomatique
(React : `_reference`, puis Vue, Svelte, Astro, Angular, Next, Nuxt).

## Conventions

- Nom : `Banda<ÉlémentOuFamille>`, base HTML native documentée ;
- Variantes : chaque composant expose plusieurs modèles (comme shadcn) via
  props `variant` / `size` + exemples de composition dans la démo ;
- Saisie : pipeline `sanitize → format → finalize → Zod` pour tout champ ;
- États : default / hover / focus / error / disabled couverts via tokens.

## Phase A — Atomes de formulaire (P0)

| Composant | Base HTML | Variantes prévues | Sanitize | Statut |
| --- | --- | --- | --- | --- |
| BandaButton | `<button>` | primary, secondary, outline, ghost, danger, link × sm/md/lg/icon + loading (Loader2) | — | ✅ |
| BandaInput | `<input>` | default/filled/ghost × sm/md/lg, valid icon, addons (à venir) | ✅ | ✅ validé |
| BandaSelect | `<select>` + listbox custom | tailles, variantes, option riche | — | ✅ validé |
| BandaTextarea | `<textarea>` | tailles, compteur, auto-resize (à venir) | ✅ | ✅ |
| BandaLabel | `<label>` | visible, sr-only, required | — | ✅ |
| BandaCheckbox | `<input type=checkbox>` | simple, avec description, carte (à venir) | — | ✅ |
| BandaRadio | `<input type=radio>` | simple, groupe, carte (à venir) | — | ✅ |
| BandaSwitch | `<input type=checkbox>` + `role=switch` | sm/md, avec label | — | ✅ |
| BandaForm | `<form>` | + useForm/Zod existants | ✅ | ⏳ |
| BandaFieldset | `<fieldset>` + `<legend>` | groupe de champs | — | ⏳ |

## Phase B — Saisies avancées (toutes sanitizées)

| Composant | Base HTML | Notes |
| --- | --- | --- |
| BandaAutocomplete | `<input>` + listbox | suggestions filtrées, clavier complet |
| BandaCombobox | `<input>` + listbox | sélection + saisie libre |
| BandaInputMask | `<input>` | masques génériques (s'appuie sur @banda/fields) |
| BandaInputOtp | `<input>` ×n | cases séparées, collage intelligent |
| BandaPhoneInput | `<input type=tel>` | pays africains, masque, E.164 (logique déjà dans @banda/fields) |
| BandaDatePicker | `<input>` + BandaCalendar | saisie + sélection |
| BandaCalendar | `<table>` | mois/année, plages |
| BandaSlider | `<input type=range>` | simple, double poignée |
| BandaRating | `<input type=radio>` ×n | étoiles Lucide `Star` |
| BandaSearch | `<input type=search>` | icône `Search`, clear `X`, debounce |

## Phase C — Surfaces & overlays

| Composant | Base HTML | Notes |
| --- | --- | --- |
| BandaCard | `<article>` | header/body/footer, image, horizontale |
| BandaDialog | `<dialog>` | tailles, scrollable, confirmation |
| BandaSheet | `<dialog>` | latéral (drawer) gauche/droite/bas |
| BandaPopover | `[popover]` natif | ancré, flèche |
| BandaTooltip | `[popover]` + hover | 4 positions |
| BandaDropdownMenu | `<menu>` + listbox | items, séparateurs, sous-menus |
| BandaContextMenu | `<menu>` | clic droit |
| BandaToast | `<aside role=status>` | 4 variants, file d'attente (existant à renommer) |
| BandaAlert | `<aside role=alert>` | info/success/warning/danger, fermable |

## Phase D — Navigation

| Composant | Base HTML | Notes |
| --- | --- | --- |
| BandaNav | `<nav>` | navbar, sidebar (existants à renommer) |
| BandaBreadcrumb | `<nav>` + `<ol>` | séparateur `ChevronRight` |
| BandaPagination | `<nav>` | pages, ellipses |
| BandaTabs | `role=tablist` | ligne, pills, verticales |
| BandaMenubar | `<menu>` | barre d'application |
| BandaStepper | `<ol>` | horizontal/vertical, états |
| BandaCommand | `<dialog>` + `<input>` | palette de commandes (sanitizée) |

## Phase E — Affichage de données

| Composant | Base HTML | Notes |
| --- | --- | --- |
| BandaTable | `<table>` | dense, rayée, tri |
| BandaDataTable | `<table>` | tri/filtre/pagination (filtre sanitizé) |
| BandaList | `<ul>`/`<ol>` | avec icônes, descriptions |
| BandaAccordion | `<details>`/`<summary>` | simple, multiple, ChevronDown |
| BandaCollapsible | `<details>` | inline |
| BandaAvatar | `<img>` | tailles, fallback initiales, groupe |
| BandaBadge | `<span>` | 6 variants (existant à renommer) |
| BandaSeparator | `<hr>` | horizontal/vertical, avec texte |
| BandaProgress | `<progress>` | barre, indéterminée |
| BandaSpinner | Lucide `Loader2` animé | tailles |
| BandaSkeleton | `<div aria-busy>` | texte, avatar, carte |
| BandaKbd | `<kbd>` | raccourcis |
| BandaCodeBlock | `<pre>`+`<code>` | copie (`Copy`) |
| BandaAspectRatio | `<div>` | ratios tokens |
| BandaScrollArea | `<div>` | scrollbar stylée |
| BandaToggle | `<button aria-pressed>` | icône, texte |
| BandaToggleGroup | `role=group` | simple/multiple |
| BandaButtonGroup | `role=group` | boutons attachés |
| BandaCarousel | `<section>` | flèches `ChevronLeft/Right`, points |
| BandaResizable | `<div>` | panneaux |
| BandaTypography | `<h1>…<h6>`, `<p>` | échelle tokens |

## Ordre de livraison

Phase A (en cours) → B → C → D → E, validation utilisateur à chaque phase.
Les composants legacy du starter (`Button`, `Card`, `Modal`, `Toast`…) sont
renommés/portés vers leur équivalent Banda au fil des phases, puis supprimés.
