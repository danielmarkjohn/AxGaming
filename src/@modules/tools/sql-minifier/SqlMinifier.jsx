import React, { useMemo, useState } from 'react'

function minify(sql) {
  // Remove /* */ comments
  let out = sql.replace(/\/\*[\s\S]*?\*\//g, '')
  // Remove -- comments to end of line
  out = out.replace(/--[^\n\r]*/g, '')
  // Collapse whitespace
  out = out.replace(/\s+/g, ' ')
  // Trim
  out = out.trim()
  return out
}

export default function SqlMinifier() {
  const [input, setInput] = useState('SELECT *  -- comments\nFROM users /* test */ WHERE id = 1;')
  const output = useMemo(() => minify(input), [input])

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">SQL Minifier</h2>
          <textarea rows={8} value={input} onChange={(e)=>setInput(e.target.value)} className="w-full bg-surface panel-border rounded p-3 font-mono" />
        </div>
        <div className="panel panel-border p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Minified</h3>
            <button className="px-3 py-1 rounded bg-surface panel-border" onClick={() => navigator.clipboard.writeText(output)}>Copy</button>
          </div>
          <textarea rows={6} value={output} readOnly className="w-full bg-surface panel-border rounded p-3 font-mono" />
        </div>
      </div>
    </div>
  )
}

