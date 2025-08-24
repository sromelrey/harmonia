# Table Component

A **minimal, lightweight table component** built with [TanStack Table](https://tanstack.com/table) and [shadcn/ui](https://ui.shadcn.com/) styling.

Designed for simple tabular data display with optional row-adding functionality.

---

## ✨ Features

- ✅ Renders tabular data with headers & rows
- ✅ Uses **TanStack Table** for core row model & cell rendering
- ✅ Styled with **shadcn/ui** for consistency
- ✅ Supports optional **"Add Row"** button with custom callback
- ✅ Displays a **fallback "No records found"** message when empty

---

## 📦 Props

| Prop               | Type                        | Description                                            |
| ------------------ | --------------------------- | ------------------------------------------------------ |
| `data`             | `T[]`                       | Array of rows to display.                              |
| `columns`          | `ColumnDef<T>[]`            | Column definitions using TanStack Table.               |
| `isDisabled`       | `boolean`                   | Disables the Add Row button when true.                 |
| `onAddRow`         | `(e: any) => void`          | Callback triggered when the Add Row button is clicked. |
| `showAddRowButton` | `boolean` (default: `true`) | Toggles visibility of the Add Row button.              |

---

## 📄 Example Usage

```tsx
import Table from "@/components/table";
import { ColumnDef } from "@tanstack/react-table";

type Item = {
  id: string;
  item_no: string;
  description: string;
};

const columns: ColumnDef<Item>[] = [
  { accessorKey: "item_no", header: "Item No" },
  { accessorKey: "description", header: "Description" },
];

export default function ItemTable() {
  const data: Item[] = [
    { id: "1", item_no: "A101", description: "Widget A" },
    { id: "2", item_no: "B202", description: "Widget B" },
  ];

  return (
    <Table<Item>
      data={data}
      columns={columns}
      isDisabled={false}
      onAddRow={() => console.log("Add row clicked")}
      showAddRowButton
    />
  );
}
```
