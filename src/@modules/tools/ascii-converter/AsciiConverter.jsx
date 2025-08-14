import React, { useState, useMemo } from 'react'
import { Copy, ArrowRightLeft } from 'lucide-react'

export default function AsciiConverter() {
  const [input, setInput] = useState('Hello World!')
  const [mode, setMode] = useState('text-to-decimal')
  const [separator, setSeparator] = useState('space')

  const separators = {
    space: ' ',
    comma: ', ',
    newline: '\n',
    none: ''
  }

  const results = useMemo(() => {
    if (!input) return { output: '', chars: [] }

    try {
      if (mode === 'text-to-decimal') {
        const chars = input.split('').map(char => ({
          char,
          decimal: char.charCodeAt(0),
          hex: char.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0'),
          binary: char.charCodeAt(0).toString(2).padStart(8, '0'),
          octal: char.charCodeAt(0).toString(8)
        }))

        const decimals = chars.map(c => c.decimal)
        const output = decimals.join(separators[separator])

        return { output, chars, decimals }
      } else {
        // Convert decimal back to text
        const sep = separators[separator] || ' '
        const numbers = input.split(sep).map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n >= 0 && n <= 127)
        const text = numbers.map(n => String.fromCharCode(n)).join('')
        
        const chars = numbers.map(decimal => ({
          decimal,
          char: String.fromCharCode(decimal),
          hex: decimal.toString(16).toUpperCase().padStart(2, '0'),
          binary: decimal.toString(2).padStart(8, '0'),
          octal: decimal.toString(8)
        }))

        return { output: text, chars, decimals: numbers }
      }
    } catch (error) {
      return { error: error.message }
    }
  }, [input, mode, separator])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const swapMode = () => {
    if (mode === 'text-to-decimal' && results.output) {
      setInput(results.output)
      setMode('decimal-to-text')
    } else if (mode === 'decimal-to-text' && results.output) {
      setInput(results.output)
      setMode('text-to-decimal')
    }
  }

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">ASCII ↔ Decimal Converter</h2>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex gap-2">
                {[
                  { key: 'text-to-decimal', label: 'Text → Decimal' },
                  { key: 'decimal-to-text', label: 'Decimal → Text' }
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

              <div className="flex items-center gap-2">
                <label className="text-sm text-muted">Separator:</label>
                <select
                  value={separator}
                  onChange={(e) => setSeparator(e.target.value)}
                  className="bg-surface panel-border rounded px-2 py-1 text-sm"
                >
                  <option value="space">Space</option>
                  <option value="comma">Comma</option>
                  <option value="newline">New Line</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted mb-2">
                {mode === 'text-to-decimal' ? 'Input Text (ASCII only)' : `Decimal Numbers (${separators[separator] === '' ? 'no separator' : `separated by "${separators[separator].trim() || 'space'}"`})`}
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-24 bg-surface panel-border rounded p-3 resize-none font-mono"
                placeholder={mode === 'text-to-decimal' ? 'Enter ASCII text...' : 'Enter decimal numbers...'}
              />
            </div>

            {results.error ? (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">{results.error}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-muted">
                      {mode === 'text-to-decimal' ? 'Decimal Output' : 'Text Output'}
                    </label>
                    <button
                      onClick={() => copyToClipboard(results.output)}
                      className="flex items-center gap-1 px-2 py-1 bg-surface panel-border hover:border-white/30 rounded text-sm transition-colors"
                    >
                      <Copy className="w-3 h-3" />
                      Copy
                    </button>
                  </div>
                  <div className="bg-surface panel-border rounded p-3 font-mono text-sm min-h-16 break-all">
                    {results.output || 'Output will appear here...'}
                  </div>
                </div>

                {results.chars && results.chars.length > 0 && (
                  <div>
                    <label className="text-sm text-muted mb-2 block">Character Breakdown</label>
                    <div className="bg-surface panel-border rounded p-3 max-h-64 overflow-auto">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {results.chars.map((char, index) => (
                          <div key={index} className="bg-black/20 rounded p-2 text-xs font-mono">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-lg">{char.char === ' ' ? '␣' : char.char}</span>
                              <span className="text-muted">#{index + 1}</span>
                            </div>
                            <div className="space-y-1 text-muted">
                              <div>Dec: {char.decimal}</div>
                              <div>Hex: 0x{char.hex}</div>
                              <div>Bin: {char.binary}</div>
                              <div>Oct: {char.octal}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-blue-400 text-sm">
                <strong>Info:</strong> ASCII characters range from 0-127. This tool only works with standard ASCII characters.
                For Unicode characters, use the UTF-8 converter instead.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}