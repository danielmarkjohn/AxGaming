import React, { useMemo, useState } from 'react'

async function sha(text, algo='SHA-256') {
  const enc = new TextEncoder()
  const buf = enc.encode(text)
  const digest = await crypto.subtle.digest(algo, buf)
  return Array.from(new Uint8Array(digest)).map(b=>b.toString(16).padStart(2,'0')).join('')
}

export default function HashGenerator() {
  const [text, setText] = useState('hello world')
  const [algo, setAlgo] = useState('SHA-256')
  const [out, setOut] = useState('')

  const run = async () => {
    const res = await sha(text, algo)
    setOut(res)
  }

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl space-y-3">
          <h2 className="text-xl font-semibold">Hash Generator</h2>
          <textarea rows={6} value={text} onChange={(e)=>setText(e.target.value)} className="w-full bg-surface panel-border rounded p-3 font-mono" />
          <label className="text-sm text-muted">Algorithm
            <select value={algo} onChange={(e)=>setAlgo(e.target.value)} className="w-full bg-surface panel-border rounded p-2">
              <option>SHA-256</option>
              <option>SHA-384</option>
              <option>SHA-512</option>
            </select>
          </label>
          <button onClick={run} className="px-4 py-2 rounded bg-surface panel-border">Generate</button>
        </div>
        {out && (
          <div className="panel panel-border p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Output</h3>
              <button className="px-3 py-1 rounded bg-surface panel-border" onClick={() => navigator.clipboard.writeText(out)}>Copy</button>
            </div>
            <pre className="bg-surface panel-border rounded p-3 text-sm word-break break-all">{out}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

