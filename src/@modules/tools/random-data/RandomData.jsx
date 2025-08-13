import React, { useMemo, useState } from 'react'

const names = ['Alice','Bob','Carol','Dave','Eve','Frank','Grace','Heidi']
const domains = ['example.com','mail.com','test.org']

function rand(n){ return Math.floor(Math.random()*n) }
function sample(arr){ return arr[rand(arr.length)] }
function uuidv4(){ return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r=(Math.random()*16)|0, v=c==='x'?r:(r&0x3)|0x8; return v.toString(16) }) }

export default function RandomData(){
  const [count,setCount]=useState(5)
  const [include,setInclude]=useState({ names:true, emails:true, uuids:true })

  const data = useMemo(() => {
    const rows = []
    for(let i=0;i<Math.max(0,Math.min(1000,Number(count)||0));i++){
      const row = {}
      if (include.names) row.name = sample(names)
      if (include.emails) row.email = `${sample(names).toLowerCase()}@${sample(domains)}`
      if (include.uuids) row.uuid = uuidv4()
      rows.push(row)
    }
    return rows
  }, [count, include])

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl space-y-3">
          <h2 className="text-xl font-semibold">Random Data Generator</h2>
          <label className="text-sm text-muted">Count
            <input type="number" min={0} max={1000} value={count} onChange={(e)=>setCount(e.target.value)} className="w-full bg-surface panel-border rounded p-2" />
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-muted">
              <input type="checkbox" checked={include.names} onChange={(e)=>setInclude(p=>({...p, names:e.target.checked}))} /> Names
            </label>
            <label className="flex items-center gap-2 text-sm text-muted">
              <input type="checkbox" checked={include.emails} onChange={(e)=>setInclude(p=>({...p, emails:e.target.checked}))} /> Emails
            </label>
            <label className="flex items-center gap-2 text-sm text-muted">
              <input type="checkbox" checked={include.uuids} onChange={(e)=>setInclude(p=>({...p, uuids:e.target.checked}))} /> UUIDs
            </label>
          </div>
        </div>
        <div className="panel panel-border p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">JSON</h3>
            <button className="px-3 py-1 rounded bg-surface panel-border" onClick={() => navigator.clipboard.writeText(JSON.stringify(data, null, 2))}>Copy</button>
          </div>
          <pre className="bg-surface panel-border rounded p-3 text-sm overflow-auto">{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}

