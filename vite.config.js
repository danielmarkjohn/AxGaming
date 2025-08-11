import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0', // Listen on all addresses including LAN
    port: 3000,      // Custom port (default is 5173)
    strictPort: true, // Exit if port is already in use
    open: true,      // Auto-open browser on startup
    cors: true,      // Enable CORS
    hmr: {
      port: 24678    // Custom HMR port
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 8080,      // Custom preview port (default is 4173)
    strictPort: true,
    open: true
  },
  base: '/',         // Public base path
  mode: 'development' // Can be overridden by CLI --mode
})