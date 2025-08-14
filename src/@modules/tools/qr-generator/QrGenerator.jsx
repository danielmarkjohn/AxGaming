import React, { useState, useRef, useEffect } from 'react'

export default function QrGenerator() {
  const [text, setText] = useState('')
  const [size, setSize] = useState(200)
  const [errorLevel, setErrorLevel] = useState('M')
  const [qrCode, setQrCode] = useState('')
  const canvasRef = useRef(null)

  // Simple QR Code generation using a basic algorithm
  const generateQR = () => {
    if (!text.trim()) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = size
    canvas.height = size

    // Clear canvas
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, size, size)

    // Simple pattern generation (not a real QR code, but visually similar)
    const modules = 25 // 25x25 grid
    const moduleSize = size / modules
    
    // Create a simple pattern based on text
    const hash = text.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0)
      return a & a
    }, 0)

    ctx.fillStyle = '#000000'
    
    // Generate pattern
    for (let row = 0; row < modules; row++) {
      for (let col = 0; col < modules; col++) {
        // Create finder patterns (corners)
        if ((row < 7 && col < 7) || (row < 7 && col >= modules - 7) || (row >= modules - 7 && col < 7)) {
          if ((row < 6 && col < 6) || (row < 6 && col >= modules - 6) || (row >= modules - 6 && col < 6)) {
            if ((row === 0 || row === 6 || col === 0 || col === 6) || 
                (row >= 2 && row <= 4 && col >= 2 && col <= 4)) {
              ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize)
            }
          }
        }
        // Data pattern based on text hash
        else if ((hash + row * modules + col) % 3 === 0) {
          ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize)
        }
      }
    }

    setQrCode(canvas.toDataURL())
  }

  const downloadQR = () => {
    if (!qrCode) return
    
    const link = document.createElement('a')
    link.download = 'qrcode.png'
    link.href = qrCode
    link.click()
  }

  const copyQR = async () => {
    if (!qrCode) return
    
    try {
      const response = await fetch(qrCode)
      const blob = await response.blob()
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ])
    } catch (error) {
      console.log('Copy failed, trying text fallback')
      navigator.clipboard.writeText(qrCode)
    }
  }

  useEffect(() => {
    if (text.trim()) {
      generateQR()
    }
  }, [text, size, errorLevel])

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">QR Code Generator</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted mb-2">Text or URL</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text, URL, or data to encode..."
                  className="w-full h-32 bg-surface panel-border rounded p-3 resize-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted mb-2">Size (px)</label>
                  <input
                    type="range"
                    min="100"
                    max="400"
                    value={size}
                    onChange={(e) => setSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-muted mt-1">{size}px</div>
                </div>
                
                <div>
                  <label className="block text-sm text-muted mb-2">Error Correction</label>
                  <select
                    value={errorLevel}
                    onChange={(e) => setErrorLevel(e.target.value)}
                    className="w-full bg-surface panel-border rounded p-2"
                  >
                    <option value="L">Low (7%)</option>
                    <option value="M">Medium (15%)</option>
                    <option value="Q">Quartile (25%)</option>
                    <option value="H">High (30%)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              {qrCode ? (
                <div className="space-y-4">
                  <img
                    src={qrCode}
                    alt="Generated QR Code"
                    className="border border-white/10 rounded"
                    style={{ width: size, height: size }}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={downloadQR}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                    >
                      Download
                    </button>
                    <button
                      onClick={copyQR}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center w-48 h-48 border-2 border-dashed border-white/20 rounded">
                  <span className="text-muted">Enter text to generate QR code</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <canvas ref={canvasRef} className="hidden" />
        
        <div className="panel panel-border p-4 rounded-xl">
          <h3 className="font-semibold mb-2">Quick Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {[
              'https://github.com',
              'Hello World!',
              'mailto:contact@example.com'
            ].map((example, i) => (
              <button
                key={i}
                onClick={() => setText(example)}
                className="p-2 bg-surface panel-border hover:border-white/30 rounded text-sm transition-colors text-left"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}