/**
 * Modèles décoratifs : label chevauchant le contour, label inset.
 * Composent BandaSelect — aucun popup natif, tout reste 100 % tokens.
 */
import { BandaSelect, type BandaSelectProps } from '../BandaSelect';

export interface DecoratedSelectProps extends Omit<BandaSelectProps, 'hideLabel'> {
  label: string;
}

/** Label posé sur le contour du champ (overlapping). */
export function OverlappingLabelSelect({ label, className, ...rest }: DecoratedSelectProps) {
  return (
    <div className={['relative', className].filter(Boolean).join(' ')}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-2 left-2 z-sticky bg-banda-surface px-1 font-sans text-xs font-medium text-banda-text-muted"
      >
        {label}
      </span>
      <BandaSelect label={label} hideLabel {...rest} />
    </div>
  );
}

/** Label inset : à l'intérieur du déclencheur, au-dessus de la valeur. */
export function InsetLabelSelect({ label, triggerClassName, className, ...rest }: DecoratedSelectProps) {
  return (
    <div className={['relative', className].filter(Boolean).join(' ')}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-2 z-sticky font-sans text-xs font-medium text-banda-text-muted"
      >
        {label}
      </span>
      <BandaSelect
        label={label}
        hideLabel
        // `!` requis : le déclencheur porte déjà h-10/items-center (field-control),
        // qui gagneraient sinon par ordre d'émission dans la feuille Tailwind.
        triggerClassName={['!h-14 !items-end pb-2', triggerClassName].filter(Boolean).join(' ')}
        {...rest}
      />
    </div>
  );
}
