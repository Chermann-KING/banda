/**
 * Étend <textarea> natif — sanitize actif par défaut, compteur de caractères, hint/erreur.
 */
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { type LucideIconData, LucideAngularModule } from 'lucide-angular';
import { collapseWhitespace, stripDangerous } from '@banda/fields';
import { BandaLabelComponent } from '../label/banda-label.component';
import { BandaFieldFooterComponent } from '../_shared/banda-field-footer.component';
import { type ControlSize, type ControlVariant } from '../_shared/field-control';
import { textareaClasses, type TextareaResize } from './textarea-utils';
import type { SanitizeOptions } from '../input/banda-input.component';


const ICON_TOP: Record<ControlSize, string> = {
  sm: 'top-2.5',
  md: 'top-4',
  lg: 'top-5',
};

let uid = 0;

@Component({
  selector: 'banda-textarea',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule, BandaLabelComponent, BandaFieldFooterComponent],
  template: `
    <div>
      @if (cornerHint() && label() && !hideLabel()) {
        <div class="flex items-baseline justify-between gap-2">
          <banda-label [for]="textareaId" [required]="required()" [hidden]="hideLabel()">
            {{ label() }}
          </banda-label>
          <span class="font-sans text-xs text-banda-text-muted">{{ cornerHint() }}</span>
        </div>
      } @else if (label()) {
        <banda-label [for]="textareaId" [required]="required()" [hidden]="hideLabel()">
          {{ label() }}
        </banda-label>
      }
      <div class="relative">
        <textarea
          [id]="textareaId"
          [name]="name()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [required]="required()"
          [attr.maxlength]="maxLength()"
          [attr.aria-invalid]="shownError() ? true : null"
          [attr.aria-describedby]="hint() || shownError() ? helpId : null"
          [class]="textareaClass()"
          (input)="onInput($event)"
          (blur)="onBlur($event)"
        ></textarea>
        @if (startIcon()) {
          <lucide-angular
            [img]="startIcon()!"
            [size]="16"
            [class]="'pointer-events-none absolute left-3 ' + iconTop() + ' text-banda-text-muted'"
            aria-hidden="true"
          />
        }
        @if (endIcon()) {
          <lucide-angular
            [img]="endIcon()!"
            [size]="16"
            [class]="'pointer-events-none absolute right-3 ' + iconTop() + ' text-banda-text-muted'"
            aria-hidden="true"
          />
        }
      </div>
      <div [class]="footerRowClass()">
        @if (counterVisible()) {
          <span
            aria-live="polite"
            [class]="
              'mt-1 shrink-0 font-sans text-xs tabular-nums ' + counterColorClass()
            "
          >
            {{ length() }}/{{ maxLength() }}
          </span>
        }
        <banda-field-footer [helpId]="helpId" [hint]="hint()" [error]="shownError()" />
      </div>
    </div>
  `,
})
export class BandaTextareaComponent {
  readonly label = input<string | undefined>(undefined);
  readonly hideLabel = input<boolean>(false);
  readonly hint = input<string | undefined>(undefined);
  readonly hintAlign = input<'start' | 'end'>('start');
  readonly cornerHint = input<string | undefined>(undefined);
  readonly error = input<string | undefined>(undefined);
  readonly validate = input<((value: string) => string | null) | undefined>(undefined);
  readonly sanitize = input<boolean | SanitizeOptions>(true);
  readonly size = input<ControlSize>('md');
  readonly variant = input<ControlVariant>('default');
  readonly resize = input<TextareaResize>('y');
  readonly startIcon = input<LucideIconData | undefined>(undefined);
  readonly endIcon = input<LucideIconData | undefined>(undefined);
  readonly showCounter = input<boolean>(false);
  readonly counterAlign = input<'start' | 'end'>('end');
  readonly name = input<string | undefined>(undefined);
  readonly placeholder = input<string | undefined>(undefined);
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly maxLength = input<number | undefined>(undefined);
  readonly textareaClassName = input<string>('');

  readonly valueChange = output<string>();

  protected readonly internalError = signal<string | null>(null);
  protected readonly length = signal<number>(0);

  protected readonly shownError = computed(
    () => this.error() ?? this.internalError() ?? undefined,
  );
  protected readonly counterVisible = computed(
    () => this.showCounter() && this.maxLength() !== undefined,
  );
  protected readonly counterRatio = computed(() => {
    const max = this.maxLength();
    return max ? this.length() / max : 0;
  });
  protected readonly counterColorClass = computed(() => {
    const ratio = this.counterRatio();
    if (ratio >= 1) return 'font-semibold text-banda-danger';
    if (ratio >= 0.8) return 'text-banda-warning';
    return 'text-banda-text-muted';
  });

  protected readonly textareaClass = computed(() =>
    textareaClasses({
      size: this.size(),
      variant: this.variant(),
      resize: this.resize(),
      invalid: this.shownError() !== undefined,
      extra: [
        this.startIcon() ? 'pl-10' : '',
        this.endIcon() ? 'pr-10' : '',
        this.textareaClassName(),
      ]
        .filter(Boolean)
        .join(' '),
    }),
  );

  protected readonly iconTop = computed(() => ICON_TOP[this.size()]);

  protected readonly footerRowClass = computed(() => {
    const hasFooter = Boolean(this.hint() || this.shownError());
    const hasCounter = this.counterVisible();
    if (!hasFooter && !hasCounter) return 'hidden';
    const hintSide = this.hintAlign();
    const counterSide = this.counterAlign();
    const hasBoth = hasFooter && hasCounter;
    const justify = hasBoth && hintSide !== counterSide
      ? 'justify-between'
      : counterSide === 'end' || hintSide === 'end'
        ? 'justify-end'
        : 'justify-start';
    return `flex items-start gap-2 ${justify}`;
  });

  readonly textareaId = `banda-textarea-${++uid}`;
  readonly helpId = `${this.textareaId}-help`;

  protected onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    const opts = this.sanitize();
    if (opts !== false) {
      target.value = stripDangerous(target.value);
    }
    this.length.set(target.value.length);
    if (this.internalError() !== null) this.internalError.set(null);
    this.valueChange.emit(target.value);
  }

  protected onBlur(event: FocusEvent): void {
    const target = event.target as HTMLTextAreaElement;
    const opts = this.sanitize();
    if (opts === true || (typeof opts === 'object' && opts.trim !== false)) {
      target.value = collapseWhitespace(target.value);
      this.length.set(target.value.length);
    }
    const validateFn = this.validate();
    if (validateFn) this.internalError.set(validateFn(target.value));
  }
}
