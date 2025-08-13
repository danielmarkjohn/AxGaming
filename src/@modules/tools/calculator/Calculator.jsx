import React, { useState } from 'react'

export default function Calculator() {
  const [expr, setExpr] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const sanitize = (s) => s.replace(/[^0-9+\-*/().%\s]/g, '')

  const compute = () => {
    setError('')
    try {
      const safe = sanitize(expr)
      // eslint-disable-next-line no-new-func
      const val = Function(`"use strict"; return (${safe || '0'})`)()
      setResult(String(val))
    } catch (e) {
      setError('Invalid expression')
    }
  }

  const append = (v) => setExpr((p) => p + v)
  const clearAll = () => { setExpr(''); setResult(''); setError('') }
  const backspace = () => setExpr((p) => p.slice(0, -1))

  const btn = (label, onClick, extra="") => (
    <button onClick={onClick} className={`px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 ${extra}`}>
      {label}
    </button>
  )

  const keys = ['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+']

  const onKey = (k) => {
    if (k === '=') return compute()
    append(k)
  }

  return (
    <div className="h-full p-6 text-white overflow-auto">
      <div className="max-w-md mx-auto bg-gray-900 rounded-xl border border-white/10 p-4">
        <h2 className="text-xl font-semibold mb-3">Calculator</h2>
        <input
          value={expr}
          onChange={(e)=>setExpr(e.target.value)}
          onKeyDown={(e)=>{ if(e.key==='Enter') compute() }}
          placeholder="Type expression, e.g. (2+3)*4/5"
          className="w-full bg-black/40 border border-white/10 rounded-lg p-3 font-mono mb-2"
        />
        <div className="flex gap-2 mb-3">
          {btn('C', clearAll)}
          {btn('⌫', backspace)}
          {btn('=', compute, 'flex-1 bg-indigo-600 hover:bg-indigo-700')}
        </div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {keys.map(k => (
            <button key={k} onClick={()=>onKey(k)} className={`py-3 rounded-lg border border-white/10 bg-gray-800 hover:bg-gray-700 ${k==='='?'col-span-1':''}`}>
              {k}
            </button>
          ))}
        </div>
        {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
        <div className="bg-black/40 border border-white/10 rounded-lg p-3 font-mono">
          <div className="text-xs text-white/60 mb-1">Result</div>
          <div className="text-lg break-all">{result}</div>
        </div>
      </div>
    </div>
  )
}

