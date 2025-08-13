import React, { useMemo, useState } from 'react'

export default function HarViewer() {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [expanded, setExpanded] = useState({})

  const data = useMemo(() => {
    if (!input.trim()) return null
    try {
      setError('')
      return JSON.parse(input)
    } catch (e) {
      setError('Invalid HAR (must be JSON)')
      return null
    }
  }, [input])

  const entries = data?.log?.entries || []

  const toggle = (i) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }))

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">HAR file viewer</h2>
          <textarea rows={10} value={input} onChange={(e)=>setInput(e.target.value)} className="w-full bg-surface panel-border rounded p-3 font-mono" placeholder="Paste HAR JSON here" />
          {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
        </div>
        <div className="panel panel-border p-4 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Entries ({entries.length})</h3>
          </div>
          {entries.length === 0 ? (
            <div className="text-muted text-sm">No entries</div>
          ) : (
            <div className="divide-y divide-white/5">
              {entries.map((e,i) => (
                <div key={i} className="py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-sm text-muted shrink-0">{i+1}.</span>
                      <span className="truncate">{e.request?.method} {e.request?.url}</span>
                    </div>
                    <button className="px-2 py-1 rounded bg-surface panel-border text-sm" onClick={()=>toggle(i)}>
                      {expanded[i] ? 'Hide' : 'Details'}
                    </button>
                  </div>
                  {expanded[i] && (
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-surface panel-border rounded p-2 text-sm overflow-auto">
                        <div className="text-muted mb-1">Request</div>
                        <pre className="whitespace-pre-wrap break-words">{JSON.stringify(e.request, null, 2)}</pre>
                      </div>
                      <div className="bg-surface panel-border rounded p-2 text-sm overflow-auto">
                        <div className="text-muted mb-1">Response</div>
                        <pre className="whitespace-pre-wrap break-words">{JSON.stringify(e.response, null, 2)}</pre>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

