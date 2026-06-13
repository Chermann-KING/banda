/** Interrupteur stylé tokens — input[type=checkbox] + role="switch". */
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type SwitchShape = 'pill' | 'square';

const SIZE: Record<SwitchSize, { rail: string; thumb: string; x: string; text: string }> = {
  sm: { rail: 'h-4 w-7', thumb: 'h-2.5 w-2.5', x: 'peer-checked:translate-x-2.5', text: 'text-xs' },
  md: { rail: 'h-5 w-9', thumb: 'h-3 w-3', x: 'peer-checked:translate-x-4', text: 'text-sm' },
  lg: { rail: 'h-6 w-11', thumb: 'h-4 w-4', x: 'peer-checked:translate-x-5', text: 'text-md' },
};

const COLOR: Record<SwitchColor, string> = {
  primary: 'peer-checked:bg-banda-primary',
  secondary: 'peer-checked:bg-banda-secondary',
  success: 'peer-checked:bg-banda-success',
  warning: 'peer-checked:bg-banda-warning',
  danger: 'peer-checked:bg-banda-danger',
  info: 'peer-checked:bg-banda-info',
};

let uid = 0;

@Component({
  selector: 'banda-switch',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label [attr.for]="inputId" [class]="labelClass()">
      <!-- Contrôle (input caché + rail + curseur) — toujours présent -->
      <span class="relative inline-flex shrink-0 items-center" [style.order]="labelAlign() === 'start' ? 1 : 0">
        <input
          [id]="inputId"
          type="checkbox"
          role="switch"
          [name]="name()"
          [checked]="checked()"
          [disabled]="disabled()"
          class="peer sr-only"
          (change)="onSwitchChange($event)"
        />
        <span aria-hidden="true" [class]="railClass()"></span>
        <span aria-hidden="true" [class]="thumbClass()"></span>
      </span>
      <!-- Texte — order 0 si labelAlign=start, order 1 sinon -->
      <span class="flex flex-col" [style.order]="labelAlign() === 'start' ? 0 : 1">
        <span [class]="hideLabel() ? 'sr-only' : sizes().text + ' font-medium text-banda-text'">
          {{ label() }}
        </span>
        @if (description() && !hideLabel()) {
          <span class="text-xs text-banda-text-muted">{{ description() }}</span>
        }
      </span>
    </label>
  `,
})
export class BandaSwitchComponent {
  readonly label = input.required<string>();
  readonly name = input<string | undefined>(undefined);
  readonly checked = input<boolean | undefined>(undefined);
  readonly disabled = input<boolean>(false);
  /** Label masqué visuellement (reste accessible). */
  readonly hideLabel = input<boolean>(false);
  readonly description = input<string | undefined>(undefined);
  readonly size = input<SwitchSize>('md');
  /** Couleur du rail activé. @default 'primary' */
  readonly color = input<SwitchColor>('primary');
  readonly shape = input<SwitchShape>('pill');
  /** Position du label par rapport à l'interrupteur. @default 'end' */
  readonly labelAlign = input<'start' | 'end'>('end');
  readonly trackClassName = input<string>('');

  readonly switchChange = output<boolean>();

  protected readonly sizes = computed(() => SIZE[this.size()]);

  protected readonly labelClass = computed(() =>
    [
      'inline-flex gap-2 font-sans',
      this.description() ? 'items-start' : 'items-center',
      this.disabled() ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected readonly railClass = computed(() =>
    [
      'shrink-0 bg-banda-border-strong',
      this.sizes().rail,
      this.shape() === 'square' ? 'rounded-sm' : 'rounded-full',
      'transition-colors duration-fast',
      COLOR[this.color()],
      'peer-focus-visible:ring-2 peer-focus-visible:ring-banda-focus-ring peer-focus-visible:ring-offset-2 ring-offset-banda-background',
      this.trackClassName(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected readonly thumbClass = computed(() =>
    [
      'pointer-events-none absolute left-1 top-1/2 -translate-y-1/2 bg-banda-surface shadow-sm',
      this.sizes().thumb,
      this.shape() === 'square' ? 'rounded-sm' : 'rounded-full',
      'transition-transform duration-fast',
      this.sizes().x,
    ].join(' '),
  );

  readonly inputId = `banda-switch-${++uid}`;

  protected onSwitchChange(event: Event): void {
    this.switchChange.emit((event.target as HTMLInputElement).checked);
  }
}
