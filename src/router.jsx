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
  CsvToJson: React.lazy(() => import('./@modules/tools/csv-to-json/CsvToJson')),
  UrlEncoder: React.lazy(() => import('./@modules/tools/url-encoder/UrlEncoder')),
  QueryToJson: React.lazy(() => import('./@modules/tools/query-to-json/QueryToJson')),
  HexToRgb: React.lazy(() => import('./@modules/tools/hex-to-rgb/HexToRgb')),
  ImageToBase64: React.lazy(() => import('./@modules/tools/image-to-base64/ImageToBase64')),
  JsonToCsv: React.lazy(() => import('./@modules/tools/json-to-csv/JsonToCsv')),
  NumberBaseChanger: React.lazy(() => import('./@modules/tools/number-base-changer/NumberBaseChanger')),
  ImageResizer: React.lazy(() => import('./@modules/tools/image-resizer/ImageResizer')),
  HashGenerator: React.lazy(() => import('./@modules/tools/hash-generator/HashGenerator')),
  JsonYaml: React.lazy(() => import('./@modules/tools/json-yaml/JsonYaml')),
  SqlMinifier: React.lazy(() => import('./@modules/tools/sql-minifier/SqlMinifier')),
  EnvToNetlifyToml: React.lazy(() => import('./@modules/tools/env-to-netlify/EnvToNetlifyToml')),
  HarViewer: React.lazy(() => import('./@modules/tools/har-viewer/HarViewer')),
  XmlToJson: React.lazy(() => import('./@modules/tools/xml-to-json/XmlToJson')),
  HtmlEscape: React.lazy(() => import('./@modules/tools/html-escape/HtmlEscape')),
  TextCase: React.lazy(() => import('./@modules/tools/text-case/TextCase')),
  PaletteGenerator: React.lazy(() => import('./@modules/tools/palette-generator/PaletteGenerator')),
  UlidGenerator: React.lazy(() => import('./@modules/tools/ulid-generator/UlidGenerator')),
  DateMath: React.lazy(() => import('./@modules/tools/date-math/DateMath')),
  RandomData: React.lazy(() => import('./@modules/tools/random-data/RandomData')),
  StringSimilarity: React.lazy(() => import('./@modules/tools/string-similarity/StringSimilarity')),
  ByteSize: React.lazy(() => import('./@modules/tools/byte-size/ByteSize')),
  JwtBuilder: React.lazy(() => import('./@modules/tools/jwt-builder/JwtBuilder')),
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

