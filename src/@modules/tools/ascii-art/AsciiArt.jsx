import React, { useState } from 'react'

export default function AsciiArt() {
  const [text, setText] = useState('HELLO')
  const [font, setFont] = useState('block')
  const [output, setOutput] = useState('')

  const fonts = {
    block: {
      A: ['  ██  ', ' ████ ', '██  ██', '██████', '██  ██', '██  ██', '      '],
      B: ['██████', '██  ██', '██████', '██████', '██  ██', '██████', '      '],
      C: [' █████', '██    ', '██    ', '██    ', '██    ', ' █████', '      '],
      D: ['██████', '██  ██', '██  ██', '██  ██', '██  ██', '██████', '      '],
      E: ['██████', '██    ', '█████ ', '█████ ', '██    ', '██████', '      '],
      F: ['██████', '██    ', '█████ ', '█████ ', '██    ', '██    ', '      '],
      G: [' █████', '██    ', '██ ███', '██  ██', '██  ██', ' █████', '      '],
      H: ['██  ██', '██  ██', '██████', '██████', '██  ██', '██  ██', '      '],
      I: ['██████', '  ██  ', '  ██  ', '  ██  ', '  ██  ', '██████', '      '],
      J: ['██████', '    ██', '    ██', '    ██', '██  ██', ' █████', '      '],
      K: ['██  ██', '██ ██ ', '████  ', '████  ', '██ ██ ', '██  ██', '      '],
      L: ['██    ', '██    ', '██    ', '██    ', '██    ', '██████', '      '],
      M: ['██  ██', '██████', '██████', '██  ██', '██  ██', '██  ██', '      '],
      N: ['██  ██', '███ ██', '██████', '██ ███', '██  ██', '██  ██', '      '],
      O: [' █████', '██  ██', '██  ██', '██  ██', '██  ██', ' █████', '      '],
      P: ['██████', '██  ██', '██████', '██    ', '██    ', '██    ', '      '],
      Q: [' █████', '██  ██', '██  ██', '██ ███', '██  ██', ' ██████', '     █'],
      R: ['██████', '██  ██', '██████', '██ ██ ', '██  ██', '██  ██', '      '],
      S: [' █████', '██    ', ' ████ ', '    ██', '    ██', '█████ ', '      '],
      T: ['██████', '  ██  ', '  ██  ', '  ██  ', '  ██  ', '  ██  ', '      '],
      U: ['██  ██', '██  ██', '██  ██', '██  ██', '██  ██', ' █████', '      '],
      V: ['██  ██', '██  ██', '██  ██', '██  ██', ' ████ ', '  ██  ', '      '],
      W: ['██  ██', '██  ██', '██  ██', '██████', '██████', '██  ██', '      '],
      X: ['██  ██', ' ████ ', '  ██  ', '  ██  ', ' ████ ', '██  ██', '      '],
      Y: ['██  ██', '██  ██', ' ████ ', '  ██  ', '  ██  ', '  ██  ', '      '],
      Z: ['██████', '    ██', '   ██ ', '  ██  ', ' ██   ', '██████', '      '],
      ' ': ['      ', '      ', '      ', '      ', '      ', '      ', '      '],
      '0': [' █████', '██  ██', '██ ███', '██████', '███ ██', '██  ██', ' █████'],
      '1': ['  ██  ', ' ███  ', '  ██  ', '  ██  ', '  ██  ', '  ██  ', '██████'],
      '2': [' █████', '██  ██', '   ██ ', '  ██  ', ' ██   ', '██    ', '██████'],
      '3': [' █████', '██  ██', '   ██ ', ' ████ ', '   ██ ', '██  ██', ' █████'],
      '4': ['██  ██', '██  ██', '██  ██', '██████', '    ██', '    ██', '    ██'],
      '5': ['██████', '██    ', '█████ ', '    ██', '    ██', '██  ██', ' █████'],
      '6': [' █████', '██    ', '██    ', '██████', '██  ██', '██  ██', ' █████'],
      '7': ['██████', '    ██', '   ██ ', '  ██  ', ' ██   ', '██    ', '██    '],
      '8': [' █████', '██  ██', '██  ██', ' █████', '██  ██', '██  ██', ' █████'],
      '9': [' █████', '██  ██', '██  ██', ' ██████', '    ██', '    ██', ' █████']
    },
    small: {
      A: ['█▀█', '█▀█', '█▄█'],
      B: ['█▀▄', '█▀▄', '█▄▀'],
      C: ['▄▀█', '█▄▄', '▀▀▀'],
      D: ['█▀▄', '█ █', '█▄▀'],
      E: ['█▀▀', '█▀▀', '▀▀▀'],
      F: ['█▀▀', '█▀▀', '█  '],
      G: ['▄▀█', '█▄█', '▀▀▀'],
      H: ['█ █', '█▀█', '█ █'],
      I: ['█', '█', '█'],
      J: ['  █', '  █', '▀▀▀'],
      K: ['█ █', '██ ', '█ █'],
      L: ['█  ', '█  ', '▀▀▀'],
      M: ['█▄█', '█▀█', '█ █'],
      N: ['█▄█', '█▀█', '█ █'],
      O: ['▄▀█', '█ █', '▀▀▀'],
      P: ['█▀▄', '█▀ ', '█  '],
      Q: ['▄▀█', '█▄█', '▀▀█'],
      R: ['█▀▄', '█▀▄', '█ █'],
      S: ['▄▀▀', '▀▀▄', '▀▀▀'],
      T: ['▀█▀', ' █ ', ' █ '],
      U: ['█ █', '█ █', '▀▀▀'],
      V: ['█ █', '█ █', ' █ '],
      W: ['█ █', '█▀█', '█▄█'],
      X: ['█ █', ' █ ', '█ █'],
      Y: ['█ █', ' █ ', ' █ '],
      Z: ['▀▀▀', ' ▄▀', '▀▀▀'],
      ' ': [' ', ' ', ' '],
      '0': ['▄▀█', '█ █', '▀▀▀'],
      '1': ['▄█ ', ' █ ', '▀▀▀'],
      '2': ['▀▀▄', '▄▀ ', '▀▀▀'],
      '3': ['▀▀▄', ' ▀▄', '▀▀▀'],
      '4': ['█ █', '▀▀█', '  █'],
      '5': ['▀▀▀', '▀▀▄', '▀▀▀'],
      '6': ['▄▀▀', '█▀▄', '▀▀▀'],
      '7': ['▀▀▀', '  █', ' █ '],
      '8': ['▄▀▄', '▄▀▄', '▀▀▀'],
      '9': ['▄▀▄', '▀▀█', '▀▀▀']
    }
  }

  const generateAscii = () => {
    const chars = text.toUpperCase().split('')
    const selectedFont = fonts[font]
    const height = selectedFont['A']?.length || 3
    
    let result = []
    for (let row = 0; row < height; row++) {
      result[row] = ''
    }
    
    chars.forEach(char => {
      const pattern = selectedFont[char] || selectedFont[' ']
      for (let row = 0; row < height; row++) {
        result[row] += (pattern[row] || ' '.repeat(6)) + ' '
      }
    })
    
    setOutput(result.join('\n'))
  }

  const copyOutput = () => {
    navigator.clipboard.writeText(output)
  }

  const downloadOutput = () => {
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ascii-art.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  React.useEffect(() => {
    if (text.trim()) {
      generateAscii()
    }
  }, [text, font])

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">ASCII Art Generator</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-muted mb-2">Text</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to convert..."
                className="w-full bg-surface panel-border rounded p-3"
                maxLength="20"
              />
            </div>
            
            <div>
              <label className="block text-sm text-muted mb-2">Font Style</label>
              <select
                value={font}
                onChange={(e) => setFont(e.target.value)}
                className="w-full bg-surface panel-border rounded p-3"
              >
                <option value="block">Block</option>
                <option value="small">Small</option>
              </select>
            </div>
          </div>
        </div>

        {output && (
          <div className="panel panel-border p-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">ASCII Art Output</h3>
              <div className="flex gap-2">
                <button
                  onClick={copyOutput}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors"
                >
                  Copy
                </button>
                <button
                  onClick={downloadOutput}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
                >
                  Download
                </button>
              </div>
            </div>
            <pre className="bg-black/20 p-4 rounded font-mono text-sm overflow-x-auto whitespace-pre">
              {output}
            </pre>
          </div>
        )}

        <div className="panel panel-border p-4 rounded-xl">
          <h3 className="font-semibold mb-2">Tips</h3>
          <ul className="text-sm text-muted space-y-1">
            <li>• Keep text short (max 20 characters) for best results</li>
            <li>• Use uppercase letters and numbers for better patterns</li>
            <li>• Block font works well for headers and titles</li>
            <li>• Small font is good for compact designs</li>
          </ul>
        </div>
      </div>
    </div>
  )
}