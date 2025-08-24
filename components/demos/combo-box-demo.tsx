import React, { useState, useCallback } from "react";
import { Check } from "lucide-react";
import ComboBox, {
  ComboBoxItem,
} from "@/components/core/form-fields/combo-box";

// Mock data for demo
const mockCountries: ComboBoxItem[] = [
  { id: 1, label: "United States", value: "us" },
  { id: 2, label: "Canada", value: "ca" },
  { id: 3, label: "United Kingdom", value: "uk" },
  { id: 4, label: "Germany", value: "de" },
  { id: 5, label: "France", value: "fr" },
  { id: 6, label: "Japan", value: "jp" },
  { id: 7, label: "Australia", value: "au" },
  { id: 8, label: "Brazil", value: "br" },
  { id: 9, label: "India", value: "in" },
  { id: 10, label: "China", value: "cn" },
  { id: 11, label: "Mexico", value: "mx" },
  { id: 12, label: "Italy", value: "it" },
  { id: 13, label: "Spain", value: "es" },
  { id: 14, label: "Netherlands", value: "nl" },
  { id: 15, label: "Sweden", value: "se" },
  { id: 16, label: "Norway", value: "no" },
  { id: 17, label: "Denmark", value: "dk" },
  { id: 18, label: "Finland", value: "fi" },
  { id: 19, label: "Switzerland", value: "ch" },
  { id: 20, label: "Austria", value: "at" },
];

// Mock search function
const mockSearch = async (
  query: string,
  page: number
): Promise<{
  items: ComboBoxItem[];
  hasMore: boolean;
  total?: number;
}> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const filtered = mockCountries.filter((country) =>
    country.label.toLowerCase().includes(query.toLowerCase())
  );

  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const items = filtered.slice(start, end);

  return {
    items,
    hasMore: end < filtered.length,
    total: filtered.length,
  };
};

export default function ComboBoxDemo() {
  const [selectedCountry, setSelectedCountry] = useState<ComboBoxItem | null>(
    null
  );
  const [selectedCountries, setSelectedCountries] = useState<ComboBoxItem[]>(
    []
  );
  const [selectedWithSearch, setSelectedWithSearch] =
    useState<ComboBoxItem | null>(null);

  const handleSearch = useCallback(async (query: string, page: number) => {
    return mockSearch(query, page);
  }, []);

  return (
    <div className='space-y-6'>
      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-2'>ComboBox Component</h3>
        <p className='text-sm text-gray-600 mb-4'>
          A comprehensive dropdown component with infinite scroll, search,
          virtualization, and multi-select support.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Basic ComboBox */}
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-gray-700'>Basic Selection</h4>
          <ComboBox
            items={mockCountries}
            value={selectedCountry}
            onSelect={setSelectedCountry}
            placeholder='Select a country...'
            label='Country'
            required
          />
          <p className='text-xs text-gray-500'>
            Selected: {selectedCountry ? selectedCountry.label : "None"}
          </p>
        </div>

        {/* Multi-select ComboBox */}
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-gray-700'>Multi-select</h4>
          <ComboBox
            items={mockCountries}
            selectedItems={selectedCountries}
            onMultiSelect={setSelectedCountries}
            placeholder='Select countries...'
            label='Countries'
            multiSelect
          />
          <p className='text-xs text-gray-500'>
            Selected:{" "}
            {selectedCountries.length > 0
              ? selectedCountries.map((c) => c.label).join(", ")
              : "None"}
          </p>
        </div>

        {/* Search-enabled ComboBox */}
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-gray-700'>Search-enabled</h4>
          <ComboBox
            value={selectedWithSearch}
            onSelect={setSelectedWithSearch}
            onSearch={handleSearch}
            placeholder='Search countries...'
            label='Search Countries'
            searchDebounceMs={300}
          />
          <p className='text-xs text-gray-500'>
            Selected: {selectedWithSearch ? selectedWithSearch.label : "None"}
          </p>
        </div>

        {/* Custom render ComboBox */}
        <div className='space-y-3'>
          <h4 className='text-sm font-medium text-gray-700'>
            Custom Rendering
          </h4>
          <ComboBox
            items={mockCountries}
            placeholder='Select with custom rendering...'
            label='Custom Render'
            renderItem={(item, isSelected) => (
              <div
                className={`px-3 py-2 cursor-pointer hover:bg-teal-50 flex items-center gap-3 ${
                  isSelected ? "bg-teal-100" : ""
                }`}
              >
                <div className='flex items-center justify-center w-4 h-4 border-2 rounded border-teal-300 bg-white'>
                  {isSelected && <Check className='w-3 h-3 text-teal-600' />}
                </div>
                <div className='flex items-center gap-2 flex-1'>
                  <span className='text-lg'>🏳️</span>
                  <div>
                    <div className='font-medium'>{item.label}</div>
                    <div className='text-xs text-teal-600'>
                      Code: {item.value.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </div>

      {/* Features showcase */}
      <div className='bg-teal-50 p-4 rounded-lg mt-6 border border-teal-100'>
        <h4 className='text-sm font-semibold mb-3 text-teal-800'>
          Key Features:
        </h4>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-teal-700'>
          <div className='flex items-center gap-1'>
            <span className='text-teal-500'>✓</span> Infinite scroll
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-teal-500'>✓</span> Virtualization
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-teal-500'>✓</span> Debounced search
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-teal-500'>✓</span> Multi-select
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-teal-500'>✓</span> Keyboard navigation
          </div>
          <div className='flex items-center gap-1'>
            <span className='text-teal-500'>✓</span> Custom rendering
          </div>
        </div>
      </div>
    </div>
  );
}
