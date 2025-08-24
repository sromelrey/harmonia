import React, { Fragment } from "react";

import {
  TableBody as UITableBody,
  TableRow as UITableRow,
  TableCell as UITableCell,
} from "@/components/ui/table";
import { ChevronUp, ChevronDown } from "lucide-react";
import { RowId, TableBodyProps } from "./types";
import { flexRender } from "@tanstack/react-table";
import {
  getBodyCellClassNames,
  setCellBorder,
  setCellAlignment,
} from "./utils";

export default function TableBody<T extends { id: RowId }>({
  table,
  selectedRows,
  expandedRows,
  truncated,
  renderSubTable,
  toggleRowExpansion,
  isSub,
}: TableBodyProps<T>) {
  return (
    <UITableBody
      className='rounded-[5px]'
      style={{
        boxShadow: isSub ? "" : "rgb(222, 222, 222) inset 0px 0px 0px 1px",
      }}
    >
      {table.getRowModel().rows.map((row, index) => (
        <Fragment key={row.id}>
          <UITableRow
            key={row.id}
            className={`hover:bg-gray-100 ${setCellBorder(
              table.getRowModel().rows.length,
              index
            )} ${
              selectedRows.has(row.id) || expandedRows.has(row.id)
                ? "bg-[#f0f0f4]"
                : ""
            }`}
          >
            {row.getVisibleCells().map((cell, index) => (
              <UITableCell
                key={cell.id}
                className={`p-1 font-['Stolzl_Book'] text-[12px] text-[#222222] ${
                  truncated ? "truncate" : ""
                } ${
                  expandedRows.has(row.id)
                    ? "background-color: rgb(243 244 246 / var(--tw-bg-opacity))"
                    : ""
                } ${setCellAlignment(cell.id)} ${getBodyCellClassNames(cell)}`}
              >
                <div className='relative'>
                  {renderSubTable && toggleRowExpansion && index === 1 && (
                    <>
                      <span
                        className='absolute left-[-15px] top-[50%] translate-y-[-50%]'
                        onClick={() => toggleRowExpansion(row.id)}
                      >
                        {expandedRows.has(row.id) ? (
                          <ChevronUp size='14' className='mt-[2px]' />
                        ) : (
                          <ChevronDown size='14' className='mt-[2px]' />
                        )}
                      </span>
                    </>
                  )}
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              </UITableCell>
            ))}
          </UITableRow>
          {expandedRows.has(row.id) && renderSubTable && (
            <UITableRow>
              <UITableCell
                colSpan={row.getVisibleCells().length}
                className='bg-gray-50 p-0'
              >
                {renderSubTable(row.original)}
              </UITableCell>
            </UITableRow>
          )}
        </Fragment>
      ))}
    </UITableBody>
  );
}
