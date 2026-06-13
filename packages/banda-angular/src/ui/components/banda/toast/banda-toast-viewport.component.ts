import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  LucideAngularModule,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'lucide-angular';
import type { NotificationVariant } from '@banda/core';
import { ToastService } from './toast.service';

const TOAST_ICONS = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  danger: AlertCircle,
} as const;

const ICON_COLOR: Record<NotificationVariant, string> = {
  info: 'text-banda-info',
  success: 'text-banda-success',
  warning: 'text-banda-warning',
  danger: 'text-banda-danger',
};

const BORDER_COLOR: Record<NotificationVariant, string> = {
  info: 'border-l-banda-info',
  success: 'border-l-banda-success',
  warning: 'border-l-banda-warning',
  danger: 'border-l-banda-danger',
};

@Component({
  selector: 'banda-toast-viewport',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  template: `
    <aside
      aria-label="Notifications"
      class="fixed bottom-4 right-4 z-toast flex max-w-sm flex-col gap-2"
    >
      @for (toast of toasts(); track toast.id) {
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          [class]="toastClass(toast.variant)"
        >
          <lucide-angular
            [img]="icons[toast.variant]"
            [size]="16"
            [class]="'mt-0.5 shrink-0 ' + iconColor[toast.variant]"
            aria-hidden="true"
          />
          <span class="flex-1 leading-snug">{{ toast.message }}</span>
          <button
            type="button"
            (click)="service.dismiss(toast.id)"
            aria-label="Fermer la notification"
            class="rounded-sm p-0.5 text-banda-text-muted transition-colors duration-fast hover:text-banda-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring"
          >
            <lucide-angular [img]="X" [size]="14" aria-hidden="true" />
          </button>
        </div>
      }
    </aside>
  `,
})
export class BandaToastViewportComponent {
  protected readonly service = inject(ToastService);
  protected readonly toasts = this.service.toasts;
  protected readonly icons = TOAST_ICONS;
  protected readonly iconColor = ICON_COLOR;
  protected readonly X = X;

  protected toastClass(variant: NotificationVariant): string {
    return [
      'flex items-start justify-between gap-3 rounded-md border border-banda-border border-l-4 p-3',
      'animate-banda-slide-up bg-banda-surface font-sans text-sm text-banda-text shadow-lg',
      BORDER_COLOR[variant],
    ].join(' ');
  }
}
