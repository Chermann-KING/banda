/**
 * Select custom accessible (pattern APG « select-only combobox »).
 * Un <select> natif caché conserve la participation aux formulaires.
 * Le popup est positionné en position:fixed (calcul depuis getBoundingClientRect).
 */
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { type LucideIconData, LucideAngularModule, Check, ChevronDown } from 'lucide-angular';
import { BandaLabelComponent } from '../label/banda-label.component';
import { BandaFieldFooterComponent } from '../_shared/banda-field-footer.component';
import { controlClasses, type ControlSize, type ControlVariant } from '../_shared/field-control';

export interface BandaSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  /** En-tête de groupe affiché au-dessus de la première option du groupe. */
  group?: string;
  /** Trait de séparation au-dessus de cette option. */
  separator?: boolean;
}

let uid = 0;

@Component({
  selector: 'banda-select',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule, BandaLabelComponent, BandaFieldFooterComponent],
  template: `
    <div>
      @if (label()) {
        <banda-label [for]="triggerId" [required]="required()" [hidden]="hideLabel()">
          {{ label() }}
        </banda-label>
      }

      <!-- Élément natif caché : participation aux formulaires. -->
      <select
        class="sr-only"
        tabindex="-1"
        aria-hidden="true"
        [name]="name()"
        [value]="currentValue()"
        [required]="required()"
        [disabled]="disabled()"
        (change)="$event.stopPropagation()"
      >
        <option value="">{{ placeholder() }}</option>
        @for (opt of options(); track opt.value) {
          <option [value]="opt.value">{{ opt.label }}</option>
        }
      </select>

      <!-- Déclencheur custom -->
      <button
        #trigger
        type="button"
        [id]="triggerId"
        role="combobox"
        [attr.aria-expanded]="open()"
        aria-haspopup="listbox"
        [attr.aria-controls]="listboxId"
        [attr.aria-activedescendant]="open() && activeIndex() >= 0 ? optionId(activeIndex()) : null"
        [attr.aria-invalid]="shownError() ? true : null"
        [attr.aria-describedby]="hint() || shownError() ? helpId : null"
        [attr.aria-required]="required() || null"
        [disabled]="disabled()"
        [class]="triggerClass()"
        (click)="onTriggerClick()"
        (keydown)="onTriggerKeyDown($event)"
        (blur)="runValidate(currentValue())"
      >
        @if (startIcon()) {
          <lucide-angular [img]="startIcon()!" [size]="16" class="shrink-0 text-banda-text-muted" aria-hidden="true" />
        }
        <span class="min-w-0 flex-1 truncate">
          @if (selected()) {
            {{ selected()!.label }}
          } @else {
            <span class="text-banda-text-placeholder">{{ placeholder() }}</span>
          }
        </span>
        <lucide-angular
          [img]="ChevronDown"
          [size]="16"
          [class]="'pointer-events-none shrink-0 text-banda-text-muted transition-transform duration-fast ' + (open() ? 'rotate-180' : '')"
          aria-hidden="true"
        />
      </button>

      <!-- Popup listbox positionnée en fixed -->
      @if (open()) {
        <ul
          #listbox
          [id]="listboxId"
          role="listbox"
          [attr.aria-label]="label()"
          [style.position]="'fixed'"
          [style.top.px]="listTop()"
          [style.left.px]="listLeft()"
          [style.width.px]="listWidth()"
          class="z-dropdown m-0 max-h-64 list-none overflow-y-auto rounded-md border border-banda-border bg-banda-surface p-1 shadow-lg"
        >
          @for (opt of options(); track opt.value; let i = $index) {
            <li class="m-0 list-none p-0">
              @if (opt.separator) {
                <hr role="presentation" class="my-1 border-banda-border" />
              }
              @if (opt.group && (i === 0 || options().at(i - 1)?.group !== opt.group)) {
                <span
                  role="presentation"
                  class="block px-3 pb-1 pt-2 font-sans text-xs font-semibold uppercase tracking-wide text-banda-text-muted"
                >{{ opt.group }}</span>
              }
              <div
                [id]="optionId(i)"
                role="option"
                [attr.aria-selected]="opt.value === currentValue()"
                [attr.aria-disabled]="opt.disabled || null"
                [class]="optionClass(i, opt)"
                (mouseenter)="!opt.disabled && activeIndex.set(i)"
                (mousedown)="$event.preventDefault()"
                (click)="selectOption(opt)"
              >
                <span class="min-w-0 flex-1">{{ opt.label }}</span>
                @if (opt.value === currentValue()) {
                  <lucide-angular [img]="Check" [size]="14" class="shrink-0" aria-hidden="true" />
                }
              </div>
            </li>
          }
        </ul>
      }

      <banda-field-footer [helpId]="helpId" [hint]="hint()" [error]="shownError()" />
    </div>
  `,
})
export class BandaSelectComponent {
  @ViewChild('trigger') triggerRef!: ElementRef<HTMLButtonElement>;

