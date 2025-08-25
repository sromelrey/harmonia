// Re-export the main DataTable component
import DataTableComponent from "./data-table";
export { DataTableComponent as DataTable };

// Re-export DataTableActions component
export { default as DataTableActions } from "./data-table-actions";

// Re-export types
export type {
  BaseRow,
  DataTableProps,
  DataTableCrudActions,
  ActionButtonConfig,
  PaginationMode,
  RowId,
  TableHeaderProps,
  TableBodyProps,
} from "./types";

// Re-export the hook
export { useDataTable } from "./useDataTable";

// Re-export utility functions
export {
  getBaseCellClassNames,
  getHeaderCellClassNames,
  getBodyCellClassNames,
  setCellBorder,
  setCellAlignment,
} from "./utils";
