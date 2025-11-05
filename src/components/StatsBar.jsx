function computeStats(text) {
  const lines = (text || '').split(/\r?\n/).length
  const words = (text || '').trim() ? (text || '').trim().split(/\s+/).length : 0
  const chars = (text || '').length
  return { lines, words, chars }
}

export default function StatsBar({ value, saved }) {
  const { lines, words, chars } = computeStats(value)
  return (
    <div className="flex items-center justify-between border-t border-gray-200 dark:border-zinc-800 px-6 py-2.5 bg-gray-50 dark:bg-zinc-900/50">
      <div className="flex items-center gap-6 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          {lines} {lines === 1 ? 'line' : 'lines'}
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          {words} {words === 1 ? 'word' : 'words'}
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
          </svg>
          {chars.toLocaleString()} {chars === 1 ? 'char' : 'chars'}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs">
        {saved ? (
          <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Saved
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
            <svg className="w-3.5 h-3.5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Saving...
          </span>
        )}
      </div>
    </div>
  )
}


