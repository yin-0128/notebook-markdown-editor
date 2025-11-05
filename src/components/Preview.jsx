import { marked } from 'marked'
import { useMemo } from 'react'

export default function Preview({ value }) {
  const html = useMemo(() => {
    try {
      return marked.parse(value || '')
    } catch (e) {
      return '<p class="text-red-600 dark:text-red-400">Failed to render preview.</p>'
    }
  }, [value])

  return (
    <div className="h-full w-full overflow-y-auto bg-white dark:bg-zinc-900">
      <div className="max-w-none p-8 prose prose-zinc dark:prose-invert prose-headings:font-semibold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-pre:bg-gray-100 dark:prose-pre:bg-zinc-800 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-zinc-700 prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-700 dark:hover:prose-a:text-blue-300 prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-ol:text-gray-700 dark:prose-ol:text-gray-300" dangerouslySetInnerHTML={{ __html: html }} />
      {!value && (
        <div className="p-8 text-center text-gray-400 dark:text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-sm">Preview will appear here</p>
        </div>
      )}
    </div>
  )
}

// NOTE: For production use, consider sanitizing HTML output (e.g., DOMPurify)
// if you plan to allow raw HTML inside Markdown. marked does not sanitize by default.


