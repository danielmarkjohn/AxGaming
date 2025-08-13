import React, { useMemo, useState } from 'react'

export default function CssUnitsConverter() {
  const [px, setPx] = useState(16)
  const [base, setBase] = useState(16) // base font size for rem/em
  const [vwWidth, setVwWidth] = useState(1920)
  const [vhHeight, setVhHeight] = useState(1080)

  const rem = useMemo(() => (px / base), [px, base])
  const em = rem // same as rem when using base
  const vw = useMemo(() => (px / vwWidth) * 100, [px, vwWidth])
  const vh = useMemo(() => (px / vhHeight) * 100, [px, vhHeight])

  return (
    <div className="h-full p-6 text-white overflow-auto">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-xl border border-white/10 p-4 space-y-4">
        <h2 className="text-xl font-semibold">CSS Units Converter</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm">Pixels (px)</label>
            <input type="number" value={px} onChange={(e)=>setPx(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded-lg p-3" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Base font size (px)</label>
            <input type="number" value={base} onChange={(e)=>setBase(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded-lg p-3" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Viewport width (px)</label>
            <input type="number" value={vwWidth} onChange={(e)=>setVwWidth(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded-lg p-3" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Viewport height (px)</label>
            <input type="number" value={vhHeight} onChange={(e)=>setVhHeight(Number(e.target.value))} className="w-full bg-black/40 border border-white/10 rounded-lg p-3" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="text-xs text-white/60">rem</div>
            <div className="text-lg font-mono">{rem.toFixed(4)}rem</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="text-xs text-white/60">em</div>
            <div className="text-lg font-mono">{em.toFixed(4)}em</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="text-xs text-white/60">vw</div>
            <div className="text-lg font-mono">{vw.toFixed(4)}vw</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="text-xs text-white/60">vh</div>
            <div className="text-lg font-mono">{vh.toFixed(4)}vh</div>
          </div>
        </div>
      </div>
    </div>
  )
}

