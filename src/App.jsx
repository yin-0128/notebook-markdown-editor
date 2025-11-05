import { useState, useEffect } from 'react';
import { FileList } from './components/FileList';
import { MarkdownEditor } from './components/MarkdownEditor';
import { MarkdownPreview } from './components/MarkdownPreview';
import { Header } from './components/Header';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './components/ui/resizable';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

const STORAGE_KEY = 'notebook-markdown-files';

function App() {
  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState(null);

  // Load files from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedFiles = JSON.parse(stored);
        setFiles(parsedFiles);
        if (parsedFiles.length > 0) {
          setSelectedFileId(parsedFiles[0].id);
        }
      } catch (error) {
        console.error('Error loading files:', error);
      }
    } else {
      // Create a welcome file if no files exist
          const welcomeFile = {
            id: crypto.randomUUID(),
            name: 'Welcome.md',
            content: `# Welcome to Notebook! 📝

This is a lightweight, browser-based Markdown editor with live preview.

## Features

- **Three-panel layout** for efficient workflow
- **Multiple files** - Create and manage as many notes as you need
- **Live preview** - See your formatted Markdown in real-time
- **Local storage** - All your notes are saved in your browser
- **Clean interface** - Focus on writing without distractions

## Quick Start

1. Click the **+ New File** button to create a new note
2. Start typing in the editor panel
3. Watch your Markdown render in real-time on the right
4. Your changes are automatically saved

## Markdown Syntax

### Headings
# H1
## H2
### H3

### Text Formatting
**bold text**
*italic text*
~~strikethrough~~

### Lists
- Item 1
- Item 2
  - Nested item

1. First item
2. Second item

### Code
\`inline code\`

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

### Links & Images
[Link text](https://example.com)

### Quotes
> This is a blockquote

---

Happy writing! ✨`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setFiles([welcomeFile]);
      setSelectedFileId(welcomeFile.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([welcomeFile]));
    }
  }, []);

  // Save files to localStorage whenever they change
  useEffect(() => {
    if (files.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
    }
  }, [files]);

  const selectedFile = files.find((f) => f.id === selectedFileId);

  const handleCreateFile = (name) => {
    const newFile = {
      id: crypto.randomUUID(),
      name,
      content: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setFiles([...files, newFile]);
    setSelectedFileId(newFile.id);
  };

  const handleDeleteFile = (id) => {
    const newFiles = files.filter((f) => f.id !== id);
    setFiles(newFiles);
    
    if (selectedFileId === id) {
      setSelectedFileId(newFiles.length > 0 ? newFiles[0].id : null);
    }

    if (newFiles.length === 0) {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleRenameFile = (id, newName) => {
    setFiles(files.map((f) => 
      f.id === id 
        ? { ...f, name: newName, updatedAt: Date.now() } 
        : f
    ));
  };

  const handleContentChange = (content) => {
    if (!selectedFileId) return;

    setFiles(files.map((f) =>
      f.id === selectedFileId
        ? { ...f, content, updatedAt: Date.now() }
        : f
    ));
  };

  const handleExport = () => {
    if (!selectedFile) {
      toast.error('No file selected to export');
      return;
    }

    try {
      const blob = new Blob([selectedFile.content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = selectedFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success(`Exported ${selectedFile.name}`);
    } catch (error) {
      toast.error('Failed to export file');
      console.error('Export error:', error);
    }
  };

  const handleImport = (file) => {
    if (!file) {
      toast.error('No file selected');
      return;
    }

    // Check if file is a text file
    const validTypes = ['text/markdown', 'text/plain', 'application/octet-stream'];
    const validExtensions = ['.md', '.markdown', '.txt'];
    const hasValidExtension = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

    if (!validTypes.includes(file.type) && !hasValidExtension) {
      toast.error('Please select a Markdown or text file (.md, .markdown, .txt)');
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const content = e.target?.result;
        
        if (typeof content !== 'string') {
          toast.error('Failed to read file content');
          return;
        }

        // Check if a file with the same name already exists
        let fileName = file.name;
        let counter = 1;
        while (files.some(f => f.name === fileName)) {
          const nameWithoutExt = file.name.replace(/\.(md|markdown|txt)$/i, '');
          const ext = file.name.match(/\.(md|markdown|txt)$/i)?.[0] || '.md';
          fileName = `${nameWithoutExt} (${counter})${ext}`;
          counter++;
        }

        const newFile = {
          id: crypto.randomUUID(),
          name: fileName,
          content: content,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        setFiles([...files, newFile]);
        setSelectedFileId(newFile.id);
        toast.success(`Imported ${fileName}`);
      } catch (error) {
        toast.error('Failed to import file');
        console.error('Import error:', error);
      }
    };

    reader.onerror = () => {
      toast.error('Failed to read file');
      console.error('FileReader error:', reader.error);
    };

    reader.readAsText(file);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-background flex flex-col">
      <Header onExport={handleExport} onImport={handleImport} hasSelectedFile={!!selectedFile} />
      
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* File List Panel */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <FileList
            files={files}
            selectedFileId={selectedFileId}
            onSelectFile={setSelectedFileId}
            onCreateFile={handleCreateFile}
            onDeleteFile={handleDeleteFile}
            onRenameFile={handleRenameFile}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Editor Panel */}
        <ResizablePanel defaultSize={40} minSize={30}>
          <MarkdownEditor
            content={selectedFile?.content || ''}
            fileName={selectedFile?.name || ''}
            onContentChange={handleContentChange}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Preview Panel */}
        <ResizablePanel defaultSize={40} minSize={30}>
          <MarkdownPreview
            content={selectedFile?.content || ''}
            fileName={selectedFile?.name || ''}
          />
        </ResizablePanel>
      </ResizablePanelGroup>

      <Toaster />
    </div>
  );
}

export default App;
