# ToolBox Pro — Ultimate Dashboard Experience

<div align="center">

![ToolBox Pro](https://img.shields.io/badge/ToolBox-Pro-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=for-the-badge&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css)


[🚀 Live Demo](#) • [📖 Documentation](#features) • [🛠️ Installation](#installation) • [⚙️ Tools](#tools)

</div>

---

## ✨ Features

### 🎯 **Modern Dashboard Experience**
- **Call of Duty Inspired UI** — Military-grade aesthetics with 3D card effects
- **Responsive Design** — Perfect on desktop, tablet, and mobile
- **Real-time Search** — Find tools instantly with smart filtering
- **Dark Theme** — Easy on the eyes with gradient backgrounds

### 🛠️ **Productivity Tools**
- **12+ Built-in Tools** — Everything from calculators to code formatters
- **Category Organization** — Tools grouped by utility, formatters, generators
- **One-Click Launch** — Open tools in new tabs or embedded view
- **Professional Grade** — Enterprise-ready utilities

---

## 🚀 Quick Start

### Prerequisites
- Node.js 22+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/danielmarkjohn/toolbox-pro.git
cd toolbox-pro

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## ⚙️ Tools

### 🔧 **Utility Tools**
- **Calculator** — Advanced scientific calculator with history
- **Timer** — Countdown timer and stopwatch functionality

### 🔄 **Formatters & Validators**
- **JSON Formatter** — Format and beautify JSON data
- **Regex Tester** — Test and debug regular expressions
- **CSS Units Converter** — Convert between px, rem, em, vw, etc.
- **Timestamp Converter** — Unix timestamps to readable dates
- **JWT Parser** — Decode and view JWT token contents
- **SVG Viewer** — Preview and validate SVG code

### 🎲 **Generators**
- **UUID Generator** — Generate random unique identifiers
- **Lorem Ipsum Generator** — Generate placeholder text
- **Base64 Encoder/Decoder** — Encode and decode Base64 data

---

## 🏗️ Project Structure

```
src/
├── @components/          # Reusable UI components
├── @config/             # Configuration files
│   ├── tools.js         # Tool definitions
│   ├── homepage.js      # Homepage settings
│   └── coreConfig.js    # Core app configuration
├── @modules/            # Game and tool modules
│   └── tools/           # Tool implementations
├── pages/               # Main page components
│   ├── HomePage.jsx     # Landing page
│   └── ToolsDashboard.jsx # Tools launcher
└── App.jsx              # Main app component
```

---

## 🎨 Customization

### Adding New Tools

1. **Create the tool module:**
```bash
mkdir src/@modules/tools/my-tool
# Add index.html, style.css, script.js
```

2. **Register in config:**
```javascript
// src/@config/tools.js
{
  id: 'my-tool',
  title: 'My Awesome Tool',
  path: 'src/@modules/tools/my-tool/index.html',
  desc: 'Description of what it does',
  category: 'utility'
}
```

### Theming
- Modify `tailwind.config.js` for color schemes
- Update CSS custom properties in `src/index.css`
- Configure gradients and effects in component files

---

## 🔧 Configuration

### Environment Variables
```bash
# .env
VITE_APP_TITLE="ToolBox Pro"
VITE_GITHUB_URL="https://github.com/danielmarkjohn"
VITE_LINKEDIN_URL="https://linkedin.com/in/danielmarkjohn"
```

### Build Configuration
- **Vite** — Lightning fast build tool
- **PostCSS** — CSS processing with Tailwind
- **ESBuild** — Fast JavaScript bundling

---

## 📱 Mobile Support

- **Responsive Grid** — Adapts to all screen sizes
- **Touch Controls** — Optimized for mobile gaming
- **Swipe Navigation** — Intuitive mobile interactions
- **PWA Ready** — Can be installed as a mobile app

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Commit changes:** `git commit -m 'Add amazing feature'`
4. **Push to branch:** `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow React best practices
- Use Tailwind for styling
- Add proper TypeScript types
- Include tests for new features
- Update documentation

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

- **Unsplash** — Beautiful images for game thumbnails
- **Lucide React** — Clean and consistent icons
- **Tailwind CSS** — Utility-first CSS framework
- **Vite** — Next generation frontend tooling

---

<div align="center">

**⭐ Star this repo if you find it useful!**

Made with ❤️ by Daniel Mark

</div>
