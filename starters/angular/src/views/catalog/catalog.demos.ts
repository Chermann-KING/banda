/**
 * Démos Angular — équivalent de demos.tsx dans _reference.
 * Même structure : Example + ModelCell helpers, puis une export par composant livré.
 * Chaque démo reflète exactement le contenu de son homologue React dans _reference.
 */

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  LucideAngularModule,
  ArrowLeft, ArrowRight, Bell, Bookmark, CircleCheck,
  Download, Eye, FileText, Heart, LogOut, Mail, Menu, Plus,
  Settings, Star, Trash2, User,
} from 'lucide-angular';

import { BandaButtonComponent } from '@banda/angular';
import {
  CounterButtonComponent,
  DashedButtonComponent,
  IconButtonComponent,
  NotificationButtonComponent,
  PillButtonComponent,
  SocialButtonComponent,
} from '@banda/angular';
import {
  BounceButtonComponent,
  GlassButtonComponent,
  GrowButtonComponent,
  HeartbeatButtonComponent,
  MagneticButtonComponent,
  PulseButtonComponent,
  RingHoverButtonComponent,
  RippleButtonComponent,
  ShimmerButtonComponent,
  ShineButtonComponent,
  SwipeButtonComponent,
  TapButtonComponent,
} from '@banda/angular';
import {
  BandaBadgeComponent,
  BandaCardBodyComponent,
  BandaCardComponent,
  BandaCardDescriptionComponent,
  BandaCardFooterComponent,
  BandaCardHeaderComponent,
  BandaCardTitleComponent,
  BandaCheckboxComponent,
  BandaDialogComponent,
  BandaDropdownMenuComponent,
  BandaMenuCheckboxItemComponent,
  BandaMenuItemComponent,
  BandaMenuLabelComponent,
  BandaMenuRadioGroupComponent,
  BandaMenuRadioItemComponent,
  BandaMenuSeparatorComponent,
  BandaFormComponent,
  BandaInputComponent,
  BandaRadioComponent,
  BandaSelectComponent,
  BandaStepperComponent,
  BandaSwitchComponent,
  BandaTableBodyComponent,
  BandaTableCaptionComponent,
  BandaTableCellComponent,
  BandaTableComponent,
  BandaTableFootComponent,
  BandaTableHeadComponent,
  BandaTableHeaderComponent,
  BandaTableRowComponent,
  BandaTabPanelComponent,
  BandaTabsComponent,
  BandaTextareaComponent,
  ToastService,
} from '@banda/angular';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Bloc d'exemple nommé — chaque page composant empile ces blocs (façon shadcn). */
@Component({
  selector: 'banda-demo-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-3">
      <h3 class="m-0 font-sans text-lg font-bold leading-tight tracking-tight text-banda-text">
        <ng-content select="[slot=title]" />
      </h3>
      <div class="rounded-lg border border-banda-border bg-banda-surface p-6">
        <ng-content />
      </div>
    </div>
  `,
})
export class DemoExampleComponent {}

/** Cellule de grille façon shadcn/studio : le modèle + son nom dessous. */
@Component({
  selector: 'banda-demo-model-cell',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex min-h-24 flex-col items-center justify-center gap-3 rounded-md border border-banda-border p-6">
      <ng-content />
      <span class="font-sans text-xs text-banda-text-muted"><ng-content select="[slot=label]" /></span>
    </div>
  `,
})
export class DemoModelCellComponent {}

// ─── Données de démo partagées ────────────────────────────────────────────────

const LANGUAGES = [
  { value: 'yipunu', label: 'Yipunu' },
  { value: 'fang', label: 'Fang' },
  { value: 'fr', label: 'Français' },
];

const GROUPED_LANGUAGES = [
  { value: 'yipunu', label: 'Yipunu', group: 'Langues bantoues' },
  { value: 'fang', label: 'Fang', group: 'Langues bantoues' },
  { value: 'swahili', label: 'Swahili', group: 'Langues bantoues' },
  { value: 'fr', label: 'Français', group: 'Autres langues' },
  { value: 'en', label: 'English', group: 'Autres langues', disabled: true },
  { value: 'ar', label: 'العربية', group: 'Autres langues' },
];

const INVOICES = [
  { id: 'FAC001', status: 'Payée', method: 'Mobile Money', amount: '250 000 FCFA' },
  { id: 'FAC002', status: 'En attente', method: 'Carte bancaire', amount: '150 000 FCFA' },
  { id: 'FAC003', status: 'Impayée', method: 'Virement', amount: '350 000 FCFA' },
  { id: 'FAC004', status: 'Payée', method: 'Mobile Money', amount: '450 000 FCFA' },
];

const WIZARD_STEPS = [
  { label: 'Détails', icon: FileText },
  { label: 'Vérification', icon: Eye },
  { label: 'Terminé', icon: CircleCheck },
];

// ─── Démos ───────────────────────────────────────────────────────────────────

const ALL_BUTTON_IMPORTS = [
  BandaButtonComponent,
  LucideAngularModule,
  DemoExampleComponent,
  DemoModelCellComponent,
  CounterButtonComponent,
  DashedButtonComponent,
  IconButtonComponent,
  NotificationButtonComponent,
  PillButtonComponent,
  SocialButtonComponent,
  BounceButtonComponent,
  GlassButtonComponent,
  GrowButtonComponent,
  HeartbeatButtonComponent,
  MagneticButtonComponent,
  PulseButtonComponent,
  RingHoverButtonComponent,
  RippleButtonComponent,
  ShimmerButtonComponent,
  ShineButtonComponent,
  SwipeButtonComponent,
  TapButtonComponent,
];

