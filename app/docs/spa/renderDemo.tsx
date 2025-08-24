"use client";

import SampleForm from "@/components/demos/sample-form";
import ButtonDemo from "@/components/demos/button-demo";
import ComboBoxDemo from "@/components/demos/combo-box-demo";
import DataTableDemo from "@/components/demos/data-table-demo";
import TableDemo from "@/components/demos/table-demo";
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
    case "combo-box":
      return <ComboBoxDemo />;
    case "data-table":
      return <DataTableDemo />;
    case "table":
      return <TableDemo />;
    default: {
      const item = ITEMS.find((i) => i.slug === slug);
      return <PlaceholderDemo name={item?.name ?? slug} />;
    }
  }
}
