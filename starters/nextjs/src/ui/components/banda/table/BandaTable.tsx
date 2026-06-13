import type { ComponentPropsWithRef } from 'react';

export type TableAlign = 'start' | 'center' | 'end';

const ALIGN: Record<TableAlign, string> = {
  start: 'text-left',
  center: 'text-center',
  end: 'text-right',
};

function joinClasses(base: string, className?: string) {
  return [base, className].filter(Boolean).join(' ');
}

export interface BandaTableProps extends ComponentPropsWithRef<'table'> {
  /** Classes du conteneur défilable (largeur max, hauteur…). */
  containerClassName?: string;
}

/**
 * Étend <table> natif — sémantique complète (caption, thead, tbody, tfoot)
 * via le pattern composé : BandaTable.Head / .Body / .Row / .Cell…
 * Le tableau est enveloppé d'un conteneur défilable horizontal.
 */
export function BandaTable({ containerClassName, className, ...rest }: BandaTableProps) {
  return (
    <div className={joinClasses('w-full overflow-x-auto', containerClassName)}>
      <table
        className={joinClasses(
          'w-full caption-bottom border-collapse font-sans text-sm',
          className,
        )}
        {...rest}
      />
    </div>
  );
}

function TableCaption({ className, ...rest }: ComponentPropsWithRef<'caption'>) {
  return <caption className={joinClasses('mt-3 text-xs text-banda-text-muted', className)} {...rest} />;
}

function TableHead({ className, ...rest }: ComponentPropsWithRef<'thead'>) {
  return <thead className={className} {...rest} />;
}

function TableBody({ className, ...rest }: ComponentPropsWithRef<'tbody'>) {
  return <tbody className={className} {...rest} />;
}

function TableFoot({ className, ...rest }: ComponentPropsWithRef<'tfoot'>) {
  return (
    <tfoot
      className={joinClasses('border-t border-banda-border bg-banda-surface-muted font-medium', className)}
      {...rest}
    />
  );
}

interface TableRowProps extends ComponentPropsWithRef<'tr'> {
  /** Rangée sélectionnée (fond accentué). */
  selected?: boolean;
}

function TableRow({ selected = false, className, ...rest }: TableRowProps) {
  return (
    <tr
      className={joinClasses(
        [
          'border-b border-banda-border transition-colors duration-fast',
          selected ? 'bg-banda-primary-muted' : 'hover:bg-banda-surface-muted',
        ].join(' '),
        className,
      )}
      {...rest}
    />
  );
}

interface TableHeaderProps extends Omit<ComponentPropsWithRef<'th'>, 'align'> {
  align?: TableAlign | undefined;
}

function TableHeader({ align = 'start', className, ...rest }: TableHeaderProps) {
  return (
    <th
      scope="col"
      className={joinClasses(
        `h-10 px-3 align-middle text-xs font-medium text-banda-text-muted ${ALIGN[align]}`,
        className,
      )}
      {...rest}
    />
  );
}

interface TableCellProps extends Omit<ComponentPropsWithRef<'td'>, 'align'> {
  align?: TableAlign | undefined;
  /** Valeur numérique : chiffres tabulaires, alignée à droite. */
  numeric?: boolean | undefined;
}

function TableCell({ align, numeric = false, className, ...rest }: TableCellProps) {
  const resolvedAlign = align ?? (numeric ? 'end' : 'start');
  return (
    <td
      className={joinClasses(
        [
          'px-3 py-3 align-middle text-banda-text',
          ALIGN[resolvedAlign],
          numeric ? 'tabular-nums' : '',
        ]
          .filter(Boolean)
          .join(' '),
        className,
      )}
      {...rest}
    />
  );
}

/* Pattern composé : BandaTable.Head / .Body / .Foot / .Row / .Header / .Cell / .Caption */
BandaTable.Caption = TableCaption;
BandaTable.Head = TableHead;
BandaTable.Body = TableBody;
BandaTable.Foot = TableFoot;
BandaTable.Row = TableRow;
BandaTable.Header = TableHeader;
BandaTable.Cell = TableCell;

export type {
  TableCellProps as BandaTableCellProps,
  TableHeaderProps as BandaTableHeaderProps,
  TableRowProps as BandaTableRowProps,
};
