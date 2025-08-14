import React, { useState, useMemo } from 'react'
import { Copy, ArrowRightLeft } from 'lucide-react'

export default function Utf8Converter() {
  const [input, setInput] = useState('Hello 世界! 🌍')
  const [mode, setMode] = useState('text-to-encoding')

  const results = useMemo(() => {
    if (!input) return { hex: '', binary: '', bytes: [] }

    try {
      if (mode === 'text-to-encoding') {
        // Convert text to UTF-8 bytes
        const encoder = new TextEncoder()
        const bytes = encoder.encode(input)
        
        const hex = Array.from(bytes)
          .map(b => b.toString(16).padStart(2, '0').toUpperCase())
          .join(' ')
        
        const binary = Array.from(bytes)
          .map(b => b.toString(2).padStart(8, '0'))
          .join(' ')

        return {
          hex,
          binary,
          bytes: Array.from(bytes),
          byteCount: bytes.length
        }
      } else {
        // Convert hex back to text
        try {
          const hexBytes = input.replace(/[^0-9A-Fa-f]/g, '')
          if (hexBytes.length % 2 !== 0) throw new Error('Invalid hex length')
          
          const bytes = []
          for (let i = 0; i < hexBytes.length; i += 2) {
            bytes.push(parseInt(hexBytes.substr(i, 2), 16))
          }
          
          const decoder = new TextDecoder('utf-8')
          const text = decoder.decode(new Uint8Array(bytes))
          
          return {
            text,
            bytes,
            byteCount: bytes.length
          }
        } catch (error) {
          return { error: 'Invalid hex input' }
        }
      }
    } catch (error) {
      return { error: error.message }
    }
  }, [input, mode])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const swapMode = () => {
    if (mode === 'text-to-encoding' && results.hex) {
      setInput(results.hex)
      setMode('hex-to-text')
    } else if (mode === 'hex-to-text' && results.text) {
      setInput(results.text)
      setMode('text-to-encoding')
    }
  }

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">UTF-8 to Hex/Binary Converter</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {[
                  { key: 'text-to-encoding', label: 'Text → Hex/Binary' },
                  { key: 'hex-to-text', label: 'Hex → Text' }
                ].map(option => (
                  <button
                    key={option.key}
                    onClick={() => setMode(option.key)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      mode === option.key 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-surface panel-border hover:border-white/30'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              
              <button
                onClick={swapMode}
                className="flex items-center gap-1 px-2 py-1 bg-surface panel-border hover:border-white/30 rounded text-sm transition-colors"
              >
                <ArrowRightLeft className="w-3 h-3" />
                Swap
              </button>
            </div>

            <div>
              <label className="block text-sm text-muted mb-2">
                {mode === 'text-to-encoding' ? 'Input Text' : 'Hex Input (space separated)'}
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-24 bg-surface panel-border rounded p-3 resize-none font-mono"
                placeholder={mode === 'text-to-encoding' ? 'Enter text to convert...' : 'Enter hex bytes (e.g., 48 65 6C 6C 6F)...'}
              />
            </div>

            {results.error ? (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">{results.error}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {mode === 'text-to-encoding' ? (
                  <>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-muted">
                          Hexadecimal ({results.byteCount} bytes)
                        </label>
                        <button
                          onClick={() => copyToClipboard(results.hex)}
                          className="flex items-center gap-1 px-2 py-1 bg-surface panel-border hover:border-white/30 rounded text-sm transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                          Copy
                        </button>
                      </div>
                      <div className="bg-surface panel-border rounded p-3 font-mono text-sm break-all">
                        {results.hex || 'Hex output will appear here...'}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-muted">Binary</label>
                        <button
                          onClick={() => copyToClipboard(results.binary)}
                          className="flex items-center gap-1 px-2 py-1 bg-surface panel-border hover:border-white/30 rounded text-sm transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                          Copy
                        </button>
                      </div>
                      <div className="bg-surface panel-border rounded p-3 font-mono text-xs break-all max-h-32 overflow-auto">
                        {results.binary || 'Binary output will appear here...'}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-muted mb-2 block">Byte Array</label>
                      <div className="bg-surface panel-border rounded p-3 font-mono text-sm">
                        [{results.bytes.join(', ')}]
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm text-muted">
                        Decoded Text ({results.byteCount} bytes)
                      </label>
                      <button
                        onClick={() => copyToClipboard(results.text)}
                        className="flex items-center gap-1 px-2 py-1 bg-surface panel-border hover:border-white/30 rounded text-sm transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                        Copy
                      </button>
                    </div>
                    <div className="bg-surface panel-border rounded p-3 min-h-24">
                      {results.text || 'Decoded text will appear here...'}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-blue-400 text-sm">
                <strong>Info:</strong> UTF-8 is a variable-width encoding. ASCII characters use 1 byte, 
                while Unicode characters like emojis and non-Latin scripts may use 2-4 bytes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}