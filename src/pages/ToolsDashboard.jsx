import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import ToolsSidebar from '../@components/ToolsComponents/ToolsSidebar'
import ToolsHeaderBar from '../@components/ToolsComponents/ToolsHeaderBar'
import ToolsGrid from '../@components/ToolsComponents/ToolsGrid'
import ToolsOverlay from '../@components/ToolsComponents/ToolsOverlay'
import { TOOLS_CONFIG, TOOLS_DASHBOARD_CONFIG } from '../@config/tools'

export default function ToolsDashboard({ onBack }) {
  const [activeTool, setActiveTool] = useState(null)
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const iframeRef = useRef(null)

  useEffect(() => {
    function onMsg(e) {
      if (!e.data) return
      if (e.data.cmd === 'request-reload') reloadTool()
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [])

  function launch(tool) {
    setActiveTool(tool)
    setOverlayOpen(true)
    setSidebarOpen(false) // Close sidebar on mobile when launching
    setTimeout(() => {
      if (iframeRef.current) {
        iframeRef.current.src = tool.path + '?rand=' + Date.now()
      }
    }, TOOLS_DASHBOARD_CONFIG.IFRAME_LOAD_DELAY)
  }

  function reloadTool(toolArg) {
    const t = toolArg || activeTool
    if (iframeRef.current && t) {
      const base = t.path
      iframeRef.current.src = base + (base.includes('?') ? '&' : '?') + 'rand=' + Date.now()
    }
  }

  function closeOverlay() {
    if (iframeRef.current) iframeRef.current.src = 'about:blank'
    setOverlayOpen(false)
    setActiveTool(null)
  }

  function toggleOverlay() {
    if (activeTool) {
      setOverlayOpen(v => !v)
    }
  }

  // Close overlay on ESC key
  useEffect(() => {
    if (!overlayOpen) return
    const onKey = (e) => { 
      if (e.key === 'Escape') closeOverlay() 
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [overlayOpen])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (!sidebarOpen) return
    const handleClickOutside = (e) => {
      if (e.target.closest('.sidebar-content')) return
      setSidebarOpen(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [sidebarOpen])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#05060a] to-[#0b0d12] text-white">
      <div className="max-w-7xl mx-auto p-9 sm:p-6">
        
        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden">
          <ToolsHeaderBar
            activeTool={activeTool}
            onToggleOverlay={toggleOverlay}
            onBack={onBack}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            sidebarOpen={sidebarOpen}
          />

          <main className="mt-4">
            <div className="p-4 sm:p-6 bg-gradient-to-b from-[#07070a]/80 to-transparent rounded-2xl border border-white/5 shadow-xl backdrop-blur-sm">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-white mb-2">Tools Dashboard</h1>
                <p className="text-gray-400">Tools to make your life easy!</p>
              </div>
              
              <ToolsGrid
                tools={TOOLS_CONFIG}
                onStart={launch}
                onReload={(t) => { setActiveTool(t); reloadTool(t); setOverlayOpen(true) }}
                onOpen={(t) => window.open(t.path, '_blank')}
                mobile={true}
              />
            </div>
          </main>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6">
          <main className="col-span-11">
            <div className="p-6 bg-gradient-to-b from-[#07070a]/80 to-transparent rounded-2xl border border-white/5 shadow-xl backdrop-blur-sm">
              <ToolsHeaderBar
                activeTool={activeTool}
                onToggleOverlay={toggleOverlay}
                onBack={onBack}
                desktop={true}
              />

              <div className="mt-6">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-white mb-2">Tools Dashboard</h1>
                  <p className="text-gray-400">Professional tools and utilities</p>
                </div>
                
                <ToolsGrid
                  tools={TOOLS_CONFIG}
                  onStart={launch}
                  onReload={(t) => { setActiveTool(t); reloadTool(t); setOverlayOpen(true) }}
                  onOpen={(t) => window.open(t.path, '_blank')}
                />
              </div>
            </div>
          </main>
        </div>

        {/* Tool Overlay */}
        {overlayOpen && activeTool && (
          <ToolsOverlay
            activeTool={activeTool}
            iframeRef={iframeRef}
            onReload={() => reloadTool()}
            onClose={closeOverlay}
            onToggle={toggleOverlay}
          />
        )}
      </div>
    </div>
  )
}
