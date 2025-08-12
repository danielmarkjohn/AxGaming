import React, { useState } from 'react'
import HomePage from './pages/HomePage'
import ToolsDashboard from './pages/ToolsDashboard'

export default function App(){
  const [currentPage, setCurrentPage] = useState('home')

  const navigate = (page) => {
    setCurrentPage(page)
  }

  const renderPage = () => {
    switch(currentPage) {
      case 'tools':
        return <ToolsDashboard onBack={() => navigate('home')} />
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
