/**
 * Modèles d'items riches : en-tête de profil, item détaillé (icône encadrée
 * + description), item à interrupteur. Rendus en <li role="none"> — seuls
 * les éléments interactifs portent un rôle de menu.
 */
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { BandaSwitch } from '../../switch';

/** En-tête de profil : initiales, nom, email (non interactif). */
export interface MenuProfileHeaderProps {
  name: string;
  email: string;
}

export function MenuProfileHeader({ name, email }: MenuProfileHeaderProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('');
  return (
    <li role="none" className="m-0 list-none p-0">
      <span className="flex items-center gap-2 px-2 py-2">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-banda-primary-muted font-sans text-xs font-semibold text-banda-primary"
          aria-hidden="true"
        >
          {initials}
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="truncate font-sans text-sm font-medium text-banda-text">{name}</span>
          <span className="truncate font-sans text-xs text-banda-text-muted">{email}</span>
        </span>
      </span>
    </li>
  );
}

/** Item détaillé : icône encadrée, titre, description (palettes d'édition…). */
export interface DetailedMenuItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  disabled?: boolean;
  onSelect?: () => void;
}

export function DetailedMenuItem({ icon: Icon, title, description, disabled, onSelect }: DetailedMenuItemProps) {
  return (
    <li role="none" className="m-0 list-none p-0">
      <button
        type="button"
        role="menuitem"
        tabIndex={-1}
        disabled={disabled}
        onClick={onSelect}
        className={[
          'flex w-full items-center gap-3 rounded-sm px-2 py-1.5 text-left font-sans',
          'transition-colors duration-fast focus:outline-none',
          'hover:bg-banda-surface-muted focus:bg-banda-surface-muted',
          'disabled:pointer-events-none disabled:opacity-50',
        ].join(' ')}
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-banda-border text-banda-text"
          aria-hidden="true"
        >
          <Icon size={14} />
        </span>
        <span className="flex min-w-0 flex-col">
          <span className="text-sm font-medium text-banda-text">{title}</span>
          <span className="text-xs text-banda-text-muted">{description}</span>
        </span>
      </button>
    </li>
  );
}

/** Item à interrupteur : le menu reste ouvert (réglages de notifications…). */
export interface SwitchMenuItemProps {
  label: ReactNode;
  /** Libellé accessible de l'interrupteur. */
  switchLabel: string;
  icon?: LucideIcon;
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function SwitchMenuItem({
  label,
  switchLabel,
  icon: Icon,
  defaultChecked,
  checked,
  onChange,
}: SwitchMenuItemProps) {
  return (
    <li role="none" className="m-0 flex list-none items-center justify-between gap-4 px-2 py-1.5">
      <span className="flex items-center gap-2 font-sans text-sm text-banda-text">
        {Icon ? <Icon size={14} className="shrink-0 text-banda-text-muted" aria-hidden="true" /> : null}
        {label}
      </span>
      <BandaSwitch
        label={switchLabel}
        hideLabel
        size="sm"
        defaultChecked={defaultChecked}
        checked={checked}
        onChange={onChange ? (event) => onChange(event.target.checked) : undefined}
      />
    </li>
  );
}
