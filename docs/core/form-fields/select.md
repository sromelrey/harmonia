# Select Component

A reusable **Select component** for rendering a dropdown in forms, tables, or any UI that requires selecting a single value.  
Built on top of `shadcn/ui` Select components for consistent styling.

---

## ✨ Features

- Supports rendering an array of options with `value` and `label`.
- Provides a customizable placeholder.
- Can be disabled.
- Filters out empty values automatically.
- Integrates well in forms or table cells.

---

## 📦 Props

| Prop            | Type                                      | Default              | Description                            |
| --------------- | ----------------------------------------- | -------------------- | -------------------------------------- |
| `value`         | `string`                                  | required             | Current selected value                 |
| `onValueChange` | `(newValue: string) => void`              | required             | Callback fired when selection changes  |
| `options`       | `Array<{ value: string; label: string }>` | required             | List of selectable options             |
| `placeholder`   | `string`                                  | `"Select an option"` | Text to show when no value is selected |
| `disabled`      | `boolean`                                 | `false`              | Disables the select input when true    |

---

## 📄 Example Usage

```tsx
import { useState } from "react";
import Select from "@/components/form-fields/Select";

export default function ExampleForm() {
  const [country, setCountry] = useState("");

  const countries = [
    { value: "ph", label: "Philippines" },
    { value: "us", label: "United States" },
    { value: "jp", label: "Japan" },
  ];

  return (
    <div className='max-w-xs'>
      <Select
        value={country}
        onValueChange={setCountry}
        options={countries}
        placeholder='Select a country'
      />
    </div>
  );
}
```
