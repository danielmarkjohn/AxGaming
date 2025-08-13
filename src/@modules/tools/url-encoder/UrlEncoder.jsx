import React, { useState } from 'react'

export default function UrlEncoder() {
  const [input, setInput] = useState('https://example.com/?q=hello world&x=1')
  const [mode, setMode] = useState('encode')

  const run = () => mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input)

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">URL Encode/Decode</h2>
          <div className="flex gap-2 mb-3">
            <button onClick={()=>setMode('encode')} className={`px-3 py-2 rounded bg-surface panel-border ${mode==='encode'?'border-white/40':''}`}>Encode</button>
            <button onClick={()=>setMode('decode')} className={`px-3 py-2 rounded bg-surface panel-border ${mode==='decode'?'border-white/40':''}`}>Decode</button>
          </div>
          <textarea rows={6} value={input} onChange={(e)=>setInput(e.target.value)} className="w-full bg-surface panel-border rounded p-3 font-mono" />
        </div>
        <div className="panel panel-border p-4 rounded-xl">
          <h3 className="font-semibold mb-2">Output</h3>
          <pre className="bg-surface panel-border rounded p-3 text-sm whitespace-pre-wrap break-words">{run()}</pre>
        </div>
      </div>
    </div>
  )
}

