import React, { useState, useRef } from 'react'

export default function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState('#3b82f6')
  const [imageData, setImageData] = useState(null)
  const [pickedColors, setPickedColors] = useState([])
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        canvas.width = Math.min(img.width, 400)
        canvas.height = Math.min(img.height, 300)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        setImageData(canvas.toDataURL())
      }
      img.src = event.target.result
    }
    reader.readAsDataURL(file)
  }

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const ctx = canvas.getContext('2d')
    const pixel = ctx.getImageData(x, y, 1, 1).data
    const hex = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1)}`
    setSelectedColor(hex)
    if (!pickedColors.includes(hex)) {
      setPickedColors(prev => [...prev, hex])
    }
  }

  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return { r, g, b }
  }

  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2
    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
  }

  const rgb = hexToRgb(selectedColor)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">Color Picker & Analyzer</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full h-12 rounded border-0 cursor-pointer"
              />
              <input
                type="text"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full mt-2 bg-surface panel-border rounded p-2 font-mono"
              />
            </div>
            
            <div className="space-y-2">
              <div className="bg-surface panel-border rounded p-2">
                <span className="text-muted text-sm">RGB:</span>
                <span className="ml-2 font-mono">{rgb.r}, {rgb.g}, {rgb.b}</span>
              </div>
              <div className="bg-surface panel-border rounded p-2">
                <span className="text-muted text-sm">HSL:</span>
                <span className="ml-2 font-mono">{hsl.h}°, {hsl.s}%, {hsl.l}%</span>
              </div>
            </div>
          </div>
        </div>

        {pickedColors.length > 0 && (
          <div className="panel panel-border p-4 rounded-xl">
            <h3 className="font-semibold mb-3">Picked Colors</h3>
            <div className="flex flex-wrap gap-2">
              {pickedColors.map((color, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 bg-surface panel-border rounded"
                >
                  <div
                    className="w-6 h-6 rounded border border-white/10"
                    style={{ backgroundColor: color }}
                  />
                  <span className="font-mono text-sm">{color}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}