import React, { useState, useEffect } from 'react'

export default function LoremIpsumGenerator() {
  const [outputText, setOutputText] = useState('')
  const [type, setType] = useState('paragraphs')
  const [amount, setAmount] = useState(3)
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [htmlFormat, setHtmlFormat] = useState(false)
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' })

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ]

  useEffect(() => {
    generateText()
  }, [type, amount, startWithLorem, htmlFormat])

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type })
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000)
  }

  const generateWords = (count) => {
    const words = []
    for (let i = 0; i < count; i++) {
      if (i === 0 && startWithLorem) {
        words.push('Lorem')
      } else if (i === 1 && startWithLorem) {
        words.push('ipsum')
      } else {
        words.push(loremWords[Math.floor(Math.random() * loremWords.length)])
      }
    }
    return words
  }

  const generateSentence = () => {
    const wordCount = Math.floor(Math.random() * 10) + 8
    const words = generateWords(wordCount)
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
    return words.join(' ') + '.'
  }

  const generateParagraph = () => {
    const sentenceCount = Math.floor(Math.random() * 4) + 3
    const sentences = []
    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence())
    }
    return sentences.join(' ')
  }

  const generateText = () => {
    const startTime = performance.now()
    let result = ''

    switch (type) {
      case 'words':
        const words = generateWords(amount)
        result = words.join(' ')
        break
      case 'sentences':
        const sentences = []
        for (let i = 0; i < amount; i++) {
          sentences.push(generateSentence())
        }
        result = sentences.join(' ')
        break
      case 'paragraphs':
        const paragraphs = []
        for (let i = 0; i < amount; i++) {
          paragraphs.push(generateParagraph())
        }
        result = htmlFormat ? 
          paragraphs.map(p => `<p>${p}</p>`).join('\n') :
          paragraphs.join('\n\n')
        break
    }

    setOutputText(result)
    const endTime = performance.now()
    const generationTime = Math.round(endTime - startTime)
    
    showNotification(`Generated in ${generationTime}ms`, 'success')
  }

  const copyText = async () => {
    if (!outputText.trim()) {
      showNotification('No text to copy', 'warning')
      return
    }

    try {
      await navigator.clipboard.writeText(outputText)
      showNotification('Text copied to clipboard!', 'success')
    } catch (error) {
      showNotification('Failed to copy text', 'error')
    }
  }

  const downloadText = () => {
    if (!outputText.trim()) {
      showNotification('No text to download', 'warning')
      return
    }

    const blob = new Blob([outputText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = `lorem-ipsum-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    showNotification('Text downloaded!', 'success')
  }

  const clearOutput = () => {
    setOutputText('')
    showNotification('Output cleared!', 'success')
  }

  const getStats = () => {
    const words = outputText.trim().split(/\s+/).length
    const characters = outputText.length
    return { words, characters }
  }

  const stats = getStats()

  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-black text-white p-6 overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Lorem Ipsum Generator</h1>
          <p className="text-gray-400">Generate placeholder text for your designs</p>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
              >
                <option value="words">Words</option>
                <option value="sentences">Sentences</option>
                <option value="paragraphs">Paragraphs</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max="100"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-white"
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={startWithLorem}
                  onChange={(e) => setStartWithLorem(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm">Start with "Lorem ipsum"</span>
              </label>
            </div>
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={htmlFormat}
                  onChange={(e) => setHtmlFormat(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm">HTML format</span>
              </label>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={generateText}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              🎲 Generate
            </button>
            <button
              onClick={copyText}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              📋 Copy
            </button>
            <button
              onClick={downloadText}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              💾 Download
            </button>
            <button
              onClick={clearOutput}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Generated Text</h2>
            <div className="text-sm text-gray-400">
              {stats.words} words • {stats.characters} characters
            </div>
          </div>
          
          <textarea
            value={outputText}
            readOnly
            placeholder="Generated text will appear here..."
            className="w-full h-96 bg-gray-900 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:outline-none"
            spellCheck={false}
          />
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