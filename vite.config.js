import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/react-minesweeper/',   // repo name
  build: { outDir: 'docs' }      // publish build to /docs
})
