"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import {
  InputField,
  FormInput,
  FormPasswordInput,
  FormTextArea,
  FormSelect,
  FormDate,
} from "@/components/custom/form-fields";

type FormValues = {
  email: string;
  password: string;
  notes: string;
  status: string;
  due?: Date;
};

const statusOptions = [
  { value: "new", label: "New" },
  { value: "in-progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

export default function SampleForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      notes: "",
      status: "",
      due: undefined,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          console.log("Form submit:", data)
        )}
        className='space-y-5 max-w-md'
      >
        {/* Standalone (not RHF) */}
        <InputField
          label='Label-only Input'
          placeholder='Standalone input'
          clearable
        />

        {/* RHF-controlled text inputs */}
        <FormInput
          name='email'
          label='Email'
          placeholder='you@example.com'
          leftIcon={<Mail className='h-4 w-4 text-muted-foreground' />}
          description='We’ll send confirmations here.'
          clearable
        />

        <FormPasswordInput
          name='password'
          label='Password'
          placeholder='••••••••'
        />

        {/* New: Text Area */}
        <FormTextArea
          name='notes'
          label='Notes'
          placeholder='Enter details…'
          rows={4}
          hint='Markdown supported.'
        />

        {/* New: Select */}
        <FormSelect
          name='status'
          label='Status'
          placeholder='Choose status'
          options={statusOptions}
          description='Pick the current workflow state.'
        />

        {/* New: Date */}
        <FormDate
          name='due'
          label='Due date'
          placeholder='Pick a date'
          disablePast
          hint='Past dates are disabled.'
        />

        <Button
          type='submit'
          className='w-full bg-primary text-primary-foreground'
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
