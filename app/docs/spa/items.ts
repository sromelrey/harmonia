export type Item = { name: string; slug: string; description: string };

export const ITEMS: Item[] = [
  {
    name: "Button",
    slug: "button",
    description: "A reusable button component",
  },
  {
    name: "ComboBox",
    slug: "combo-box",
    description:
      "Advanced dropdown with search, virtualization, and multi-select",
  },
  {
    name: "DataTable",
    slug: "data-table",
    description: "Advanced table with sorting, selection, and infinite scroll",
  },
  {
    name: "Table",
    slug: "table",
    description: "Simple table with add row functionality",
  },

  {
    name: "SampleForm",
    slug: "sample-form",
    description: "Live form demo using shadcn + RHF",
  },
];
