export default function Editor({ value, onChange }) {
  return (
    <div className="h-full w-full bg-white dark:bg-zinc-900 flex flex-col">
      <div className="flex-1 relative">
        <textarea
          className="absolute inset-0 w-full h-full p-6 font-mono text-sm leading-relaxed text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none border-0 resize-none bg-transparent focus:ring-0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Start typing Markdown...&#10;&#10;Use # for headings&#10;Use - or * for lists&#10;Use **text** for bold&#10;Use `code` for inline code"
          spellCheck="false"
        />
      </div>
    </div>
  );
}


