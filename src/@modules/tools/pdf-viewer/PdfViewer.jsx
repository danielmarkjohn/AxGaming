import React, { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Upload } from 'lucide-react'

export default function PdfViewer() {
  const [pdfFile, setPdfFile] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [scale, setScale] = useState(1.0)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)
  const canvasRef = useRef(null)

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file || file.type !== 'application/pdf') return

    setLoading(true)
    const fileReader = new FileReader()
    fileReader.onload = async (event) => {
      try {
        const typedArray = new Uint8Array(event.target.result)
        // Note: This is a simplified version. Real PDF.js integration needed
        setPdfFile({
          name: file.name,
          data: typedArray,
          url: URL.createObjectURL(file)
        })
        setTotalPages(5) // Placeholder
        setCurrentPage(1)
      } catch (error) {
        console.error('Error loading PDF:', error)
      }
      setLoading(false)
    }
    fileReader.readAsArrayBuffer(file)
  }

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">PDF Viewer</h2>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              <Upload size={16} />
              Upload PDF
            </button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
          />

          {pdfFile && (
            <div className="flex items-center justify-between mb-4 p-3 bg-surface rounded">
              <span className="text-sm">{pdfFile.name}</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage <= 1}
                    className="p-1 hover:bg-white/10 rounded disabled:opacity-50"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-sm">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage >= totalPages}
                    className="p-1 hover:bg-white/10 rounded disabled:opacity-50"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setScale(Math.max(0.5, scale - 0.1))}
                    className="p-1 hover:bg-white/10 rounded"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <span className="text-sm">{Math.round(scale * 100)}%</span>
                  <button
                    onClick={() => setScale(Math.min(3, scale + 0.1))}
                    className="p-1 hover:bg-white/10 rounded"
                  >
                    <ZoomIn size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {pdfFile && (
          <div className="panel panel-border p-4 rounded-xl">
            <div className="flex justify-center">
              <iframe
                src={pdfFile.url}
                className="w-full h-[600px] border border-white/10 rounded"
                title="PDF Viewer"
              />
            </div>
          </div>
        )}

        {!pdfFile && (
          <div className="panel panel-border p-8 rounded-xl text-center">
            <div className="text-muted mb-4">
              <Upload size={48} className="mx-auto mb-2 opacity-50" />
              <p>Upload a PDF file to start viewing</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}