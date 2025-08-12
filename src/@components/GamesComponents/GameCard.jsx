import React, { useState } from 'react'
import { Play, RotateCcw, ExternalLink } from 'lucide-react'

export default function GameCard({ game, onStart, onNewGame, onOpen, mobile }) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageError = (e) => {
    e.target.src = `https://source.unsplash.com/400x240/?${game.title.toLowerCase().replace(/\s+/g, ',')}`
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  return (
    <article className={`
      card-3d rounded-2xl p-3 sm:p-4 bg-gradient-to-br from-gray-900/30 to-transparent 
      border border-white/5 hover:scale-105 transform-gpu transition-all duration-300 
      cursor-pointer group
      ${mobile ? 'hover:scale-102' : ''}
    `}>
      <div className="card-inner">
        <div className={`relative rounded-xl overflow-hidden ${mobile ? 'h-32 sm:h-40' : 'h-40'}`}>
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
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-2 left-2 right-2">
            <h3 className={`font-bold text-white mb-1 ${mobile ? 'text-sm' : 'text-lg'}`}>
              {game.title}
            </h3>
            <p className={`text-white/80 ${mobile ? 'text-xs' : 'text-sm'} line-clamp-2`}>
              {game.desc}
            </p>
          </div>
        </div>

        <div className={`flex gap-2 mt-3 ${mobile ? 'flex-col sm:flex-row' : ''}`}>
          <button
            onClick={(e) => { e.stopPropagation(); onStart(game); }}
            className={`
              flex-1 flex items-center justify-center gap-2 
              bg-gray-800 hover:bg-blue-700 text-white rounded-lg 
              transition-colors font-medium
              ${mobile ? 'py-2 px-3 text-sm' : 'py-2.5 px-4'}
            `}
          >
            <Play className={mobile ? 'w-3 h-3' : 'w-4 h-4'} />
            <span className={mobile ? 'text-xs sm:text-sm' : ''}>Play</span>
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); onOpen(game); }}
            className={`
              flex items-center justify-center gap-2 
              bg-white/10 hover:bg-white/20 text-white rounded-lg 
              transition-colors
              ${mobile ? 'py-2 px-3 flex-1 sm:flex-none sm:px-3' : 'py-2.5 px-3'}
            `}
          >
            <ExternalLink className={mobile ? 'w-3 h-3' : 'w-4 h-4'} />
            {!mobile && <span className="sr-only">Open</span>}
            {mobile && <span className="text-xs sm:hidden">Open</span>}
          </button>
        </div>
      </div>
    </article>
  )
}
