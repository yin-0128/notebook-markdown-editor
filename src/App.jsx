import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import FileList from './components/FileList'
import Editor from './components/Editor'
import Preview from './components/Preview'
import StatsBar from './components/StatsBar'

const STORAGE_KEY = 'notebookFiles'

function createDefaultFiles() {
  return [
    {
      id: crypto.randomUUID(),
      name: 'Untitled.md',
      updatedAt: Date.now(),
      content: `# Welcome to Notebook\n\n- Create files on the left\n- Edit in the middle\n- See preview on the right\n\n\`\`\`js\nconsole.log('Hello Markdown!')\n\`\`\``,
    },
  ]
}

export default function App() {
  const [files, setFiles] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : createDefaultFiles()
    } catch {
      return createDefaultFiles()
    }
  })
  const [selectedFileId, setSelectedFileId] = useState(() => files[0]?.id ?? null)
  const [filter, setFilter] = useState('')
  const [isSaved, setIsSaved] = useState(true)
  const [importInputKey, setImportInputKey] = useState(0)

  useEffect(() => {
    // debounce save to localStorage
    setIsSaved(false)
    const t = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(files))
      } catch {
        // ignore persistence errors for now
      }
      setIsSaved(true)
    }, 400)
    return () => clearTimeout(t)
  }, [files])

  const filteredFiles = useMemo(() => {
    const q = filter.trim().toLowerCase()
    if (!q) return files
    return files.filter(f => f.name.toLowerCase().includes(q))
  }, [files, filter])
  const selectedFile = useMemo(() => files.find(f => f.id === selectedFileId) || null, [files, selectedFileId])

  function handleCreate() {
    const base = 'Untitled.md'
    const existingNames = new Set(files.map(f => f.name))
    let candidate = base
    let i = 1
    while (existingNames.has(candidate)) {
      candidate = `Untitled ${i}.md`
      i += 1
    }
    const newFile = { id: crypto.randomUUID(), name: candidate, content: '', updatedAt: Date.now() }
    setFiles([newFile, ...files])
    setSelectedFileId(newFile.id)
  }

  function handleSelect(id) {
    setSelectedFileId(id)
  }

  function handleRename(id) {
    const current = files.find(f => f.id === id)
    if (!current) return
    const nextName = prompt('Rename file', current.name)
    if (!nextName) return
    setFiles(files.map(f => (f.id === id ? { ...f, name: nextName, updatedAt: Date.now() } : f)))
  }

  function handleDelete(id) {
    if (!confirm('Delete this file?')) return
    const next = files.filter(f => f.id !== id)
    setFiles(next)
    if (selectedFileId === id) {
      setSelectedFileId(next[0]?.id ?? null)
    }
  }

  function handleContentChange(next) {
    if (!selectedFile) return
    setFiles(files.map(f => (f.id === selectedFile.id ? { ...f, content: next, updatedAt: Date.now() } : f)))
  }

  function handleExport() {
    if (!selectedFile) return
    const blob = new Blob([selectedFile.content || ''], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = selectedFile.name || 'note.md'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  function handleImport(filesList) {
    const file = filesList?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const content = String(reader.result || '')
      const newFile = { id: crypto.randomUUID(), name: file.name || 'Imported.md', content, updatedAt: Date.now() }
      setFiles([newFile, ...files])
      setSelectedFileId(newFile.id)
      setImportInputKey(k => k + 1)
    }
    reader.readAsText(file)
  }

  useEffect(() => {
    function onKeydown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault()
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(files))
          setIsSaved(true)
        } catch {}
      }
    }
    window.addEventListener('keydown', onKeydown)
    return () => window.removeEventListener('keydown', onKeydown)
  }, [files])

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Header
        filter={filter}
        onFilterChange={setFilter}
        onCreate={handleCreate}
        onExport={handleExport}
        onImportClick={() => document.getElementById('import-input')?.click()}
      />
      <div className="mx-auto max-w-7xl h-[calc(100vh-56px)] px-4 py-4">
        <div className="h-full flex rounded-lg border border-gray-200 overflow-hidden bg-white">
          <FileList
            files={filteredFiles}
            selectedFileId={selectedFileId}
            onCreate={handleCreate}
            onSelect={handleSelect}
            onRename={handleRename}
            onDelete={handleDelete}
          />
          <main className="flex-1 grid grid-cols-1 xl:grid-cols-2">
            <section className="border-r border-gray-200">
              <Editor value={selectedFile?.content ?? ''} onChange={handleContentChange} />
              <StatsBar value={selectedFile?.content ?? ''} saved={isSaved} />
            </section>
            <section className="hidden xl:block">
              <Preview value={selectedFile?.content ?? ''} />
            </section>
          </main>
        </div>
        <input
          id="import-input"
          key={importInputKey}
          type="file"
          accept=".md,text/markdown,text/plain"
          className="hidden"
          onChange={(e) => handleImport(e.target.files)}
        />
        {/* Floating action button for new file on small screens */}
        <button
          onClick={handleCreate}
          className="xl:hidden fixed right-6 bottom-6 h-12 w-12 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
          aria-label="Create new file"
        >
          +
        </button>
      </div>
    </div>
  )
}
