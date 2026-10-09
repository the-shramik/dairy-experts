import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// BASE is set by the GitHub Pages workflow (e.g. /dairy-experts/); defaults to / for local and custom domains.
export default defineConfig({
  base: process.env.BASE || '/',
  plugins: [react(), tailwindcss()],
})
