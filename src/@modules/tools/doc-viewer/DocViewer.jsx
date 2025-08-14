import React, { useState, useRef } from 'react'
import { Upload, FileText, Download } from 'lucide-react'
import mammoth from 'mammoth'

export default function DocViewer() {
  const [document, setDocument] = useState(null)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setLoading(true)
    setError('')

    try {
      if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // Handle .docx files
        const arrayBuffer = await file.arrayBuffer()
        const result = await mammoth.convertToHtml({ arrayBuffer })
        setContent(result.value)
      } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        // Handle text files
        const text = await file.text()
        setContent(`<pre>${text}</pre>`)
      } else if (file.type === 'text/markdown' || file.name.endsWith('.md')) {
        // Handle markdown files
        const text = await file.text()
        setContent(`<pre>${text}</pre>`)
      } else {
        throw new Error('Unsupported file type')
      }

      setDocument({
        name: file.name,
        type: file.type,
        size: file.size
      })
    } catch (err) {
      setError('Failed to load document: ' + err.message)
    }

    setLoading(false)
  }

  const downloadAsHtml = () => {
    const blob = new Blob([content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${document.name}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Document Viewer</h2>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
            >
              <Upload size={16} />
              Upload Document
            </button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".docx,.txt,.md"
            onChange={handleFileUpload}
            className="hidden"
          />

          {document && (
            <div className="flex items-center justify-between mb-4 p-3 bg-surface rounded">
              <div className="flex items-center gap-2">
                <FileText size={16} />
                <span className="text-sm">{document.name}</span>
                <span className="text-xs text-muted">({(document.size / 1024).toFixed(1)} KB)</span>
              </div>
              <button
                onClick={downloadAsHtml}
                className="flex items-center gap-1 px-2 py-1 text-xs hover:bg-white/10 rounded"
              >
                <Download size={12} />
                Export HTML
              </button>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded text-red-300 text-sm">
              {error}
            </div>
          )}
        </div>

        {loading && (
          <div className="panel panel-border p-8 rounded-xl text-center">
            <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
            <p>Loading document...</p>
          </div>
        )}

        {content && !loading && (
          <div className="panel panel-border p-6 rounded-xl">
            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        )}

        {!document && !loading && (
          <div className="panel panel-border p-8 rounded-xl text-center">
            <div className="text-muted mb-4">
              <FileText size={48} className="mx-auto mb-2 opacity-50" />
              <p>Upload a document to start viewing</p>
              <p className="text-sm mt-2">Supports: .docx, .txt, .md files</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}