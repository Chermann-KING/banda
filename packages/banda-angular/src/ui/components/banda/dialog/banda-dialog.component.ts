/**
 * Étend <dialog> natif : focus trap, Échap et inertie du fond fournis par la plateforme.
 * L'en-tête et le pied restent visibles ; seul le corps défile.
 */
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  input,
  output,
  viewChild,
} from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';

export type DialogSize = 'sm' | 'md' | 'lg' | 'fullscreen';

const SIZE: Record<DialogSize, string> = {
  sm: 'w-full max-w-sm',
  md: 'w-full max-w-md',
  lg: 'w-full max-w-xl',
  fullscreen: 'h-dvh max-h-none w-screen max-w-none rounded-none border-0',
};

let uid = 0;

@Component({
  selector: 'banda-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  template: `
    <dialog
      #dialogRef
      [attr.role]="alert() ? 'alertdialog' : null"
      [attr.aria-labelledby]="title() ? titleId : null"
      [attr.aria-describedby]="description() ? descriptionId : null"
      [class]="dialogClass()"
      (close)="onClose.emit()"
      (click)="onBackdropClick($event)"
    >
      @if (closeButton()) {
        <button
          type="button"
          (click)="onClose.emit()"
          aria-label="Fermer la fenêtre"
          class="absolute right-4 top-4 rounded-sm p-1 text-banda-text-muted transition-colors duration-fast hover:text-banda-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring"
        >
          <lucide-angular [img]="X" [size]="16" aria-hidden="true" />
        </button>
      }
      @if (title() || description() || headerIcon()) {
        <header [class]="headerClass()">
          @if (headerIcon()) {
            <span class="mb-2"><ng-content select="[slot=header-icon]" /></span>
          }
          @if (title()) {
            <h2
              [id]="titleId"
              [class]="'m-0 font-sans text-lg font-semibold text-banda-text ' + (headerAlign() === 'center' ? '' : 'pr-6')"
            >{{ title() }}</h2>
          }
          @if (description()) {
            <p [id]="descriptionId" class="m-0 font-sans text-sm text-banda-text-muted">{{ description() }}</p>
          }
        </header>
      }
      <div [class]="bodyClass()">
        <ng-content />
      </div>
      @if (hasFooter()) {
        <footer [class]="footerClass()">
          <ng-content select="[slot=footer]" />
        </footer>
      }
    </dialog>
  `,
})
export class BandaDialogComponent {
  private readonly dialogEl = viewChild<ElementRef<HTMLDialogElement>>('dialogRef');

  readonly open = input.required<boolean>();
  readonly onClose = output<void>();
  readonly title = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  readonly size = input<DialogSize>('md');
  readonly animation = input<'zoom' | 'slide' | undefined>(undefined);
  readonly closeButton = input<boolean>(true);
  readonly closeOnBackdrop = input<boolean>(true);
  /** role="alertdialog" — confirmation bloquante. */
  readonly alert = input<boolean>(false);
  /** Affiche le slot [slot=header-icon]. */
  readonly headerIcon = input<boolean>(false);
  readonly headerAlign = input<'start' | 'center'>('start');
  readonly dividers = input<boolean>(false);
  /** Affiche le slot [slot=footer]. */
  readonly hasFooter = input<boolean>(false);
  readonly className = input<string>('');

  protected readonly X = X;

  readonly baseId = `banda-dialog-${++uid}`;
  readonly titleId = `${this.baseId}-title`;
  readonly descriptionId = `${this.baseId}-description`;

  constructor() {
    effect(() => {
      const dialog = this.dialogEl()?.nativeElement;
      if (!dialog) return;
      if (this.open() && !dialog.open) dialog.showModal();
      if (!this.open() && dialog.open) dialog.close();
    });
  }

  protected dialogClass(): string {
    return [
      'm-auto flex-col rounded-lg border border-banda-border bg-banda-surface p-0 shadow-lg',
      'open:flex',
      'backdrop:bg-banda-overlay',
      SIZE[this.size()],
      this.animation() === 'zoom' ? 'animate-banda-zoom-in' : '',
      this.animation() === 'slide' ? 'animate-banda-slide-up' : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected headerClass(): string {
    return [
      'flex shrink-0 flex-col gap-1 px-6 pb-4 pt-6',
      this.headerAlign() === 'center' ? 'items-center text-center' : '',
      this.dividers() ? 'border-b border-banda-border' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected bodyClass(): string {
    return [
      'min-h-0 flex-1 overflow-y-auto px-6 pb-6',
      this.title() || this.description() || this.headerIcon() ? 'pt-2' : 'pt-6',
      this.headerAlign() === 'center' ? 'text-center' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected footerClass(): string {
    return [
      'flex shrink-0 flex-wrap items-center justify-end gap-2 px-6 py-4',
      this.dividers() ? 'border-t border-banda-border' : 'pt-0',
    ]
      .filter(Boolean)
      .join(' ');
  }

  protected onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdrop() && event.target === this.dialogEl()?.nativeElement) {
      this.onClose.emit();
    }
  }
}
