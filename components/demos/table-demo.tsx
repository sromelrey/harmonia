"use client";

import React, { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/core/table";

// Sample data interface
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

// Sample data
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Laptop Pro",
    category: "Electronics",
    price: 1299.99,
    stock: 15,
    status: "in-stock",
  },
  {
    id: "2",
    name: "Wireless Mouse",
    category: "Accessories",
    price: 29.99,
    stock: 3,
    status: "low-stock",
  },
  {
    id: "3",
    name: "Mechanical Keyboard",
    category: "Accessories",
    price: 149.99,
    stock: 0,
    status: "out-of-stock",
  },
  {
    id: "4",
    name: 'Monitor 27"',
    category: "Electronics",
    price: 299.99,
    stock: 8,
    status: "in-stock",
  },
  {
    id: "5",
    name: "USB-C Cable",
    category: "Accessories",
    price: 12.99,
    stock: 25,
    status: "in-stock",
  },
];

// Status indicator component
const StatusIndicator = ({ status }: { status: Product["status"] }) => {
  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "in-stock":
        return "bg-green-500";
      case "low-stock":
        return "bg-yellow-500";
      case "out-of-stock":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: Product["status"]) => {
    switch (status) {
      case "in-stock":
        return "In Stock";
      case "low-stock":
        return "Low Stock";
      case "out-of-stock":
        return "Out of Stock";
      default:
        return "Unknown";
    }
  };

  return (
    <div className='flex items-center gap-2'>
      <div className={`w-2 h-2 rounded-full ${getStatusColor(status)}`} />
      <span className='text-sm text-gray-600'>{getStatusText(status)}</span>
    </div>
  );
};

export default function TableDemo() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isDisabled, setIsDisabled] = useState(false);

  // Column definitions
  const columns: ColumnDef<Product>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Product Name",
        cell: ({ row }) => (
          <div className='font-medium text-gray-900'>
            {row.getValue("name")}
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
          <div className='text-gray-600'>{row.getValue("category")}</div>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => (
          <div className='text-gray-900 font-medium'>
            ${(row.getValue("price") as number).toFixed(2)}
          </div>
        ),
        isRightAligned: true,
      },
      {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ row }) => (
          <div className='text-gray-600'>{row.getValue("stock")}</div>
        ),
        isRightAligned: true,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusIndicator status={row.getValue("status")} />,
      },
    ],
    []
  );

  // Handle add row
  const handleAddRow = () => {
    const newProduct: Product = {
      id: (products.length + 1).toString(),
      name: `New Product ${products.length + 1}`,
      category: "New Category",
      price: Math.floor(Math.random() * 1000) + 10,
      stock: Math.floor(Math.random() * 20),
      status: "in-stock",
    };
    setProducts([...products, newProduct]);
  };

  // Handle toggle disabled state
  const handleToggleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  return (
    <div className='space-y-6'>
      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-2'>Table Component</h3>
        <p className='text-sm text-gray-600 mb-4'>
          A flexible table component with add row functionality and customizable
          columns.
        </p>
      </div>

      {/* Controls */}
      <div className='flex gap-4 mb-4'>
        <Button onClick={handleToggleDisabled} variant='outline' size='sm'>
          {isDisabled ? "Enable" : "Disable"} Add Row
        </Button>
        <div className='text-sm text-gray-600 flex items-center'>
          Total Products: {products.length}
        </div>
      </div>

      {/* Basic Table */}
      <div className='space-y-4'>
        <h4 className='text-sm font-medium text-gray-700'>
          Product Inventory Table
        </h4>
        <Table
          data={products}
          columns={columns}
          isDisabled={isDisabled}
          onAddRow={handleAddRow}
          showAddRowButton={true}
        />
      </div>

      {/* Table without Add Row Button */}
      <div className='space-y-4'>
        <h4 className='text-sm font-medium text-gray-700'>Read-only Table</h4>
        <Table
          data={products.slice(0, 3)}
          columns={columns}
          isDisabled={true}
          onAddRow={handleAddRow}
          showAddRowButton={false}
        />
      </div>

      {/* Features showcase */}
      <div className='bg-teal-50 p-4 rounded-lg mt-6 border border-teal-100'>
        <h4 className='text-sm font-semibold mb-3 text-teal-800'>
          Key Features:
        </h4>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-teal-700'>
          <div className='flex items-center gap-1'>
            <span className='text-teal-500'>✓</span> Add row functionality
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-teal-500'>✓</span> Customizable columns
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-teal-500'>✓</span> Right-aligned cells
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-teal-500'>✓</span> Hover effects
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-teal-500'>✓</span> Empty state handling
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-teal-500'>✓</span> Disabled state
          </div>
        </div>
      </div>
    </div>
  );
}
