# The Notebook – Multi‑File Markdown Editor

## Why this project
I chose “The Notebook” because it highlights practical UI thinking and real‑time UX. It’s a focused, front‑end‑only build that still demonstrates structure, state modeling, persistence, and a great editing workflow — exactly the kind of problem where prompt engineering with Cursor shines.

Repo: https://github.com/yin-0128/notebook-markdown-editor

## What you get
- Multi‑file Markdown editing with a clean 3‑panel layout
  - Left: files (create, rename, delete, switch)
  - Middle: editor (autosave, keyboard shortcut)
  - Right: live preview (Markdown → HTML)
- Local‑only persistence (no backend) via localStorage
- Useful extras for productivity
  - Search files by name (instant filter in the header)
  - Import .md files and Export the current note as .md
  - Stats bar (lines, words, characters) + visible “Saving…/Saved” indicator
  - Ctrl/Cmd+S forces save
  - Mobile‑friendly layout with a floating + button for quick create

## Tech stack
- React + Vite
- Tailwind CSS (v4) with @tailwindcss/postcss
- marked (Markdown parsing)
- localStorage API

## How it works (high level)
- State model: `files: Array<{ id, name, content, updatedAt }>` and `selectedFileId`
- On first load, seed with one default note
- Persist to localStorage on every edit (debounced) and on Ctrl/Cmd+S
- Live preview uses marked to convert Markdown to HTML
- Header provides: search, New, Export, Import
- Editor updates state; StatsBar shows counts and save state

## Run it locally
```bash
npm install
npm run dev
```
Then open the URL shown in your terminal.

## Build for production
```bash
npm run build
```
The static bundle is emitted to `dist/`.

## Security note
This is a client‑side app. If you plan to allow raw HTML in Markdown from untrusted sources, consider sanitizing the preview (e.g., with DOMPurify). For this assessment, the focus is UX and local persistence.

## Design and UX choices (humanized)
- Keep the interface quiet and obvious: files on the left, typing center, preview right.
- Make routine actions fast: New/Export/Import are one click away at the top.
- Show confidence in saving: a subtle “Saving…/Saved” indicator plus Ctrl/Cmd+S.
- Help with focus: a clean, airy layout; independent scroll areas; readable typography.
- Be mobile considerate: quick + button, stacks sensibly on small screens.

## Future improvements
- Inline rename and drag‑to‑reorder in the file list
- Global search across content (not just names)
- Per‑note themes and font sizing
- Import/export workspace as JSON; GitHub Gist sync option
- Simple command palette (Ctrl/Cmd+K)

---
If you’re reviewing this: I optimized for clarity, responsiveness, and a humane editing flow. The code is intentionally readable with straightforward state and small, focused components.
