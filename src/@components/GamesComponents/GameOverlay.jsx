import React from 'react'
import { X, RotateCcw, Maximize2 } from 'lucide-react'

export default function GameOverlay({ activeGame, iframeRef, onReload, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 bg-black/50 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold">
            {activeGame.title[0]}
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-white">{activeGame.title}</h3>
            <p className="text-xs text-white/60 hidden sm:block">{activeGame.desc}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onReload}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Reload Game"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
          </button>
          
          <button
            onClick={() => window.open(activeGame.path, '_blank')}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Open in New Tab"
          >
            <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
          </button>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Close"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-white/70" />
          </button>
        </div>
      </div>

      {/* Game Frame */}
      <div className="flex-1 p-2 sm:p-4">
        <iframe
          ref={iframeRef}
          className="w-full h-full rounded-lg border border-white/10 bg-black"
          title={activeGame.title}
          allow="fullscreen; gamepad; microphone; camera"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        />
      </div>
    </div>
  )
}
