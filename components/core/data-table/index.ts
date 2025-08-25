// Re-export the main DataTable component
export { default as DataTable } from "./data-table";

// Re-export types
export type {
  BaseRow,
  DataTableProps,
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
