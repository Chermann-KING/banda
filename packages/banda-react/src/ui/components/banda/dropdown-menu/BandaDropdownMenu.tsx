import { createContext, useContext, useEffect, useId } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Check, type LucideIcon } from 'lucide-react';
import { useAnchoredDropdown } from '../../../hooks/useAnchoredDropdown';

/* ── Contexte interne : fermeture au choix d'un item ─────────────────── */

interface MenuContextValue {
  close: () => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

function useMenuContext(): MenuContextValue {
  const context = useContext(MenuContext);
  if (context === null) {
    throw new Error('Les items de menu doivent être rendus sous <BandaDropdownMenu>.');
  }
  return context;
}

/* ── Base : déclencheur + <menu role="menu"> portalé ─────────────────── */

export interface BandaDropdownMenuProps {
  /** Contenu du déclencheur (texte, avatar, icône…). */
  trigger: ReactNode;
  /** Libellé accessible du menu. */
  label: string;
  /** Bord d'alignement du panneau. @default 'start' */
  align?: 'start' | 'end';
  /** Animation d'ouverture (keyframes du preset). */
  animation?: 'slide' | 'zoom';
  /** Classes du déclencheur — remplace le style par défaut si fourni. */
  triggerClassName?: string;
  menuClassName?: string;
  children: ReactNode;
}

const DEFAULT_TRIGGER =
  'inline-flex items-center gap-2 rounded-md bg-banda-surface-muted px-3 py-2 ' +
  'font-sans text-sm font-medium text-banda-text transition-colors duration-fast ' +
  'hover:bg-banda-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring';

const MENU_ITEM_SELECTOR = '[role^="menuitem"]:not([disabled])';

export function BandaDropdownMenu({
  trigger,
  label,
  align = 'start',
  animation,
  triggerClassName,
  menuClassName,
  children,
}: BandaDropdownMenuProps) {
  const { open, setOpen, triggerRef, listRef, style } = useAnchoredDropdown<HTMLMenuElement>({ align });
  const menuId = useId();

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  /** Focus roving : flèches haut/bas entre les items, boucle aux extrémités. */
  const moveFocus = (direction: 1 | -1) => {
    const items = Array.from(
      listRef.current?.querySelectorAll<HTMLElement>(MENU_ITEM_SELECTOR) ?? [],
    );
    if (items.length === 0) return;
    const activeIndex = items.findIndex((item) => item === document.activeElement);
    const nextIndex = (activeIndex + direction + items.length) % items.length;
    items[nextIndex]?.focus();
  };

  const onMenuKeyDown = (event: KeyboardEvent<HTMLMenuElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        moveFocus(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        moveFocus(-1);
        break;
      case 'Escape':
      case 'Tab':
        event.preventDefault();
        close();
        break;
      default:
        break;
    }
  };

  /* Focus initial sur le premier item à l'ouverture. */
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>(MENU_ITEM_SELECTOR)?.focus();
  }, [open, listRef]);

  return (
    <MenuContext value={{ close }}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen(!open)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' && !open) {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className={triggerClassName ?? DEFAULT_TRIGGER}
      >
        {trigger}
      </button>
      {open
        ? createPortal(
            <menu
              ref={listRef}
              id={menuId}
              role="menu"
              aria-label={label}
              style={style}
              onKeyDown={onMenuKeyDown}
              className={[
                'z-dropdown m-0 min-w-48 list-none rounded-md border border-banda-border bg-banda-surface p-1 shadow-lg',
                animation === 'slide' ? 'animate-banda-slide-up' : '',
                animation === 'zoom' ? 'animate-banda-zoom-in' : '',
                menuClassName,
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {children}
            </menu>,
            document.body,
          )
        : null}
    </MenuContext>
  );
}

/* ── Items ───────────────────────────────────────────────────────────── */

const ITEM_BASE =
  'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left font-sans text-sm ' +
  'transition-colors duration-fast ' +
  'hover:bg-banda-surface-muted focus-visible:outline-none focus-visible:bg-banda-surface-muted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-banda-focus-ring ' +
  'disabled:pointer-events-none disabled:opacity-50';

export interface DropdownMenuItemProps {
  icon?: LucideIcon;
  /** Raccourci clavier affiché à droite. */
  shortcut?: string;
  description?: string;
  disabled?: boolean;
  /** Action destructive (Se déconnecter…). */
  danger?: boolean;
  /** Ferme le menu après l'action. @default true */
  closeOnSelect?: boolean;
  onSelect?: () => void;
  children: ReactNode;
}

function MenuItem({
  icon: Icon,
  shortcut,
  description,
  disabled,
  danger = false,
  closeOnSelect = true,
  onSelect,
  children,
}: DropdownMenuItemProps) {
  const { close } = useMenuContext();
  return (
    <li role="none" className="m-0 list-none p-0">
      <button
        type="button"
        role="menuitem"
        tabIndex={-1}
        disabled={disabled}
        onClick={() => {
          onSelect?.();
          if (closeOnSelect) close();
        }}
        className={[ITEM_BASE, danger ? 'text-banda-danger' : 'text-banda-text'].join(' ')}
      >
        {Icon ? (
          <Icon size={14} className={danger ? 'shrink-0' : 'shrink-0 text-banda-text-muted'} aria-hidden="true" />
        ) : null}
        {description ? (
          <span className="flex min-w-0 flex-col items-start gap-0.5">
            <span className="font-medium">{children}</span>
            <span className="text-xs text-banda-text-muted">{description}</span>
          </span>
        ) : (
          <span className="min-w-0 flex-1">{children}</span>
        )}
        {shortcut ? (
          <kbd className="ml-auto shrink-0 font-sans text-xs tracking-wide text-banda-text-muted">
            {shortcut}
          </kbd>
        ) : null}
      </button>
    </li>
  );
}

export interface DropdownMenuLabelProps {
  children: ReactNode;
}

function MenuLabel({ children }: DropdownMenuLabelProps) {
  return (
    <li role="none" className="m-0 list-none p-0">
      <span className="block px-2 py-1.5 font-sans text-xs font-medium text-banda-text-muted">
        {children}
      </span>
    </li>
  );
}

function MenuSeparator() {
  return (
    <li role="separator" aria-orientation="horizontal" className="m-0 list-none p-0">
      <hr className="my-1 border-banda-border" />
    </li>
  );
}

/* ── Items à état : checkbox & radio ─────────────────────────────────── */

export interface DropdownMenuCheckboxItemProps {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  children: ReactNode;
}

/** Item à coche — ne ferme pas le menu (réglages multiples). */
function MenuCheckboxItem({ checked, onCheckedChange, disabled, children }: DropdownMenuCheckboxItemProps) {
  return (
    <li role="none" className="m-0 list-none p-0">
      <button
        type="button"
        role="menuitemcheckbox"
        aria-checked={checked}
        tabIndex={-1}
        disabled={disabled}
        onClick={() => onCheckedChange?.(!checked)}
        className={`${ITEM_BASE} text-banda-text`}
      >
        <span className="min-w-0 flex-1">{children}</span>
        {checked ? <Check size={14} className="shrink-0" aria-hidden="true" /> : null}
      </button>
    </li>
  );
}

interface RadioGroupContextValue {
  value: string;
  onValueChange?: ((value: string) => void) | undefined;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface DropdownMenuRadioGroupProps {
  value: string;
  onValueChange?: (value: string) => void;
  /** Libellé du groupe, affiché en en-tête. */
  label?: string;
  children: ReactNode;
}

function MenuRadioGroup({ value, onValueChange, label, children }: DropdownMenuRadioGroupProps) {
  return (
    <RadioGroupContext value={{ value, onValueChange }}>
      {label ? <MenuLabel>{label}</MenuLabel> : null}
      {children}
    </RadioGroupContext>
  );
}

export interface DropdownMenuRadioItemProps {
  value: string;
  disabled?: boolean;
  children: ReactNode;
}

/** Item radio — choix exclusif, ne ferme pas le menu. */
function MenuRadioItem({ value, disabled, children }: DropdownMenuRadioItemProps) {
  const group = useContext(RadioGroupContext);
  if (group === null) {
    throw new Error('<BandaDropdownMenu.RadioItem> doit être rendu sous <BandaDropdownMenu.RadioGroup>.');
  }
  const selected = group.value === value;
  return (
    <li role="none" className="m-0 list-none p-0">
      <button
        type="button"
        role="menuitemradio"
        aria-checked={selected}
        tabIndex={-1}
        disabled={disabled}
        onClick={() => group.onValueChange?.(value)}
        className={`${ITEM_BASE} text-banda-text`}
      >
        <span className="min-w-0 flex-1">{children}</span>
        {selected ? <Check size={14} className="shrink-0" aria-hidden="true" /> : null}
      </button>
    </li>
  );
}

/* Pattern composé : BandaDropdownMenu.Item / .Label / .Separator / .CheckboxItem / .RadioGroup / .RadioItem */
BandaDropdownMenu.Item = MenuItem;
BandaDropdownMenu.Label = MenuLabel;
BandaDropdownMenu.Separator = MenuSeparator;
BandaDropdownMenu.CheckboxItem = MenuCheckboxItem;
BandaDropdownMenu.RadioGroup = MenuRadioGroup;
BandaDropdownMenu.RadioItem = MenuRadioItem;
