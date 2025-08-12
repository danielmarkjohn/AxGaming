import React, { useState, useEffect } from 'react'
import { X, Monitor, Palette, Volume2, Gamepad2, User } from 'lucide-react'

export default function SettingsModal({ onClose }) {
  const [settings, setSettings] = useState({
    theme: 'dark',
    accentColor: 'blue',
    soundEnabled: true,
    animations: true,
    autoLaunch: false,
    userName: 'Daniel Mark',
    userRole: 'Gaming Pro'
  })

  useEffect(() => {
    const saved = localStorage.getItem('dashboard_settings')
    if (saved) {
      setSettings({ ...settings, ...JSON.parse(saved) })
    }
  }, [])

  const saveSettings = (newSettings) => {
    setSettings(newSettings)
    localStorage.setItem('dashboard_settings', JSON.stringify(newSettings))
  }

  const handleChange = (key, value) => {
    const newSettings = { ...settings, [key]: value }
    saveSettings(newSettings)
  }

  const accentColors = [
    { name: 'Blue', value: 'blue', class: 'bg-blue-500' },
    { name: 'Purple', value: 'purple', class: 'bg-purple-500' },
    { name: 'Green', value: 'green', class: 'bg-green-500' },
    { name: 'Red', value: 'red', class: 'bg-red-500' },
    { name: 'Orange', value: 'orange', class: 'bg-orange-500' }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-2xl bg-[linear-gradient(180deg,#07070a,transparent)] rounded-2xl border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 max-h-96 overflow-y-auto">
          {/* Appearance */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Appearance</h3>
            </div>
            
            <div className="space-y-4 ml-8">
              <div>
                <label className="block text-sm text-white/70 mb-2">Theme</label>
                <select
                  value={settings.theme}
                  onChange={(e) => handleChange('theme', e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">Accent Color</label>
                <div className="flex gap-2">
                  {accentColors.map(color => (
                    <button
                      key={color.value}
                      onClick={() => handleChange('accentColor', color.value)}
                      className={`w-8 h-8 rounded-full ${color.class} ${
                        settings.accentColor === color.value ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900' : ''
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Performance */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Monitor className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Performance</h3>
            </div>
            
            <div className="space-y-4 ml-8">
              <label className="flex items-center justify-between">
                <span className="text-white/70">Enable Animations</span>
                <input
                  type="checkbox"
                  checked={settings.animations}
                  onChange={(e) => handleChange('animations', e.target.checked)}
                  className="w-5 h-5 rounded bg-white/10 border border-white/20"
                />
              </label>
            </div>
          </section>

          {/* Audio */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Volume2 className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Audio</h3>
            </div>
            
            <div className="space-y-4 ml-8">
              <label className="flex items-center justify-between">
                <span className="text-white/70">Sound Effects</span>
                <input
                  type="checkbox"
                  checked={settings.soundEnabled}
                  onChange={(e) => handleChange('soundEnabled', e.target.checked)}
                  className="w-5 h-5 rounded bg-white/10 border border-white/20"
                />
              </label>
            </div>
          </section>

          {/* Games */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Gamepad2 className="w-5 h-5 text-red-400" />
              <h3 className="text-lg font-semibold text-white">Games</h3>
            </div>
            
            <div className="space-y-4 ml-8">
              <label className="flex items-center justify-between">
                <span className="text-white/70">Auto-launch last game</span>
                <input
                  type="checkbox"
                  checked={settings.autoLaunch}
                  onChange={(e) => handleChange('autoLaunch', e.target.checked)}
                  className="w-5 h-5 rounded bg-white/10 border border-white/20"
                />
              </label>
            </div>
          </section>

          {/* Profile */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-orange-400" />
              <h3 className="text-lg font-semibold text-white">Profile</h3>
            </div>
            
            <div className="space-y-4 ml-8">
              <div>
                <label className="block text-sm text-white/70 mb-2">Display Name</label>
                <input
                  type="text"
                  value={settings.userName}
                  onChange={(e) => handleChange('userName', e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-white/70 mb-2">Role</label>
                <input
                  type="text"
                  value={settings.userRole}
                  onChange={(e) => handleChange('userRole', e.target.value)}
                  className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white/70 hover:text-white transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('dashboard_settings')
              setSettings({
                theme: 'dark',
                accentColor: 'blue',
                soundEnabled: true,
                animations: true,
                autoLaunch: false,
                userName: 'Daniel Mark',
                userRole: 'Gaming Pro'
              })
            }}
            className="px-4 py-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}