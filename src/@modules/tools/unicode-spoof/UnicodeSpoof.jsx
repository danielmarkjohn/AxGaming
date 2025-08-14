import React, { useState, useMemo } from 'react'
import { Copy, RefreshCw } from 'lucide-react'

export default function UnicodeSpoof() {
  const [input, setInput] = useState('Hello World')
  const [spoofLevel, setSpoofLevel] = useState('medium')

  // Unicode look-alike mappings
  const spoofMaps = {
    light: {
      'a': 'а', 'e': 'е', 'o': 'о', 'p': 'р', 'c': 'с', 'x': 'х', 'y': 'у',
      'A': 'А', 'B': 'В', 'C': 'С', 'E': 'Е', 'H': 'Н', 'K': 'К', 'M': 'М',
      'O': 'О', 'P': 'Р', 'T': 'Т', 'X': 'Х', 'Y': 'У'
    },
    medium: {
      'a': ['а', 'ɑ', 'α'], 'e': ['е', 'ε', 'ҽ'], 'o': ['о', 'ο', 'օ'], 
      'i': ['і', 'ι', 'ɨ'], 'u': ['υ', 'ս', 'ᴜ'], 'n': ['ո', 'η', 'ռ'],
      's': ['ѕ', 'ʂ', 'ꜱ'], 'r': ['г', 'ρ', 'ʀ'], 'l': ['ӏ', 'ι', 'ɭ'],
      'A': ['А', 'Α', 'Ꭺ'], 'B': ['В', 'Β', 'ᗷ'], 'C': ['С', 'Ϲ', 'ᑕ'],
      'E': ['Е', 'Ε', 'ᗴ'], 'H': ['Н', 'Η', 'ᕼ'], 'I': ['І', 'Ι', 'Ꮖ'],
      'O': ['О', 'Ο', 'ᗝ'], 'P': ['Р', 'Ρ', 'ᑭ'], 'S': ['Ѕ', 'Σ', 'ᔕ'],
      'T': ['Т', 'Τ', 'Ꭲ'], 'X': ['Х', 'Χ', '᙭'], 'Y': ['У', 'Υ', 'Ꭹ']
    },
    heavy: {
      'a': ['а', 'ɑ', 'α', 'ａ', 'ⱥ'], 'e': ['е', 'ε', 'ҽ', 'ｅ', 'ɇ'],
      'o': ['о', 'ο', 'օ', 'ｏ', 'ø'], 'i': ['і', 'ι', 'ɨ', 'ｉ', 'ɪ'],
      'u': ['υ', 'ս', 'ᴜ', 'ｕ', 'ʉ'], 'n': ['ո', 'η', 'ռ', 'ｎ', 'ɳ'],
      's': ['ѕ', 'ʂ', 'ꜱ', 'ｓ', 'ş'], 'r': ['г', 'ρ', 'ʀ', 'ｒ', 'ɾ'],
      'l': ['ӏ', 'ι', 'ɭ', 'ｌ', 'ł'], 't': ['т', 'τ', 'ţ', 'ｔ', 'ť'],
      'A': ['А', 'Α', 'Ꭺ', 'Ａ', 'Ⱥ'], 'B': ['В', 'Β', 'ᗷ', 'Ｂ', 'ß'],
      'C': ['С', 'Ϲ', 'ᑕ', 'Ｃ', 'Ç'], 'E': ['Е', 'Ε', 'ᗴ', 'Ｅ', 'Ɇ'],
      'H': ['Н', 'Η', 'ᕼ', 'Ｈ', 'Ħ'], 'I': ['І', 'Ι', 'Ꮖ', 'Ｉ', 'Ɨ'],
      'O': ['О', 'Ο', 'ᗝ', 'Ｏ', 'Ø'], 'P': ['Р', 'Ρ', 'ᑭ', 'Ｐ', 'Þ'],
      'S': ['Ѕ', 'Σ', 'ᔕ', 'Ｓ', 'Ş'], 'T': ['Т', 'Τ', 'Ꭲ', 'Ｔ', 'Ŧ']
    }
  }

  const spoofedText = useMemo(() => {
    const map = spoofMaps[spoofLevel]
    return input.split('').map(char => {
      const replacement = map[char]
      if (Array.isArray(replacement)) {
        return replacement[Math.floor(Math.random() * replacement.length)]
      }
      return replacement || char
    }).join('')
  }, [input, spoofLevel])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(spoofedText)
  }

  const regenerate = () => {
    // Force re-render by changing a dependency
    setSpoofLevel(spoofLevel)
  }

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Unicode Text Spoof</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-2">Spoof Level</label>
              <div className="flex gap-2">
                {[
                  { key: 'light', label: 'Light (Cyrillic)' },
                  { key: 'medium', label: 'Medium (Mixed)' },
                  { key: 'heavy', label: 'Heavy (All Unicode)' }
                ].map(option => (
                  <button
                    key={option.key}
                    onClick={() => setSpoofLevel(option.key)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      spoofLevel === option.key 
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
              <label className="block text-sm text-muted mb-2">Original Text</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-32 bg-surface panel-border rounded p-3 resize-none"
                placeholder="Enter text to spoof..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-muted">Spoofed Text</label>
                <div className="flex gap-2">
                  <button
                    onClick={regenerate}
                    className="flex items-center gap-1 px-2 py-1 bg-surface panel-border hover:border-white/30 rounded text-sm transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Regenerate
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1 px-2 py-1 bg-surface panel-border hover:border-white/30 rounded text-sm transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                </div>
              </div>
              <textarea
                value={spoofedText}
                readOnly
                className="w-full h-32 bg-surface panel-border rounded p-3 resize-none font-mono"
              />
            </div>

            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-yellow-400 text-sm">
                <strong>Warning:</strong> Spoofed text can be used maliciously for phishing or impersonation. 
                Use responsibly and only for legitimate purposes like testing security systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}