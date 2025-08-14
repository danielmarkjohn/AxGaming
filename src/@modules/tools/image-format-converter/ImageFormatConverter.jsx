import React, { useState, useRef } from 'react'

export default function ImageFormatConverter() {
  const [originalImage, setOriginalImage] = useState(null)
  const [convertedImage, setConvertedImage] = useState(null)
  const [outputFormat, setOutputFormat] = useState('png')
  const [quality, setQuality] = useState(0.9)
  const [isConverting, setIsConverting] = useState(false)
  const canvasRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setOriginalImage({
        src: event.target.result,
        name: file.name,
        size: file.size,
        type: file.type
      })
      setConvertedImage(null)
    }
    reader.readAsDataURL(file)
  }

  const convertImage = () => {
    if (!originalImage) return
    
    setIsConverting(true)
    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      
      const mimeType = `image/${outputFormat}`
      const dataUrl = canvas.toDataURL(mimeType, quality)
      
      // Calculate approximate size
      const base64Length = dataUrl.split(',')[1].length
      const sizeInBytes = (base64Length * 3) / 4
      
      setConvertedImage({
        src: dataUrl,
        type: mimeType,
        size: sizeInBytes
      })
      setIsConverting(false)
    }
    img.src = originalImage.src
  }

  const downloadImage = () => {
    if (!convertedImage) return
    
    const link = document.createElement('a')
    link.download = `converted.${outputFormat}`
    link.href = convertedImage.src
    link.click()
  }

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">Image Format Converter</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-2">Select Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full"
              />
            </div>

            {originalImage && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted mb-2">Output Format</label>
                  <select
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    className="w-full bg-surface panel-border rounded p-2"
                  >
                    <option value="png">PNG</option>
                    <option value="jpeg">JPEG</option>
                    <option value="webp">WebP</option>
                  </select>
                </div>

                {(outputFormat === 'jpeg' || outputFormat === 'webp') && (
                  <div>
                    <label className="block text-sm text-muted mb-2">
                      Quality: {Math.round(quality * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.1"
                      value={quality}
                      onChange={(e) => setQuality(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                )}
              </div>
            )}

            {originalImage && (
              <button
                onClick={convertImage}
                disabled={isConverting}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded transition-colors"
              >
                {isConverting ? 'Converting...' : 'Convert Image'}
              </button>
            )}
          </div>
        </div>

        {originalImage && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="panel panel-border p-4 rounded-xl">
              <h3 className="font-semibold mb-2">Original</h3>
              <img
                src={originalImage.src}
                alt="Original"
                className="w-full h-48 object-contain bg-black/20 rounded mb-2"
              />
              <div className="text-sm text-muted space-y-1">
                <div>Type: {originalImage.type}</div>
                <div>Size: {formatBytes(originalImage.size)}</div>
              </div>
            </div>

            {convertedImage && (
              <div className="panel panel-border p-4 rounded-xl">
                <h3 className="font-semibold mb-2">Converted</h3>
                <img
                  src={convertedImage.src}
                  alt="Converted"
                  className="w-full h-48 object-contain bg-black/20 rounded mb-2"
                />
                <div className="text-sm text-muted space-y-1 mb-3">
                  <div>Type: {convertedImage.type}</div>
                  <div>Size: {formatBytes(convertedImage.size)}</div>
                </div>
                <button
                  onClick={downloadImage}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors"
                >
                  Download
                </button>
              </div>
            )}
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  )
}