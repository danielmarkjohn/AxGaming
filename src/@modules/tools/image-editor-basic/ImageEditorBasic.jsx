import React, { useState, useRef, useEffect } from 'react'
import { Upload, Download, RotateCw, RotateCcw, FlipHorizontal, FlipVertical, Crop } from 'lucide-react'

export default function ImageEditorBasic() {
  const [image, setImage] = useState(null)
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
    blur: 0,
    sepia: 0,
    grayscale: 0
  })
  const [transform, setTransform] = useState({
    rotation: 0,
    scaleX: 1,
    scaleY: 1
  })
  const [cropMode, setCropMode] = useState(false)
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const canvasRef = useRef(null)
  const imageRef = useRef(null)
  const fileInputRef = useRef(null)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file || !file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        setImage({
          element: img,
          name: file.name,
          originalWidth: img.width,
          originalHeight: img.height
        })
        drawImage(img)
      }
      img.src = event.target.result
    }
    reader.readAsDataURL(file)
  }

  const drawImage = (img = image?.element) => {
    if (!img || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    canvas.width = img.width
    canvas.height = img.height

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Apply transformations
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate((transform.rotation * Math.PI) / 180)
    ctx.scale(transform.scaleX, transform.scaleY)
    ctx.translate(-canvas.width / 2, -canvas.height / 2)

    // Apply filters
    const filterString = `
      brightness(${filters.brightness}%)
      contrast(${filters.contrast}%)
      saturate(${filters.saturation}%)
      hue-rotate(${filters.hue}deg)
      blur(${filters.blur}px)
      sepia(${filters.sepia}%)
      grayscale(${filters.grayscale}%)
    `
    ctx.filter = filterString

    // Draw image
    ctx.drawImage(img, 0, 0)
    ctx.restore()
  }

  const updateFilter = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }))
  }

  const rotate = (degrees) => {
    setTransform(prev => ({ ...prev, rotation: prev.rotation + degrees }))
  }

  const flip = (axis) => {
    if (axis === 'horizontal') {
      setTransform(prev => ({ ...prev, scaleX: prev.scaleX * -1 }))
    } else {
      setTransform(prev => ({ ...prev, scaleY: prev.scaleY * -1 }))
    }
  }

  const resetFilters = () => {
    setFilters({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      hue: 0,
      blur: 0,
      sepia: 0,
      grayscale: 0
    })
    setTransform({
      rotation: 0,
      scaleX: 1,
      scaleY: 1
    })
  }

  const downloadImage = () => {
    if (!canvasRef.current) return

    const link = document.createElement('a')
    link.download = `edited_${image?.name || 'image.png'}`
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  const applyPreset = (preset) => {
    switch (preset) {
      case 'vintage':
        setFilters({
          ...filters,
          sepia: 30,
          contrast: 110,
          brightness: 90,
          saturation: 80
        })
        break
      case 'bw':
        setFilters({ ...filters, grayscale: 100 })
        break
      case 'warm':
        setFilters({
          ...filters,
          hue: 10,
          saturation: 120,
          brightness: 105
        })
        break
      case 'cool':
        setFilters({
          ...filters,
          hue: -10,
          saturation: 110,
          brightness: 95
        })
        break
    }
  }

  useEffect(() => {
    if (image) {
      drawImage()
    }
  }, [filters, transform, image])

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Basic Image Editor</h2>
            <div className="flex gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
              >
                <Upload size={16} />
                Upload Image
              </button>
              {image && (
                <button
                  onClick={downloadImage}
                  className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
                >
                  <Download size={16} />
                  Download
                </button>
              )}
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {image && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Canvas */}
            <div className="lg:col-span-2 panel panel-border p-4 rounded-xl">
              <div className="flex justify-center">
                <canvas
                  ref={canvasRef}
                  className="max-w-full max-h-[500px] border border-white/10 rounded"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-4">
              {/* Transform Controls */}
              <div className="panel panel-border p-4 rounded-xl">
                <h3 className="font-medium mb-3">Transform</h3>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <button
                    onClick={() => rotate(-90)}
                    className="flex items-center justify-center gap-1 px-2 py-1 bg-surface hover:bg-white/10 rounded text-sm"
                  >
                    <RotateCcw size={14} />
                    Rotate L
                  </button>
                  <button
                    onClick={() => rotate(90)}
                    className="flex items-center justify-center gap-1 px-2 py-1 bg-surface hover:bg-white/10 rounded text-sm"
                  >
                    <RotateCw size={14} />
                    Rotate R
                  </button>
                  <button
                    onClick={() => flip('horizontal')}
                    className="flex items-center justify-center gap-1 px-2 py-1 bg-surface hover:bg-white/10 rounded text-sm"
                  >
                    <FlipHorizontal size={14} />
                    Flip H
                  </button>
                  <button
                    onClick={() => flip('vertical')}
                    className="flex items-center justify-center gap-1 px-2 py-1 bg-surface hover:bg-white/10 rounded text-sm"
                  >
                    <FlipVertical size={14} />
                    Flip V
                  </button>
                </div>
              </div>

              {/* Filter Controls */}
              <div className="panel panel-border p-4 rounded-xl">
                <h3 className="font-medium mb-3">Filters</h3>
                <div className="space-y-3">
                  {Object.entries(filters).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm mb-1 capitalize">{key}</label>
                      <input
                        type="range"
                        min={key === 'hue' ? -180 : 0}
                        max={key === 'hue' ? 180 : key === 'blur' ? 10 : 200}
                        value={value}
                        onChange={(e) => updateFilter(key, parseInt(e.target.value))}
                        className="w-full"
                      />
                      <span className="text-xs text-muted">{value}{key === 'hue' ? '°' : key === 'blur' ? 'px' : '%'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Presets */}
              <div className="panel panel-border p-4 rounded-xl">
                <h3 className="font-medium mb-3">Presets</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => applyPreset('vintage')}
                    className="px-2 py-1 bg-surface hover:bg-white/10 rounded text-sm"
                  >
                    Vintage
                  </button>
                  <button
                    onClick={() => applyPreset('bw')}
                    className="px-2 py-1 bg-surface hover:bg-white/10 rounded text-sm"
                  >
                    B&W
                  </button>
                  <button
                    onClick={() => applyPreset('warm')}
                    className="px-2 py-1 bg-surface hover:bg-white/10 rounded text-sm"
                  >
                    Warm
                  </button>
                  <button
                    onClick={() => applyPreset('cool')}
                    className="px-2 py-1 bg-surface hover:bg-white/10 rounded text-sm"
                  >
                    Cool
                  </button>
                </div>
                <button
                  onClick={resetFilters}
                  className="w-full mt-2 px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                >
                  Reset All
                </button>
              </div>
            </div>
          </div>
        )}

        {!image && (
          <div className="panel panel-border p-8 rounded-xl text-center">
            <div className="text-muted mb-4">
              <Upload size={48} className="mx-auto mb-2 opacity-50" />
              <p>Upload an image to start editing</p>
              <p className="text-sm mt-2">Supports: JPG, PNG, GIF, WebP</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}