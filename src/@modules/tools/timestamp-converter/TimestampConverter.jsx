import React, { useState, useEffect } from 'react'

export default function TimestampConverter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('to-date')
  const [format, setFormat] = useState('seconds')
  const [timezone, setTimezone] = useState('UTC')
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' })

  useEffect(() => {
    convertTimestamp()
  }, [input, mode, format, timezone])

  useEffect(() => {
    // Set current timestamp on load
    setInput(Math.floor(Date.now() / 1000).toString())
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type })
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000)
  }

  const convertTimestamp = () => {
    if (!input.trim()) {
      setOutput('')
      return
    }

    try {
      if (mode === 'to-date') {
        let timestamp = parseFloat(input)
        
        // Auto-detect format
        if (format === 'auto') {
          if (input.length <= 10) timestamp *= 1000
          else if (input.length <= 13) {} // milliseconds
          else if (input.length <= 16) timestamp /= 1000
          else timestamp /= 1000000
        } else if (format === 'seconds') {
          timestamp *= 1000
        } else if (format === 'microseconds') {
          timestamp /= 1000
        } else if (format === 'nanoseconds') {
          timestamp /= 1000000
        }

        const date = new Date(timestamp)
        const options = { 
          timeZone: timezone === 'local' ? undefined : timezone,
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short'
        }
        
        setOutput(date.toLocaleString('en-US', options))
      } else {
        const date = new Date(input)
        if (isNaN(date.getTime())) {
          setOutput('Invalid date format')
          return
        }
        
        let timestamp = date.getTime()
        if (format === 'seconds') timestamp = Math.floor(timestamp / 1000)
        else if (format === 'microseconds') timestamp *= 1000
        else if (format === 'nanoseconds') timestamp *= 1000000
        
        setOutput(timestamp.toString())
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`)
    }
  }

  const setCurrentTime = () => {
    const now = format === 'seconds' ? Math.floor(Date.now() / 1000) : Date.now()
    setInput(now.toString())
    showNotification('Current timestamp set!', 'success')
  }

  const copyOutput = async () => {
    if (!output || output.startsWith('Error:')) {
      showNotification('Nothing to copy', 'warning')
      return
    }

    try {
      await navigator.clipboard.writeText(output)
      showNotification('Copied to clipboard!', 'success')
    } catch (error) {
      showNotification('Failed to copy', 'error')
    }
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    showNotification('Cleared all content', 'success')
  }

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-black text-white p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Timestamp Converter</h1>
          <p className="text-gray-400">Convert between timestamps and human-readable dates</p>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Mode</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
              >
                <option value="to-date">Timestamp → Date</option>
                <option value="to-timestamp">Date → Timestamp</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
              >
                <option value="auto">Auto-detect</option>
                <option value="seconds">Seconds</option>
                <option value="milliseconds">Milliseconds</option>
                <option value="microseconds">Microseconds</option>
                <option value="nanoseconds">Nanoseconds</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
              >
                <option value="local">Local</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">EST</option>
                <option value="America/Los_Angeles">PST</option>
                <option value="Europe/London">GMT</option>
                <option value="Asia/Tokyo">JST</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={setCurrentTime}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                🕐 Now
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={copyOutput}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              📋 Copy Result
            </button>
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* Conversion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              {mode === 'to-date' ? 'Timestamp Input' : 'Date Input'}
            </h3>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'to-date' ? 'Enter timestamp...' : 'Enter date (YYYY-MM-DD HH:MM:SS)...'}
              className="w-full h-32 bg-gray-900 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500"
              spellCheck={false}
            />
          </div>

          {/* Output */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              {mode === 'to-date' ? 'Date Output' : 'Timestamp Output'}
            </h3>
            <textarea
              value={output}
              readOnly
              placeholder="Result will appear here..."
              className="w-full h-32 bg-gray-900 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:outline-none"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Quick Examples */}
        <div className="bg-gray-800 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">Quick Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-400 mb-2">Common Timestamps:</h4>
              <div className="space-y-1 text-gray-300">
                <div>• Unix Epoch: 0 (1970-01-01)</div>
                <div>• Y2K: 946684800 (2000-01-01)</div>
                <div>• Current: {Math.floor(Date.now() / 1000)}</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-green-400 mb-2">Date Formats:</h4>
              <div className="space-y-1 text-gray-300">
                <div>• 2024-01-01 12:00:00</div>
                <div>• January 1, 2024</div>
                <div>• 01/01/2024</div>
              </div>
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