import React, { useMemo, useState } from 'react'

export default function HexToRgb() {
  const [hex, setHex] = useState('#22d3ee')

  const rgb = useMemo(() => {
    let h = hex.trim()
    if (!/^#?[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(h)) return null
    if (h[0] === '#') h = h.slice(1)
    if (h.length === 3) h = h.split('').map(c => c + c).join('')
    const r = parseInt(h.slice(0,2), 16)
    const g = parseInt(h.slice(2,4), 16)
    const b = parseInt(h.slice(4,6), 16)
    return { r, g, b }
  }, [hex])

  const css = useMemo(() => rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '', [rgb])

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">HEX to RGB</h2>
          <input value={hex} onChange={(e)=>setHex(e.target.value)} placeholder="#000000" className="w-full bg-surface panel-border rounded p-3 font-mono" />
          {!rgb && <div className="text-red-400 text-sm mt-2">Invalid HEX</div>}
        </div>
        {rgb && (
          <div className="panel panel-border p-4 rounded-xl space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded panel-border" style={{ background: css }} />
              <div className="text-sm text-muted">Preview</div>
            </div>
            <div>
              <div className="text-sm text-muted">CSS</div>
              <pre className="bg-surface panel-border rounded p-2">{css}</pre>
            </div>
            <div>
              <div className="text-sm text-muted">Swift</div>
              <pre className="bg-surface panel-border rounded p-2">{`UIColor(red: ${rgb.r}/255.0, green: ${rgb.g}/255.0, blue: ${rgb.b}/255.0, alpha: 1.0)`}</pre>
            </div>
            <div>
              <div className="text-sm text-muted">Android</div>
              <pre className="bg-surface panel-border rounded p-2">{`Color.rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

