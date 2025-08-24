"use client";

import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

interface TableProps<T> {
  data: T[];
  isDisabled: boolean;
  columns: ColumnDef<T>[];
  onAddRow: (e: any) => void;
  showAddRowButton?: boolean;
}

export default function Table<T>({
  data,
  isDisabled,
  columns,
  onAddRow,
  showAddRowButton = true,
}: TableProps<T>) {
  const table = useReactTable({
    data: data,
    columns: columns as ColumnDef<any>[],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='max-w-full'>
      <div className='border rounded-lg shadow-sm overflow-hidden'>
        <TableComponent>
          <TableHeader className='bg-[#efefef] text-[#222222]'>
            {/* Render header groups provided by TanStack Table */}
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className='bg-[#efefef] text-[#222222]'
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`font-semibold text-gray-700 dark:text-gray-300 border-b border-r border-gray-200 last:border-r-0`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className='hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`text-gray-800 dark:text-gray-200 border-b border-r border-gray-200 last:border-r-0 ${
                        (cell.column.columnDef as any).isRightAligned
                          ? "text-right"
                          : ""
                      } ${
                        (cell.column.columnDef as any).accessorKey === "item_no"
                          ? "font-medium text-gray-900 dark:text-gray-100"
                          : ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-10 text-center text-gray-500 dark:text-gray-400'
                >
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableComponent>
      </div>
      {showAddRowButton && (
        <div className='flex justify-start mt-2'>
          <Button
            onClick={onAddRow}
            className='bg-white text-black hover:bg-slate-400 '
            disabled={isDisabled}
          >
            <CirclePlus className='mr-2 h-4 w-4' /> {/* Lucide Plus icon */}
            Add Row
          </Button>
        </div>
      )}
    </div>
  );
}
