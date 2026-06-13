import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, RefObject } from 'react';

export interface AnchoredDropdownOptions {
  /** Bord du déclencheur sur lequel aligner le panneau. @default 'start' */
  align?: 'start' | 'end';
}

export interface AnchoredDropdown<List extends HTMLElement = HTMLUListElement, Trigger extends HTMLElement = HTMLButtonElement> {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: RefObject<Trigger | null>;
  listRef: RefObject<List | null>;
  /** Position fixed calculée depuis le déclencheur — à poser sur la liste portalée. */
  style: CSSProperties;
}

/**
 * Dropdown ancré à son déclencheur, rendu en portal avec position fixed :
 * échappe aux overflow:hidden parents (Card…), suit le scroll et le resize,
 * se ferme au clic extérieur. Partagé par Select, DropdownMenu et tout
 * futur dropdown.
 */
export function useAnchoredDropdown<List extends HTMLElement = HTMLUListElement, Trigger extends HTMLElement = HTMLButtonElement>(
  options: AnchoredDropdownOptions = {},
): AnchoredDropdown<List, Trigger> {
  const { align = 'start' } = options;
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<Trigger>(null);
  const listRef = useRef<List>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    setStyle(
      align === 'end'
        ? {
            position: 'fixed',
            top: rect.bottom + 4,
            right: Math.max(0, window.innerWidth - rect.right),
            minWidth: rect.width,
          }
        : {
            position: 'fixed',
            top: rect.bottom + 4,
            left: rect.left,
            minWidth: rect.width,
          },
    );
  }, [align]);

  useEffect(() => {
    if (!open) return;
    updatePosition();

    const onOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || listRef.current?.contains(target)) return;
      setOpen(false);
    };

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    document.addEventListener('mousedown', onOutsideClick);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
      document.removeEventListener('mousedown', onOutsideClick);
    };
  }, [open, updatePosition]);

  return { open, setOpen, triggerRef, listRef, style };
}
