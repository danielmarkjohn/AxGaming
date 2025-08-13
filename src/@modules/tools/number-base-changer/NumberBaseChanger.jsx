import React, { useEffect, useMemo, useState } from 'react'

export default function NumberBaseChanger() {
  const [input, setInput] = useState('1010')
  const [baseIn, setBaseIn] = useState(2)
  const [baseOut, setBaseOut] = useState(10)
  const [error, setError] = useState('')

  const output = useMemo(() => {
    try {
      setError('')
      const n = parseInt(input.trim(), baseIn)
      if (Number.isNaN(n)) throw new Error('Invalid number for base ' + baseIn)
      return n.toString(baseOut)
    } catch (e) {
      setError(e.message)
      return ''
    }
  }, [input, baseIn, baseOut])

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl space-y-3">
          <h2 className="text-xl font-semibold">Number Base Changer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-sm text-muted">Input</label>
              <input value={input} onChange={(e)=>setInput(e.target.value)} className="w-full bg-surface panel-border rounded p-2 font-mono" />
            </div>
            <div>
              <label className="text-sm text-muted">From Base</label>
              <input type="number" min={2} max={36} value={baseIn} onChange={(e)=>setBaseIn(Number(e.target.value))} className="w-full bg-surface panel-border rounded p-2" />
            </div>
            <div>
              <label className="text-sm text-muted">To Base</label>
              <input type="number" min={2} max={36} value={baseOut} onChange={(e)=>setBaseOut(Number(e.target.value))} className="w-full bg-surface panel-border rounded p-2" />
            </div>
          </div>
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <div>
            <label className="text-sm text-muted">Output</label>
            <input value={output} readOnly className="w-full bg-surface panel-border rounded p-2 font-mono" />
          </div>
        </div>
      </div>
    </div>
  )
}