@Component({
  selector: 'banda-button-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: ALL_BUTTON_IMPORTS,
  template: `
    <div class="flex flex-col gap-6">
      <banda-demo-example>
        <span slot="title">Variantes de base</span>
        <div class="flex flex-wrap items-center gap-3">
          <banda-button variant="primary">Primary</banda-button>
          <banda-button variant="secondary">Secondary</banda-button>
          <banda-button variant="outline">Outline</banda-button>
          <banda-button variant="ghost">Ghost</banda-button>
          <banda-button variant="danger">Danger</banda-button>
          <banda-button variant="link">Link</banda-button>
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Tailles &amp; états</span>
        <div class="flex flex-wrap items-center gap-3">
          <banda-button size="sm">Small</banda-button>
          <banda-button size="md">Medium</banda-button>
          <banda-button size="lg">Large</banda-button>
          <banda-button [loading]="isLoading()" (click)="toggleLoading()">
            {{ isLoading() ? 'Chargement…' : 'Chargement' }}
          </banda-button>
          <banda-button [disabled]="true">Désactivé</banda-button>
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Modèles — compositions</span>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <banda-demo-model-cell>
            <banda-button>
              Get in touch
              <lucide-angular [img]="ArrowRight" [size]="16" aria-hidden="true" />
            </banda-button>
            <span slot="label">Avec icônes</span>
          </banda-demo-model-cell>

          <banda-demo-model-cell>
            <div class="flex gap-2">
              <banda-icon-button [icon]="Bookmark" ariaLabel="Enregistrer" variant="outline" />
              <banda-icon-button [icon]="Plus" ariaLabel="Ajouter" />
              <banda-icon-button [icon]="Menu" ariaLabel="Menu" variant="ghost" />
            </div>
            <span slot="label">IconButton</span>
          </banda-demo-model-cell>

          <banda-demo-model-cell>
            <banda-button variant="danger">
              <lucide-angular [img]="Trash2" [size]="16" aria-hidden="true" />
              Supprimer
            </banda-button>
            <span slot="label">Danger + icône</span>
          </banda-demo-model-cell>

          <banda-demo-model-cell>
            <banda-counter-button count="99+">
              <lucide-angular [img]="Mail" [size]="16" aria-hidden="true" />
              Messages
            </banda-counter-button>
            <span slot="label">CounterButton</span>
          </banda-demo-model-cell>

          <banda-demo-model-cell>
            <banda-notification-button>Notifications</banda-notification-button>
            <span slot="label">NotificationButton</span>
          </banda-demo-model-cell>

          <banda-demo-model-cell>
            <banda-pill-button variant="secondary">Publier</banda-pill-button>
            <span slot="label">PillButton</span>
          </banda-demo-model-cell>

          <banda-demo-model-cell>
            <banda-dashed-button>
              <lucide-angular [img]="Download" [size]="16" aria-hidden="true" />
              Télécharger
            </banda-dashed-button>
            <span slot="label">DashedButton</span>
          </banda-demo-model-cell>

          <banda-demo-model-cell>
            <div class="flex w-full max-w-xs flex-col gap-2">
              <banda-social-button provider="google" />
              <banda-social-button provider="github" />
            </div>
            <span slot="label">SocialButton</span>
          </banda-demo-model-cell>
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Modèles — animés</span>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <banda-demo-model-cell>
            <banda-ripple-button>Ripple Effect</banda-ripple-button>
            <span slot="label">RippleButton (cliquez)</span>
          </banda-demo-model-cell>
          <banda-demo-model-cell>
            <banda-shine-button>Shine Hover</banda-shine-button>
            <span slot="label">ShineButton (survolez)</span>
          </banda-demo-model-cell>
          <banda-demo-model-cell>
            <banda-shimmer-button>Shimmer Button</banda-shimmer-button>
            <span slot="label">ShimmerButton</span>
          </banda-demo-model-cell>
          <banda-demo-model-cell>
            <banda-tap-button>Tap Animation</banda-tap-button>
            <span slot="label">TapButton (cliquez)</span>
          </banda-demo-model-cell>
          <banda-demo-model-cell>
            <banda-bounce-button>Bounce Button</banda-bounce-button>
            <span slot="label">BounceButton (survolez)</span>
          </banda-demo-model-cell>
          <banda-demo-model-cell>
            <banda-heartbeat-button>Heartbeat Effect</banda-heartbeat-button>
            <span slot="label">HeartbeatButton</span>
          </banda-demo-model-cell>
          <banda-demo-model-cell>
            <banda-pulse-button>Pulse Button</banda-pulse-button>
            <span slot="label">PulseButton</span>
          </banda-demo-model-cell>
          <banda-demo-model-cell>
            <banda-ring-hover-button>Ring Hover</banda-ring-hover-button>
            <span slot="label">RingHoverButton (survolez)</span>
          </banda-demo-model-cell>
          <banda-demo-model-cell>
            <banda-grow-button>Grow Button</banda-grow-button>
            <span slot="label">GrowButton (survolez)</span>
          </banda-demo-model-cell>
          <banda-demo-model-cell>
            <banda-swipe-button>Swipe Button</banda-swipe-button>
            <span slot="label">SwipeButton (survolez)</span>
          </banda-demo-model-cell>
          <banda-demo-model-cell>
            <banda-magnetic-button>Magnetic Button</banda-magnetic-button>
            <span slot="label">MagneticButton (survolez)</span>
          </banda-demo-model-cell>
          <banda-demo-model-cell>
            <banda-glass-button>Glass Button</banda-glass-button>
            <span slot="label">GlassButton</span>
          </banda-demo-model-cell>
        </div>
      </banda-demo-example>
    </div>
  `,
})
export class BandaButtonDemoComponent {
  protected readonly ArrowRight = ArrowRight;
  protected readonly Bookmark = Bookmark;
  protected readonly Download = Download;
  protected readonly Mail = Mail;
  protected readonly Menu = Menu;
  protected readonly Plus = Plus;
  protected readonly Trash2 = Trash2;

  protected readonly isLoading = signal(false);

  protected toggleLoading(): void {
    this.isLoading.set(true);
    setTimeout(() => this.isLoading.set(false), 2000);
  }
}

// ─── Label ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-label-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaInputComponent, BandaCheckboxComponent, BandaSwitchComponent, BandaButtonComponent, DemoExampleComponent, DemoModelCellComponent],
  template: `
    <div class="flex flex-col gap-6">
      <banda-demo-example>
        <span slot="title">Visible, requis, masqué</span>
        <div class="grid gap-4 md:grid-cols-3">
          <banda-input label="Label visible" placeholder="…" />
          <banda-input label="Label requis" [required]="true" placeholder="…" />
          <banda-input label="Label masqué (sr-only)" [hideLabel]="true" placeholder="Label accessible mais invisible" />
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Modèles — labels décorés</span>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <banda-demo-model-cell>
            <div class="flex w-full flex-col gap-3">
              <banda-checkbox [checked]="true">J'accepte les conditions</banda-checkbox>
              <banda-switch label="Ne pas déranger" />
            </div>
            <span slot="label">Label + contrôles à libellé intégré</span>
          </banda-demo-model-cell>

          <banda-demo-model-cell>
            <form class="flex w-full flex-col gap-3" (submit)="$event.preventDefault()">
              <banda-input label="Nom" placeholder="Votre nom" />
              <banda-input label="Email" type="email" placeholder="Votre email" />
              <banda-button type="submit" className="w-full">Envoyer</banda-button>
            </form>
            <span slot="label">Composition formulaire</span>
          </banda-demo-model-cell>
        </div>
      </banda-demo-example>
    </div>
  `,
})
export class BandaLabelDemoComponent {}

