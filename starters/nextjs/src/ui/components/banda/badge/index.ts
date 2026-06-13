/**
 * Atome badge — pattern modulaire Banda : base <span> (tone × fill × size)
 * + modèles. Les variantes interactives changent de base HTML (<a>, <button>).
 */
export {
  BandaBadge,
  type BandaBadgeFill,
  type BandaBadgeProps,
  type BandaBadgeSize,
  type BandaBadgeTone,
} from './BandaBadge';
export {
  CountBadge,
  DotBadge,
  StatusBadge,
  type BadgeStatus,
  type CountBadgeProps,
  type DotBadgeProps,
  type StatusBadgeProps,
} from './models/status-badges';
export {
  ClosableBadge,
  LinkBadge,
  SelectableBadge,
  type ClosableBadgeProps,
  type LinkBadgeProps,
  type SelectableBadgeProps,
} from './models/interactive-badges';
export { GradientBadge, GradientOutlineBadge } from './models/gradient-badges';
