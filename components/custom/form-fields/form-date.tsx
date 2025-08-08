"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface FormDateProps {
  name: string;
  label: string;
  placeholder?: string;
  disablePast?: boolean;
  hint?: string;
  /** Keep the popover width equal to the trigger */
  fitToTrigger?: boolean;
  /** Minimum width for the popover/calendar (px). Default: 280 */
  minContentWidth?: number;
}

export function FormDate({
  name,
  label,
  placeholder = "Pick a date",
  disablePast,
  hint,
  fitToTrigger = true,
  minContentWidth = 280,
}: FormDateProps) {
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const [contentWidth, setContentWidth] = React.useState<number | undefined>();

  // Match popover width to trigger
  React.useEffect(() => {
    if (!fitToTrigger || !triggerRef.current) return;
    const btn = triggerRef.current;
    const setWidth = () => setContentWidth(btn.offsetWidth);
    setWidth();
    const ro = new ResizeObserver(setWidth);
    ro.observe(btn);
    window.addEventListener("resize", setWidth);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", setWidth);
    };
  }, [fitToTrigger]);

  const isPastDisabled = React.useCallback(
    (date: Date) => {
      if (!disablePast) return false;
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return d < today;
    },
    [disablePast]
  );

  const computedWidth =
    fitToTrigger && contentWidth
      ? Math.max(minContentWidth, contentWidth)
      : minContentWidth;

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>{label}</FormLabel>

          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  ref={triggerRef}
                  type='button'
                  variant='outline'
                  className={cn(
                    "w-full justify-between text-left font-normal bg-background border-muted",
                    "focus-visible:ring-2 focus-visible:ring-primary",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className='h-4 w-4 opacity-60' />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent
              align='start'
              sideOffset={4}
              className='p-0 bg-background border border-muted shadow-lg rounded-md'
              style={{ width: computedWidth }}
            >
              <Calendar
                mode='single'
                selected={field.value}
                onSelect={field.onChange}
                disabled={isPastDisabled}
                initialFocus
                className='w-full bg-background rounded-md'
              />
            </PopoverContent>
          </Popover>

          {hint && <p className='text-xs text-muted-foreground'>{hint}</p>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
