// Utility to load documentation from markdown files
export interface ComponentDoc {
  title: string;
  content: string;
  features: string[];
  props?: Array<{
    name: string;
    type: string;
    default?: string;
    description: string;
  }>;
  examples?: string[];
}

// Map component IDs to their documentation files
const componentDocMap: Record<string, string> = {
  "form-fields": "docs/core/form-fields.md",
  "core-form-fields": "docs/core/form-fields.md",
  "combo-box": "docs/core/form-fields/ComboBox.md",
  "data-table": "docs/core/data-table.md",
  table: "docs/core/table.md",
};

// Enhanced documentation content based on actual markdown files
const enhancedDocs: Record<string, ComponentDoc> = {
  "form-fields": {
    title: "Form Fields Library",
    content: `This section documents all **form-related components** used in the project.  
Each component provides a standardized way to render inputs, selects, combo boxes, date/time pickers, and more.

## Available Components

- **InputField** - A reusable input component that supports text, email, password, number, and textarea
- **Select** - A standard dropdown select component with optional search/filter support
- **ComboBox** - A searchable dropdown that can handle large datasets with virtualization
- **DatePicker** - A date picker input supporting single-date selection and formatting options
- **TimePicker** - A time picker input for selecting hours and minutes
- **Checkbox** - A single checkbox component with label and optional description
- **RadioGroup** - A group of radio buttons for selecting one option among many
- **Switch** - A toggle switch component for boolean values (on/off)
- **Textarea** - A multi-line text input component, optionally with character limits

## Notes

- All components follow consistent styling using **shadcn/ui** or your project's design system
- Components are flexible and composable with layout, validation, and custom styling
- Components can be used standalone or integrated into larger forms (e.g., using React Hook Form or Formik)`,
    features: [
      "Input",
      "Password",
      "Textarea",
      "Select",
      "Date",
      "Validation",
      "Accessibility",
    ],
  },
  "core-form-fields": {
    title: "Core Form Fields",
    content: `Essential form field components from the core library.

## Features
- Basic input components with consistent styling
- Select dropdowns with search capabilities
- Form validation and error handling
- Accessibility features and ARIA support
- Responsive design patterns

## Usage
Core form fields provide the fundamental building blocks for form interfaces. These components are lightweight and focused on essential functionality while maintaining high accessibility standards.`,
    features: ["Input", "Select", "Validation", "Accessibility", "Responsive"],
  },
  "combo-box": {
    title: "ComboBox Component",
    content: `Advanced dropdown with search, multi-select, and virtualization capabilities.

## Features
- **Search functionality** - Real-time filtering of options as you type
- **Multi-select support** - Choose multiple items from the dropdown
- **Virtualization** - Efficient rendering of large datasets
- **Custom rendering** - Flexible option display and formatting
- **Keyboard navigation** - Full keyboard accessibility
- **Server-side search** - Optional integration with backend APIs

## Usage
ComboBox is ideal for scenarios where users need to search through large lists of options or select multiple items from a dropdown. It's particularly useful for forms that require selecting from hundreds or thousands of options.`,
    features: [
      "Search",
      "Multi-select",
      "Virtualization",
      "Custom rendering",
      "Keyboard navigation",
    ],
  },
  "data-table": {
    title: "CustomTable Component",
    content: `A **generic, flexible table component** built with [TanStack Table](https://tanstack.com/table) and [shadcn/ui](https://ui.shadcn.com/) styling.

## Features

- ✅ **Row selection** with checkboxes (including "Select All")
- ✅ **Row expansion** for nested/child tables
- ✅ **Sorting** integration via TanStack Table
- ✅ **Dynamic column rendering** (checkbox, actions, and custom columns)
- ✅ **Infinite scroll support** with Intersection Observer
- ✅ **Customizable row actions** and sub-tables
- ✅ **Supports scrollable layout**

## Internal Logic

- Uses a custom useTable hook for:
  - Row selection state
  - Expansion state
  - Infinite scroll pagination state
- Implements **IntersectionObserver** to trigger handleLoadMore when scrolling reaches the bottom
- Dynamically injects:
  - **Checkbox column** (when showCheckbox is true)
  - **Actions column** (when actionRenderer is provided)`,
    features: [
      "Row selection",
      "Sorting",
      "Infinite scroll",
      "Custom actions",
      "Row expansion",
    ],
    props: [
      {
        name: "data",
        type: "T[] (extends BaseRow)",
        description: "Array of rows. Must include an id property.",
      },
      {
        name: "columns",
        type: "ColumnDef<T>[]",
        description: "Column definitions using TanStack Table.",
      },
      {
        name: "showCheckbox",
        type: "boolean",
        description: "Enables row selection checkboxes.",
      },
      {
        name: "actionRenderer",
        type: "(row: T) => React.ReactNode",
        description: "Function to render custom actions for each row.",
      },
      {
        name: "paginationMode",
        type: '"none" | "infinite-scroll" | "pagination"',
        default: '"none"',
        description:
          "Pagination mode. Infinite scroll supported; pagination planned.",
      },
      {
        name: "handleLoadMore",
        type: "() => void",
        description:
          "Callback triggered on infinite scroll when more data should be fetched.",
      },
    ],
  },
  table: {
    title: "Table Component",
    content: `A **minimal, lightweight table component** built with [TanStack Table](https://tanstack.com/table) and [shadcn/ui](https://ui.shadcn.com/) styling.

Designed for simple tabular data display with optional row-adding functionality.

## Features

- ✅ Renders tabular data with headers & rows
- ✅ Uses **TanStack Table** for core row model & cell rendering
- ✅ Styled with **shadcn/ui** for consistency
- ✅ Supports optional **"Add Row"** button with custom callback
- ✅ Displays a **fallback "No records found"** message when empty

## Usage
Table provides a lightweight solution for displaying simple tabular data without the complexity of advanced features. Perfect for basic data display needs.`,
    features: [
      "Basic rendering",
      "Add rows",
      "Status indicators",
      "Responsive",
    ],
    props: [
      {
        name: "data",
        type: "T[]",
        description: "Array of rows to display.",
      },
      {
        name: "columns",
        type: "ColumnDef<T>[]",
        description: "Column definitions using TanStack Table.",
      },
      {
        name: "isDisabled",
        type: "boolean",
        description: "Disables the Add Row button when true.",
      },
      {
        name: "onAddRow",
        type: "(e: any) => void",
        description: "Callback triggered when the Add Row button is clicked.",
      },
      {
        name: "showAddRowButton",
        type: "boolean",
        default: "true",
        description: "Toggles visibility of the Add Row button.",
      },
    ],
  },
};

