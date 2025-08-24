import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  // Simple markdown parsing for basic formatting
  const parseMarkdown = (text: string) => {
    return (
      text
        // Headers
        .replace(
          /^### (.*$)/gim,
          '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>'
        )
        .replace(
          /^## (.*$)/gim,
          '<h2 class="text-xl font-bold mt-8 mb-4">$1</h2>'
        )
        .replace(
          /^# (.*$)/gim,
          '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>'
        )
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        // Code blocks
        .replace(
          /```([\s\S]*?)```/g,
          '<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-4"><code>$1</code></pre>'
        )
        // Inline code
        .replace(
          /`(.*?)`/g,
          '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>'
        )
        // Lists
        .replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
        .replace(
          /(<li.*<\/li>)/s,
          '<ul class="list-disc list-inside space-y-1 my-4">$1</ul>'
        )
        // Links
        .replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
        )
        // Line breaks
        .replace(/\n\n/g, '</p><p class="my-4">')
        .replace(/\n/g, "<br>")
    );
  };

  const htmlContent = parseMarkdown(content);

  return (
    <div
      className={`prose prose-sm max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: `<p class="my-4">${htmlContent}</p>` }}
    />
  );
}

// Component for rendering documentation sections
interface DocSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function DocSection({
  title,
  children,
  className = "",
}: DocSectionProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <h3 className='text-lg font-semibold mb-3 text-foreground'>{title}</h3>
      <div className='text-sm text-muted-foreground leading-relaxed'>
        {children}
      </div>
    </div>
  );
}

// Component for rendering feature lists
interface FeatureListProps {
  features: string[];
}

export function FeatureList({ features }: FeatureListProps) {
  return (
    <div className='mb-6'>
      <h3 className='text-lg font-semibold mb-3 text-foreground'>Features</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
        {features.map((feature, index) => (
          <div key={index} className='flex items-center gap-2 text-sm'>
            <div className='w-1.5 h-1.5 bg-green-500 rounded-full'></div>
            <span className='text-muted-foreground'>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Component for rendering props table
interface PropsTableProps {
  props: Array<{
    name: string;
    type: string;
    default?: string;
    description: string;
  }>;
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className='mb-6'>
      <h3 className='text-lg font-semibold mb-3 text-foreground'>Props</h3>
      <div className='overflow-x-auto'>
        <table className='w-full text-sm border-collapse'>
          <thead>
            <tr className='border-b border-border'>
              <th className='text-left p-2 font-medium'>Prop</th>
              <th className='text-left p-2 font-medium'>Type</th>
              <th className='text-left p-2 font-medium'>Default</th>
              <th className='text-left p-2 font-medium'>Description</th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop, index) => (
              <tr key={index} className='border-b border-border/50'>
                <td className='p-2 font-mono text-blue-600'>{prop.name}</td>
                <td className='p-2 font-mono text-sm'>{prop.type}</td>
                <td className='p-2 text-muted-foreground'>
                  {prop.default || "-"}
                </td>
                <td className='p-2'>{prop.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
