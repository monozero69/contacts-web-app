import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['tests/vitest-setup.js'],
    coverage: {
      include: ['src/**/*.js', 'src/**/*.jsx'],
      exclude: ['src/main.jsx']
    },
    testTimeout: 60000, 
  }
})
