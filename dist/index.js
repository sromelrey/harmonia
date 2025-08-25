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
  DataTable: () => data_table_default,
  Form: () => Form,
  Input: () => InputField,
  Select: () => Select2,
  Table: () => Table2,
  getBaseCellClassNames: () => getBaseCellClassNames,
  getBodyCellClassNames: () => getBodyCellClassNames,
  getHeaderCellClassNames: () => getHeaderCellClassNames,
  setCellAlignment: () => setCellAlignment,
  setCellBorder: () => setCellBorder,
  useDataTable: () => useDataTable
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

// components/core/form-fields/input.tsx
var import_react2 = __toESM(require("react"));

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
var import_lucide_react2 = require("lucide-react");
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
  isTextarea = false,
  description,
  hint,
  leftIcon,
  rightIcon,
  clearable,
  containerClassName,
  className
}) {
  const [error, setError] = import_react2.default.useState(null);
  const handleChange = (newValue) => {
    setError(null);
    onChange(newValue);
  };
  const handleClear = () => {
    handleChange("");
  };
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
    "div",
    {
      className: cn(
        "flex flex-1 gap-2",
        direction === "column" ? "flex-col" : "items-center",
        containerClassName
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
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "relative flex-1", children: [
          leftIcon && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "absolute inset-y-0 left-3 flex items-center pointer-events-none z-10", children: leftIcon }),
          isTextarea ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            Textarea,
            {
              value,
              onChange: (e) => handleChange(e.target.value),
              placeholder,
              disabled,
              required,
              className: cn(
                "border-[#dddddd] font-['Stolzl_Book'] text-[12px] disabled:bg-[#f4f4f4] focus-visible:ring-2 focus-visible:ring-primary",
                leftIcon && "pl-10",
                (rightIcon || clearable) && "pr-10",
                className
              )
            }
          ) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            Input,
            {
              type,
              value,
              onChange: (e) => handleChange(e.target.value),
              placeholder,
              disabled,
              required,
              className: cn(
                "border-[#dddddd] font-['Stolzl_Book'] text-[12px] disabled:bg-[#f4f4f4] focus-visible:ring-2 focus-visible:ring-primary",
                leftIcon && "pl-10",
                (rightIcon || clearable) && "pr-10",
                className
              )
            }
          ),
          (rightIcon || clearable) && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "absolute inset-y-0 right-2 flex items-center gap-1", children: [
            rightIcon,
            clearable && value && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
              "button",
              {
                type: "button",
                "aria-label": "Clear",
                onClick: handleClear,
                className: "rounded p-1 hover:bg-muted text-foreground/70",
                children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react2.X, { className: "h-4 w-4" })
              }
            )
          ] })
        ] }),
        description && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-xs text-muted-foreground mt-1", children: description }),
        error ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-xs text-red-500 mt-1", children: error }) : hint ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-xs text-muted-foreground mt-1", children: hint }) : null
      ]
    }
  );
}

// components/ui/select.tsx
var SelectPrimitive = __toESM(require("@radix-ui/react-select"));
var import_lucide_react3 = require("lucide-react");
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
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_lucide_react3.ChevronDownIcon, { className: "size-4 opacity-50" }) })
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
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_lucide_react3.CheckIcon, { className: "size-4" }) }) }),
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
      children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_lucide_react3.ChevronUpIcon, { className: "size-4" })
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
      children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_lucide_react3.ChevronDownIcon, { className: "size-4" })
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

// components/core/form-fields/form.tsx
var import_react_hook_form = require("react-hook-form");
var import_jsx_runtime9 = require("react/jsx-runtime");
function Form({
  form,
  onSubmit,
  children,
  ...formProps
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react_hook_form.FormProvider, { ...form, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    "form",
    {
      ...formProps,
      onSubmit: form.handleSubmit((data, event) => {
        onSubmit?.(data, event);
      }),
      children
    }
  ) });
}

// components/core/data-table/data-table.tsx
var import_react5 = __toESM(require("react"));
var import_react_table3 = require("@tanstack/react-table");

// components/ui/checkbox.tsx
var CheckboxPrimitive = __toESM(require("@radix-ui/react-checkbox"));
var import_lucide_react4 = require("lucide-react");
var import_jsx_runtime10 = require("react/jsx-runtime");
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    CheckboxPrimitive.Root,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        CheckboxPrimitive.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_lucide_react4.CheckIcon, { className: "size-3.5" })
        }
      )
    }
  );
}

