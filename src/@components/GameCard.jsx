import React, { useState } from 'react'

export default function GameCard({ game, onStart, onNewGame, onOpen }){
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  const handleImageError = (e) => {
    setImageError(true)
    // Fallback to a default image or Unsplash
    e.currentTarget.src = `https://source.unsplash.com/featured/720x320/?gaming,${game.id}`
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <article className="card-3d rounded-2xl p-4 bg-gradient-to-br from-gray-900/30 to-transparent border border-white/5 hover:scale-105 transform-gpu transition-all duration-300 cursor-pointer group">
      <div className="card-inner">
        <div className="relative rounded-xl overflow-hidden h-40">
          <img 
            src={game.img}
            alt={game.title} 
            loading="lazy" 
            decoding="async"
            onError={handleImageError}
            onLoad={handleImageLoad}
            className={`w-full h-full object-cover brightness-90 transition-all duration-300 group-hover:brightness-100 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
              <div className="text-white/40 text-sm">Loading...</div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/40 transition-all duration-300"></div>
          <div className="absolute left-4 bottom-4 transform transition-transform duration-300 group-hover:translate-y-[-2px]">
            <div className="text-xs text-white/60 font-mono">{game.id.toUpperCase()}</div>
            <div className="text-lg font-bold text-white">{game.title}</div>
          </div>
        </div>

        <p className="text-sm text-white/60 mt-3 group-hover:text-white/80 transition-colors duration-300">{game.desc}</p>

        <div className="mt-4 flex items-center gap-3">
          <button 
            onClick={(e) => { e.stopPropagation(); onStart(game); }} 
            className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            Play
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onNewGame(game); }} 
            className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded text-sm text-white/80 hover:text-white transition-all duration-200 cursor-pointer"
          >
            New
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onOpen(game); }} 
            className="px-3 py-2 bg-white/5 hover:bg-white/15 rounded text-sm text-white/60 hover:text-white/80 transition-all duration-200 cursor-pointer"
          >
            Open
          </button>
        </div>

        <div className="mt-4 text-xs text-white/50">Made by Daniel Mark</div>
      </div>
    </article>
  )
}

