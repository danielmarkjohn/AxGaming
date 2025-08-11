import React from 'react'
import { useState, useRef, useEffect } from 'react'
import Sidebar from '../@components/Sidebar'
import HeaderBar from '../@components/HeaderBar'
import GameGrid from '../@components/GameGrid'
import GameOverlay from '../@components/GameOverlay'
import { GAMES_CONFIG, DASHBOARD_CONFIG } from '../@config/games'

export default function GameDashboard(){
  const [activeGame, setActiveGame] = useState(null)
  const [overlayOpen, setOverlayOpen] = useState(false)
  const iframeRef = useRef(null)

  useEffect(()=>{
    function onMsg(e){
      if(!e.data) return
      if(e.data.cmd === 'request-new-game') reloadGame()
    }
    window.addEventListener('message', onMsg)
    return ()=> window.removeEventListener('message', onMsg)
  },[])

  function launch(game){
    setActiveGame(game)
    setOverlayOpen(true)
    setTimeout(()=>{
      if(iframeRef.current) iframeRef.current.src = game.path + '?rand=' + Date.now()
    }, DASHBOARD_CONFIG.IFRAME_LOAD_DELAY)
  }

  function reloadGame(gameArg){
    const g = gameArg || activeGame
    if(iframeRef.current && g){
      const base = g.path
      iframeRef.current.src = base + (base.includes('?') ? '&' : '?') + 'rand=' + Date.now()
    }
  }

  function closeOverlay(){
    if(iframeRef.current) iframeRef.current.src = 'about:blank'
    setOverlayOpen(false)
    setActiveGame(null)
  }

  // Close overlay on ESC key
  useEffect(()=>{
    if(!overlayOpen) return;
    const onKey = (e)=>{ if(e.key === 'Escape') closeOverlay(); };
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  }, [overlayOpen]);

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
      <Sidebar games={GAMES_CONFIG} onLaunch={launch} />

      <main className="col-span-9 p-6 bg-[linear-gradient(180deg,#07070a,transparent)] rounded-2xl border border-white/5 shadow-xl">
        <HeaderBar
          activeGame={activeGame}
          onToggleOverlay={()=> activeGame ? setOverlayOpen(v=>!v) : null}
        />

        <GameGrid
          games={GAMES_CONFIG}
          onStart={launch}
          onNewGame={(g)=>{ setActiveGame(g); reloadGame(g); setOverlayOpen(true) }}
          onOpen={(g)=> window.open(g.path, '_blank')}
        />

        {overlayOpen && activeGame && (
          <GameOverlay
            activeGame={activeGame}
            iframeRef={iframeRef}
            onReload={()=> reloadGame()}
            onClose={closeOverlay}
          />
        )}
      </main>
    </div>
  )
}