// ─── Badge ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-badge-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaBadgeComponent, LucideAngularModule, DemoExampleComponent, DemoModelCellComponent],
  template: `
    <div class="flex flex-col gap-6">
      <banda-demo-example>
        <span slot="title">Grille tone × fill (recolorable par tokens)</span>
        <div class="flex flex-col gap-3">
          @for (fill of fills; track fill) {
            <div class="flex flex-wrap items-center gap-2">
              <span class="w-14 font-sans text-xs text-banda-text-muted">{{ fill }}</span>
              @for (tone of tones; track tone) {
                <banda-badge [tone]="tone" [fill]="fill">{{ tone }}</banda-badge>
              }
            </div>
          }
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Tailles &amp; formes</span>
        <div class="flex flex-wrap items-center gap-3">
          <banda-badge tone="primary" fill="solid" size="sm">Small</banda-badge>
          <banda-badge tone="primary" fill="solid" size="md">Medium</banda-badge>
          <banda-badge tone="primary" fill="solid" size="lg">Large</banda-badge>
          <banda-badge tone="primary" fill="solid" [square]="true">Square</banda-badge>
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Modèles</span>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <banda-demo-model-cell>
            <banda-badge tone="primary" fill="solid">
              <lucide-angular [img]="Star" [size]="12" aria-hidden="true" /> With Icon
            </banda-badge>
            <span slot="label">Avec icône</span>
          </banda-demo-model-cell>

          <banda-demo-model-cell>
            <div class="flex flex-col gap-2">
              <div class="flex flex-wrap gap-2">
                <banda-badge tone="warning" fill="soft">In Progress</banda-badge>
                <banda-badge tone="danger" fill="soft">Blocked</banda-badge>
                <banda-badge tone="success" fill="soft">Completed</banda-badge>
              </div>
              <div class="flex flex-wrap gap-2">
                <banda-badge tone="info" fill="outline">Pending</banda-badge>
                <banda-badge tone="neutral" fill="outline">Archived</banda-badge>
              </div>
            </div>
            <span slot="label">Statuts</span>
          </banda-demo-model-cell>
        </div>
      </banda-demo-example>
    </div>
  `,
})
export class BandaBadgeDemoComponent {
  protected readonly Star = Star;
  protected readonly tones = ['neutral', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const;
  protected readonly fills = ['solid', 'soft', 'outline'] as const;
}

// ─── Input ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-input-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaInputComponent, LucideAngularModule, DemoExampleComponent],
  template: `
    <div class="flex flex-col gap-6">
      <banda-demo-example>
        <span slot="title">États</span>
        <div class="grid gap-4 md:grid-cols-2">
          <banda-input label="Default" placeholder="Votre nom" hint="Champ standard" />
          <banda-input label="Erreur" placeholder="Votre nom" error="Ce champ est requis." />
          <banda-input label="Désactivé" [disabled]="true" />
          <banda-input
            label="Validé (au blur)"
            placeholder="Min. 3 caractères"
            [validate]="validateMin3"
            [sanitize]="true"
            hint="Tapez puis quittez le champ"
          />
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Tailles</span>
        <div class="grid gap-4 md:grid-cols-3">
          <banda-input label="Small" size="sm" placeholder="size=sm" />
          <banda-input label="Medium" size="md" placeholder="size=md" />
          <banda-input label="Large" size="lg" placeholder="size=lg" />
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Variantes</span>
        <div class="grid gap-4 md:grid-cols-3">
          <banda-input label="Default" variant="default" placeholder="variant=default" />
          <banda-input label="Filled" variant="filled" placeholder="variant=filled" />
          <banda-input label="Ghost" variant="ghost" placeholder="variant=ghost" />
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Icônes</span>
        <div class="grid gap-4 md:grid-cols-2">
          <banda-input [hideLabel]="true" label="Utilisateur" [startIcon]="User" placeholder="Utilisateur" />
          <banda-input [hideLabel]="true" label="Email" [endIcon]="Mail" placeholder="Email" />
        </div>
      </banda-demo-example>
    </div>
  `,
})
export class BandaInputDemoComponent {
  protected readonly User = User;
  protected readonly Mail = Mail;
  protected readonly validateMin3 = (v: string) => v.length < 3 ? 'Au moins 3 caractères.' : null;
}

// ─── Textarea ─────────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-textarea-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaTextareaComponent, DemoExampleComponent, DemoModelCellComponent],
  template: `
    <div class="flex flex-col gap-6">
      <banda-demo-example>
        <span slot="title">États</span>
        <div class="grid gap-4 md:grid-cols-2">
          <banda-textarea
            label="Message"
            placeholder="Les caractères dangereux sont retirés à la frappe…"
            hint="Sanitize actif par défaut"
            [maxLength]="200"
            [showCounter]="true"
          />
          <banda-textarea label="Erreur" error="Le message est requis." placeholder="…" />
          <banda-textarea label="Requis" [required]="true" placeholder="Votre avis…" />
          <banda-textarea
            label="Validé (au blur)"
            placeholder="Min. 10 caractères"
            [validate]="validateMin10"
            hint="Tapez puis quittez le champ"
          />
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Tailles</span>
        <div class="grid gap-4 md:grid-cols-3">
          <banda-textarea label="Small" size="sm" placeholder="size=sm" />
          <banda-textarea label="Medium" size="md" placeholder="size=md" />
          <banda-textarea label="Large" size="lg" placeholder="size=lg" />
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Variantes</span>
        <div class="grid gap-4 md:grid-cols-3">
          <banda-textarea label="Default" variant="default" placeholder="variant=default" />
          <banda-textarea label="Filled" variant="filled" placeholder="variant=filled" />
          <banda-textarea label="Ghost" variant="ghost" placeholder="variant=ghost" />
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Modèles</span>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <banda-demo-model-cell>
            <banda-textarea
              [hideLabel]="true"
              label="Bio"
              [maxLength]="80"
              [showCounter]="true"
              counterAlign="start"
              placeholder="80 caractères max…"
              textareaClassName="w-full"
            />
            <span slot="label">Compteur (align=start)</span>
          </banda-demo-model-cell>

          <banda-demo-model-cell>
            <banda-textarea
              label="Commentaire"
              cornerHint="Optionnel"
              placeholder="Votre commentaire…"
            />
            <span slot="label">cornerHint</span>
          </banda-demo-model-cell>

          <banda-demo-model-cell>
            <banda-textarea
              [hideLabel]="true"
              label="Avis"
              resize="none"
              placeholder="Pas de poignée"
            />
            <span slot="label">resize=none</span>
          </banda-demo-model-cell>
        </div>
      </banda-demo-example>
    </div>
  `,
})
export class BandaTextareaDemoComponent {
  protected readonly validateMin10 = (v: string) => v.length < 10 ? 'Au moins 10 caractères.' : null;
}

