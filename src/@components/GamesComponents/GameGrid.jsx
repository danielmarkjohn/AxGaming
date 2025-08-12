import React from 'react'
import GameCard from './GameCard'

export default function GameGrid({ games, onStart, onNewGame, onOpen, mobile }){
  return (
    <section className={`
      grid gap-4 sm:gap-6
      ${mobile 
        ? 'grid-cols-1 sm:grid-cols-2' 
        : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
      }
    `}>
      {games.map(g => (
        <GameCard
          key={g.id}
          game={g}
          onStart={onStart}
          onNewGame={onNewGame}
          onOpen={onOpen}
          mobile={mobile}
        />
      ))}
    </section>
  )
}

