import React, { useState } from 'react'
import HomePage from './pages/HomePage'
import GameDashboard from './pages/GameDashboard'
import ToolsDashboard from './pages/ToolsDashboard'

export default function App(){
  const [currentPage, setCurrentPage] = useState('home')

  const navigate = (page) => {
    setCurrentPage(page)
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'games':
        return <GameDashboard onBack={() => navigate('home')} />
      case 'tools':
        return <ToolsDashboard onBack={() => navigate('home')} />
      case 'wallpapers':
        return <div className="min-h-screen p-6 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Wallpapers</h2>
            <p className="text-white/60 mb-6">Coming soon...</p>
            <button 
              onClick={() => navigate('home')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Home
            </button>
          </div>
        </div>
      case 'widgets':
        return <div className="min-h-screen p-6 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Widgets</h2>
            <p className="text-white/60 mb-6">Coming soon...</p>
            <button 
              onClick={() => navigate('home')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Home
            </button>
          </div>
        </div>
      default:
        return <HomePage onNavigate={navigate} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#05060a] to-[#0b0d12]">
      {renderPage()}
    </div>
  )
}
