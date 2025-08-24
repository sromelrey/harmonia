import React from "react";
import { RowId, TableHeaderProps } from "./types";
import {
  TableHeader as UITableHeader,
  TableRow as UITableRow,
  TableHead as UITableHead,
} from "@/components/ui/table";
import { ChevronsUpDown, ChevronsDown, ChevronsUp } from "lucide-react";
import { flexRender } from "@tanstack/react-table";
import { getHeaderCellClassNames } from "./utils";

export default function TableHeader<T extends { id: RowId }>({
  table,
  isSub,
  hasColumnFilter,
}: TableHeaderProps<T>) {
  return (
    <>
      <UITableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <UITableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const isSorted = header.column.getIsSorted(); // Get sort state of column
              const isSortedDesc = isSorted === "desc";
              return (
                <UITableHead
                  key={header.id}
                  className={`cursor-pointer p-1 text-left text-[12px] text-[#222222] ${
                    header.column.columnDef.header === "QTY" ? "w-[55px]" : ""
                  } ${getHeaderCellClassNames(header)} ${
                    isSub ? "h-auto" : "h-10"
                  } `}
                  onClick={(event) => {
                    if (hasColumnFilter) return;

                    const toggleSortingHandler =
                      header.column.getToggleSortingHandler();

                    if (toggleSortingHandler) {
                      toggleSortingHandler(event);
                    }
                  }}
                  {...(header.column.columnDef.minSize !== 20
                    ? {
                        style: {
                          width: `${header.column.columnDef.minSize}px`,
                        },
                      }
                    : {})}
                >
                  <div
                    className={`${isSub ? "font-[500]" : "font-bold"} relative`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <span className={`absolute`}>
                      {header.column.columnDef.enableSorting ? (
                        isSorted ? (
                          isSortedDesc ? (
                            <ChevronsDown
                              size='12'
                              className='mx-1 inline-block'
                            />
                          ) : (
                            <ChevronsUp
                              size='12'
                              className='mx-1 inline-block'
                            />
                          )
                        ) : (
                          <ChevronsUpDown
                            size='12'
                            className='mx-1 inline-block'
                          />
                        )
                      ) : null}
                    </span>
                  </div>
                </UITableHead>
              );
            })}
          </UITableRow>
        ))}
      </UITableHeader>
    </>
  );
}
