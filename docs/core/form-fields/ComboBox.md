# ComboBox Component

A comprehensive **ComboBox component** with infinite scroll, search, virtualization, and multi-select support.  
This component is designed to handle large datasets efficiently while providing a smooth user experience.

---

## ✨ Features

- **Infinite Scroll**: Load items on-demand as users scroll
- **Virtualization**: Efficient rendering of large datasets (10k+ items)
- **Debounced Search**: Server-side search with configurable debounce
- **Multi-select Mode**: Support for selecting multiple items
- **Keyboard Navigation**: Full keyboard support (arrows, enter, escape)
- **Custom Rendering**: Flexible item and selection rendering
- **Loading States**: Visual feedback during data loading
- **Error Handling**: Graceful handling of API errors
- **Responsive Design**: Works across all screen sizes
- **Accessibility**: ARIA-compliant with proper focus management

---

## 📦 Props

| Prop                | Type                                                                                                  | Default              | Description                                          |
| ------------------- | ----------------------------------------------------------------------------------------------------- | -------------------- | ---------------------------------------------------- |
| `items`             | `ComboBoxItem[]`                                                                                      | `[]`                 | Initial items to display                             |
| `value`             | `ComboBoxItem \| null`                                                                                | `undefined`          | Currently selected item (single-select mode)         |
| `onSelect`          | `(item: ComboBoxItem \| null) => void`                                                                | `undefined`          | Callback when item is selected (single-select mode)  |
| `placeholder`       | `string`                                                                                              | `"Search..."`        | Placeholder text for the input field                 |
| `onSearch`          | `(query: string, page: number) => Promise<{items: ComboBoxItem[], hasMore: boolean, total?: number}>` | `undefined`          | Server-side search function                          |
| `searchDebounceMs`  | `number`                                                                                              | `300`                | Debounce delay for search input (milliseconds)       |
| `initialPageSize`   | `number`                                                                                              | `100`                | Initial number of items to load                      |
| `label`             | `string`                                                                                              | `undefined`          | Label displayed above the input                      |
| `disabled`          | `boolean`                                                                                             | `false`              | Disable the ComboBox interaction                     |
| `required`          | `boolean`                                                                                             | `false`              | Mark as required field (shows `*`)                   |
| `clearable`         | `boolean`                                                                                             | `true`               | Show clear button when item is selected              |
| `multiSelect`       | `boolean`                                                                                             | `false`              | Enable multi-select mode                             |
| `selectedItems`     | `ComboBoxItem[]`                                                                                      | `[]`                 | Currently selected items (multi-select mode)         |
| `onMultiSelect`     | `(items: ComboBoxItem[]) => void`                                                                     | `undefined`          | Callback when items are selected (multi-select mode) |
| `itemHeight`        | `number`                                                                                              | `36`                 | Height of each item in pixels (for virtualization)   |
| `maxHeight`         | `number`                                                                                              | `300`                | Maximum height of dropdown in pixels                 |
| `className`         | `string`                                                                                              | `undefined`          | Additional CSS classes for the container             |
| `inputClassName`    | `string`                                                                                              | `undefined`          | Additional CSS classes for the input field           |
| `dropdownClassName` | `string`                                                                                              | `undefined`          | Additional CSS classes for the dropdown              |
| `renderItem`        | `(item: ComboBoxItem, isSelected: boolean) => React.ReactNode`                                        | `undefined`          | Custom render function for dropdown items            |
| `renderSelected`    | `(item: ComboBoxItem) => React.ReactNode`                                                             | `undefined`          | Custom render function for selected items            |
| `noResultsMessage`  | `string`                                                                                              | `"No results found"` | Message shown when no results are found              |
| `loadingMessage`    | `string`                                                                                              | `"Loading..."`       | Message shown during loading states                  |

---

## 📋 ComboBoxItem Interface

```typescript
interface ComboBoxItem {
  id: string | number;
  label: string;
  value: string;
  [key: string]: any; // Additional properties allowed
}
```

---

## 📄 Example Usage

### Basic ComboBox

```tsx
import ComboBox from "@/components/core/form-fields/combo-box";

const countries = [
  { id: 1, label: "United States", value: "us" },
  { id: 2, label: "Canada", value: "ca" },
  { id: 3, label: "United Kingdom", value: "uk" },
];

export default function MyForm() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <ComboBox
      items={countries}
      value={selectedCountry}
      onSelect={setSelectedCountry}
      placeholder='Select a country...'
      label='Country'
      required
    />
  );
}
```

### Multi-select ComboBox

```tsx
export default function MultiSelectForm() {
  const [selectedCountries, setSelectedCountries] = useState([]);

  return (
    <ComboBox
      items={countries}
      selectedItems={selectedCountries}
      onMultiSelect={setSelectedCountries}
      placeholder='Select countries...'
      label='Countries'
      multiSelect
    />
  );
}
```

### Search-enabled ComboBox

