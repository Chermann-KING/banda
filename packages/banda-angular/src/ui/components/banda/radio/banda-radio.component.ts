/** Étend <input type="radio"> natif — le point est rendu par checked:border-4 (centre = bg). */
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

export type RadioSize = 'sm' | 'md' | 'lg';
export type RadioColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

const SIZE: Record<RadioSize, { box: string; text: string }> = {
  sm: { box: 'h-3.5 w-3.5', text: 'text-xs' },
  md: { box: 'h-4 w-4', text: 'text-sm' },
  lg: { box: 'h-5 w-5', text: 'text-md' },
};

const COLOR: Record<RadioColor, string> = {
  primary: 'checked:border-banda-primary',
  secondary: 'checked:border-banda-secondary',
  success: 'checked:border-banda-success',
  warning: 'checked:border-banda-warning',
  danger: 'checked:border-banda-danger',
  info: 'checked:border-banda-info',
};

let uid = 0;

@Component({
  selector: 'banda-radio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label
      [attr.for]="inputId"
      [class]="
        'flex items-start gap-2 font-sans ' +
        (disabled() ? 'cursor-not-allowed opacity-50' : 'cursor-pointer')
      "
    >
      <input
        [id]="inputId"
        type="radio"
        [name]="name()"
        [value]="value()"
        [checked]="checked()"
        [disabled]="disabled()"
        [required]="required()"
        [attr.aria-invalid]="error() ? true : null"
        [class]="inputClass()"
        (change)="onRadioChange($event)"
      />
      <span class="flex flex-col">
        <span [class]="sizes().text + ' font-medium text-banda-text'">
          <ng-content />
        </span>
        @if (description()) {
          <span class="text-xs text-banda-text-muted">{{ description() }}</span>
        }
        @if (error()) {
          <span class="text-xs font-medium text-banda-danger">{{ error() }}</span>
        }
      </span>
    </label>
  `,
})
export class BandaRadioComponent {
  readonly name = input<string | undefined>(undefined);
  readonly value = input<string | undefined>(undefined);
  readonly checked = input<boolean | undefined>(undefined);
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly description = input<string | undefined>(undefined);
  readonly error = input<string | undefined>(undefined);
  readonly size = input<RadioSize>('md');
  /** Couleur du point coché. @default 'primary' */
  readonly color = input<RadioColor>('primary');
  readonly boxClassName = input<string>('');

  readonly radioChange = output<string>();

  protected readonly sizes = computed(() => SIZE[this.size()]);

  protected readonly inputClass = computed(() =>
    [
      'mt-1 shrink-0 appearance-none rounded-full border bg-banda-surface',
      this.sizes().box,
      'transition-colors duration-fast',
      'checked:border-4',
      COLOR[this.color()],
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring focus-visible:ring-offset-2 ring-offset-banda-background',
      'disabled:cursor-not-allowed',
      this.error() ? 'border-banda-danger' : 'border-banda-border-strong',
      this.boxClassName(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  readonly inputId = `banda-radio-${++uid}`;

  protected onRadioChange(event: Event): void {
    this.radioChange.emit((event.target as HTMLInputElement).value ?? '');
  }
}
