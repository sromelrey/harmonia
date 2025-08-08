"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { FormInput, FormInputProps } from "./form-input";

type FormPasswordInputProps = Omit<FormInputProps, "type" | "rightIcon">;

export function FormPasswordInput(props: FormPasswordInputProps) {
  const [show, setShow] = React.useState(false);

  return (
    <FormInput
      {...props}
      type={show ? "text" : "password"}
      rightIcon={
        <button
          type='button'
          aria-label={show ? "Hide password" : "Show password"}
          onClick={() => setShow((s) => !s)}
          className='rounded p-1 hover:bg-muted text-foreground/70'
        >
          {show ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
        </button>
      }
    />
  );
}
