"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var index_exports = {};
__export(index_exports, {
  ComboBox: () => combo_box_default,
  Input: () => InputField,
  Select: () => Select2
});
module.exports = __toCommonJS(index_exports);

// components/core/form-fields/combo-box.tsx
var import_react = require("react");
var import_react_virtual = require("@tanstack/react-virtual");
var import_use_debounce = require("use-debounce");
var import_lucide_react = require("lucide-react");

// lib/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// components/ui/button.tsx
var import_react_slot = require("@radix-ui/react-slot");
var import_class_variance_authority = require("class-variance-authority");
var import_jsx_runtime = require("react/jsx-runtime");
var buttonVariants = (0, import_class_variance_authority.cva)(
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
  const Comp = asChild ? import_react_slot.Slot : "button";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}

// components/ui/input.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
var import_jsx_runtime3 = require("react/jsx-runtime");
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
  const [isOpen, setIsOpen] = (0, import_react.useState)(false);
  const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
  const [cachedItems, setCachedItems] = (0, import_react.useState)(initialItems);
  const [displayedItems, setDisplayedItems] = (0, import_react.useState)(
    initialItems.slice(0, 20)
  );
  const [isLoading, setIsLoading] = (0, import_react.useState)(false);
  const [isSearching, setIsSearching] = (0, import_react.useState)(false);
  const [hasMore, setHasMore] = (0, import_react.useState)(true);
  const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
  const containerRef = (0, import_react.useRef)(null);
  const inputRef = (0, import_react.useRef)(null);
  const dropdownRef = (0, import_react.useRef)(null);
  const [debouncedQuery] = (0, import_use_debounce.useDebounce)(searchQuery, searchDebounceMs);
  const rowVirtualizer = (0, import_react_virtual.useVirtualizer)({
    count: displayedItems.length,
    getScrollElement: () => dropdownRef.current,
    estimateSize: () => itemHeight,
    overscan: 5
  });
  const selectedItemIds = (0, import_react.useMemo)(() => {
    if (multiSelect) {
      return new Set(selectedItems.map((item) => item.id));
    }
    return new Set(value ? [value.id] : []);
  }, [multiSelect, selectedItems, value]);
  (0, import_react.useEffect)(() => {
    if (initialItems.length > 0) {
      setCachedItems(initialItems);
      setDisplayedItems(initialItems.slice(0, 20));
      setHasMore(initialItems.length > 20);
    }
  }, [initialItems]);
  (0, import_react.useEffect)(() => {
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
  const loadMore = (0, import_react.useCallback)(async () => {
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
  const handleItemSelect = (0, import_react.useCallback)(
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
  const handleClear = (0, import_react.useCallback)(() => {
    if (multiSelect) {
      onMultiSelect?.([]);
    } else {
      onSelect?.(null);
    }
    setSearchQuery("");
  }, [multiSelect, onMultiSelect, onSelect]);
  const handleInputFocus = (0, import_react.useCallback)(() => {
    setIsOpen(true);
  }, []);
  (0, import_react.useEffect)(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleKeyDown = (0, import_react.useCallback)(
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
  const defaultRenderItem = (0, import_react.useCallback)(
    (item, isSelected) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "div",
      {
        className: cn(
          "px-3 py-2 cursor-pointer hover:bg-teal-50 dark:hover:bg-teal-900/20 flex items-center gap-3",
          isSelected && "bg-teal-100 dark:bg-teal-900/30"
        ),
        onClick: () => handleItemSelect(item),
        children: [
          multiSelect && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex items-center justify-center w-4 h-4 border-2 rounded border-teal-300 bg-white", children: isSelected && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react.Check, { className: "w-3 h-3 text-teal-600" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-sm flex-1", children: item.label })
        ]
      }
    ),
    [handleItemSelect, multiSelect]
  );
  const defaultRenderSelected = (0, import_react.useCallback)(
    (item) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-sm", children: item.label }),
    []
  );
  const displayValue = (0, import_react.useMemo)(() => {
    if (multiSelect) {
      return selectedItems.length > 0 ? `${selectedItems.length} item${selectedItems.length > 1 ? "s" : ""} selected` : "";
    }
    return value ? value.label : "";
  }, [multiSelect, selectedItems, value]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ref: containerRef, className: cn("relative", className), children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: "block text-sm font-medium mb-2", children: [
      label,
      required && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-red-500 ml-1", children: "*" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "relative", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1", children: [
        isSearching && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react.Loader2, { className: "h-4 w-4 animate-spin text-teal-500" }),
        clearable && (multiSelect && selectedItems.length > 0 || !multiSelect && value) && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            className: "h-6 w-6 p-0 hover:bg-teal-50 hover:text-teal-600",
            onClick: handleClear,
            disabled,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react.X, { className: "h-3 w-3" })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          Button,
          {
            type: "button",
            variant: "ghost",
            size: "sm",
            className: "h-6 w-6 p-0 hover:bg-teal-50 hover:text-teal-600",
            onClick: () => setIsOpen(!isOpen),
            disabled,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              import_lucide_react.ChevronDown,
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
    isOpen && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "div",
      {
        ref: dropdownRef,
        className: cn(
          "absolute z-50 w-full mt-1 bg-white border-teal-200 dark:border-teal-700 rounded-md shadow-lg max-h-60 overflow-auto",
          dropdownClassName
        ),
        style: { maxHeight },
        children: isSearching ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "px-3 py-2 text-sm text-teal-600 flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react.Loader2, { className: "h-4 w-4 animate-spin" }),
          loadingMessage
        ] }) : displayedItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "px-3 py-2 text-sm text-teal-600", children: noResultsMessage }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
                return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
              hasMore && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "px-3 py-2", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  className: "w-full hover:bg-teal-50 hover:text-teal-600",
                  onClick: loadMore,
                  disabled: isLoading,
                  children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_lucide_react.Loader2, { className: "h-4 w-4 animate-spin mr-2" }),
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
var import_jsx_runtime4 = require("react/jsx-runtime");
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
var LabelPrimitive = __toESM(require("@radix-ui/react-label"));
var import_jsx_runtime5 = require("react/jsx-runtime");
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
var import_jsx_runtime6 = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
    "div",
    {
      className: cn(
        "flex flex-1 gap-2",
        direction === "column" ? "flex-col" : "items-center"
      ),
      children: [
        label && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
          Label,
          {
            htmlFor: name,
            className: "mt-[1px] w-[110px] shrink-0 pr-[10px] font-['Stolzl_Book'] text-[12px] !font-[100] leading-[15px]",
            children: [
              label,
              required && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "ml-[3px] text-red-500", children: "*" })
            ]
          }
        ),
        isTextarea ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          Textarea,
          {
            value,
            onChange: (e) => onChange(e.target.value),
            placeholder,
            disabled,
            required,
            className: "border-[#dddddd] font-['Stolzl_Book'] text-[12px] disabled:bg-[#f4f4f4]"
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
var SelectPrimitive = __toESM(require("@radix-ui/react-select"));
var import_lucide_react2 = require("lucide-react");
var import_jsx_runtime7 = require("react/jsx-runtime");
function Select({
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectPrimitive.Root, { "data-slot": "select", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectPrimitive.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_lucide_react2.ChevronDownIcon, { className: "size-4 opacity-50" }) })
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
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectScrollUpButton, {}),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          SelectPrimitive.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
    SelectPrimitive.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_lucide_react2.CheckIcon, { className: "size-4" }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectPrimitive.ItemText, { children })
      ]
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    SelectPrimitive.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_lucide_react2.ChevronUpIcon, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    SelectPrimitive.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_lucide_react2.ChevronDownIcon, { className: "size-4" })
    }
  );
}

