/**
 * Hook custom du stepper — encapsule la navigation entre étapes
 * (pattern « hooks custom » du starter, cf. useTheme / useToast).
 */
import { useCallback, useMemo, useState } from 'react';

export interface StepperApi {
  /** Étape courante (1-indexée). */
  current: number;
  isFirst: boolean;
  isLast: boolean;
  next: () => void;
  back: () => void;
  goTo: (step: number) => void;
}

export function useStepper(stepCount: number, initialStep = 1): StepperApi {
  const clamp = useCallback(
    (step: number) => Math.min(Math.max(step, 1), stepCount),
    [stepCount],
  );
  const [current, setCurrent] = useState(() => clamp(initialStep));

  const next = useCallback(() => setCurrent((step) => clamp(step + 1)), [clamp]);
  const back = useCallback(() => setCurrent((step) => clamp(step - 1)), [clamp]);
  const goTo = useCallback((step: number) => setCurrent(clamp(step)), [clamp]);

  return useMemo(
    () => ({
      current,
      isFirst: current === 1,
      isLast: current === stepCount,
      next,
      back,
      goTo,
    }),
    [current, stepCount, next, back, goTo],
  );
}
