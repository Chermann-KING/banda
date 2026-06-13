/**
 * Tableau sémantique — pattern composé via sous-composants :
 * BandaTableHead / Body / Foot / Row / Header / Cell / Caption.
 * Enveloppé d'un conteneur défilable horizontal.
 */
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type TableAlign = 'start' | 'center' | 'end';

const ALIGN: Record<TableAlign, string> = {
  start: 'text-left',
  center: 'text-center',
  end: 'text-right',
};

// ─── Conteneur + <table> ──────────────────────────────────────────────────────

@Component({
  selector: 'banda-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="'w-full overflow-x-auto ' + (containerClassName() ?? '')">
      <table [class]="'w-full caption-bottom border-collapse font-sans text-sm ' + (className() ?? '')">
        <ng-content />
      </table>
    </div>
  `,
})
export class BandaTableComponent {
  readonly containerClassName = input<string | undefined>(undefined);
  readonly className = input<string | undefined>(undefined);
}

// ─── <caption> ────────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-table-caption',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <caption [class]="'mt-3 text-xs text-banda-text-muted ' + (className() ?? '')">
      <ng-content />
    </caption>
  `,
})
export class BandaTableCaptionComponent {
  readonly className = input<string | undefined>(undefined);
}

// ─── <thead> ──────────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-table-head',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<thead [class]="className()"><ng-content /></thead>`,
})
export class BandaTableHeadComponent {
  readonly className = input<string>('');
}

// ─── <tbody> ──────────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-table-body',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<tbody [class]="className()"><ng-content /></tbody>`,
})
export class BandaTableBodyComponent {
  readonly className = input<string>('');
}

// ─── <tfoot> ──────────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-table-foot',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <tfoot [class]="'border-t border-banda-border bg-banda-surface-muted font-medium ' + className()">
      <ng-content />
    </tfoot>
  `,
})
export class BandaTableFootComponent {
  readonly className = input<string>('');
}

// ─── <tr> ─────────────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-table-row',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <tr
      [class]="
        'border-b border-banda-border transition-colors duration-fast ' +
        (selected() ? 'bg-banda-primary-muted' : 'hover:bg-banda-surface-muted') + ' ' +
        className()
      "
    >
      <ng-content />
    </tr>
  `,
})
export class BandaTableRowComponent {
  /** Rangée sélectionnée (fond accentué). */
  readonly selected = input<boolean>(false);
  readonly className = input<string>('');
}

// ─── <th scope="col"> ─────────────────────────────────────────────────────────

@Component({
  selector: 'banda-table-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <th
      scope="col"
      [class]="'h-10 px-3 align-middle text-xs font-medium text-banda-text-muted ' + alignClass() + ' ' + className()"
    >
      <ng-content />
    </th>
  `,
})
export class BandaTableHeaderComponent {
  readonly align = input<TableAlign>('start');
  readonly className = input<string>('');

  protected alignClass(): string {
    return ALIGN[this.align()];
  }
}

// ─── <td> ─────────────────────────────────────────────────────────────────────

@Component({
  selector: 'banda-table-cell',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <td
      [class]="
        'px-3 py-3 align-middle text-banda-text ' +
        alignClass() + ' ' +
        (numeric() ? 'tabular-nums ' : '') +
        className()
      "
    >
      <ng-content />
    </td>
  `,
})
export class BandaTableCellComponent {
  readonly align = input<TableAlign | undefined>(undefined);
  /** Valeur numérique : chiffres tabulaires, alignée à droite. */
  readonly numeric = input<boolean>(false);
  readonly className = input<string>('');

  protected alignClass(): string {
    return ALIGN[this.align() ?? (this.numeric() ? 'end' : 'start')];
  }
}
