"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type InputFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  id?: string;
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  containerClassName?: string;
};

export function InputField({
  id,
  label,
  hint,
  error,
  leftIcon,
  rightIcon,
  clearable,
  className,
  containerClassName,
  value,
  onChange,
  ...props
}: InputFieldProps) {
  const inputId = id ?? React.useId();
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<string>("");

  const currentValue = (isControlled ? (value as string) : internal) ?? "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isControlled) onChange?.(e);
    else setInternal(e.target.value);
  };

  const onClear = () => {
    if (isControlled) {
      onChange?.({
        target: { value: "" },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    } else {
      setInternal("");
    }
  };

  return (
    <div className={cn("space-y-1.5", containerClassName)}>
      {label && <Label htmlFor={inputId}>{label}</Label>}

      <div className='relative'>
        {leftIcon && (
          <span className='absolute inset-y-0 left-3 flex items-center pointer-events-none'>
            {leftIcon}
          </span>
        )}

        <Input
          id={inputId}
          value={currentValue}
          onChange={handleChange}
          className={cn(
            "focus-visible:ring-2 focus-visible:ring-primary",
            leftIcon && "pl-10",
            (rightIcon || clearable) && "pr-10",
            className
          )}
          {...props}
        />

        {(rightIcon || clearable) && (
          <span className='absolute inset-y-0 right-2 flex items-center gap-1'>
            {rightIcon}
            {clearable && currentValue && (
              <button
                type='button'
                aria-label='Clear'
                onClick={onClear}
                className='rounded p-1 hover:bg-muted text-foreground/70'
              >
                <X className='h-4 w-4' />
              </button>
            )}
          </span>
        )}
      </div>

      {error ? (
        <p className='text-xs text-destructive'>{error}</p>
      ) : hint ? (
        <p className='text-xs text-muted-foreground'>{hint}</p>
      ) : null}
    </div>
  );
}
