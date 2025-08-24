"use client";

import { useMemo, useState } from "react";
import { Item } from "./items";

type Props = {
  items: Item[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
};

export default function Sidebar({ items, selectedSlug, onSelect }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return items.filter((i) =>
      (i.name + " " + i.description).toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <aside className='rounded-xl border border-muted bg-background/80 backdrop-blur p-4 h-fit lg:sticky lg:top-6'>
      <div className='mb-3'>
        <h1 className='text-xl font-semibold'>Harmonia Components</h1>
        <p className='text-xs text-muted-foreground'>
          Browse components & live demos
        </p>
      </div>

      <div className='mb-3'>
        <label htmlFor='search' className='sr-only'>
          Search
        </label>
        <input
          id='search'
          type='text'
          placeholder='Search components…'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='w-full rounded-md border border-muted bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary'
        />
        <div className='mt-1 text-[11px] text-muted-foreground'>
          {filtered.length} result{filtered.length === 1 ? "" : "s"}
        </div>
      </div>

      <nav className='mt-2 space-y-1'>
        {filtered.map((i, idx) => {
          const isActive = i.slug === selectedSlug;
          // precomputed tone classes to avoid dynamic tailwind class pitfalls
          const tone = [
            "border-primary/20 bg-primary/5 hover:bg-primary/10 focus-visible:ring-primary",
            "border-secondary/20 bg-secondary/5 hover:bg-secondary/10 focus-visible:ring-secondary",
            "border-accent/20 bg-accent/5 hover:bg-accent/10 focus-visible:ring-accent",
          ][idx % 3];

          return (
            <button
              key={i.slug}
              onClick={() => onSelect(i.slug)}
              aria-current={isActive ? "page" : undefined}
              className={[
                "w-full text-left rounded-md border px-3 py-2 text-sm transition hover:shadow-sm focus-visible:ring-2",
                isActive
                  ? "border-primary/30 bg-primary/10 text-foreground focus-visible:ring-primary"
                  : tone,
              ].join(" ")}
            >
              <div className='font-medium'>{i.name}</div>
              <div className='text-xs text-muted-foreground'>
                {i.description}
              </div>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className='text-xs text-muted-foreground px-1 py-2'>
            No components found.
          </div>
        )}
      </nav>
    </aside>
  );
}
