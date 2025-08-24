import React from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface ComboBoxItem {
    id: string | number;
    label: string;
    value: string;
    [key: string]: any;
}
interface ComboBoxProps {
    items?: ComboBoxItem[];
    value?: ComboBoxItem | null;
    onSelect?: (item: ComboBoxItem | null) => void;
    placeholder?: string;
    onSearch?: (query: string, page: number) => Promise<{
        items: ComboBoxItem[];
        hasMore: boolean;
        total?: number;
    }>;
    searchDebounceMs?: number;
    initialPageSize?: number;
    label?: string;
    disabled?: boolean;
    required?: boolean;
    clearable?: boolean;
    multiSelect?: boolean;
    selectedItems?: ComboBoxItem[];
    onMultiSelect?: (items: ComboBoxItem[]) => void;
    itemHeight?: number;
    maxHeight?: number;
    className?: string;
    inputClassName?: string;
    dropdownClassName?: string;
    renderItem?: (item: ComboBoxItem, isSelected: boolean) => React.ReactNode;
    renderSelected?: (item: ComboBoxItem) => React.ReactNode;
    noResultsMessage?: string;
    loadingMessage?: string;
}
declare const ComboBox: React.FC<ComboBoxProps>;

type InputType = "text" | "email" | "password" | "number";
interface InputFieldProps {
    label?: string;
    value: string;
    name: string;
    onChange: (value: string) => void;
    type?: InputType;
    placeholder?: string;
    direction?: "row" | "column";
    disabled?: boolean;
    required?: boolean;
    isTextarea?: boolean;
}
declare function InputField({ label, value, name, onChange, type, placeholder, direction, disabled, required, isTextarea, }: InputFieldProps): react_jsx_runtime.JSX.Element;

interface SelectOption {
    value: string;
    label: string;
}
interface SelectProps {
    value: string;
    onValueChange: (newValue: string) => void;
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
}
/**
 * A reusable Select component for rendering a selectable value in a table or form.
 * Now expects options as array of { value, label }.
 */
declare function Select({ value, onValueChange, options, placeholder, disabled, }: SelectProps): react_jsx_runtime.JSX.Element;

export { ComboBox, InputField as Input, Select };
