/* eslint-disable  @typescript-eslint/no-unused-vars */

/**
 * CustomTable Component
 *
 * A generic, flexible table component built with TanStack Table and shadcn/ui styling.
 *
 * Features:
 * - Supports row selection with checkboxes
 * - Supports row expansion for nested tables
 * - Sorting integration via TanStack Table
 * - Dynamic column rendering (checkbox, actions, and custom columns)
 *
 * Props:
 * - data: Array of rows conforming to BaseRow (must have id)
 * - columns: Column definitions using TanStack's ColumnDef
 * - showCheckbox: Enables row selection UI
 * - actionRenderer: Function to render custom actions per row
 * - renderSubTable: Function to render nested table rows
 * - subTableConfig: Configuration for expandable rows (alternative to renderSubTable)
 * - isScrollable: Enables horizontal scrolling
 * - hasColumnFilter: Adjusts layout based on column filter usage
 * - getRowId: Optional custom row ID function
 *
 * Notes:
 * - Uses a custom hook (useTable) for managing selection and expansion state
 * - Layout and presentation logic are kept inside the component, while core state logic is handled by the hook
 */

"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox as ShadcnCheckbox } from "@/components/ui/checkbox";

import TableHeader from "./header";
import TableBody from "./body";
import { Table } from "@/components/ui/table";
// import ExpandableTable from "./expandable-table";
import { BaseRow, DataTableProps } from "./types";
import { useDataTable } from "./useDataTable";
import InfiniteScrollFooter from "./infinite-scroll";
import DataTableActions from "./data-table-actions";

const Checkbox = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof ShadcnCheckbox>
>((props, ref) => <ShadcnCheckbox ref={ref} {...props} />);

Checkbox.displayName = "Checkbox";

function DataTable<T extends BaseRow>(props: DataTableProps<T>) {
  const {
    data: initialData,
    columns: initialColumns = [],
    subTableConfig,
    showCheckbox = false,
    isScrollable,
    actionRenderer,
    getRowId,
    renderSubTable,
    hasColumnFilter,
    isSub,
    paginationMode = "none",
    isLoading,
    handleLoadMore,
    className,
    headerClassName,
    bodyClassName,
    crudActions,
  } = props;

  const data = useMemo(() => initialData, [initialData]); // Memoize data
  const memoizedColumns = useMemo(() => initialColumns, [initialColumns]); // Memoize columns
  const [sorting, setSorting] = useState<SortingState>([]);

  const {
    selectedRows,
    toggleSelectAll,
    expandedRows,
    toggleRowSelection,
    toggleRowExpansion,
    hasMore,
  } = useDataTable(data, paginationMode);

  // Create a ref for the "Select All" checkbox
  const selectAllRef = useRef<HTMLButtonElement>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (paginationMode !== "infinite-scroll") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          handleLoadMore?.();
        }
      },
      { root: null, rootMargin: "0px", threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [paginationMode, hasMore, isLoading, handleLoadMore]);

  const dynamicColumns = useMemo(() => {
    const extraColumns: ColumnDef<T, unknown>[] = [];

    if (showCheckbox) {
      extraColumns.push({
        id: "select",
        header: () => (
          <div
            className={`flex justify-center text-center ${
              renderSubTable && "pl-[5px] pr-[15px]"
            }`}
          >
            {!isSub && (
              <Checkbox
                ref={selectAllRef}
                checked={selectedRows.size === data.length && data.length > 0}
                onCheckedChange={toggleSelectAll}
                className='row-checkbox border-[#CBCBCB]'
              />
            )}
          </div>
        ),
        cell: ({ row }) => (
          <div
            className={`flex justify-center text-center ${
              renderSubTable && "pl-[5px] pr-[15px]"
            }`}
          >
            <Checkbox
              checked={selectedRows.has(row.id)}
              onCheckedChange={() => toggleRowSelection(row.id)}
              className='row-checkbox border-[#CBCBCB]'
            />
          </div>
        ),
        size: 50,
      });
    }

    if (actionRenderer) {
      extraColumns.push({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => actionRenderer(row.original),
      });
    }

    return [...extraColumns, ...memoizedColumns];
  }, [
    showCheckbox,
    actionRenderer,
    memoizedColumns,
    renderSubTable,
    isSub,
    selectedRows,
    data.length,
    toggleSelectAll,
    toggleRowSelection,
  ]);

  const table = useReactTable({
    data,
    columns: dynamicColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getRowId: getRowId
      ? (originalRow) => String(getRowId?.(originalRow))
      : undefined,
  });

  // if (subTableConfig) {
  //   return <ExpandableTable {...props} />;
  // }

  return (
    <div className={`${className || ""}`.trim()}>
      {/* CRUD Action Buttons */}
      {crudActions && (
        <DataTableActions
          crudActions={crudActions}
          selectedRows={selectedRows}
          showCheckbox={showCheckbox}
        />
      )}

      {/* Table Container */}
      <div className={`${isScrollable ? "overflow-x-auto" : ""}`}>
        <Table className={`min-w-full table-auto`}>
          <TableHeader
            table={table}
            isSub={isSub}
            hasColumnFilter={hasColumnFilter}
            className={headerClassName}
          />
          <TableBody
            table={table}
            selectedRows={selectedRows}
            expandedRows={expandedRows}
            renderSubTable={renderSubTable}
            isSub={isSub}
            toggleRowExpansion={toggleRowExpansion}
            className={bodyClassName}
          />
        </Table>
        {paginationMode === "infinite-scroll" && (
          <InfiniteScrollFooter
            isLoading={isLoading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
          />
        )}
        {/* // TODO: Will implement this on other component that uses pagination */}
        {/* {paginationMode === "pagination" && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )} */}
        {paginationMode === "infinite-scroll" && <div ref={loadMoreRef} />}
      </div>
    </div>
  );
}

export default DataTable;
