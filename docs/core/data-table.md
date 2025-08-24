# CustomTable Component

A **generic, flexible table component** built with [TanStack Table](https://tanstack.com/table) and [shadcn/ui](https://ui.shadcn.com/) styling.

---

## ✨ Features

- ✅ **Row selection** with checkboxes (including "Select All")
- ✅ **Row expansion** for nested/child tables
- ✅ **Sorting** integration via TanStack Table
- ✅ **Dynamic column rendering** (checkbox, actions, and custom columns)
- ✅ **Infinite scroll support** with Intersection Observer
- ✅ **Customizable row actions** and sub-tables
- ✅ **Supports scrollable layout**

---

## 📦 Props

| Prop              | Type                                          | Description                                                                        |
| ----------------- | --------------------------------------------- | ---------------------------------------------------------------------------------- |
| `data`            | `T[]` (extends `BaseRow`)                     | Array of rows. Must include an `id` property.                                      |
| `columns`         | `ColumnDef<T>[]`                              | Column definitions using TanStack Table.                                           |
| `showCheckbox`    | `boolean`                                     | Enables row selection checkboxes.                                                  |
| `actionRenderer`  | `(row: T) => React.ReactNode`                 | Function to render custom actions for each row.                                    |
| `renderSubTable`  | `(row: T) => React.ReactNode`                 | Function to render a nested/expandable sub-table.                                  |
| `subTableConfig`  | `object`                                      | Alternative configuration for expandable rows (not yet fully implemented).         |
| `isScrollable`    | `boolean`                                     | Enables horizontal scrolling when true.                                            |
| `hasColumnFilter` | `boolean`                                     | Adjusts layout if column filters are in use.                                       |
| `getRowId`        | `(row: T) => string`                          | Custom function to derive row ID. Defaults to `row.id`.                            |
| `isSub`           | `boolean`                                     | Marks this table as a sub-table (affects layout & checkbox behavior).              |
| `paginationMode`  | `"none" \| "infinite-scroll" \| "pagination"` | Pagination mode (default `"none"`). Infinite scroll supported; pagination planned. |
| `isLoading`       | `boolean`                                     | Loading state indicator.                                                           |
| `handleLoadMore`  | `() => void`                                  | Callback triggered on infinite scroll when more data should be fetched.            |

---

## ⚙️ Internal Logic

- Uses a custom `useTable` hook for:
  - Row selection state
  - Expansion state
  - Infinite scroll pagination state
- Implements **`IntersectionObserver`** to trigger `handleLoadMore` when scrolling reaches the bottom.
- Dynamically injects:
  - **Checkbox column** (when `showCheckbox` is true)
  - **Actions column** (when `actionRenderer` is provided)

---

## 📄 Example Usage

```tsx
import CustomTable from "@/components/custom-table";
import { ColumnDef } from "@tanstack/react-table";

type User = {
  id: string;
  name: string;
  email: string;
};

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
];

export default function UserTable() {
  const data: User[] = [
    { id: "1", name: "Alice", email: "alice@example.com" },
    { id: "2", name: "Bob", email: "bob@example.com" },
  ];

  return (
    <CustomTable<User>
      data={data}
      columns={columns}
      showCheckbox
      actionRenderer={(row) => <button>Edit {row.name}</button>}
      paginationMode='infinite-scroll'
      handleLoadMore={() => console.log("Load more triggered")}
    />
  );
}
```
