import React, { useState } from 'react'

export default function ImageToBase64() {
  const [result, setResult] = useState('')
  const [name, setName] = useState('')

  const onFile = (file) => {
    const reader = new FileReader()
    reader.onload = () => setResult(reader.result)
    reader.readAsDataURL(file)
    setName(file.name)
  }

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">Image to Base64</h2>
          <input type="file" accept="image/*" onChange={(e)=> e.target.files && onFile(e.target.files[0])} className="block w-full" />
          {name && <div className="text-sm text-muted mt-2">{name}</div>}
        </div>
        {result && (
          <div className="panel panel-border p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Base64</h3>
              <button className="px-3 py-1 rounded bg-surface panel-border" onClick={() => navigator.clipboard.writeText(result)}>Copy</button>
            </div>
            <textarea value={result} onChange={()=>{}} rows={10} className="w-full bg-surface panel-border rounded p-3 font-mono" />
          </div>
        )}
      </div>
    </div>
  )
}

