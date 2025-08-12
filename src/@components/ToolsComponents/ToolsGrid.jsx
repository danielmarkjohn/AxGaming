import React from 'react'
import ToolCard from './ToolCard'

export default function ToolsGrid({ tools, onStart, onReload, onOpen, mobile }){
  return (
    <section className={`
      grid gap-4 sm:gap-6
      ${mobile 
        ? 'grid-cols-1 sm:grid-cols-2' 
        : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'
      }
    `}>
      {tools.map(t => (
        <ToolCard
          key={t.id}
          tool={t}
          onStart={onStart}
          onReload={onReload}
          onOpen={onOpen}
          mobile={mobile}
        />
      ))}
    </section>
  )
}
