/**
 * Atome label — pattern modulaire Banda :
 *   label/BandaLabel.tsx (base) + models/ (un modèle = une intention) + index.
 */
export { BandaLabel, type BandaLabelProps } from './BandaLabel';
export {
  BadgeLabel,
  InfoLabel,
  StatusDotLabel,
  type BadgeLabelProps,
  type InfoLabelProps,
  type LabelStatus,
  type StatusDotLabelProps,
} from './models/decorated-labels';
export { EditableLabel, type EditableLabelProps } from './models/editable-label';
