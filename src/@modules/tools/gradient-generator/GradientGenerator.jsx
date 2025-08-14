import React, { useState, useEffect } from 'react'

export default function GradientGenerator() {
  const [gradient, setGradient] = useState({
    type: 'linear',
    direction: 'to right',
    colors: [
      { color: '#3b82f6', position: 0 },
      { color: '#8b5cf6', position: 100 }
    ]
  })
  const [cssOutput, setCssOutput] = useState('')

  const directions = [
    { value: 'to right', label: 'To Right →' },
    { value: 'to left', label: 'To Left ←' },
    { value: 'to bottom', label: 'To Bottom ↓' },
    { value: 'to top', label: 'To Top ↑' },
    { value: 'to bottom right', label: 'To Bottom Right ↘' },
    { value: 'to bottom left', label: 'To Bottom Left ↙' },
    { value: 'to top right', label: 'To Top Right ↗' },
    { value: 'to top left', label: 'To Top Left ↖' }
  ]

  const presets = [
    { name: 'Ocean Blue', colors: [{ color: '#006994', position: 0 }, { color: '#0099cc', position: 100 }] },
    { name: 'Sunset', colors: [{ color: '#ff7e5f', position: 0 }, { color: '#feb47b', position: 100 }] },
    { name: 'Purple Rain', colors: [{ color: '#667eea', position: 0 }, { color: '#764ba2', position: 100 }] },
    { name: 'Green Tea', colors: [{ color: '#00b09b', position: 0 }, { color: '#96c93d', position: 100 }] },
    { name: 'Fire', colors: [{ color: '#ff416c', position: 0 }, { color: '#ff4b2b', position: 100 }] },
    { name: 'Cool Sky', colors: [{ color: '#2196f3', position: 0 }, { color: '#21cbf3', position: 100 }] }
  ]

  const generateCSS = () => {
    const colorStops = gradient.colors
      .sort((a, b) => a.position - b.position)
      .map(c => `${c.color} ${c.position}%`)
      .join(', ')

    let css = ''
    if (gradient.type === 'linear') {
      css = `background: linear-gradient(${gradient.direction}, ${colorStops});`
    } else {
      css = `background: radial-gradient(circle, ${colorStops});`
    }
    
    setCssOutput(css)
  }

  const addColor = () => {
    const newPosition = gradient.colors.length > 0 
      ? Math.max(...gradient.colors.map(c => c.position)) + 10
      : 50
    
    setGradient(prev => ({
      ...prev,
      colors: [...prev.colors, { color: '#ffffff', position: Math.min(newPosition, 100) }]
    }))
  }

  const removeColor = (index) => {
    if (gradient.colors.length <= 2) return
    setGradient(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }))
  }

  const updateColor = (index, field, value) => {
    setGradient(prev => ({
      ...prev,
      colors: prev.colors.map((color, i) => 
        i === index ? { ...color, [field]: value } : color
      )
    }))
  }

  const applyPreset = (preset) => {
    setGradient(prev => ({
      ...prev,
      colors: preset.colors.map(c => ({ ...c }))
    }))
  }

  const copyCSS = () => {
    navigator.clipboard.writeText(cssOutput)
  }

  const getGradientStyle = () => {
    const colorStops = gradient.colors
      .sort((a, b) => a.position - b.position)
      .map(c => `${c.color} ${c.position}%`)
      .join(', ')

    if (gradient.type === 'linear') {
      return { background: `linear-gradient(${gradient.direction}, ${colorStops})` }
    } else {
      return { background: `radial-gradient(circle, ${colorStops})` }
    }
  }

  useEffect(() => {
    generateCSS()
  }, [gradient])

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">CSS Gradient Generator</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted mb-2">Type</label>
                  <select
                    value={gradient.type}
                    onChange={(e) => setGradient(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full bg-surface panel-border rounded p-2"
                  >
                    <option value="linear">Linear</option>
                    <option value="radial">Radial</option>
                  </select>
                </div>
                
                {gradient.type === 'linear' && (
                  <div>
                    <label className="block text-sm text-muted mb-2">Direction</label>
                    <select
                      value={gradient.direction}
                      onChange={(e) => setGradient(prev => ({ ...prev, direction: e.target.value }))}
                      className="w-full bg-surface panel-border rounded p-2"
                    >
                      {directions.map(dir => (
                        <option key={dir.value} value={dir.value}>
                          {dir.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-muted">Colors</label>
                  <button
                    onClick={addColor}
                    className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition-colors"
                  >
                    Add Color
                  </button>
                </div>
                
                <div className="space-y-2">
                  {gradient.colors.map((color, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="color"
                        value={color.color}
                        onChange={(e) => updateColor(index, 'color', e.target.value)}
                        className="w-12 h-8 rounded border-0 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={color.color}
                        onChange={(e) => updateColor(index, 'color', e.target.value)}
                        className="flex-1 bg-surface panel-border rounded p-1 text-sm font-mono"
                      />
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={color.position}
                        onChange={(e) => updateColor(index, 'position', parseInt(e.target.value))}
                        className="w-16 bg-surface panel-border rounded p-1 text-sm"
                      />
                      <span className="text-xs text-muted">%</span>
                      {gradient.colors.length > 2 && (
                        <button
                          onClick={() => removeColor(index)}
                          className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs transition-colors"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted mb-2">Presets</label>
                <div className="grid grid-cols-2 gap-2">
                  {presets.map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => applyPreset(preset)}
                      className="p-2 bg-surface panel-border hover:border-white/30 rounded text-sm transition-colors text-left"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted mb-2">Preview</label>
                <div
                  className="w-full h-48 rounded-lg border border-white/10"
                  style={getGradientStyle()}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-muted">CSS Code</label>
                  <button
                    onClick={copyCSS}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors"
                  >
                    Copy CSS
                  </button>
                </div>
                <textarea
                  value={cssOutput}
                  readOnly
                  className="w-full h-24 bg-surface panel-border rounded p-3 font-mono text-sm resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="panel panel-border p-4 rounded-xl">
          <h3 className="font-semibold mb-2">Usage Tips</h3>
          <ul className="text-sm text-muted space-y-1">
            <li>• Use 2-3 colors for clean, professional gradients</li>
            <li>• Adjust color positions to control the transition points</li>
            <li>• Linear gradients work well for backgrounds and buttons</li>
            <li>• Radial gradients are great for spotlight effects</li>
            <li>• Copy the CSS and paste it into your stylesheet</li>
          </ul>
        </div>
      </div>
    </div>
  )
}