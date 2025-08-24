/* eslint-disable prettier/prettier */
import { useState, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";

export type RowId = string | number;

export function useDataTable<T extends { id: RowId }>(
  data: T[],
  paginationMode: "pagination" | "infinite-scroll" | "none" = "none"
) {
  const [selectedRows, setSelectedRows] = useState<Set<RowId>>(new Set());
  const [expandedRows, setExpandedRows] = useState<Set<RowId>>(new Set());
  const [page, setPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const toggleRowSelection = useCallback((rowId: RowId) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
      return newSet;
    });
  }, []);

  const toggleRowExpansion = useDebouncedCallback((rowId: RowId) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.clear();
        newSet.add(rowId);
      }
      return newSet;
    });
  }, 100);

  const toggleSelectAll = useCallback(() => {
    setSelectedRows((prev) => {
      return prev.size === data.length
        ? new Set<RowId>()
        : new Set<RowId>(data.map((row) => row.id));
    });
  }, [data]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (paginationMode === "pagination") {
        setPage(newPage);
      }
    },
    [paginationMode]
  );

  return {
    selectedRows,
    expandedRows,
    toggleRowSelection,
    toggleRowExpansion,
    toggleSelectAll,
    page,
    limit,
    hasMore,
    setHasMore,
    handlePageChange,
  };
}