```tsx
export default function SearchForm() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSearch = async (query: string, page: number) => {
    // Call your API here
    const response = await fetch(`/api/search?q=${query}&page=${page}`);
    const data = await response.json();

    return {
      items: data.items,
      hasMore: data.hasMore,
      total: data.total,
    };
  };

  return (
    <ComboBox
      value={selectedItem}
      onSelect={setSelectedItem}
      onSearch={handleSearch}
      placeholder='Search items...'
      label='Search'
      searchDebounceMs={500}
    />
  );
}
```

### Custom Rendering

```tsx
export default function CustomRenderForm() {
  return (
    <ComboBox
      items={countries}
      placeholder='Select with custom rendering...'
      label='Custom Render'
      renderItem={(item, isSelected) => (
        <div
          className={`px-3 py-2 cursor-pointer ${
            isSelected ? "bg-blue-100" : ""
          }`}
        >
          <div className='flex items-center gap-2'>
            <span className='text-lg'>🏳️</span>
            <div>
              <div className='font-medium'>{item.label}</div>
              <div className='text-xs text-gray-500'>
                Code: {item.value.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
}
```

---

## 🔧 Advanced Features

### Server-side Search Implementation

```tsx
const handleSearch = async (query: string, page: number) => {
  try {
    const response = await fetch(`/api/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, page, pageSize: 20 }),
    });

    if (!response.ok) {
      throw new Error("Search failed");
    }

    const data = await response.json();

    return {
      items: data.items.map((item) => ({
        id: item.id,
        label: item.name,
        value: item.code,
      })),
      hasMore: data.hasMore,
      total: data.total,
    };
  } catch (error) {
    console.error("Search error:", error);
    return { items: [], hasMore: false };
  }
};
```

### Performance Optimization

```tsx
// For large datasets, use virtualization
<ComboBox
  items={largeDataset}
  itemHeight={40} // Adjust based on your item height
  maxHeight={400} // Limit dropdown height
  onSearch={handleSearch}
  searchDebounceMs={500} // Increase debounce for better performance
/>
```

### Error Handling

```tsx
const handleSearch = async (query: string, page: number) => {
  try {
    const result = await api.search(query, page);
    return result;
  } catch (error) {
    // Handle different error types
    if (error.code === "NETWORK_ERROR") {
      // Show network error message
      return { items: [], hasMore: false };
    }

    if (error.code === "RATE_LIMIT") {
      // Show rate limit message
      return { items: [], hasMore: false };
    }

    // Generic error handling
    console.error("Search failed:", error);
    return { items: [], hasMore: false };
  }
};
```

---

## 🎨 Styling

### Custom CSS Classes

```tsx
<ComboBox
  className='w-full max-w-md'
  inputClassName='border-2 border-gray-300 focus:border-blue-500'
  dropdownClassName='shadow-xl border-0'
  // ... other props
/>
```

### Dark Mode Support

The component automatically supports dark mode with Tailwind CSS classes:

```css
/* Custom dark mode styles */
.combo-box-dark {
  @apply bg-gray-900 border-gray-700 text-white;
}

.combo-box-dark .dropdown {
  @apply bg-gray-800 border-gray-600;
}
```

---

## ♿ Accessibility

The ComboBox component includes comprehensive accessibility features:

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Proper focus handling
- **Screen Reader Support**: Announcements for state changes

### Keyboard Shortcuts

- `Enter` / `Space`: Open dropdown or select item
- `Arrow Down/Up`: Navigate through items
- `Escape`: Close dropdown
- `Tab`: Move focus to next element
- `Shift+Tab`: Move focus to previous element

---

## 🚀 Performance Tips

1. **Use Virtualization**: For datasets > 1000 items
2. **Debounce Search**: Prevent excessive API calls
3. **Cache Results**: Store search results locally
4. **Lazy Loading**: Load initial data on demand
5. **Optimize Rendering**: Use `React.memo` for custom render functions

---

## 🔍 Troubleshooting

### Common Issues

**Dropdown not opening**

- Check if `disabled` prop is set to `true`
- Verify `onSelect` or `onMultiSelect` callbacks are provided

**Search not working**

- Ensure `onSearch` function is provided
- Check if `searchDebounceMs` is appropriate
- Verify API endpoint is responding correctly

**Performance issues**

- Increase `searchDebounceMs` for better performance
- Use virtualization for large datasets
- Implement proper caching strategies

**Styling issues**

- Check if Tailwind CSS is properly configured
- Verify custom CSS classes are applied correctly
- Ensure dark mode classes are available

---

## 📚 Related Components

- [InputField](./Input-field.md) - Basic input component
- [FormSelect](./Form-select.md) - Simple select dropdown
- [DataTable](../data-table.md) - Table with similar virtualization

---

## 🎯 Best Practices

1. **Always provide labels** for better accessibility
2. **Use appropriate debounce delays** (300-500ms for search)
3. **Handle loading and error states** gracefully
4. **Implement proper caching** for better performance
5. **Test with large datasets** to ensure smooth performance
6. **Provide meaningful placeholder text** for better UX
7. **Use TypeScript** for better type safety