// components/ui/table.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
function Table({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}

// components/core/data-table/header.tsx
var import_lucide_react5 = require("lucide-react");
var import_react_table = require("@tanstack/react-table");

// components/core/data-table/utils.ts
function getBaseCellClassNames(id, label, minSize, hasColumnFilter) {
  const base = "p-1 text-[12px] text-[#222222]";
  const textAlign = typeof label === "string" && label.toLowerCase().includes("qty") ? "text-right" : "text-left";
  const padding = hasColumnFilter ? "" : "pr-[18px]";
  const widthClass = (() => {
    if (id === "select") return "w-[30px]";
    if (id === "actions") return "w-[80px]";
    if (minSize && minSize !== 20) return `w-[${minSize}px]`;
    return "";
  })();
  return [base, padding, textAlign, widthClass].join(" ").trim();
}
function getHeaderCellClassNames(header, hasColumnFilter = false) {
  const { id, minSize } = header.column.columnDef;
  const accessorKey = header.column.columnDef.accessorKey;
  const headerLabel = header.column.columnDef.header;
  const label = hasColumnFilter ? accessorKey : String(headerLabel);
  return getBaseCellClassNames(id, label, minSize, hasColumnFilter);
}
function getBodyCellClassNames(cell) {
  const { id, minSize } = cell.column.columnDef;
  const label = cell.column.columnDef.header;
  return getBaseCellClassNames(id, label, minSize);
}
function setCellBorder(length, index) {
  return length === index + 1 ? "border-b-0" : "border-b";
}
function setCellAlignment(key) {
  return key.includes("actions") ? "" : "text-left";
}

// components/core/data-table/header.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
function TableHeader2({
  table,
  isSub,
  hasColumnFilter
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_jsx_runtime12.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(TableRow, { children: headerGroup.headers.map((header) => {
    const isSorted = header.column.getIsSorted();
    const isSortedDesc = isSorted === "desc";
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      TableHead,
      {
        className: `cursor-pointer p-1 text-left text-[12px] text-[#222222] ${header.column.columnDef.header === "QTY" ? "w-[55px]" : ""} ${getHeaderCellClassNames(header)} ${isSub ? "h-auto" : "h-10"} `,
        onClick: (event) => {
          if (hasColumnFilter) return;
          const toggleSortingHandler = header.column.getToggleSortingHandler();
          if (toggleSortingHandler) {
            toggleSortingHandler(event);
          }
        },
        ...header.column.columnDef.minSize !== 20 ? {
          style: {
            width: `${header.column.columnDef.minSize}px`
          }
        } : {},
        children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
          "div",
          {
            className: `${isSub ? "font-[500]" : "font-bold"} relative`,
            children: [
              (0, import_react_table.flexRender)(
                header.column.columnDef.header,
                header.getContext()
              ),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: `absolute`, children: header.column.columnDef.enableSorting ? isSorted ? isSortedDesc ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                import_lucide_react5.ChevronsDown,
                {
                  size: "12",
                  className: "mx-1 inline-block"
                }
              ) : /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                import_lucide_react5.ChevronsUp,
                {
                  size: "12",
                  className: "mx-1 inline-block"
                }
              ) : /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                import_lucide_react5.ChevronsUpDown,
                {
                  size: "12",
                  className: "mx-1 inline-block"
                }
              ) : null })
            ]
          }
        )
      },
      header.id
    );
  }) }, headerGroup.id)) }) });
}

// components/core/data-table/body.tsx
var import_react3 = require("react");
var import_lucide_react6 = require("lucide-react");
var import_react_table2 = require("@tanstack/react-table");
var import_jsx_runtime13 = require("react/jsx-runtime");
function TableBody2({
  table,
  selectedRows,
  expandedRows,
  truncated,
  renderSubTable,
  toggleRowExpansion,
  isSub
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    TableBody,
    {
      className: "rounded-[5px]",
      style: {
        boxShadow: isSub ? "" : "rgb(222, 222, 222) inset 0px 0px 0px 1px"
      },
      children: table.getRowModel().rows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_react3.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
          TableRow,
          {
            className: `hover:bg-gray-100 ${setCellBorder(
              table.getRowModel().rows.length,
              index
            )} ${selectedRows.has(row.id) || expandedRows.has(row.id) ? "bg-[#f0f0f4]" : ""}`,
            children: row.getVisibleCells().map((cell, index2) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              TableCell,
              {
                className: `p-1 font-['Stolzl_Book'] text-[12px] text-[#222222] ${truncated ? "truncate" : ""} ${expandedRows.has(row.id) ? "background-color: rgb(243 244 246 / var(--tw-bg-opacity))" : ""} ${setCellAlignment(cell.id)} ${getBodyCellClassNames(cell)}`,
                children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "relative", children: [
                  renderSubTable && toggleRowExpansion && index2 === 1 && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_jsx_runtime13.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                    "span",
                    {
                      className: "absolute left-[-15px] top-[50%] translate-y-[-50%]",
                      onClick: () => toggleRowExpansion(row.id),
                      children: expandedRows.has(row.id) ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react6.ChevronUp, { size: "14", className: "mt-[2px]" }) : /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react6.ChevronDown, { size: "14", className: "mt-[2px]" })
                    }
                  ) }),
                  (0, import_react_table2.flexRender)(cell.column.columnDef.cell, cell.getContext())
                ] })
              },
              cell.id
            ))
          },
          row.id
        ),
        expandedRows.has(row.id) && renderSubTable && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
          TableCell,
          {
            colSpan: row.getVisibleCells().length,
            className: "bg-gray-50 p-0",
            children: renderSubTable(row.original)
          }
        ) })
      ] }, row.id))
    }
  );
}

