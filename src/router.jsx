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
  
  // Existing multimedia tools
  ColorPicker: React.lazy(() => import('./@modules/tools/color-picker/ColorPicker')),
  ImageFormatConverter: React.lazy(() => import('./@modules/tools/image-format-converter/ImageFormatConverter')),
  
  // New multimedia tools
  QrGenerator: React.lazy(() => import('./@modules/tools/qr-generator/QrGenerator')),
  AsciiArt: React.lazy(() => import('./@modules/tools/ascii-art/AsciiArt')),
  GradientGenerator: React.lazy(() => import('./@modules/tools/gradient-generator/GradientGenerator')),
  
  // Existing gaming tools
  DiceRoller: React.lazy(() => import('./@modules/tools/dice-roller/DiceRoller')),
  FantasyNameGenerator: React.lazy(() => import('./@modules/tools/fantasy-name-generator/FantasyNameGenerator')),
  
  // New gaming tools
  PasswordGenerator: React.lazy(() => import('./@modules/tools/password-generator/PasswordGenerator')),
  CharacterStats: React.lazy(() => import('./@modules/tools/character-stats/CharacterStats')),
  LootGenerator: React.lazy(() => import('./@modules/tools/loot-generator/LootGenerator')),
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

