import React, { useState, useMemo } from 'react'
import { Copy } from 'lucide-react'

export default function StringRepeater() {
  const [input, setInput] = useState('Hello')
  const [count, setCount] = useState(3)
  const [separator, setSeparator] = useState(' ')

  const output = useMemo(() => {
    if (!input || count <= 0) return ''
    return Array(count).fill(input).join(separator)
  }, [input, count, separator])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">String Repeater</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted mb-2">Text to Repeat</label>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-surface panel-border rounded p-3"
                  placeholder="Enter text..."
                />
              </div>

              <div>
                <label className="block text-sm text-muted mb-2">Repeat Count</label>
                <input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  max="1000"
                  className="w-full bg-surface panel-border rounded p-3"
                />
              </div>

              <div>
                <label className="block text-sm text-muted mb-2">Separator</label>
                <select
                  value={separator}
                  onChange={(e) => setSeparator(e.target.value)}
                  className="w-full bg-surface panel-border rounded p-3"
                >
                  <option value=" ">Space</option>
                  <option value="">None</option>
                  <option value=", ">Comma + Space</option>
                  <option value="\n">New Line</option>
                  <option value="-">Dash</option>
                  <option value="_">Underscore</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-muted">Result ({output.length} chars)</label>
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
                className="w-full h-48 bg-surface panel-border rounded p-3 resize-none font-mono text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}