import React, { useState } from 'react'

export default function PasswordGenerator() {
  const [settings, setSettings] = useState({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false
  })
  const [passwords, setPasswords] = useState([])
  const [count, setCount] = useState(5)

  const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    similar: 'il1Lo0O',
    ambiguous: '{}[]()/\\\'"`~,;.<>'
  }

  const generatePassword = () => {
    let charset = ''
    
    if (settings.includeUppercase) charset += charSets.uppercase
    if (settings.includeLowercase) charset += charSets.lowercase
    if (settings.includeNumbers) charset += charSets.numbers
    if (settings.includeSymbols) charset += charSets.symbols
    
    if (settings.excludeSimilar) {
      charset = charset.split('').filter(char => !charSets.similar.includes(char)).join('')
    }
    
    if (settings.excludeAmbiguous) {
      charset = charset.split('').filter(char => !charSets.ambiguous.includes(char)).join('')
    }
    
    if (!charset) return ''
    
    let password = ''
    for (let i = 0; i < settings.length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    
    return password
  }

  const generateMultiplePasswords = () => {
    const newPasswords = []
    for (let i = 0; i < count; i++) {
      const password = generatePassword()
      if (password) {
        newPasswords.push({
          id: Date.now() + i,
          password,
          strength: calculateStrength(password),
          timestamp: new Date().toLocaleTimeString()
        })
      }
    }
    setPasswords(newPasswords)
  }

  const calculateStrength = (password) => {
    let score = 0
    if (password.length >= 8) score += 1
    if (password.length >= 12) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1
    
    if (score <= 2) return { level: 'Weak', color: 'text-red-400' }
    if (score <= 4) return { level: 'Medium', color: 'text-yellow-400' }
    return { level: 'Strong', color: 'text-green-400' }
  }

  const copyPassword = (password) => {
    navigator.clipboard.writeText(password)
  }

  const copyAllPasswords = () => {
    const allPasswords = passwords.map(p => p.password).join('\n')
    navigator.clipboard.writeText(allPasswords)
  }

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Password Generator</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted mb-2">
                  Password Length: {settings.length}
                </label>
                <input
                  type="range"
                  min="4"
                  max="128"
                  value={settings.length}
                  onChange={(e) => setSettings(prev => ({ ...prev, length: parseInt(e.target.value) }))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted mt-1">
                  <span>4</span>
                  <span>128</span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted mb-2">Character Types</label>
                <div className="space-y-2">
                  {[
                    { key: 'includeUppercase', label: 'Uppercase (A-Z)' },
                    { key: 'includeLowercase', label: 'Lowercase (a-z)' },
                    { key: 'includeNumbers', label: 'Numbers (0-9)' },
                    { key: 'includeSymbols', label: 'Symbols (!@#$...)' }
                  ].map(option => (
                    <label key={option.key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings[option.key]}
                        onChange={(e) => setSettings(prev => ({ ...prev, [option.key]: e.target.checked }))}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-muted mb-2">Options</label>
                <div className="space-y-2">
                  {[
                    { key: 'excludeSimilar', label: 'Exclude similar characters (i, l, 1, L, o, 0, O)' },
                    { key: 'excludeAmbiguous', label: 'Exclude ambiguous characters ({} [] () /\\ \' " ` ~ , ; . < >)' }
                  ].map(option => (
                    <label key={option.key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings[option.key]}
                        onChange={(e) => setSettings(prev => ({ ...prev, [option.key]: e.target.checked }))}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <label className="block text-sm text-muted mb-1">Generate</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                    className="w-20 bg-surface panel-border rounded p-2"
                  />
                </div>
                <div className="flex-1">
                  <button
                    onClick={generateMultiplePasswords}
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors font-semibold mt-6"
                  >
                    Generate Passwords
                  </button>
                </div>
              </div>
            </div>

            <div>
              {passwords.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Generated Passwords</h3>
                    <button
                      onClick={copyAllPasswords}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors"
                    >
                      Copy All
                    </button>
                  </div>
                  
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {passwords.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 p-3 bg-surface panel-border rounded"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-sm break-all">{item.password}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs ${item.strength.color}`}>
                              {item.strength.level}
                            </span>
                            <span className="text-xs text-muted">{item.timestamp}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => copyPassword(item.password)}
                          className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="panel panel-border p-4 rounded-xl">
          <h3 className="font-semibold mb-2">Password Security Tips</h3>
          <ul className="text-sm text-muted space-y-1">
            <li>• Use at least 12 characters for strong passwords</li>
            <li>• Include a mix of uppercase, lowercase, numbers, and symbols</li>
            <li>• Avoid using personal information or common words</li>
            <li>• Use unique passwords for each account</li>
            <li>• Consider using a password manager</li>
            <li>• Enable two-factor authentication when available</li>
          </ul>
        </div>
      </div>
    </div>
  )
}