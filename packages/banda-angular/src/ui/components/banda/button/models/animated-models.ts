/**
 * Modèles animés de BandaButton — chaque animation vient des keyframes
 * du preset @banda/tailwind (design system) : recolorer les tokens
 * met à jour tous les modèles, animations comprises.
 */
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { BandaButtonComponent, type BandaButtonVariant } from '../banda-button.component';

// ─── Helpers ─────────────────────────────────────────────────────────────────

type ButtonSize = 'sm' | 'md' | 'lg';

// ─── Simple CSS class animations ─────────────────────────────────────────────

/** Enfonce le bouton au clic. */
@Component({
  selector: 'banda-tap-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaButtonComponent],
  template: `
    <banda-button [variant]="variant()" [size]="size()" extraClass="transition-transform active:scale-95">
      <ng-content />
    </banda-button>
  `,
})
export class TapButtonComponent {
  readonly variant = input<BandaButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
}

/** Grossit au survol. */
@Component({
  selector: 'banda-grow-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaButtonComponent],
  template: `
    <banda-button [variant]="variant()" [size]="size()" extraClass="transition-transform hover:scale-105">
      <ng-content />
    </banda-button>
  `,
})
export class GrowButtonComponent {
  readonly variant = input<BandaButtonVariant>('outline');
  readonly size = input<ButtonSize>('md');
}

/** Anneau qui apparaît au survol. */
@Component({
  selector: 'banda-ring-hover-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaButtonComponent],
  template: `
    <banda-button [variant]="variant()" [size]="size()" extraClass="transition-shadow hover:ring-4 hover:ring-banda-primary-muted">
      <ng-content />
    </banda-button>
  `,
})
export class RingHoverButtonComponent {
  readonly variant = input<BandaButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
}

/** Rebond continu au survol. */
@Component({
  selector: 'banda-bounce-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaButtonComponent],
  template: `
    <banda-button [variant]="variant()" [size]="size()" extraClass="hover:animate-banda-bounce-subtle">
      <ng-content />
    </banda-button>
  `,
})
export class BounceButtonComponent {
  readonly variant = input<BandaButtonVariant>('outline');
  readonly size = input<ButtonSize>('md');
}

/** Battement de cœur continu. */
@Component({
  selector: 'banda-heartbeat-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaButtonComponent],
  template: `
    <banda-button [variant]="variant()" [size]="size()" extraClass="animate-banda-heartbeat">
      <ng-content />
    </banda-button>
  `,
})
export class HeartbeatButtonComponent {
  readonly variant = input<BandaButtonVariant>('danger');
  readonly size = input<ButtonSize>('md');
}

/** Onde qui se propage depuis le bouton. */
@Component({
  selector: 'banda-pulse-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaButtonComponent],
  template: `
    <banda-button [variant]="variant()" [size]="size()" extraClass="animate-banda-pulse-ring">
      <ng-content />
    </banda-button>
  `,
})
export class PulseButtonComponent {
  readonly variant = input<BandaButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
}

// ─── Overlay animations ──────────────────────────────────────────────────────

/** Reflet qui balaie le bouton en continu. */
@Component({
  selector: 'banda-shimmer-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaButtonComponent],
  template: `
    <banda-button [variant]="variant()" [size]="size()" extraClass="relative overflow-hidden">
      <span
        aria-hidden="true"
        class="pointer-events-none absolute inset-y-0 left-0 w-8 animate-banda-shimmer bg-banda-surface opacity-30 blur-sm"
      ></span>
      <span class="relative"><ng-content /></span>
    </banda-button>
  `,
})
export class ShimmerButtonComponent {
  readonly variant = input<BandaButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
}

/** Reflet déclenché au survol. */
@Component({
  selector: 'banda-shine-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaButtonComponent],
  template: `
    <banda-button [variant]="variant()" [size]="size()" extraClass="group relative overflow-hidden">
      <span
        aria-hidden="true"
        class="pointer-events-none absolute inset-y-0 left-0 w-8 -translate-x-12 skew-x-12 bg-banda-surface opacity-30 blur-sm transition-transform duration-slow group-hover:translate-x-24"
      ></span>
      <span class="relative"><ng-content /></span>
    </banda-button>
  `,
})
export class ShineButtonComponent {
  readonly variant = input<BandaButtonVariant>('secondary');
  readonly size = input<ButtonSize>('md');
}

/** Fond qui glisse depuis la gauche au survol. */
@Component({
  selector: 'banda-swipe-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaButtonComponent],
  template: `
    <banda-button [variant]="variant()" [size]="size()" extraClass="group relative overflow-hidden">
      <span
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 -translate-x-full bg-banda-primary-active transition-transform duration-normal group-hover:translate-x-0"
      ></span>
      <span class="relative"><ng-content /></span>
    </banda-button>
  `,
})
export class SwipeButtonComponent {
  readonly variant = input<BandaButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
}

/** Verre dépoli. */
@Component({
  selector: 'banda-glass-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaButtonComponent],
  template: `
    <banda-button
      variant="ghost"
      [size]="size()"
      extraClass="border border-banda-border bg-banda-surface-muted opacity-80 shadow-lg backdrop-blur-md hover:opacity-100"
    >
      <ng-content />
    </banda-button>
  `,
})
export class GlassButtonComponent {
  readonly size = input<ButtonSize>('md');
}

// ─── Animations avec logique JS ──────────────────────────────────────────────

/** Onde au point de clic (ripple). */
@Component({
  selector: 'banda-ripple-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaButtonComponent],
  template: `
    <banda-button
      [variant]="variant()"
      [size]="size()"
      extraClass="relative overflow-hidden"
      (click)="handleClick($event)"
    >
      @for (ripple of ripples(); track ripple.id) {
        <span
          aria-hidden="true"
          class="pointer-events-none absolute h-10 w-10 animate-banda-ripple rounded-full bg-banda-surface"
          [style.left.px]="ripple.x - 20"
          [style.top.px]="ripple.y - 20"
        ></span>
      }
      <span class="relative"><ng-content /></span>
    </banda-button>
  `,
})
export class RippleButtonComponent {
  readonly variant = input<BandaButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');

  protected readonly ripples = signal<readonly { id: number; x: number; y: number }[]>([]);
  private nextId = 0;

  protected handleClick(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const id = this.nextId++;
    this.ripples.update((r) => [...r, { id, x: event.clientX - rect.left, y: event.clientY - rect.top }]);
    setTimeout(() => this.ripples.update((r) => r.filter((x) => x.id !== id)), 600);
  }
}

/** Attiré par le curseur (magnetic). */
@Component({
  selector: 'banda-magnetic-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaButtonComponent],
  template: `
    <banda-button
      [variant]="variant()"
      [size]="size()"
      extraClass="transition-transform duration-fast"
      [style]="buttonStyle()"
      (mousemove)="handleMove($event)"
      (mouseleave)="resetOffset()"
    >
      <ng-content />
    </banda-button>
  `,
})
export class MagneticButtonComponent {
  readonly variant = input<BandaButtonVariant>('outline');
  readonly size = input<ButtonSize>('md');

  private readonly offset = signal({ x: 0, y: 0 });
  protected readonly buttonStyle = computed(() => ({
    transform: `translate(${this.offset().x}px, ${this.offset().y}px)`,
  }));

  protected handleMove(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    this.offset.set({
      x: (event.clientX - rect.left - rect.width / 2) * 0.2,
      y: (event.clientY - rect.top - rect.height / 2) * 0.2,
    });
  }

  protected resetOffset(): void {
    this.offset.set({ x: 0, y: 0 });
  }
}
