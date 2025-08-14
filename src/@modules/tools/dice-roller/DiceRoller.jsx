import React, { useState } from 'react'

export default function DiceRoller() {
  const [diceConfig, setDiceConfig] = useState({ count: 1, sides: 6, modifier: 0 })
  const [results, setResults] = useState([])
  const [history, setHistory] = useState([])

  const rollDice = () => {
    const rolls = []
    for (let i = 0; i < diceConfig.count; i++) {
      rolls.push(Math.floor(Math.random() * diceConfig.sides) + 1)
    }
    
    const total = rolls.reduce((sum, roll) => sum + roll, 0) + diceConfig.modifier
    const result = {
      rolls,
      modifier: diceConfig.modifier,
      total,
      config: { ...diceConfig },
      timestamp: new Date().toLocaleTimeString()
    }
    
    setResults(rolls)
    setHistory(prev => [result, ...prev.slice(0, 9)]) // Keep last 10 rolls
  }

  const presetDice = [
    { name: 'D4', sides: 4 },
    { name: 'D6', sides: 6 },
    { name: 'D8', sides: 8 },
    { name: 'D10', sides: 10 },
    { name: 'D12', sides: 12 },
    { name: 'D20', sides: 20 },
    { name: 'D100', sides: 100 }
  ]

  const quickRoll = (sides) => {
    const roll = Math.floor(Math.random() * sides) + 1
    const result = {
      rolls: [roll],
      modifier: 0,
      total: roll,
      config: { count: 1, sides, modifier: 0 },
      timestamp: new Date().toLocaleTimeString()
    }
    setResults([roll])
    setHistory(prev => [result, ...prev.slice(0, 9)])
  }

  const currentTotal = results.reduce((sum, roll) => sum + roll, 0) + diceConfig.modifier

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Dice Roller</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm text-muted mb-1">Number of Dice</label>
              <input
                type="number"
                min="1"
                max="20"
                value={diceConfig.count}
                onChange={(e) => setDiceConfig(prev => ({ ...prev, count: parseInt(e.target.value) || 1 }))}
                className="w-full bg-surface panel-border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Sides</label>
              <input
                type="number"
                min="2"
                max="1000"
                value={diceConfig.sides}
                onChange={(e) => setDiceConfig(prev => ({ ...prev, sides: parseInt(e.target.value) || 6 }))}
                className="w-full bg-surface panel-border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1">Modifier</label>
              <input
                type="number"
                value={diceConfig.modifier}
                onChange={(e) => setDiceConfig(prev => ({ ...prev, modifier: parseInt(e.target.value) || 0 }))}
                className="w-full bg-surface panel-border rounded p-2"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={rollDice}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors font-semibold"
              >
                Roll {diceConfig.count}d{diceConfig.sides}
                {diceConfig.modifier !== 0 && (diceConfig.modifier > 0 ? `+${diceConfig.modifier}` : diceConfig.modifier)}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-sm text-muted mb-2">Quick Roll</h3>
            <div className="flex flex-wrap gap-2">
              {presetDice.map(dice => (
                <button
                  key={dice.name}
                  onClick={() => quickRoll(dice.sides)}
                  className="px-3 py-1 bg-surface panel-border hover:border-white/30 rounded transition-colors text-sm"
                >
                  {dice.name}
                </button>
              ))}
            </div>
          </div>

          {results.length > 0 && (
            <div className="panel panel-border p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10">
              <h3 className="font-semibold mb-2">Current Roll</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {results.map((roll, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center font-bold text-lg"
                  >
                    {roll}
                  </div>
                ))}
                {diceConfig.modifier !== 0 && (
                  <div className="flex items-center px-3 text-lg font-semibold">
                    {diceConfig.modifier > 0 ? '+' : ''}{diceConfig.modifier}
                  </div>
                )}
              </div>
              <div className="text-2xl font-bold">
                Total: {currentTotal}
              </div>
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="panel panel-border p-4 rounded-xl">
            <h3 className="font-semibold mb-3">Roll History</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {history.map((roll, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-surface panel-border rounded text-sm">
                  <div>
                    <span className="font-mono">
                      {roll.config.count}d{roll.config.sides}
                      {roll.config.modifier !== 0 && (roll.config.modifier > 0 ? `+${roll.config.modifier}` : roll.config.modifier)}
                    </span>
                    <span className="ml-2 text-muted">
                      [{roll.rolls.join(', ')}]
                      {roll.modifier !== 0 && ` ${roll.modifier > 0 ? '+' : ''}${roll.modifier}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{roll.total}</span>
                    <span className="text-muted text-xs">{roll.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}