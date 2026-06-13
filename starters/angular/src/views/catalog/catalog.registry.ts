import type { Type } from '@angular/core';
import {
  BandaBadgeDemoComponent,
  BandaButtonDemoComponent,
  BandaCardDemoComponent,
  BandaCheckboxDemoComponent,
  BandaDialogDemoComponent,
  BandaDropdownMenuDemoComponent,
  BandaFormDemoComponent,
  BandaInputDemoComponent,
  BandaLabelDemoComponent,
  BandaRadioDemoComponent,
  BandaSelectDemoComponent,
  BandaStepperDemoComponent,
  BandaSwitchDemoComponent,
  BandaTableDemoComponent,
  BandaTabsDemoComponent,
  BandaTextareaDemoComponent,
  BandaToastDemoComponent,
} from './catalog.demos';

export type CatalogCategory =
  | 'Formulaire'
  | 'Surfaces & overlays'
  | 'Navigation'
  | 'Affichage de données';

export interface CatalogEntry {
  slug: string;
  name: string;
  /** Élément HTML de base (philosophie Banda). */
  base: string;
  category: CatalogCategory;
  phase: 'A' | 'B' | 'C' | 'D' | 'E';
  /** Présent = composant livré ; absent = à venir. */
  Demo?: Type<unknown>;
  /** Note courte affichée sur la carte. */
  note?: string;
}

/**
 * Registre du catalogue — même étendue que la section Components de
 * shadcn/studio, organisé par catégories.
 */
