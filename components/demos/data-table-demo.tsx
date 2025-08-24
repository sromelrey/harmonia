"use client";

import React, { useState, useCallback, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, MoreHorizontal } from "lucide-react";
import DataTable from "@/components/core/data-table";
import { BaseRow, RowId } from "@/components/core/data-table/types";

// Sample data interface
interface User extends BaseRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  lastLogin: string;
  department: string;
}

// Sample data
const sampleUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "2024-01-15",
    department: "Engineering",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "User",
    status: "active",
    lastLogin: "2024-01-14",
    department: "Marketing",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "Manager",
    status: "inactive",
    lastLogin: "2024-01-10",
    department: "Sales",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    role: "User",
    status: "pending",
    lastLogin: "2024-01-12",
    department: "HR",
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "2024-01-13",
    department: "Engineering",
  },
  {
    id: "6",
    name: "Diana Davis",
    email: "diana.davis@example.com",
    role: "User",
    status: "active",
    lastLogin: "2024-01-11",
    department: "Finance",
  },
  {
    id: "7",
    name: "Eve Miller",
    email: "eve.miller@example.com",
    role: "Manager",
    status: "inactive",
    lastLogin: "2024-01-09",
    department: "Operations",
  },
  {
    id: "8",
    name: "Frank Garcia",
    email: "frank.garcia@example.com",
    role: "User",
    status: "pending",
    lastLogin: "2024-01-08",
    department: "IT",
  },
];

// Status badge component
const StatusBadge = ({ status }: { status: User["status"] }) => {
  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
        status
      )} capitalize`}
    >
      {status}
    </span>
  );
};

// Action buttons component
const ActionButtons = ({ user }: { user: User }) => (
  <div className='flex items-center gap-2'>
    <Button
      size='sm'
      variant='ghost'
      className='h-8 w-8 p-0 hover:bg-teal-50 hover:text-teal-600'
      onClick={() => console.log("View user:", user.id)}
    >
      <Eye className='h-4 w-4' />
    </Button>
    <Button
      size='sm'
      variant='ghost'
      className='h-8 w-8 p-0 hover:bg-teal-50 hover:text-teal-600'
      onClick={() => console.log("Edit user:", user.id)}
    >
      <Edit className='h-4 w-4' />
    </Button>
    <Button
      size='sm'
      variant='ghost'
      className='h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600'
      onClick={() => console.log("Delete user:", user.id)}
    >
      <Trash2 className='h-4 w-4' />
    </Button>
  </div>
);

export default function DataTableDemo() {
  const [selectedRows, setSelectedRows] = useState<Set<RowId>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Column definitions
  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className='font-medium text-gray-900'>
            {row.getValue("name")}
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div className='text-gray-600'>{row.getValue("email")}</div>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
          <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize'>
            {row.getValue("role")}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
      },
      {
        accessorKey: "department",
        header: "Department",
        cell: ({ row }) => (
          <div className='text-gray-600'>{row.getValue("department")}</div>
        ),
      },
      {
        accessorKey: "lastLogin",
        header: "Last Login",
        cell: ({ row }) => (
          <div className='text-gray-500 text-sm'>
            {new Date(row.getValue("lastLogin")).toLocaleDateString()}
          </div>
        ),
      },
    ],
    []
  );

  // Handle row selection
  const handleRowSelect = useCallback((selectedRowIds: Set<RowId>) => {
    setSelectedRows(selectedRowIds);
    console.log("Selected rows:", Array.from(selectedRowIds));
  }, []);

  // Handle load more (simulate infinite scroll)
  const handleLoadMore = useCallback(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, you would append more data here
      setHasMore(false); // Stop loading after first call for demo
    }, 1000);
  }, []);

  // Action renderer
  const actionRenderer = useCallback(
    (user: User) => <ActionButtons user={user} />,
    []
  );

  return (
    <div className='space-y-6'>
      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-2'>DataTable Component</h3>
        <p className='text-sm text-gray-600 mb-4'>
          A comprehensive table component with row selection, sorting, infinite
          scroll, and custom actions.
        </p>
      </div>

      {/* Basic DataTable */}
      <div className='space-y-4'>
        <h4 className='text-sm font-medium text-gray-700'>
          Basic Table with Sorting
        </h4>
        <DataTable
          data={sampleUsers.slice(0, 4)}
          columns={columns}
          showCheckbox={false}
        />
      </div>

      {/* DataTable with Row Selection */}
      <div className='space-y-4'>
        <h4 className='text-sm font-medium text-gray-700'>
          Table with Row Selection ({selectedRows.size} selected)
        </h4>
        <DataTable
          data={sampleUsers.slice(0, 4)}
          columns={columns}
          showCheckbox={true}
          onRowSelect={handleRowSelect}
        />
      </div>

      {/* DataTable with Actions */}
      <div className='space-y-4'>
        <h4 className='text-sm font-medium text-gray-700'>
          Table with Custom Actions
        </h4>
        <DataTable
          data={sampleUsers.slice(0, 4)}
          columns={columns}
          showCheckbox={true}
          actionRenderer={actionRenderer}
          onRowSelect={handleRowSelect}
        />
      </div>

      {/* DataTable with Infinite Scroll */}
      <div className='space-y-4'>
        <h4 className='text-sm font-medium text-gray-700'>
          Table with Infinite Scroll
        </h4>
        <DataTable
          data={sampleUsers}
          columns={columns}
          showCheckbox={true}
          actionRenderer={actionRenderer}
          paginationMode='infinite-scroll'
          isLoading={isLoading}
          handleLoadMore={handleLoadMore}
          onRowSelect={handleRowSelect}
        />
      </div>

      {/* Scrollable DataTable */}
      <div className='space-y-4'>
        <h4 className='text-sm font-medium text-gray-700'>Scrollable Table</h4>
        <div className='max-w-2xl'>
          <DataTable
            data={sampleUsers}
            columns={columns}
            showCheckbox={true}
            actionRenderer={actionRenderer}
            isScrollable={true}
            onRowSelect={handleRowSelect}
          />
        </div>
      </div>

      {/* Features showcase */}
      <div className='bg-teal-50 p-4 rounded-lg mt-6 border border-teal-100'>
        <h4 className='text-sm font-semibold mb-3 text-teal-800'>
          Key Features:
        </h4>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-teal-700'>
          <div className='flex items-center gap-1'>
            <span className='text-teal-500'>✓</span> Row selection
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-teal-500'>✓</span> Column sorting
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-teal-500'>✓</span> Custom actions
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-teal-500'>✓</span> Infinite scroll
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-teal-500'>✓</span> Horizontal scrolling
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-teal-500'>✓</span> Loading states
          </div>
        </div>
      </div>
    </div>
  );
}
