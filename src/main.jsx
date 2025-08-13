import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// Simple hash-based router wrapper
function Router() {
  const [hash, setHash] = React.useState(window.location.hash || '#/')
  React.useEffect(() => {
    const onChange = () => setHash(window.location.hash || '#/')
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return <App hash={hash} />
}

createRoot(document.getElementById('root')).render(<Router />)
