/**
 * Étend <input type="checkbox"> natif — visuel custom tokens, coche Lucide.
 * `indeterminate` est une propriété DOM, posée via effect() sur le ref natif.
 */
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  input,
  output,
  viewChild,
} from '@angular/core';
import { LucideAngularModule, Check, Minus } from 'lucide-angular';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type CheckboxShape = 'square' | 'circle';

const SIZE: Record<CheckboxSize, { box: string; icon: number; text: string }> = {
  sm: { box: 'h-3.5 w-3.5', icon: 10, text: 'text-xs' },
  md: { box: 'h-4 w-4', icon: 12, text: 'text-sm' },
  lg: { box: 'h-5 w-5', icon: 14, text: 'text-md' },
};

const COLOR: Record<CheckboxColor, { box: string; icon: string }> = {
  primary: {
    box: 'checked:border-banda-primary checked:bg-banda-primary',
    icon: 'text-banda-primary-contrast',
  },
  secondary: {
    box: 'checked:border-banda-secondary checked:bg-banda-secondary',
    icon: 'text-banda-secondary-contrast',
  },
  success: {
    box: 'checked:border-banda-success checked:bg-banda-success',
    icon: 'text-banda-success-contrast',
  },
  warning: {
    box: 'checked:border-banda-warning checked:bg-banda-warning',
    icon: 'text-banda-warning-contrast',
  },
  danger: {
    box: 'checked:border-banda-danger checked:bg-banda-danger',
    icon: 'text-banda-danger-contrast',
  },
  info: {
    box: 'checked:border-banda-info checked:bg-banda-info',
    icon: 'text-banda-info-contrast',
  },
};

let uid = 0;

@Component({
  selector: 'banda-checkbox',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  template: `
    <div>
      <label
        [attr.for]="inputId"
        [class]="'group flex items-start gap-2 font-sans ' + (disabled() ? 'cursor-not-allowed opacity-50' : 'cursor-pointer')"
      >
        <span class="relative mt-1 flex shrink-0 items-center justify-center">
          <input
            #inputRef
            [id]="inputId"
            type="checkbox"
            [name]="name()"
            [checked]="checked()"
            [disabled]="disabled()"
            [required]="required()"
            [attr.aria-invalid]="error() ? true : null"
            [class]="inputClass()"
            (change)="onCheckChange($event)"
          />
          <lucide-angular
            [img]="Check"
            [size]="sizes().icon"
            aria-hidden="true"
            [class]="'pointer-events-none absolute ' + colors().icon + ' opacity-0 transition-opacity duration-fast peer-checked:opacity-100'"
          />
          <lucide-angular
            [img]="Minus"
            [size]="sizes().icon"
            aria-hidden="true"
            [class]="'pointer-events-none absolute ' + colors().icon + ' opacity-0 transition-opacity duration-fast peer-indeterminate:opacity-100'"
          />
        </span>
        <span class="flex flex-col">
          <span [class]="labelTextClass()">
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
    </div>
  `,
})
export class BandaCheckboxComponent {
  private readonly inputEl = viewChild<ElementRef<HTMLInputElement>>('inputRef');

  readonly name = input<string | undefined>(undefined);
  readonly checked = input<boolean | undefined>(undefined);
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly description = input<string | undefined>(undefined);
  readonly error = input<string | undefined>(undefined);
  /** État indéterminé (sélection partielle) — propriété DOM. */
  readonly indeterminate = input<boolean>(false);
  readonly size = input<CheckboxSize>('md');
  /** Couleur de la case cochée. @default 'primary' */
  readonly color = input<CheckboxColor>('primary');
  readonly shape = input<CheckboxShape>('square');
  /** Label barré et atténué quand coché (todo list). */
  readonly strikeOnCheck = input<boolean>(false);
  readonly boxClassName = input<string>('');

  readonly checkedChange = output<boolean>();

  protected readonly Check = Check;
  protected readonly Minus = Minus;

  protected readonly sizes = computed(() => SIZE[this.size()]);
  protected readonly colors = computed(() => COLOR[this.color()]);

  protected readonly inputClass = computed(() =>
    [
      'peer appearance-none border bg-banda-surface',
      this.sizes().box,
      this.shape() === 'circle' ? 'rounded-full' : 'rounded-sm',
      'transition-colors duration-fast',
      this.colors().box,
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring focus-visible:ring-offset-2 ring-offset-banda-background',
      'disabled:cursor-not-allowed',
      this.error() ? 'border-banda-danger' : 'border-banda-border-strong',
      this.boxClassName(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected readonly labelTextClass = computed(() =>
    [
      `${this.sizes().text} font-medium text-banda-text`,
      this.strikeOnCheck()
        ? 'transition-colors duration-fast group-has-[:checked]:text-banda-text-muted group-has-[:checked]:line-through'
        : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  readonly inputId = `banda-checkbox-${++uid}`;

  constructor() {
    effect(() => {
      const el = this.inputEl()?.nativeElement;
      if (el) el.indeterminate = this.indeterminate();
    });
  }

  protected onCheckChange(event: Event): void {
    this.checkedChange.emit((event.target as HTMLInputElement).checked);
  }
}
