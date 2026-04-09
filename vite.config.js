import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Replace 'your-repo-name' with your actual GitHub repository name
// Example: if your repo is github.com/username/alexanderplatz-game, use '/alexanderplatz-game/'
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/your-repo-name/',
})
