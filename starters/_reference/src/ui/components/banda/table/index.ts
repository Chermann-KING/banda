/**
 * Atome table — pattern modulaire Banda :
 *   table/BandaTable.tsx (base composée) + models/ (un modèle = une intention) + index.
 */
export {
  BandaTable,
  type BandaTableCellProps,
  type BandaTableHeaderProps,
  type BandaTableProps,
  type BandaTableRowProps,
  type TableAlign,
} from './BandaTable';
export {
  DataTable,
  type DataTableColumn,
  type DataTableFooter,
  type DataTableProps,
} from './models/data-table';
export { TablePagination, type TablePaginationProps } from './models/table-pagination';
