export const TOOLS_CONFIG = [
  // Existing tools
  {
    id: 'calculator',
    title: 'Calculator',
    desc: 'Advanced scientific calculator with history',
    category: 'utility',
    component: 'Calculator'
  },
  {
    id: 'timer',
    title: 'Timer',
    desc: 'Countdown timer and stopwatch',
    category: 'utility',
    component: 'Timer'
  },

  // Encoding/Decoding Tools
  { 
    id: 'base64-encoder', 
    title: 'Base64 Encode/Decode', 
    component: 'Base64Encoder',
    desc: 'Encode and decode Base64 data safely',
    category: 'encoder'
  },

  // Formatters & Validators
  { 
    id: 'json-formatter', 
    title: 'JSON Formatter', 
    component: 'JsonFormatter',
    desc: 'Format and beautify JSON data',
    category: 'formatter'
  },
  { 
    id: 'timestamp-converter', 
    title: 'Timestamp Converter', 
    component: 'TimestampConverter',
    desc: 'Convert Unix timestamps to readable dates',
    category: 'formatter'
  },
  { 
    id: 'regex-tester', 
    title: 'Regex Tester', 
    component: 'RegexTester',
    desc: 'Test and debug regular expressions',
    category: 'formatter'
  },
  { 
    id: 'css-units-converter', 
    title: 'CSS Units Converter', 
    component: 'CssUnitsConverter',
    desc: 'Convert between CSS units (px, rem, em, vw, etc.)',
    category: 'formatter'
  },

  // Generators
  { 
    id: 'uuid-generator', 
    title: 'UUID Generator', 
    component: 'UuidGenerator',
    desc: 'Generate random unique identifiers',
    category: 'generator'
  },
  {
    id: 'jwt-parser',
    title: 'JWT Parser',
    component: 'JwtParser',
    desc: 'Decode and view JWT token contents',
    category: 'formatter'
  },
  {
    id: 'svg-viewer',
    title: 'SVG Viewer',
    component: 'SvgViewer',
    desc: 'Preview and validate SVG code',
    category: 'formatter'
  },
  {
    id: 'lorem-ipsum-generator',
    title: 'Lorem Ipsum Generator',
    component: 'LoremIpsumGenerator',
    desc: 'Generate placeholder text',
    category: 'generator'
  },

  // New tools (batch 1)
  {
    id: 'csv-to-json',
    title: 'CSV to JSON',
    component: 'CsvToJson',
    desc: 'Convert CSV data into JSON for APIs and data processing',
    category: 'converter'
  },
  {
    id: 'url-encoder',
    title: 'URL Encode/Decode',
    component: 'UrlEncoder',
    desc: 'Encode or decode URL strings',
    category: 'encoder'
  },
  {
    id: 'query-to-json',
    title: 'Query Parameters to JSON',
    component: 'QueryToJson',
    desc: 'Turn URL query parameters into a structured JSON object',
    category: 'converter'
  },
  {
    id: 'hex-to-rgb',
    title: 'HEX to RGB',
    component: 'HexToRgb',
    desc: 'Convert HEX colors to RGB and get CSS/Swift/Android snippets',
    category: 'converter'
  },
  {
    id: 'image-to-base64',
    title: 'Image to Base64',
    component: 'ImageToBase64',
    desc: 'Convert images to Base64 for embedding',
    category: 'converter'
  },
  {
    id: 'json-to-csv',
    title: 'JSON to CSV',
    component: 'JsonToCsv',
    desc: 'Convert JSON arrays to CSV',
    category: 'converter'
  },
  {
    id: 'number-base-changer',
    title: 'Number Base Changer',
    component: 'NumberBaseChanger',
    desc: 'Convert numbers between binary, octal, decimal and hex',
    category: 'converter'
  },
  {
    id: 'image-resizer',
    title: 'Image Resizer',
    component: 'ImageResizer',
    desc: 'Resize images with aspect ratio control and format options',
    category: 'converter'
  },
  {
    id: 'hash-generator',
    title: 'Hash Generator',
    component: 'HashGenerator',
    desc: 'Generate secure SHA hashes (256/384/512)',
    category: 'security'
  },
  {
    id: 'json-yaml',
    title: 'JSON ↔ YAML (basic)',
    component: 'JsonYaml',
    desc: 'Convert between JSON and YAML (subset, no deps)',
    category: 'converter'
  },
  {
    id: 'sql-minifier',
    title: 'SQL Minifier',
    component: 'SqlMinifier',
    desc: 'Minify SQL by removing comments and whitespace',
    category: 'formatter'
  },
  {
    id: 'env-to-netlify',
    title: '.env to netlify.toml',
    component: 'EnvToNetlifyToml',
    desc: 'Convert .env variables to netlify.toml [build.environment]',
    category: 'converter'
  },
  {
    id: 'har-viewer',
    title: 'HAR file viewer',
    component: 'HarViewer',
    desc: 'View and analyze HAR files',
    category: 'analyzer'
  },

  // New tools (batch 2)
  { id: 'xml-to-json', title: 'XML to JSON', component: 'XmlToJson', desc: 'Convert XML to JSON via DOMParser', category: 'converter' },
  { id: 'html-escape', title: 'HTML Escape/Unescape', component: 'HtmlEscape', desc: 'Convert text to HTML entities or back', category: 'converter' },
  { id: 'text-case', title: 'Text Case Converter', component: 'TextCase', desc: 'camelCase, snake_case, kebab-case, PascalCase, Title Case', category: 'converter' },
  { id: 'palette-generator', title: 'Color Palette Generator', component: 'PaletteGenerator', desc: 'Generate palette shades from a seed color', category: 'design' },
  { id: 'ulid-generator', title: 'ULID Generator', component: 'UlidGenerator', desc: 'Create lexicographically sortable IDs', category: 'generator' },
  { id: 'date-math', title: 'Date Math Calculator', component: 'DateMath', desc: 'Add/subtract time from a base date', category: 'time' },
  { id: 'random-data', title: 'Random Data Generator', component: 'RandomData', desc: 'Generate sample names/emails/UUIDs data', category: 'generator' },
  { id: 'string-similarity', title: 'String Similarity', component: 'StringSimilarity', desc: 'Levenshtein distance and similarity', category: 'analyzer' },
  { id: 'byte-size', title: 'Byte Size Converter', component: 'ByteSize', desc: 'Convert bytes to KB/MB/GB (SI/IEC) and parse sizes', category: 'converter' },
  { id: 'jwt-builder', title: 'JWT Builder (HS*)', component: 'JwtBuilder', desc: 'Build HS256/384/512 JWTs with WebCrypto', category: 'security' }
]

