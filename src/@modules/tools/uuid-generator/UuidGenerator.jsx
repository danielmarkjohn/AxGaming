import React, { useState, useEffect } from 'react'

export default function UuidGenerator() {
  const [currentUuid, setCurrentUuid] = useState('')
  const [generatedUuids, setGeneratedUuids] = useState([])
  const [version, setVersion] = useState('4')
  const [format, setFormat] = useState('standard')
  const [quantity, setQuantity] = useState(10)
  const [history, setHistory] = useState([])
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' })

  useEffect(() => {
    generateUuid()
    loadHistory()
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type })
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000)
  }

  const generateRawUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  const formatUuid = (uuid) => {
    switch (format) {
      case 'uppercase': return uuid.toUpperCase()
      case 'lowercase': return uuid.toLowerCase()
      case 'no-hyphens': return uuid.replace(/-/g, '')
      case 'braces': return `{${uuid}}`
      default: return uuid
    }
  }

  const generateUuid = () => {
    const rawUuid = generateRawUuid()
    const formattedUuid = formatUuid(rawUuid)
    setCurrentUuid(formattedUuid)
    
    // Add to history
    const newHistory = [{ uuid: formattedUuid, timestamp: Date.now() }, ...history.slice(0, 99)]
    setHistory(newHistory)
    saveHistory(newHistory)
  }

  const generateBulkUuids = () => {
    const qty = Math.min(parseInt(quantity) || 1, 1000)
    const newUuids = []
    
    for (let i = 0; i < qty; i++) {
      const rawUuid = generateRawUuid()
      const formattedUuid = formatUuid(rawUuid)
      newUuids.push({ raw: rawUuid, formatted: formattedUuid })
    }
    
    setGeneratedUuids([...newUuids, ...generatedUuids])
    showNotification(`Generated ${qty} UUIDs!`, 'success')
  }

  const copyCurrentUuid = async () => {
    try {
      await navigator.clipboard.writeText(currentUuid)
      showNotification('UUID copied to clipboard!', 'success')
    } catch (error) {
      showNotification('Failed to copy UUID', 'error')
    }
  }

  const copyAllUuids = async () => {
    if (generatedUuids.length === 0) {
      showNotification('No UUIDs to copy', 'warning')
      return
    }

    const allUuids = generatedUuids.map(item => item.formatted).join('\n')
    
    try {
      await navigator.clipboard.writeText(allUuids)
      showNotification(`Copied ${generatedUuids.length} UUIDs!`, 'success')
    } catch (error) {
      showNotification('Failed to copy UUIDs', 'error')
    }
  }

  const downloadUuids = () => {
    if (generatedUuids.length === 0) {
      showNotification('No UUIDs to download', 'warning')
      return
    }

    const content = generatedUuids.map(item => item.formatted).join('\n')
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = `uuids-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    showNotification(`Downloaded ${generatedUuids.length} UUIDs!`, 'success')
  }

  const clearResults = () => {
    setGeneratedUuids([])
    showNotification('Results cleared!', 'success')
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('uuid_history')
    showNotification('History cleared!', 'success')
  }

  const saveHistory = (historyData) => {
    localStorage.setItem('uuid_history', JSON.stringify(historyData))
  }

  const loadHistory = () => {
    try {
      const saved = localStorage.getItem('uuid_history')
      if (saved) {
        setHistory(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Failed to load history:', error)
    }
  }

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-black text-white p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">UUID Generator</h1>
          <p className="text-gray-400">Generate universally unique identifiers</p>
        </div>

        {/* Current UUID */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Current UUID</h2>
            <div className="flex gap-2">
              <button
                onClick={generateUuid}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                🎲 Generate
              </button>
              <button
                onClick={copyCurrentUuid}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                📋 Copy
              </button>
            </div>
          </div>
          <div className="bg-gray-900 rounded p-4 font-mono text-lg break-all">
            {currentUuid || 'Click Generate to create a UUID'}
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Version</label>
            <select
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg p-2 text-white"
            >
              <option value="4">Version 4 (Random)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg p-2 text-white"
            >
              <option value="standard">Standard</option>
              <option value="uppercase">Uppercase</option>
              <option value="lowercase">Lowercase</option>
              <option value="no-hyphens">No Hyphens</option>
              <option value="braces">With Braces</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Bulk Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              max="1000"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg p-2 text-white"
            />
          </div>
        </div>

        {/* Bulk Generation */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Bulk Generation</h2>
            <div className="flex gap-2">
              <button
                onClick={generateBulkUuids}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                🎲 Generate Bulk
              </button>
              <button
                onClick={copyAllUuids}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
              >
                📋 Copy All
              </button>
              <button
                onClick={downloadUuids}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                💾 Download
              </button>
              <button
                onClick={clearResults}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                🗑️ Clear
              </button>
            </div>
          </div>
          
          {generatedUuids.length > 0 ? (
            <div className="bg-gray-900 rounded p-4 max-h-60 overflow-y-auto">
              {generatedUuids.map((item, index) => (
                <div key={index} className="font-mono text-sm py-1 break-all">
                  {item.formatted}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-900 rounded p-4 text-gray-400 text-center">
              No UUIDs generated yet
            </div>
          )}
          
          {generatedUuids.length > 0 && (
            <div className="mt-2 text-sm text-gray-400">
              {generatedUuids.length} UUIDs generated
            </div>
          )}
        </div>

        {/* History */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent History</h2>
            <button
              onClick={clearHistory}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              🗑️ Clear History
            </button>
          </div>
          
          {history.length > 0 ? (
            <div className="bg-gray-900 rounded p-4 max-h-40 overflow-y-auto">
              {history.slice(0, 10).map((item, index) => (
                <div key={index} className="flex justify-between items-center py-1 text-sm">
                  <span className="font-mono break-all">{item.uuid}</span>
                  <span className="text-gray-400 ml-4 whitespace-nowrap">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-900 rounded p-4 text-gray-400 text-center">
              No history available
            </div>
          )}
        </div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg text-white z-50 ${
          notification.type === 'success' ? 'bg-green-600' : 
          notification.type === 'error' ? 'bg-red-600' : 'bg-yellow-600'
        }`}>
          {notification.message}
        </div>
      )}
    </div>
  )
}