export const CATALOG: CatalogEntry[] = [
  // ─── Formulaire ───
  { slug: 'button', name: 'BandaButton', base: '<button>', category: 'Formulaire', phase: 'A', Demo: BandaButtonDemoComponent, note: '6 variantes × 4 tailles + 17 modèles dont 12 animés' },
  { slug: 'input', name: 'BandaInput', base: '<input>', category: 'Formulaire', phase: 'A', Demo: BandaInputDemoComponent, note: 'sanitize + validate' },
  { slug: 'select', name: 'BandaSelect', base: '<select>', category: 'Formulaire', phase: 'A', Demo: BandaSelectDemoComponent },
  { slug: 'textarea', name: 'BandaTextarea', base: '<textarea>', category: 'Formulaire', phase: 'A', Demo: BandaTextareaDemoComponent, note: 'sanitize par défaut' },
  { slug: 'label', name: 'BandaLabel', base: '<label>', category: 'Formulaire', phase: 'A', Demo: BandaLabelDemoComponent },
  { slug: 'checkbox', name: 'BandaCheckbox', base: '<input type=checkbox>', category: 'Formulaire', phase: 'A', Demo: BandaCheckboxDemoComponent },
  { slug: 'radio', name: 'BandaRadio', base: '<input type=radio>', category: 'Formulaire', phase: 'A', Demo: BandaRadioDemoComponent },
  { slug: 'switch', name: 'BandaSwitch', base: 'checkbox + role=switch', category: 'Formulaire', phase: 'A', Demo: BandaSwitchDemoComponent },
  { slug: 'form', name: 'BandaForm', base: '<form>', category: 'Formulaire', phase: 'A', Demo: BandaFormDemoComponent, note: 'FormData natif ou Zod + @banda/fields' },
  { slug: 'fieldset', name: 'BandaFieldset', base: '<fieldset>', category: 'Formulaire', phase: 'A' },
  { slug: 'autocomplete', name: 'BandaAutocomplete', base: '<input> + listbox', category: 'Formulaire', phase: 'B' },
  { slug: 'combobox', name: 'BandaCombobox', base: '<input> + listbox', category: 'Formulaire', phase: 'B' },
  { slug: 'input-mask', name: 'BandaInputMask', base: '<input>', category: 'Formulaire', phase: 'B' },
  { slug: 'input-otp', name: 'BandaInputOtp', base: '<input> ×n', category: 'Formulaire', phase: 'B' },
  { slug: 'phone-input', name: 'BandaPhoneInput', base: '<input type=tel>', category: 'Formulaire', phase: 'B', note: 'logique dans @banda/fields' },
  { slug: 'date-picker', name: 'BandaDatePicker', base: '<input> + calendar', category: 'Formulaire', phase: 'B' },
  { slug: 'calendar', name: 'BandaCalendar', base: '<table>', category: 'Formulaire', phase: 'B' },
  { slug: 'slider', name: 'BandaSlider', base: '<input type=range>', category: 'Formulaire', phase: 'B' },
  { slug: 'rating', name: 'BandaRating', base: '<input type=radio> ×n', category: 'Formulaire', phase: 'B' },
  { slug: 'search', name: 'BandaSearch', base: '<input type=search>', category: 'Formulaire', phase: 'B' },

  // ─── Surfaces & overlays ───
  { slug: 'card', name: 'BandaCard', base: '<article>', category: 'Surfaces & overlays', phase: 'C', Demo: BandaCardDemoComponent, note: 'Header/Title/Description/Body/Footer + GlowCard/TiltCard' },
  { slug: 'dialog', name: 'BandaDialog', base: '<dialog>', category: 'Surfaces & overlays', phase: 'C', Demo: BandaDialogDemoComponent, note: 'tailles + fullscreen, AlertDialog, 2 animations' },
  { slug: 'toast', name: 'BandaToast', base: '<aside role=status>', category: 'Surfaces & overlays', phase: 'C', Demo: BandaToastDemoComponent, note: "aside role=status, 4 variants, file d'attente" },
  { slug: 'sheet', name: 'BandaSheet', base: '<dialog>', category: 'Surfaces & overlays', phase: 'C' },
  { slug: 'popover', name: 'BandaPopover', base: '[popover] natif', category: 'Surfaces & overlays', phase: 'C' },
  { slug: 'tooltip', name: 'BandaTooltip', base: '[popover] + hover', category: 'Surfaces & overlays', phase: 'C' },
  { slug: 'dropdown-menu', name: 'BandaDropdownMenu', base: '<menu>', category: 'Surfaces & overlays', phase: 'C', Demo: BandaDropdownMenuDemoComponent, note: 'composé, focus roving, items riches' },
  { slug: 'context-menu', name: 'BandaContextMenu', base: '<menu>', category: 'Surfaces & overlays', phase: 'C' },
  { slug: 'alert', name: 'BandaAlert', base: '<aside role=alert>', category: 'Surfaces & overlays', phase: 'C' },

  // ─── Navigation ───
  { slug: 'nav', name: 'BandaNav', base: '<nav>', category: 'Navigation', phase: 'D', note: 'shell du catalogue en <nav> natif en attendant' },
  { slug: 'breadcrumb', name: 'BandaBreadcrumb', base: '<nav> + <ol>', category: 'Navigation', phase: 'D' },
  { slug: 'pagination', name: 'BandaPagination', base: '<nav>', category: 'Navigation', phase: 'D' },
  { slug: 'tabs', name: 'BandaTabs', base: 'role=tablist', category: 'Navigation', phase: 'D', Demo: BandaTabsDemoComponent, note: '4 variantes × 2 orientations, clavier APG' },
  { slug: 'menubar', name: 'BandaMenubar', base: '<menu>', category: 'Navigation', phase: 'D' },
  { slug: 'stepper', name: 'BandaStepper', base: '<ol>', category: 'Navigation', phase: 'D', Demo: BandaStepperDemoComponent, note: '2 orientations, filled/outline, icônes' },
  { slug: 'command', name: 'BandaCommand', base: '<dialog> + <input>', category: 'Navigation', phase: 'D', note: 'palette sanitizée' },

  // ─── Affichage de données ───
  { slug: 'typography', name: 'BandaTypography', base: '<h1>…<p>', category: 'Affichage de données', phase: 'E' },
  { slug: 'badge', name: 'BandaBadge', base: '<span>', category: 'Affichage de données', phase: 'E', Demo: BandaBadgeDemoComponent, note: 'tone × fill (21 combinaisons) + 8 modèles' },
  { slug: 'table', name: 'BandaTable', base: '<table>', category: 'Affichage de données', phase: 'E', Demo: BandaTableDemoComponent, note: 'DataTable (sélection, pied de total) + pagination' },
  { slug: 'data-table', name: 'BandaDataTable', base: '<table>', category: 'Affichage de données', phase: 'E', note: 'filtre sanitizé' },
  { slug: 'list', name: 'BandaList', base: '<ul> / <ol>', category: 'Affichage de données', phase: 'E' },
  { slug: 'accordion', name: 'BandaAccordion', base: '<details>', category: 'Affichage de données', phase: 'E' },
  { slug: 'collapsible', name: 'BandaCollapsible', base: '<details>', category: 'Affichage de données', phase: 'E' },
  { slug: 'avatar', name: 'BandaAvatar', base: '<img>', category: 'Affichage de données', phase: 'E' },
  { slug: 'separator', name: 'BandaSeparator', base: '<hr>', category: 'Affichage de données', phase: 'E' },
  { slug: 'progress', name: 'BandaProgress', base: '<progress>', category: 'Affichage de données', phase: 'E' },
  { slug: 'spinner', name: 'BandaSpinner', base: 'Loader2 animé', category: 'Affichage de données', phase: 'E' },
  { slug: 'skeleton', name: 'BandaSkeleton', base: '<div aria-busy>', category: 'Affichage de données', phase: 'E' },
  { slug: 'kbd', name: 'BandaKbd', base: '<kbd>', category: 'Affichage de données', phase: 'E' },
  { slug: 'code-block', name: 'BandaCodeBlock', base: '<pre> + <code>', category: 'Affichage de données', phase: 'E' },
  { slug: 'aspect-ratio', name: 'BandaAspectRatio', base: '<div>', category: 'Affichage de données', phase: 'E' },
  { slug: 'scroll-area', name: 'BandaScrollArea', base: '<div>', category: 'Affichage de données', phase: 'E' },
  { slug: 'toggle', name: 'BandaToggle', base: '<button aria-pressed>', category: 'Affichage de données', phase: 'E' },
  { slug: 'toggle-group', name: 'BandaToggleGroup', base: 'role=group', category: 'Affichage de données', phase: 'E' },
  { slug: 'button-group', name: 'BandaButtonGroup', base: 'role=group', category: 'Affichage de données', phase: 'E' },
  { slug: 'carousel', name: 'BandaCarousel', base: '<section>', category: 'Affichage de données', phase: 'E' },
  { slug: 'resizable', name: 'BandaResizable', base: '<div>', category: 'Affichage de données', phase: 'E' },
];

export const CATEGORIES: readonly CatalogCategory[] = [
  'Formulaire',
  'Surfaces & overlays',
  'Navigation',
  'Affichage de données',
];
