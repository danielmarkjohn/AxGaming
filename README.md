# AxTools Pro — Ultimate Developer Toolkit

<div align="center">

![AxTools Pro](https://img.shields.io/badge/AxTools-Pro-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=for-the-badge&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css)


[🚀 Live Demo](#) • [📖 Documentation](#features) • [🛠️ Installation](#installation) • [⚙️ Tools](#tools)

</div>

---

## ✨ Features

### 🎯 **Modern Dashboard Experience**
- **Military-Grade UI** — Call of Duty inspired aesthetics with 3D card effects
- **Responsive Design** — Perfect on desktop, tablet, and mobile devices
- **Real-time Search** — Find tools instantly with smart filtering
- **Dark Theme** — Easy on the eyes with gradient backgrounds
- **Category Organization** — Tools grouped by Development, Multimedia, and Gaming

### 🛠️ **Professional Toolkit**
- **60+ Built-in Tools** — Comprehensive collection for developers and creators
- **Layer-based Image Editor** — Professional image editing with brushes, shapes, and layers
- **Advanced Converters** — JSON, CSV, Base64, timestamps, and more
- **Code Utilities** — Formatters, validators, generators, and analyzers
- **Gaming Tools** — RPG generators, dice rollers, and character creators

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/danielmarkjohn/axtools-pro.git
cd axtools-pro

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## ⚙️ Tools

### � **Development Tools**
- **JSON Formatter** — Format, validate, and beautify JSON data
- **Base64 Encoder/Decoder** — Encode and decode Base64 data safely
- **JWT Parser & Builder** — Decode JWT tokens and build new ones with HS256/384/512
- **Regex Tester** — Test and debug regular expressions with live matching
- **CSS Units Converter** — Convert between px, rem, em, vw, vh, and more
- **Timestamp Converter** — Unix timestamps to readable dates and vice versa
- **UUID/ULID Generator** — Generate unique identifiers with various formats
- **Hash Generator** — Generate SHA-256/384/512 hashes securely
- **URL Encoder/Decoder** — Encode or decode URL strings properly
- **HTML Escape/Unescape** — Convert text to HTML entities and back
- **Text Case Converter** — camelCase, snake_case, kebab-case, PascalCase
- **CSV ↔ JSON Converter** — Convert between CSV and JSON formats
- **XML to JSON** — Convert XML to JSON using DOMParser
- **Query Parameters to JSON** — Parse URL query strings to structured JSON
- **HEX to RGB Converter** — Color conversion with CSS/Swift/Android snippets
- **Number Base Converter** — Binary, octal, decimal, and hexadecimal conversion
- **JSON ↔ YAML** — Convert between JSON and YAML formats
- **SQL Minifier** — Remove comments and whitespace from SQL
- **HAR File Viewer** — Analyze HTTP Archive files
- **String Similarity** — Calculate Levenshtein distance and similarity
- **Date Math Calculator** — Add/subtract time from dates
- **Random Data Generator** — Generate sample names, emails, and UUIDs
- **Byte Size Converter** — Convert between bytes, KB, MB, GB (SI/IEC)
- **UTF8 Converter** — Convert UTF8 text to hex and binary
- **ASCII Converter** — Convert ASCII characters to decimal values
- **Text Reverser** — Reverse text character order
- **Unicode Text Spoof** — Replace characters with Unicode look-alikes
- **Zalgo Text Generator** — Generate chaotic text with combining characters
- **Environment Converters** — .env to netlify.toml and other formats

### 🎨 **Multimedia Tools**
- **Modern Image Editor** — Professional editor with layers, brushes, shapes, and filters
- **Image Resizer** — Resize images with aspect ratio control
- **Image Format Converter** — Convert between PNG, JPEG, WebP formats
- **Image to Base64** — Convert images to Base64 for embedding
- **Color Picker & Analyzer** — Pick colors from images and get various format codes
- **QR Code Generator** — Generate QR codes for text, URLs, and data
- **ASCII Art Generator** — Convert text to ASCII art with various fonts
- **CSS Gradient Generator** — Create beautiful CSS gradients with live preview
- **Color Palette Generator** — Generate color palette shades from seed colors

### � **Gaming Tools**
- **Dice Roller** — Roll various dice combinations for tabletop games
- **Fantasy Name Generator** — Generate character names for RPGs
- **RPG Character Stats** — Roll character stats for D&D and other RPGs
- **Loot Generator** — Generate random loot and treasure for RPG games
- **Password Generator** — Generate secure passwords with custom rules

### 🔧 **Utility Tools**
- **Calculator** — Advanced scientific calculator with history
- **Timer** — Countdown timer and stopwatch functionality
- **Lorem Ipsum Generator** — Generate placeholder text in various lengths
- **SVG Viewer** — Preview and validate SVG code

---

## 🏗️ Project Structure

```
src/
├── @components/          # Reusable UI components
├── @config/             # Configuration files
│   ├── tools.js         # Tool definitions and categories
│   ├── homepage.js      # Homepage settings and UI config
│   └── coreConfig.js    # Core application configuration
├── @modules/            # Tool modules and implementations
│   └── tools/           # Individual tool components
│       ├── json-formatter/
│       ├── image-editor-modern/
│       ├── base64-encoder/
│       └── ...          # 60+ tool modules
├── pages/               # Main page components
│   ├── HomePage.jsx     # Landing page with tool grid
│   ├── ToolPage.jsx     # Individual tool page wrapper
│   └── ToolsDashboard.jsx # Tools launcher (legacy)
├── router.jsx           # Lazy loading router for tools
├── App.jsx              # Main application component
└── main.jsx             # Application entry point
```

---

## 🎨 Customization

### Adding New Tools

1. **Create the tool component:**
```bash
mkdir src/@modules/tools/my-awesome-tool
# Create MyAwesomeTool.jsx component
```

2. **Register in tools config:**
```javascript
// src/@config/tools.js
{
  id: 'my-awesome-tool',
  title: 'My Awesome Tool',
  component: 'MyAwesomeTool',
  desc: 'Description of what your tool does',
  category: 'development' // or 'multimedia', 'gaming'
}
```

3. **Add to router:**
```javascript
// src/router.jsx
const lazyTools = {
  MyAwesomeTool: React.lazy(() => import('./@modules/tools/my-awesome-tool/MyAwesomeTool')),
  // ... other tools
}
```

### Theming & Styling
- **Tailwind Configuration** — Modify `tailwind.config.js` for custom colors and effects
- **CSS Variables** — Update custom properties in `src/index.css`
- **Component Styling** — Use Tailwind classes with dark theme support
- **3D Effects** — Customize card hover effects and animations

---

## 🔧 Configuration

### Environment Variables
```bash
# .env (optional)
VITE_APP_TITLE="AxTools Pro"
VITE_GITHUB_URL="https://github.com/danielmarkjohn"
VITE_LINKEDIN_URL="https://linkedin.com/in/danielmarkjohn"
```

### Build Configuration
- **Vite** — Lightning fast build tool with HMR
- **PostCSS** — CSS processing with Tailwind CSS
- **ESBuild** — Fast JavaScript bundling and JSX transformation
- **React Router** — Hash-based routing for GitHub Pages compatibility

---

## 📱 Mobile & PWA Support

- **Responsive Grid** — Adapts to all screen sizes with breakpoint-specific layouts
- **Touch Optimized** — All tools work perfectly on mobile devices
- **PWA Ready** — Can be installed as a mobile app (add manifest.json)
- **Offline Capable** — Most tools work without internet connection

---

## 🚀 Performance Features

- **Lazy Loading** — Tools are loaded only when needed
- **Code Splitting** — Automatic bundle splitting for optimal loading
- **Tree Shaking** — Unused code is eliminated from bundles
- **Modern JavaScript** — Uses latest ES features with Vite optimization
- **Efficient Rendering** — React 18 with concurrent features

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-tool`
3. **Commit changes:** `git commit -m 'Add amazing new tool'`
4. **Push to branch:** `git push origin feature/amazing-tool`
5. **Open a Pull Request**

### Development Guidelines
- Follow React best practices and hooks patterns
- Use Tailwind CSS for consistent styling
- Implement proper error handling and loading states
- Add tools to appropriate categories
- Update documentation for new features
- Test on multiple screen sizes and devices

### Tool Development Standards
- Each tool should be self-contained in its own directory
- Use consistent UI patterns with panel styling
- Implement copy-to-clipboard functionality where applicable
- Add proper input validation and error messages
- Include helpful examples and usage instructions

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Daniel Mark**
- GitHub: [@danielmarkjohn](https://github.com/danielmarkjohn)
- LinkedIn: [danielmarkjohn](https://linkedin.com/in/danielmarkjohn)

---

## 🙏 Acknowledgments

- **React Team** — For the amazing React framework
- **Tailwind CSS** — For the utility-first CSS framework
- **Vite** — For the next-generation frontend tooling
- **Lucide React** — For the beautiful and consistent icon set
- **Open Source Community** — For inspiration and code examples

---

## 📊 Tool Categories

### Development (40+ tools)
JSON/XML processing, encoding/decoding, formatters, validators, generators, converters, hash functions, text processing, and development utilities.

### Multimedia (10+ tools)
Image editing, format conversion, color tools, QR codes, ASCII art, gradients, and visual content creation.

### Gaming (5+ tools)
RPG tools, dice rollers, name generators, character creators, and tabletop gaming utilities.

### Utility (5+ tools)
Calculator, timer, text generators, and general-purpose tools.

---

<div align="center">

**⭐ Star this repo if you find it useful!**

**Built with ❤️ by Daniel Mark**

*The ultimate toolkit for developers, designers, and creators*

</div>
