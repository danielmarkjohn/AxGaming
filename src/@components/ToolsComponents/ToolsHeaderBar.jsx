import React from 'react'
import { ArrowLeft, Menu, X } from 'lucide-react'

export default function ToolsHeaderBar({ activeTool, onToggleOverlay, onBack, onToggleSidebar, sidebarOpen }){
  return (
    <header className="flex items-center justify-between mb-4 lg:mb-6">
      <div className="flex items-center gap-2 sm:gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
          </button>
        )}
        
        {/* Mobile menu button */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5 text-white/70" />
            ) : (
              <Menu className="w-5 h-5 text-white/70" />
            )}
          </button>
        )}
        
        <div>
          <h2 className="text-lg sm:text-2xl font-extrabold tracking-wide">Tools Center</h2>
          <div className="text-xs sm:text-sm text-white/60 hidden sm:block">Launch & manage your tools</div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={()=> activeTool ? onToggleOverlay() : null}
          disabled={!activeTool}
          className="px-2 sm:px-3 py-1 sm:py-2 border rounded text-xs sm:text-sm border-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="hidden sm:inline">Overlay</span>
          <span className="sm:hidden">▢</span>
        </button>
        <button
          className="px-2 sm:px-3 py-1 sm:py-2 bg-white/5 rounded text-xs sm:text-sm"
          onClick={()=>{ if(activeTool) window.open(activeTool.path, '_blank')}}
        >
          <span className="hidden sm:inline">Pop Out</span>
          <span className="sm:hidden">↗</span>
        </button>
      </div>
    </header>
  )
}