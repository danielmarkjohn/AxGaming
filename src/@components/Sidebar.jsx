import React from 'react'

export default function Sidebar({ games, onLaunch }){
  // User configuration
  const user = {
    firstName: 'Daniel',
    lastName: 'Mark',
    title: 'Gaming Pro',
    role: 'Gamer'
  }
  
  // Generate initials from first and last name
  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }
  
  const userInitials = getInitials(user.firstName, user.lastName)

  return (
    <aside className="col-span-3 glass hud-glow rounded-2xl p-4 border border-white/5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-md bg-gradient-to-br from-red-600 to-pink-500 flex items-center justify-center font-extrabold">
          {userInitials}
        </div>
        <div>
          <div className="text-sm text-red-300 font-semibold">{user.firstName} {user.lastName}</div>
          <div className="text-xs text-white/70">{user.role}</div>
        </div>
      </div>

      <div className="mt-6 text-xs text-white/60">Installed</div>
      <div className="mt-3 space-y-3">
        {games.map(g => (
          <div key={g.id} className="flex items-center justify-between p-3 rounded-md bg-gradient-to-b from-black/20 to-transparent border border-white/10">
            <div>
              <div className="font-semibold text-sm">{g.title}</div>
              <div className="text-[12px] text-white/60">{g.desc}</div>
            </div>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => onLaunch(g)}
                className="text-xs underline text-white/70 hover:text-white cursor-pointer"
              >
                Launch
              </button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

