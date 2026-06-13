/**
 * Étend <input> natif — label, hint, erreur, validation et sanitisation embarquées.
 * Sanitize ACTIF par défaut : signature Banda.
 */
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { LucideAngularModule, CheckCircle2 } from 'lucide-angular';
import { collapseWhitespace, stripDangerous } from '@banda/fields';
import { BandaLabelComponent } from '../label/banda-label.component';
import { BandaFieldFooterComponent } from '../_shared/banda-field-footer.component';
import { controlClasses, type ControlSize, type ControlVariant } from '../_shared/field-control';

export interface SanitizeOptions {
  /** Retire chevrons et caractères de contrôle pendant la frappe. @default true */
  stripDangerous?: boolean;
  /** Trim au blur. @default true */
  trim?: boolean;
  /** Réduit les espaces multiples au blur. @default true */
  collapseWhitespace?: boolean;
}

type LucideIconData = typeof CheckCircle2;

/** Compteur global pour les IDs auto-générés — stable dans le SSR. */
let uid = 0;

@Component({
  selector: 'banda-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule, BandaLabelComponent, BandaFieldFooterComponent],
  template: `
    <div>
      @if (label()) {
        <banda-label [for]="inputId" [required]="required()" [hidden]="hideLabel()">
          {{ label() }}
        </banda-label>
      }
      <div class="relative">
        <input
          [id]="inputId"
          [type]="type()"
          [name]="name()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [required]="required()"
          [attr.aria-invalid]="shownError() ? true : null"
          [attr.aria-describedby]="hint() || shownError() ? helpId : null"
          [class]="inputClass()"
          (input)="onInput($event)"
          (blur)="onBlur($event)"
          (change)="onChange($event)"
        />
        @if (startIcon()) {
          <lucide-angular
            [img]="startIcon()!"
            [size]="16"
            class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-banda-text-muted"
            aria-hidden="true"
          />
        }
        @if (endIcon() && !showValidIcon()) {
          <lucide-angular
            [img]="endIcon()!"
            [size]="16"
            class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-banda-text-muted"
            aria-hidden="true"
          />
        }
        @if (showValidIcon()) {
          <lucide-angular
            [img]="CheckCircle2"
            [size]="16"
            class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-banda-success"
            aria-hidden="true"
          />
        }
      </div>
      <banda-field-footer [helpId]="helpId" [hint]="hint()" [error]="shownError()" />
    </div>
  `,
})
export class BandaInputComponent {
  readonly label = input<string | undefined>(undefined);
  readonly hideLabel = input<boolean>(false);
  readonly hint = input<string | undefined>(undefined);
  /** Erreur contrôlée — prioritaire sur l'erreur interne issue de `validate`. */
  readonly error = input<string | undefined>(undefined);
  /** Validation embarquée : retourne le message d'erreur ou null. Évaluée au blur. */
  readonly validate = input<((value: string) => string | null) | undefined>(undefined);
  /** Sanitize ACTIF par défaut. Passer false pour désactiver. */
  readonly sanitize = input<boolean | SanitizeOptions>(true);
  readonly size = input<ControlSize>('md');
  readonly variant = input<ControlVariant>('default');
  /** Icône Lucide décorative à gauche. */
  readonly startIcon = input<LucideIconData | undefined>(undefined);
  /** Icône Lucide décorative à droite (masquée si l'icône de validation est affichée). */
  readonly endIcon = input<LucideIconData | undefined>(undefined);
  readonly type = input<string>('text');
  readonly name = input<string | undefined>(undefined);
  readonly placeholder = input<string | undefined>(undefined);
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  /** Classes additionnelles de l'<input>. */
  readonly inputClassName = input<string>('');

  /** Émis à chaque frappe (après sanitize éventuel). */
  readonly valueChange = output<string>();

  protected readonly CheckCircle2 = CheckCircle2;

  protected readonly internalError = signal<string | null>(null);
  protected readonly valid = signal<boolean>(false);

  protected readonly shownError = computed(
    () => this.error() ?? this.internalError() ?? undefined,
  );
  protected readonly showValidIcon = computed(() => this.valid() && !this.shownError());

  protected readonly inputClass = computed(() =>
    controlClasses({
      size: this.size(),
      variant: this.variant(),
      invalid: this.shownError() !== undefined,
      extra: [
        this.startIcon() ? 'pl-10' : '',
        this.showValidIcon() || this.endIcon() ? 'pr-10' : '',
        this.inputClassName(),
      ]
        .filter(Boolean)
        .join(' '),
    }),
  );

  readonly inputId = `banda-input-${++uid}`;
  readonly helpId = `${this.inputId}-help`;

  protected onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const opts = this.sanitize();
    if (opts !== false) {
      const sanitizeOpts = opts === true ? null : opts;
      if (!sanitizeOpts || sanitizeOpts.stripDangerous !== false) {
        target.value = stripDangerous(target.value);
      }
    }
    if (this.internalError() !== null) this.internalError.set(null);
    if (this.valid()) this.valid.set(false);
    this.valueChange.emit(target.value);
  }

  protected onBlur(event: FocusEvent): void {
    const target = event.target as HTMLInputElement;
    const opts = this.sanitize();
    if (opts !== false) {
      const sanitizeOpts = opts === true ? null : opts;
      if (!sanitizeOpts || sanitizeOpts.collapseWhitespace !== false) {
        target.value = collapseWhitespace(target.value);
      } else if (!sanitizeOpts || sanitizeOpts.trim !== false) {
        target.value = target.value.trim();
      }
    }
    const validateFn = this.validate();
    if (validateFn) {
      const message = validateFn(target.value);
      this.internalError.set(message);
      this.valid.set(message === null && target.value !== '');
    }
  }

  protected onChange(_event: Event): void {
    // Laisse l'événement se propager nativement pour la participation aux formulaires.
  }
}
