import React, { useMemo, useState } from 'react'

function parseSize(s){
  const m = s.trim().match(/^(\d+(?:\.\d+)?)\s*(b|kb|mb|gb|tb|pb|kib|mib|gib|tib|pib)?$/i)
  if (!m) return null
  const val = parseFloat(m[1])
  const unit = (m[2]||'b').toLowerCase()
  const dec = {b:1, kb:1e3, mb:1e6, gb:1e9, tb:1e12, pb:1e15}
  const bin = {b:1, kib:1024, mib:1024**2, gib:1024**3, tib:1024**4, pib:1024**5}
  const factor = dec[unit] || bin[unit] || 1
  return Math.round(val * factor)
}

export default function ByteSize(){
  const [input,setInput]=useState('1.5 GiB')
  const [bytes,setBytes]=useState(() => parseSize('1.5 GiB')||0)
  const out = useMemo(() => {
    const b = parseSize(input); setBytes(b||0)
    const dec = [1e3,1e6,1e9,1e12,1e15]
    const bin = [1024,1024**2,1024**3,1024**4,1024**5]
    return {
      decimal: {
        KB: (bytes/1e3).toFixed(3), MB: (bytes/1e6).toFixed(3), GB: (bytes/1e9).toFixed(3), TB:(bytes/1e12).toFixed(6)
      },
      binary: {
        KiB: (bytes/1024).toFixed(3), MiB:(bytes/1024**2).toFixed(3), GiB:(bytes/1024**3).toFixed(3), TiB:(bytes/1024**4).toFixed(6)
      }
    }
  }, [input, bytes])
  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl space-y-3">
          <h2 className="text-xl font-semibold">Byte Size Converter</h2>
          <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="e.g., 5MB, 1.5 GiB" className="w-full bg-surface panel-border rounded p-2 font-mono" />
        </div>
        <div className="panel panel-border p-4 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-surface panel-border rounded p-3">
            <div className="text-xs text-muted mb-1">Decimal (SI)</div>
            <pre className="font-mono">{JSON.stringify(out.decimal, null, 2)}</pre>
          </div>
          <div className="bg-surface panel-border rounded p-3">
            <div className="text-xs text-muted mb-1">Binary (IEC)</div>
            <pre className="font-mono">{JSON.stringify(out.binary, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}

