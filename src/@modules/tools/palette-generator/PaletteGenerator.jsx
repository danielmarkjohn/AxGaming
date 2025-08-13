import React, { useMemo, useState } from 'react'

function clamp(n,min,max){return Math.max(min,Math.min(max,n))}
function hexToRgb(h){
  h=h.replace('#','')
  if(h.length===3)h=h.split('').map(c=>c+c).join('')
  const r=parseInt(h.slice(0,2),16),g=parseInt(h.slice(2,4),16),b=parseInt(h.slice(4,6),16)
  return {r,g,b}
}
function rgbToHex({r,g,b}){return '#'+[r,g,b].map(x=>x.toString(16).padStart(2,'0')).join('')}
function adjust({r,g,b},p){ // p -1..+1
  return {r: clamp(Math.round(r*(1+p)),0,255), g: clamp(Math.round(g*(1+p)),0,255), b: clamp(Math.round(b*(1+p)),0,255)}
}

export default function PaletteGenerator(){
  const [seed,setSeed]=useState('#7c3aed')
  const rgb=useMemo(()=>hexToRgb(seed),[seed])
  const shades=useMemo(()=>[-0.6,-0.4,-0.2,0,0.2,0.4,0.6].map(p=>rgbToHex(adjust(rgb,p))),[rgb])

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">Color Palette Generator</h2>
          <input value={seed} onChange={(e)=>setSeed(e.target.value)} className="w-full bg-surface panel-border rounded p-3 font-mono" />
        </div>
        <div className="panel panel-border p-4 rounded-xl grid grid-cols-3 gap-3">
          {shades.map((c,i)=> (
            <div key={i} className="rounded panel-border h-16 flex items-center justify-center" style={{background:c}}>
              <span className="text-xs bg-black/40 px-2 py-1 rounded">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

