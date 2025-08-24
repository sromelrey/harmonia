"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Settings,
  Code,
  Palette,
  Zap,
  ExternalLink,
  Github,
  Play,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

// Import demo components
import ComboBoxDemo from "@/components/demos/combo-box-demo";
import DataTableDemo from "@/components/demos/data-table-demo";
import TableDemo from "@/components/demos/table-demo";
import FormFieldsDemo from "@/components/demos/form-fields-demo";
import CoreFormFieldsDemo from "@/components/demos/core-form-fields-demo";

// Import documentation utilities
import { loadComponentDoc, ComponentDoc } from "@/lib/docs-loader";
import {
  MarkdownRenderer,
  DocSection,
  FeatureList,
  PropsTable,
} from "@/components/ui/markdown-renderer";

interface ComponentExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const components = [
  {
    id: "form-fields",
    name: "Form Fields",
    description:
      "Complete collection of form field components for modern applications",
    demo: FormFieldsDemo,
    features: ["Input", "Password", "Textarea", "Select", "Date", "Validation"],
    category: "Form Fields",
  },
  {
    id: "core-form-fields",
    name: "Core Form Fields",
    description: "Essential form field components from the core library",
    demo: CoreFormFieldsDemo,
    features: ["Input", "Select", "Validation", "Accessibility"],
    category: "Form Fields",
  },
  {
    id: "combo-box",
    name: "ComboBox",
    description:
      "Advanced dropdown with search, multi-select, and virtualization",
    demo: ComboBoxDemo,
    features: ["Search", "Multi-select", "Virtualization", "Custom rendering"],
    category: "Form Fields",
  },
  {
    id: "data-table",
    name: "DataTable",
    description:
      "Feature-rich table with sorting, filtering, and infinite scroll",
    demo: DataTableDemo,
    features: ["Sorting", "Row selection", "Infinite scroll", "Custom actions"],
    category: "Data Display",
  },
  {
    id: "table",
    name: "Table",
    description: "Simple and clean table component with basic functionality",
    demo: TableDemo,
    features: ["Basic rendering", "Add rows", "Status indicators"],
    category: "Data Display",
  },
];

