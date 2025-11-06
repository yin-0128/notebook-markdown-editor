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
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="flex items-center gap-4">
          {/* Professional Notebook Logo - EXACT match to favicon */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 rounded-lg blur-md opacity-40 group-hover:opacity-60 transition-all duration-300"></div>
            {/* Logo matching favicon exactly - blue to indigo to purple gradient */}
            <div className="relative w-9 h-9 rounded-lg flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-105 overflow-hidden">
              <svg 
                viewBox="0 0 32 32" 
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="headerBgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                
                {/* Background rounded square */}
                <rect width="32" height="32" rx="6" fill="url(#headerBgGradient)"/>
                
                {/* Notebook icon */}
                <g transform="translate(8, 6)">
                  {/* Main notebook outline */}
                  <rect x="0" y="0" width="16" height="20" rx="2" stroke="white" strokeWidth="2" fill="none"/>
                  {/* Spine line */}
                  <path d="M4 0 L4 20" stroke="white" strokeWidth="1.5" opacity="0.5"/>
                  {/* Text lines */}
                  <line x1="7" y1="6" x2="13" y2="6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="7" y1="10" x2="13" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="7" y1="14" x2="11" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </g>
                
                {/* Bookmark accent */}
                <path d="M22 6 L22 14 L25 11.5 L28 14 L28 6 Z" fill="white" opacity="0.9"/>
              </svg>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-[24px] leading-none select-none font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent" style={{ 
              fontFamily: "'Poppins', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: '0.05em',
              fontWeight: 800,
              fontSize: '24px'
            }}>
              Notebook
            </h1>
            <p className="text-[12px] text-muted-foreground tracking-[0.2em] uppercase font-semibold pl-0.5" style={{ 
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: '0.2em',
              fontSize: '12px'
            }}>
              Markdown Editor
            </p>
          </div>
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
