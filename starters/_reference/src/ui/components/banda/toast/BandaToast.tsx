/**
 * Atome toast — base <aside role="status"> (catalogue Banda), 100 % Tailwind
 * tokens, icônes Lucide par variant. Provider + viewport en portal.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import {
  createNotification,
  type AppNotification,
  type NotificationInput,
} from '@/core/notifications/notification';
import { BandaToastContext } from './toast-context';

/** Icônes Lucide par variant — convention Banda. */
const TOAST_ICONS = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  danger: AlertCircle,
} as const;

const ICON_COLOR = {
  info: 'text-banda-info',
  success: 'text-banda-success',
  warning: 'text-banda-warning',
  danger: 'text-banda-danger',
} as const;

const BORDER_COLOR = {
  info: 'border-l-banda-info',
  success: 'border-l-banda-success',
  warning: 'border-l-banda-warning',
  danger: 'border-l-banda-danger',
} as const;

export function BandaToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<readonly AppNotification[]>([]);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const show = useCallback(
    (input: NotificationInput) => {
      const notification = createNotification(input);
      setToasts((current) => [...current, notification]);
      if (notification.durationMs !== null) {
        timers.current.set(
          notification.id,
          setTimeout(() => dismiss(notification.id), notification.durationMs),
        );
      }
    },
    [dismiss],
  );

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((timer) => clearTimeout(timer));
  }, []);

  const value = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  return (
    <BandaToastContext value={value}>
      {children}
      {createPortal(
        <aside
          aria-label="Notifications"
          className="fixed bottom-4 right-4 z-toast flex max-w-sm flex-col gap-2"
        >
          {toasts.map((toast) => {
            const Icon = TOAST_ICONS[toast.variant];
            return (
              <div
                key={toast.id}
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className={[
                  'flex items-start justify-between gap-3 rounded-md border border-banda-border border-l-4 p-3',
                  'animate-banda-slide-up bg-banda-surface font-sans text-sm text-banda-text shadow-lg',
                  BORDER_COLOR[toast.variant],
                ].join(' ')}
              >
                <Icon
                  size={16}
                  className={`mt-0.5 shrink-0 ${ICON_COLOR[toast.variant]}`}
                  aria-hidden="true"
                />
                <span className="flex-1 leading-snug">{toast.message}</span>
                <button
                  type="button"
                  onClick={() => dismiss(toast.id)}
                  aria-label="Fermer la notification"
                  className="rounded-sm p-0.5 text-banda-text-muted transition-colors duration-fast hover:text-banda-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring"
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </div>
            );
          })}
        </aside>,
        document.body,
      )}
    </BandaToastContext>
  );
}

