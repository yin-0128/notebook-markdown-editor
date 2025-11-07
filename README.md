# Notebook - Multi-File Markdown Editor

A lightweight, browser-based Markdown editor with a three-panel layout, live preview, and local storage persistence.

---

## 🎯 Project Choice

I chose **"The Notebook" - Multi-File Markdown Editor** because it's a practical tool that demonstrates clean UI design, real-time Markdown rendering, and client-side data persistence. As someone who values simplicity and efficiency, I wanted to build something that writers, developers, and students could actually use daily.

---

## 🛠️ Justification of Tools

### **React + Vite**
I'm using React because it makes state management intuitive - each file, the selected file, and the editor content are all clean pieces of state. Vite gives me instant hot-reload during development, which is perfect for rapid iteration.

### **Tailwind CSS v4**
I chose Tailwind because I can quickly build responsive, modern UIs without writing custom CSS. The utility-first approach lets me focus on functionality while maintaining a professional look. I'm using the latest v4 with the `@tailwindcss/postcss` plugin for better performance.

### **shadcn/ui Components**
I integrated shadcn/ui for pre-built, accessible components (dialogs, buttons, resizable panels). This saved me time while ensuring the UI looks polished and professional.

### **react-markdown + remark-gfm**
I'm using `react-markdown` with `remark-gfm` to render Markdown with GitHub Flavored Markdown support (tables, strikethrough, task lists). It's lightweight and handles all the edge cases.

### **localStorage API**
For data persistence, I'm using the browser's native `localStorage`. It's perfect for this use case - no backend needed, works offline, and gives users instant access to their notes. Data persists across browser sessions automatically.

### **Poppins Font (Google Fonts)**
I chose Poppins for the branding because it's modern, readable, and gives the app a professional feel - similar to what you'd see in apps like Notion or Obsidian.

### **Cursor (AI Code Editor)**
I used Cursor throughout development to accelerate component creation, fix bugs, and iterate on the UI design. It helped me scaffold the initial structure and refine the user experience quickly.

---

## 🎨 High-Level Approach

### Architecture
I structured the app with a clear component hierarchy:
- **App.jsx** - Main container managing global state (files, selectedFile, theme)
- **Header.jsx** - Logo, branding, import/export, theme toggle
- **FileList.jsx** - Displays all files with create/rename/delete actions
- **MarkdownEditor.jsx** - Textarea for editing Markdown content
- **MarkdownPreview.jsx** - Live preview of rendered Markdown
- **StatsBar.jsx** - Shows word count, character count, and save status

### State Management
I'm using React's `useState` and `useEffect` hooks to manage:
1. **Files array** - Each file has `{ id, name, content, createdAt, updatedAt }`
2. **Selected file ID** - Tracks which file is currently being edited
3. **Theme** - Light/dark mode preference

### Data Persistence Strategy
- On app load: Read all files from `localStorage`
- On file changes: Automatically save to `localStorage` (debounced for performance)
- On import: Validate file type, handle duplicate names, create new file entry
- On export: Download current file as `.md`

### UI/UX Design Philosophy
I wanted the app to feel professional yet approachable:
- **Three-panel layout** with resizable dividers for customization
- **Clean typography** using the prose plugin for readable preview
- **Dark mode** that persists across sessions
- **Responsive design** that works on desktop and mobile
- **Visual feedback** for all actions (toasts, save indicators)

---

## 💬 Final Prompts

Here's the master instruction I used in Cursor to guide development:

```
You are an expert frontend engineer helping me build a project for a coding assessment.

Build "The Notebook" - a multi-file Markdown editor with a three-panel layout (file list, editor, preview).

Requirements:
- React + Vite for fast development
- Tailwind CSS for styling
- react-markdown + remark-gfm for Markdown rendering
- localStorage for file persistence (no backend)
- shadcn/ui components for professional UI

Features to implement:
1. File Management: Create, rename, delete, and switch between files
2. Markdown Editor: Live editing with syntax highlighting
3. Live Preview: Real-time Markdown rendering with GitHub Flavored Markdown
4. Import/Export: Support .md/.markdown/.txt file import and export
5. Dark Mode: Toggle between light and dark themes
6. Persistent Storage: Auto-save to localStorage
7. Stats Bar: Show line, word, and character counts
8. Responsive Design: Works on all screen sizes

Design Guidelines:
- Professional, modern UI inspired by Notion and Obsidian
- Clean typography with proper spacing
- Smooth transitions and hover effects
- Accessible components
- Mobile-friendly layout

Implementation approach:
- Start with project setup and core structure
- Build components incrementally
- Add features one at a time
- Test thoroughly in both light and dark modes
- Ensure data persists correctly
```

---

## 🚀 Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yin-0128/notebook-markdown-editor
cd notebook-markdown-editor

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### How to Use

