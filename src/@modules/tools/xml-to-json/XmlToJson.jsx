import React, { useMemo, useState } from 'react'

function xmlToJson(xml) {
  const obj = {}
  if (xml.nodeType === 1) { // element
    if (xml.attributes?.length > 0) {
      obj['@attributes'] = {}
      for (let i = 0; i < xml.attributes.length; i++) {
        const attr = xml.attributes.item(i)
        obj['@attributes'][attr.nodeName] = attr.nodeValue
      }
    }
  } else if (xml.nodeType === 3) { // text
    return xml.nodeValue.trim()
  }
  if (xml.hasChildNodes?.()) {
    for (let i = 0; i < xml.childNodes.length; i++) {
      const item = xml.childNodes.item(i)
      const nodeName = item.nodeName
      const val = xmlToJson(item)
      if (val === '') continue
      if (typeof val === 'string' && nodeName === '#text') {
        if (!val) continue
        if (Object.keys(obj).length === 0) return val
      } else {
        if (obj[nodeName] === undefined) obj[nodeName] = val
        else {
          if (!Array.isArray(obj[nodeName])) obj[nodeName] = [obj[nodeName]]
          obj[nodeName].push(val)
        }
      }
    }
  }
  return obj
}

export default function XmlToJson() {
  const [input, setInput] = useState('<note><to>Alice</to><from>Bob</from><msg>Hello</msg></note>')
  const [error, setError] = useState('')

  const output = useMemo(() => {
    try {
      setError('')
      const doc = new DOMParser().parseFromString(input, 'text/xml')
      const err = doc.getElementsByTagName('parsererror')[0]
      if (err) throw new Error('Invalid XML')
      const json = xmlToJson(doc.documentElement)
      return JSON.stringify(json, null, 2)
    } catch (e) {
      setError('Invalid XML')
      return ''
    }
  }, [input])

  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">XML to JSON</h2>
          <textarea rows={10} value={input} onChange={(e)=>setInput(e.target.value)} className="w-full bg-surface panel-border rounded p-3 font-mono" />
          {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
        </div>
        <div className="panel panel-border p-4 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">JSON</h3>
            <button className="px-3 py-1 rounded bg-surface panel-border" onClick={() => navigator.clipboard.writeText(output)}>Copy</button>
          </div>
          <pre className="bg-surface panel-border rounded p-3 text-sm overflow-auto">{output}</pre>
        </div>
      </div>
    </div>
  )
}

