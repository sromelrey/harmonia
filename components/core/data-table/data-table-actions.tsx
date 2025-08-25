"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, RefreshCw } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DataTableCrudActions } from "./types";
import { RowId } from "./types";
import { SheetClose } from "@/components/ui/sheet";

interface DataTableActionsProps {
  crudActions: DataTableCrudActions;
  selectedRows: Set<RowId>;
  showCheckbox?: boolean;
}

export default function DataTableActions({
  crudActions,
  selectedRows,
  showCheckbox = false,
}: DataTableActionsProps) {
  const hasSelectedRows = selectedRows.size > 0;

  // Generate sheet width with inline styles to override Shadcn defaults
  const getSheetWidthStyles = (width?: string) => {
    if (!width) {
      return {
        width: "50vw",
        minWidth: "400px",
        maxWidth: "800px",
      };
    }

    // If it's a percentage, convert to vw and add constraints
    if (width.endsWith("%")) {
      const percentage = width.replace("%", "");
      return {
        width: `${percentage}vw`,
        minWidth: "400px",
        maxWidth: "90vw",
      };
    }

    // If it's pixel value
    if (width.includes("px")) {
      return {
        width: width,
        minWidth: "400px",
      };
    }

    // If it's viewport units
    if (width.includes("vw")) {
      return {
        width: width,
        minWidth: "400px",
      };
    }

    // If it's rem units
    if (width.includes("rem")) {
      return {
        width: width,
        minWidth: "25rem", // 400px equivalent
      };
    }

    // Fallback: treat as pixel value
    return {
      width: `${width}px`,
      minWidth: "400px",
    };
  };

  const sheetWidthStyles = getSheetWidthStyles(crudActions.sheetWidth);

  return (
    <div className='flex items-center justify-between mb-4 gap-2 flex-wrap'>
      <div className='flex items-center gap-2'>
        {/* Add Button with Sheet */}
        {crudActions.onAdd && (
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant={crudActions.addButton?.variant || "default"}
                size={crudActions.addButton?.size || "sm"}
                className='flex items-center gap-2'
              >
                {crudActions.addButton?.icon || <Plus className='h-4 w-4' />}
                {crudActions.addButton?.label ||
                  crudActions.addButtonTitle ||
                  "Add Data"}
              </Button>
            </SheetTrigger>
            <SheetContent side='right' style={sheetWidthStyles}>
              <SheetHeader className='flex flex-row items-center justify-between space-y-0 pb-4 border-b'>
                <div className='flex flex-col space-y-1.5'>
                  <SheetTitle>
                    {crudActions.addSheetTitle || "Add New Item"}
                  </SheetTitle>
                  <SheetDescription>
                    {crudActions.addSheetDescription ||
                      "Fill in the details to add a new item."}
                  </SheetDescription>
                </div>
                <div className='flex items-center gap-2'>
                  {crudActions.renderSheetActions ? (
                    crudActions.renderSheetActions()
                  ) : (
                    <>
                      <SheetClose asChild>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={crudActions.onCancel}
                        >
                          Cancel
                        </Button>
                      </SheetClose>
                      <Button
                        size='sm'
                        onClick={
                          crudActions.onSave ||
                          (() => console.log("Save clicked"))
                        }
                      >
                        Save
                      </Button>
                    </>
                  )}
                </div>
              </SheetHeader>
              <div className='py-4 flex-1 overflow-y-auto'>
                {crudActions.renderAddContent ? (
                  crudActions.renderAddContent()
                ) : (
                  <div className='text-center text-gray-500 py-8'>
                    <p>Add form content goes here.</p>
                    <p className='text-sm mt-2'>
                      Use the renderAddContent prop to customize this area.
                    </p>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        )}

        {/* Refresh Button */}
        {crudActions.onRefresh && (
          <Button
            variant={crudActions.refreshButton?.variant || "outline"}
            size={crudActions.refreshButton?.size || "sm"}
            onClick={crudActions.onRefresh}
            className='flex items-center gap-2'
          >
            {crudActions.refreshButton?.icon || (
              <RefreshCw className='h-4 w-4' />
            )}
            {crudActions.refreshButton?.label ||
              crudActions.refreshButtonTitle ||
              "Refresh"}
          </Button>
        )}
      </div>

      {/* Delete Selected Button */}
      {crudActions.onDeleteSelected && showCheckbox && (
        <Button
          variant={crudActions.deleteButton?.variant || "destructive"}
          size={crudActions.deleteButton?.size || "sm"}
          onClick={() => crudActions.onDeleteSelected!(selectedRows)}
          disabled={!hasSelectedRows}
          className='flex items-center gap-2'
        >
          {crudActions.deleteButton?.icon || <Trash2 className='h-4 w-4' />}
          {crudActions.deleteButton?.label ||
            crudActions.deleteButtonTitle ||
            "Delete Selected"}
          {hasSelectedRows && `(${selectedRows.size})`}
        </Button>
      )}
    </div>
  );
}
