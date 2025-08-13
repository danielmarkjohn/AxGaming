import React, { useMemo, useState } from 'react'

function convertEnvToToml(envText) {
  const lines = envText.replace(/\r/g,'').split('\n')
  const pairs = []
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx === -1) continue
    const key = trimmed.slice(0, idx).trim()
    let val = trimmed.slice(idx + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    pairs.push([key, val])
  }
  const toml = ["[build.environment]"]
  for (const [k,v] of pairs) {
    const safe = v.replace(/"/g, '\\"')
    toml.push(`${k} = "${safe}"`)
  }
  return toml.join('\n')
}

export default function EnvToNetlifyToml() {
  const [input, setInput] = useState('API_KEY=abc123\nDEBUG=true\nNAME="My App"')
  const output = useMemo(() => convertEnvToToml(input), [input])

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">.env to netlify.toml</h2>
          <textarea rows={8} value={input} onChange={(e)=>setInput(e.target.value)} className="w-full bg-surface panel-border rounded p-3 font-mono" />
        </div>
        <div className="panel panel-border p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">netlify.toml</h3>
            <button className="px-3 py-1 rounded bg-surface panel-border" onClick={() => navigator.clipboard.writeText(output)}>Copy</button>
          </div>
          <pre className="bg-surface panel-border rounded p-3 text-sm overflow-auto">{output}</pre>
        </div>
      </div>
    </div>
  )
}

