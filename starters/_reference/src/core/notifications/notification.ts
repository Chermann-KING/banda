export type NotificationVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AppNotification {
  readonly id: string;
  readonly message: string;
  readonly variant: NotificationVariant;
  /** Durée d'affichage en ms ; null = persistante (fermeture manuelle). */
  readonly durationMs: number | null;
}

export interface NotificationInput {
  message: string;
  variant?: NotificationVariant;
  durationMs?: number | null;
}

const DEFAULT_DURATION_MS = 5000;

let counter = 0;

export function createNotification(input: NotificationInput): AppNotification {
  counter += 1;
  return {
    id: `notification-${counter}`,
    message: input.message,
    variant: input.variant ?? 'info',
    durationMs: input.durationMs === undefined ? DEFAULT_DURATION_MS : input.durationMs,
  };
}
