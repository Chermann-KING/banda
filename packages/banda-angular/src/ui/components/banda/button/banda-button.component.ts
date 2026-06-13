import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LucideAngularModule, Loader2 } from 'lucide-angular';

export type BandaButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
export type BandaButtonSize = 'sm' | 'md' | 'lg' | 'icon';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-md font-sans font-medium ' +
  'transition-colors duration-fast cursor-pointer ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring ' +
  'focus-visible:ring-offset-2 ring-offset-banda-background ' +
  'disabled:pointer-events-none disabled:opacity-50';

const VARIANT: Record<BandaButtonVariant, string> = {
  primary:
    'bg-banda-primary text-banda-primary-contrast hover:bg-banda-primary-hover active:bg-banda-primary-active',
  secondary:
    'bg-banda-secondary text-banda-secondary-contrast hover:bg-banda-secondary-hover active:bg-banda-secondary-active',
  outline:
    'border border-banda-border-strong bg-transparent text-banda-text hover:border-banda-primary hover:text-banda-primary',
  ghost: 'bg-transparent text-banda-text hover:bg-banda-surface-muted',
  danger:
    'bg-banda-danger text-banda-danger-contrast hover:bg-banda-danger-hover active:bg-banda-danger-active',
  link: 'bg-transparent text-banda-primary underline-offset-4 hover:underline',
};

const SIZE: Record<BandaButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-md',
  lg: 'h-12 px-6 text-lg',
  /** Bouton carré pour icône seule — exige un aria-label. */
  icon: 'h-10 w-10',
};

/** Étend <button> natif. type="button" par défaut (évite les submits accidentels). */
@Component({
  selector: 'banda-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  template: `
    <button
      [attr.type]="type()"
      [disabled]="disabled() || loading()"
      [attr.aria-busy]="loading() || null"
      [class]="buttonClass()"
    >
      @if (loading()) {
        <lucide-angular [img]="Loader2" [size]="16" class="animate-spin" aria-hidden="true" />
      }
      <ng-content />
    </button>
  `,
})
export class BandaButtonComponent {
  readonly variant = input<BandaButtonVariant>('primary');
  readonly size = input<BandaButtonSize>('md');
  readonly loading = input<boolean>(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input<boolean>(false);
  /** Classes CSS supplémentaires appliquées au <button> interne (utilisé par les modèles). */
  readonly extraClass = input<string>('');

  protected readonly Loader2 = Loader2;

  protected readonly buttonClass = computed(() =>
    [BASE, VARIANT[this.variant()], SIZE[this.size()], this.extraClass()].filter(Boolean).join(' '),
  );
}
