import React from "react";
import {
  Select as UISelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the shape of option items
interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string; // The current selected value (string)
  onValueChange: (newValue: string) => void; // Callback when the value changes
  options: SelectOption[]; // Array of { value, label }
  placeholder?: string; // Optional placeholder text
  disabled?: boolean;
}

/**
 * A reusable Select component for rendering a selectable value in a table or form.
 * Now expects options as array of { value, label }.
 */
export default function Select({
  value,
  onValueChange,
  options,
  placeholder = "Select an option",
  disabled = false,
}: SelectProps) {
  return (
    <UISelect value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options
          .filter((option) => option.value.trim() !== "")
          .map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
      </SelectContent>
    </UISelect>
  );
}
