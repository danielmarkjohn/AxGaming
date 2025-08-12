import React, { useState, useEffect } from 'react'
import { X, RotateCcw, Maximize2, Minimize2 } from 'lucide-react'

export default function ToolsOverlay({ activeTool, iframeRef, onReload, onClose, onToggle }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    
    const iframe = iframeRef.current
    if (!iframe) return

    const handleLoad = () => {
      setIsLoading(false)
    }

    const handleError = () => {
      setIsLoading(false)
    }

    iframe.addEventListener('load', handleLoad)
    iframe.addEventListener('error', handleError)

    // Fallback timeout in case load event doesn't fire
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => {
      iframe.removeEventListener('load', handleLoad)
      iframe.removeEventListener('error', handleError)
      clearTimeout(timeout)
    }
  }, [activeTool, iframeRef])

  // Reset loading when tool changes
  useEffect(() => {
    setIsLoading(true)
  }, [activeTool?.id])

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 bg-black/50 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-xs sm:text-sm font-bold">
            {activeTool.title[0]}
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-white">{activeTool.title}</h3>
            <p className="text-xs text-white/60 hidden sm:block">{activeTool.desc}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsLoading(true)
              onReload()
            }}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Reload Tool"
          >
            <RotateCcw className="w-4 h-4 text-white/70" />
          </button>
          
          <button
            onClick={() => window.open(activeTool.path, '_blank')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Open in New Tab"
          >
            <Maximize2 className="w-4 h-4 text-white/70" />
          </button>
          
          <button
            onClick={onToggle}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors lg:hidden"
            title="Minimize"
          >
            <Minimize2 className="w-4 h-4 text-white/70" />
          </button>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Close Tool"
          >
            <X className="w-4 h-4 text-white/70" />
          </button>
        </div>
      </div>

      {/* Tool Content */}
      <div className="flex-1 relative">
        <iframe
          ref={iframeRef}
          className="w-full h-full border-0"
          title={activeTool.title}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          loading="lazy"
        />
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
            <div className="bg-black/90 px-6 py-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 text-white">
                <div className="w-5 h-5 border-2 border-white/30 border-t-green-500 rounded-full animate-spin"></div>
                <span className="text-sm font-medium">Loading {activeTool.title}...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-2 bg-black/30 border-t border-white/10">
        <div className="flex items-center justify-between text-xs text-white/60">
          <span>Tool: {activeTool.title}</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  )
}
