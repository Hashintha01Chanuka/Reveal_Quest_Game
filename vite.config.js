import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy requests for the puzzle image
      "/banana-image": {
        target: "https://www.sanfoh.com", // The host blocking the image
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/banana-image/, ""),
      },
    },
  },
})
