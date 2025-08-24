"use client";

import * as React from "react";
import {
  FormProvider,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";

type FormProps<TFieldValues extends FieldValues = FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  onSubmit?: SubmitHandler<TFieldValues>;
  children: React.ReactNode;
} & Omit<React.ComponentProps<"form">, "onSubmit">;

export default function Form<TFieldValues extends FieldValues = FieldValues>({
  form,
  onSubmit,
  children,
  ...formProps
}: FormProps<TFieldValues>) {
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
