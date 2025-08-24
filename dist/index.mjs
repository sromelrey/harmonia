// components/core/form-fields/combo-box.tsx
import {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect
} from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useDebounce } from "use-debounce";
import { ChevronDown, X, Loader2, Check } from "lucide-react";

// lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// components/ui/button.tsx
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { jsx } from "react/jsx-runtime";
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}

// components/ui/input.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx2(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}

// components/core/form-fields/combo-box.tsx
import { Fragment, jsx as jsx3, jsxs } from "react/jsx-runtime";
var ComboBox = ({
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
  loadingMessage = "Loading..."
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cachedItems, setCachedItems] = useState(initialItems);
  const [displayedItems, setDisplayedItems] = useState(
    initialItems.slice(0, 20)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [debouncedQuery] = useDebounce(searchQuery, searchDebounceMs);
  const rowVirtualizer = useVirtualizer({
    count: displayedItems.length,
    getScrollElement: () => dropdownRef.current,
    estimateSize: () => itemHeight,
    overscan: 5
  });
  const selectedItemIds = useMemo(() => {
    if (multiSelect) {
      return new Set(selectedItems.map((item) => item.id));
    }
    return new Set(value ? [value.id] : []);
  }, [multiSelect, selectedItems, value]);
  useEffect(() => {
    if (initialItems.length > 0) {
      setCachedItems(initialItems);
      setDisplayedItems(initialItems.slice(0, 20));
      setHasMore(initialItems.length > 20);
    }
  }, [initialItems]);
  useEffect(() => {
    if (!onSearch) return;
    const performSearch = async () => {
      if (!debouncedQuery.trim()) {
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
  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading || isSearching) return;
    setIsLoading(true);
    try {
      if (onSearch && debouncedQuery.trim()) {
        const nextPage = currentPage + 1;
        const result = await onSearch(debouncedQuery, nextPage);
        setDisplayedItems((prev) => [...prev, ...result.items]);
        setHasMore(result.hasMore);
        setCurrentPage(nextPage);
        const newItems = result.items.filter(
          (item) => !cachedItems.find((cached) => cached.id === item.id)
        );
        setCachedItems((prev) => [...prev, ...newItems]);
      } else {
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
    cachedItems
  ]);
  const handleItemSelect = useCallback(
    (item) => {
      if (multiSelect) {
        const newSelectedItems = selectedItemIds.has(item.id) ? selectedItems.filter((selected) => selected.id !== item.id) : [...selectedItems, item];
        onMultiSelect?.(newSelectedItems);
      } else {
        onSelect?.(item);
        setIsOpen(false);
        setSearchQuery("");
      }
    },
    [multiSelect, selectedItemIds, selectedItems, onMultiSelect, onSelect]
  );
  const handleClear = useCallback(() => {
    if (multiSelect) {
      onMultiSelect?.([]);
    } else {
      onSelect?.(null);
    }
    setSearchQuery("");
  }, [multiSelect, onMultiSelect, onSelect]);
  const handleInputFocus = useCallback(() => {
    setIsOpen(true);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleKeyDown = useCallback(
    (event) => {
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
          break;
        case "ArrowUp":
          event.preventDefault();
          break;
        case "Enter":
          event.preventDefault();
          break;
      }
    },
    [isOpen]
  );
  const defaultRenderItem = useCallback(
    (item, isSelected) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "px-3 py-2 cursor-pointer hover:bg-teal-50 dark:hover:bg-teal-900/20 flex items-center gap-3",
          isSelected && "bg-teal-100 dark:bg-teal-900/30"
        ),
        onClick: () => handleItemSelect(item),
        children: [
          multiSelect && /* @__PURE__ */ jsx3("div", { className: "flex items-center justify-center w-4 h-4 border-2 rounded border-teal-300 bg-white", children: isSelected && /* @__PURE__ */ jsx3(Check, { className: "w-3 h-3 text-teal-600" }) }),
          /* @__PURE__ */ jsx3("span", { className: "text-sm flex-1", children: item.label })
        ]
      }
    ),
    [handleItemSelect, multiSelect]
  );
  const defaultRenderSelected = useCallback(
    (item) => /* @__PURE__ */ jsx3("span", { className: "text-sm", children: item.label }),
    []
  );
  const displayValue = useMemo(() => {
    if (multiSelect) {
      return selectedItems.length > 0 ? `${selectedItems.length} item${selectedItems.length > 1 ? "s" : ""} selected` : "";
    }
    return value ? value.label : "";
  }, [multiSelect, selectedItems, value]);
  return /* @__PURE__ */ jsxs("div", { ref: containerRef, className: cn("relative", className), children: [
    label && /* @__PURE__ */ jsxs("label", { className: "block text-sm font-medium mb-2", children: [
      label,
      required && /* @__PURE__ */ jsx3("span", { className: "text-red-500 ml-1", children: "*" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx3(
        Input,
        {
          ref: inputRef,
          value: isOpen ? searchQuery : displayValue,
          onChange: (e) => setSearchQuery(e.target.value),
          onFocus: handleInputFocus,
          onKeyDown: handleKeyDown,
          placeholder: isOpen ? placeholder : displayValue || placeholder,
          disabled,
          className: cn(
            "pr-10 cursor-pointer",
            isOpen && "cursor-text",
            inputClassName
          ),
          readOnly: !isOpen
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1", children: [
        isSearching && /* @__PURE__ */ jsx3(Loader2, { className: "h-4 w-4 animate-spin text-teal-500" }),
        clearable && (multiSelect && selectedItems.length > 0 || !multiSelect && value) && /* @__PURE__ */ jsx3(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            className: "h-6 w-6 p-0 hover:bg-teal-50 hover:text-teal-600",
            onClick: handleClear,
            disabled,
            children: /* @__PURE__ */ jsx3(X, { className: "h-3 w-3" })
          }
        ),
        /* @__PURE__ */ jsx3(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            className: "h-6 w-6 p-0 hover:bg-teal-50 hover:text-teal-600",
            onClick: () => setIsOpen(!isOpen),
            disabled,
            children: /* @__PURE__ */ jsx3(
              ChevronDown,
              {
                className: cn(
                  "h-3 w-3 transition-transform",
                  isOpen && "rotate-180"
                )
              }
            )
          }
        )
      ] })
    ] }),
    isOpen && /* @__PURE__ */ jsx3(
      "div",
      {
        ref: dropdownRef,
        className: cn(
          "absolute z-50 w-full mt-1 bg-white border-teal-200 dark:border-teal-700 rounded-md shadow-lg max-h-60 overflow-auto",
          dropdownClassName
        ),
        style: { maxHeight },
        children: isSearching ? /* @__PURE__ */ jsxs("div", { className: "px-3 py-2 text-sm text-teal-600 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx3(Loader2, { className: "h-4 w-4 animate-spin" }),
          loadingMessage
        ] }) : displayedItems.length === 0 ? /* @__PURE__ */ jsx3("div", { className: "px-3 py-2 text-sm text-teal-600", children: noResultsMessage }) : /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative"
            },
            children: [
              rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const item = displayedItems[virtualRow.index];
                const isSelected = selectedItemIds.has(item.id);
                return /* @__PURE__ */ jsx3(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`
                    },
                    children: renderItem ? renderItem(item, isSelected) : defaultRenderItem(item, isSelected)
                  },
                  item.id
                );
              }),
              hasMore && /* @__PURE__ */ jsx3("div", { className: "px-3 py-2", children: /* @__PURE__ */ jsx3(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  className: "w-full hover:bg-teal-50 hover:text-teal-600",
                  onClick: loadMore,
                  disabled: isLoading,
                  children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx3(Loader2, { className: "h-4 w-4 animate-spin mr-2" }),
                    "Loading..."
                  ] }) : "Load more"
                }
              ) })
            ]
          }
        )
      }
    )
  ] });
};
var combo_box_default = ComboBox;

// components/ui/textarea.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx4(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}

// components/ui/label.tsx
import * as LabelPrimitive from "@radix-ui/react-label";
import { jsx as jsx5 } from "react/jsx-runtime";
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx5(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}

// components/core/form-fields/input.tsx
import { jsx as jsx6, jsxs as jsxs2 } from "react/jsx-runtime";
function InputField({
  label,
  value,
  name,
  onChange,
  type = "text",
  placeholder = "",
  direction = "column",
  disabled = false,
  required = false,
  isTextarea = false
}) {
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      className: cn(
        "flex flex-1 gap-2",
        direction === "column" ? "flex-col" : "items-center"
      ),
      children: [
        label && /* @__PURE__ */ jsxs2(
          Label,
          {
            htmlFor: name,
            className: "mt-[1px] w-[110px] shrink-0 pr-[10px] font-['Stolzl_Book'] text-[12px] !font-[100] leading-[15px]",
            children: [
              label,
              required && /* @__PURE__ */ jsx6("span", { className: "ml-[3px] text-red-500", children: "*" })
            ]
          }
        ),
        isTextarea ? /* @__PURE__ */ jsx6(
          Textarea,
          {
            value,
            onChange: (e) => onChange(e.target.value),
            placeholder,
            disabled,
            required,
            className: "border-[#dddddd] font-['Stolzl_Book'] text-[12px] disabled:bg-[#f4f4f4]"
          }
        ) : /* @__PURE__ */ jsx6(
          Input,
          {
            type,
            value,
            onChange: (e) => onChange(e.target.value),
            placeholder,
            disabled,
            required,
            className: "border-[#dddddd] font-['Stolzl_Book'] text-[12px] disabled:bg-[#f4f4f4]"
          }
        )
      ]
    }
  );
}

// components/ui/select.tsx
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { jsx as jsx7, jsxs as jsxs3 } from "react/jsx-runtime";
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsx7(SelectPrimitive.Root, { "data-slot": "select", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsx7(SelectPrimitive.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs3(
    SelectPrimitive.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx7(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx7(ChevronDownIcon, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}) {
  return /* @__PURE__ */ jsx7(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs3(
    SelectPrimitive.Content,
    {
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      ...props,
      children: [
        /* @__PURE__ */ jsx7(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsx7(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsx7(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs3(
    SelectPrimitive.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx7("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx7(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx7(CheckIcon, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsx7(SelectPrimitive.ItemText, { children })
      ]
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx7(
    SelectPrimitive.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx7(ChevronUpIcon, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx7(
    SelectPrimitive.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx7(ChevronDownIcon, { className: "size-4" })
    }
  );
}

// components/core/form-fields/select.tsx
import { jsx as jsx8, jsxs as jsxs4 } from "react/jsx-runtime";
function Select2({
  value,
  onValueChange,
  options,
  placeholder = "Select an option",
  disabled = false
}) {
  return /* @__PURE__ */ jsxs4(Select, { value, onValueChange, disabled, children: [
    /* @__PURE__ */ jsx8(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx8(SelectValue, { placeholder }) }),
    /* @__PURE__ */ jsx8(SelectContent, { children: options.filter((option) => option.value.trim() !== "").map((option) => /* @__PURE__ */ jsx8(SelectItem, { value: option.value, children: option.label }, option.value)) })
  ] });
}

// components/core/data-table/index.tsx
import React3, { useEffect as useEffect2, useMemo as useMemo2, useRef as useRef2, useState as useState3 } from "react";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";

// components/ui/checkbox.tsx
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon as CheckIcon2 } from "lucide-react";
import { jsx as jsx9 } from "react/jsx-runtime";
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx9(
    CheckboxPrimitive.Root,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx9(
        CheckboxPrimitive.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsx9(CheckIcon2, { className: "size-3.5" })
        }
      )
    }
  );
}

// components/ui/table.tsx
import { jsx as jsx10 } from "react/jsx-runtime";

// components/core/data-table/header.tsx
import { ChevronsUpDown, ChevronsDown, ChevronsUp } from "lucide-react";
import { flexRender } from "@tanstack/react-table";
import { Fragment as Fragment2, jsx as jsx11, jsxs as jsxs5 } from "react/jsx-runtime";

// components/core/data-table/body.tsx
import { Fragment as Fragment3 } from "react";
import { ChevronUp, ChevronDown as ChevronDown2 } from "lucide-react";
import { flexRender as flexRender2 } from "@tanstack/react-table";
import { Fragment as Fragment4, jsx as jsx12, jsxs as jsxs6 } from "react/jsx-runtime";

// components/core/data-table/useDataTable.ts
import { useState as useState2, useCallback as useCallback2 } from "react";
import { useDebouncedCallback } from "use-debounce";

// components/core/data-table/infinite-scroll.tsx
import { Loader2 as Loader22 } from "lucide-react";
import { jsx as jsx13, jsxs as jsxs7 } from "react/jsx-runtime";

// components/core/data-table/index.tsx
import { jsx as jsx14, jsxs as jsxs8 } from "react/jsx-runtime";
var Checkbox2 = React3.forwardRef((props, ref) => /* @__PURE__ */ jsx14(Checkbox, { ref, ...props }));
Checkbox2.displayName = "Checkbox";

// components/core/table/index.tsx
import {
  useReactTable as useReactTable2,
  getCoreRowModel as getCoreRowModel2,
  flexRender as flexRender3
} from "@tanstack/react-table";
import { CirclePlus } from "lucide-react";
import { jsx as jsx15, jsxs as jsxs9 } from "react/jsx-runtime";
export {
  combo_box_default as ComboBox,
  InputField as Input,
  Select2 as Select
};
