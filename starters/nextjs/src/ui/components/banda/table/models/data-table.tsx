/**
 * Tableau piloté par les données : colonnes déclaratives, rendu par cellule,
 * pied de total et sélection de rangées optionnelle (case « tout sélectionner »
 * indéterminée en sélection partielle).
 */
import { useState } from 'react';
import type { ReactNode } from 'react';
import { BandaTable, type TableAlign } from '@/ui/components/banda/table/BandaTable';
import { BandaCheckbox } from '@/ui/components/banda/checkbox';

export interface DataTableColumn<Row> {
  key: string;
  header: ReactNode;
  align?: TableAlign;
  /** Colonne numérique : chiffres tabulaires, alignée à droite. */
  numeric?: boolean;
  render: (row: Row) => ReactNode;
}

export interface DataTableFooter {
  label: ReactNode;
  value: ReactNode;
}

export interface DataTableProps<Row> {
  columns: readonly DataTableColumn<Row>[];
  rows: readonly Row[];
  /** Clé stable de chaque rangée (id métier). */
  rowKey: (row: Row) => string;
  caption?: string;
  /** Pied : libellé sur toutes les colonnes sauf la dernière, valeur à droite. */
  footer?: DataTableFooter;
  /** Sélection de rangées par cases à cocher. */
  selectable?: boolean;
  /** Mode contrôlé de la sélection. */
  selectedKeys?: readonly string[];
  defaultSelectedKeys?: readonly string[];
  onSelectionChange?: (keys: readonly string[]) => void;
  /** Libellé accessible de la case d'une rangée. */
  selectionLabel?: (row: Row) => string;
  className?: string;
}

export function DataTable<Row>({
  columns,
  rows,
  rowKey,
  caption,
  footer,
  selectable = false,
  selectedKeys,
  defaultSelectedKeys = [],
  onSelectionChange,
  selectionLabel,
  className,
}: DataTableProps<Row>) {
  const [internalKeys, setInternalKeys] = useState<readonly string[]>(defaultSelectedKeys);
  const currentKeys = selectedKeys ?? internalKeys;

  const commit = (next: readonly string[]) => {
    if (selectedKeys === undefined) setInternalKeys(next);
    onSelectionChange?.(next);
  };

  const toggle = (key: string) => {
    commit(
      currentKeys.includes(key)
        ? currentKeys.filter((value) => value !== key)
        : [...currentKeys, key],
    );
  };

  const allKeys = rows.map(rowKey);
  const allChecked = allKeys.length > 0 && allKeys.every((key) => currentKeys.includes(key));
  const someChecked = allKeys.some((key) => currentKeys.includes(key));

  const toggleAll = () => {
    commit(allChecked ? [] : allKeys);
  };

  const columnCount = columns.length + (selectable ? 1 : 0);

  return (
    <BandaTable className={className}>
      {caption ? <BandaTable.Caption>{caption}</BandaTable.Caption> : null}
      <BandaTable.Head>
        <BandaTable.Row className="hover:bg-transparent">
          {selectable ? (
            <BandaTable.Header className="w-10">
              <BandaCheckbox
                label={<span className="sr-only">Tout sélectionner</span>}
                checked={allChecked}
                indeterminate={!allChecked && someChecked}
                onChange={toggleAll}
              />
            </BandaTable.Header>
          ) : null}
          {columns.map((column) => (
            <BandaTable.Header
              key={column.key}
              align={column.align ?? (column.numeric ? 'end' : 'start')}
            >
              {column.header}
            </BandaTable.Header>
          ))}
        </BandaTable.Row>
      </BandaTable.Head>
      <BandaTable.Body>
        {rows.map((row) => {
          const key = rowKey(row);
          const selected = currentKeys.includes(key);
          return (
            <BandaTable.Row key={key} selected={selected}>
              {selectable ? (
                <BandaTable.Cell className="w-10">
                  <BandaCheckbox
                    label={
                      <span className="sr-only">
                        {selectionLabel ? selectionLabel(row) : `Sélectionner ${key}`}
                      </span>
                    }
                    checked={selected}
                    onChange={() => toggle(key)}
                  />
                </BandaTable.Cell>
              ) : null}
              {columns.map((column) => (
                <BandaTable.Cell key={column.key} align={column.align} numeric={column.numeric}>
                  {column.render(row)}
                </BandaTable.Cell>
              ))}
            </BandaTable.Row>
          );
        })}
      </BandaTable.Body>
      {footer ? (
        <BandaTable.Foot>
          <tr>
            <BandaTable.Cell colSpan={columnCount - 1}>{footer.label}</BandaTable.Cell>
            <BandaTable.Cell numeric>{footer.value}</BandaTable.Cell>
          </tr>
        </BandaTable.Foot>
      ) : null}
    </BandaTable>
  );
}
