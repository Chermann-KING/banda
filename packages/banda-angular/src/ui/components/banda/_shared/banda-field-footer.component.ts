/**
 * Pied de champ partagé (hint / erreur) — module PRIVÉ, non exporté du barrel.
 * Spec v2 : hint = Info, erreur = AlertCircle, icônes lucide-angular uniquement.
 */
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LucideAngularModule, AlertCircle, Info } from 'lucide-angular';

@Component({
  selector: 'banda-field-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  template: `
    @if (hint() || error()) {
      <p
        [id]="helpId()"
        aria-live="polite"
        [class]="
          'mt-1 flex items-center gap-1 font-sans text-xs ' +
          (error() ? 'font-medium text-banda-danger' : 'text-banda-text-muted')
        "
      >
        @if (error()) {
          <lucide-angular [img]="AlertCircle" [size]="12" class="shrink-0" aria-hidden="true" />
        } @else {
          <lucide-angular [img]="Info" [size]="12" class="shrink-0" aria-hidden="true" />
        }
        {{ error() ?? hint() }}
      </p>
    }
  `,
})
export class BandaFieldFooterComponent {
  readonly helpId = input.required<string>();
  readonly hint = input<string | undefined>(undefined);
  readonly error = input<string | undefined>(undefined);

  protected readonly AlertCircle = AlertCircle;
  protected readonly Info = Info;
}
