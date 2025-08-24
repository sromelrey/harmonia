"use client";

import { Button } from "@/components/ui/button";

export default function WhyHarmoniaSection() {
  return (
    <section className='p-6 sm:p-8 lg:p-10'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-8 text-center'>
          <h2 className='text-3xl font-bold mb-4'>Why Harmonia Components?</h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            In many projects, similar UI elements are rebuilt over and over—
            creating redundant code, inconsistent designs, and maintenance
            overhead. Harmonia Components delivers reusable, production-ready
            blocks so teams ship faster with a unified design language.
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-3'>
          <div className='border rounded-xl p-5'>
            <h3 className='font-semibold mb-2'>Efficiency</h3>
            <p className='text-sm text-muted-foreground'>
              Reuse pre-built components to reduce implementation time and focus
              on product value.
            </p>
          </div>
          <div className='border rounded-xl p-5'>
            <h3 className='font-semibold mb-2'>Consistency</h3>
            <p className='text-sm text-muted-foreground'>
              Maintain a single source of truth for UI patterns across multiple
              apps and teams.
            </p>
          </div>
          <div className='border rounded-xl p-5'>
            <h3 className='font-semibold mb-2'>Maintainability</h3>
            <p className='text-sm text-muted-foreground'>
              Update in one place—propagate refinements everywhere with less
              risk and lower upkeep.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