// components/core/data-table/useDataTable.ts
var import_react4 = require("react");
var import_use_debounce2 = require("use-debounce");
function useDataTable(data, paginationMode = "none") {
  const [selectedRows, setSelectedRows] = (0, import_react4.useState)(/* @__PURE__ */ new Set());
  const [expandedRows, setExpandedRows] = (0, import_react4.useState)(/* @__PURE__ */ new Set());
  const [page, setPage] = (0, import_react4.useState)(1);
  const [limit, setLimit] = (0, import_react4.useState)(10);
  const [hasMore, setHasMore] = (0, import_react4.useState)(true);
  const toggleRowSelection = (0, import_react4.useCallback)((rowId) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
      return newSet;
    });
  }, []);
  const toggleRowExpansion = (0, import_use_debounce2.useDebouncedCallback)((rowId) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.clear();
        newSet.add(rowId);
      }
      return newSet;
    });
  }, 100);
  const toggleSelectAll = (0, import_react4.useCallback)(() => {
    setSelectedRows((prev) => {
      return prev.size === data.length ? /* @__PURE__ */ new Set() : new Set(data.map((row) => row.id));
    });
  }, [data]);
  const handlePageChange = (0, import_react4.useCallback)(
    (newPage) => {
      if (paginationMode === "pagination") {
        setPage(newPage);
      }
    },
    [paginationMode]
  );
  return {
    selectedRows,
    expandedRows,
    toggleRowSelection,
    toggleRowExpansion,
    toggleSelectAll,
    page,
    limit,
    hasMore,
    setHasMore,
    handlePageChange
  };
}

// components/core/data-table/infinite-scroll.tsx
var import_lucide_react7 = require("lucide-react");
var import_jsx_runtime14 = require("react/jsx-runtime");
function InfiniteScrollFooter({
  isLoading = false,
  hasMore = true,
  onLoadMore
}) {
  if (!hasMore) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "flex justify-center py-2", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
    Button,
    {
      onClick: onLoadMore,
      disabled: isLoading,
      variant: "outline",
      className: "flex items-center gap-2",
      children: [
        isLoading && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_lucide_react7.Loader2, { className: "animate-spin", size: 16 }),
        isLoading ? "Loading..." : "Load More"
      ]
    }
  ) });
}

