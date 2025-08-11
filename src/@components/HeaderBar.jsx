import React from 'react'

export default function HeaderBar({ activeGame, onToggleOverlay }){
  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-wide">Games Center</h2>
        <div className="text-sm text-white/60">Launch & manage your games</div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={()=> activeGame ? onToggleOverlay() : null}
          disabled={!activeGame}
          className="px-3 py-2 border rounded text-sm border-white/5 disabled:opacity-50 disabled:cursor-not-allowed"
        >Overlay</button>
        <button
          className="px-3 py-2 bg-white/5 rounded"
          onClick={()=>{ if(activeGame) window.open(activeGame.path, '_blank')}}
        >Pop Out</button>
      </div>
    </header>
  )
}

