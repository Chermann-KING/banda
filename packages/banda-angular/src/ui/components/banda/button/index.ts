/**
 * Atome button — architecture modulaire Banda (pattern à répliquer pour chaque atome) :
 *   button/
 *   ├── banda-button.component.ts   composant de base
 *   ├── models/                     un modèle = une intention d'usage
 *   │   ├── static-models.ts        compositions (icon, social, counter…)
 *   │   └── animated-models.ts      animations (keyframes du preset)
 *   └── index.ts                    imports sélectifs
 */
export {
  BandaButtonComponent,
  type BandaButtonVariant,
  type BandaButtonSize,
} from './banda-button.component';

export {
  CounterButtonComponent,
  DashedButtonComponent,
  IconButtonComponent,
  NotificationButtonComponent,
  PillButtonComponent,
  SocialButtonComponent,
  type SocialProvider,
} from './models/static-models';

export {
  BounceButtonComponent,
  GlassButtonComponent,
  GrowButtonComponent,
  HeartbeatButtonComponent,
  MagneticButtonComponent,
  PulseButtonComponent,
  RingHoverButtonComponent,
  RippleButtonComponent,
  ShimmerButtonComponent,
  ShineButtonComponent,
  SwipeButtonComponent,
  TapButtonComponent,
} from './models/animated-models';
