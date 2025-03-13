import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Set up proper base path for production
  base: "./",
  // Configure build options for better asset handling
  build: {
    outDir: "dist",
    assetsDir: "assets",
    // Configure asset handling
    assetsInlineLimit: 4096, // 4kb
    // Improve chunking
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react', 
            'react-dom', 
            'react-router-dom'
          ],
        },
      },
    },
  },
})
