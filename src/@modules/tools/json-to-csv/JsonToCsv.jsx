import React, { useMemo, useState } from 'react'

function toCsv(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return ''
  const header = Array.from(arr.reduce((set, obj) => {
    Object.keys(obj || {}).forEach(k => set.add(k))
    return set
  }, new Set()))
  const esc = (v) => {
    const s = v == null ? '' : String(v)
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s
  }
  const rows = [header.join(',')]
  for (const obj of arr) {
    rows.push(header.map(k => esc(obj[k])).join(','))
  }
  return rows.join('\n')
}

export default function JsonToCsv() {
  const [input, setInput] = useState('[{"name":"Alice","age":30},{"name":"Bob"}]')
  const [error, setError] = useState('')

  const output = useMemo(() => {
    try {
      const data = JSON.parse(input)
      setError('')
      return toCsv(Array.isArray(data) ? data : [data])
    } catch (e) {
      setError('Invalid JSON')
      return ''
    }
  }, [input])

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">JSON to CSV</h2>
          <textarea rows={8} value={input} onChange={(e)=>setInput(e.target.value)} className="w-full bg-surface panel-border rounded p-3 font-mono" />
          {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
        </div>
        <div className="panel panel-border p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">CSV</h3>
            <button className="px-3 py-1 rounded bg-surface panel-border" onClick={() => navigator.clipboard.writeText(output)}>Copy</button>
          </div>
          <textarea rows={8} value={output} readOnly className="w-full bg-surface panel-border rounded p-3 font-mono" />
        </div>
      </div>
    </div>
  )
}

