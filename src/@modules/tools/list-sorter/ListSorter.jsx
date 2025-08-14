import React, { useState, useMemo } from 'react'
import { ArrowUpDown, Copy, Shuffle } from 'lucide-react'

export default function ListSorter() {
  const [input, setInput] = useState('Zebra\nApple\nBanana\nCherry\n123\n456\n789')
  const [sortType, setSortType] = useState('alphabetical')
  const [sortOrder, setSortOrder] = useState('asc')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [removeEmpty, setRemoveEmpty] = useState(true)
  const [removeDuplicates, setRemoveDuplicates] = useState(false)

  const processedList = useMemo(() => {
    let items = input.split('\n')
    
    if (removeEmpty) {
      items = items.filter(item => item.trim())
    }
    
    if (removeDuplicates) {
      items = [...new Set(items)]
    }

    // Sort items
    items.sort((a, b) => {
      let compareA = caseSensitive ? a : a.toLowerCase()
      let compareB = caseSensitive ? b : b.toLowerCase()

      if (sortType === 'numerical') {
        const numA = parseFloat(compareA)
        const numB = parseFloat(compareB)
        if (!isNaN(numA) && !isNaN(numB)) {
          return sortOrder === 'asc' ? numA - numB : numB - numA
        }
      }
      
      if (sortType === 'length') {
        const lengthDiff = compareA.length - compareB.length
        return sortOrder === 'asc' ? lengthDiff : -lengthDiff
      }

      // Alphabetical (default)
      if (compareA < compareB) return sortOrder === 'asc' ? -1 : 1
      if (compareA > compareB) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    return items
  }, [input, sortType, sortOrder, caseSensitive, removeEmpty, removeDuplicates])

  const shuffleList = () => {
    const items = input.split('\n').filter(item => removeEmpty ? item.trim() : true)
    const shuffled = [...items].sort(() => Math.random() - 0.5)
    setInput(shuffled.join('\n'))
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(processedList.join('\n'))
  }

  const reverseList = () => {
    setInput(processedList.slice().reverse().join('\n'))
  }

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">List Sorter & Processor</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted mb-2">Input List (one item per line)</label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full h-48 bg-surface panel-border rounded p-3 resize-none font-mono text-sm"
                  placeholder="Enter items, one per line..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted mb-2">Sort Type</label>
                  <select
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                    className="w-full bg-surface panel-border rounded p-2"
                  >
                    <option value="alphabetical">Alphabetical</option>
                    <option value="numerical">Numerical</option>
                    <option value="length">By Length</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-muted mb-2">Order</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full bg-surface panel-border rounded p-2"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={caseSensitive}
                    onChange={(e) => setCaseSensitive(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Case sensitive</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={removeEmpty}
                    onChange={(e) => setRemoveEmpty(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Remove empty lines</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={removeDuplicates}
                    onChange={(e) => setRemoveDuplicates(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Remove duplicates</span>
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={shuffleList}
                  className="flex items-center gap-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded text-sm transition-colors"
                >
                  <Shuffle className="w-3 h-3" />
                  Shuffle
                </button>
                <button
                  onClick={reverseList}
                  className="flex items-center gap-1 px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded text-sm transition-colors"
                >
                  <ArrowUpDown className="w-3 h-3" />
                  Reverse
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-muted">
                  Sorted List ({processedList.length} items)
                </label>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 px-2 py-1 bg-surface panel-border hover:border-white/30 rounded text-sm transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
              </div>
              <textarea
                value={processedList.join('\n')}
                readOnly
                className="w-full h-64 bg-surface panel-border rounded p-3 resize-none font-mono text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}