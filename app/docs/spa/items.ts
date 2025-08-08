export type Item = { name: string; slug: string; description: string };

export const ITEMS: Item[] = [
  {
    name: "Button",
    slug: "button",
    description: "A reusable button component",
  },
  {
    name: "AccordionTable",
    slug: "accordion-table",
    description: "Table with expandable rows",
  },
  {
    name: "BarcodeField",
    slug: "barcode-field",
    description: "Form input for barcode scanning",
  },
  {
    name: "DateFilter",
    slug: "date-filter",
    description: "Date range filter for tables",
  },
  {
    name: "SelectField",
    slug: "select-field",
    description: "Custom select input with search",
  },
  {
    name: "SampleForm",
    slug: "sample-form",
    description: "Live form demo using shadcn + RHF",
  },
];
