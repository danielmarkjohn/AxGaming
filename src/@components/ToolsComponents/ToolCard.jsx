import React from 'react'
import { Play, RotateCcw, ExternalLink } from 'lucide-react'

export default function ToolCard({ tool, onStart, onReload, onOpen, mobile }) {
  return (
    <article className={`
      card-3d rounded-2xl p-3 sm:p-4 bg-gradient-to-br from-gray-900/30 to-transparent 
      border border-white/5 hover:scale-105 transform-gpu transition-all duration-300 
      cursor-pointer group
      ${mobile ? 'hover:scale-102' : ''}
    `}>
      <div className="card-inner">
        <div className={`relative rounded-xl overflow-hidden ${mobile ? 'h-32 sm:h-40' : 'h-40'} bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center`}>
          <div className="text-center">
            <div className="text-4xl mb-2">🛠️</div>
          </div>
        </div>

        <div className="p-2 sm:p-3">
          <h3 className="font-bold text-white text-sm sm:text-base mb-1 sm:mb-2 line-clamp-1">
            {tool.title}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
            {tool.desc}
          </p>
          
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onStart(tool)
              }}
              className="flex-1 bg-gray-800 hover:bg-gray-00 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm font-medium flex items-center justify-center gap-1 sm:gap-2"
            >
              <Play className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Try it</span>
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                onOpen(tool)
              }}
              className="p-1.5 sm:p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              title="Open in New Tab"
            >
              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