export function ComponentExplorerModal({
  isOpen,
  onClose,
}: ComponentExplorerModalProps) {
  const [selectedComponent, setSelectedComponent] = useState(components[0]);
  const [componentDoc, setComponentDoc] = useState<ComponentDoc | null>(null);
  const [isLoadingDoc, setIsLoadingDoc] = useState(false);

  const SelectedDemo = selectedComponent.demo;

  // Load documentation when component changes
  useEffect(() => {
    const loadDoc = async () => {
      setIsLoadingDoc(true);
      try {
        const doc = await loadComponentDoc(selectedComponent.id);
        setComponentDoc(doc);
      } catch (error) {
        console.error("Failed to load documentation:", error);
        setComponentDoc(null);
      } finally {
        setIsLoadingDoc(false);
      }
    };

    if (isOpen) {
      loadDoc();
    }
  }, [selectedComponent.id, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Component Explorer'
      size='full'
    >
      <div className='flex h-full'>
        {/* Sidebar */}
        <div className='w-80 border-r border-border bg-muted/30'>
          <div className='p-6'>
            <div className='space-y-4'>
              <div>
                <h3 className='text-lg font-semibold mb-2'>Components</h3>
                <p className='text-sm text-muted-foreground'>
                  Explore our interactive component library
                </p>
              </div>

              <div className='space-y-2'>
                {components.map((component) => (
                  <button
                    key={component.id}
                    onClick={() => setSelectedComponent(component)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedComponent.id === component.id
                        ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                        : "border-border hover:border-teal-300 hover:bg-teal-50/50 dark:hover:bg-teal-900/10"
                    }`}
                  >
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <h4 className='font-medium text-sm'>
                          {component.name}
                        </h4>
                        <p className='text-xs text-muted-foreground mt-1'>
                          {component.description}
                        </p>
                        <div className='flex flex-wrap gap-1 mt-2'>
                          {component.features.slice(0, 2).map((feature) => (
                            <Badge
                              key={feature}
                              variant='secondary'
                              className='text-xs'
                            >
                              {feature}
                            </Badge>
                          ))}
                          {component.features.length > 2 && (
                            <Badge variant='outline' className='text-xs'>
                              +{component.features.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='flex-1 flex flex-col'>
          {/* Component Header */}
          <div className='p-6 border-b border-border'>
            <div className='flex items-start justify-between'>
              <div className='flex-1'>
                <div className='flex items-center gap-3 mb-2'>
                  <h2 className='text-2xl font-bold'>
                    {selectedComponent.name}
                  </h2>
                  <Badge variant='outline'>{selectedComponent.category}</Badge>
                </div>
                <p className='text-muted-foreground mb-4'>
                  {selectedComponent.description}
                </p>

                {/* Features */}
                <div className='flex flex-wrap gap-2'>
                  {selectedComponent.features.map((feature) => (
                    <Badge
                      key={feature}
                      variant='secondary'
                      className='text-sm'
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className='flex items-center gap-2'>
                <Button variant='outline' size='sm' asChild>
                  <Link
                    href='https://github.com/your-repo/harmonia'
                    target='_blank'
                  >
                    <Github className='h-4 w-4 mr-2' />
                    GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs Content */}
          <div className='flex-1 flex flex-col'>
            <Tabs defaultValue='demo' className='flex-1 flex flex-col'>
              <div className='px-6 pt-4 border-b border-border'>
                <TabsList className='grid w-full grid-cols-2'>
                  <TabsTrigger value='demo' className='flex items-center gap-2'>
                    <Play className='h-4 w-4' />
                    Demo
                  </TabsTrigger>
                  <TabsTrigger value='docs' className='flex items-center gap-2'>
                    <BookOpen className='h-4 w-4' />
                    Documentation
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value='demo' className='flex-1 p-6 overflow-auto'>
                <div className='max-w-4xl mx-auto'>
                  <SelectedDemo />
                </div>
              </TabsContent>

              <TabsContent value='docs' className='flex-1 p-6 overflow-auto'>
                <div className='max-w-4xl mx-auto'>
                  {isLoadingDoc ? (
                    <div className='text-center py-12'>
                      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-4'></div>
                      <p className='text-muted-foreground'>
                        Loading documentation...
                      </p>
                    </div>
                  ) : componentDoc ? (
                    <div className='space-y-6'>
                      {/* Component Overview */}
                      <div className='mb-8'>
                        <h2 className='text-2xl font-bold mb-4'>
                          {componentDoc.title}
                        </h2>
                        <MarkdownRenderer content={componentDoc.content} />
                      </div>

                      {/* Features Section */}
                      {componentDoc.features &&
                        componentDoc.features.length > 0 && (
                          <FeatureList features={componentDoc.features} />
                        )}

                      {/* Props Table */}
                      {componentDoc.props && componentDoc.props.length > 0 && (
                        <PropsTable props={componentDoc.props} />
                      )}

                      {/* Additional Documentation Sections */}
                      <DocSection title='Usage Examples'>
                        <p>
                          See the Demo tab for interactive examples and usage
                          patterns. Each component is designed to be flexible
                          and composable with your existing design system.
                        </p>
                      </DocSection>

                      <DocSection title='API Reference'>
                        <p>
                          For detailed prop definitions and TypeScript
                          interfaces, check the component source code in the
                          components directory.
                        </p>
                      </DocSection>

                      {/* Source Code Links */}
                      <div className='mt-8 p-4 bg-muted/30 rounded-lg'>
                        <h3 className='text-lg font-semibold mb-3'>
                          Source Code
                        </h3>
                        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                          <Code className='h-4 w-4' />
                          <span>
                            Component source available in the components
                            directory
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='text-center py-12'>
                      <BookOpen className='h-12 w-12 mx-auto text-muted-foreground mb-4' />
                      <h2 className='text-2xl font-semibold mb-2'>
                        Documentation
                      </h2>
                      <p className='text-muted-foreground mb-6'>
                        Documentation not available for {selectedComponent.name}{" "}
                        component.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Modal>
  );
}
