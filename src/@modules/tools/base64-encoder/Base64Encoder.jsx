import React, { useState, useEffect } from 'react'

export default function Base64Encoder() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [currentMode, setCurrentMode] = useState('encode')
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' })

  // Process text when input or mode changes
  useEffect(() => {
    processText()
  }, [inputText, currentMode])

  const processText = () => {
    if (!inputText.trim()) {
      setOutputText('')
      return
    }

    try {
      let result
      if (currentMode === 'encode') {
        result = btoa(unescape(encodeURIComponent(inputText)))
      } else {
        result = decodeURIComponent(escape(atob(inputText)))
      }
      setOutputText(result)
    } catch (error) {
      setOutputText(`Error: ${error.message}`)
    }
  }

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type })
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000)
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
    if (!outputText || outputText.startsWith('Error:')) {
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

  const swapInputOutput = () => {
    if (!outputText || outputText.startsWith('Error:')) {
      showNotification('Nothing to swap', 'warning')
      return
    }
    
    setInputText(outputText)
    setCurrentMode(currentMode === 'encode' ? 'decode' : 'encode')
    showNotification('Input and output swapped!', 'success')
  }

  const clearAll = () => {
    setInputText('')
    setOutputText('')
    showNotification('Cleared all content', 'success')
  }

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-black text-white p-6 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Base64 Encoder/Decoder</h1>
        <div className="flex gap-2">
          <button
            onClick={swapInputOutput}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors"
            title="Swap Input/Output"
          >
            🔄
          </button>
          <button
            onClick={clearAll}
            className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors"
            title="Clear All"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setCurrentMode('encode')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentMode === 'encode' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => setCurrentMode('decode')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentMode === 'decode' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
          }`}
        >
          Decode
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100%-200px)]">
        {/* Input Section */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">
              {currentMode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
            </h3>
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
            placeholder={currentMode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
            className="flex-1 bg-gray-800 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500"
            spellCheck={false}
          />
          <div className="mt-2 text-sm text-gray-400">
            {inputText.length} characters • {new Blob([inputText]).size} bytes
          </div>
        </div>

        {/* Output Section */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">
              {currentMode === 'encode' ? 'Base64 Output' : 'Decoded Output'}
            </h3>
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
            placeholder={currentMode === 'encode' ? 'Encoded result will appear here...' : 'Decoded result will appear here...'}
            className="flex-1 bg-gray-800 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:outline-none"
            spellCheck={false}
          />
          <div className="mt-2 text-sm text-gray-400">
            {outputText.length} characters • 
            <span className={`ml-2 ${outputText.startsWith('Error:') ? 'text-red-400' : 'text-green-400'}`}>
              {outputText.startsWith('Error:') ? 'Error' : outputText ? 'Success' : 'Ready'}
            </span>
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