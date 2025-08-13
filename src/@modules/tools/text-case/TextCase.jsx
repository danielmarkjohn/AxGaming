import React, { useMemo, useState } from 'react'

function toTitleCase(s){return s.replace(/\w\S*/g, t => t[0].toUpperCase()+t.slice(1).toLowerCase())}
function toCamel(s){return s.toLowerCase().replace(/[-_\s]+(.)?/g, (_,c)=>c?c.toUpperCase():'')}
function toPascal(s){const c=toCamel(s);return c?c[0].toUpperCase()+c.slice(1):c}
function toSnake(s){return s.replace(/([a-z])([A-Z])/g,'$1_$2').replace(/[-\s]+/g,'_').toLowerCase()}
function toKebab(s){return s.replace(/([a-z])([A-Z])/g,'$1-$2').replace(/[\s_]+/g,'-').toLowerCase()}

export default function TextCase(){
  const [input,setInput]=useState('hello world example')
  const out=useMemo(()=>({
    camel: toCamel(input),
    pascal: toPascal(input),
    snake: toSnake(input),
    kebab: toKebab(input),
    title: toTitleCase(input),
    upper: input.toUpperCase(),
    lower: input.toLowerCase()
  }),[input])
  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">Text Case Converter</h2>
          <input value={input} onChange={(e)=>setInput(e.target.value)} className="w-full bg-surface panel-border rounded p-3 font-mono" />
        </div>
        <div className="panel panel-border p-4 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(out).map(([k,v])=> (
            <div key={k} className="bg-surface panel-border rounded p-3">
              <div className="text-xs text-muted mb-1">{k}</div>
              <div className="font-mono break-all">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

