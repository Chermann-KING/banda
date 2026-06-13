/**
 * Étend <form> natif — deux régimes :
 * - `onSubmitValues` : valeurs extraites de FormData (champs nommés).
 * - sans gestionnaire : validation native active.
 * Surface carte optionnelle via `card`.
 */
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

export type FormGap = 'sm' | 'md' | 'lg';

const GAP: Record<FormGap, string> = {
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
};

@Component({
  selector: 'banda-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [class]="formClass()" (submit)="onSubmit($event)">
      <ng-content />
    </form>
  `,
})
export class BandaFormComponent {
  readonly card = input<boolean>(false);
  readonly gap = input<FormGap>('md');
  readonly className = input<string>('');

  /** Émis avec les valeurs extraites de FormData. La validation native reste active. */
  readonly submitValues = output<Record<string, string>>();

  protected readonly formClass = computed(() =>
    [
      'flex flex-col',
      GAP[this.gap()],
      this.card() ? 'rounded-lg border border-banda-border bg-banda-surface p-6' : '',
      this.className(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected onSubmit(event: Event): void {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const seen = new Set<string>();
    const values: Record<string, string> = {};
    data.forEach((value, key) => {
      if (seen.has(key)) {
        values[key] = `${values[key]}, ${String(value)}`;
      } else {
        values[key] = String(value);
        seen.add(key);
      }
    });
    this.submitValues.emit(values);
  }
}
