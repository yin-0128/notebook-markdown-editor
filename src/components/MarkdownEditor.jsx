import { Textarea } from './ui/textarea';
import { Edit3 } from 'lucide-react';

export function MarkdownEditor({ content, fileName, onContentChange }) {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Edit3 className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-foreground">Editor</h2>
          {fileName && (
            <span className="text-muted-foreground text-sm ml-auto">
              {fileName}
            </span>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 p-4 overflow-auto">
        {fileName ? (
          <Textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Start writing your Markdown here..."
            className="min-h-full w-full resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-base font-mono"
            style={{ height: '100%' }}
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Edit3 className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-muted-foreground">
                Select a file to start editing
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
