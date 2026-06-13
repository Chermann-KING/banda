/**
 * Atome button — architecture modulaire Banda (pattern à répliquer
 * pour chaque atome) :
 *   button/
 *   ├── BandaButton.tsx        composant de base
 *   ├── models/                un modèle = une intention d'usage
 *   │   ├── static-models.tsx  compositions (icon, social, counter…)
 *   │   └── animated-models.tsx animations (keyframes du preset)
 *   └── index.ts               imports sélectifs : import { RippleButton } from '…/button'
 */
export {
  BandaButton,
  type BandaButtonProps,
  type BandaButtonSize,
  type BandaButtonVariant,
} from './BandaButton';
export {
  CounterButton,
  DashedButton,
  IconButton,
  NotificationButton,
  PillButton,
  SocialButton,
  type CounterButtonProps,
  type IconButtonProps,
  type NotificationButtonProps,
  type SocialButtonProps,
  type SocialProvider,
} from './models/static-models';
export {
  BounceButton,
  GlassButton,
  GrowButton,
  HeartbeatButton,
  MagneticButton,
  PulseButton,
  RingHoverButton,
  RippleButton,
  ShimmerButton,
  ShineButton,
  SwipeButton,
  TapButton,
} from './models/animated-models';
