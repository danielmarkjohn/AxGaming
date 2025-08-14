import React, { useState, useMemo } from 'react'
import { Calculator, Copy, Plus } from 'lucide-react'

export default function NumberCalculator() {
  const [numbers, setNumbers] = useState('10\n25\n30\n45\n50')
  const [operation, setOperation] = useState('sum')
  const [sequenceStart, setSequenceStart] = useState(1)
  const [sequenceEnd, setSequenceEnd] = useState(10)
  const [sequenceStep, setSequenceStep] = useState(1)

  const numberList = useMemo(() => {
    return numbers.split('\n')
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n))
  }, [numbers])

  const results = useMemo(() => {
    if (numberList.length === 0) return {}

    const sorted = [...numberList].sort((a, b) => a - b)
    const sum = numberList.reduce((acc, n) => acc + n, 0)
    const average = sum / numberList.length
    const min = Math.min(...numberList)
    const max = Math.max(...numberList)
    const median = sorted.length % 2 === 0 
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)]

    return {
      sum,
      average: parseFloat(average.toFixed(2)),
      min,
      max,
      median,
      count: numberList.length,
      sorted: sorted.join(', ')
    }
  }, [numberList])

  const generateSequence = () => {
    const sequence = []
    if (sequenceStep > 0) {
      for (let i = sequenceStart; i <= sequenceEnd; i += sequenceStep) {
        sequence.push(i)
      }
    } else {
      for (let i = sequenceStart; i >= sequenceEnd; i += sequenceStep) {
        sequence.push(i)
      }
    }
    setNumbers(sequence.join('\n'))
  }

  const generateRandom = () => {
    const randomNumbers = Array.from({ length: 10 }, () => 
      Math.floor(Math.random() * 100) + 1
    )
    setNumbers(randomNumbers.join('\n'))
  }

  const copyResult = (value) => {
    navigator.clipboard.writeText(value.toString())
  }

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Number Calculator & Generator</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted mb-2">Numbers (one per line)</label>
                <textarea
                  value={numbers}
                  onChange={(e) => setNumbers(e.target.value)}
                  className="w-full h-48 bg-surface panel-border rounded p-3 resize-none font-mono"
                  placeholder="Enter numbers, one per line..."
                />
                <div className="text-xs text-muted mt-1">
                  {numberList.length} valid numbers
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium">Generate Sequence</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs text-muted mb-1">Start</label>
                    <input
                      type="number"
                      value={sequenceStart}
                      onChange={(e) => setSequenceStart(parseInt(e.target.value) || 0)}
                      className="w-full bg-surface panel-border rounded p-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1">End</label>
                    <input
                      type="number"
                      value={sequenceEnd}
                      onChange={(e) => setSequenceEnd(parseInt(e.target.value) || 0)}
                      className="w-full bg-surface panel-border rounded p-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted mb-1">Step</label>
                    <input
                      type="number"
                      value={sequenceStep}
                      onChange={(e) => setSequenceStep(parseInt(e.target.value) || 1)}
                      className="w-full bg-surface panel-border rounded p-2 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={generateSequence}
                    className="flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    Generate
                  </button>
                  <button
                    onClick={generateRandom}
                    className="flex items-center gap-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded text-sm transition-colors"
                  >
                    <Calculator className="w-3 h-3" />
                    Random 10
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Calculations</h3>
              
              {numberList.length > 0 ? (
                <div className="space-y-3">
                  {[
                    { label: 'Sum', value: results.sum, key: 'sum' },
                    { label: 'Average', value: results.average, key: 'average' },
                    { label: 'Minimum', value: results.min, key: 'min' },
                    { label: 'Maximum', value: results.max, key: 'max' },
                    { label: 'Median', value: results.median, key: 'median' },
                    { label: 'Count', value: results.count, key: 'count' }
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-3 bg-surface panel-border rounded">
                      <span className="text-sm text-muted">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-medium">{item.value}</span>
                        <button
                          onClick={() => copyResult(item.value)}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="p-3 bg-surface panel-border rounded">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted">Sorted</span>
                      <button
                        onClick={() => copyResult(results.sorted)}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="font-mono text-sm break-all">{results.sorted}</div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted py-8">
                  Enter numbers to see calculations
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}