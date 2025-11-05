import { marked } from 'marked'
import { useMemo } from 'react'

export default function Preview({ value }) {
  const html = useMemo(() => {
    try {
      return marked.parse(value || '')
    } catch (e) {
      return '<p class="text-red-600">Failed to render preview.</p>'
    }
  }, [value])

  return (
    <div className="h-full w-full overflow-y-auto bg-white">
      <div className="p-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

// NOTE: For production use, consider sanitizing HTML output (e.g., DOMPurify)
// if you plan to allow raw HTML inside Markdown. marked does not sanitize by default.


