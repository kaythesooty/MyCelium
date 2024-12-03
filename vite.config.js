import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  resolve: {
    alias: {
      '@audio': path.resolve(__dirname, './client/audio'),
      '@components': path.resolve(__dirname, './client/components'),
      '@data': path.resolve(__dirname, './client/data'),
      '@game': path.resolve(__dirname, './client/game'),
      '@pages': path.resolve(__dirname, './client/pages'),
      '@styles': path.resolve(__dirname, './client/styles'),
      '@utils': path.resolve(__dirname, './client/utils'),
      '@enums': path.resolve(__dirname, './models/enums.ts'),
      '@interfaces': path.resolve(__dirname, './models/interfaces.ts'),
    },
  },
})
