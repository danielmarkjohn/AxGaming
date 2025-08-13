import React, { useEffect, useMemo, useState } from 'react'
import { renderToolById } from '../router'
import { Sun, Moon } from 'lucide-react'

function useHash() {
  const [hash, setHash] = useState(window.location.hash || '#/')
  useEffect(() => {
    const onChange = () => setHash(window.location.hash || '#/')
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return hash
}

export default function ToolPage() {
  const hash = useHash()
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('dashboard_settings')
      if (saved) { const parsed = JSON.parse(saved); return parsed.theme || 'dark' }
    } catch {}
    return document.body.getAttribute('data-theme') || 'dark'
  })

  useEffect(() => {
    const finalTheme = theme === 'auto'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme
    document.body.setAttribute('data-theme', finalTheme)
  }, [theme])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try {
      const saved = JSON.parse(localStorage.getItem('dashboard_settings') || '{}')
      localStorage.setItem('dashboard_settings', JSON.stringify({ ...saved, theme: next }))
    } catch {}
  }

  const toolId = useMemo(() => {
    const m = hash.match(/^#\/tools\/(.+)$/)
    return m ? decodeURIComponent(m[1]) : null
  }, [hash])

  const content = toolId ? renderToolById(toolId) : null

  return (
    <div className="min-h-screen app-bg">
      <div className="max-w-7xl mx-auto p-6">
        <header className="flex items-center justify-between mb-6">
          <button
            onClick={() => { window.location.hash = '#/' }}
            className="px-3 py-2 rounded-lg bg-surface panel-border hover:border-white/30"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-var">Tool</h1>
          <button
            onClick={toggleTheme}
            className="p-3 rounded-xl bg-surface panel-border hover:border-white/30 smooth"
            title="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-blue-500" />
            )}
          </button>
        </header>

        <div className="rounded-2xl panel panel-border p-3 sm:p-4">
          {content || <div className="text-muted">Tool not found.</div>}
        </div>
      </div>
    </div>
  )
}

