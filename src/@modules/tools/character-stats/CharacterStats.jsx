import React, { useState } from 'react'

export default function CharacterStats() {
  const [method, setMethod] = useState('4d6-drop-lowest')
  const [stats, setStats] = useState([])
  const [history, setHistory] = useState([])

  const statNames = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']

  const rollMethods = {
    '4d6-drop-lowest': {
      name: '4d6 Drop Lowest',
      description: 'Roll 4d6, drop the lowest die (Standard D&D)',
      roll: () => {
        const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1)
        rolls.sort((a, b) => b - a)
        return {
          total: rolls.slice(0, 3).reduce((sum, roll) => sum + roll, 0),
          rolls: rolls,
          kept: rolls.slice(0, 3)
        }
      }
    },
    '3d6': {
      name: '3d6 Straight',
      description: 'Roll 3d6 straight (Classic method)',
      roll: () => {
        const rolls = Array.from({ length: 3 }, () => Math.floor(Math.random() * 6) + 1)
        return {
          total: rolls.reduce((sum, roll) => sum + roll, 0),
          rolls: rolls,
          kept: rolls
        }
      }
    },
    '2d6+6': {
      name: '2d6+6',
      description: 'Roll 2d6+6 (Heroic method)',
      roll: () => {
        const rolls = Array.from({ length: 2 }, () => Math.floor(Math.random() * 6) + 1)
        return {
          total: rolls.reduce((sum, roll) => sum + roll, 0) + 6,
          rolls: [...rolls, 6],
          kept: [...rolls, 6]
        }
      }
    },
    'point-buy': {
      name: 'Point Buy',
      description: 'Standard array: 15, 14, 13, 12, 10, 8',
      roll: () => null // Special case
    }
  }

  const getModifier = (score) => {
    return Math.floor((score - 10) / 2)
  }

  const formatModifier = (modifier) => {
    return modifier >= 0 ? `+${modifier}` : `${modifier}`
  }

  const rollStats = () => {
    if (method === 'point-buy') {
      const standardArray = [15, 14, 13, 12, 10, 8]
      const newStats = statNames.map((name, index) => ({
        name,
        score: standardArray[index],
        modifier: getModifier(standardArray[index]),
        rolls: null
      }))
      setStats(newStats)
      addToHistory(newStats, 'Point Buy')
      return
    }

    const rollMethod = rollMethods[method]
    const newStats = statNames.map(name => {
      const result = rollMethod.roll()
      return {
        name,
        score: result.total,
        modifier: getModifier(result.total),
        rolls: result
      }
    })
    
    setStats(newStats)
    addToHistory(newStats, rollMethod.name)
  }

  const addToHistory = (statsArray, methodName) => {
    const total = statsArray.reduce((sum, stat) => sum + stat.score, 0)
    const average = (total / 6).toFixed(1)
    
    const historyEntry = {
      id: Date.now(),
      method: methodName,
      stats: [...statsArray],
      total,
      average,
      timestamp: new Date().toLocaleTimeString()
    }
    
    setHistory(prev => [historyEntry, ...prev.slice(0, 9)]) // Keep last 10
  }

  const loadFromHistory = (historyEntry) => {
    setStats([...historyEntry.stats])
  }

  const getScoreColor = (score) => {
    if (score >= 16) return 'text-green-400'
    if (score >= 14) return 'text-blue-400'
    if (score >= 12) return 'text-yellow-400'
    if (score >= 10) return 'text-white'
    return 'text-red-400'
  }

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">RPG Character Stats Generator</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted mb-2">Rolling Method</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full bg-surface panel-border rounded p-3"
                >
                  {Object.entries(rollMethods).map(([key, methodInfo]) => (
                    <option key={key} value={key}>
                      {methodInfo.name}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-muted mt-1">
                  {rollMethods[method].description}
                </p>
              </div>

              <button
                onClick={rollStats}
                className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded transition-colors font-semibold"
              >
                {method === 'point-buy' ? 'Use Standard Array' : 'Roll Character Stats'}
              </button>

              {stats.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Current Character</h3>
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-surface panel-border rounded"
                    >
                      <span className="font-medium">{stat.name}</span>
                      <div className="flex items-center gap-4">
                        {stat.rolls && method !== 'point-buy' && (
                          <div className="text-sm text-muted font-mono">
                            [{stat.rolls.rolls.join(', ')}]
                            {stat.rolls.kept.length !== stat.rolls.rolls.length && (
                              <span className="ml-1">→ [{stat.rolls.kept.join(', ')}]</span>
                            )}
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <span className={`text-xl font-bold ${getScoreColor(stat.score)}`}>
                            {stat.score}
                          </span>
                          <span className="text-sm text-muted">
                            ({formatModifier(stat.modifier)})
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-4 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded border border-blue-500/20">
                    <div className="flex justify-between text-sm">
                      <span>Total: {stats.reduce((sum, stat) => sum + stat.score, 0)}</span>
                      <span>Average: {(stats.reduce((sum, stat) => sum + stat.score, 0) / 6).toFixed(1)}</span>
                      <span>Modifier Sum: {formatModifier(stats.reduce((sum, stat) => sum + stat.modifier, 0))}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              {history.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Roll History</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {history.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-3 bg-surface panel-border rounded hover:border-white/30 transition-colors cursor-pointer"
                        onClick={() => loadFromHistory(entry)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{entry.method}</span>
                          <span className="text-xs text-muted">{entry.timestamp}</span>
                        </div>
                        <div className="grid grid-cols-6 gap-1 mb-2">
                          {entry.stats.map((stat, i) => (
                            <div
                              key={i}
                              className={`text-center text-sm font-bold ${getScoreColor(stat.score)}`}
                            >
                              {stat.score}
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between text-xs text-muted">
                          <span>Total: {entry.total}</span>
                          <span>Avg: {entry.average}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="panel panel-border p-4 rounded-xl">
          <h3 className="font-semibold mb-2">Ability Score Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Score Ranges</h4>
              <ul className="space-y-1 text-muted">
                <li><span className="text-red-400">3-9:</span> Below Average</li>
                <li><span className="text-white">10-11:</span> Average</li>
                <li><span className="text-yellow-400">12-13:</span> Above Average</li>
                <li><span className="text-blue-400">14-15:</span> Exceptional</li>
                <li><span className="text-green-400">16+:</span> Heroic</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Ability Descriptions</h4>
              <ul className="space-y-1 text-muted">
                <li><strong>Strength:</strong> Physical power</li>
                <li><strong>Dexterity:</strong> Agility and reflexes</li>
                <li><strong>Constitution:</strong> Health and stamina</li>
                <li><strong>Intelligence:</strong> Reasoning ability</li>
                <li><strong>Wisdom:</strong> Perception and insight</li>
                <li><strong>Charisma:</strong> Force of personality</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}