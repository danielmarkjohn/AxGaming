import React, { useState } from 'react'

// Minimal ULID: Crockford base32 + time + randomness
const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
function encodeTime(t, len=10){ let out=''; for(let i=len-1;i>=0;i--){ out = ENCODING[(t % 32)] + out; t = Math.floor(t/32)} return out }
function encodeRandom(len){ let out=''; for(let i=0;i<len;i++){ out += ENCODING[Math.floor(Math.random()*32)] } return out }
function ulid(){ const t = Date.now(); return encodeTime(t) + encodeRandom(16) }

export default function UlidGenerator(){
  const [value,setValue]=useState(ulid())
  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl text-center space-y-3">
          <h2 className="text-xl font-semibold">ULID Generator</h2>
          <div className="bg-surface panel-border rounded p-3 font-mono text-lg">
            {value}
          </div>
          <div className="flex gap-2 justify-center">
            <button className="px-3 py-2 rounded bg-surface panel-border" onClick={()=>setValue(ulid())}>Generate</button>
            <button className="px-3 py-2 rounded bg-surface panel-border" onClick={()=>navigator.clipboard.writeText(value)}>Copy</button>
          </div>
        </div>
      </div>
    </div>
  )
}