// ─── Select ───────────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-select-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaSelectComponent, BandaInputComponent, DemoExampleComponent, DemoModelCellComponent],
  template: `
    <div class="flex flex-col gap-6">
      <banda-demo-example>
        <span slot="title">États</span>
        <div class="grid gap-4 md:grid-cols-2">
          <banda-select
            label="Langue"
            [options]="LANGUAGES"
            [value]="lang()"
            (onChange)="lang.set($event)"
            hint="Dropdown 100 % stylée tokens"
            [required]="true"
          />
          <banda-select label="Erreur" [options]="LANGUAGES" placeholder="Choisir…" error="Sélection requise." />
          <banda-select label="Désactivé" [options]="LANGUAGES" placeholder="Choisir…" [disabled]="true" />
          <banda-input label="Aligné sur BandaInput" placeholder="Même hauteur, même border" />
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Tailles</span>
        <div class="grid gap-4 md:grid-cols-3">
          <banda-select label="Small" size="sm" [options]="LANGUAGES" />
          <banda-select label="Medium" size="md" [options]="LANGUAGES" />
          <banda-select label="Large" size="lg" [options]="LANGUAGES" />
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Modèles — options riches &amp; groupes</span>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <banda-demo-model-cell>
            <banda-select [hideLabel]="true" label="Langue" [options]="GROUPED_LANGUAGES" placeholder="Choisir une langue…" />
            <span slot="label">Groupes + option désactivée</span>
          </banda-demo-model-cell>

          <banda-demo-model-cell>
            <banda-select [hideLabel]="true" label="Langue" [options]="LANGUAGES" placeholder="Ouvrir…" animation="slide" />
            <span slot="label">Animation slide-up</span>
          </banda-demo-model-cell>

          <banda-demo-model-cell>
            <banda-select [hideLabel]="true" label="Langue" [options]="LANGUAGES" placeholder="Ouvrir…" animation="zoom" />
            <span slot="label">Animation zoom-in</span>
          </banda-demo-model-cell>
        </div>
      </banda-demo-example>
    </div>
  `,
})
export class BandaSelectDemoComponent {
  protected readonly LANGUAGES = LANGUAGES;
  protected readonly GROUPED_LANGUAGES = GROUPED_LANGUAGES;
  protected readonly lang = signal('yipunu');
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-checkbox-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaCheckboxComponent, BandaButtonComponent, DemoExampleComponent],
  template: `
    <div class="flex flex-col gap-6">
      <banda-demo-example>
        <span slot="title">États</span>
        <div class="flex flex-col gap-3">
          <banda-checkbox description="Avec description" [checked]="true">Conditions acceptées</banda-checkbox>
          <banda-checkbox>Newsletter</banda-checkbox>
          <banda-checkbox [indeterminate]="true">Indéterminée</banda-checkbox>
          <banda-checkbox [disabled]="true">Désactivée</banda-checkbox>
          <banda-checkbox [disabled]="true" [checked]="true">Cochée désactivée</banda-checkbox>
          <banda-checkbox error="Cochez cette case.">En erreur</banda-checkbox>
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Tailles</span>
        <div class="flex flex-wrap items-center gap-6">
          <banda-checkbox size="sm" [checked]="true">Small</banda-checkbox>
          <banda-checkbox size="md" [checked]="true">Medium</banda-checkbox>
          <banda-checkbox size="lg" [checked]="true">Large</banda-checkbox>
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Couleurs &amp; formes</span>
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap items-center gap-6">
            <banda-checkbox color="danger" [checked]="true">Danger</banda-checkbox>
            <banda-checkbox color="info" [checked]="true">Info</banda-checkbox>
            <banda-checkbox color="success" [checked]="true">Success</banda-checkbox>
          </div>
          <div class="flex flex-wrap items-center gap-6">
            <banda-checkbox shape="circle" color="danger" [checked]="true">Ronde danger</banda-checkbox>
            <banda-checkbox shape="circle" color="info" [checked]="true">Ronde info</banda-checkbox>
            <banda-checkbox shape="circle" color="success" [checked]="true">Ronde success</banda-checkbox>
          </div>
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Composition formulaire</span>
        <form class="flex flex-col items-start gap-3" (submit)="$event.preventDefault()">
          <banda-checkbox [required]="true" description="En cochant cette case, vous acceptez les conditions d'utilisation.">
            Conditions acceptées
          </banda-checkbox>
          <div class="flex gap-2">
            <banda-button type="reset" variant="outline" size="sm">Réinitialiser</banda-button>
            <banda-button type="submit" size="sm">Envoyer</banda-button>
          </div>
        </form>
      </banda-demo-example>
    </div>
  `,
})
export class BandaCheckboxDemoComponent {}

// ─── Radio ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-radio-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaRadioComponent, DemoExampleComponent],
  template: `
    <div class="flex flex-col gap-6">
      <banda-demo-example>
        <span slot="title">États</span>
        <div class="flex flex-col gap-3" role="radiogroup" aria-label="Langue préférée">
          <banda-radio name="demo-radio" value="yipunu" [checked]="true">Yipunu</banda-radio>
          <banda-radio name="demo-radio" value="fang" description="Avec description">Fang</banda-radio>
          <banda-radio name="demo-radio" value="disabled" [disabled]="true">Désactivé</banda-radio>
          <banda-radio name="demo-radio" value="error" error="Choisissez une option.">En erreur</banda-radio>
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Tailles</span>
        <div class="flex flex-wrap items-center gap-6">
          <banda-radio name="demo-radio-sizes" value="sm" size="sm">Small</banda-radio>
          <banda-radio name="demo-radio-sizes" value="md" size="md" [checked]="true">Medium</banda-radio>
          <banda-radio name="demo-radio-sizes" value="lg" size="lg">Large</banda-radio>
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Couleurs</span>
        <div class="flex flex-wrap items-center gap-6">
          <banda-radio name="radio-danger" value="d" color="danger" [checked]="true">Danger</banda-radio>
          <banda-radio name="radio-info" value="i" color="info" [checked]="true">Info</banda-radio>
          <banda-radio name="radio-success" value="s" color="success" [checked]="true">Success</banda-radio>
        </div>
      </banda-demo-example>
    </div>
  `,
})
export class BandaRadioDemoComponent {}

// ─── Switch ───────────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-switch-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaSwitchComponent, DemoExampleComponent],
  template: `
    <div class="flex flex-col gap-6">
      <banda-demo-example>
        <span slot="title">États</span>
        <div class="flex flex-col gap-3">
          <banda-switch label="Notifications" [checked]="true" />
          <banda-switch label="Mode avion" />
          <banda-switch label="Sauvegarde" description="Sauvegarde chaque fichier du projet." />
          <banda-switch label="Désactivé" [disabled]="true" />
          <banda-switch label="Label avant (labelAlign=start)" labelAlign="start" />
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Tailles</span>
        <div class="flex flex-wrap items-center gap-6">
          <banda-switch label="Small" size="sm" [checked]="true" />
          <banda-switch label="Medium" size="md" [checked]="true" />
          <banda-switch label="Large" size="lg" [checked]="true" />
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Couleurs &amp; formes</span>
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap items-center gap-6">
            <banda-switch label="Danger" [hideLabel]="true" color="danger" [checked]="true" />
            <banda-switch label="Success" [hideLabel]="true" color="success" [checked]="true" />
            <banda-switch label="Info" [hideLabel]="true" color="info" [checked]="true" />
            <banda-switch label="Warning" [hideLabel]="true" color="warning" [checked]="true" />
          </div>
          <div class="flex flex-wrap items-center gap-6">
            <banda-switch label="Carré" shape="square" [checked]="true" />
            <banda-switch
              label="Dégradé (trackClassName)"
              trackClassName="bg-gradient-to-r from-banda-warning to-banda-danger"
              [checked]="true"
            />
          </div>
        </div>
      </banda-demo-example>
    </div>
  `,
})
export class BandaSwitchDemoComponent {}

