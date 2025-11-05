# The Notebook – Multi‑File Markdown Editor

## Project Choice
I chose Idea #1: “The Notebook” – a three‑panel, browser‑based Markdown editor with file management and live preview.

Repo: https://github.com/yin-0128/notebook-markdown-editor

## Justification of Tools
- **React + Vite**: Fast dev server and simple build. React state cleanly models files and editor interactions.
- **Tailwind CSS (v4)**: Rapid iteration on layout/spacing/typography with a consistent design system.
- **@tailwindcss/typography**: Better reading experience in the preview pane.
- **marked**: Lightweight Markdown → HTML conversion with good performance.
- **localStorage**: Zero‑backend persistence; perfect for a lightweight, offline‑friendly tool.
- **Cursor (AI code editor)**: To accelerate scaffolding, component wiring, and iteration on UX.

## High‑Level Approach
- Model files as `{ id, name, content, updatedAt }` and keep `selectedFileId` at the app level.
- Persist to `localStorage` with a small debounce for smooth typing; support Ctrl/Cmd+S.
- Split UI into small components: `Header`, `FileList`, `Editor`, `Preview`, `StatsBar`.
- Add enhancements for real‑world usability: search, import/export, save indicator, stats, dark mode, draggable splitter.
- Keep design clean: rounded panels, subtle borders/shadows, good typography, responsive behavior.

## Final Prompts (copy‑pastable)
Master instruction used in Cursor to drive implementation:
```
You are an expert frontend engineer helping me build a project for a coding assessment. Build “The Notebook” — a multi‑file Markdown editor with a three‑panel layout (left: file list; middle: editor; right: live preview).

Rules:
- React + Vite
- Tailwind CSS (+ @tailwindcss/typography)
- marked for Markdown preview
- localStorage for saving/loading; no backend
- Components: Header, FileList, Editor, Preview, StatsBar
- Features: create/rename/delete/switch files, search by filename, import/export .md, autosave with indicator, Ctrl/Cmd+S save, dark mode toggle, draggable splitter between middle/right, mobile floating + button
- Keep the design modern, readable, and responsive; add comments where helpful
- Implement step by step and explain each file before generating
```

## Instructions (run and reproduce)
- Local dev
```bash
npm install
npm run dev
```
- Build
```bash
npm run build
```
- Preview production build
```bash
npm run preview
```

## What’s Implemented
- Three panels: file list, editor, live preview
- File operations: new, rename, delete, switch
- Search in header (filters file list instantly)
- Import .md and export current note as .md
- Autosave with debounced persistence + visible “Saving…/Saved” state
- Keyboard: Ctrl/Cmd+S to save
- Stats bar (lines, words, characters)
- Dark mode toggle (persisted) and improved typography for preview
- Draggable splitter between editor and preview (desktop)
- Mobile‑friendliness with floating + button

## Challenges & Iterations
- **Tailwind v4 PostCSS plugin**: Switched to `@tailwindcss/postcss` and updated config to fix builds.
- **PowerShell command chaining**: Re‑ran setup steps sequentially instead of using `&&`.
- **Design**: Added typography plugin, refined spacing, and a dark theme to address “plain” look.
- **Usability polish**: Implemented search, import/export, save indicator, stats, and splitter for professional feel.

## Optional Deployment
- Any static host works (e.g., Vercel, Netlify, GitHub Pages). The build output is `dist/`.
- If deployed, add the public URL here:
  - Deployment: <your_public_url>

---
If you’re reviewing this, I aimed for a clear, responsive, and humane editing flow with straightforward state and readable components.
