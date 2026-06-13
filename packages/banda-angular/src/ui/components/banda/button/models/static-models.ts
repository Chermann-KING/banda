/**
 * Modèles statiques de BandaButton — compositions prêtes à l'emploi.
 * Un modèle = une intention d'usage ; tous utilisent <banda-button>.
 */
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideAngularModule, Bell, Chrome, Facebook, Github, Twitter } from 'lucide-angular';

/** Type des données d'icône Lucide (même shape que LucideIconData du package). */
type LucideIconData = typeof Bell;
import { BandaButtonComponent, type BandaButtonVariant } from '../banda-button.component';

// ─── IconButton ──────────────────────────────────────────────────────────────

/** Bouton icône seule — ariaLabel obligatoire. */
@Component({
  selector: 'banda-icon-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaButtonComponent, LucideAngularModule],
  template: `
    <banda-button size="icon" [variant]="variant()" [attr.aria-label]="ariaLabel()">
      <lucide-angular [img]="icon()" [size]="16" aria-hidden="true" />
    </banda-button>
  `,
})
export class IconButtonComponent {
  readonly icon = input.required<LucideIconData>();
  readonly ariaLabel = input.required<string>();
  readonly variant = input<BandaButtonVariant>('primary');
}

// ─── CounterButton ───────────────────────────────────────────────────────────

/** Bouton avec compteur (Messages 99+). */
@Component({
  selector: 'banda-counter-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaButtonComponent],
  template: `
    <banda-button variant="outline">
      <ng-content />
      <span
        class="rounded-full bg-banda-danger-muted px-2 font-sans text-xs font-semibold text-banda-danger"
      >
        {{ count() }}
      </span>
    </banda-button>
  `,
})
export class CounterButtonComponent {
  readonly count = input.required<string>();
}

// ─── NotificationButton ──────────────────────────────────────────────────────

/** Bouton avec pastille de notification. */
@Component({
  selector: 'banda-notification-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaButtonComponent, LucideAngularModule],
  template: `
    <banda-button variant="outline" extraClass="relative">
      <lucide-angular [img]="Bell" [size]="16" aria-hidden="true" />
      <ng-content />
      <span
        class="absolute right-1 top-1 h-2 w-2 rounded-full bg-banda-danger"
        aria-hidden="true"
      ></span>
    </banda-button>
  `,
})
export class NotificationButtonComponent {
  protected readonly Bell = Bell;
}

// ─── PillButton ──────────────────────────────────────────────────────────────

/** Bouton pilule (rounded-full). */
@Component({
  selector: 'banda-pill-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaButtonComponent],
  template: `
    <banda-button [variant]="variant()" [size]="size()" extraClass="rounded-full">
      <ng-content />
    </banda-button>
  `,
})
export class PillButtonComponent {
  readonly variant = input<BandaButtonVariant>('primary');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
}

// ─── DashedButton ────────────────────────────────────────────────────────────

/** Outline pointillé (Download…). */
@Component({
  selector: 'banda-dashed-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaButtonComponent],
  template: `
    <banda-button variant="outline" [size]="size()" extraClass="border-dashed">
      <ng-content />
    </banda-button>
  `,
})
export class DashedButtonComponent {
  readonly size = input<'sm' | 'md' | 'lg'>('md');
}

// ─── SocialButton ────────────────────────────────────────────────────────────

const SOCIAL = {
  google: { icon: Chrome, label: 'Continuer avec Google' },
  x: { icon: Twitter, label: 'Continuer avec X' },
  facebook: { icon: Facebook, label: 'Continuer avec Facebook' },
  github: { icon: Github, label: 'Continuer avec GitHub' },
} as const;

export type SocialProvider = keyof typeof SOCIAL;

/** Connexion sociale — icônes de marque Lucide uniquement. */
@Component({
  selector: 'banda-social-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaButtonComponent, LucideAngularModule],
  template: `
    <banda-button variant="outline" extraClass="w-full justify-start">
      <lucide-angular [img]="social().icon" [size]="16" aria-hidden="true" />
      <span class="flex-1 text-center">{{ label() }}</span>
    </banda-button>
  `,
})
export class SocialButtonComponent {
  readonly provider = input.required<SocialProvider>();
  readonly customLabel = input<string | undefined>(undefined, { alias: 'label' });

  protected readonly social = () => SOCIAL[this.provider()];
  protected readonly label = () => this.customLabel() ?? this.social().label;
}
