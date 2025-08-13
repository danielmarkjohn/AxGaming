import React, { useEffect, useRef, useState } from 'react'

export default function SvgViewer() {
  const [code, setCode] = useState('<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">\n  <circle cx="60" cy="60" r="50" fill="tomato"/>\n</svg>')
  const [error, setError] = useState('')
  const iframeRef = useRef(null)

  useEffect(() => {
    try {
      setError('')
      const iframe = iframeRef.current
      if (!iframe) return
      const doc = iframe.contentDocument
      doc.open()
      doc.write(code)
      doc.close()
    } catch (e) {
      setError('Failed to render SVG')
    }
  }, [code])

  return (
    <div className="h-full p-6 text-white overflow-auto">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-900 rounded-xl border border-white/10 p-4">
          <h2 className="text-xl font-semibold mb-3">SVG Code</h2>
          <textarea
            value={code}
            onChange={(e)=>setCode(e.target.value)}
            rows={16}
            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 font-mono"
          />
          {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
        </div>
        <div className="bg-gray-900 rounded-xl border border-white/10 p-4">
          <h2 className="text-xl font-semibold mb-3">Preview</h2>
          <iframe ref={iframeRef} className="w-full h-[400px] bg-white rounded" title="SVG Preview" />
        </div>
      </div>
    </div>
  )
}

