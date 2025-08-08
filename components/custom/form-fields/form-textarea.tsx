"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

export type FormTextAreaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    name: string;
    label?: string;
    description?: string;
    hint?: string;
    containerClassName?: string;
  };

export function FormTextArea({
  name,
  label,
  description,
  hint,
  className,
  containerClassName,
  ...props
}: FormTextAreaProps) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={containerClassName}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea
              {...field}
              {...props}
              className={cn(
                "focus-visible:ring-2 focus-visible:ring-primary",
                className
              )}
            />
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
