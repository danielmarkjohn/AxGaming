import React, { useState } from 'react'

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
function unescapeHtml(s) {
  const e = {'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':'\''}
  return s.replace(/(&amp;|&lt;|&gt;|&quot;|&#39;)/g, m => e[m])
}

export default function HtmlEscape() {
  const [input, setInput] = useState('<div>"Hello" & goodbye</div>')
  const [mode, setMode] = useState('escape')

  const run = () => mode === 'escape' ? escapeHtml(input) : unescapeHtml(input)

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">HTML Escape/Unescape</h2>
          <div className="flex gap-2 mb-3">
            <button onClick={()=>setMode('escape')} className={`px-3 py-2 rounded bg-surface panel-border ${mode==='escape'?'border-white/40':''}`}>Escape</button>
            <button onClick={()=>setMode('unescape')} className={`px-3 py-2 rounded bg-surface panel-border ${mode==='unescape'?'border-white/40':''}`}>Unescape</button>
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

