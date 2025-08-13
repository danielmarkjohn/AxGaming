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
  }
]

