import React, { useState, useEffect } from 'react'

export default function JsonFormatter() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [indentSize, setIndentSize] = useState(2)
  const [sortKeys, setSortKeys] = useState(false)
  const [isValid, setIsValid] = useState(null)
  const [error, setError] = useState('')
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' })

  useEffect(() => {
    formatJson()
  }, [inputText, indentSize, sortKeys])

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type })
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000)
  }

  const formatJson = () => {
    if (!inputText.trim()) {
      setOutputText('')
      setIsValid(null)
      setError('')
      return
    }

    try {
      let parsed = JSON.parse(inputText)
      
      if (sortKeys && typeof parsed === 'object' && parsed !== null) {
        parsed = sortObjectKeys(parsed)
      }
      
      const formatted = JSON.stringify(parsed, null, indentSize)
      setOutputText(formatted)
      setIsValid(true)
      setError('')
    } catch (err) {
      setOutputText('')
      setIsValid(false)
      setError(err.message)
    }
  }

  const sortObjectKeys = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(sortObjectKeys)
    } else if (obj !== null && typeof obj === 'object') {
      const sorted = {}
      Object.keys(obj).sort().forEach(key => {
        sorted[key] = sortObjectKeys(obj[key])
      })
      return sorted
    }
    return obj
  }

  const minifyJson = () => {
    if (!inputText.trim()) {
      showNotification('No JSON to minify', 'warning')
      return
    }

    try {
      const parsed = JSON.parse(inputText)
      const minified = JSON.stringify(parsed)
      setOutputText(minified)
      showNotification('JSON minified!', 'success')
    } catch (err) {
      showNotification('Invalid JSON', 'error')
    }
  }

  const validateJson = () => {
    if (!inputText.trim()) {
      showNotification('No JSON to validate', 'warning')
      return
    }

    try {
      JSON.parse(inputText)
      showNotification('Valid JSON!', 'success')
    } catch (err) {
      showNotification(`Invalid JSON: ${err.message}`, 'error')
    }
  }

  const pasteText = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setInputText(text)
      showNotification('Text pasted from clipboard!', 'success')
    } catch (error) {
      showNotification('Failed to paste from clipboard', 'error')
    }
  }

  const copyOutput = async () => {
    if (!outputText) {
      showNotification('Nothing to copy', 'warning')
      return
    }

    try {
      await navigator.clipboard.writeText(outputText)
      showNotification('Copied to clipboard!', 'success')
    } catch (error) {
      showNotification('Failed to copy', 'error')
    }
  }

  const clearAll = () => {
    setInputText('')
    setOutputText('')
    setIsValid(null)
    setError('')
    showNotification('Cleared all content', 'success')
  }

  const getStats = (text) => {
    if (!text) return { size: 0, lines: 0 }
    return {
      size: new Blob([text]).size,
      lines: text.split('\n').length
    }
  }

  const inputStats = getStats(inputText)
  const outputStats = getStats(outputText)

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-black text-white p-6 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">JSON Formatter</h1>
          <p className="text-gray-400">Format, validate, and beautify JSON data</p>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Indent:</label>
              <select
                value={indentSize}
                onChange={(e) => setIndentSize(parseInt(e.target.value))}
                className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-sm"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={8}>8 spaces</option>
              </select>
            </div>
            
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={sortKeys}
                onChange={(e) => setSortKeys(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Sort keys</span>
            </label>

            <div className="flex gap-2 ml-auto">
              <button
                onClick={minifyJson}
                className="px-3 py-1 bg-orange-600 hover:bg-orange-700 rounded text-sm transition-colors"
              >
                Minify
              </button>
              <button
                onClick={validateJson}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
              >
                Validate
              </button>
              <button
                onClick={clearAll}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Status */}
        {(isValid !== null || error) && (
          <div className={`mb-4 p-3 rounded-lg ${
            isValid ? 'bg-green-900/50 border border-green-600' : 'bg-red-900/50 border border-red-600'
          }`}>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${isValid ? 'text-green-400' : 'text-red-400'}`}>
                {isValid ? '✓ Valid JSON' : '✗ Invalid JSON'}
              </span>
              {error && <span className="text-red-400 text-sm">: {error}</span>}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Input JSON</h3>
              <button
                onClick={pasteText}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
              >
                📋 Paste
              </button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your JSON here..."
              className="flex-1 min-h-96 bg-gray-800 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500 font-mono text-sm"
              spellCheck={false}
            />
            <div className="mt-2 text-sm text-gray-400">
              {inputStats.size} bytes • {inputStats.lines} lines
            </div>
          </div>

          {/* Output */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Formatted JSON</h3>
              <button
                onClick={copyOutput}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors"
              >
                📋 Copy
              </button>
            </div>
            <textarea
              value={outputText}
              readOnly
              placeholder="Formatted JSON will appear here..."
              className="flex-1 min-h-96 bg-gray-800 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:outline-none font-mono text-sm"
              spellCheck={false}
            />
            <div className="mt-2 text-sm text-gray-400">
              {outputStats.size} bytes • {outputStats.lines} lines
            </div>
          </div>
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