import * as React$1 from 'react';
import React__default from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { FieldValues, UseFormReturn, SubmitHandler } from 'react-hook-form';
import { ColumnDef, Table as Table$1, Header, Cell } from '@tanstack/react-table';
import * as use_debounce from 'use-debounce';

interface ComboBoxItem {
    id: string | number;
    label: string;
    value: string;
    [key: string]: any;
}
interface ComboBoxProps {
    items?: ComboBoxItem[];
    value?: ComboBoxItem | null;
    onSelect?: (item: ComboBoxItem | null) => void;
    placeholder?: string;
    onSearch?: (query: string, page: number) => Promise<{
        items: ComboBoxItem[];
        hasMore: boolean;
        total?: number;
    }>;
    searchDebounceMs?: number;
    initialPageSize?: number;
    label?: string;
    disabled?: boolean;
    required?: boolean;
    clearable?: boolean;
    multiSelect?: boolean;
    selectedItems?: ComboBoxItem[];
    onMultiSelect?: (items: ComboBoxItem[]) => void;
    itemHeight?: number;
    maxHeight?: number;
    className?: string;
    inputClassName?: string;
    dropdownClassName?: string;
    renderItem?: (item: ComboBoxItem, isSelected: boolean) => React__default.ReactNode;
    renderSelected?: (item: ComboBoxItem) => React__default.ReactNode;
    noResultsMessage?: string;
    loadingMessage?: string;
}
declare const ComboBox: React__default.FC<ComboBoxProps>;

type InputType = "text" | "email" | "password" | "number";
interface InputFieldProps {
    label?: string;
    value: string;
    name: string;
    onChange: (value: string) => void;
    type?: InputType;
    placeholder?: string;
    direction?: "row" | "column";
    disabled?: boolean;
    required?: boolean;
    isTextarea?: boolean;
    description?: string;
    hint?: string;
    leftIcon?: React__default.ReactNode;
    rightIcon?: React__default.ReactNode;
    clearable?: boolean;
    containerClassName?: string;
    className?: string;
}
declare function InputField({ label, value, name, onChange, type, placeholder, direction, disabled, required, isTextarea, description, hint, leftIcon, rightIcon, clearable, containerClassName, className, }: InputFieldProps): react_jsx_runtime.JSX.Element;

interface SelectOption {
    value: string;
    label: string;
}
interface SelectProps {
    value: string;
    onValueChange: (newValue: string) => void;
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
}
/**
 * A reusable Select component for rendering a selectable value in a table or form.
 * Now expects options as array of { value, label }.
 */
declare function Select({ value, onValueChange, options, placeholder, disabled, }: SelectProps): react_jsx_runtime.JSX.Element;

type FormProps<TFieldValues extends FieldValues = FieldValues> = {
    form: UseFormReturn<TFieldValues>;
    onSubmit?: SubmitHandler<TFieldValues>;
    children: React$1.ReactNode;
} & Omit<React$1.ComponentProps<"form">, "onSubmit">;
declare function Form<TFieldValues extends FieldValues = FieldValues>({ form, onSubmit, children, ...formProps }: FormProps<TFieldValues>): react_jsx_runtime.JSX.Element;

type PaginationMode = "pagination" | "infinite-scroll" | "none";
type RowId$1 = string | number;
interface BaseRow {
    id: RowId$1;
}
interface DataTableProps<T extends BaseRow = BaseRow> {
    data: T[];
    columns: ColumnDef<T>[];
    isLoading?: boolean;
    hasColumnFilter?: boolean;
    showCheckbox?: boolean;
    onRowSelect?: (selectedRowIds: Set<RowId$1>) => void;
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
    getRowId?: (originalRow: T) => RowId$1;
    handleLoadMore?: () => void;
}
interface TableHeaderProps<T extends BaseRow = BaseRow> {
    table: Table$1<T>;
    className?: string;
    isLoading?: boolean;
    isSub?: boolean;
    hasColumnFilter?: boolean;
}
interface TableBodyProps<T extends BaseRow = BaseRow> {
    table: Table$1<T>;
    className?: string;
    isLoading?: boolean;
    selectedRows: Set<RowId$1>;
    expandedRows: Set<RowId$1>;
    truncated?: boolean;
    hasColumnFilter?: boolean;
    renderSubTable?: (row: T) => React.ReactNode;
    toggleRowExpansion?: (rowId: RowId$1) => void;
    isSub?: boolean;
}

declare function DataTable<T extends BaseRow>(props: DataTableProps<T>): react_jsx_runtime.JSX.Element;

type RowId = string | number;
declare function useDataTable<T extends {
    id: RowId;
}>(data: T[], paginationMode?: "pagination" | "infinite-scroll" | "none"): {
    selectedRows: Set<RowId>;
    expandedRows: Set<RowId>;
    toggleRowSelection: (rowId: RowId) => void;
    toggleRowExpansion: use_debounce.DebouncedState<(rowId: RowId) => void>;
    toggleSelectAll: () => void;
    page: number;
    limit: number;
    hasMore: boolean;
    setHasMore: React$1.Dispatch<React$1.SetStateAction<boolean>>;
    handlePageChange: (newPage: number) => void;
};

/**
 * Generates shared base Tailwind class names for a table cell
 * based on its column ID, label value, minSize, and whether column filtering is active.
 *
 * @param id - The column's unique ID.
 * @param label - The header label or accessor key used for text alignment detection.
 * @param minSize - The column's minimum size, if defined.
 * @param hasColumnFilter - Whether column filtering is active (affects padding logic).
 * @returns A combined className string for styling the cell.
 */
declare function getBaseCellClassNames(id: string | undefined, label: string | undefined, minSize?: number, hasColumnFilter?: boolean): string;
/**
 * Generates class names specifically for header cells,
 * reusing base logic but incorporating `hasColumnFilter` context.
 *
 * @param header - The TanStack Header object.
 * @param hasColumnFilter - Whether column filtering is active.
 * @returns A className string for styling the header cell.
 */
declare function getHeaderCellClassNames<T>(header: Header<T, unknown>, hasColumnFilter?: boolean): string;
/**
 * Generates class names specifically for body cells in the table.
 * Uses only ID and header label for alignment and width styling.
 *
 * @param cell - The TanStack Cell object.
 * @returns A className string for styling the body cell.
 */
declare function getBodyCellClassNames<T>(cell: Cell<T, unknown>): string;
declare function setCellBorder(length: number, index: number): "border-b-0" | "border-b";
declare function setCellAlignment(key: string): "" | "text-left";

interface TableProps<T> {
    data: T[];
    isDisabled: boolean;
    columns: ColumnDef<T>[];
    onAddRow: (e: any) => void;
    showAddRowButton?: boolean;
}
declare function Table<T>({ data, isDisabled, columns, onAddRow, showAddRowButton, }: TableProps<T>): react_jsx_runtime.JSX.Element;

export { type BaseRow, ComboBox, DataTable, type DataTableProps, Form, InputField as Input, type PaginationMode, type RowId$1 as RowId, Select, Table, type TableBodyProps, type TableHeaderProps, getBaseCellClassNames, getBodyCellClassNames, getHeaderCellClassNames, setCellAlignment, setCellBorder, useDataTable };
