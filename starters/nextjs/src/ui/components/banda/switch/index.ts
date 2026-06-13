/**
 * Atome switch — pattern modulaire Banda :
 *   switch/BandaSwitch.tsx (base) + models/ (un modèle = une intention) + index.
 */
export {
  BandaSwitch,
  type BandaSwitchProps,
  type SwitchColor,
  type SwitchShape,
  type SwitchSize,
} from './BandaSwitch';
export {
  DualLabelSwitch,
  IconSwitch,
  TextSwitch,
  ThemeSwitch,
  ThumbIconSwitch,
  type DualLabelSwitchProps,
  type IconSwitchProps,
  type TextSwitchProps,
  type ThemeSwitchProps,
} from './models/decorated-switches';
export {
  RowSwitch,
  SwitchCard,
  type RowSwitchProps,
  type SwitchCardProps,
} from './models/switch-cards';