// ─── Form ─────────────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-form-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BandaFormComponent, BandaInputComponent, BandaSelectComponent, BandaTextareaComponent,
    BandaRadioComponent, BandaCheckboxComponent,
    BandaButtonComponent, DemoExampleComponent, DemoModelCellComponent,
  ],
  template: `
    <div class="flex flex-col gap-6">
      <banda-demo-example>
        <span slot="title">Compositions simples (onSubmitValues + FormData)</span>
        <div class="grid gap-6 md:grid-cols-2">
          <banda-demo-model-cell>
            <banda-form class="w-full" (submitValues)="onSubmit('Préférences mises à jour.', $event)">
              <div role="group" aria-label="Partage de données" class="flex flex-col gap-2">
                <banda-radio name="partage" value="perso">Partager pour une expérience personnalisée</banda-radio>
                <banda-radio name="partage" value="aucun">Ne rien partager</banda-radio>
                <banda-radio name="partage" value="custom">Personnaliser le partage</banda-radio>
              </div>
              <banda-button type="submit" size="sm">Mettre à jour</banda-button>
            </banda-form>
            <span slot="label">RadioGroup + actions</span>
          </banda-demo-model-cell>

          <banda-demo-model-cell>
            <banda-form class="w-full" (submitValues)="onSubmit('Bienvenue à bord !', $event)">
              <banda-checkbox name="consentement" [required]="true" description="En cliquant, vous acceptez les règles.">
                Rejoindre la communauté
              </banda-checkbox>
              <banda-button type="submit" size="sm">Rejoindre</banda-button>
            </banda-form>
            <span slot="label">Consentement + bouton</span>
          </banda-demo-model-cell>

          <banda-demo-model-cell>
            <banda-form class="w-full" (submitValues)="onSubmit('Email de réinitialisation envoyé.', $event)">
              <banda-input name="email" type="email" label="Réinitialiser votre mot de passe" placeholder="Adresse email" [required]="true" />
              <banda-button type="submit" size="sm">Envoyer</banda-button>
            </banda-form>
            <span slot="label">Input + soumission</span>
          </banda-demo-model-cell>

          <banda-demo-model-cell>
            <banda-form class="w-full" (submitValues)="onSubmit('Moyen de paiement enregistré.', $event)">
              <banda-select
                name="paiement"
                label="Moyen de paiement"
                placeholder="Choisir un moyen de paiement…"
                hint="Sélectionnez votre moyen de paiement préféré."
                [options]="paiementOptions"
              />
              <banda-button type="submit" size="sm">Continuer</banda-button>
            </banda-form>
            <span slot="label">Select + hint</span>
          </banda-demo-model-cell>
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Formulaire carte (card)</span>
        <div class="mx-auto max-w-md">
          <banda-form [card]="true" (submitValues)="onSubmit('Problème signalé — merci !', $event)">
            <p class="m-0 font-sans text-sm font-semibold text-banda-text">Signaler un problème</p>
            <p class="m-0 font-sans text-xs text-banda-text-muted">Décrivez le problème rencontré.</p>
            <banda-input name="email" type="email" label="Email" placeholder="Adresse email" [required]="true" />
            <banda-select
              name="probleme"
              label="Problème"
              placeholder="Problème rencontré…"
              [options]="problemeOptions"
            />
            <banda-textarea name="description" label="Décrivez votre problème" placeholder="Donnez le maximum de détails…" [maxLength]="500" [showCounter]="true" />
            <div class="flex justify-end gap-2">
              <banda-button type="reset" variant="outline" size="sm">Réinitialiser</banda-button>
              <banda-button type="submit" size="sm">Envoyer</banda-button>
            </div>
          </banda-form>
        </div>
      </banda-demo-example>
    </div>
  `,
})
export class BandaFormDemoComponent {
  private readonly toast = inject(ToastService);

  protected readonly paiementOptions = [
    { value: 'mobile', label: 'Mobile Money' },
    { value: 'carte', label: 'Carte bancaire' },
    { value: 'virement', label: 'Virement' },
  ];

  protected readonly problemeOptions = [
    { value: 'livraison', label: 'Livraison' },
    { value: 'produit', label: 'Produit défectueux' },
    { value: 'facturation', label: 'Facturation' },
  ];

  protected onSubmit(message: string, _values: Record<string, string>): void {
    this.toast.show({ message, variant: 'success' });
  }
}

// ─── Table ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-table-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BandaTableComponent, BandaTableCaptionComponent, BandaTableHeadComponent,
    BandaTableBodyComponent, BandaTableFootComponent, BandaTableRowComponent,
    BandaTableHeaderComponent, BandaTableCellComponent, BandaBadgeComponent,
    DemoExampleComponent,
  ],
  template: `
    <div class="flex flex-col gap-6">
      <banda-demo-example>
        <span slot="title">Base composée (Head / Body / Foot)</span>
        <banda-table>
          <banda-table-caption>Factures récentes.</banda-table-caption>
          <banda-table-head>
            <banda-table-row className="hover:bg-transparent">
              <banda-table-header>Facture</banda-table-header>
              <banda-table-header>Statut</banda-table-header>
              <banda-table-header>Moyen</banda-table-header>
              <banda-table-header align="end">Montant</banda-table-header>
            </banda-table-row>
          </banda-table-head>
          <banda-table-body>
            @for (row of INVOICES; track row.id) {
              <banda-table-row>
                <banda-table-cell className="font-medium">{{ row.id }}</banda-table-cell>
                <banda-table-cell>
                  <banda-badge [tone]="row.status === 'Payée' ? 'success' : row.status === 'En attente' ? 'warning' : 'danger'" fill="soft">
                    {{ row.status }}
                  </banda-badge>
                </banda-table-cell>
                <banda-table-cell>{{ row.method }}</banda-table-cell>
                <banda-table-cell [numeric]="true">{{ row.amount }}</banda-table-cell>
              </banda-table-row>
            }
          </banda-table-body>
          <banda-table-foot>
            <tr>
              <td class="px-3 py-3 align-middle text-banda-text" colspan="3">Total</td>
              <td class="px-3 py-3 text-right tabular-nums align-middle text-banda-text">1 200 000 FCFA</td>
            </tr>
          </banda-table-foot>
        </banda-table>
      </banda-demo-example>
    </div>
  `,
})
export class BandaTableDemoComponent {
  protected readonly INVOICES = INVOICES;
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-tabs-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaTabsComponent, BandaTabPanelComponent, LucideAngularModule, DemoExampleComponent],
  template: `
    <div class="flex flex-col gap-6">
      <banda-demo-example>
        <span slot="title">Variantes</span>
        <div class="grid gap-8 md:grid-cols-2">
          <banda-tabs label="Variante segmented" [tabs]="TABS_BASE">
            @for (t of TAB_CONTENTS; track t.value) {
              <banda-tab-panel [value]="t.value">
                <p class="m-0 font-sans text-sm leading-normal text-banda-text-muted">{{ t.text }}</p>
              </banda-tab-panel>
            }
          </banda-tabs>
          <banda-tabs label="Variante solid" variant="solid" [tabs]="TABS_BASE">
            @for (t of TAB_CONTENTS; track t.value) {
              <banda-tab-panel [value]="t.value">
                <p class="m-0 font-sans text-sm leading-normal text-banda-text-muted">{{ t.text }}</p>
              </banda-tab-panel>
            }
          </banda-tabs>
          <banda-tabs label="Variante underline" variant="underline" [tabs]="TABS_BASE">
            @for (t of TAB_CONTENTS; track t.value) {
              <banda-tab-panel [value]="t.value">
                <p class="m-0 font-sans text-sm leading-normal text-banda-text-muted">{{ t.text }}</p>
              </banda-tab-panel>
            }
          </banda-tabs>
          <banda-tabs label="Variante plain" variant="plain" [tabs]="TABS_BASE">
            @for (t of TAB_CONTENTS; track t.value) {
              <banda-tab-panel [value]="t.value">
                <p class="m-0 font-sans text-sm leading-normal text-banda-text-muted">{{ t.text }}</p>
              </banda-tab-panel>
            }
          </banda-tabs>
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Icônes, badges &amp; vertical</span>
        <div class="grid gap-8 md:grid-cols-2">
          <banda-tabs label="Onglets avec icônes" [tabs]="TABS_ICONS">
            @for (t of TAB_CONTENTS; track t.value) {
              <banda-tab-panel [value]="t.value">
                <p class="m-0 font-sans text-sm leading-normal text-banda-text-muted">{{ t.text }}</p>
              </banda-tab-panel>
            }
          </banda-tabs>
          <banda-tabs label="Onglets avec badges" [tabs]="TABS_BADGES">
            @for (t of TAB_CONTENTS; track t.value) {
              <banda-tab-panel [value]="t.value">
                <p class="m-0 font-sans text-sm leading-normal text-banda-text-muted">{{ t.text }}</p>
              </banda-tab-panel>
            }
          </banda-tabs>
          <banda-tabs label="Vertical avec icônes" orientation="vertical" [tabs]="TABS_ICONS">
            @for (t of TAB_CONTENTS; track t.value) {
              <banda-tab-panel [value]="t.value">
                <p class="m-0 font-sans text-sm leading-normal text-banda-text-muted">{{ t.text }}</p>
              </banda-tab-panel>
            }
          </banda-tabs>
        </div>
      </banda-demo-example>
    </div>
  `,
})
export class BandaTabsDemoComponent {
  protected readonly TABS_BASE = [
    { value: 'explorer', label: 'Explorer' },
    { value: 'favoris', label: 'Favoris' },
    { value: 'surprise', label: 'Surprise' },
  ];

