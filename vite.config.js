import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// GitHub Pages URL: https://lebw219.github.io/eco-teplo/
export default defineConfig({
  base: '/eco-teplo/',
  plugins: [react()],
})
