import React, { useState, useRef, useEffect } from 'react'

const games = [
  { id: 'snake', title: 'Snake Game', path: '/games/snake/index.html', desc: 'Fast arcade snake — mobile-ready', img: 'https://source.unsplash.com/800x500/?neon,grid' },
  { id: 'triad', title: 'Tic Tac Toe', path: '/games/triad/index.html', desc: 'Unbeatable AI & local 2-player', img: 'https://source.unsplash.com/800x500/?game-controller' },
  { id: 'sudoku', title: 'Sudoku', path: '/games/sudoko/index.html', desc: 'Three difficulties — confetti!', img: 'https://source.unsplash.com/800x500/?cyberpunk,city' }
]

export default function GameDashboard(){
  const [activeGame, setActiveGame] = useState(null)
  const [overlayOpen, setOverlayOpen] = useState(false)
  const iframeRef = useRef(null)

  useEffect(()=>{
    function onMsg(e){
      // simple handler for postMessage from games
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
    },50)
  }

  function reloadGame(){
    if(iframeRef.current && activeGame){
      const base = activeGame.path
      iframeRef.current.src = base + (base.includes('?') ? '&' : '?') + 'rand=' + Date.now()
    }
  }

  function closeOverlay(){
    if(iframeRef.current) iframeRef.current.src = 'about:blank'
    setOverlayOpen(false)
    setActiveGame(null)
  }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
      <aside className="col-span-3 glass hud-glow rounded-2xl p-4 border border-white/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-md bg-gradient-to-br from-red-600 to-pink-500 flex items-center justify-center font-extrabold">CoD</div>
          <div>
            <div className="text-sm text-red-300 font-semibold">CALL OF DUTY DASH</div>
            <div className="text-xs text-white/70">Game Hub</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-xs text-white/60 mb-2">Profile</div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">D</div>
            <div>
              <div className="font-semibold">Daniel</div>
              <div className="text-[12px] text-white/60">Gamer • Level 27</div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-xs text-white/60">Installed</div>
        <div className="mt-3 space-y-3">
          {games.map(g => (
            <div key={g.id} className="flex items-center justify-between p-3 rounded-md bg-gradient-to-b from-black/20 to-transparent border border-white/3">
              <div>
                <div className="font-semibold text-sm">{g.title}</div>
                <div className="text-[12px] text-white/60">{g.desc}</div>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={()=>launch(g)} className="px-3 py-1 bg-red-600 rounded text-sm font-semibold">Launch</button>
                <a className="text-xs underline text-white/70" href={g.path} target="_blank" rel="noreferrer">Open</a>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="col-span-9 p-6 bg-[linear-gradient(180deg,#07070a,transparent)] rounded-2xl border border-white/5 shadow-xl">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold tracking-wide">Command Center</h2>
            <div className="text-sm text-white/60">Launch & manage your games — COD-style UI</div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 border rounded text-sm border-white/5">Overlay</button>
            <button className="px-3 py-2 bg-white/5 rounded" onClick={()=>{ if(activeGame) window.open(activeGame.path, '_blank')}}>Pop Out</button>
          </div>
        </header>

        <section className="grid grid-cols-3 gap-6">
          {games.map(g => (
            <article key={g.id} className="card-3d rounded-2xl p-4 bg-gradient-to-br from-gray-900/30 to-transparent border border-white/5 hover:scale-105 transform-gpu">
              <div className="card-inner smooth">
                <div className="relative rounded-xl overflow-hidden h-40">
                  <img src={g.img} alt={g.title} className="w-full h-full object-cover brightness-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute left-4 bottom-4">
                    <div className="text-xs text-white/60">{g.id.toUpperCase()}</div>
                    <div className="text-lg font-bold">{g.title}</div>
                  </div>
                </div>

                <p className="text-sm text-white/60 mt-3">{g.desc}</p>

                <div className="mt-4 flex items-center gap-3">
                  <button onClick={()=>launch(g)} className="px-3 py-2 bg-red-600 rounded font-semibold">Start</button>
                  <button onClick={()=>{ setActiveGame(g); reloadGame(); setOverlayOpen(true)}} className="px-3 py-2 border rounded">New Game</button>
                  <button onClick={()=>window.open(g.path, '_blank')} className="px-2 py-1 text-xs border rounded">Open</button>
                </div>

                <div className="mt-4 text-xs text-white/50">Mobile & tablet friendly • Touch-ready</div>
              </div>
            </article>
          ))}
        </section>

        {/* overlay */}
        {overlayOpen && activeGame && (
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
                  <button onClick={reloadGame} className="px-3 py-1 rounded bg-white/5">New Game</button>
                  <button onClick={()=>{ iframeRef.current && iframeRef.current.contentWindow && iframeRef.current.contentWindow.postMessage({cmd:'new-game'}, '*') }} className="px-3 py-1 border rounded">Send New</button>
                  <button onClick={closeOverlay} className="px-3 py-1 rounded bg-red-700">Close</button>
                </div>
              </div>

              <div className="flex-1 relative">
                <iframe ref={iframeRef} title={activeGame.id} src="about:blank" className="w-full h-full border-0 bg-black" sandbox="allow-scripts allow-same-origin allow-forms allow-modals"></iframe>
              </div>

              <div className="p-3 border-t border-white/5 flex items-center justify-between gap-4">
                <div className="text-xs text-white/60">Press ESC to close overlay — touch friendly controls inside games</div>
                <div className="flex items-center gap-2">
                  <button onClick={()=>{ iframeRef.current && iframeRef.current.contentWindow && iframeRef.current.contentWindow.postMessage({cmd:'toggle-sound'}, '*') }} className="px-3 py-1 border rounded">Toggle Sound</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
