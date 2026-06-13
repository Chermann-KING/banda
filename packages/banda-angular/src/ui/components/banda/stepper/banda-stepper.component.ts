/**
 * Fil d'étapes accessible : aria-current="step" sur l'étape courante,
 * état terminé annoncé en sr-only, connecteurs décoratifs.
 */
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { type LucideIconData, LucideAngularModule, Check } from 'lucide-angular';

export interface StepperStep {
  label?: string;
  description?: string;
  /** Icône Lucide à la place du numéro (conservée à tous les états). */
  icon?: LucideIconData;
}

export type StepperOrientation = 'horizontal' | 'vertical';
export type StepperLabelPlacement = 'bottom' | 'end';
export type StepperVariant = 'filled' | 'outline';

type StepState = 'done' | 'current' | 'upcoming';

const INDICATOR_BASE =
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-md border font-sans text-sm font-medium ' +
  'transition-colors duration-fast';

const INDICATOR: Record<StepperVariant, Record<StepState, string>> = {
  filled: {
    done: 'border-banda-primary bg-banda-primary text-banda-primary-contrast',
    current: 'border-banda-primary bg-banda-primary text-banda-primary-contrast shadow-sm',
    upcoming: 'border-banda-border bg-banda-surface text-banda-text-muted',
  },
  outline: {
    done: 'border-banda-primary bg-transparent text-banda-primary',
    current: 'border-banda-primary bg-transparent text-banda-primary shadow-sm',
    upcoming: 'border-banda-border bg-transparent text-banda-text-muted',
  },
};

@Component({
  selector: 'banda-stepper',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule, NgTemplateOutlet],
  template: `
    @if (orientation() === 'vertical') {
      <ol [attr.aria-label]="ariaLabel()" class="m-0 flex list-none flex-col p-0">
        @for (step of steps(); track $index; let last = $last) {
          <li [attr.aria-current]="stateOf($index) === 'current' ? 'step' : null" class="flex gap-3">
            <span class="flex flex-col items-center">
              <span aria-hidden="true" [class]="indicatorClass($index)">
                @if (step.icon) { <lucide-angular [img]="step.icon" [size]="14" /> }
                @else if (stateOf($index) === 'done') { <lucide-angular [img]="Check" [size]="14" /> }
                @else { {{ $index + 1 }} }
              </span>
              @if (!last) {
                <span aria-hidden="true" [class]="'min-h-6 w-px flex-1 ' + connectorClass(connectorDone($index + 1))"></span>
              }
            </span>
            <span [class]="last ? 'pb-0' : 'pb-6'">
              <ng-container *ngTemplateOutlet="textsTpl; context: { $implicit: step, state: stateOf($index), centered: false }" />
              @if (stateOf($index) !== 'upcoming') {
                <span class="sr-only">{{ stateOf($index) === 'done' ? '(étape terminée)' : '(étape courante)' }}</span>
              }
            </span>
          </li>
        }
      </ol>
    } @else if (labelPlacement() === 'end') {
      <ol [attr.aria-label]="ariaLabel()" class="m-0 flex w-full list-none items-center gap-2 p-0">
        @for (step of steps(); track $index; let last = $last) {
          <li [attr.aria-current]="stateOf($index) === 'current' ? 'step' : null" [class]="'flex items-center gap-2 ' + (last ? '' : 'flex-1')">
            <span aria-hidden="true" [class]="indicatorClass($index)">
              @if (step.icon) { <lucide-angular [img]="step.icon" [size]="14" /> }
              @else if (stateOf($index) === 'done') { <lucide-angular [img]="Check" [size]="14" /> }
              @else { {{ $index + 1 }} }
            </span>
            <ng-container *ngTemplateOutlet="textsTpl; context: { $implicit: step, state: stateOf($index), centered: false }" />
            @if (stateOf($index) !== 'upcoming') {
              <span class="sr-only">{{ stateOf($index) === 'done' ? '(étape terminée)' : '(étape courante)' }}</span>
            }
            @if (!last) {
              <span aria-hidden="true" [class]="'h-px min-w-6 flex-1 ' + connectorClass(connectorDone($index + 1))"></span>
            }
          </li>
        }
      </ol>
    } @else {
      <ol [attr.aria-label]="ariaLabel()" class="m-0 flex w-full list-none items-start p-0">
        @for (step of steps(); track $index; let first = $first; let last = $last) {
          <li [attr.aria-current]="stateOf($index) === 'current' ? 'step' : null" class="flex flex-1 flex-col items-center gap-2">
            <span class="flex w-full items-center">
              <span aria-hidden="true" [class]="'h-px flex-1 ' + (first ? 'bg-transparent' : connectorClass(connectorDone($index)))"></span>
              <span aria-hidden="true" [class]="indicatorClass($index)">
                @if (step.icon) { <lucide-angular [img]="step.icon" [size]="14" /> }
                @else if (stateOf($index) === 'done') { <lucide-angular [img]="Check" [size]="14" /> }
                @else { {{ $index + 1 }} }
              </span>
              <span aria-hidden="true" [class]="'h-px flex-1 ' + (last ? 'bg-transparent' : connectorClass(connectorDone($index + 1)))"></span>
            </span>
            <ng-container *ngTemplateOutlet="textsTpl; context: { $implicit: step, state: stateOf($index), centered: true }" />
            @if (stateOf($index) !== 'upcoming') {
              <span class="sr-only">{{ stateOf($index) === 'done' ? '(étape terminée)' : '(étape courante)' }}</span>
            }
          </li>
        }
      </ol>
    }

    <ng-template #textsTpl let-step let-state="state" let-centered="centered">
      @if (step.label || step.description) {
        <span [class]="'flex flex-col gap-0.5' + (centered ? ' items-center text-center' : '')">
          @if (step.label) {
            <span [class]="'font-sans text-sm font-medium ' + (state === 'upcoming' ? 'text-banda-text-muted' : 'text-banda-text')">
              {{ step.label }}
            </span>
          }
          @if (step.description) {
            <span class="font-sans text-xs text-banda-text-muted">{{ step.description }}</span>
          }
        </span>
      }
    </ng-template>
  `,
})
export class BandaStepperComponent {
  readonly steps = input.required<readonly StepperStep[]>();
  /** Étape courante (1-indexée). */
  readonly current = input.required<number>();
  readonly orientation = input<StepperOrientation>('horizontal');
  readonly labelPlacement = input<StepperLabelPlacement>('bottom');
  readonly variant = input<StepperVariant>('filled');
  readonly ariaLabel = input<string>('Étapes');

  protected readonly Check = Check;
  protected readonly currentIndex = computed(() => this.current() - 1);

  protected stateOf(index: number): StepState {
    const ci = this.currentIndex();
    return index < ci ? 'done' : index === ci ? 'current' : 'upcoming';
  }

  protected connectorDone(index: number): boolean {
    return index <= this.currentIndex();
  }

  protected connectorClass(done: boolean): string {
    return done ? 'bg-banda-primary' : 'bg-banda-border';
  }

  protected indicatorClass(index: number): string {
    return `${INDICATOR_BASE} ${INDICATOR[this.variant()][this.stateOf(index)]}`;
  }
}