  readonly options = input.required<readonly BandaSelectOption[]>();
  readonly value = input<string | undefined>(undefined);
  readonly defaultValue = input<string>('');
  readonly onChange = output<string>();
  readonly label = input<string | undefined>(undefined);
  readonly hideLabel = input<boolean>(false);
  readonly hint = input<string | undefined>(undefined);
  readonly error = input<string | undefined>(undefined);
  readonly validate = input<((value: string) => string | null) | undefined>(undefined);
  readonly placeholder = input<string>('Sélectionner…');
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly size = input<ControlSize>('md');
  readonly variant = input<ControlVariant>('default');
  readonly name = input<string | undefined>(undefined);
  readonly startIcon = input<LucideIconData | undefined>(undefined);
  readonly triggerClassName = input<string>('');
  readonly animation = input<'slide' | 'zoom' | undefined>(undefined);

  protected readonly Check = Check;
  protected readonly ChevronDown = ChevronDown;

  protected readonly open = signal(false);
  protected readonly activeIndex = signal(-1);
  protected readonly internalValue = signal('');
  protected readonly internalError = signal<string | null>(null);

  protected readonly currentValue = computed(() => this.value() ?? this.internalValue());
  protected readonly selected = computed(() =>
    this.options().find((o) => o.value === this.currentValue()),
  );
  protected readonly shownError = computed(
    () => this.error() ?? this.internalError() ?? undefined,
  );

  protected readonly listTop = signal(0);
  protected readonly listLeft = signal(0);
  protected readonly listWidth = signal(0);

  readonly triggerId = `banda-select-${++uid}`;
  readonly listboxId = `${this.triggerId}-listbox`;
  readonly helpId = `${this.triggerId}-help`;

  protected readonly triggerClass = computed(() =>
    controlClasses({
      size: this.size(),
      variant: this.variant(),
      invalid: this.shownError() !== undefined,
      extra: [
        'flex cursor-pointer items-center justify-between gap-2 text-left disabled:cursor-not-allowed',
        this.triggerClassName(),
      ]
        .filter(Boolean)
        .join(' '),
    }),
  );

  protected optionId(index: number): string {
    return `${this.listboxId}-option-${index}`;
  }

  protected optionClass(index: number, opt: BandaSelectOption): string {
    return [
      'flex cursor-pointer items-center justify-between gap-3 rounded-sm px-3 py-2 font-sans text-sm text-banda-text',
      index === this.activeIndex() && !opt.disabled ? 'bg-banda-surface-muted' : '',
      opt.value === this.currentValue() ? 'bg-banda-primary-muted font-medium text-banda-primary' : '',
      opt.disabled ? 'pointer-events-none opacity-50' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected runValidate(val: string): void {
    const fn = this.validate();
    if (fn) this.internalError.set(fn(val));
  }

  private get firstEnabled(): number {
    return this.options().findIndex((o) => !o.disabled);
  }

  private openList(): void {
    const rect = this.triggerRef?.nativeElement?.getBoundingClientRect();
    if (rect) {
      this.listTop.set(rect.bottom + 4);
      this.listLeft.set(rect.left);
      this.listWidth.set(rect.width);
    }
    const selectedIndex = this.options().findIndex((o) => o.value === this.currentValue());
    this.activeIndex.set(selectedIndex >= 0 ? selectedIndex : this.firstEnabled);
    this.open.set(true);
  }

  private moveActive(from: number, direction: 1 | -1): number {
    let index = from + direction;
    const opts = this.options();
    while (index >= 0 && index < opts.length && opts[index]?.disabled) index += direction;
    return index >= 0 && index < opts.length ? index : from;
  }

  protected onTriggerClick(): void {
    if (this.open()) this.open.set(false);
    else this.openList();
  }

  protected selectOption(opt: BandaSelectOption): void {
    if (opt.disabled) return;
    if (this.value() === undefined) this.internalValue.set(opt.value);
    this.onChange.emit(opt.value);
    this.runValidate(opt.value);
    this.open.set(false);
    this.triggerRef?.nativeElement?.focus();
  }

  protected onTriggerKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) return;
    const isOpen = this.open();
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) this.openList();
        else this.activeIndex.update((i) => this.moveActive(i, 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) this.openList();
        else this.activeIndex.update((i) => this.moveActive(i, -1));
        break;
      case 'Home':
        if (isOpen) { event.preventDefault(); this.activeIndex.set(this.firstEnabled); }
        break;
      case 'End':
        if (isOpen) { event.preventDefault(); this.activeIndex.set(this.moveActive(this.options().length, -1)); }
        break;
      case 'Enter':
      case ' ': {
        event.preventDefault();
        if (!isOpen) { this.openList(); break; }
        const active = this.options()[this.activeIndex()];
        if (active) this.selectOption(active);
        break;
      }
      case 'Escape':
      case 'Tab':
        this.open.set(false);
        break;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.open()) return;
    const target = event.target as Node;
    if (!this.triggerRef?.nativeElement?.contains(target)) {
      this.open.set(false);
    }
  }
}
