import React, { useMemo, useState } from 'react'

export default function QueryToJson() {
  const [input, setInput] = useState('https://example.com/?a=1&b=hello%20world&b=again')
  const [error, setError] = useState('')

  const out = useMemo(() => {
    try {
      setError('')
      const url = new URL(input.includes('://') ? input : 'https://x/?' + input.replace(/^\?/, ''))
      const params = new URLSearchParams(url.search)
      const obj = {}
      for (const [k,v] of params) {
        if (obj[k] === undefined) obj[k] = v
        else if (Array.isArray(obj[k])) obj[k].push(v)
        else obj[k] = [obj[k], v]
      }
      return obj
    } catch (e) {
      setError('Invalid URL or query string')
      return {}
    }
  }, [input])

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">Query Parameters to JSON</h2>
          <textarea rows={4} value={input} onChange={(e)=>setInput(e.target.value)} className="w-full bg-surface panel-border rounded p-3 font-mono" />
          {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
        </div>
        <div className="panel panel-border p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Output JSON</h3>
            <button className="px-3 py-1 rounded bg-surface panel-border" onClick={() => navigator.clipboard.writeText(JSON.stringify(out, null, 2))}>Copy</button>
          </div>
          <pre className="bg-surface panel-border rounded p-3 text-sm overflow-auto">{JSON.stringify(out, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}

