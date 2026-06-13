import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from '@banda/angular';
import { BandaToastViewportComponent } from '@banda/angular';

@Component({
  selector: 'banda-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, BandaToastViewportComponent],
  template: `<router-outlet /><banda-toast-viewport />`,
})
export class AppComponent {
  // Instancié ici pour démarrer le suivi du thème dès le bootstrap.
  readonly theme = inject(ThemeService);
}
