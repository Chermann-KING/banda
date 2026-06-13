import { Injectable, signal } from '@angular/core';
import {
  createNotification,
  type AppNotification,
  type NotificationInput,
} from '@banda/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toasts = signal<readonly AppNotification[]>([]);
  private readonly timers = new Map<string, ReturnType<typeof setTimeout>>();

  show(input: NotificationInput): void {
    const notification = createNotification(input);
    this.toasts.update((current) => [...current, notification]);
    if (notification.durationMs !== null) {
      this.timers.set(
        notification.id,
        setTimeout(() => this.dismiss(notification.id), notification.durationMs),
      );
    }
  }

  dismiss(id: string): void {
    this.toasts.update((current) => current.filter((t) => t.id !== id));
    const timer = this.timers.get(id);
    if (timer !== undefined) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
  }
}
