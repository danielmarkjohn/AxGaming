import React, { useEffect, useRef, useState } from 'react'

export default function Timer() {
  const [mode, setMode] = useState('stopwatch') // 'timer' | 'stopwatch'
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const [inputMin, setInputMin] = useState(1)

  const intervalRef = useRef(null)

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (mode === 'timer') {
          if (s <= 1) {
            clearInterval(intervalRef.current)
            setRunning(false)
            try { new AudioContext() } catch {}
            return 0
          }
          return s - 1
        } else {
          return s + 1
        }
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [running, mode])

  const start = () => {
    if (mode === 'timer' && seconds === 0) return
    setRunning(true)
  }
  const stop = () => setRunning(false)
  const reset = () => { setRunning(false); setSeconds(0) }
  const setTimer = () => { setSeconds(Math.max(0, Math.floor(Number(inputMin) * 60))) }

  const fmt = (s) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    return [h, m, sec].map(n => String(n).padStart(2,'0')).join(':')
  }

  return (
    <div className="h-full p-6 text-white overflow-auto">
      <div className="max-w-lg mx-auto bg-gray-900 rounded-xl border border-white/10 p-4">
        <h2 className="text-xl font-semibold mb-3">Timer / Stopwatch</h2>

        <div className="flex gap-2 mb-4">
          <button onClick={()=>{setMode('stopwatch'); reset()}} className={`px-3 py-2 rounded-lg border ${mode==='stopwatch'?'bg-indigo-600 border-indigo-500':'bg-gray-800 border-white/10'}`}>Stopwatch</button>
          <button onClick={()=>{setMode('timer'); reset()}} className={`px-3 py-2 rounded-lg border ${mode==='timer'?'bg-indigo-600 border-indigo-500':'bg-gray-800 border-white/10'}`}>Timer</button>
        </div>

        <div className="text-4xl font-mono text-center mb-4">{fmt(seconds)}</div>

        {mode === 'timer' && (
          <div className="flex items-center gap-2 mb-4">
            <label className="text-sm">Minutes:</label>
            <input type="number" min={0} value={inputMin} onChange={(e)=>setInputMin(e.target.value)} className="w-24 bg-black/40 border border-white/10 rounded p-2" />
            <button onClick={setTimer} className="px-3 py-2 rounded-lg bg-gray-800 border border-white/10">Set</button>
          </div>
        )}

        <div className="flex gap-2">
          {!running ? (
            <button onClick={start} className="px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700">Start</button>
          ) : (
            <button onClick={stop} className="px-3 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700">Pause</button>
          )}
          <button onClick={reset} className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700">Reset</button>
        </div>
      </div>
    </div>
  )
}

