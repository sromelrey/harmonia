"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, FileText, Folder, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface DocItem {
  name: string;
  path: string;
  type: "file" | "folder";
  children?: DocItem[];
}

interface DocContent {
  title: string;
  content: string;
  path: string;
}

// Define the documentation structure
const docsStructure: DocItem[] = [
  {
    name: "Core",
    path: "core",
    type: "folder",
    children: [
      {
        name: "Form Fields",
        path: "core/form-fields",
        type: "folder",
        children: [
          {
            name: "ComboBox",
            path: "core/form-fields/ComboBox",
            type: "file",
          },
          {
            name: "Input Field",
            path: "core/form-fields/input-field",
            type: "file",
          },
          {
            name: "Select",
            path: "core/form-fields/select",
            type: "file",
          },
        ],
      },
      {
        name: "Data Table",
        path: "core/data-table",
        type: "file",
      },
      {
        name: "Table",
        path: "core/table",
        type: "file",
      },
      {
        name: "Form Fields Overview",
        path: "core/form-fields",
        type: "file",
      },
    ],
  },
];

export default function DocsPage() {
  const [selectedDoc, setSelectedDoc] = useState<DocContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["core"])
  );

  // Optional: Set default theme for docs page
  useEffect(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
      // Default to dark mode for docs if no preference is saved
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Documentation", href: "/docs", icon: FileText },
    ...(selectedDoc ? [{ label: selectedDoc.title, href: "#" }] : []),
  ];

  // Toggle folder expansion
  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  // Load markdown content
  const loadDoc = async (path: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/docs?path=${encodeURIComponent(path)}`
      );
      if (response.ok) {
        const data = await response.json();
        setSelectedDoc(data);
      } else {
        console.error("Failed to load document");
      }
    } catch (error) {
      console.error("Error loading document:", error);
    } finally {
      setLoading(false);
    }
  };

  // Render tree item
  const renderTreeItem = (item: DocItem, level: number = 0) => {
    const isExpanded = expandedFolders.has(item.path);
    const isSelected = selectedDoc?.path === item.path;

    return (
      <div key={item.path}>
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
            isSelected
              ? "bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300"
              : ""
          }`}
          style={{ paddingLeft: `${level * 16 + 12}px` }}
          onClick={() => {
            if (item.type === "folder") {
              toggleFolder(item.path);
            } else {
              loadDoc(item.path);
            }
          }}
        >
          {item.type === "folder" ? (
            <Folder className='h-4 w-4 text-blue-500' />
          ) : (
            <FileText className='h-4 w-4 text-gray-500' />
          )}
          <span className='text-sm font-medium'>{item.name}</span>
          {item.type === "folder" && (
            <ChevronRight
              className={`h-4 w-4 ml-auto transition-transform ${
                isExpanded ? "rotate-90" : ""
              }`}
            />
          )}
        </div>
        {item.type === "folder" && isExpanded && item.children && (
          <div>
            {item.children.map((child) => renderTreeItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Render markdown content
  const renderMarkdown = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactElement[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let inTable = false;
    let tableRows: string[][] = [];
    let inList = false;
    let listItems: string[] = [];

    const processList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul
            key={`list-${elements.length}`}
            className='list-disc list-inside mb-4 space-y-1'
          >
            {listItems.map((item, idx) => (
              <li key={idx} className='text-gray-700 dark:text-gray-300'>
                {item}
              </li>
            ))}
          </ul>
        );
        listItems = [];
      }
      inList = false;
    };

    const processCodeBlock = () => {
      if (codeBlockContent.length > 0) {
        elements.push(
          <pre
            key={`code-${elements.length}`}
            className='bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4 overflow-x-auto'
          >
            <code className='text-sm font-mono text-gray-800 dark:text-gray-200'>
              {codeBlockContent.join("\n")}
            </code>
          </pre>
        );
        codeBlockContent = [];
      }
      inCodeBlock = false;
    };

    const processTable = () => {
      if (tableRows.length > 0) {
        const headers = tableRows[0];
        const dataRows = tableRows.slice(1);

        elements.push(
          <div
            key={`table-${elements.length}`}
            className='overflow-x-auto my-4'
          >
            <table className='min-w-full border border-gray-200 dark:border-gray-700 rounded-lg'>
              <thead className='bg-gray-50 dark:bg-gray-800'>
                <tr>
                  {headers.map((header, idx) => (
                    <th
                      key={idx}
                      className='px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700'
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className='hover:bg-gray-50 dark:hover:bg-gray-700'
                  >
                    {row.map((cell, cellIdx) => (
                      <td
                        key={cellIdx}
                        className='px-4 py-2 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700'
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
      }
      inTable = false;
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Handle code blocks
      if (trimmedLine.startsWith("```")) {
        if (inCodeBlock) {
          processCodeBlock();
        } else {
          processList();
          processTable();
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      // Handle tables
      if (trimmedLine.includes("|") && trimmedLine.split("|").length > 2) {
        if (!inTable) {
          processList();
          inTable = true;
        }
        const cells = trimmedLine
          .split("|")
          .slice(1, -1)
          .map((cell) => cell.trim());
        tableRows.push(cells);
        return;
      }

      if (inTable && trimmedLine === "") {
        processTable();
        return;
      }

      // Handle lists
      if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
        if (!inList) {
          processTable();
          inList = true;
        }
        listItems.push(trimmedLine.substring(2));
        return;
      }

      if (inList && trimmedLine === "") {
        processList();
        return;
      }

      // Handle headers
      if (trimmedLine.startsWith("# ")) {
        processList();
        processTable();
        elements.push(
          <h1
            key={index}
            className='text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100'
          >
            {trimmedLine.substring(2)}
          </h1>
        );
        return;
      }

      if (trimmedLine.startsWith("## ")) {
        processList();
        processTable();
        elements.push(
          <h2
            key={index}
            className='text-2xl font-semibold mb-3 mt-6 text-gray-900 dark:text-gray-100'
          >
            {trimmedLine.substring(3)}
          </h2>
        );
        return;
      }

      if (trimmedLine.startsWith("### ")) {
        processList();
        processTable();
        elements.push(
          <h3
            key={index}
            className='text-xl font-semibold mb-2 mt-4 text-gray-900 dark:text-gray-100'
          >
            {trimmedLine.substring(4)}
          </h3>
        );
        return;
      }

      if (trimmedLine.startsWith("#### ")) {
        processList();
        processTable();
        elements.push(
          <h4
            key={index}
            className='text-lg font-semibold mb-2 mt-3 text-gray-900 dark:text-gray-100'
          >
            {trimmedLine.substring(5)}
          </h4>
        );
        return;
      }

      // Handle horizontal rules
      if (trimmedLine === "---" || trimmedLine === "___") {
        processList();
        processTable();
        elements.push(
          <hr
            key={index}
            className='my-6 border-gray-200 dark:border-gray-700'
          />
        );
        return;
      }

      // Handle empty lines
      if (trimmedLine === "") {
        processList();
        processTable();
        elements.push(<br key={index} />);
        return;
      }

      // Handle regular paragraphs
      processList();
      processTable();

      // Process inline formatting
      let processedLine = trimmedLine
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(
          /`(.*?)`/g,
          '<code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">$1</code>'
        )
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
          // Check if it's an internal link (starts with / or #)
          if (url.startsWith("/") || url.startsWith("#")) {
            return `<a href="${url}" className="text-teal-600 hover:text-teal-700 underline">${text}</a>`;
          }
          // External links open in new tab
          return `<a href="${url}" className="text-teal-600 hover:text-teal-700 underline" target="_blank" rel="noopener noreferrer">${text}</a>`;
        });

      elements.push(
        <p
          key={index}
          className='mb-2 text-gray-700 dark:text-gray-300'
          dangerouslySetInnerHTML={{ __html: processedLine }}
        />
      );
    });

    // Process any remaining blocks
    processList();
    processTable();
    processCodeBlock();

    return elements;
  };

  return (
    <div className='min-h-screen bg-background'>
      {/* Header with Breadcrumbs */}
      <div className='border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container flex h-14 max-w-screen-2xl items-center justify-between'>
          <nav className='flex items-center space-x-2 text-sm'>
            <Link
              href='/'
              className='flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors'
            >
              <Home className='h-4 w-4' />
              Home
            </Link>
            <ChevronRight className='h-4 w-4 text-muted-foreground' />
            <Link
              href='/docs'
              className='flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors'
            >
              <FileText className='h-4 w-4' />
              Documentation
            </Link>
            {selectedDoc && (
              <>
                <ChevronRight className='h-4 w-4 text-muted-foreground' />
                <span className='text-foreground font-medium'>
                  {selectedDoc.title}
                </span>
              </>
            )}
          </nav>
          <ThemeToggle />
        </div>
      </div>

      <div className='container mx-auto max-w-7xl p-6'>
        <div className='grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8'>
          {/* Sidebar */}
          <div className='space-y-4'>
            <div>
              <h2 className='text-lg font-semibold mb-4'>Documentation</h2>
              <div className='border rounded-lg bg-card'>
                {docsStructure.map((item) => renderTreeItem(item))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className='min-h-[600px]'>
            {loading ? (
              <div className='flex items-center justify-center h-64'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500'></div>
              </div>
            ) : selectedDoc ? (
              <div className='prose prose-gray dark:prose-invert max-w-none'>
                <div className='mb-6'>
                  <h1 className='text-3xl font-bold mb-2'>
                    {selectedDoc.title}
                  </h1>
                  <p className='text-sm text-muted-foreground'>
                    {selectedDoc.path}
                  </p>
                </div>
                <div className='bg-card border rounded-lg p-6'>
                  {renderMarkdown(selectedDoc.content)}
                </div>
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center h-64 text-center'>
                <FileText className='h-12 w-12 text-muted-foreground mb-4' />
                <h3 className='text-lg font-semibold mb-2'>
                  Welcome to Documentation
                </h3>
                <p className='text-muted-foreground max-w-md'>
                  Select a document from the sidebar to view its content. This
                  documentation covers all the core components and their usage.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
