import { createContext, useContext, useId, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export interface TabItem {
  value: string;
  label: ReactNode;
  icon?: LucideIcon;
  /** Pastille (compteur…) à droite du label. */
  badge?: ReactNode;
  disabled?: boolean;
}

export type TabsVariant = 'segmented' | 'solid' | 'underline' | 'plain';
export type TabsOrientation = 'horizontal' | 'vertical';

export interface BandaTabsProps {
  tabs: readonly TabItem[];
  /** Mode contrôlé. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  variant?: TabsVariant;
  orientation?: TabsOrientation;
  /** Icône à gauche du label ou empilée au-dessus. @default 'start' */
  iconPosition?: 'start' | 'top';
  /** Libellé accessible de la barre d'onglets. */
  label: string;
  tablistClassName?: string;
  className?: string;
  /** Panneaux : <BandaTabs.Panel value="…">. */
  children?: ReactNode;
}

interface TabsContextValue {
  current: string;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

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

/**
 * Étend role="tablist" natif (APG « Tabs ») : roving tabindex, flèches
 * directionnelles + Home/End, panneaux liés par aria-controls/labelledby.
 */
export function BandaTabs({
  tabs,
  value,
  defaultValue,
  onChange,
  variant = 'segmented',
  orientation = 'horizontal',
  iconPosition = 'start',
  label,
  tablistClassName,
  className,
  children,
}: BandaTabsProps) {
  const baseId = useId();
  const firstEnabled = tabs.find((tab) => !tab.disabled)?.value ?? tabs[0]?.value ?? '';
  const [internalValue, setInternalValue] = useState(defaultValue ?? firstEnabled);
  const current = value ?? internalValue;
  const styles = TABLIST[variant];
  const vertical = orientation === 'vertical';

  const select = (next: string) => {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  const tabId = (tabValue: string) => `${baseId}-tab-${tabValue}`;
  const panelId = (tabValue: string) => `${baseId}-panel-${tabValue}`;

  /** Sélection au clavier : flèches (selon l'orientation), Home, End. */
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const enabled = tabs.filter((tab) => !tab.disabled);
    if (enabled.length === 0) return;
    const index = enabled.findIndex((tab) => tab.value === current);
    const previousKey = vertical ? 'ArrowUp' : 'ArrowLeft';
    const nextKey = vertical ? 'ArrowDown' : 'ArrowRight';

    let next: string | undefined;
    if (event.key === nextKey) next = enabled[(index + 1) % enabled.length]?.value;
    else if (event.key === previousKey) next = enabled[(index - 1 + enabled.length) % enabled.length]?.value;
    else if (event.key === 'Home') next = enabled[0]?.value;
    else if (event.key === 'End') next = enabled[enabled.length - 1]?.value;
    if (next === undefined) return;

    event.preventDefault();
    select(next);
    document.getElementById(tabId(next))?.focus();
  };

  return (
    <TabsContext value={{ current, baseId }}>
      <div className={[vertical ? 'flex items-start gap-6' : 'flex flex-col gap-4', className].filter(Boolean).join(' ')}>
        <div
          role="tablist"
          aria-label={label}
          aria-orientation={orientation}
          onKeyDown={onKeyDown}
          className={[
            'inline-flex font-sans text-sm font-medium',
            vertical ? 'flex-col items-stretch' : 'items-center',
            styles.list,
            tablistClassName,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {tabs.map((tab) => {
            const selected = tab.value === current;
            const Icon = tab.icon;
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                id={tabId(tab.value)}
                aria-selected={selected}
                aria-controls={panelId(tab.value)}
                tabIndex={selected ? 0 : -1}
                disabled={tab.disabled}
                onClick={() => select(tab.value)}
                className={[
                  'flex items-center gap-2 transition-colors duration-fast',
                  iconPosition === 'top' ? 'flex-col gap-1' : '',
                  vertical ? 'justify-start text-left' : 'justify-center',
                  styles.tab,
                  selected ? styles.active : styles.inactive,
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring',
                  'disabled:pointer-events-none disabled:opacity-50',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {Icon ? <Icon size={14} className="shrink-0" aria-hidden="true" /> : null}
                {tab.label}
                {tab.badge !== undefined ? (
                  <span
                    className={[
                      'flex h-4 min-w-4 items-center justify-center rounded-full px-1 font-sans text-xs font-semibold',
                      selected && variant === 'solid'
                        ? 'bg-banda-primary-contrast text-banda-primary'
                        : 'bg-banda-text text-banda-surface',
                    ].join(' ')}
                  >
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
        {children}
      </div>
    </TabsContext>
  );
}

export interface TabPanelProps {
  value: string;
  className?: string;
  children: ReactNode;
}

function TabPanel({ value, className, children }: TabPanelProps) {
  const context = useContext(TabsContext);
  if (context === null) {
    throw new Error('<BandaTabs.Panel> doit être rendu sous <BandaTabs>.');
  }
  const selected = context.current === value;
  return (
    <div
      role="tabpanel"
      id={`${context.baseId}-panel-${value}`}
      aria-labelledby={`${context.baseId}-tab-${value}`}
      hidden={!selected}
      tabIndex={0}
      className={['min-w-0 flex-1 focus-visible:outline-none', className].filter(Boolean).join(' ')}
    >
      {selected ? children : null}
    </div>
  );
}

/* Pattern composé : BandaTabs.Panel */
BandaTabs.Panel = TabPanel;
