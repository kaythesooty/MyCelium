import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@audio': path.resolve(__dirname, './src/audio'),
      '@components': path.resolve(__dirname, './src/components'),
      '@data': path.resolve(__dirname, './src/data'),
      '@game': path.resolve(__dirname, './src/game'),
      '@layers': path.resolve(__dirname, './src/layers'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@enums': path.resolve(__dirname, './src/models/enums.ts'),
      '@interfaces': path.resolve(__dirname, './src/models/interfaces.ts'),
    },
  },
})
