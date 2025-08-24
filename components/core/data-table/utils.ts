import type { Header, Cell } from "@tanstack/react-table";

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
export function getBaseCellClassNames(
  id: string | undefined,
  label: string | undefined,
  minSize?: number,
  hasColumnFilter?: boolean
) {
  const base = "p-1 text-[12px] text-[#222222]";

  const textAlign =
    typeof label === "string" && label.toLowerCase().includes("qty")
      ? "text-right"
      : "text-left";
  const padding = hasColumnFilter ? "" : "pr-[18px]";

  const widthClass = (() => {
    if (id === "select") return "w-[30px]";
    if (id === "actions") return "w-[80px]";
    if (minSize && minSize !== 20) return `w-[${minSize}px]`;
    return "";
  })();

  return [base, padding, textAlign, widthClass].join(" ").trim();
}

/**
 * Generates class names specifically for header cells,
 * reusing base logic but incorporating `hasColumnFilter` context.
 *
 * @param header - The TanStack Header object.
 * @param hasColumnFilter - Whether column filtering is active.
 * @returns A className string for styling the header cell.
 */
export function getHeaderCellClassNames<T>(
  header: Header<T, unknown>,
  hasColumnFilter: boolean = false
) {
  const { id, minSize } = header.column.columnDef;
  const accessorKey = (header.column.columnDef as { accessorKey?: string })
    .accessorKey;
  const headerLabel = header.column.columnDef.header;

  const label = hasColumnFilter ? accessorKey : String(headerLabel);

  return getBaseCellClassNames(id, label, minSize, hasColumnFilter);
}

/**
 * Generates class names specifically for body cells in the table.
 * Uses only ID and header label for alignment and width styling.
 *
 * @param cell - The TanStack Cell object.
 * @returns A className string for styling the body cell.
 */
export function getBodyCellClassNames<T>(cell: Cell<T, unknown>) {
  const { id, minSize } = cell.column.columnDef;
  const label = cell.column.columnDef.header as string | undefined;

  return getBaseCellClassNames(id, label, minSize);
}

export function setCellBorder(length: number, index: number) {
  return length === index + 1 ? "border-b-0" : "border-b";
}

export function setCellAlignment(key: string) {
  return key.includes("actions") ? "" : "text-left";
}
