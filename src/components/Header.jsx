export default function Header({ filter, onFilterChange, onCreate, onExport, onImportClick }) {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      <div className="mx-auto max-w-7xl flex items-center gap-3">
        <h1 className="text-lg font-semibold tracking-tight mr-4">Notebook</h1>
        <input
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder="Search files..."
          className="flex-1 max-w-md rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={onCreate}
            className="rounded-md bg-blue-600 text-white text-sm px-3 py-1.5 hover:bg-blue-700"
          >
            New
          </button>
          <button
            onClick={onExport}
            className="rounded-md bg-gray-100 text-gray-900 text-sm px-3 py-1.5 border border-gray-200 hover:bg-gray-200"
          >
            Export
          </button>
          <button
            onClick={onImportClick}
            className="rounded-md bg-gray-100 text-gray-900 text-sm px-3 py-1.5 border border-gray-2 00 hover:bg-gray-200"
          >
            Import
          </button>
        </div>
      </div>
    </header>
  );
}