  protected readonly TABS_ICONS = [
    { value: 'explorer', label: 'Explorer', icon: Bookmark },
    { value: 'favoris', label: 'Favoris', icon: Heart },
    { value: 'surprise', label: 'Surprise', icon: Bell },
  ];

  protected readonly TABS_BADGES = [
    { value: 'explorer', label: 'Explorer', badge: 8 },
    { value: 'favoris', label: 'Favoris', badge: 3 },
    { value: 'surprise', label: 'Surprise', badge: 6 },
  ];

  protected readonly TAB_CONTENTS = [
    { value: 'explorer', text: 'Découvrez des idées fraîches, des sujets tendance et des pépites cachées.' },
    { value: 'favoris', text: 'Vos favoris, regroupés au même endroit.' },
    { value: 'surprise', text: 'Laissez la curiosité vous guider !' },
  ];

  protected byVal(_: number, item: { value: string }) { return item.value; }
}

// ─── Stepper ──────────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-stepper-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaStepperComponent, BandaButtonComponent, LucideAngularModule, DemoExampleComponent],
  template: `
    <div class="flex flex-col gap-6">
      <banda-demo-example>
        <span slot="title">Placements de labels</span>
        <div class="flex flex-col gap-8">
          <banda-stepper [current]="1" [steps]="[{}, {}, {}]" ariaLabel="Étapes sans label" />
          <banda-stepper [current]="1" [steps]="stepsLabels" />
          <banda-stepper [current]="1" [steps]="stepsDescriptions" />
          <banda-stepper [current]="1" labelPlacement="end" [steps]="stepsLabels" />
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Variantes &amp; états</span>
        <div class="flex flex-col gap-8">
          <banda-stepper [current]="1" variant="outline" [steps]="[{}, {}, {}]" ariaLabel="Variante outline" />
          <banda-stepper [current]="2" [steps]="[{}, {}, {}]" ariaLabel="Étape 2 courante" />
          <banda-stepper [current]="2" [steps]="WIZARD_STEPS" />
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Vertical (descriptions)</span>
        <banda-stepper orientation="vertical" [current]="2" [steps]="stepsDescriptions" />
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Wizard contrôlé</span>
        <div class="flex flex-col gap-6">
          <banda-stepper [current]="wizardCurrent()" [steps]="WIZARD_STEPS" />
          <div class="flex flex-col gap-4 rounded-lg border border-dashed border-banda-border p-6 text-center">
            <h4 class="m-0 font-sans text-lg font-bold leading-tight tracking-tight text-banda-text">
              {{ WIZARD_CONTENTS[wizardCurrent() - 1].title }}
            </h4>
            <p class="m-0 font-sans text-sm leading-normal text-banda-text-muted">
              {{ WIZARD_CONTENTS[wizardCurrent() - 1].text }}
            </p>
            <div class="flex justify-between">
              <banda-button variant="outline" size="sm" [disabled]="wizardCurrent() === 1" (click)="wizardBack()">
                <lucide-angular [img]="ArrowLeft" [size]="14" aria-hidden="true" /> Retour
              </banda-button>
              <banda-button size="sm" [disabled]="wizardCurrent() === WIZARD_STEPS.length" (click)="wizardNext()">
                {{ wizardCurrent() === WIZARD_STEPS.length ? 'Envoyer' : 'Suivant' }}
                <lucide-angular [img]="ArrowRight" [size]="14" aria-hidden="true" />
              </banda-button>
            </div>
          </div>
        </div>
      </banda-demo-example>
    </div>
  `,
})
export class BandaStepperDemoComponent {
  protected readonly ArrowLeft = ArrowLeft;
  protected readonly ArrowRight = ArrowRight;
  protected readonly WIZARD_STEPS = WIZARD_STEPS;
  protected readonly WIZARD_CONTENTS = [
    { title: 'Détails', text: 'Renseignez les informations requises pour cette étape.' },
    { title: 'Vérification', text: 'Confirmez vos informations et vos choix.' },
    { title: 'Terminé', text: 'Tout est prêt — vérification terminée.' },
  ];
  protected readonly stepsLabels = [
    { label: 'Détails' }, { label: 'Confirmation' }, { label: 'Terminé' },
  ];
  protected readonly stepsDescriptions = [
    { label: 'Compte', description: 'Créez un compte', icon: FileText },
    { label: 'Profil', description: 'Renseignez votre profil', icon: Eye },
    { label: 'Terminé', description: 'Finalisez la configuration', icon: CircleCheck },
  ];

  protected readonly wizardCurrent = signal(1);
  protected wizardNext(): void { this.wizardCurrent.update((c) => Math.min(c + 1, WIZARD_STEPS.length)); }
  protected wizardBack(): void { this.wizardCurrent.update((c) => Math.max(c - 1, 1)); }
}

