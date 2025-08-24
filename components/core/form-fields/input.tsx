import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

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
  description?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  containerClassName?: string;
  className?: string;
}

export default function InputField({
  label,
  value,
  name,
  onChange,
  type = "text",
  placeholder = "",
  direction = "column",
  disabled = false,
  required = false,
  isTextarea = false,
  description,
  hint,
  leftIcon,
  rightIcon,
  clearable,
  containerClassName,
  className,
}: InputFieldProps) {
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (newValue: string) => {
    setError(null);
    onChange(newValue);
  };

  const handleClear = () => {
    handleChange("");
  };

  return (
    <div
      className={cn(
        "flex flex-1 gap-2",
        direction === "column" ? "flex-col" : "items-center",
        containerClassName
      )}
    >
      {label && (
        <Label
          htmlFor={name}
          className="mt-[1px] w-[110px] shrink-0 pr-[10px] font-['Stolzl_Book'] text-[12px] !font-[100] leading-[15px]"
        >
          {label}
          {required && <span className='ml-[3px] text-red-500'>*</span>}
        </Label>
      )}

      <div className='relative flex-1'>
        {leftIcon && (
          <span className='absolute inset-y-0 left-3 flex items-center pointer-events-none z-10'>
            {leftIcon}
          </span>
        )}

        {isTextarea ? (
          <Textarea
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={cn(
              "border-[#dddddd] font-['Stolzl_Book'] text-[12px] disabled:bg-[#f4f4f4] focus-visible:ring-2 focus-visible:ring-primary",
              leftIcon && "pl-10",
              (rightIcon || clearable) && "pr-10",
              className
            )}
          />
        ) : (
          <Input
            type={type}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={cn(
              "border-[#dddddd] font-['Stolzl_Book'] text-[12px] disabled:bg-[#f4f4f4] focus-visible:ring-2 focus-visible:ring-primary",
              leftIcon && "pl-10",
              (rightIcon || clearable) && "pr-10",
              className
            )}
          />
        )}

        {(rightIcon || clearable) && (
          <span className='absolute inset-y-0 right-2 flex items-center gap-1'>
            {rightIcon}
            {clearable && value && (
              <button
                type='button'
                aria-label='Clear'
                onClick={handleClear}
                className='rounded p-1 hover:bg-muted text-foreground/70'
              >
                <X className='h-4 w-4' />
              </button>
            )}
          </span>
        )}
      </div>

      {description && (
        <p className='text-xs text-muted-foreground mt-1'>{description}</p>
      )}

      {error ? (
        <p className='text-xs text-red-500 mt-1'>{error}</p>
      ) : hint ? (
        <p className='text-xs text-muted-foreground mt-1'>{hint}</p>
      ) : null}
    </div>
  );
}
