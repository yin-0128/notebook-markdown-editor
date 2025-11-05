export default function FileList({ files, selectedFileId, onCreate, onSelect, onRename, onDelete }) {
  return (
    <aside className="h-full w-64 shrink-0 border-r border-gray-200 bg-white">
      <div className="p-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600">Files</span>
        <button
          className="text-white bg-blue-600 hover:bg-blue-700 text-xs px-2 py-1 rounded"
          onClick={onCreate}
        >
          New
        </button>
      </div>
      <ul className="overflow-y-auto h-[calc(100%-40px)]">
        {files.map((f) => (
          <li key={f.id} className={"group flex items-center justify-between gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50 " + (selectedFileId === f.id ? "bg-blue-50" : "")}
              onClick={() => onSelect(f.id)}>
            <span className="truncate text-sm">{f.name}</span>
            <div className="opacity-0 group-hover:opacity-100 flex gap-1">
              <button
                className="text-gray-500 hover:text-gray-700 text-xs"
                onClick={(e) => { e.stopPropagation(); onRename(f.id); }}
              >
                Rename
              </button>
              <button
                className="text-red-600 hover:text-red-700 text-xs"
                onClick={(e) => { e.stopPropagation(); onDelete(f.id); }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}


