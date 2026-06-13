/**
 * Atome stepper — pattern modulaire Banda :
 *   stepper/BandaStepper.tsx (base <ol>) + useStepper (navigation) + index.
 */
export {
  BandaStepper,
  type BandaStepperProps,
  type StepperLabelPlacement,
  type StepperOrientation,
  type StepperStep,
  type StepperVariant,
} from './BandaStepper';
export { useStepper, type StepperApi } from './useStepper';
