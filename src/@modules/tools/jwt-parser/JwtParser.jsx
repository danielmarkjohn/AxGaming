import React, { useMemo, useState } from 'react'

function parseJwt(token) {
  const parts = token.split('.')
  if (parts.length !== 3) throw new Error('Invalid JWT')
  const decode = (str) => JSON.parse(atob(str.replace(/-/g, '+').replace(/_/g, '/')))
  return {
    header: decode(parts[0]),
    payload: decode(parts[1]),
    signature: parts[2]
  }
}

export default function JwtParser() {
  const [token, setToken] = useState('')
  const [error, setError] = useState('')

  const parsed = useMemo(() => {
    if (!token.trim()) return null
    try {
      setError('')
      return parseJwt(token.trim())
    } catch (e) {
      setError(String(e.message || e))
      return null
    }
  }, [token])

  return (
    <div className="h-full p-6 text-white overflow-auto">
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="bg-gray-900 rounded-xl border border-white/10 p-4">
          <h2 className="text-xl font-semibold mb-3">JWT Parser</h2>
          <textarea
            value={token}
            onChange={(e)=>setToken(e.target.value)}
            placeholder="Paste a JWT token here"
            rows={5}
            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 font-mono"
          />
          {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
        </div>

        {parsed && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-xl border border-white/10 p-4">
              <h3 className="font-semibold mb-2">Header</h3>
              <pre className="bg-gray-950 rounded p-3 text-sm overflow-auto">{JSON.stringify(parsed.header, null, 2)}</pre>
            </div>
            <div className="bg-gray-900 rounded-xl border border-white/10 p-4">
              <h3 className="font-semibold mb-2">Payload</h3>
              <pre className="bg-gray-950 rounded p-3 text-sm overflow-auto">{JSON.stringify(parsed.payload, null, 2)}</pre>
            </div>
            <div className="bg-gray-900 rounded-xl border border-white/10 p-4 md:col-span-2">
              <h3 className="font-semibold mb-2">Signature</h3>
              <div className="bg-gray-950 rounded p-3 font-mono text-sm break-all">{parsed.signature}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

