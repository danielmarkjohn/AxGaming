import React, { useState } from 'react'

async function hmac(algo, key, msg) {
  const enc = new TextEncoder()
  const cryptoKey = await crypto.subtle.importKey('raw', enc.encode(key), { name:'HMAC', hash: { name: algo } }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(msg))
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_')
}
function b64url(str){ return btoa(str).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_') }

export default function JwtBuilder(){
  const [payload,setPayload]=useState('{"sub":"123","name":"John"}')
  const [secret,setSecret]=useState('secret')
  const [algo,setAlgo]=useState('SHA-256')
  const [token,setToken]=useState('')

  const build = async () => {
    const header = { alg: algo.replace('SHA-','HS'), typ:'JWT' }
    const p = JSON.parse(payload)
    const base = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(p))}`
    const sig = await hmac(algo, secret, base)
    setToken(`${base}.${sig}`)
  }

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl space-y-3">
          <h2 className="text-xl font-semibold">JWT Builder (HS256/384/512)</h2>
          <textarea rows={6} value={payload} onChange={(e)=>setPayload(e.target.value)} className="w-full bg-surface panel-border rounded p-3 font-mono" />
          <label className="text-sm text-muted">Secret
            <input value={secret} onChange={(e)=>setSecret(e.target.value)} className="w-full bg-surface panel-border rounded p-2" />
          </label>
          <label className="text-sm text-muted">Algorithm
            <select value={algo} onChange={(e)=>setAlgo(e.target.value)} className="w-full bg-surface panel-border rounded p-2">
              <option>SHA-256</option>
              <option>SHA-384</option>
              <option>SHA-512</option>
            </select>
          </label>
          <button onClick={build} className="px-4 py-2 rounded bg-surface panel-border">Build</button>
        </div>
        {token && (
          <div className="panel panel-border p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">JWT</h3>
              <button className="px-3 py-1 rounded bg-surface panel-border" onClick={() => navigator.clipboard.writeText(token)}>Copy</button>
            </div>
            <pre className="bg-surface panel-border rounded p-3 text-sm break-all">{token}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

