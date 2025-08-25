import { ColumnDef, Table } from "@tanstack/react-table";

export type PaginationMode = "pagination" | "infinite-scroll" | "none";
export type RowId = string | number;

export interface BaseRow {
  id: RowId;
}
export interface ActionButtonConfig {
  label?: string;
  icon?: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export interface DataTableCrudActions {
  onAdd?: () => void;
  onDeleteSelected?: (selectedRowIds: Set<RowId>) => void;
  onRefresh?: () => void;

  // New button configuration objects
  addButton?: ActionButtonConfig;
  deleteButton?: ActionButtonConfig;
  refreshButton?: ActionButtonConfig;

  // Legacy support (deprecated but maintained for backward compatibility)
  addButtonTitle?: string;
  deleteButtonTitle?: string;
  refreshButtonTitle?: string;

  // Sheet configuration
  addSheetTitle?: string;
  addSheetDescription?: string;
  renderAddContent?: () => React.ReactNode;

  // Sheet action buttons
  renderSheetActions?: () => React.ReactNode;
  onSave?: () => void;
  onCancel?: () => void;

  // Sheet width configuration
  sheetWidth?: string; // e.g., "50%", "60vw", "800px", "w-1/2"
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
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  crudActions?: DataTableCrudActions;
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
