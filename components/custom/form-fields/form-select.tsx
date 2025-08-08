"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type SelectOption = { value: string; label: string; disabled?: boolean };

export type FormSelectProps = {
  name: string;
  label?: string;
  description?: string;
  hint?: string;
  placeholder?: string;
  options: SelectOption[];
  containerClassName?: string;
  triggerClassName?: string;
  onValueChange?: (v: string) => void;
};

export function FormSelect({
  name,
  label,
  description,
  hint,
  placeholder = "Select…",
  options,
  containerClassName,
  triggerClassName,
  onValueChange,
}: FormSelectProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={containerClassName}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Select
              onValueChange={(v) => {
                field.onChange(v);
                onValueChange?.(v);
              }}
              value={field.value ?? ""}
            >
              <SelectTrigger
                className={cn(
                  "w-full focus-visible:ring-2 focus-visible:ring-primary",
                  triggerClassName
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
          {fieldState.error ? (
            <FormMessage />
          ) : hint ? (
            <p className='text-xs text-muted-foreground'>{hint}</p>
          ) : null}
        </FormItem>
      )}
    />
  );
}
