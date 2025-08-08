"use client";

import SampleForm from "@/components/demos/sample-form";
import ButtonDemo from "@/components/demos/button-demo";
import { ITEMS } from "./items";

function PlaceholderDemo({ name }: { name: string }) {
  return (
    <div className='rounded-lg border border-dashed border-muted p-6 text-sm text-muted-foreground'>
      <div className='font-medium text-foreground mb-1'>{name}</div>
      <p>
        Demo coming soon. Add a component-specific demo and map it in{" "}
        <code>renderDemo()</code>.
      </p>
    </div>
  );
}

export function renderDemo(slug: string) {
  switch (slug) {
    case "sample-form":
      return <SampleForm />;
    case "button":
      return <ButtonDemo />;
    default: {
      const item = ITEMS.find((i) => i.slug === slug);
      return <PlaceholderDemo name={item?.name ?? slug} />;
    }
  }
}
