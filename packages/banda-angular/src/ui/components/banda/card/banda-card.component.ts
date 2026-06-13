/**
 * Conteneur de contenu autonome — pattern composé via sous-composants :
 * BandaCardHeaderComponent / TitleComponent / DescriptionComponent / BodyComponent / FooterComponent / MediaComponent.
 */
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'banda-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article [class]="'rounded-lg border border-banda-border bg-banda-surface text-banda-text shadow-sm ' + (className() ?? '')">
      <ng-content />
    </article>
  `,
})
export class BandaCardComponent {
  readonly className = input<string | undefined>(undefined);
}

@Component({
  selector: 'banda-card-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header [class]="'flex flex-col gap-1.5 p-6 ' + (className() ?? '')">
      <ng-content />
    </header>
  `,
})
export class BandaCardHeaderComponent {
  readonly className = input<string | undefined>(undefined);
}

@Component({
  selector: 'banda-card-title',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h3 [class]="'m-0 font-sans text-lg font-semibold text-banda-text ' + (className() ?? '')">
      <ng-content />
    </h3>
  `,
})
export class BandaCardTitleComponent {
  readonly className = input<string | undefined>(undefined);
}

@Component({
  selector: 'banda-card-description',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p [class]="'m-0 font-sans text-sm text-banda-text-muted ' + (className() ?? '')">
      <ng-content />
    </p>
  `,
})
export class BandaCardDescriptionComponent {
  readonly className = input<string | undefined>(undefined);
}

@Component({
  selector: 'banda-card-body',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="'px-6 pb-6 ' + (className() ?? '')">
      <ng-content />
    </div>
  `,
})
export class BandaCardBodyComponent {
  readonly className = input<string | undefined>(undefined);
}

@Component({
  selector: 'banda-card-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer [class]="'flex items-center gap-2 px-6 pb-6 ' + (className() ?? '')">
      <ng-content />
    </footer>
  `,
})
export class BandaCardFooterComponent {
  readonly className = input<string | undefined>(undefined);
}

/** Zone média pleine largeur (image, dégradé…) — arrondie en tête de carte. */
@Component({
  selector: 'banda-card-media',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="'w-full overflow-hidden first:rounded-t-lg ' + (className() ?? '')">
      <ng-content />
    </div>
  `,
})
export class BandaCardMediaComponent {
  readonly className = input<string | undefined>(undefined);
}
