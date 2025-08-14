export const TOOLS_CONFIG = [
  // Existing tools with updated categories
  {
    id: 'calculator',
    title: 'Calculator',
    desc: 'Advanced scientific calculator with history',
    category: 'development',
    component: 'Calculator'
  },
  {
    id: 'timer',
    title: 'Timer',
    desc: 'Countdown timer and stopwatch',
    category: 'development',
    component: 'Timer'
  },

  // Encoding/Decoding Tools
  {
    id: 'base64-encoder',
    title: 'Base64 Encode/Decode',
    component: 'Base64Encoder',
    desc: 'Encode and decode Base64 data safely',
    category: 'development'
  },

  // Formatters & Validators
  {
    id: 'json-formatter',
    title: 'JSON Formatter',
    component: 'JsonFormatter',
    desc: 'Format and beautify JSON data',
    category: 'development'
  },
  {
    id: 'timestamp-converter',
    title: 'Timestamp Converter',
    component: 'TimestampConverter',
    desc: 'Convert Unix timestamps to readable dates',
    category: 'development'
  },
  {
    id: 'regex-tester',
    title: 'Regex Tester',
    component: 'RegexTester',
    desc: 'Test and debug regular expressions',
    category: 'development'
  },
  {
    id: 'css-units-converter',
    title: 'CSS Units Converter',
    component: 'CssUnitsConverter',
    desc: 'Convert between CSS units (px, rem, em, vw, etc.)',
    category: 'development'
  },

  // Generators
  {
    id: 'uuid-generator',
    title: 'UUID Generator',
    component: 'UuidGenerator',
    desc: 'Generate random unique identifiers',
    category: 'development'
  },
  {
    id: 'jwt-parser',
    title: 'JWT Parser',
    component: 'JwtParser',
    desc: 'Decode and view JWT token contents',
    category: 'development'
  },
  {
    id: 'svg-viewer',
    title: 'SVG Viewer',
    component: 'SvgViewer',
    desc: 'Preview and validate SVG code',
    category: 'development'
  },
  {
    id: 'lorem-ipsum-generator',
    title: 'Lorem Ipsum Generator',
    component: 'LoremIpsumGenerator',
    desc: 'Generate placeholder text',
    category: 'development'
  },

  // Development tools (batch 1)
  {
    id: 'csv-to-json',
    title: 'CSV to JSON',
    component: 'CsvToJson',
    desc: 'Convert CSV data into JSON for APIs and data processing',
    category: 'development'
  },
  {
    id: 'url-encoder',
    title: 'URL Encode/Decode',
    component: 'UrlEncoder',
    desc: 'Encode or decode URL strings',
    category: 'development'
  },
  {
    id: 'query-to-json',
    title: 'Query Parameters to JSON',
    component: 'QueryToJson',
    desc: 'Turn URL query parameters into a structured JSON object',
    category: 'development'
  },
  {
    id: 'hex-to-rgb',
    title: 'HEX to RGB',
    component: 'HexToRgb',
    desc: 'Convert HEX colors to RGB and get CSS/Swift/Android snippets',
    category: 'development'
  },
  {
    id: 'image-to-base64',
    title: 'Image to Base64',
    component: 'ImageToBase64',
    desc: 'Convert images to Base64 for embedding',
    category: 'multimedia'
  },
  {
    id: 'json-to-csv',
    title: 'JSON to CSV',
    component: 'JsonToCsv',
    desc: 'Convert JSON arrays to CSV',
    category: 'development'
  },
  {
    id: 'number-base-changer',
    title: 'Number Base Changer',
    component: 'NumberBaseChanger',
    desc: 'Convert numbers between binary, octal, decimal and hex',
    category: 'development'
  },
  {
    id: 'image-resizer',
    title: 'Image Resizer',
    component: 'ImageResizer',
    desc: 'Resize images with aspect ratio control and format options',
    category: 'multimedia'
  },
  {
    id: 'hash-generator',
    title: 'Hash Generator',
    component: 'HashGenerator',
    desc: 'Generate secure SHA hashes (256/384/512)',
    category: 'development'
  },
  {
    id: 'json-yaml',
    title: 'JSON ↔ YAML (basic)',
    component: 'JsonYaml',
    desc: 'Convert between JSON and YAML (subset, no deps)',
    category: 'development'
  },
  {
    id: 'sql-minifier',
    title: 'SQL Minifier',
    component: 'SqlMinifier',
    desc: 'Minify SQL by removing comments and whitespace',
    category: 'development'
  },
  {
    id: 'env-to-netlify',
    title: '.env to netlify.toml',
    component: 'EnvToNetlifyToml',
    desc: 'Convert .env variables to netlify.toml [build.environment]',
    category: 'development'
  },
  {
    id: 'har-viewer',
    title: 'HAR file viewer',
    component: 'HarViewer',
    desc: 'View and analyze HAR files',
    category: 'development'
  },

  // Development tools (batch 2)
  { id: 'xml-to-json', title: 'XML to JSON', component: 'XmlToJson', desc: 'Convert XML to JSON via DOMParser', category: 'development' },
  { id: 'html-escape', title: 'HTML Escape/Unescape', component: 'HtmlEscape', desc: 'Convert text to HTML entities or back', category: 'development' },
  { id: 'text-case', title: 'Text Case Converter', component: 'TextCase', desc: 'camelCase, snake_case, kebab-case, PascalCase, Title Case', category: 'development' },
  { id: 'palette-generator', title: 'Color Palette Generator', component: 'PaletteGenerator', desc: 'Generate palette shades from a seed color', category: 'development' },
  { id: 'ulid-generator', title: 'ULID Generator', component: 'UlidGenerator', desc: 'Create lexicographically sortable IDs', category: 'development' },
  { id: 'date-math', title: 'Date Math Calculator', component: 'DateMath', desc: 'Add/subtract time from a base date', category: 'development' },
  { id: 'random-data', title: 'Random Data Generator', component: 'RandomData', desc: 'Generate sample names/emails/UUIDs data', category: 'development' },
  { id: 'string-similarity', title: 'String Similarity', component: 'StringSimilarity', desc: 'Levenshtein distance and similarity', category: 'development' },
  { id: 'byte-size', title: 'Byte Size Converter', component: 'ByteSize', desc: 'Convert bytes to KB/MB/GB (SI/IEC) and parse sizes', category: 'development' },
  { id: 'jwt-builder', title: 'JWT Builder (HS*)', component: 'JwtBuilder', desc: 'Build HS256/384/512 JWTs with WebCrypto', category: 'development' },

  // New Multimedia Tools
  {
    id: 'color-picker',
    title: 'Color Picker & Analyzer',
    component: 'ColorPicker',
    desc: 'Pick colors from images and get color codes in various formats',
    category: 'multimedia'
  },
  {
    id: 'image-format-converter',
    title: 'Image Format Converter',
    component: 'ImageFormatConverter',
    desc: 'Convert between PNG, JPEG, WebP formats in browser',
    category: 'multimedia'
  },

  // New Gaming Tools
  {
    id: 'dice-roller',
    title: 'Dice Roller',
    component: 'DiceRoller',
    desc: 'Roll various dice combinations for tabletop games',
    category: 'gaming'
  },
  {
    id: 'random-name-generator',
    title: 'Fantasy Name Generator',
    component: 'FantasyNameGenerator',
    desc: 'Generate character names for RPGs and fantasy games',
    category: 'gaming'
  },
  {
    id: 'password-generator',
    title: 'Password Generator',
    component: 'PasswordGenerator',
    desc: 'Generate secure passwords with custom rules',
    category: 'gaming'
  },
  {
    id: 'character-stats',
    title: 'RPG Character Stats',
    component: 'CharacterStats',
    desc: 'Roll character stats for D&D and other RPGs',
    category: 'gaming'
  },
  {
    id: 'loot-generator',
    title: 'Loot Generator',
    component: 'LootGenerator',
    desc: 'Generate random loot and treasure for RPG games',
    category: 'gaming'
  },

  // Additional Multimedia Tools
  {
    id: 'qr-generator',
    title: 'QR Code Generator',
    component: 'QrGenerator',
    desc: 'Generate QR codes for text, URLs, and data',
    category: 'multimedia'
  },
  {
    id: 'ascii-art',
    title: 'ASCII Art Generator',
    component: 'AsciiArt',
    desc: 'Convert text to ASCII art with various fonts',
    category: 'multimedia'
  },
  {
    id: 'gradient-generator',
    title: 'CSS Gradient Generator',
    component: 'GradientGenerator',
    desc: 'Create beautiful CSS gradients with live preview',
    category: 'multimedia'
  },

  // Text Processing Tools
  {
    id: 'text-reverser',
    title: 'Reverse Text',
    component: 'TextReverser',
    desc: 'Quickly reverse the order of letters in text',
    category: 'development'
  },
  {
    id: 'string-repeater',
    title: 'Repeat String',
    component: 'StringRepeater',
    desc: 'Quickly repeat a string multiple times',
    category: 'development'
  },
  {
    id: 'random-picker',
    title: 'Random Item Picker',
    component: 'RandomPicker',
    desc: 'Quickly pick random items from a list',
    category: 'development'
  },
  {
    id: 'list-sorter',
    title: 'List Sorter',
    component: 'ListSorter',
    desc: 'Quickly sort and manipulate lists',
    category: 'development'
  },
  {
    id: 'number-calculator',
    title: 'Number Calculator',
    component: 'NumberCalculator',
    desc: 'Sum, sort, and generate number sequences',
    category: 'development'
  },
  {
    id: 'unicode-spoof',
    title: 'Unicode Text Spoof',
    component: 'UnicodeSpoof',
    desc: 'Replace regular characters with Unicode look-alikes',
    category: 'development'
  },
  {
    id: 'zalgo-generator',
    title: 'Zalgo Text Generator',
    component: 'ZalgoGenerator',
    desc: 'Generate chaotic Zalgo text with combining characters',
    category: 'development'
  },
  {
    id: 'utf8-converter',
    title: 'UTF8 to Hex/Binary',
    component: 'Utf8Converter',
    desc: 'Convert UTF8 text to hexadecimal and binary formats',
    category: 'development'
  },
  {
    id: 'ascii-converter',
    title: 'ASCII to Decimal',
    component: 'AsciiConverter',
    desc: 'Convert ASCII characters to decimal values and back',
    category: 'development'
  },

  // Multimedia Viewers & Editors
  {
    id: 'pdf-viewer',
    title: 'PDF Viewer',
    component: 'PdfViewer',
    desc: 'View and navigate PDF documents',
    category: 'multimedia'
  },
  {
    id: 'doc-viewer',
    title: 'Document Viewer',
    component: 'DocViewer',
    desc: 'View Word documents, text files, and more',
    category: 'multimedia'
  },
  {
    id: 'video-player',
    title: 'Video Player',
    component: 'VideoPlayer',
    desc: 'Advanced video player with controls and formats',
    category: 'multimedia'
  },
  {
    id: 'audio-player',
    title: 'Audio Player',
    component: 'AudioPlayer',
    desc: 'Feature-rich audio player with playlist support',
    category: 'multimedia'
  },
  {
    id: 'image-editor-basic',
    title: 'Basic Image Editor',
    component: 'ImageEditorBasic',
    desc: 'Simple image editing with filters and adjustments',
    category: 'multimedia'
  }
]

