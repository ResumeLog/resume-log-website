import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// One timestamp per build, shared by the client and SSR bundles so prerendered
// pages hydrate without date mismatches (legal pages' "Effective Date").
const buildDate = process.env.BUILD_DATE ?? new Date().toISOString().slice(0, 10)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __BUILD_DATE__: JSON.stringify(buildDate),
  },
})
