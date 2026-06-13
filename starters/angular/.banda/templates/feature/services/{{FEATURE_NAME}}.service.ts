import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class {{FeatureName}}Service {
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  // TODO : implémenter la logique métier ici.
}
