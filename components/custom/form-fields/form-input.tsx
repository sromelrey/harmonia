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
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type FormInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  name: string;
  label?: string;
  description?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  containerClassName?: string;
};

export function FormInput({
  name,
  label,
  description,
  hint,
  leftIcon,
  rightIcon,
  clearable,
  className,
  containerClassName,
  ...props
}: FormInputProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={containerClassName}>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <div className='relative'>
              {leftIcon && (
                <span className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
                  {leftIcon}
                </span>
              )}

              <Input
                {...field}
                {...props}
                className={cn(
                  "focus-visible:ring-2 focus-visible:ring-primary",
                  leftIcon && "pl-10",
                  (rightIcon || clearable) && "pr-10",
                  className
                )}
              />

              {(rightIcon || clearable) && (
                <span className='absolute inset-y-0 right-2 flex items-center gap-1'>
                  {rightIcon}
                  {clearable && field.value && (
                    <button
                      type='button'
                      aria-label='Clear'
                      onClick={() => field.onChange("")}
                      className='rounded p-1 hover:bg-muted text-foreground/70'
                    >
                      <X className='h-4 w-4' />
                    </button>
                  )}
                </span>
              )}
            </div>
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
