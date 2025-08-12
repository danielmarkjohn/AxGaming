import React from 'react'
import { X, Wrench } from 'lucide-react'

export default function ToolsSidebar({ tools, onLaunch, mobile, onClose }) {
  const user = {
    firstName: 'Daniel',
    lastName: 'Mark',
    role: 'Power User'
  }
  
  const userInitials = `${user.firstName[0]}${user.lastName[0]}`

  return (
    <aside className={`
      ${mobile 
        ? 'h-full bg-[linear-gradient(180deg,#07070a,transparent)] border-r border-white/5' 
        : 'col-span-3'
      } 
      glass hud-glow rounded-2xl p-4 border border-white/5
    `}>
      {mobile && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Tools</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-gradient-to-br from-green-600 to-teal-500 flex items-center justify-center font-extrabold text-sm sm:text-base">
          {userInitials}
        </div>
        <div>
          <div className="text-sm text-green-300 font-semibold">{user.firstName} {user.lastName}</div>
          <div className="text-xs text-white/70">{user.role}</div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white/80 mb-3">Quick Launch</h3>
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => onLaunch(tool)}
            className="w-full p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all duration-200 text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-xs sm:text-sm">
                <Wrench className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white group-hover:text-green-300 transition-colors truncate">
                  {tool.title}
                </div>
                <div className="text-xs text-white/60 truncate">{tool.desc}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 p-3 bg-white/5 rounded-xl border border-white/5">
        <div className="text-xs text-white/60 mb-2">Stats</div>
        <div className="flex justify-between text-sm">
          <span className="text-white/80">Tools</span>
          <span className="text-white font-semibold">{tools.length}</span>
        </div>
      </div>
    </aside>
  )
}
