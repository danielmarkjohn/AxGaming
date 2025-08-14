import React, { Suspense } from 'react'
import { TOOLS_CONFIG } from './@config/tools'
import { InlineLoading } from './@components/Loading'

// map component name to lazy import used in overlay
const lazyTools = {
  Base64Encoder: React.lazy(() => import('./@modules/tools/base64-encoder/Base64Encoder')),
  UuidGenerator: React.lazy(() => import('./@modules/tools/uuid-generator/UuidGenerator')),
  LoremIpsumGenerator: React.lazy(() => import('./@modules/tools/lorem-ipsum-generator/LoremIpsumGenerator')),
  JsonFormatter: React.lazy(() => import('./@modules/tools/json-formatter/JsonFormatter')),
  TimestampConverter: React.lazy(() => import('./@modules/tools/timestamp-converter/TimestampConverter')),
  RegexTester: React.lazy(() => import('./@modules/tools/regex-tester/RegexTester')),
  CssUnitsConverter: React.lazy(() => import('./@modules/tools/css-units-converter/CssUnitsConverter')),
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
  
  // Missing tools from tools.js
  Calculator: React.lazy(() => import('./@modules/tools/calculator/Calculator')),
  Timer: React.lazy(() => import('./@modules/tools/timer/Timer')),
  JwtParser: React.lazy(() => import('./@modules/tools/jwt-parser/JwtParser')),
  SvgViewer: React.lazy(() => import('./@modules/tools/svg-viewer/SvgViewer')),
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
  
  // Text Processing Tools
  TextReverser: React.lazy(() => import('./@modules/tools/text-reverser/TextReverser')),
  StringRepeater: React.lazy(() => import('./@modules/tools/string-repeater/StringRepeater')),
  RandomPicker: React.lazy(() => import('./@modules/tools/random-picker/RandomPicker')),
  ListSorter: React.lazy(() => import('./@modules/tools/list-sorter/ListSorter')),
  NumberCalculator: React.lazy(() => import('./@modules/tools/number-calculator/NumberCalculator')),
  
  // Unicode and text encoding tools
  UnicodeSpoof: React.lazy(() => import('./@modules/tools/unicode-spoof/UnicodeSpoof')),
  ZalgoGenerator: React.lazy(() => import('./@modules/tools/zalgo-generator/ZalgoGenerator')),
  Utf8Converter: React.lazy(() => import('./@modules/tools/utf8-converter/Utf8Converter')),
  AsciiConverter: React.lazy(() => import('./@modules/tools/ascii-converter/AsciiConverter')),
  
  // Multimedia tools
  ColorPicker: React.lazy(() => import('./@modules/tools/color-picker/ColorPicker')),
  ImageFormatConverter: React.lazy(() => import('./@modules/tools/image-format-converter/ImageFormatConverter')),
  QrGenerator: React.lazy(() => import('./@modules/tools/qr-generator/QrGenerator')),
  AsciiArt: React.lazy(() => import('./@modules/tools/ascii-art/AsciiArt')),
  GradientGenerator: React.lazy(() => import('./@modules/tools/gradient-generator/GradientGenerator')),
  
  // Gaming tools
  DiceRoller: React.lazy(() => import('./@modules/tools/dice-roller/DiceRoller')),
  FantasyNameGenerator: React.lazy(() => import('./@modules/tools/fantasy-name-generator/FantasyNameGenerator')),
  PasswordGenerator: React.lazy(() => import('./@modules/tools/password-generator/PasswordGenerator')),
  CharacterStats: React.lazy(() => import('./@modules/tools/character-stats/CharacterStats')),
  LootGenerator: React.lazy(() => import('./@modules/tools/loot-generator/LootGenerator')),
  
  // Multimedia viewers & editors
  PdfViewer: React.lazy(() => import('./@modules/tools/pdf-viewer/PdfViewer')),
  DocViewer: React.lazy(() => import('./@modules/tools/doc-viewer/DocViewer')),
  VideoPlayer: React.lazy(() => import('./@modules/tools/video-player/VideoPlayer')),
  AudioPlayer: React.lazy(() => import('./@modules/tools/audio-player/AudioPlayer')),
  ImageEditorBasic: React.lazy(() => import('./@modules/tools/image-editor-basic/ImageEditorBasic')),
}

export function renderToolById(id) {
  const tool = TOOLS_CONFIG.find(t => t.id === id)
  if (!tool || !tool.component) return null
  const Cmp = lazyTools[tool.component]
  if (!Cmp) return null
  return (
    <Suspense fallback={<InlineLoading message={`Loading ${tool.title}...`} />}>
      <Cmp />
    </Suspense>
  )
}

