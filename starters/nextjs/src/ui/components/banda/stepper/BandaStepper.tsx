import type { ReactNode } from 'react';
import { Check, type LucideIcon } from 'lucide-react';

export interface StepperStep {
  label?: ReactNode;
  description?: string;
  /** Icône Lucide à la place du numéro (conservée à tous les états). */
  icon?: LucideIcon;
}

export type StepperOrientation = 'horizontal' | 'vertical';
export type StepperLabelPlacement = 'bottom' | 'end';
export type StepperVariant = 'filled' | 'outline';

export interface BandaStepperProps {
  steps: readonly StepperStep[];
  /** Étape courante (1-indexée) — les précédentes sont marquées terminées. */
  current: number;
  orientation?: StepperOrientation;
  /** Textes sous l'indicateur ou à côté. @default 'bottom' */
  labelPlacement?: StepperLabelPlacement;
  variant?: StepperVariant;
  /** Libellé accessible de la liste d'étapes. @default 'Étapes' */
  'aria-label'?: string;
  className?: string;
}

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

function Indicator({
  step,
  index,
  state,
  variant,
}: {
  step: StepperStep;
  index: number;
  state: StepState;
  variant: StepperVariant;
}) {
  const Icon = step.icon ?? (state === 'done' ? Check : undefined);
  return (
    <span aria-hidden="true" className={`${INDICATOR_BASE} ${INDICATOR[variant][state]}`}>
      {Icon ? <Icon size={14} /> : index + 1}
    </span>
  );
}

function StepTexts({ step, state, centered }: { step: StepperStep; state: StepState; centered: boolean }) {
  if (!step.label && !step.description) return null;
  return (
    <span className={['flex flex-col gap-0.5', centered ? 'items-center text-center' : ''].filter(Boolean).join(' ')}>
      {step.label ? (
        <span
          className={[
            'font-sans text-sm font-medium',
            state === 'upcoming' ? 'text-banda-text-muted' : 'text-banda-text',
          ].join(' ')}
        >
          {step.label}
        </span>
      ) : null}
      {step.description ? (
        <span className="font-sans text-xs text-banda-text-muted">{step.description}</span>
      ) : null}
    </span>
  );
}

/** Texte d'état pour les lecteurs d'écran — l'indication visuelle ne suffit pas. */
function StepStatus({ state }: { state: StepState }) {
  if (state === 'upcoming') return null;
  return <span className="sr-only">{state === 'done' ? '(étape terminée)' : '(étape courante)'}</span>;
}

/**
 * Étend <ol> natif — fil d'étapes accessible : aria-current="step" sur
 * l'étape courante, état terminé annoncé en sr-only, connecteurs décoratifs.
 */
export function BandaStepper({
  steps,
  current,
  orientation = 'horizontal',
  labelPlacement = 'bottom',
  variant = 'filled',
  'aria-label': ariaLabel = 'Étapes',
  className,
}: BandaStepperProps) {
  const currentIndex = current - 1;
  const stateOf = (index: number): StepState =>
    index < currentIndex ? 'done' : index === currentIndex ? 'current' : 'upcoming';
  /** Le segment qui PRÉCÈDE l'étape `index` est franchi quand l'étape est atteinte. */
  const connectorDone = (index: number) => index <= currentIndex;
  const connectorClass = (done: boolean) =>
    done ? 'bg-banda-primary' : 'bg-banda-border';

  if (orientation === 'vertical') {
    return (
      <ol aria-label={ariaLabel} className={['m-0 flex list-none flex-col p-0', className].filter(Boolean).join(' ')}>
        {steps.map((step, index) => {
          const state = stateOf(index);
          const last = index === steps.length - 1;
          return (
            <li
              key={index}
              aria-current={state === 'current' ? 'step' : undefined}
              className="flex gap-3"
            >
              <span className="flex flex-col items-center">
                <Indicator step={step} index={index} state={state} variant={variant} />
                {!last ? (
                  <span
                    aria-hidden="true"
                    className={`min-h-6 w-px flex-1 ${connectorClass(connectorDone(index + 1))}`}
                  />
                ) : null}
              </span>
              <span className={last ? 'pb-0' : 'pb-6'}>
                <StepTexts step={step} state={state} centered={false} />
                <StepStatus state={state} />
              </span>
            </li>
          );
        })}
      </ol>
    );
  }

  if (labelPlacement === 'end') {
    return (
      <ol aria-label={ariaLabel} className={['m-0 flex w-full list-none items-center gap-2 p-0', className].filter(Boolean).join(' ')}>
        {steps.map((step, index) => {
          const state = stateOf(index);
          const last = index === steps.length - 1;
          return (
            <li
              key={index}
              aria-current={state === 'current' ? 'step' : undefined}
              className={['flex items-center gap-2', last ? '' : 'flex-1'].filter(Boolean).join(' ')}
            >
              <Indicator step={step} index={index} state={state} variant={variant} />
              <StepTexts step={step} state={state} centered={false} />
              <StepStatus state={state} />
              {!last ? (
                <span
                  aria-hidden="true"
                  className={`h-px min-w-6 flex-1 ${connectorClass(connectorDone(index + 1))}`}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol aria-label={ariaLabel} className={['m-0 flex w-full list-none items-start p-0', className].filter(Boolean).join(' ')}>
      {steps.map((step, index) => {
        const state = stateOf(index);
        const first = index === 0;
        const last = index === steps.length - 1;
        return (
          <li
            key={index}
            aria-current={state === 'current' ? 'step' : undefined}
            className="flex flex-1 flex-col items-center gap-2"
          >
            <span className="flex w-full items-center">
              <span
                aria-hidden="true"
                className={['h-px flex-1', first ? 'bg-transparent' : connectorClass(connectorDone(index))].join(' ')}
              />
              <Indicator step={step} index={index} state={state} variant={variant} />
              <span
                aria-hidden="true"
                className={['h-px flex-1', last ? 'bg-transparent' : connectorClass(connectorDone(index + 1))].join(' ')}
              />
            </span>
            <StepTexts step={step} state={state} centered />
            <StepStatus state={state} />
          </li>
        );
      })}
    </ol>
  );
}
