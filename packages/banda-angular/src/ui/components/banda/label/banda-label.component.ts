/** Étend <label> natif. */
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'banda-label',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label [attr.for]="for()" [class]="labelClass()">
      <ng-content />
      @if (required()) {
        <span class="text-banda-danger" aria-hidden="true"> *</span>
      }
    </label>
  `,
})
export class BandaLabelComponent {
  readonly for = input<string | undefined>(undefined);
  readonly required = input<boolean>(false);
  /** Masque visuellement le label tout en le gardant accessible (sr-only). */
  readonly hidden = input<boolean>(false);

  protected readonly labelClass = computed(() =>
    this.hidden()
      ? 'sr-only'
      : 'mb-1 block font-sans text-sm font-medium text-banda-text',
  );
}
