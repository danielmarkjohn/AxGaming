import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import Sidebar from '../@components/Sidebar'
import HeaderBar from '../@components/HeaderBar'
import GameGrid from '../@components/GamesComponents/GameGrid'
import GameOverlay from '../@components/GamesComponents//GameOverlay'
import { GAMES_CONFIG, DASHBOARD_CONFIG } from '../@config/games'

export default function GameDashboard({ onBack }){
  const [activeGame, setActiveGame] = useState(null)
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
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
    setSidebarOpen(false) // Close sidebar on mobile when launching
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
    <div className="min-h-screen p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden">
          <HeaderBar
            activeGame={activeGame}
            onToggleOverlay={()=> activeGame ? setOverlayOpen(v=>!v) : null}
            onBack={onBack}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            sidebarOpen={sidebarOpen}
          />

          <main className="mt-4 p-4 sm:p-6 bg-[linear-gradient(180deg,#07070a,transparent)] rounded-2xl border border-white/5 shadow-xl">
            <GameGrid
              games={GAMES_CONFIG}
              onStart={launch}
              onNewGame={(g)=>{ setActiveGame(g); reloadGame(g); setOverlayOpen(true) }}
              onOpen={(g)=> window.open(g.path, '_blank')}
              mobile={true}
            />
          </main>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6">

          <main className="col-span-9 p-6 bg-[linear-gradient(180deg,#07070a,transparent)] rounded-2xl border border-white/5 shadow-xl">
            <HeaderBar
              activeGame={activeGame}
              onToggleOverlay={()=> activeGame ? setOverlayOpen(v=>!v) : null}
              onBack={onBack}
            />

            <GameGrid
              games={GAMES_CONFIG}
              onStart={launch}
              onNewGame={(g)=>{ setActiveGame(g); reloadGame(g); setOverlayOpen(true) }}
              onOpen={(g)=> window.open(g.path, '_blank')}
            />
          </main>
        </div>

        {overlayOpen && activeGame && (
          <GameOverlay
            activeGame={activeGame}
            iframeRef={iframeRef}
            onReload={()=> reloadGame()}
            onClose={closeOverlay}
          />
        )}
      </div>
    </div>
  )
}
