export const TOOLS_CONFIG = [
  // Existing tools
  { 
    id: 'calculator', 
    title: 'Calculator', 
    path: 'src/@modules/tools/calculator/index.html', 
    desc: 'Advanced scientific calculator with history', 
    category: 'utility'
  },
  { 
    id: 'timer', 
    title: 'Timer', 
    path: 'src/@modules/tools/timer/index.html', 
    desc: 'Countdown timer and stopwatch', 
    category: 'utility'
  },
  
  // Encoding/Decoding Tools
  { 
    id: 'base64-encoder', 
    title: 'Base64 Encode/Decode', 
    path: 'src/@modules/tools/base64-encoder/index.html', 
    desc: 'Encode and decode Base64 data safely', 
    category: 'encoder'
  },

  // Formatters & Validators
  { 
    id: 'json-formatter', 
    title: 'JSON Formatter', 
    path: 'src/@modules/tools/json-formatter/index.html', 
    desc: 'Format and beautify JSON data', 
    category: 'formatter'
  },
  { 
    id: 'timestamp-converter', 
    title: 'Timestamp Converter', 
    path: 'src/@modules/tools/timestamp-converter/index.html', 
    desc: 'Convert Unix timestamps to readable dates', 
    category: 'formatter'
  },
  { 
    id: 'regex-tester', 
    title: 'Regex Tester', 
    path: 'src/@modules/tools/regex-tester/index.html', 
    desc: 'Test and debug regular expressions', 
    category: 'formatter'
  },
  { 
    id: 'css-units-converter', 
    title: 'CSS Units Converter', 
    path: 'src/@modules/tools/css-units-converter/index.html', 
    desc: 'Convert between CSS units (px, rem, em, vw, etc.)', 
    category: 'formatter'
  },

  // Generators
  { 
    id: 'uuid-generator', 
    title: 'UUID Generator', 
    path: 'src/@modules/tools/uuid-generator/index.html', 
    desc: 'Generate random unique identifiers', 
    category: 'generator'
  },
  { 
    id: 'jwt-parser', 
    title: 'JWT Parser', 
    path: 'src/@modules/tools/jwt-parser/index.html', 
    desc: 'Decode and view JWT token contents', 
    category: 'formatter'
  },
  { 
    id: 'svg-viewer', 
    title: 'SVG Viewer', 
    path: 'src/@modules/tools/svg-viewer/index.html', 
    desc: 'Preview and validate SVG code', 
    category: 'formatter'
  },
  { 
    id: 'lorem-ipsum-generator', 
    title: 'Lorem Ipsum Generator', 
    path: 'src/@modules/tools/lorem-ipsum-generator/index.html', 
    desc: 'Generate placeholder text', 
    category: 'generator'
  }
]

export const TOOLS_DASHBOARD_CONFIG = {
  IFRAME_LOAD_DELAY: 50,
  MAX_COLUMNS: 12,
  SIDEBAR_COLUMNS: 4,
  MAIN_COLUMNS: 9
}
