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
      '@assets': path.resolve(__dirname, './client/assets'),
      '@components': path.resolve(__dirname, './client/components'),
      '@context': path.resolve(__dirname, './client/context'),
      '@data': path.resolve(__dirname, './client/data'),
      '@game': path.resolve(__dirname, './client/game'),
      '@hooks': path.resolve(__dirname, './client/hooks'),
      '@pages': path.resolve(__dirname, './client/pages'),
      '@styles': path.resolve(__dirname, './client/styles'),
      '@utils': path.resolve(__dirname, './client/utils'),
      '@models': path.resolve(__dirname, './models'),
    },
  },
})
