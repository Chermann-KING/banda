import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { {{FeatureName}}Service } from '../services/{{FEATURE_NAME}}.service';

@Component({
  selector: 'app-{{FEATURE_NAME}}-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @if (service.isLoading()) {
      <p>Chargement…</p>
    } @else if (service.error()) {
      <p role="alert">{{ service.error() }}</p>
    } @else {
      <section>
        <!-- TODO : implémenter la vue ici -->
      </section>
    }
  `,
})
export class {{FeatureName}}ViewComponent {
  protected readonly service = inject({{FeatureName}}Service);
}
