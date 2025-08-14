import React, { useState } from 'react'
import { Shuffle, Copy, Trash2 } from 'lucide-react'

export default function RandomPicker() {
  const [items, setItems] = useState('Apple\nBanana\nCherry\nDate\nEggplant')
  const [pickCount, setPickCount] = useState(1)
  const [results, setResults] = useState([])
  const [allowDuplicates, setAllowDuplicates] = useState(false)

  const itemList = items.split('\n').filter(item => item.trim())

  const pickRandom = () => {
    if (itemList.length === 0) return

    const picks = []
    const availableItems = [...itemList]

    for (let i = 0; i < Math.min(pickCount, allowDuplicates ? pickCount : itemList.length); i++) {
      const randomIndex = Math.floor(Math.random() * availableItems.length)
      const picked = availableItems[randomIndex]
      picks.push(picked)
      
      if (!allowDuplicates) {
        availableItems.splice(randomIndex, 1)
      }
    }

    setResults(picks)
  }

  const copyResults = () => {
    navigator.clipboard.writeText(results.join('\n'))
  }

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Random Item Picker</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted mb-2">Items (one per line)</label>
                <textarea
                  value={items}
                  onChange={(e) => setItems(e.target.value)}
                  className="w-full h-48 bg-surface panel-border rounded p-3 resize-none"
                  placeholder="Enter items, one per line..."
                />
                <div className="text-xs text-muted mt-1">
                  {itemList.length} items available
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted mb-2">Pick Count</label>
                  <input
                    type="number"
                    value={pickCount}
                    onChange={(e) => setPickCount(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    max="100"
                    className="w-full bg-surface panel-border rounded p-3"
                  />
                </div>

                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allowDuplicates}
                      onChange={(e) => setAllowDuplicates(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">Allow duplicates</span>
                  </label>
                </div>
              </div>

              <button
                onClick={pickRandom}
                disabled={itemList.length === 0}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 rounded transition-colors"
              >
                <Shuffle className="w-4 h-4" />
                Pick Random Items
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm text-muted">Results</label>
                <div className="flex gap-2">
                  <button
                    onClick={copyResults}
                    disabled={results.length === 0}
                    className="flex items-center gap-1 px-2 py-1 bg-surface panel-border hover:border-white/30 rounded text-sm transition-colors disabled:opacity-50"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                  <button
                    onClick={() => setResults([])}
                    disabled={results.length === 0}
                    className="flex items-center gap-1 px-2 py-1 bg-surface panel-border hover:border-white/30 rounded text-sm transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear
                  </button>
                </div>
              </div>

              <div className="bg-surface panel-border rounded p-4 min-h-48">
                {results.length > 0 ? (
                  <div className="space-y-2">
                    {results.map((result, index) => (
                      <div
                        key={index}
                        className="p-3 bg-blue-600/20 border border-blue-500/30 rounded flex items-center justify-between"
                      >
                        <span className="font-medium">{result}</span>
                        <span className="text-xs text-muted">#{index + 1}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted">
                    Click "Pick Random Items" to get results
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}