// ─── Dialog ───────────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-dialog-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BandaDialogComponent, BandaButtonComponent, BandaInputComponent,
    BandaFormComponent, DemoExampleComponent, DemoModelCellComponent,
  ],
  template: `
    <div class="flex flex-col gap-6">
      <banda-demo-example>
        <span slot="title">Tailles &amp; fermeture</span>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <banda-demo-model-cell>
            <banda-button variant="outline" size="sm" (click)="basicOpen.set(true)">Basic</banda-button>
            <span slot="label">Dialogue de base</span>
          </banda-demo-model-cell>
          <banda-demo-model-cell>
            <banda-button variant="outline" size="sm" (click)="scrollOpen.set(true)">Corps défilant</banda-button>
            <span slot="label">Dividers + défilement</span>
          </banda-demo-model-cell>
          <banda-demo-model-cell>
            <banda-button variant="outline" size="sm" (click)="fullscreenOpen.set(true)">Plein écran</banda-button>
            <span slot="label">size=fullscreen</span>
          </banda-demo-model-cell>
          <banda-demo-model-cell>
            <div class="flex flex-col items-center gap-2">
              <banda-button variant="outline" size="sm" (click)="zoomOpen.set(true)">Zoom in</banda-button>
              <banda-button variant="outline" size="sm" (click)="slideOpen.set(true)">Slide up</banda-button>
            </div>
            <span slot="label">Animations</span>
          </banda-demo-model-cell>
          <banda-demo-model-cell>
            <banda-button variant="outline" size="sm" (click)="formOpen.set(true)">S'abonner</banda-button>
            <span slot="label">Formulaire dans dialog</span>
          </banda-demo-model-cell>
        </div>
      </banda-demo-example>
    </div>

    <!-- Dialogues -->
    <banda-dialog [open]="basicOpen()" (onClose)="basicOpen.set(false)"
      title="Titre de la fenêtre" description="Description courte." [hasFooter]="true">
      <p class="m-0 font-sans text-sm leading-normal text-banda-text-muted">Contenu du dialogue.</p>
      <div slot="footer">
        <banda-button variant="outline" size="sm" (click)="basicOpen.set(false)">Fermer</banda-button>
      </div>
    </banda-dialog>

    <banda-dialog [open]="scrollOpen()" (onClose)="scrollOpen.set(false)"
      [dividers]="true" title="Conditions d'utilisation"
      description="En-tête et pied restent visibles, le corps défile."
      className="max-h-96" [hasFooter]="true">
      <div class="flex flex-col gap-3">
        @for (clause of loremClauses; track $index) {
          <p class="m-0 font-sans text-sm leading-normal text-banda-text-muted">{{ clause }}</p>
        }
      </div>
      <div slot="footer">
        <banda-button variant="outline" size="sm" (click)="scrollOpen.set(false)">Refuser</banda-button>
        <banda-button size="sm" (click)="scrollOpen.set(false)">Accepter</banda-button>
      </div>
    </banda-dialog>

    <banda-dialog [open]="fullscreenOpen()" (onClose)="fullscreenOpen.set(false)"
      size="fullscreen" title="Dialogue plein écran" description="Pour les flux immersifs.">
      <p class="m-0 font-sans text-sm leading-normal text-banda-text-muted">Échap ou la croix pour fermer.</p>
    </banda-dialog>

    <banda-dialog [open]="zoomOpen()" (onClose)="zoomOpen.set(false)"
      animation="zoom" title="Animation zoom-in">
      <p class="m-0 font-sans text-sm leading-normal text-banda-text-muted">Keyframes banda-zoom-in du preset.</p>
    </banda-dialog>

    <banda-dialog [open]="slideOpen()" (onClose)="slideOpen.set(false)"
      animation="slide" title="Animation slide-up">
      <p class="m-0 font-sans text-sm leading-normal text-banda-text-muted">Keyframes banda-slide-up du preset.</p>
    </banda-dialog>

    <banda-dialog [open]="formOpen()" (onClose)="formOpen.set(false)"
      title="Restez informé·e" description="Recevez nos nouveautés, sans spam.">
      <banda-form (submitValues)="onFormSubmit($event)">
        <banda-input name="email" type="email" label="Email" placeholder="vous@exemple.dev" [required]="true" />
        <div class="flex justify-end">
          <banda-button type="submit" size="sm">S'abonner</banda-button>
        </div>
      </banda-form>
    </banda-dialog>
  `,
})
export class BandaDialogDemoComponent {
  private readonly toast = inject(ToastService);

  protected readonly basicOpen = signal(false);
  protected readonly scrollOpen = signal(false);
  protected readonly fullscreenOpen = signal(false);
  protected readonly zoomOpen = signal(false);
  protected readonly slideOpen = signal(false);
  protected readonly formOpen = signal(false);

  protected readonly loremClauses = Array.from(
    { length: 10 },
    (_, i) => `${i + 1}. Banda signifie « commencement » en Yipunu : chaque clause illustre le défilement du corps du dialogue pendant que l'en-tête et le pied restent visibles.`,
  );

  protected onFormSubmit(_values: Record<string, string>): void {
    this.formOpen.set(false);
    this.toast.show({ message: 'Abonnement confirmé.', variant: 'success' });
  }
}

// ─── Dropdown Menu ────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-dropdown-menu-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BandaDropdownMenuComponent, BandaMenuItemComponent, BandaMenuLabelComponent,
    BandaMenuSeparatorComponent, BandaMenuCheckboxItemComponent,
    BandaMenuRadioGroupComponent, BandaMenuRadioItemComponent,
    LucideAngularModule, DemoExampleComponent, DemoModelCellComponent,
  ],
  template: `
    <div class="flex flex-col gap-6">
      <banda-demo-example>
        <span slot="title">Modèles — structure &amp; contenus</span>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <banda-demo-model-cell>
            <banda-dropdown-menu label="Mon compte">
              <span slot="trigger">Basique</span>
              <banda-menu-label>Mon compte</banda-menu-label>
              <banda-menu-item>Profil</banda-menu-item>
              <banda-menu-item>Facturation</banda-menu-item>
              <banda-menu-separator />
              <banda-menu-item>Support</banda-menu-item>
              <banda-menu-item [disabled]="true">API</banda-menu-item>
            </banda-dropdown-menu>
            <span slot="label">Basique (label, séparateur, désactivé)</span>
          </banda-demo-model-cell>

          <banda-demo-model-cell>
            <banda-dropdown-menu label="Mon compte">
              <span slot="trigger">Avec icônes</span>
              <banda-menu-label>Mon compte</banda-menu-label>
              <banda-menu-item [icon]="User">Profil</banda-menu-item>
              <banda-menu-item [icon]="Settings">Paramètres</banda-menu-item>
              <banda-menu-item [icon]="Bell">Notifications</banda-menu-item>
              <banda-menu-separator />
              <banda-menu-item [icon]="LogOut" [danger]="true">Se déconnecter</banda-menu-item>
            </banda-dropdown-menu>
            <span slot="label">Items avec icônes + danger</span>
          </banda-demo-model-cell>

          <banda-demo-model-cell>
            <banda-dropdown-menu label="Fenêtres" align="end">
              <span slot="trigger">Raccourcis</span>
              <banda-menu-item shortcut="Ctrl T">Nouvel onglet</banda-menu-item>
              <banda-menu-item shortcut="Ctrl N">Nouvelle fenêtre</banda-menu-item>
              <banda-menu-separator />
              <banda-menu-item shortcut="Ctrl H">Historique</banda-menu-item>
            </banda-dropdown-menu>
            <span slot="label">Raccourcis + align=end</span>
          </banda-demo-model-cell>

          <banda-demo-model-cell>
            <banda-dropdown-menu label="Menu animé" animation="slide">
              <span slot="trigger">Animé (slide)</span>
              <banda-menu-item>Mon profil</banda-menu-item>
              <banda-menu-item>Paramètres</banda-menu-item>
              <banda-menu-item>FAQ</banda-menu-item>
            </banda-dropdown-menu>
            <span slot="label">Animation slide-up</span>
          </banda-demo-model-cell>

          <banda-demo-model-cell>
            <banda-dropdown-menu label="Menu animé" animation="zoom">
              <span slot="trigger">Animé (zoom)</span>
              <banda-menu-item>Mon profil</banda-menu-item>
              <banda-menu-item>Paramètres</banda-menu-item>
              <banda-menu-item>FAQ</banda-menu-item>
            </banda-dropdown-menu>
            <span slot="label">Animation zoom-in</span>
          </banda-demo-model-cell>
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Modèles — états &amp; contenus riches</span>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <banda-demo-model-cell>
            <banda-dropdown-menu label="Apparence">
              <span slot="trigger">Avec coches</span>
              <banda-menu-label>Apparence</banda-menu-label>
              <banda-menu-checkbox-item [checked]="statusBar()" (checkedChange)="statusBar.set($event)">
                Barre de statut
              </banda-menu-checkbox-item>
              <banda-menu-checkbox-item [checked]="false" [disabled]="true">API</banda-menu-checkbox-item>
              <banda-menu-checkbox-item [checked]="invites()" (checkedChange)="invites.set($event)">
                Inviter des utilisateurs
              </banda-menu-checkbox-item>
            </banda-dropdown-menu>
            <span slot="label">CheckboxItem (menu reste ouvert)</span>
          </banda-demo-model-cell>

          <banda-demo-model-cell>
            <banda-dropdown-menu label="Position du panneau">
              <span slot="trigger">Avec radios</span>
              <banda-menu-radio-group [value]="panelPos()" (valueChange)="panelPos.set($event)" label="Position du panneau">
                <banda-menu-radio-item value="top">Haut</banda-menu-radio-item>
                <banda-menu-radio-item value="bottom">Bas</banda-menu-radio-item>
                <banda-menu-radio-item value="right" [disabled]="true">Droite</banda-menu-radio-item>
              </banda-menu-radio-group>
            </banda-dropdown-menu>
            <span slot="label">RadioGroup / RadioItem</span>
          </banda-demo-model-cell>
        </div>
      </banda-demo-example>
    </div>
  `,
})
export class BandaDropdownMenuDemoComponent {
  protected readonly User = User;
  protected readonly Settings = Settings;
  protected readonly Bell = Bell;
  protected readonly LogOut = LogOut;
  protected readonly Mail = Mail;

