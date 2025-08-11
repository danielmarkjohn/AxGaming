/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f5ff',
          100: '#e6ebff',
          200: '#c0caff',
          300: '#99a8ff',
          400: '#4d66ff',
          500: '#2139ff',
          600: '#1226db',
          700: '#0f20b2',
          800: '#0c1a8a',
          900: '#091463'
        }
      },
      boxShadow: {
        hud: '0 6px 40px rgba(124,58,237,0.12), inset 0 -8px 30px rgba(0,0,0,0.45)'
      }
    }
  },
  plugins: [],
}

