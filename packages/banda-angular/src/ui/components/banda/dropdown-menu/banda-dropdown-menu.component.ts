/**
 * Menu déroulant accessible (APG « Menu Button ») — pattern composé :
 * BandaDropdownMenuComponent, BandaMenuItemComponent, BandaMenuLabelComponent,
 * BandaMenuSeparatorComponent, BandaMenuCheckboxItemComponent,
 * BandaMenuRadioGroupComponent, BandaMenuRadioItemComponent.
 *
 * Les items injectent BandaDropdownMenuComponent pour appeler close().
 * Les radio items injectent BandaMenuRadioGroupComponent pour lire/écrire la valeur.
 */
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { type LucideIconData, LucideAngularModule, Check } from 'lucide-angular';

const DEFAULT_TRIGGER =
  'inline-flex items-center gap-2 rounded-md bg-banda-surface-muted px-3 py-2 ' +
  'font-sans text-sm font-medium text-banda-text transition-colors duration-fast ' +
  'hover:bg-banda-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring';

const ITEM_BASE =
  'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left font-sans text-sm ' +
  'transition-colors duration-fast ' +
  'hover:bg-banda-surface-muted focus-visible:outline-none focus-visible:bg-banda-surface-muted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-banda-focus-ring ' +
  'disabled:pointer-events-none disabled:opacity-50';

const MENU_ITEM_SELECTOR = '[role^="menuitem"]:not([disabled])';

let uid = 0;

// ─── Menu principal ───────────────────────────────────────────────────────────

@Component({
  selector: 'banda-dropdown-menu',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  template: `
    <button
      #triggerRef
      type="button"
      aria-haspopup="menu"
      [attr.aria-expanded]="open()"
      [attr.aria-controls]="open() ? menuId : null"
      [class]="triggerClassName() ?? DEFAULT_TRIGGER"
      (click)="toggle()"
      (keydown)="onTriggerKeyDown($event)"
    >
      <ng-content select="[slot=trigger]" />
    </button>
    @if (open()) {
      <menu
        #menuRef
        [id]="menuId"
        role="menu"
        [attr.aria-label]="label()"
        [style.position]="'fixed'"
        [style.top.px]="menuTop()"
        [style.left.px]="menuLeft()"
        [style.min-width.px]="menuMinWidth()"
        [class]="menuClass()"
        (keydown)="onMenuKeyDown($event)"
      >
        <ng-content />
      </menu>
    }
  `,
})
export class BandaDropdownMenuComponent {
  @ViewChild('triggerRef') triggerRef!: ElementRef<HTMLButtonElement>;
  @ViewChild('menuRef') menuRef?: ElementRef<HTMLMenuElement>;

  readonly label = input.required<string>();
  readonly align = input<'start' | 'end'>('start');
  readonly animation = input<'slide' | 'zoom' | undefined>(undefined);
  readonly triggerClassName = input<string | undefined>(undefined);
  readonly menuClassName = input<string>('');

  protected readonly DEFAULT_TRIGGER = DEFAULT_TRIGGER;
  protected readonly open = signal(false);
  protected readonly menuTop = signal(0);
  protected readonly menuLeft = signal(0);
  protected readonly menuMinWidth = signal(192);

  readonly menuId = `banda-menu-${++uid}`;

  protected readonly menuClass = computed(() =>
    [
      'z-dropdown m-0 min-w-48 list-none rounded-md border border-banda-border bg-banda-surface p-1 shadow-lg',
      this.animation() === 'slide' ? 'animate-banda-slide-up' : '',
      this.animation() === 'zoom' ? 'animate-banda-zoom-in' : '',
      this.menuClassName(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  close(): void {
    this.open.set(false);
    this.triggerRef?.nativeElement?.focus();
  }

  toggle(): void {
    if (this.open()) {
      this.close();
      return;
    }
    const rect = this.triggerRef?.nativeElement?.getBoundingClientRect();
    if (rect) {
      this.menuTop.set(rect.bottom + 4);
      this.menuLeft.set(this.align() === 'end' ? rect.right - 192 : rect.left);
      this.menuMinWidth.set(rect.width);
    }
    this.open.set(true);
    // Focus sur le premier item après rendu.
    setTimeout(() => {
      this.menuRef?.nativeElement
        ?.querySelector<HTMLElement>(MENU_ITEM_SELECTOR)
        ?.focus();
    });
  }

  private moveFocus(direction: 1 | -1): void {
    const items = Array.from(
      this.menuRef?.nativeElement?.querySelectorAll<HTMLElement>(MENU_ITEM_SELECTOR) ?? [],
    );
    if (items.length === 0) return;
    const idx = items.findIndex((item) => item === document.activeElement);
    items[(idx + direction + items.length) % items.length]?.focus();
  }

  protected onTriggerKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' && !this.open()) {
      event.preventDefault();
      this.toggle();
    }
  }

  protected onMenuKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown': event.preventDefault(); this.moveFocus(1); break;
      case 'ArrowUp': event.preventDefault(); this.moveFocus(-1); break;
      case 'Escape': case 'Tab': event.preventDefault(); this.close(); break;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.open()) return;
    if (!this.triggerRef?.nativeElement?.contains(event.target as Node)) {
      this.open.set(false);
    }
  }
}

