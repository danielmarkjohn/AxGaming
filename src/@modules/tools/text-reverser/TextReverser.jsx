import React, { useState, useMemo } from 'react'
import { Copy, RotateCcw } from 'lucide-react'

export default function TextReverser() {
  const [input, setInput] = useState('Hello World!')
  const [mode, setMode] = useState('letters')

  const output = useMemo(() => {
    if (!input) return ''
    
    switch (mode) {
      case 'letters':
        return input.split('').reverse().join('')
      case 'words':
        return input.split(' ').reverse().join(' ')
      case 'lines':
        return input.split('\n').reverse().join('\n')
      default:
        return input
    }
  }, [input, mode])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Text Reverser</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-2">Reverse Mode</label>
              <div className="flex gap-2">
                {[
                  { key: 'letters', label: 'Letters' },
                  { key: 'words', label: 'Words' },
                  { key: 'lines', label: 'Lines' }
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
            </div>

            <div>
              <label className="block text-sm text-muted mb-2">Input Text</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-32 bg-surface panel-border rounded p-3 resize-none"
                placeholder="Enter text to reverse..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-muted">Reversed Text</label>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 px-2 py-1 bg-surface panel-border hover:border-white/30 rounded text-sm transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
              </div>
              <textarea
                value={output}
                readOnly
                className="w-full h-32 bg-surface panel-border rounded p-3 resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}