// components/core/data-table/data-table.tsx
var import_jsx_runtime15 = require("react/jsx-runtime");
var Checkbox2 = import_react5.default.forwardRef((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Checkbox, { ref, ...props }));
Checkbox2.displayName = "Checkbox";
function DataTable(props) {
  const {
    data: initialData,
    columns: initialColumns = [],
    subTableConfig,
    showCheckbox = false,
    isScrollable,
    actionRenderer,
    getRowId,
    renderSubTable,
    hasColumnFilter,
    isSub,
    paginationMode = "none",
    isLoading,
    handleLoadMore
  } = props;
  const data = (0, import_react5.useMemo)(() => initialData, [initialData]);
  const memoizedColumns = (0, import_react5.useMemo)(() => initialColumns, [initialColumns]);
  const [sorting, setSorting] = (0, import_react5.useState)([]);
  const {
    selectedRows,
    toggleSelectAll,
    expandedRows,
    toggleRowSelection,
    toggleRowExpansion,
    hasMore
  } = useDataTable(data, paginationMode);
  const selectAllRef = (0, import_react5.useRef)(null);
  const loadMoreRef = (0, import_react5.useRef)(null);
  (0, import_react5.useEffect)(() => {
    if (paginationMode !== "infinite-scroll") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          handleLoadMore?.();
        }
      },
      { root: null, rootMargin: "0px", threshold: 1 }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [paginationMode, hasMore, isLoading, handleLoadMore]);
  const dynamicColumns = (0, import_react5.useMemo)(() => {
    const extraColumns = [];
    if (showCheckbox) {
      extraColumns.push({
        id: "select",
        header: () => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          "div",
          {
            className: `flex justify-center text-center ${renderSubTable && "pl-[5px] pr-[15px]"}`,
            children: !isSub && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
              Checkbox2,
              {
                ref: selectAllRef,
                checked: selectedRows.size === data.length && data.length > 0,
                onCheckedChange: toggleSelectAll,
                className: "row-checkbox border-[#CBCBCB]"
              }
            )
          }
        ),
        cell: ({ row }) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          "div",
          {
            className: `flex justify-center text-center ${renderSubTable && "pl-[5px] pr-[15px]"}`,
            children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
              Checkbox2,
              {
                checked: selectedRows.has(row.id),
                onCheckedChange: () => toggleRowSelection(row.id),
                className: "row-checkbox border-[#CBCBCB]"
              }
            )
          }
        ),
        size: 50
      });
    }
    if (actionRenderer) {
      extraColumns.push({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => actionRenderer(row.original)
      });
    }
    return [...extraColumns, ...memoizedColumns];
  }, [
    showCheckbox,
    actionRenderer,
    memoizedColumns,
    renderSubTable,
    isSub,
    selectedRows,
    data.length,
    toggleSelectAll,
    toggleRowSelection
  ]);
  const table = (0, import_react_table3.useReactTable)({
    data,
    columns: dynamicColumns,
    getCoreRowModel: (0, import_react_table3.getCoreRowModel)(),
    getSortedRowModel: (0, import_react_table3.getSortedRowModel)(),
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getRowId: getRowId ? (originalRow) => String(getRowId?.(originalRow)) : void 0
  });
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: `${isScrollable ? "overflow-x-auto" : ""} `, children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(Table, { className: `min-w-full table-auto`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        TableHeader2,
        {
          table,
          isSub,
          hasColumnFilter
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        TableBody2,
        {
          table,
          selectedRows,
          expandedRows,
          renderSubTable,
          isSub,
          toggleRowExpansion
        }
      )
    ] }),
    paginationMode === "infinite-scroll" && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      InfiniteScrollFooter,
      {
        isLoading,
        hasMore,
        onLoadMore: handleLoadMore
      }
    ),
    paginationMode === "infinite-scroll" && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { ref: loadMoreRef })
  ] });
}
var data_table_default = DataTable;

// components/core/table/table.tsx
var import_react_table4 = require("@tanstack/react-table");
var import_lucide_react8 = require("lucide-react");
var import_jsx_runtime16 = require("react/jsx-runtime");
function Table2({
  data,
  isDisabled,
  columns,
  onAddRow,
  showAddRowButton = true
}) {
  const table = (0, import_react_table4.useReactTable)({
    data,
    columns,
    getCoreRowModel: (0, import_react_table4.getCoreRowModel)()
  });
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "max-w-full", children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "border rounded-lg shadow-sm overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(Table, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(TableHeader, { className: "bg-[#efefef] text-[#222222]", children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        TableRow,
        {
          className: "bg-[#efefef] text-[#222222]",
          children: headerGroup.headers.map((header) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
            TableHead,
            {
              className: `font-semibold text-gray-700 dark:text-gray-300 border-b border-r border-gray-200 last:border-r-0`,
              children: header.isPlaceholder ? null : (0, import_react_table4.flexRender)(
                header.column.columnDef.header,
                header.getContext()
              )
            },
            header.id
          ))
        },
        headerGroup.id
      )) }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(TableBody, { children: table.getRowModel().rows?.length ? table.getRowModel().rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        TableRow,
        {
          "data-state": row.getIsSelected() && "selected",
          className: "hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150",
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
            TableCell,
            {
              className: `text-gray-800 dark:text-gray-200 border-b border-r border-gray-200 last:border-r-0 ${cell.column.columnDef.isRightAligned ? "text-right" : ""} ${cell.column.columnDef.accessorKey === "item_no" ? "font-medium text-gray-900 dark:text-gray-100" : ""}`,
              children: (0, import_react_table4.flexRender)(
                cell.column.columnDef.cell,
                cell.getContext()
              )
            },
            cell.id
          ))
        },
        row.id
      )) : /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        TableCell,
        {
          colSpan: columns.length,
          className: "h-10 text-center text-gray-500 dark:text-gray-400",
          children: "No records found"
        }
      ) }) })
    ] }) }),
    showAddRowButton && /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "flex justify-start mt-2", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
      Button,
      {
        onClick: onAddRow,
        className: "bg-white text-black hover:bg-slate-400 ",
        disabled: isDisabled,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_lucide_react8.CirclePlus, { className: "mr-2 h-4 w-4" }),
          " ",
          "Add Row"
        ]
      }
    ) })
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ComboBox,
  DataTable,
  Form,
  Input,
  Select,
  Table,
  getBaseCellClassNames,
  getBodyCellClassNames,
  getHeaderCellClassNames,
  setCellAlignment,
  setCellBorder,
  useDataTable
});
