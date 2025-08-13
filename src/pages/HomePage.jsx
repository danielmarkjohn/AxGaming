import React, { useEffect, useState } from 'react'
import { Search, X, Sun, Moon, Wrench } from 'lucide-react'
import { TOOLS_CONFIG } from '../@config/tools'
import { HOMEPAGE_CONFIG } from '../@config/homepage'

export default function HomePage({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('')
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

  // Filter tools based on search query
  const filteredTools = searchQuery.length >= HOMEPAGE_CONFIG.SEARCH.MIN_CHARS 
    ? TOOLS_CONFIG.filter(tool => 
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : TOOLS_CONFIG

  const clearSearch = () => {
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen app-bg">
      <div className="max-w-7xl mx-auto p-6">

        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {HOMEPAGE_CONFIG.UI.TITLE}
            </h1>
            <p className="text-muted mt-2">
              Made by {HOMEPAGE_CONFIG.USER.NAME} ❤️ •
              <a
                href={HOMEPAGE_CONFIG.USER.GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors ml-1"
              >
                GitHub
              </a>
              {' • '}
              <a
                href={HOMEPAGE_CONFIG.USER.LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                LinkedIn
              </a>
            </p>
          </div>
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

        {/* Search Bar */}
        <div className="flex justify-center mb-8 px-4">
          <div className={`relative w-full ${HOMEPAGE_CONFIG.SEARCH.MAX_WIDTH}`}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted" />
            </div>
            <input
              type="text"
              placeholder={HOMEPAGE_CONFIG.SEARCH.PLACEHOLDER}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-surface panel-border rounded-xl text-var placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-cyan-400/40 transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted hover:text-var transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>


        {/* No Results Message */}
        {searchQuery.length >= HOMEPAGE_CONFIG.SEARCH.MIN_CHARS && filteredTools.length === 0 && (
          <div className="text-center mb-8">
            <p className="text-white/60 mb-2">{HOMEPAGE_CONFIG.MESSAGES.NO_RESULTS} "{searchQuery}"</p>
            <p className="text-white/40 text-sm">{HOMEPAGE_CONFIG.MESSAGES.TRY_DIFFERENT}</p>
          </div>
        )}

        {/* All Tools Grid */}
        <div className={`grid ${HOMEPAGE_CONFIG.UI.GRID_BREAKPOINTS.SM} ${HOMEPAGE_CONFIG.UI.GRID_BREAKPOINTS.LG} ${HOMEPAGE_CONFIG.UI.GRID_BREAKPOINTS.XL} gap-4`}>
          {(searchQuery.length >= HOMEPAGE_CONFIG.SEARCH.MIN_CHARS ? filteredTools : TOOLS_CONFIG).map(tool => (
            <div
              key={tool.id}
              onClick={() => { window.location.hash = `#/tools/${tool.id}` }}
              className="group cursor-pointer p-4 bg-surface panel-border hover:border-white/30 rounded-xl transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg accent-gradient flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-var font-medium truncate group-hover:text-white transition-colors">
                    {tool.title}
                  </h4>
                  <p className="text-xs text-muted capitalize">{tool.category}</p>
                </div>
              </div>
              <p className="text-sm text-muted line-clamp-2">{tool.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