export async function loadComponentDoc(
  componentId: string
): Promise<ComponentDoc> {
  try {
    const docPath = componentDocMap[componentId];
    if (!docPath) {
      return (
        enhancedDocs[componentId] || {
          title: "Documentation",
          content: "Documentation not available for this component.",
          features: [],
        }
      );
    }

    // In a real implementation, you would fetch the markdown file here
    // For now, we'll return the enhanced docs
    return (
      enhancedDocs[componentId] || {
        title: "Documentation",
        content: "Documentation not available for this component.",
        features: [],
      }
    );
  } catch (error) {
    console.error(`Failed to load documentation for ${componentId}:`, error);
    return (
      enhancedDocs[componentId] || {
        title: "Documentation",
        content: "Failed to load documentation for this component.",
        features: [],
      }
    );
  }
}

// Parse markdown content to extract structured data
export function parseMarkdownContent(content: string): ComponentDoc {
  const lines = content.split("\n");
  const title = lines[0].replace("# ", "");

  // Extract features from markdown
  const features: string[] = [];
  const featuresSection = content.match(
    /## ✨ Features\n([\s\S]*?)(?=\n## |$)/
  );
  if (featuresSection) {
    const featureLines = featuresSection[1].split("\n");
    featureLines.forEach((line) => {
      const match = line.match(/✅ \*\*(.*?)\*\*/);
      if (match) {
        features.push(match[1]);
      }
    });
  }

  return {
    title,
    content,
    features,
  };
}
