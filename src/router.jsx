import React, { Suspense } from 'react'
import { TOOLS_CONFIG } from './@config/tools'

// map component name to lazy import used in overlay
const lazyTools = {
  Base64Encoder: React.lazy(() => import('./@modules/tools/base64-encoder/Base64Encoder')),
  UuidGenerator: React.lazy(() => import('./@modules/tools/uuid-generator/UuidGenerator')),
  LoremIpsumGenerator: React.lazy(() => import('./@modules/tools/lorem-ipsum-generator/LoremIpsumGenerator')),
  JsonFormatter: React.lazy(() => import('./@modules/tools/json-formatter/JsonFormatter')),
  TimestampConverter: React.lazy(() => import('./@modules/tools/timestamp-converter/TimestampConverter')),
  RegexTester: React.lazy(() => import('./@modules/tools/regex-tester/RegexTester')),
  CssUnitsConverter: React.lazy(() => import('./@modules/tools/css-units-converter/CssUnitsConverter')),
  JwtParser: React.lazy(() => import('./@modules/tools/jwt-parser/JwtParser')),
  SvgViewer: React.lazy(() => import('./@modules/tools/svg-viewer/SvgViewer')),
  Calculator: React.lazy(() => import('./@modules/tools/calculator/Calculator')),
  Timer: React.lazy(() => import('./@modules/tools/timer/Timer')),
}

export function renderToolById(id) {
  const tool = TOOLS_CONFIG.find(t => t.id === id)
  if (!tool || !tool.component) return null
  const Cmp = lazyTools[tool.component]
  if (!Cmp) return null
  return (
    <Suspense fallback={<div className="p-6 text-white">Loading {tool.title}...</div>}>
      <Cmp />
    </Suspense>
  )
}

