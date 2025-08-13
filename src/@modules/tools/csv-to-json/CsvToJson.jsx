import React, { useMemo, useState } from 'react'

export default function CsvToJson() {
  const [csv, setCsv] = useState('name,age\nAlice,30\nBob,25')
  const [delimiter, setDelimiter] = useState(',')
  const [hasHeader, setHasHeader] = useState(true)
  const [trim, setTrim] = useState(true)
  const [error, setError] = useState('')

  const parseCsv = (text) => {
    // Simple CSV parser: no quoted-commas support (documented limitation)
    const rows = text.replace(/\r/g, '').split('\n')
    if (rows.length === 0) return []
    const cells = rows.map(r => r.split(delimiter))
    if (trim) {
      for (let r=0;r<cells.length;r++) cells[r] = cells[r].map(c => c.trim())
    }
    if (hasHeader) {
      const header = cells[0]
      return cells.slice(1).filter(r => r.some(c => c !== '')).map(r => {
        const obj = {}
        header.forEach((h,i)=>{ obj[header[i] || `col_${i+1}`] = r[i] ?? '' })
        return obj
      })
    } else {
      return cells.filter(r => r.some(c => c !== '')).map(r => r.reduce((o, c, i) => ({ ...o, [`col_${i+1}`]: c }), {}))
    }
  }

  const json = useMemo(() => {
    try {
      setError('')
      return parseCsv(csv)
    } catch (e) {
      setError('Failed to parse CSV')
      return []
    }
  }, [csv, delimiter, hasHeader, trim])

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">CSV to JSON</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
            <label className="text-sm text-muted">Delimiter
              <input value={delimiter} onChange={(e)=>setDelimiter(e.target.value)} className="w-full bg-surface panel-border rounded p-2 ml-2" />
            </label>
            <label className="text-sm text-muted flex items-center gap-2">
              <input type="checkbox" checked={hasHeader} onChange={(e)=>setHasHeader(e.target.checked)} /> Has header row
            </label>
            <label className="text-sm text-muted flex items-center gap-2">
              <input type="checkbox" checked={trim} onChange={(e)=>setTrim(e.target.checked)} /> Trim cells
            </label>
          </div>
          <textarea value={csv} onChange={(e)=>setCsv(e.target.value)} rows={8} className="w-full bg-surface panel-border rounded p-3 font-mono" />
          {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
        </div>
        <div className="panel panel-border p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">JSON</h3>
            <button className="px-3 py-1 rounded bg-surface panel-border" onClick={() => navigator.clipboard.writeText(JSON.stringify(json, null, 2))}>Copy</button>
          </div>
          <pre className="bg-surface panel-border rounded p-3 text-sm overflow-auto">{JSON.stringify(json, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}

