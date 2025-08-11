import React, { useEffect } from 'react'

export default function GameOverlay({ activeGame, iframeRef, onReload, onClose }){
  // esc to close within overlay lifecycle
  useEffect(()=>{
    const onKey = (e)=>{ if(e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if(!activeGame) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
      <div className="w-[92%] h-[86%] bg-[#060609] rounded-2xl border border-white/5 shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center font-bold">G</div>
            <div>
              <div className="font-bold text-lg">{activeGame.title}</div>
              <div className="text-xs text-white/60">{activeGame.desc}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={onReload} className="px-3 py-1 rounded bg-white/5">New Game</button>
            <button onClick={onClose} className="px-3 py-1 rounded bg-red-700">x</button>
          </div>
        </div>

        <div className="flex-1 relative">
          <iframe ref={iframeRef} title={activeGame.id} src="about:blank" className="w-full h-full border-0 bg-black" sandbox="allow-scripts allow-same-origin allow-forms allow-modals"></iframe>
        </div>

        <div className="p-3 border-t border-white/5 flex items-center justify-between gap-4">
          <div className="text-xs text-white/60">Press ESC to close overlay — touch friendly controls inside games</div>
          <div className="flex items-center gap-2">
            <button onClick={()=>{ iframeRef.current && iframeRef.current.contentWindow && iframeRef.current.contentWindow.postMessage({cmd:'new-game'}, '*') }} className="px-3 py-1 border rounded">Send New</button>
            <button onClick={()=>{ iframeRef.current && iframeRef.current.contentWindow && iframeRef.current.contentWindow.postMessage({cmd:'toggle-sound'}, '*') }} className="px-3 py-1 border rounded">Toggle Sound</button>
          </div>
        </div>
      </div>
    </div>
  )
}

