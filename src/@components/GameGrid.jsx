import React from 'react'
import GameCard from './GameCard'

export default function GameGrid({ games, onStart, onNewGame, onOpen }){
  return (
    <section className="grid grid-cols-3 gap-6">
      {games.map(g => (
        <GameCard
          key={g.id}
          game={g}
          onStart={onStart}
          onNewGame={onNewGame}
          onOpen={onOpen}
        />
      ))}
    </section>
  )
}

