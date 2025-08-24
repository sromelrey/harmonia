import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InfiniteScrollFooterProps {
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export default function InfiniteScrollFooter({
  isLoading = false,
  hasMore = true,
  onLoadMore,
}: InfiniteScrollFooterProps) {
  if (!hasMore) return null;

  return (
    <div className="flex justify-center py-2">
      <Button
        onClick={onLoadMore}
        disabled={isLoading}
        variant="outline"
        className="flex items-center gap-2"
      >
        {isLoading && <Loader2 className="animate-spin" size={16} />}
        {isLoading ? "Loading..." : "Load More"}
      </Button>
    </div>
  );
}
