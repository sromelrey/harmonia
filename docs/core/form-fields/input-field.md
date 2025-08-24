# InputField Component

A reusable **input component** that supports both single-line inputs and textareas.  
This is part of the **Form Fields** collection, designed to standardize form UI in your project.

---

## ✨ Features

- Supports multiple input types: `text`, `email`, `password`, `number`
- Optional textarea rendering via `isTextarea` prop
- Customizable label with required indicator
- Supports horizontal (`row`) or vertical (`column`) layout
- Handles disabled state gracefully
- Uses **shadcn/ui Input/Textarea** for styling consistency
- Custom styling using `cn` utility

---

## 📦 Props

| Prop          | Type                                          | Default     | Description                               |
| ------------- | --------------------------------------------- | ----------- | ----------------------------------------- |
| `label`       | `string`                                      | `undefined` | Label displayed above or beside the input |
| `value`       | `string`                                      | required    | Current value of the input                |
| `name`        | `string`                                      | required    | Input name attribute                      |
| `onChange`    | `(value: string) => void`                     | required    | Callback fired when value changes         |
| `type`        | `"text" \| "email" \| "password" \| "number"` | `"text"`    | Input type                                |
| `placeholder` | `string`                                      | `""`        | Placeholder text                          |
| `direction`   | `"row" \| "column"`                           | `"column"`  | Layout direction for label and input      |
| `disabled`    | `boolean`                                     | `false`     | Disable input interaction                 |
| `required`    | `boolean`                                     | `false`     | Marks input as required and shows `*`     |
| `isTextarea`  | `boolean`                                     | `false`     | Render a textarea instead of input        |

---

## 📄 Example Usage

```tsx
import InputField from "@/components/form-fields/InputField";
import { useState } from "react";

export default function MyForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className='space-y-4'>
      <InputField
        label='Name'
        value={name}
        name='name'
        onChange={setName}
        required
      />

      <InputField
        label='Description'
        value={description}
        name='description'
        onChange={setDescription}
        isTextarea
        placeholder='Enter description here...'
      />
    </div>
  );
}
```
