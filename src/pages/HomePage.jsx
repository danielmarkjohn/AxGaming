import React, { useState } from 'react'
import { Settings, Search, X } from 'lucide-react'
import SettingsModal from '../@components/SettingsModal'
import { TOOLS_CONFIG } from '../@config/tools'
import { categories } from '../@config/coreConfig'
import { HOMEPAGE_CONFIG } from '../@config/homepage'

export default function HomePage({ onNavigate }) {
  const [showSettings, setShowSettings] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

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
    <div className="min-h-screen bg-gradient-to-b from-[#05060a] to-[#0b0d12] text-white">
      <div className="max-w-7xl mx-auto p-6">
        
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {HOMEPAGE_CONFIG.UI.TITLE}
            </h1>
            <p className="text-white/60 mt-2">
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
            onClick={() => setShowSettings(true)}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-200 hover:scale-105"
          >
            <Settings className="w-5 h-5 text-white/70" />
          </button>
        </header>

        {/* Search Bar */}
        <div className="flex justify-center mb-8 px-4">
          <div className={`relative w-full ${HOMEPAGE_CONFIG.SEARCH.MAX_WIDTH}`}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white/40" />
            </div>
            <input
              type="text"
              placeholder={HOMEPAGE_CONFIG.SEARCH.PLACEHOLDER}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white/70 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Search Results */}
        {searchQuery.length >= HOMEPAGE_CONFIG.SEARCH.MIN_CHARS && filteredTools.length > 0 && (
          <div className="mb-8">
            <div className="text-center mb-6">
              <p className="text-white/60">
                Found {filteredTools.length} {HOMEPAGE_CONFIG.MESSAGES.FOUND_TOOLS}{filteredTools.length !== 1 ? 's' : ''} matching "{searchQuery}"
              </p>
            </div>
            
            <div className={`grid ${HOMEPAGE_CONFIG.UI.GRID_BREAKPOINTS.SM} ${HOMEPAGE_CONFIG.UI.GRID_BREAKPOINTS.LG} ${HOMEPAGE_CONFIG.UI.GRID_BREAKPOINTS.XL} gap-4`}>
              {filteredTools.map(tool => (
                <div
                  key={tool.id}
                  onClick={() => window.open(tool.path, '_blank')}
                  className="group cursor-pointer p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-sm font-bold">
                      {tool.title[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate group-hover:text-green-300 transition-colors">
                        {tool.title}
                      </h4>
                      <p className="text-xs text-white/60 capitalize">{tool.category}</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/70 line-clamp-2">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {searchQuery.length >= HOMEPAGE_CONFIG.SEARCH.MIN_CHARS && filteredTools.length === 0 && (
          <div className="text-center mb-8">
            <p className="text-white/60 mb-2">{HOMEPAGE_CONFIG.MESSAGES.NO_RESULTS} "{searchQuery}"</p>
            <p className="text-white/40 text-sm">{HOMEPAGE_CONFIG.MESSAGES.TRY_DIFFERENT}</p>
          </div>
        )}

        {/* Categories Grid */}
        <div className={`grid ${HOMEPAGE_CONFIG.UI.CATEGORIES_GRID} gap-6`}>
          {categories.map(category => {
            const IconComponent = category.icon
            return (
              <div
                key={category.id}
                onClick={() => onNavigate(category.id)}
                className="card-3d group cursor-pointer"
              >
                <div className="card-inner p-6 bg-[linear-gradient(180deg,#07070a,transparent)] rounded-2xl border border-white/5 shadow-xl hover:border-white/20 transition-all duration-300">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-white/60 text-sm mb-4">{category.desc}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">
                      {category.count} items
                    </span>
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-xs text-white/70">→</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {showSettings && (
        <SettingsModal onClose={() => setShowSettings(false)} />
      )}
    </div>
  )
}