1. **Create a file**: Click the "+ New File" button in the left panel
2. **Edit Markdown**: Type your content in the middle panel
3. **See live preview**: The right panel shows your formatted Markdown in real-time
4. **Switch files**: Click any file in the left panel to edit it
5. **Import files**: Click "Import" in the header to upload .md files
6. **Export files**: Click "Export" to download the current file
7. **Toggle theme**: Click the sun/moon icon to switch between light and dark modes

---

## ✨ What's Implemented

### Core Features
✅ **Three-panel layout** - File list, editor, and live preview  
✅ **File operations** - Create, rename, delete, and select files  
✅ **Markdown editing** - Full-featured textarea with placeholder  
✅ **Live preview** - Real-time rendering with GitHub Flavored Markdown  
✅ **Local storage** - All data persists automatically in the browser  
✅ **Auto-save** - Changes are saved automatically as you type  

### Advanced Features
✅ **Import/Export** - Import .md/.markdown/.txt files and export current file  
✅ **Dark mode** - Toggle between themes with persistence  
✅ **Resizable panels** - Drag to adjust panel widths  
✅ **Stats bar** - Line, word, and character counts  
✅ **Toast notifications** - Visual feedback for all actions  
✅ **Professional branding** - Custom logo with gradient effects  
✅ **Responsive design** - Works on desktop, tablet, and mobile  

### Technical Highlights
✅ **TypeScript to JavaScript conversion** - Converted shadcn/ui components from TS to JS  
✅ **Proper error handling** - Validation for imports, duplicate names, file operations  
✅ **Accessibility** - Keyboard navigation, ARIA labels, semantic HTML  
✅ **Performance optimizations** - Debounced saves, efficient re-renders  

---

## 🔧 Challenges & Iterations

### Challenge 1: Tailwind CSS v4 Setup
**Problem**: Initial Vite + Tailwind setup failed because v4 requires a different PostCSS plugin.  
**Solution**: I installed `@tailwindcss/postcss` and updated `postcss.config.js` to use it. Also had to update `index.css` with the new v4 syntax.

### Challenge 2: TypeScript to JavaScript Conversion
**Problem**: The reference implementation used TypeScript (shadcn/ui components), but my project was JavaScript-based.  
**Solution**: I manually converted 48+ UI components from `.tsx` to `.jsx`, removing type annotations and fixing import issues. Created a Python script to remove hardcoded version numbers from imports.

### Challenge 3: Preview Panel Scrolling
**Problem**: The preview panel wasn't scrolling because it used a custom ScrollArea component.  
**Solution**: I replaced it with native CSS overflow (`overflow-y-auto`) for better performance and simpler implementation.

### Challenge 4: Import File Validation
**Problem**: Users could accidentally import non-text files, causing errors.  
**Solution**: I added proper MIME type validation and file extension checking (`.md`, `.markdown`, `.txt`). Also implemented duplicate name handling by appending numbers.

### Challenge 5: Font Size Hierarchy
**Problem**: The brand name "Notebook" wasn't prominent enough compared to the tagline.  
**Solution**: I adjusted the font sizes to maintain a 2:1 ratio (24px for "Notebook", 12px for "Markdown Editor") and added inline styles to ensure they're not overridden.

### Challenge 6: Logo Visibility
**Problem**: The purple logo wasn't visible in light mode.  
**Solution**: I matched the logo exactly to the favicon using the same SVG code and gradient colors (blue → indigo → purple). Added proper glow effects for both light and dark modes.

### Challenge 7: Professional Branding
**Problem**: The initial branding looked generic and didn't stand out.  
**Solution**: I created a custom logo with a notebook icon and bookmark accent, used the Poppins font from Google Fonts, and designed a gradient color scheme matching modern SaaS apps.

---

## 📦 Optional Deployment

The app is fully static and can be deployed to any hosting platform:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag `dist/` folder to Netlify
- **GitHub Pages**: Push `dist/` to gh-pages branch

**Live Demo**: [Coming soon]

---

## 📝 Final Thoughts

I built this project to demonstrate clean code architecture, modern UI/UX practices, and practical problem-solving. I'm particularly proud of:

1. **The data persistence strategy** - It's simple, reliable, and works offline
2. **The component structure** - Each component has a single responsibility
3. **The user experience** - Everything feels smooth and responsive
4. **The visual design** - It looks professional without being overwhelming

If I had more time, I'd add:
- Markdown syntax highlighting in the editor
- Keyboard shortcuts for common actions
- Tags and categories for better organization
- Full-text search across all files
- Export to PDF or HTML

Thanks for reviewing my project! I hope it demonstrates my ability to build clean, functional, and user-friendly applications.

---

**Built with ❤️ using Cursor, React, and Tailwind CSS**
