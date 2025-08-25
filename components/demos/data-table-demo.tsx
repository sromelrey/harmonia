"use client";

import React, { useState, useCallback, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  UserPlus,
  RotateCcw,
  Users,
  Database,
  Save,
  X,
} from "lucide-react";
import { DataTable } from "@/components/core/data-table";
import {
  BaseRow,
  RowId,
  DataTableCrudActions,
  ActionButtonConfig,
} from "@/components/core/data-table/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const [crudData, setCrudData] = useState<User[]>(sampleUsers);
  const [refreshCount, setRefreshCount] = useState(0);

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

  // CRUD Action Handlers
  const handleAddUser = useCallback(() => {
    console.log("Add user action triggered");
  }, []);

  const handleDeleteSelected = useCallback((selectedRowIds: Set<RowId>) => {
    setCrudData((prev) => prev.filter((user) => !selectedRowIds.has(user.id)));
    setSelectedRows(new Set());
    console.log("Deleted users:", Array.from(selectedRowIds));
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshCount((prev) => prev + 1);
    setCrudData([...sampleUsers]);
    setSelectedRows(new Set());
    console.log("Data refreshed");
  }, []);

  const handleSaveUser = useCallback(() => {
    console.log("Save user clicked");
    // Here you would typically gather form data and save it
  }, []);

  const handleCancelUser = useCallback(() => {
    console.log("Cancel user clicked");
    // Here you would typically reset form or show confirmation
  }, []);

  // Mock form for add user
  const renderAddUserForm = useCallback(
    () => (
      <div className='space-y-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Name</Label>
            <Input id='name' placeholder='Enter name' />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' placeholder='Enter email' />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='role'>Role</Label>
            <Input id='role' placeholder='Enter role' />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='department'>Department</Label>
            <Input id='department' placeholder='Enter department' />
          </div>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='status'>Status</Label>
          <Input id='status' placeholder='active, inactive, or pending' />
        </div>
      </div>
    ),
    []
  );

  // Custom sheet actions with different styling
  const renderCustomSheetActions = useCallback(
    () => (
      <div className='flex items-center gap-2'>
        <Button variant='ghost' size='sm' onClick={handleCancelUser}>
          <X className='h-4 w-4 mr-2' />
          Cancel
        </Button>
        <Button size='sm' onClick={handleSaveUser}>
          <Save className='h-4 w-4 mr-2' />
          Save User
        </Button>
      </div>
    ),
    [handleSaveUser, handleCancelUser]
  );

  // CRUD Actions Configuration (Basic with default save/cancel - 50% width)
  const crudActions: DataTableCrudActions = useMemo(
    () => ({
      onAdd: handleAddUser,
      onDeleteSelected: handleDeleteSelected,
      onRefresh: handleRefresh,
      addButtonTitle: "Add User",
      deleteButtonTitle: "Delete Users",
      refreshButtonTitle: "Refresh Data",
      addSheetTitle: "Add New User (50% Width)",
      addSheetDescription:
        "Fill in the user details to add them to the system.",
      renderAddContent: renderAddUserForm,
      onSave: handleSaveUser,
      onCancel: handleCancelUser,
      sheetWidth: "50%", // 50% of viewport width
    }),
    [
      handleAddUser,
      handleDeleteSelected,
      handleRefresh,
      renderAddUserForm,
      handleSaveUser,
      handleCancelUser,
    ]
  );

  // CRUD Actions with Custom Icons, Labels, and Sheet Actions (70% width)
  const customCrudActions: DataTableCrudActions = useMemo(
    () => ({
      onAdd: handleAddUser,
      onDeleteSelected: handleDeleteSelected,
      onRefresh: handleRefresh,
      addButton: {
        label: "New User",
        icon: <UserPlus className='h-4 w-4' />,
        variant: "default",
        size: "sm",
      },
      deleteButton: {
        label: "Remove",
        icon: <Users className='h-4 w-4' />,
        variant: "destructive",
        size: "sm",
      },
      refreshButton: {
        label: "Reload",
        icon: <RotateCcw className='h-4 w-4' />,
        variant: "outline",
        size: "sm",
      },
      addSheetTitle: "User Registration (70% Width)",
      addSheetDescription: "Create a new user account with the form below.",
      renderAddContent: renderAddUserForm,
      renderSheetActions: renderCustomSheetActions,
      sheetWidth: "70%", // 70% of viewport width
    }),
    [
      handleAddUser,
      handleDeleteSelected,
      handleRefresh,
      renderAddUserForm,
      renderCustomSheetActions,
    ]
  );

  // Alternative CRUD Actions with Different Styling (Fixed 600px width)
  const alternativeCrudActions: DataTableCrudActions = useMemo(
    () => ({
      onAdd: handleAddUser,
      onDeleteSelected: handleDeleteSelected,
      onRefresh: handleRefresh,
      addButton: {
        label: "Create",
        icon: <Database className='h-4 w-4' />,
        variant: "secondary",
        size: "default",
      },
      deleteButton: {
        label: "Delete Selected",
        icon: <X className='h-4 w-4' />,
        variant: "destructive",
        size: "default",
      },
      refreshButton: {
        label: "Sync",
        icon: <Database className='h-4 w-4' />,
        variant: "ghost",
        size: "default",
      },
      addSheetTitle: "Add User Profile (Fixed 600px)",
      addSheetDescription: "Complete the user information form.",
      renderAddContent: renderAddUserForm,
      onSave: handleSaveUser,
      onCancel: handleCancelUser,
      sheetWidth: "600px", // Fixed pixel width
    }),
    [
      handleAddUser,
      handleDeleteSelected,
      handleRefresh,
      renderAddUserForm,
      handleSaveUser,
      handleCancelUser,
    ]
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

      <Tabs defaultValue='basic' className='w-full'>
        <TabsList className='flex flex-wrap justify-center lg:grid lg:grid-cols-9 w-full h-auto lg:h-10 p-1'>
          <TabsTrigger
            value='basic'
            className='text-xs lg:text-sm mb-1 lg:mb-0'
          >
            Basic
          </TabsTrigger>
          <TabsTrigger
            value='selection'
            className='text-xs lg:text-sm mb-1 lg:mb-0'
          >
            Selection
          </TabsTrigger>
          <TabsTrigger
            value='actions'
            className='text-xs lg:text-sm mb-1 lg:mb-0'
          >
            Actions
          </TabsTrigger>
          <TabsTrigger value='crud' className='text-xs lg:text-sm mb-1 lg:mb-0'>
            CRUD
          </TabsTrigger>
          <TabsTrigger
            value='custom-crud'
            className='text-xs lg:text-sm mb-1 lg:mb-0'
          >
            Custom
          </TabsTrigger>
          <TabsTrigger
            value='infinite'
            className='text-xs lg:text-sm mb-1 lg:mb-0'
          >
            Infinite
          </TabsTrigger>
          <TabsTrigger
            value='scrollable'
            className='text-xs lg:text-sm mb-1 lg:mb-0'
          >
            Scrollable
          </TabsTrigger>
          <TabsTrigger
            value='styling'
            className='text-xs lg:text-sm mb-1 lg:mb-0'
          >
            Styling
          </TabsTrigger>
          <TabsTrigger
            value='header-body'
            className='text-xs lg:text-sm mb-1 lg:mb-0'
          >
            Header & Body
          </TabsTrigger>
          <TabsTrigger
            value='features'
            className='text-xs lg:text-sm mb-1 lg:mb-0'
          >
            Features
          </TabsTrigger>
        </TabsList>

        {/* Basic DataTable */}
        <TabsContent value='basic' className='space-y-4'>
          <div className='space-y-4'>
            <h4 className='text-sm font-medium text-gray-700'>
              Basic Table with Sorting
            </h4>
            <p className='text-xs text-gray-500'>
              A simple table with column sorting functionality. Click on any
              column header to sort.
            </p>
            <DataTable
              data={sampleUsers.slice(0, 4)}
              columns={columns}
              showCheckbox={false}
            />
          </div>
        </TabsContent>

        {/* DataTable with Row Selection */}
        <TabsContent value='selection' className='space-y-4'>
          <div className='space-y-4'>
            <h4 className='text-sm font-medium text-gray-700'>
              Table with Row Selection ({selectedRows.size} selected)
            </h4>
            <p className='text-xs text-gray-500'>
              Select individual rows or use the header checkbox to select all
              rows.
            </p>
            <DataTable
              data={sampleUsers.slice(0, 4)}
              columns={columns}
              showCheckbox={true}
              onRowSelect={handleRowSelect}
            />
          </div>
        </TabsContent>

        {/* DataTable with Actions */}
        <TabsContent value='actions' className='space-y-4'>
          <div className='space-y-4'>
            <h4 className='text-sm font-medium text-gray-700'>
              Table with Custom Actions
            </h4>
            <p className='text-xs text-gray-500'>
              Each row includes custom action buttons for view, edit, and delete
              operations.
            </p>
            <DataTable
              data={sampleUsers.slice(0, 4)}
              columns={columns}
              showCheckbox={true}
              actionRenderer={actionRenderer}
              onRowSelect={handleRowSelect}
            />
          </div>
        </TabsContent>

        {/* DataTable with CRUD Actions */}
        <TabsContent value='crud' className='space-y-4'>
          <div className='space-y-4'>
            <h4 className='text-sm font-medium text-gray-700'>
              Table with CRUD Operations (Refreshed {refreshCount} times)
            </h4>
            <p className='text-xs text-gray-500'>
              This table includes Add, Delete Selected, and Refresh
              functionality. Click "Add User" to open a form sheet, select rows
              to enable delete, or refresh to reset the data.
            </p>
            <DataTable
              data={crudData}
              columns={columns}
              showCheckbox={true}
              actionRenderer={actionRenderer}
              onRowSelect={handleRowSelect}
              crudActions={crudActions}
              className='border rounded-lg'
            />

            {/* Info section */}
            <div className='bg-blue-50 p-4 rounded-lg border border-blue-200'>
              <h5 className='text-sm font-medium text-blue-800 mb-2'>
                CRUD Actions Available:
              </h5>
              <div className='text-xs text-blue-700 space-y-1'>
                <div>
                  • <strong>Add User:</strong> Opens a sheet with a form
                  (currently mock data)
                </div>
                <div>
                  • <strong>Delete Selected:</strong> Removes selected rows from
                  the table
                </div>
                <div>
                  • <strong>Refresh Data:</strong> Resets table to original
                  sample data
                </div>
                <div>
                  • <strong>Row Selection:</strong> Must be enabled for delete
                  functionality
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* DataTable with Custom CRUD Actions */}
        <TabsContent value='custom-crud' className='space-y-4'>
          <div className='space-y-4'>
            <h4 className='text-sm font-medium text-gray-700'>
              Tables with Custom CRUD Icons & Labels
            </h4>
            <p className='text-xs text-gray-500'>
              Demonstrate different CRUD button configurations with custom
              icons, labels, variants, sizes, and configurable sheet widths
              (50%, 70%, 600px) with header-aligned actions.
            </p>

            {/* Custom Icons Example */}
            <div className='space-y-3'>
              <h5 className='text-xs font-medium text-gray-600'>
                Custom Icons & Labels
              </h5>
              <DataTable
                data={crudData.slice(0, 3)}
                columns={columns.slice(0, 4)}
                showCheckbox={true}
                onRowSelect={handleRowSelect}
                crudActions={customCrudActions}
                className='border rounded-lg bg-blue-50/30'
                headerClassName='bg-blue-100 text-blue-900 font-semibold'
                bodyClassName='hover:bg-blue-50'
              />
            </div>

            {/* Alternative Styling Example */}
            <div className='space-y-3'>
              <h5 className='text-xs font-medium text-gray-600'>
                Alternative Button Variants & Sizes
              </h5>
              <DataTable
                data={crudData.slice(3, 6)}
                columns={columns.slice(0, 4)}
                showCheckbox={true}
                onRowSelect={handleRowSelect}
                crudActions={alternativeCrudActions}
                className='border rounded-lg bg-green-50/30'
                headerClassName='bg-green-100 text-green-800 font-medium'
                bodyClassName='even:bg-green-25 odd:bg-white hover:bg-green-75'
              />
            </div>

            {/* Configuration Examples */}
            <div className='bg-amber-50 p-4 rounded-lg border border-amber-200'>
              <h5 className='text-sm font-medium text-amber-800 mb-3'>
                Custom Action Configuration Examples:
              </h5>
              <div className='space-y-3 text-xs text-amber-700'>
                <div className='bg-white p-3 rounded border'>
                  <strong>Custom Icons & Labels:</strong>
                  <pre className='mt-2 text-xs bg-amber-50 p-2 rounded overflow-x-auto'>{`addButton: {
  label: "New User",
  icon: <UserPlus className='h-4 w-4' />,
  variant: "default",
  size: "sm"
}`}</pre>
                </div>
                <div className='bg-white p-3 rounded border'>
                  <strong>
                    Configurable Sheet Width (Fixed - Now Works!):
                  </strong>
                  <pre className='mt-2 text-xs bg-amber-50 p-2 rounded overflow-x-auto'>{`// Percentage width (recommended)
sheetWidth: "50%",  // 50% of viewport
sheetWidth: "70%",  // 70% of viewport

// Fixed pixel width
sheetWidth: "600px",

// Viewport units
sheetWidth: "60vw",

// Uses inline styles to override 
// Shadcn default width classes

// Default save/cancel buttons
onSave: handleSave,
onCancel: handleCancel,

// Or custom header actions
renderSheetActions: () => (
  <div className='flex gap-2'>
    <Button variant='ghost' onClick={cancel}>
      Cancel
    </Button>
    <Button onClick={save}>Save</Button>
  </div>
)`}</pre>
                </div>
                <div className='bg-white p-3 rounded border'>
                  <strong>Alternative Styling:</strong>
                  <pre className='mt-2 text-xs bg-amber-50 p-2 rounded overflow-x-auto'>{`deleteButton: {
  label: "Delete Selected",
  icon: <X className='h-4 w-4' />,
  variant: "destructive",
  size: "default"
}`}</pre>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* DataTable with Infinite Scroll */}
        <TabsContent value='infinite' className='space-y-4'>
          <div className='space-y-4'>
            <h4 className='text-sm font-medium text-gray-700'>
              Table with Infinite Scroll
            </h4>
            <p className='text-xs text-gray-500'>
              Scroll to the bottom to automatically load more data. Loading
              state is shown during data fetching.
            </p>
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
        </TabsContent>

        {/* Scrollable DataTable */}
        <TabsContent value='scrollable' className='space-y-4'>
          <div className='space-y-4'>
            <h4 className='text-sm font-medium text-gray-700'>
              Scrollable Table
            </h4>
            <p className='text-xs text-gray-500'>
              Table with horizontal scrolling when content exceeds container
              width.
            </p>
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
        </TabsContent>

        {/* DataTable with Custom Styling */}
        <TabsContent value='styling' className='space-y-4'>
          <div className='space-y-4'>
            <h4 className='text-sm font-medium text-gray-700'>
              Table with Custom Styling (className prop)
            </h4>
            <p className='text-xs text-gray-500'>
              Use the className prop to apply custom styling to the DataTable
              container.
            </p>

            {/* Single Custom Styled Table */}
            <div className='space-y-4'>
              <h5 className='text-xs font-medium text-gray-600'>
                Gradient Background
              </h5>
              <DataTable
                data={sampleUsers.slice(0, 3)}
                columns={columns}
                showCheckbox={true}
                actionRenderer={actionRenderer}
                onRowSelect={handleRowSelect}
                className='bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-2 border-blue-200 shadow-lg'
              />
            </div>

            {/* Multiple Custom Styled DataTables */}
            <div className='space-y-4'>
              <h5 className='text-xs font-medium text-gray-600'>
                Multiple Styles
              </h5>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div>
                  <h6 className='text-xs font-medium text-gray-600 mb-2'>
                    Compact Style
                  </h6>
                  <DataTable
                    data={sampleUsers.slice(0, 2)}
                    columns={columns.slice(0, 3)}
                    showCheckbox={false}
                    className='bg-gray-50 p-2 rounded border shadow-sm'
                  />
                </div>
                <div>
                  <h6 className='text-xs font-medium text-gray-600 mb-2'>
                    Highlighted Style
                  </h6>
                  <DataTable
                    data={sampleUsers.slice(2, 4)}
                    columns={columns.slice(0, 3)}
                    showCheckbox={false}
                    className='bg-amber-50 p-3 rounded-lg border-l-4 border-amber-400 shadow-md'
                  />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Header & Body Styling */}
        <TabsContent value='header-body' className='space-y-4'>
          <div className='space-y-4'>
            <h4 className='text-sm font-medium text-gray-700'>
              Header & Body Custom Styling
            </h4>
            <p className='text-xs text-gray-500'>
              Use headerClassName and bodyClassName props to style table headers
              and body sections independently.
            </p>

            {/* Blue Header Example */}
            <div className='space-y-3'>
              <h5 className='text-xs font-medium text-gray-600'>
                Blue Header Theme
              </h5>
              <DataTable
                data={sampleUsers.slice(0, 3)}
                columns={columns.slice(0, 4)}
                showCheckbox={true}
                className='border rounded-lg shadow-sm'
                headerClassName='bg-blue-500 text-white font-semibold'
                bodyClassName='hover:bg-blue-50 transition-colors'
                onRowSelect={handleRowSelect}
              />
            </div>

            {/* Green Zebra Stripe Example */}
            <div className='space-y-3'>
              <h5 className='text-xs font-medium text-gray-600'>
                Zebra Stripes with Green Theme
              </h5>
              <DataTable
                data={sampleUsers.slice(3, 6)}
                columns={columns.slice(0, 4)}
                showCheckbox={true}
                className='border rounded-lg shadow-sm'
                headerClassName='bg-emerald-600 text-emerald-50 font-bold uppercase text-xs tracking-wide'
                bodyClassName='even:bg-emerald-25 odd:bg-white hover:bg-emerald-100'
                onRowSelect={handleRowSelect}
              />
            </div>

            {/* Dark Theme Example */}
            <div className='space-y-3'>
              <h5 className='text-xs font-medium text-gray-600'>Dark Theme</h5>
              <DataTable
                data={sampleUsers.slice(6, 9)}
                columns={columns.slice(0, 4)}
                showCheckbox={true}
                className='border border-gray-700 rounded-lg shadow-sm bg-gray-900'
                headerClassName='bg-gray-800 text-gray-100 font-semibold border-b border-gray-700'
                bodyClassName='text-gray-200 hover:bg-gray-800 transition-colors'
                onRowSelect={handleRowSelect}
              />
            </div>

            {/* Configuration Examples */}
            <div className='bg-amber-50 p-4 rounded-lg border border-amber-200'>
              <h5 className='text-sm font-medium text-amber-800 mb-3'>
                Header & Body Class Configuration
              </h5>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <div className='bg-white p-3 rounded border'>
                  <strong>Header Styling:</strong>
                  <pre className='mt-2 text-xs bg-amber-50 p-2 rounded overflow-x-auto'>{`<DataTable
  data={users}
  columns={columns}
  headerClassName="bg-blue-500 text-white font-semibold"
  bodyClassName="hover:bg-blue-50"
/>`}</pre>
                </div>
                <div className='bg-white p-3 rounded border'>
                  <strong>Zebra Stripes:</strong>
                  <pre className='mt-2 text-xs bg-amber-50 p-2 rounded overflow-x-auto'>{`<DataTable
  data={users}
  columns={columns}
  headerClassName="bg-emerald-600 text-emerald-50"
  bodyClassName="even:bg-emerald-25 odd:bg-white"
/>`}</pre>
                </div>
                <div className='bg-white p-3 rounded border'>
                  <strong>Dark Theme:</strong>
                  <pre className='mt-2 text-xs bg-amber-50 p-2 rounded overflow-x-auto'>{`<DataTable
  data={users}
  columns={columns}
  className="bg-gray-900 border-gray-700"
  headerClassName="bg-gray-800 text-gray-100"
  bodyClassName="text-gray-200 hover:bg-gray-800"
/>`}</pre>
                </div>
                <div className='bg-white p-3 rounded border'>
                  <strong>Available Props:</strong>
                  <pre className='mt-2 text-xs bg-amber-50 p-2 rounded overflow-x-auto'>{`// Table container
className?: string

// Header styling
headerClassName?: string

// Body styling  
bodyClassName?: string`}</pre>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Features showcase */}
        <TabsContent value='features' className='space-y-4'>
          <div className='bg-teal-50 p-6 rounded-lg border border-teal-100'>
            <h4 className='text-lg font-semibold mb-4 text-teal-800'>
              Key Features Overview
            </h4>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-teal-700'>
              <div className='flex items-start gap-3 p-3 bg-white rounded-md border border-teal-200'>
                <span className='text-teal-500 text-lg'>✓</span>
                <div>
                  <div className='font-medium'>Row Selection</div>
                  <div className='text-xs text-teal-600'>
                    Select individual rows or all rows at once
                  </div>
                </div>
              </div>
              <div className='flex items-start gap-3 p-3 bg-white rounded-md border border-teal-200'>
                <span className='text-teal-500 text-lg'>✓</span>
                <div>
                  <div className='font-medium'>Column Sorting</div>
                  <div className='text-xs text-teal-600'>
                    Click headers to sort data ascending/descending
                  </div>
                </div>
              </div>
              <div className='flex items-start gap-3 p-3 bg-white rounded-md border border-teal-200'>
                <span className='text-teal-500 text-lg'>✓</span>
                <div>
                  <div className='font-medium'>Custom Actions</div>
                  <div className='text-xs text-teal-600'>
                    Add custom action buttons for each row
                  </div>
                </div>
              </div>
              <div className='flex items-start gap-3 p-3 bg-white rounded-md border border-teal-200'>
                <span className='text-teal-500 text-lg'>✓</span>
                <div>
                  <div className='font-medium'>Infinite Scroll</div>
                  <div className='text-xs text-teal-600'>
                    Load more data automatically on scroll
                  </div>
                </div>
              </div>
              <div className='flex items-start gap-3 p-3 bg-white rounded-md border border-teal-200'>
                <span className='text-teal-500 text-lg'>✓</span>
                <div>
                  <div className='font-medium'>Horizontal Scrolling</div>
                  <div className='text-xs text-teal-600'>
                    Handle wide tables with overflow scrolling
                  </div>
                </div>
              </div>
              <div className='flex items-start gap-3 p-3 bg-white rounded-md border border-teal-200'>
                <span className='text-teal-500 text-lg'>✓</span>
                <div>
                  <div className='font-medium'>Loading States</div>
                  <div className='text-xs text-teal-600'>
                    Show loading indicators during data fetching
                  </div>
                </div>
              </div>
              <div className='flex items-start gap-3 p-3 bg-white rounded-md border border-teal-200'>
                <span className='text-teal-500 text-lg'>✓</span>
                <div>
                  <div className='font-medium'>Custom Styling</div>
                  <div className='text-xs text-teal-600'>
                    Apply custom CSS classes via className, headerClassName, and
                    bodyClassName props
                  </div>
                </div>
              </div>
              <div className='flex items-start gap-3 p-3 bg-white rounded-md border border-teal-200'>
                <span className='text-teal-500 text-lg'>✓</span>
                <div>
                  <div className='font-medium'>CRUD Operations</div>
                  <div className='text-xs text-teal-600'>
                    Built-in Add, Delete, and Refresh actions with Sheet
                    integration
                  </div>
                </div>
              </div>
              <div className='flex items-start gap-3 p-3 bg-white rounded-md border border-teal-200'>
                <span className='text-teal-500 text-lg'>✓</span>
                <div>
                  <div className='font-medium'>Custom Action Buttons</div>
                  <div className='text-xs text-teal-600'>
                    Customizable icons, labels, variants, and sizes for all CRUD
                    buttons
                  </div>
                </div>
              </div>
              <div className='flex items-start gap-3 p-3 bg-white rounded-md border border-teal-200'>
                <span className='text-teal-500 text-lg'>✓</span>
                <div>
                  <div className='font-medium'>Modular Actions</div>
                  <div className='text-xs text-teal-600'>
                    Separate DataTableActions component for better reusability
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Example */}
            <div className='mt-6 p-4 bg-white rounded-md border border-teal-200'>
              <h5 className='text-sm font-medium text-teal-800 mb-2'>
                Basic Usage Example
              </h5>
              <pre className='text-xs text-gray-700 bg-gray-50 p-3 rounded overflow-x-auto'>
                {`<DataTable
  data={users}
  columns={columns}
  showCheckbox={true}
  onRowSelect={handleRowSelect}
  crudActions={{
    onAdd: handleAdd,
    onDeleteSelected: handleDelete,
    onRefresh: handleRefresh,
    addButton: {
      label: "New User",
      icon: <UserPlus className='h-4 w-4' />,
      variant: "default",
      size: "sm"
    },
    deleteButton: {
      label: "Remove",
      icon: <Users className='h-4 w-4' />,
      variant: "destructive"
    },
    refreshButton: {
      label: "Reload",
      icon: <RotateCcw className='h-4 w-4' />,
      variant: "outline"
    },
    addSheetTitle: "User Registration",
    renderAddContent: renderForm
  }}
/>`}
              </pre>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