// ─── Item action ─────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-menu-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  template: `
    <li role="none" class="m-0 list-none p-0">
      <button
        type="button"
        role="menuitem"
        tabindex="-1"
        [disabled]="disabled() || null"
        [class]="ITEM_BASE + ' ' + (danger() ? 'text-banda-danger' : 'text-banda-text')"
        (click)="onSelect()"
      >
        @if (icon()) {
          <lucide-angular [img]="icon()!" [size]="14"
            [class]="danger() ? 'shrink-0' : 'shrink-0 text-banda-text-muted'"
            aria-hidden="true" />
        }
        @if (description()) {
          <span class="flex min-w-0 flex-col items-start gap-0.5">
            <span class="font-medium"><ng-content /></span>
            <span class="text-xs text-banda-text-muted">{{ description() }}</span>
          </span>
        } @else {
          <span class="min-w-0 flex-1"><ng-content /></span>
        }
        @if (shortcut()) {
          <kbd class="ml-auto shrink-0 font-sans text-xs tracking-wide text-banda-text-muted">{{ shortcut() }}</kbd>
        }
      </button>
    </li>
  `,
})
export class BandaMenuItemComponent {
  private readonly menu = inject(BandaDropdownMenuComponent);

  readonly icon = input<LucideIconData | undefined>(undefined);
  readonly shortcut = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  readonly disabled = input<boolean>(false);
  readonly danger = input<boolean>(false);
  readonly closeOnSelect = input<boolean>(true);
  readonly select = output<void>();

  protected readonly ITEM_BASE = ITEM_BASE;

  protected onSelect(): void {
    this.select.emit();
    if (this.closeOnSelect()) this.menu.close();
  }
}

// ─── Label de groupe ──────────────────────────────────────────────────────────

@Component({
  selector: 'banda-menu-label',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <li role="none" class="m-0 list-none p-0">
      <span class="block px-2 py-1.5 font-sans text-xs font-medium text-banda-text-muted">
        <ng-content />
      </span>
    </li>
  `,
})
export class BandaMenuLabelComponent {}

// ─── Séparateur ───────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-menu-separator',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <li role="separator" aria-orientation="horizontal" class="m-0 list-none p-0">
      <hr class="my-1 border-banda-border" />
    </li>
  `,
})
export class BandaMenuSeparatorComponent {}

// ─── Item à coche ─────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-menu-checkbox-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  template: `
    <li role="none" class="m-0 list-none p-0">
      <button
        type="button"
        role="menuitemcheckbox"
        [attr.aria-checked]="checked()"
        tabindex="-1"
        [disabled]="disabled() || null"
        [class]="ITEM_BASE + ' text-banda-text'"
        (click)="checkedChange.emit(!checked())"
      >
        <span class="min-w-0 flex-1"><ng-content /></span>
        @if (checked()) {
          <lucide-angular [img]="Check" [size]="14" class="shrink-0" aria-hidden="true" />
        }
      </button>
    </li>
  `,
})
export class BandaMenuCheckboxItemComponent {
  readonly checked = input.required<boolean>();
  readonly disabled = input<boolean>(false);
  readonly checkedChange = output<boolean>();

  protected readonly ITEM_BASE = ITEM_BASE;
  protected readonly Check = Check;
}

// ─── Groupe radio ─────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-menu-radio-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaMenuLabelComponent],
  template: `
    @if (label()) {
      <banda-menu-label>{{ label() }}</banda-menu-label>
    }
    <ng-content />
  `,
})
export class BandaMenuRadioGroupComponent {
  readonly value = input.required<string>();
  readonly label = input<string | undefined>(undefined);
  readonly valueChange = output<string>();

  /** Appelé par les items enfants. */
  notifyChange(val: string): void {
    this.valueChange.emit(val);
  }
}

// ─── Item radio ───────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-menu-radio-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  template: `
    <li role="none" class="m-0 list-none p-0">
      <button
        type="button"
        role="menuitemradio"
        [attr.aria-checked]="isSelected()"
        tabindex="-1"
        [disabled]="disabled() || null"
        [class]="ITEM_BASE + ' text-banda-text'"
        (click)="onSelect()"
      >
        <span class="min-w-0 flex-1"><ng-content /></span>
        @if (isSelected()) {
          <lucide-angular [img]="Check" [size]="14" class="shrink-0" aria-hidden="true" />
        }
      </button>
    </li>
  `,
})
export class BandaMenuRadioItemComponent {
  private readonly group = inject(BandaMenuRadioGroupComponent);

  readonly value = input.required<string>();
  readonly disabled = input<boolean>(false);

  protected readonly ITEM_BASE = ITEM_BASE;
  protected readonly Check = Check;

  protected readonly isSelected = computed(() => this.group.value() === this.value());

  protected onSelect(): void {
    this.group.notifyChange(this.value());
  }
}
