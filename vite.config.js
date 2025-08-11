import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    open: true,
    cors: true,
    hmr: {
      port: 24678
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true,
    open: true
  },
  base: '/'
})
