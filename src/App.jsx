import React from 'react'
import HomePage from './pages/HomePage'

import ToolPage from './pages/ToolPage'

export default function App({ hash }){
  // hash-based routing: #/ (home), #/tools/:id (tool)
  const route = (hash || '#/').replace(/^#/, '')

  if (route.startsWith('/tools/')) {
    return <ToolPage />
  }

  // Home shows all tools and search; dashboard can still be reached if needed later
  return (
    <div className="min-h-screen app-bg">
      <HomePage onNavigate={() => { window.location.hash = '#/tools' }} />
    </div>
  )
}
