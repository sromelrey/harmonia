import { ColumnDef, Table } from "@tanstack/react-table";

export type PaginationMode = "pagination" | "infinite-scroll" | "none";
export type RowId = string | number;

export interface BaseRow {
  id: RowId;
}
export interface DataTableProps<T extends BaseRow = BaseRow> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  hasColumnFilter?: boolean;
  showCheckbox?: boolean;
  onRowSelect?: (selectedRowIds: Set<RowId>) => void;
  paginationMode?: PaginationMode;
  pagination?: {
    page: number;
    totalPages: number;
    totalResults?: number;
    onPageChange?: (page: number) => void;
  };
  infiniteScrollOptions?: {
    onLoadMore?: () => void;
    hasMore?: boolean;
  };
  isScrollable?: boolean;
  actionRenderer?: (row: T) => React.ReactNode;
  subTableConfig?: {
    columns: ColumnDef<any>[];
    getSubRows: (row: T) => any[];
  };
  renderSubTable?: (row: T) => React.ReactNode;
  truncated?: boolean;
  isSub?: boolean;
  getRowId?: (originalRow: T) => RowId; // optional override
  handleLoadMore?: () => void;
}

export interface TableHeaderProps<T extends BaseRow = BaseRow> {
  table: Table<T>;
  className?: string;
  isLoading?: boolean;
  isSub?: boolean;
  hasColumnFilter?: boolean;
}

export interface TableBodyProps<T extends BaseRow = BaseRow> {
  table: Table<T>;
  className?: string;
  isLoading?: boolean;
  selectedRows: Set<RowId>;
  expandedRows: Set<RowId>;
  truncated?: boolean;
  hasColumnFilter?: boolean;
  renderSubTable?: (row: T) => React.ReactNode;
  toggleRowExpansion?: (rowId: RowId) => void;
  isSub?: boolean;
}