  protected readonly statusBar = signal(true);
  protected readonly invites = signal(false);
  protected readonly panelPos = signal('bottom');
}

// ─── Toast ────────────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-toast-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BandaButtonComponent, DemoExampleComponent],
  template: `
    <banda-demo-example>
      <span slot="title">4 variants + persistant</span>
      <div class="flex flex-wrap gap-3">
        <banda-button variant="outline" (click)="show('info')">Info</banda-button>
        <banda-button variant="outline" (click)="show('success')">Succès</banda-button>
        <banda-button variant="outline" (click)="show('warning')">Avertissement</banda-button>
        <banda-button variant="outline" (click)="showPersistent()">Persistant</banda-button>
      </div>
    </banda-demo-example>
  `,
})
export class BandaToastDemoComponent {
  private readonly toast = inject(ToastService);

  protected show(variant: 'info' | 'success' | 'warning'): void {
    const messages = {
      info: 'Information.',
      success: 'Profil enregistré.',
      warning: 'Connexion instable…',
    };
    this.toast.show({ message: messages[variant], variant });
  }

  protected showPersistent(): void {
    this.toast.show({ message: 'Échec de la sauvegarde.', variant: 'danger', durationMs: null });
  }
}

// ─── Card ─────────────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-card-demo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BandaCardComponent, BandaCardHeaderComponent, BandaCardTitleComponent,
    BandaCardDescriptionComponent, BandaCardBodyComponent, BandaCardFooterComponent,
    BandaButtonComponent, BandaInputComponent,
    BandaFormComponent, DemoExampleComponent,
  ],
  template: `
    <div class="flex flex-col gap-6">
      <banda-demo-example>
        <span slot="title">Compositions (base &lt;article&gt; composée)</span>
        <div class="grid items-start gap-6 md:grid-cols-2">
          <banda-card className="mx-auto w-full max-w-sm">
            <banda-card-header>
              <banda-card-title>Connectez-vous</banda-card-title>
              <banda-card-description>Saisissez votre email pour accéder à votre compte.</banda-card-description>
            </banda-card-header>
            <banda-card-body>
              <banda-form (submitValues)="onLogin($event)">
                <banda-input name="email" type="email" label="Email" placeholder="vous@exemple.dev" [required]="true" />
                <banda-input name="password" type="password" label="Mot de passe" [required]="true" [sanitize]="false" />
                <banda-button type="submit" className="w-full">Se connecter</banda-button>
              </banda-form>
            </banda-card-body>
            <banda-card-footer className="justify-center">
              <p class="m-0 font-sans text-sm leading-normal text-banda-text-muted">
                Pas encore de compte ?
                <a href="#/c/card" class="text-banda-text underline">Créer un compte</a>
              </p>
            </banda-card-footer>
          </banda-card>

          <banda-card className="w-full">
            <banda-card-header>
              <banda-card-title>Notes de réunion</banda-card-title>
              <banda-card-description>Compte-rendu de la réunion avec le client.</banda-card-description>
            </banda-card-header>
            <banda-card-body className="flex flex-col gap-3">
              <p class="m-0 font-sans text-sm leading-normal text-banda-text">
                Le client demande une refonte du tableau de bord, orientée mobile.
              </p>
              <ol class="m-0 flex list-decimal flex-col gap-1 pl-5 font-sans text-sm text-banda-text">
                <li>Nouveaux widgets d'analyse</li>
                <li>Menu de navigation simplifié</li>
                <li>Prise en charge du mode sombre</li>
                <li>Délai : 6 semaines</li>
              </ol>
            </banda-card-body>
            <banda-card-footer>
              <div class="flex -space-x-2">
                @for (name of teamNames; track name) {
                  <span [title]="name" class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-banda-surface bg-banda-primary-muted font-sans text-xs font-semibold text-banda-primary">
                    {{ initials(name) }}
                  </span>
                }
              </div>
            </banda-card-footer>
          </banda-card>
        </div>
      </banda-demo-example>

      <banda-demo-example>
        <span slot="title">Compositions — médias &amp; marketing</span>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <banda-card>
            <banda-card-header>
              <banda-card-title>Gadget créatif</banda-card-title>
              <banda-card-description>Bannière sur dégradé de tokens.</banda-card-description>
            </banda-card-header>
            <div class="h-32 w-full bg-gradient-to-br from-banda-info to-banda-secondary" aria-hidden="true"></div>
            <banda-card-footer>
              <banda-button size="sm" variant="secondary">Découvrir</banda-button>
            </banda-card-footer>
          </banda-card>

          <banda-card className="bg-banda-text border-banda-text">
            <banda-card-header>
              <banda-card-title className="!text-banda-surface">Comment démarre un projet ?</banda-card-title>
              <banda-card-description className="!text-banda-surface">
                Parlons de vos besoins — réponse sous 24 h.
              </banda-card-description>
            </banda-card-header>
            <banda-card-footer>
              <banda-button size="sm" variant="secondary">Discutons-en</banda-button>
            </banda-card-footer>
          </banda-card>

          <banda-card>
            <banda-card-body className="pt-6">
              <p class="m-0 font-sans text-sm leading-normal text-banda-text">
                « Ce starter nous a fait gagner des semaines : tokens, accessibilité et sanitize par défaut, tout y est. »
              </p>
              <p class="m-0 mt-3 font-sans text-sm leading-normal text-banda-text-muted">Mariam Diallo — Lead front, Dakar</p>
            </banda-card-body>
          </banda-card>
        </div>
      </banda-demo-example>
    </div>
  `,
})
export class BandaCardDemoComponent {
  private readonly toast = inject(ToastService);

  protected readonly teamNames = ['Pulchérie Moussavou', 'Karl Ondo', 'Aïcha Nzé', 'Jean Boussougou'];
  protected initials(name: string): string {
    return name.split(' ').map((p) => p[0]).join('');
  }

  protected onLogin(_values: Record<string, string>): void {
    this.toast.show({ message: 'Connexion réussie.', variant: 'success' });
  }
}
