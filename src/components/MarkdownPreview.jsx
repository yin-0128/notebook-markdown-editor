import ReactMarkdown from 'react-markdown';
import { Eye } from 'lucide-react';
import remarkGfm from 'remark-gfm';

export function MarkdownPreview({ content, fileName }) {
  return (
    <div className="h-full flex flex-col bg-muted/30 border-l">
      {/* Header */}
      <div className="p-4 border-b bg-background/50">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-foreground">Preview</h2>
        </div>
      </div>

      {/* Preview - Using native scrolling */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="p-6">
          {fileName ? (
            content ? (
              <article className="prose prose-slate dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {content}
                </ReactMarkdown>
              </article>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Start typing to see the preview
                </p>
              </div>
            )
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Eye className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                <p className="text-muted-foreground">
                  Preview will appear here
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
