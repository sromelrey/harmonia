import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useDebounce } from "use-debounce";
import { Search, ChevronDown, X, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface ComboBoxItem {
  id: string | number;
  label: string;
  value: string;
  [key: string]: any;
}

export interface ComboBoxProps {
  // Core props
  items?: ComboBoxItem[];
  value?: ComboBoxItem | null;
  onSelect?: (item: ComboBoxItem | null) => void;
  placeholder?: string;

  // Search & API props
  onSearch?: (
    query: string,
    page: number
  ) => Promise<{
    items: ComboBoxItem[];
    hasMore: boolean;
    total?: number;
  }>;
  searchDebounceMs?: number;
  initialPageSize?: number;

  // Display props
  label?: string;
  disabled?: boolean;
  required?: boolean;
  clearable?: boolean;

  // Multi-select props
  multiSelect?: boolean;
  selectedItems?: ComboBoxItem[];
  onMultiSelect?: (items: ComboBoxItem[]) => void;

  // Customization
  itemHeight?: number;
  maxHeight?: number;
  className?: string;
  inputClassName?: string;
  dropdownClassName?: string;

  // Render props
  renderItem?: (item: ComboBoxItem, isSelected: boolean) => React.ReactNode;
  renderSelected?: (item: ComboBoxItem) => React.ReactNode;
  noResultsMessage?: string;
  loadingMessage?: string;
}

export const ComboBox: React.FC<ComboBoxProps> = ({
  items: initialItems = [],
  value,
  onSelect,
  placeholder = "Search...",

  onSearch,
  searchDebounceMs = 300,
  initialPageSize = 100,

  label,
  disabled = false,
  required = false,
  clearable = true,

  multiSelect = false,
  selectedItems = [],
  onMultiSelect,

  itemHeight = 36,
  maxHeight = 300,
  className,
  inputClassName,
  dropdownClassName,

  renderItem,
  renderSelected,
  noResultsMessage = "No results found",
  loadingMessage = "Loading...",
}) => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cachedItems, setCachedItems] = useState<ComboBoxItem[]>(initialItems);
  const [displayedItems, setDisplayedItems] = useState<ComboBoxItem[]>(
    initialItems.slice(0, 20)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced search query
  const [debouncedQuery] = useDebounce(searchQuery, searchDebounceMs);

  // Virtualization
  const rowVirtualizer = useVirtualizer({
    count: displayedItems.length,
    getScrollElement: () => dropdownRef.current,
    estimateSize: () => itemHeight,
    overscan: 5,
  });

  // Memoized selected state
  const selectedItemIds = useMemo(() => {
    if (multiSelect) {
      return new Set(selectedItems.map((item) => item.id));
    }
    return new Set(value ? [value.id] : []);
  }, [multiSelect, selectedItems, value]);

  // Initialize with initial items
  useEffect(() => {
    if (initialItems.length > 0) {
      setCachedItems(initialItems);
      setDisplayedItems(initialItems.slice(0, 20));
      setHasMore(initialItems.length > 20);
    }
  }, [initialItems]);

  // Handle search
  useEffect(() => {
    if (!onSearch) return;

    const performSearch = async () => {
      if (!debouncedQuery.trim()) {
        // Reset to initial items when search is cleared
        setDisplayedItems(cachedItems.slice(0, 20));
        setHasMore(cachedItems.length > 20);
        setCurrentPage(1);
        return;
      }

      setIsSearching(true);
      setCurrentPage(1);

      try {
        const result = await onSearch(debouncedQuery, 1);
        setDisplayedItems(result.items);
        setHasMore(result.hasMore);

        // Merge new items into cache
        const newItems = result.items.filter(
          (item) => !cachedItems.find((cached) => cached.id === item.id)
        );
        setCachedItems((prev) => [...prev, ...newItems]);
      } catch (error) {
        console.error("Search failed:", error);
        setDisplayedItems([]);
        setHasMore(false);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedQuery, onSearch, cachedItems]);

  // Load more items (infinite scroll)
  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading || isSearching) return;

    setIsLoading(true);

    try {
      if (onSearch && debouncedQuery.trim()) {
        // Load more search results
        const nextPage = currentPage + 1;
        const result = await onSearch(debouncedQuery, nextPage);

        setDisplayedItems((prev) => [...prev, ...result.items]);
        setHasMore(result.hasMore);
        setCurrentPage(nextPage);

        // Merge new items into cache
        const newItems = result.items.filter(
          (item) => !cachedItems.find((cached) => cached.id === item.id)
        );
        setCachedItems((prev) => [...prev, ...newItems]);
      } else {
        // Load more from cached items
        const currentLength = displayedItems.length;
        const nextItems = cachedItems.slice(currentLength, currentLength + 20);

        if (nextItems.length > 0) {
          setDisplayedItems((prev) => [...prev, ...nextItems]);
          setHasMore(currentLength + nextItems.length < cachedItems.length);
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("Failed to load more items:", error);
    } finally {
      setIsLoading(false);
    }
  }, [
    hasMore,
    isLoading,
    isSearching,
    onSearch,
    debouncedQuery,
    currentPage,
    displayedItems.length,
    cachedItems,
  ]);

  // Handle item selection
  const handleItemSelect = useCallback(
    (item: ComboBoxItem) => {
      if (multiSelect) {
        const newSelectedItems = selectedItemIds.has(item.id)
          ? selectedItems.filter((selected) => selected.id !== item.id)
          : [...selectedItems, item];
        onMultiSelect?.(newSelectedItems);
      } else {
        onSelect?.(item);
        setIsOpen(false);
        setSearchQuery("");
      }
    },
    [multiSelect, selectedItemIds, selectedItems, onMultiSelect, onSelect]
  );

  // Handle clear selection
  const handleClear = useCallback(() => {
    if (multiSelect) {
      onMultiSelect?.([]);
    } else {
      onSelect?.(null);
    }
    setSearchQuery("");
  }, [multiSelect, onMultiSelect, onSelect]);

  // Handle input focus
  const handleInputFocus = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!isOpen) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setIsOpen(true);
        }
        return;
      }

      switch (event.key) {
        case "Escape":
          setIsOpen(false);
          break;
        case "ArrowDown":
          event.preventDefault();
          // Focus next item
          break;
        case "ArrowUp":
          event.preventDefault();
          // Focus previous item
          break;
        case "Enter":
          event.preventDefault();
          // Select focused item
          break;
      }
    },
    [isOpen]
  );

  // Default render functions
  const defaultRenderItem = useCallback(
    (item: ComboBoxItem, isSelected: boolean) => (
      <div
        className={cn(
          "px-3 py-2 cursor-pointer hover:bg-teal-50 dark:hover:bg-teal-900/20 flex items-center gap-3",
          isSelected && "bg-teal-100 dark:bg-teal-900/30"
        )}
        onClick={() => handleItemSelect(item)}
      >
        {multiSelect && (
          <div className='flex items-center justify-center w-4 h-4 border-2 rounded border-teal-300 bg-white'>
            {isSelected && <Check className='w-3 h-3 text-teal-600' />}
          </div>
        )}
        <span className='text-sm flex-1'>{item.label}</span>
      </div>
    ),
    [handleItemSelect, multiSelect]
  );

  const defaultRenderSelected = useCallback(
    (item: ComboBoxItem) => <span className='text-sm'>{item.label}</span>,
    []
  );

  // Display value
  const displayValue = useMemo(() => {
    if (multiSelect) {
      return selectedItems.length > 0
        ? `${selectedItems.length} item${
            selectedItems.length > 1 ? "s" : ""
          } selected`
        : "";
    }
    return value ? value.label : "";
  }, [multiSelect, selectedItems, value]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {label && (
        <label className='block text-sm font-medium mb-2'>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
      )}

      <div className='relative'>
        <Input
          ref={inputRef}
          value={isOpen ? searchQuery : displayValue}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={isOpen ? placeholder : displayValue || placeholder}
          disabled={disabled}
          className={cn(
            "pr-10 cursor-pointer",
            isOpen && "cursor-text",
            inputClassName
          )}
          readOnly={!isOpen}
        />

        <div className='absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1'>
          {isSearching && (
            <Loader2 className='h-4 w-4 animate-spin text-teal-500' />
          )}

          {clearable &&
            ((multiSelect && selectedItems.length > 0) ||
              (!multiSelect && value)) && (
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='h-6 w-6 p-0 hover:bg-teal-50 hover:text-teal-600'
                onClick={handleClear}
                disabled={disabled}
              >
                <X className='h-3 w-3' />
              </Button>
            )}

          <Button
            type='button'
            variant='ghost'
            size='sm'
            className='h-6 w-6 p-0 hover:bg-teal-50 hover:text-teal-600'
            onClick={() => setIsOpen(!isOpen)}
            disabled={disabled}
          >
            <ChevronDown
              className={cn(
                "h-3 w-3 transition-transform",
                isOpen && "rotate-180"
              )}
            />
          </Button>
        </div>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={cn(
            "absolute z-50 w-full mt-1 bg-white border-teal-200 dark:border-teal-700 rounded-md shadow-lg max-h-60 overflow-auto",
            dropdownClassName
          )}
          style={{ maxHeight }}
        >
          {isSearching ? (
            <div className='px-3 py-2 text-sm text-teal-600 flex items-center gap-2'>
              <Loader2 className='h-4 w-4 animate-spin' />
              {loadingMessage}
            </div>
          ) : displayedItems.length === 0 ? (
            <div className='px-3 py-2 text-sm text-teal-600'>
              {noResultsMessage}
            </div>
          ) : (
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: "100%",
                position: "relative",
              }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow: any) => {
                const item = displayedItems[virtualRow.index];
                const isSelected = selectedItemIds.has(item.id);

                return (
                  <div
                    key={item.id}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    {renderItem
                      ? renderItem(item, isSelected)
                      : defaultRenderItem(item, isSelected)}
                  </div>
                );
              })}

              {/* Load more trigger */}
              {hasMore && (
                <div className='px-3 py-2'>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    className='w-full hover:bg-teal-50 hover:text-teal-600'
                    onClick={loadMore}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className='h-4 w-4 animate-spin mr-2' />
                        Loading...
                      </>
                    ) : (
                      "Load more"
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ComboBox;
