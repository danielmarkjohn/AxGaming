import { defineConfig } from 'vite'

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react'
  },
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
