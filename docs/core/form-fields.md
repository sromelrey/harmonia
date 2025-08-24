# Form Fields Library

This section documents all **form-related components** used in the project.  
Each component provides a standardized way to render inputs, selects, combo boxes, date/time pickers, and more.

---

## Available Components

| Component      | Description                                                                                               | Documentation                              |
| -------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| **InputField** | A reusable input component that supports text, email, password, number, and textarea.                     | [InputField](./form-fields/input-field.md) |
| **Select**     | A standard dropdown select component with optional search/filter support.                                 | [Select](./Select.md)                      |
| **ComboBox**   | A searchable dropdown that can handle large datasets with virtualization and optional server-side search. | [ComboBox](./ComboBox.md)                  |
| **DatePicker** | A date picker input supporting single-date selection and formatting options.                              | [DatePicker](./DatePicker.md)              |
| **TimePicker** | A time picker input for selecting hours and minutes, optionally with 24h/AM-PM mode.                      | [TimePicker](./TimePicker.md)              |
| **Checkbox**   | A single checkbox component with label and optional description.                                          | [Checkbox](./Checkbox.md)                  |
| **RadioGroup** | A group of radio buttons for selecting one option among many.                                             | [RadioGroup](./RadioGroup.md)              |
| **Switch**     | A toggle switch component for boolean values (on/off).                                                    | [Switch](./Switch.md)                      |
| **Textarea**   | A multi-line text input component, optionally with character limits.                                      | [Textarea](./Textarea.md)                  |

---

## 🔹 Notes

- All components follow consistent styling using **shadcn/ui** or your project’s design system.
- Components are flexible and composable with layout, validation, and custom styling.
- For each component, see its dedicated `.md` file for **props, usage examples, and best practices**.
- Components can be used standalone or integrated into larger forms (e.g., using React Hook Form or Formik).

---

## 📂 Suggested File Structure
