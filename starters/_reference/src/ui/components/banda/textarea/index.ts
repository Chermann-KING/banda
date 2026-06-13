/**
 * Atome textarea — pattern modulaire Banda :
 *   textarea/BandaTextarea.tsx (base) + models/ (un modèle = une intention) + index.
 */
export { BandaTextarea, type BandaTextareaProps } from './BandaTextarea';
export { textareaClasses, type TextareaResize, type TextareaClassOptions } from './textarea-utils';
export {
  FloatingLabelTextarea,
  InsetLabelTextarea,
  OverlappingLabelTextarea,
  type DecoratedTextareaProps,
  type FloatingLabelTextareaProps,
} from './models/decorated-textareas';
export {
  AutoGrowTextarea,
  ButtonTextarea,
  type AutoGrowTextareaProps,
  type ButtonTextareaProps,
} from './models/misc-textareas';
