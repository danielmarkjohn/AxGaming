import React, { useState, useMemo } from 'react'
import { Copy, Zap } from 'lucide-react'

export default function ZalgoGenerator() {
  const [input, setInput] = useState('Hello World')
  const [intensity, setIntensity] = useState(5)
  const [upChars, setUpChars] = useState(true)
  const [midChars, setMidChars] = useState(true)
  const [downChars, setDownChars] = useState(true)

  // Zalgo combining characters
  const zalgoChars = {
    up: [
      '\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310', '\u0352', '\u0357',
      '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343', '\u0344', '\u034a', '\u034b', '\u034c',
      '\u0303', '\u0302', '\u030c', '\u0350', '\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313',
      '\u0314', '\u033d', '\u0309', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369',
      '\u036a', '\u036b', '\u036c', '\u036d', '\u036e', '\u036f', '\u033e', '\u035b', '\u0346', '\u031a'
    ],
    mid: [
      '\u0315', '\u031b', '\u0340', '\u0341', '\u0358', '\u0321', '\u0322', '\u0327', '\u0328', '\u0334',
      '\u0335', '\u0336', '\u034f', '\u035c', '\u035d', '\u035e', '\u035f', '\u0360', '\u0362', '\u0338',
      '\u0337', '\u0361', '\u0489'
    ],
    down: [
      '\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e', '\u031f', '\u0320', '\u0324',
      '\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c', '\u032d', '\u032e', '\u032f', '\u0330',
      '\u0331', '\u0332', '\u0333', '\u0339', '\u033a', '\u033b', '\u033c', '\u0345', '\u0347', '\u0348',
      '\u0349', '\u034d', '\u034e', '\u0353', '\u0354', '\u0355', '\u0356', '\u0359', '\u035a', '\u0323'
    ]
  }

  const zalgoText = useMemo(() => {
    if (!input) return ''

    return input.split('').map(char => {
      if (char === ' ' || char === '\n') return char
      
      let result = char
      const numDiacritics = Math.floor(Math.random() * intensity) + 1

      for (let i = 0; i < numDiacritics; i++) {
        const categories = []
        if (upChars) categories.push('up')
        if (midChars) categories.push('mid')
        if (downChars) categories.push('down')
        
        if (categories.length === 0) break

        const category = categories[Math.floor(Math.random() * categories.length)]
        const chars = zalgoChars[category]
        const randomChar = chars[Math.floor(Math.random() * chars.length)]
        result += randomChar
      }

      return result
    }).join('')
  }, [input, intensity, upChars, midChars, downChars])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(zalgoText)
  }

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-red-400" />
            Zalgo Text Generator
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-2">
                Intensity: {intensity}
              </label>
              <input
                type="range"
                min="1"
                max="15"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted mt-1">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Chaotic</span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted mb-2">Diacritic Types</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={upChars}
                    onChange={(e) => setUpChars(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Above (◌̂)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={midChars}
                    onChange={(e) => setMidChars(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Through (◌̶)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={downChars}
                    onChange={(e) => setDownChars(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Below (◌̰)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted mb-2">Normal Text</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-24 bg-surface panel-border rounded p-3 resize-none"
                placeholder="Enter text to zalgo-fy..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-muted">Z̴̰̈a̸̰̾l̶̰̈g̸̰̾ö̴̰ ̶̰̈T̸̰̾ḛ̴̈x̶̰̾ẗ̸̰</label>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 px-2 py-1 bg-surface panel-border hover:border-white/30 rounded text-sm transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
              </div>
              <div className="bg-surface panel-border rounded p-3 min-h-24 font-mono text-lg leading-relaxed overflow-auto">
                {zalgoText || 'Zalgo text will appear here...'}
              </div>
            </div>

            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">
                <strong>Warning:</strong> Zalgo text can cause display issues on some systems and may be 
                considered spam on many platforms. Use with caution and respect community guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}