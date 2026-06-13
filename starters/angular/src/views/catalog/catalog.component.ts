import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { LucideAngularModule, ArrowLeft, Moon, Sun } from 'lucide-angular';
import { ThemeService } from '@banda/angular';
import { BandaButtonComponent } from '@banda/angular';
import { CATALOG, CATEGORIES, type CatalogCategory, type CatalogEntry } from './catalog.registry';

@Component({
  selector: 'banda-catalog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LucideAngularModule, BandaButtonComponent, NgComponentOutlet],
  template: `
    <div class="flex min-h-screen flex-col">
      <!-- Barre d'application — <header>/<nav> natifs (BandaNav arrivera en phase D). -->
      <header
        class="sticky top-0 z-sticky flex items-center gap-6 border-b border-banda-border bg-banda-surface px-6 py-3"
      >
        <span class="font-sans text-lg font-bold text-banda-primary">Banda</span>
        <nav aria-label="Navigation principale" class="flex flex-1 gap-4">
          <a
            routerLink="/"
            [attr.aria-current]="current() ? null : 'page'"
            [class]="navTopLinkClass(!current())"
          >
            Composants
          </a>
        </nav>
        <banda-button variant="ghost" size="sm" (click)="theme.toggle()">
          @if (theme.theme() === 'dark') {
            <lucide-angular [img]="Sun" [size]="16" aria-hidden="true" />
            Mode clair
          } @else {
            <lucide-angular [img]="Moon" [size]="16" aria-hidden="true" />
            Mode sombre
          }
        </banda-button>
      </header>

      <div class="flex flex-1 items-stretch">
        <!-- Latérale — <aside>/<nav> natifs. -->
        <aside class="w-64 shrink-0 border-r border-banda-border bg-banda-surface p-4">
          <nav aria-label="Navigation latérale">
            @for (category of categories; track category) {
              <div class="mb-6">
                <span
                  class="mb-2 block px-2 font-sans text-xs font-semibold uppercase tracking-wide text-banda-text-muted"
                >
                  {{ category }}
                </span>
                <ul class="m-0 flex list-none flex-col gap-1 p-0">
                  @for (entry of byCategory(category); track entry.slug) {
                    <li>
                      <a
                        [routerLink]="['/c', entry.slug]"
                        [attr.aria-current]="current()?.slug === entry.slug ? 'page' : null"
                        [class]="navSidebarLinkClass(current()?.slug === entry.slug)"
                      >
                        {{ entry.name }}
                      </a>
                    </li>
                  }
                </ul>
              </div>
            }
          </nav>
        </aside>

        <main class="max-w-5xl flex-1 p-8">
          @if (current(); as entry) {
            <!-- Page composant -->
            <div class="flex flex-col gap-6">
              <div>
                <a
                  routerLink="/"
                  class="inline-flex items-center gap-1 font-sans text-sm text-banda-text-muted no-underline hover:text-banda-text"
                >
                  <lucide-angular [img]="ArrowLeft" [size]="14" aria-hidden="true" />
                  Catalogue
                </a>
                <h1
                  class="m-0 font-sans text-4xl font-bold leading-tight tracking-tight text-banda-text"
                >
                  {{ entry.name }}
                </h1>
                <p class="m-0 font-sans leading-normal text-banda-text-muted">
                  Base : <code>{{ entry.base }}</code>
                  @if (entry.note) { — {{ entry.note }} }
                </p>
              </div>
              @if (entry.Demo) {
                <ng-container [ngComponentOutlet]="entry.Demo" />
              } @else {
                <p class="m-0 font-sans leading-normal text-banda-text-muted">
                  À venir — phase {{ entry.phase }} du catalogue.
                </p>
              }
            </div>
          } @else {
            <!-- Index du catalogue -->
            <div class="flex flex-col gap-6">
              <div class="flex flex-col gap-2">
                <h1
                  class="m-0 font-sans text-4xl font-bold leading-tight tracking-tight text-banda-text"
                >
                  Composants Banda
                </h1>
                <p class="m-0 font-sans leading-normal text-banda-text-muted">
                  {{ catalog.length }} familles de composants — {{ deliveredCount }} livrées, le reste
                  arrive par phases. Base HTML native, tokens Banda, icônes Lucide, saisies sanitizées.
                </p>
              </div>
              @for (category of categories; track category) {
                <section class="flex flex-col gap-3">
                  <h2
                    class="m-0 font-sans text-xl font-bold leading-tight tracking-tight text-banda-text"
                  >
                    {{ category }}
                  </h2>
                  <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    @for (entry of byCategory(category); track entry.slug) {
                      <a
                        [routerLink]="['/c', entry.slug]"
                        [class]="catalogCardClass(!!entry.Demo)"
                      >
                        <span class="flex items-center justify-between gap-2">
                          <span class="font-sans text-sm font-semibold text-banda-text">
                            {{ entry.name }}
                          </span>
                          <span [class]="catalogBadgeClass(!!entry.Demo)">
                            {{ entry.Demo ? 'Livré' : 'Phase ' + entry.phase }}
                          </span>
                        </span>
                        <span class="font-mono text-xs text-banda-text-muted">{{ entry.base }}</span>
                        @if (entry.note) {
                          <span class="font-sans text-xs text-banda-text-muted">{{ entry.note }}</span>
                        }
                      </a>
                    }
                  </div>
                </section>
              }
            </div>
          }
        </main>
      </div>
    </div>
  `,
})
export class CatalogComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly theme = inject(ThemeService);
  protected readonly catalog = CATALOG;
  protected readonly categories = CATEGORIES;
  protected readonly deliveredCount = CATALOG.filter((e) => e.Demo).length;

  protected readonly Moon = Moon;
  protected readonly Sun = Sun;
  protected readonly ArrowLeft = ArrowLeft;

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('slug'))),
    { initialValue: null },
  );

  readonly current = computed<CatalogEntry | undefined>(() => {
    const s = this.slug();
    return s ? CATALOG.find((e) => e.slug === s) : undefined;
  });

  protected byCategory(category: CatalogCategory): CatalogEntry[] {
    return CATALOG.filter((e) => e.category === category);
  }

  protected deliveredByCategory(category: CatalogCategory): CatalogEntry[] {
    return CATALOG.filter((e) => e.category === category && e.Demo);
  }

  protected navTopLinkClass(active: boolean): string {
    return [
      'rounded-sm px-2 py-1 font-sans text-sm font-medium no-underline',
      'hover:bg-banda-surface-muted hover:text-banda-text',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring',
      active ? 'text-banda-primary' : 'text-banda-text-muted',
    ].join(' ');
  }

  protected navSidebarLinkClass(active: boolean): string {
    return [
      'block rounded-md px-2 py-2 font-sans text-sm no-underline',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring',
      active
        ? 'bg-banda-primary-muted font-medium text-banda-primary'
        : 'text-banda-text hover:bg-banda-surface-muted',
    ].join(' ');
  }

  protected catalogCardClass(delivered: boolean): string {
    return [
      'flex flex-col gap-1 rounded-lg border border-banda-border bg-banda-surface p-4 no-underline',
      'transition-colors duration-fast cursor-pointer',
      'hover:border-banda-primary hover:shadow-md',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banda-focus-ring',
      delivered ? '' : 'opacity-60',
    ].join(' ');
  }

  protected catalogBadgeClass(delivered: boolean): string {
    return [
      'rounded-full px-2 font-sans text-xs font-semibold',
      delivered
        ? 'bg-banda-success-muted text-banda-success'
        : 'bg-banda-surface-muted text-banda-text-muted',
    ].join(' ');
  }
}
