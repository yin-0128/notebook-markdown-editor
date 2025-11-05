import { Moon, Sun, Download, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState, useRef } from 'react';

export function Header({ onExport, onImport, hasSelectedFile }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('notebook-theme') || 'light';
    }
    return 'light';
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('notebook-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      // Reset the input so the same file can be imported again if needed
      e.target.value = '';
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 gap-4">
        <div className="flex items-center gap-3">
          {/* Stylish AdoNote Logo */}
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
            <svg 
              viewBox="0 0 24 24" 
              className="w-5 h-5 text-white"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 3L4 7V11C4 16.55 7.84 21.74 13 23C18.16 21.74 22 16.55 22 11V7L14 3L12 3Z" 
                fill="currentColor"
                opacity="0.2"
              />
              <path 
                d="M9 11L11 13L15 9" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <circle 
                cx="12" 
                cy="12" 
                r="8" 
                stroke="currentColor" 
                strokeWidth="2"
              />
            </svg>
            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-blue-400 rounded-full"></div>
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Note
            </span>
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-600 bg-clip-text text-transparent italic">
              book
            </span>
          </h1>
        </div>
        
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="h-8 w-8 px-0"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleImportClick}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            Import
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            disabled={!hasSelectedFile}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      {/* Hidden file input for import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.markdown,.txt"
        onChange={handleFileChange}
        className="hidden"
        style={{ display: 'none', position: 'absolute', opacity: 0, pointerEvents: 'none' }}
      />
    </header>
  );
}
