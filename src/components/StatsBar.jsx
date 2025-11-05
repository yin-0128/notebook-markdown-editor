function computeStats(text) {
  const lines = (text || '').split(/\r?\n/).length
  const words = (text || '').trim() ? (text || '').trim().split(/\s+/).length : 0
  const chars = (text || '').length
  return { lines, words, chars }
}

export default function StatsBar({ value, saved }) {
  const { lines, words, chars } = computeStats(value)
  return (
    <div className="flex items-center justify-between border-t border-gray-200 text-xs text-gray-600 px-3 py-2 bg-gray-50">
      <div className="flex gap-4">
        <span>Lines: {lines}</span>
        <span>Words: {words}</span>
        <span>Chars: {chars}</span>
      </div>
      <div className="min-w-16 text-right">
        {saved ? <span className="text-green-600">Saved</span> : <span className="text-amber-600">Saving...</span>}
      </div>
    </div>
  )
}


