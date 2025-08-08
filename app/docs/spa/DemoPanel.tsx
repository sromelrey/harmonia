"use client";

import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Item } from "./items";
import { renderDemo } from "./renderDemo";

type Props = { active: Item };

export default function DemoPanel({ active }: Props) {
  return (
    <section className='rounded-xl border border-muted bg-background/80 backdrop-blur p-5 sm:p-6'>
      <div className='mt-3'>
        <h2 className='text-2xl font-semibold'>{active.name}</h2>
        <p className='text-sm text-muted-foreground'>{active.description}</p>
      </div>

      <div className='mt-6'>{renderDemo(active.slug)}</div>
    </section>
  );
}
