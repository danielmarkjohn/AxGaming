import React, { useRef, useState } from 'react'

export default function ImageResizer() {
  const [srcName, setSrcName] = useState('')
  const [width, setWidth] = useState(400)
  const [height, setHeight] = useState(300)
  const [keepAspect, setKeepAspect] = useState(true)
  const [format, setFormat] = useState('image/png')
  const [output, setOutput] = useState('')

  const imgRef = useRef(null)
  const canvasRef = useRef(null)

  const onFile = (file) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        imgRef.current = img
        setSrcName(file.name)
        if (keepAspect) {
          const ratio = img.width / img.height
          const newHeight = Math.round(width / ratio)
          setHeight(newHeight)
        }
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  const resize = () => {
    const img = imgRef.current
    const canvas = canvasRef.current || document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, 0, 0, width, height)
    setOutput(canvas.toDataURL(format))
    canvasRef.current = canvas
  }

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl space-y-3">
          <h2 className="text-xl font-semibold">Image Resizer</h2>
          <input type="file" accept="image/*" onChange={(e)=> e.target.files && onFile(e.target.files[0])} />
          {srcName && <div className="text-sm text-muted">{srcName}</div>}
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm text-muted">Width
              <input type="number" value={width} onChange={(e)=>setWidth(Number(e.target.value))} className="w-full bg-surface panel-border rounded p-2" />
            </label>
            <label className="text-sm text-muted">Height
              <input type="number" value={height} onChange={(e)=>setHeight(Number(e.target.value))} className="w-full bg-surface panel-border rounded p-2" />
            </label>
          </div>
          <label className="text-sm text-muted flex items-center gap-2">
            <input type="checkbox" checked={keepAspect} onChange={(e)=>setKeepAspect(e.target.checked)} /> Keep aspect ratio (set by width)
          </label>
          <label className="text-sm text-muted">Format
            <select value={format} onChange={(e)=>setFormat(e.target.value)} className="w-full bg-surface panel-border rounded p-2">
              <option value="image/png">PNG</option>
              <option value="image/jpeg">JPEG</option>
              <option value="image/webp">WebP (browser support varies)</option>
            </select>
          </label>
          <button onClick={resize} disabled={!imgRef.current} className="px-4 py-2 rounded bg-surface panel-border">Resize</button>
        </div>
        {output && (
          <div className="panel panel-border p-4 rounded-xl space-y-3">
            <h3 className="font-semibold">Output</h3>
            <img src={output} alt="resized" className="max-w-full rounded" />
            <button className="px-3 py-1 rounded bg-surface panel-border" onClick={() => navigator.clipboard.writeText(output)}>Copy Base64</button>
          </div>
        )}
      </div>
    </div>
  )
}

