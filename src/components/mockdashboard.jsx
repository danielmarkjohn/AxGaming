// GameDashboard.jsx
// Export default React component. Tailwind CSS utility classes are used for styling.
// Usage:
// - Place your built game folders under `/public/games/snake/index.html`,
//   `/public/games/triad/index.html`, `/public/games/trilevel/index.html` when running a React app.
// - This component shows a Call-of-Duty-style gaming dashboard and launches selected games in an overlay iframe.

import React, { useState, useRef, useEffect } from 'react';

export default function GameDashboard() {
  const games = [
    { id: 'snake', title: 'Serpent — Snake', path: '/games/snake/index.html', desc: 'Retro speed & particles — touch ready' },
    { id: 'triad', title: 'Triad — Tic Tac Toe', path: '/games/triad/index.html', desc: 'Minimax CPU, 2-player local' },
    { id: 'sudoku', title: 'TriLevel — Sudoku', path: '/games/trilevel/index.html', desc: 'Three difficulties, hints, confetti' }
  ];

  const [activeGame, setActiveGame] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);
  const iframeRef = useRef(null);
  const [quality, setQuality] = useState('high');

  useEffect(()=>{
    function onKey(e){
      if(e.key === 'Escape') closeOverlay();
    }
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  },[]);

  function openGame(game){
    // open overlay and set iframe src
    setActiveGame(game);
    setIsFullscreen(true);
    // small delay to allow overlay to render
    setTimeout(()=>{
      if(iframeRef.current) iframeRef.current.src = game.path + (game.path.includes('?') ? '&' : '?') + 'rand=' + Date.now();
    }, 50);
  }

  function startNewGame(){
    // reload iframe to force new seeded game
    if(iframeRef.current) {
      const base = activeGame.path;
      iframeRef.current.src = base + (base.includes('?') ? '&' : '?') + 'rand=' + Date.now();
    }
  }

  function closeOverlay(){
    if(iframeRef.current) iframeRef.current.src = 'about:blank';
    setActiveGame(null);
    setIsFullscreen(false);
  }

  function openInNewTab(){
    if(!activeGame) return;
    window.open(activeGame.path, '_blank');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#07060a] to-[#0f1116] text-white p-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        {/* Left sidebar - HUD */}
        <aside className={`col-span-3 bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-white/5 transition-all ${panelOpen ? 'translate-x-0' : '-translate-x-64'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-600 rounded-md flex items-center justify-center text-xl font-extrabold">CoD</div>
            <div>
              <div className="text-sm text-red-300 font-semibold">CALL OF DUTY DASH</div>
              <div className="text-xs text-white/70">Gaming Dashboard</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-xs text-white/60 mb-2">Profile</div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center">D</div>
              <div>
                <div className="font-semibold">Daniel</div>
                <div className="text-[12px] text-white/60">Level 27 — Gamer</div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-xs text-white/60 mb-2">Quick Settings</div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <div>Graphics</div>
                <select value={quality} onChange={e=>setQuality(e.target.value)} className="bg-transparent border border-white/5 rounded px-2 py-1 text-sm">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex items-center justify-between text-sm"><div>Fullscreen</div><button onClick={()=>setIsFullscreen(s=>!s)} className="px-2 py-1 rounded border border-white/5 text-sm">Toggle</button></div>
              <div className="flex items-center justify-between text-sm"><div>Panel</div><button onClick={()=>setPanelOpen(p=>!p)} className="px-2 py-1 rounded border border-white/5 text-sm">{panelOpen ? 'Hide' : 'Show'}</button></div>
            </div>
          </div>

          <div className="mt-6 text-xs text-white/60">Installed Games</div>
          <div className="mt-2 grid gap-2">
            {games.map(g=> (
              <div key={g.id} className="flex items-center justify-between p-2 rounded-md bg-white/2 border border-white/3">
                <div>
                  <div className="font-semibold text-sm">{g.title}</div>
                  <div className="text-[12px] text-white/60">{g.desc}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={()=>openGame(g)} className="px-3 py-1 bg-red-600 rounded text-sm font-semibold">Launch</button>
                  <a href={g.path} target="_blank" rel="noreferrer" className="text-xs underline text-white/70">Open</a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-xs text-white/60">Tips</div>
          <div className="text-[12px] mt-2 text-white/70">Use "New Game" inside the overlay to seed a fresh board. All titles are mobile responsive.</div>
        </aside>

        {/* Main area */}
        <main className="col-span-9 bg-[linear-gradient(180deg,#0b0b0b,transparent)] rounded-2xl p-6 border border-white/5 shadow-xl relative">
          <header className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold tracking-wide">Command Center</h2>
              <div className="text-sm text-white/60">Launch and manage your games</div>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-3 py-2 border rounded text-sm border-white/5">Overlay</button>
              <button onClick={()=>{ if(activeGame) openInNewTab(); }} className="px-3 py-2 bg-white/5 rounded">Open in Window</button>
            </div>
          </header>

          <section className="grid grid-cols-3 gap-4">
            {games.map(g => (
              <div key={g.id} className="bg-gradient-to-b from-gray-800/40 to-transparent p-4 rounded-2xl border border-white/5 hover:scale-[1.01] transition-transform">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white/60">{g.id.toUpperCase()}</div>
                    <div className="text-lg font-bold">{g.title}</div>
                  </div>
                  <div className="w-16 h-12 bg-gradient-to-br from-red-600 to-pink-500 rounded-md flex items-center justify-center">ICON</div>
                </div>

                <p className="text-sm text-white/60 mt-3">{g.desc}</p>

                <div className="mt-4 flex items-center gap-2">
                  <button onClick={()=>openGame(g)} className="px-3 py-2 bg-red-600 rounded font-semibold">Start</button>
                  <button onClick={()=>{ setActiveGame(g); startNewGame(); setIsFullscreen(true); }} className="px-3 py-2 border rounded">New Game</button>
                  <button onClick={()=>window.open(g.path, '_blank')} className="px-2 py-1 text-xs border rounded">Open</button>
                </div>

                <div className="mt-4 text-xs text-white/50">Playable on phone & tablet — responsive</div>
              </div>
            ))}
          </section>

          {/* Overlay for active game */}
          {isFullscreen && activeGame && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
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
                    <button onClick={startNewGame} className="px-3 py-1 rounded bg-white/5">New Game</button>
                    <button onClick={openInNewTab} className="px-3 py-1 rounded border">Pop Out</button>
                    <button onClick={closeOverlay} className="px-3 py-1 rounded bg-red-700">Close</button>
                  </div>
                </div>

                <div className="flex-1 relative">
                  <iframe ref={iframeRef} title={activeGame.id} src="about:blank" className="w-full h-full border-0 bg-black" sandbox="allow-scripts allow-same-origin allow-forms allow-modals"></iframe>
                </div>

                <div className="p-3 border-t border-white/5 flex items-center justify-between gap-4">
                  <div className="text-xs text-white/60">Press ESC to close overlay — touch friendly controls available inside games</div>
                  <div className="flex items-center gap-2">
                    <button onClick={()=>{ iframeRef.current && iframeRef.current.contentWindow && iframeRef.current.contentWindow.postMessage({cmd:'new-game'}, '*') }} className="px-3 py-1 border rounded">Send New</button>
                    <button onClick={()=> iframeRef.current && iframeRef.current.contentWindow && iframeRef.current.contentWindow.postMessage({cmd:'toggle-sound'}, '*')} className="px-3 py-1 border rounded">Toggle Sound</button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
