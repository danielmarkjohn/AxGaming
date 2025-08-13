import React, { useMemo, useState } from 'react'

function applyDelta(date, delta) {
  // Simple delta parser: +3d -2h 15m
  const re = /([+-]?\d+)\s*(d|h|m|s)/g
  let d = new Date(date.getTime())
  let match
  while ((match = re.exec(delta)) !== null) {
    const val = parseInt(match[1], 10)
    const unit = match[2]
    if (unit === 'd') d.setDate(d.getDate() + val)
    if (unit === 'h') d.setHours(d.getHours() + val)
    if (unit === 'm') d.setMinutes(d.getMinutes() + val)
    if (unit === 's') d.setSeconds(d.getSeconds() + val)
  }
  return d
}

export default function DateMath(){
  const [base,setBase]=useState(()=>new Date().toISOString().slice(0,16)) // yyyy-MM-ddTHH:mm
  const [delta,setDelta]=useState('+3d -2h 15m')

  const result = useMemo(() => {
    try {
      const baseDate = new Date(base)
      return applyDelta(baseDate, delta)
    } catch {
      return null
    }
  }, [base, delta])

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl space-y-3">
          <h2 className="text-xl font-semibold">Date Math Calculator</h2>
          <label className="text-sm text-muted">Base Date/Time
            <input type="datetime-local" value={base} onChange={(e)=>setBase(e.target.value)} className="w-full bg-surface panel-border rounded p-2" />
          </label>
          <label className="text-sm text-muted">Delta (e.g., +3d -2h 15m)
            <input value={delta} onChange={(e)=>setDelta(e.target.value)} className="w-full bg-surface panel-border rounded p-2" />
          </label>
        </div>
        <div className="panel panel-border p-4 rounded-xl">
          <h3 className="font-semibold mb-2">Result</h3>
          <div className="font-mono">
            {result ? (
              <>
                <div>Local: {result.toString()}</div>
                <div>ISO: {result.toISOString()}</div>
                <div>Unix: {Math.floor(result.getTime()/1000)}</div>
              </>
            ) : 'Invalid input'}
          </div>
        </div>
      </div>
    </div>
  )
}

