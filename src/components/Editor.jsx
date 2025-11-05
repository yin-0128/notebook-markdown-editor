export default function Editor({ value, onChange }) {
  return (
    <div className="h-full w-full">
      <textarea
        className="w-full h-full p-4 font-mono text-sm outline-none border-0 focus:ring-0 resize-none bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start typing Markdown..."
      />
    </div>
  );
}


