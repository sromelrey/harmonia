"use client";

import { Button } from "@/components/ui/button";

export default function ButtonDemo() {
  return (
    <div className='space-y-3'>
      <div className='text-sm text-muted-foreground'>Buttons</div>
      <div className='flex flex-wrap gap-3'>
        <Button className='bg-primary text-primary-foreground'>Primary</Button>
        <Button variant='outline' className='border-muted'>
          Outline
        </Button>
        <Button variant='ghost'>Ghost</Button>
      </div>
    </div>
  );
}
