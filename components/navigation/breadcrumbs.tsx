"use client";

import * as React from "react";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

function slugToTitle(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

/** Build crumbs from an href like "/docs/sample-form" → Home / Docs / Sample Form */
function buildFromHref(href: string): Crumb[] {
  const segments = href.split("/").filter(Boolean);
  return [
    { label: "Home", href: "/" },
    ...segments.map((seg, i) => {
      const path = "/" + segments.slice(0, i + 1).join("/");
      return {
        label: slugToTitle(seg),
        href: i === segments.length - 1 ? undefined : path,
      };
    }),
  ];
}

export interface BreadcrumbsProps {
  /** Either pass a full href to auto-build crumbs... */
  href?: string;
  /** ...or pass custom items (overrides `href`) */
  items?: Crumb[];
  className?: string;
}

export function Breadcrumbs({
  href = "/",
  items,
  className,
}: BreadcrumbsProps) {
  const crumbs = items ?? buildFromHref(href);
  const lastIndex = crumbs.length - 1;

  return (
    <nav aria-label='Breadcrumb' className={className}>
      <ol className='flex flex-wrap items-center gap-1 text-xs text-muted-foreground'>
        {crumbs.map((item, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === lastIndex;

          return (
            <li
              key={`${item.label}-${idx}`}
              className='flex items-center gap-1'
            >
              {isFirst ? (
                item.href ? (
                  <Link
                    href={item.href}
                    className='inline-flex items-center gap-1 hover:underline'
                  >
                    <Home className='h-3.5 w-3.5' />
                    <span className='sr-only'>Home</span>
                  </Link>
                ) : (
                  <span className='inline-flex items-center gap-1'>
                    <Home className='h-3.5 w-3.5' />
                    <span className='sr-only'>Home</span>
                  </span>
                )
              ) : (
                <>
                  <ChevronRight className='h-3.5 w-3.5 opacity-70' />
                  {isLast || !item.href ? (
                    <span
                      className='text-foreground'
                      aria-current={isLast ? "page" : undefined}
                    >
                      {item.label}
                    </span>
                  ) : (
                    <Link href={item.href} className='hover:underline'>
                      {item.label}
                    </Link>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Convenience helper for docs pages. */
export function DocsBreadcrumbs({ slug }: { slug: string }) {
  return <Breadcrumbs href={`/docs/${slug}`} />;
}
