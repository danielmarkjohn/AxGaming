import React, { useMemo, useState } from 'react'

export default function RegexTester() {
  const [pattern, setPattern] = useState('foo')
  const [flags, setFlags] = useState('g')
  const [text, setText] = useState('foo bar\nFoo fighters\nfood
')
  const [error, setError] = useState('')

  const { regex, matches } = useMemo(() => {
    try {
      const r = new RegExp(pattern, flags)
      setError('')
      const m = []
      let match
      if (flags.includes('g')) {
        while ((match = r.exec(text)) !== null) {
          m.push({ index: match.index, text: match[0] })
          if (match[0] === '') r.lastIndex++ // avoid infinite loop on empty match
        }
      } else {
        match = r.exec(text)
        if (match) m.push({ index: match.index, text: match[0] })
      }
      return { regex: r, matches: m }
    } catch (e) {
      setError(String(e.message || e))
      return { regex: null, matches: [] }
    }
  }, [pattern, flags, text])

  const highlighted = useMemo(() => {
    if (!regex) return text
    try {
      const parts = []
      let last = 0
      matches.forEach((m, i) => {
        parts.push(text.slice(last, m.index))
        parts.push(`[[HIGHLIGHT:${i}]]`)
        last = m.index + m.text.length
      })
      parts.push(text.slice(last))
      // Convert tokens to spans
      let out = parts.join('')
      matches.forEach((m, i) => {
        const span = `<span class="bg-yellow-600/40 text-yellow-200 border border-yellow-500/40 rounded px-0.5">${escapeHtml(m.text)}</span>`
        out = out.replace(`[[HIGHLIGHT:${i}]]`, span)
      })
      return out
    } catch {
      return text
    }
  }, [text, matches, regex])

  const escapeHtml = (s) => s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  return (
    <div className="h-full p-6 text-white overflow-auto">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="bg-gray-900 rounded-xl border border-white/10 p-4">
          <h2 className="text-xl font-semibold mb-3">Regex Tester</h2>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-3">
            <input
              value={pattern}
              onChange={(e)=>setPattern(e.target.value)}
              placeholder="Pattern (without / /)"
              className="md:col-span-4 bg-black/40 border border-white/10 rounded-lg p-3 font-mono"
            />
            <input
              value={flags}
              onChange={(e)=>setFlags(e.target.value)}
              placeholder="Flags (g i m s u y)"
              className="md:col-span-2 bg-black/40 border border-white/10 rounded-lg p-3 font-mono"
            />
          </div>
          {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
          <textarea
            value={text}
            onChange={(e)=>setText(e.target.value)}
            rows={10}
            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 font-mono"
          />
        </div>

        <div className="bg-gray-900 rounded-xl border border-white/10 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Matches</h3>
            <div className="text-sm text-white/60">{matches.length} match(es)</div>
          </div>
          <div className="bg-gray-950 rounded p-3 font-mono whitespace-pre-wrap break-words" dangerouslySetInnerHTML={{ __html: highlighted }} />
          {matches.length > 0 && (
            <div className="mt-3 text-sm text-white/70">
              {matches.map((m, i) => (
                <div key={i}>#{i+1} @ {m.index}: "{m.text}"</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