// components/core/form-fields/select.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
function Select2({
  value,
  onValueChange,
  options,
  placeholder = "Select an option",
  disabled = false
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(Select, { value, onValueChange, disabled, children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SelectValue, { placeholder }) }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SelectContent, { children: options.filter((option) => option.value.trim() !== "").map((option) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(SelectItem, { value: option.value, children: option.label }, option.value)) })
  ] });
}

// components/core/data-table/index.tsx
var import_react4 = __toESM(require("react"));
var import_react_table3 = require("@tanstack/react-table");

// components/ui/checkbox.tsx
var CheckboxPrimitive = __toESM(require("@radix-ui/react-checkbox"));
var import_lucide_react3 = require("lucide-react");
var import_jsx_runtime9 = require("react/jsx-runtime");
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    CheckboxPrimitive.Root,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
        CheckboxPrimitive.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_lucide_react3.CheckIcon, { className: "size-3.5" })
        }
      )
    }
  );
}

// components/ui/table.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");

// components/core/data-table/header.tsx
var import_lucide_react4 = require("lucide-react");
var import_react_table = require("@tanstack/react-table");
var import_jsx_runtime11 = require("react/jsx-runtime");

// components/core/data-table/body.tsx
var import_react2 = require("react");
var import_lucide_react5 = require("lucide-react");
var import_react_table2 = require("@tanstack/react-table");
var import_jsx_runtime12 = require("react/jsx-runtime");

// components/core/data-table/useDataTable.ts
var import_react3 = require("react");
var import_use_debounce2 = require("use-debounce");

// components/core/data-table/infinite-scroll.tsx
var import_lucide_react6 = require("lucide-react");
var import_jsx_runtime13 = require("react/jsx-runtime");

// components/core/data-table/index.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
var Checkbox2 = import_react4.default.forwardRef((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Checkbox, { ref, ...props }));
Checkbox2.displayName = "Checkbox";

// components/core/table/index.tsx
var import_react_table4 = require("@tanstack/react-table");
var import_lucide_react7 = require("lucide-react");
var import_jsx_runtime15 = require("react/jsx-runtime");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ComboBox,
  Input,
  Select
});
