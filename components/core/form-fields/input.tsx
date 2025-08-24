/* eslint-disable prettier/prettier */
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

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
}: InputFieldProps) {
  return (
    <div
      className={cn(
        "flex flex-1 gap-2",
        direction === "column" ? "flex-col" : "items-center"
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

      {isTextarea ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className="border-[#dddddd] font-['Stolzl_Book'] text-[12px] disabled:bg-[#f4f4f4]"
        />
      ) : (
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className="border-[#dddddd] font-['Stolzl_Book'] text-[12px] disabled:bg-[#f4f4f4]"
        />
      )}
    </div>
  );
}
