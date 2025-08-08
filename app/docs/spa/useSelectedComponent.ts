"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useSelectedComponent(defaultSlug: string) {
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get("c") || defaultSlug;
  const [selected, setSelectedState] = useState(initial);

  // keep state in sync if URL changes
  useEffect(() => {
    const c = params.get("c");
    if (c && c !== selected) setSelectedState(c);
  }, [params, selected]);

  function setSelected(slug: string) {
    setSelectedState(slug);
    const next = new URLSearchParams(params.toString());
    next.set("c", slug);
    router.replace(`/?${next.toString()}`, { scroll: false });
  }

  return { selected, setSelected };
}
