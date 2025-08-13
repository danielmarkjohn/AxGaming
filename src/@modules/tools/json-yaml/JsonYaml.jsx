import React, { useMemo, useState } from 'react'

// Minimal subset converter: handles simple objects/arrays/strings/numbers/booleans
// Not a full YAML spec implementation.
function jsonToYaml(data, indent = 0) {
  const pad = '  '.repeat(indent)
  if (Array.isArray(data)) {
    return data.map(item => `${pad}- ${typeof item === 'object' ? '\n' + jsonToYaml(item, indent + 1) : formatScalar(item)}`).join('\n')
  } else if (data && typeof data === 'object') {
    return Object.entries(data).map(([k,v]) => {
      if (v && typeof v === 'object') {
        return `${pad}${k}:\n${jsonToYaml(v, indent + 1)}`
      }
      return `${pad}${k}: ${formatScalar(v)}`
    }).join('\n')
  }
  return formatScalar(data)
}

function formatScalar(v) {
  if (typeof v === 'string') {
    if (/[:#\-?&*!|>'"%@`]/.test(v) || v.includes('\n')) return JSON.stringify(v)
    return v
  }
  return String(v)
}

// Minimal YAML to JSON: expects key: value lines and - list items; no anchors/aliases
function yamlToJson(text) {
  const lines = text.replace(/\r/g, '').split('\n')
  let i = 0
  function parseBlock(indent = 0) {
    const obj = {}
    const arr = []
    let isArray = false
    while (i < lines.length) {
      const line = lines[i]
      if (!line.trim()) { i++; continue }
      const currentIndent = line.match(/^\s*/)[0].length
      if (currentIndent < indent) break
      if (currentIndent > indent) {
        // child of previous key
        const lastKey = Object.keys(obj).pop()
        obj[lastKey] = parseBlock(currentIndent)
        continue
      }
      const trimmed = line.trim()
      if (trimmed.startsWith('- ')) {
        isArray = true
        const val = trimmed.slice(2)
        if (val.includes(': ')) {
          // inline object start
          const [k, rest] = val.split(/:\s(.+)/)
          const child = {}
          child[k] = rest
          arr.push(child)
        } else {
          arr.push(coerce(val))
        }
        i++
      } else {
        const [key, rest] = trimmed.split(/:\s(.+)/)
        if (rest === undefined) { i++; continue }
        obj[key] = coerce(rest)
        i++
      }
    }
    return isArray ? arr : obj
  }
  function coerce(val) {
    if (val === 'true') return true
    if (val === 'false') return false
    if (val === 'null') return null
    if (!isNaN(Number(val))) return Number(val)
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      try { return JSON.parse(val.replace(/'/g, '"')) } catch { return val.slice(1,-1) }
    }
    return val
  }
  return parseBlock(0)
}

export default function JsonYaml() {
  const [jsonInput, setJsonInput] = useState('{"name":"Alice","age":30,"skills":["js","react"]}')
  const [yamlInput, setYamlInput] = useState('name: Alice\nage: 30\nskills:\n  - js\n  - react')
  const [jsonError, setJsonError] = useState('')
  const [yamlError, setYamlError] = useState('')

  const yamlOut = useMemo(() => {
    try {
      const obj = JSON.parse(jsonInput)
      setJsonError('')
      return jsonToYaml(obj)
    } catch (e) {
      setJsonError('Invalid JSON')
      return ''
    }
  }, [jsonInput])

  const jsonOut = useMemo(() => {
    try {
      setYamlError('')
      return JSON.stringify(yamlToJson(yamlInput), null, 2)
    } catch (e) {
      setYamlError('Invalid or unsupported YAML')
      return ''
    }
  }, [yamlInput])

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">JSON to YAML</h2>
          <textarea rows={10} value={jsonInput} onChange={(e)=>setJsonInput(e.target.value)} className="w-full bg-surface panel-border rounded p-3 font-mono" />
          {jsonError && <div className="text-red-400 text-sm mt-2">{jsonError}</div>}
          <h3 className="font-semibold mt-4 mb-2">YAML Output</h3>
          <pre className="bg-surface panel-border rounded p-3 text-sm overflow-auto">{yamlOut}</pre>
        </div>
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">YAML to JSON</h2>
          <textarea rows={10} value={yamlInput} onChange={(e)=>setYamlInput(e.target.value)} className="w-full bg-surface panel-border rounded p-3 font-mono" />
          {yamlError && <div className="text-red-400 text-sm mt-2">{yamlError}</div>}
          <h3 className="font-semibold mt-4 mb-2">JSON Output</h3>
          <pre className="bg-surface panel-border rounded p-3 text-sm overflow-auto">{jsonOut}</pre>
        </div>
      </div>
    </div>
  )
}

