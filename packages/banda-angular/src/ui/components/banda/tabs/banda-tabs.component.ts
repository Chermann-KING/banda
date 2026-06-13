/**
 * Onglets accessibles (APG « Tabs ») : roving tabindex, flèches directionnelles,
 * Home/End, panneaux liés aria-controls/labelledby.
 * BandaTabsComponent (tablist) + BandaTabPanelComponent (panneaux).
 * Communication : BandaTabPanelComponent injecte le parent via inject(BandaTabsComponent).
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

export interface TabItem {
  value: string;
  label: string;
  /** Icône Lucide. */
  icon?: LucideIconData;
  badge?: string | number;
  disabled?: boolean;
}

export type TabsVariant = 'segmented' | 'solid' | 'underline' | 'plain';
export type TabsOrientation = 'horizontal' | 'vertical';

const TABLIST: Record<TabsVariant, { list: string; tab: string; active: string; inactive: string }> = {
  segmented: {
    list: 'gap-1 rounded-md bg-banda-surface-muted p-1',
    tab: 'rounded-sm px-3 py-1.5',
    active: 'bg-banda-surface text-banda-text shadow-sm',
    inactive: 'text-banda-text-muted hover:text-banda-text',
  },
  solid: {
    list: 'gap-1 rounded-md bg-banda-surface-muted p-1',
    tab: 'rounded-sm px-3 py-1.5',
    active: 'bg-banda-primary text-banda-primary-contrast shadow-sm',
    inactive: 'text-banda-text-muted hover:text-banda-text',
  },
  underline: {
    list: 'gap-4 border-b border-banda-border',
    tab: '-mb-px border-b-2 border-transparent px-1 pb-2',
    active: 'border-banda-primary text-banda-text',
    inactive: 'text-banda-text-muted hover:text-banda-text hover:border-banda-border-strong',
  },
  plain: {
    list: 'gap-2',
    tab: 'rounded-sm px-2 py-1',
    active: 'text-banda-text font-semibold',
    inactive: 'text-banda-text-muted hover:text-banda-text',
  },
};

let uid = 0;

@Component({
  selector: 'banda-tabs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  template: `
    <div [class]="wrapperClass()">
      <div
        role="tablist"
        [attr.aria-label]="label()"
        [attr.aria-orientation]="orientation()"
        (keydown)="onKeyDown($event)"
        [class]="tablistClass()"
      >
        @for (tab of tabs(); track tab.value) {
          <button
            type="button"
            role="tab"
            [id]="tabId(tab.value)"
            [attr.aria-selected]="tab.value === currentValue()"
            [attr.aria-controls]="panelId(tab.value)"
            [tabIndex]="tab.value === currentValue() ? 0 : -1"
            [disabled]="tab.disabled ?? false"
            (click)="select(tab.value)"
            [class]="tabClass(tab)"
          >
            @if (tab.icon) {
              <lucide-angular [img]="tab.icon" [size]="14" class="shrink-0" aria-hidden="true" />
            }
            {{ tab.label }}
            @if (tab.badge !== undefined) {
              <span [class]="badgeClass(tab)">{{ tab.badge }}</span>
            }
          </button>
        }
      </div>
      <ng-content />
    </div>
  `,
})
export class BandaTabsComponent {
  readonly tabs = input.required<readonly TabItem[]>();
  readonly value = input<string | undefined>(undefined);
  readonly defaultValue = input<string | undefined>(undefined);
  readonly tabChange = output<string>();
  readonly variant = input<TabsVariant>('segmented');
  readonly orientation = input<TabsOrientation>('horizontal');
  readonly iconPosition = input<'start' | 'top'>('start');
  readonly label = input.required<string>();
  readonly tablistClassName = input<string>('');
  readonly className = input<string>('');

  protected readonly internalValue = signal('');

  readonly currentValue = computed(
    () => this.value() ?? this.internalValue(),
  );

  readonly baseId = `banda-tabs-${++uid}`;

  tabId(tabValue: string): string {
    return `${this.baseId}-tab-${tabValue}`;
  }

  panelId(tabValue: string): string {
    return `${this.baseId}-panel-${tabValue}`;
  }

  select(value: string): void {
    if (this.value() === undefined) this.internalValue.set(value);
    this.tabChange.emit(value);
  }

  protected readonly wrapperClass = computed(() => {
    const vertical = this.orientation() === 'vertical';
    return [vertical ? 'flex items-start gap-6' : 'flex flex-col gap-4', this.className()]
      .filter(Boolean)
      .join(' ');
  });

  protected readonly tablistClass = computed(() => {
    const styles = TABLIST[this.variant()];
    const vertical = this.orientation() === 'vertical';
    return [
      'inline-flex font-sans text-sm font-medium',
      vertical ? 'flex-col items-stretch' : 'items-center',
      styles.list,
      this.tablistClassName(),
    ]
      .filter(Boolean)
      .join(' ');
  });

  protected tabClass(tab: TabItem): string {
    const styles = TABLIST[this.variant()];
    const selected = tab.value === this.currentValue();
    const vertical = this.orientation() === 'vertical';
    return [
      'flex items-center gap-2 transition-colors duration-fast',
      this.iconPosition() === 'top' ? 'flex-col gap-1' : '',
      vertical ? 'justify-start text-left' : 'justify-center',
      styles.tab,
      selected ? styles.active : styles.inactive,
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring',
      'disabled:pointer-events-none disabled:opacity-50',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected badgeClass(tab: TabItem): string {
    const selected = tab.value === this.currentValue();
    const isSolid = this.variant() === 'solid';
    return [
      'flex h-4 min-w-4 items-center justify-center rounded-full px-1 font-sans text-xs font-semibold',
      selected && isSolid
        ? 'bg-banda-primary-contrast text-banda-primary'
        : 'bg-banda-text text-banda-surface',
    ].join(' ');
  }

  protected onKeyDown(event: KeyboardEvent): void {
    const enabled = this.tabs().filter((t) => !t.disabled);
    if (enabled.length === 0) return;
    const index = enabled.findIndex((t) => t.value === this.currentValue());
    const vertical = this.orientation() === 'vertical';
    const prevKey = vertical ? 'ArrowUp' : 'ArrowLeft';
    const nextKey = vertical ? 'ArrowDown' : 'ArrowRight';

    let next: string | undefined;
    if (event.key === nextKey) next = enabled[(index + 1) % enabled.length]?.value;
    else if (event.key === prevKey) next = enabled[(index - 1 + enabled.length) % enabled.length]?.value;
    else if (event.key === 'Home') next = enabled[0]?.value;
    else if (event.key === 'End') next = enabled[enabled.length - 1]?.value;
    if (next === undefined) return;

    event.preventDefault();
    this.select(next);
    document.getElementById(this.tabId(next))?.focus();
  }
}

// ─── Panneau ─────────────────────────────────────────────────────────────────

import { inject } from '@angular/core';

@Component({
  selector: 'banda-tab-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isSelected()) {
      <div
        role="tabpanel"
        [id]="panelId"
        [attr.aria-labelledby]="tabId"
        tabindex="0"
        class="min-w-0 flex-1 focus-visible:outline-none"
      >
        <ng-content />
      </div>
    }
  `,
})
export class BandaTabPanelComponent {
  private readonly tabs = inject(BandaTabsComponent);

  readonly value = input.required<string>();

  protected readonly isSelected = computed(
    () => this.tabs.currentValue() === this.value(),
  );

  get panelId(): string {
    return this.tabs.panelId(this.value());
  }

  get tabId(): string {
    return this.tabs.tabId(this.value());
  }
}
