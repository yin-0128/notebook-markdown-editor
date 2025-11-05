# The Notebook - Multi-File Markdown Editor

## Overview
A client-side Markdown editor with a 3-panel layout: file list, editor, and live preview. Built with React + Vite, Tailwind CSS, and marked. Files persist in localStorage.

## Tech Stack
- React + Vite
- Tailwind CSS
- marked (Markdown to HTML)
- localStorage (persistence)

## Features
- Create, rename, delete, and switch between Markdown files
- Live preview as you type
- Autosave to localStorage
- Responsive layout with floating new-file button on mobile

## Getting Started
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Notes
- Preview uses marked; consider sanitizing HTML output (e.g., DOMPurify) for untrusted content.
- All data stays in the browser; no backend required.

## Future Improvements
- Search across files
- Import/export files
- Keyboard shortcuts and rename inline UX
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
