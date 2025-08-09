"use client";

import * as React from "react";
import {
  FormProvider,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";

type UnifiedFormProps<TFieldValues extends FieldValues = FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  onSubmit?: SubmitHandler<TFieldValues>;
  children: React.ReactNode;
} & Omit<React.ComponentProps<"form">, "onSubmit">;

export function UnifiedForm<TFieldValues extends FieldValues = FieldValues>({
  form,
  onSubmit,
  children,
  ...formProps
}: UnifiedFormProps<TFieldValues>) {
  return (
    <FormProvider {...form}>
      <form
        {...formProps}
        onSubmit={form.handleSubmit((data, event) => {
          onSubmit?.(data, event);
        })}
      >
        {children}
      </form>
    </FormProvider>
  );
}
