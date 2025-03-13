import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Production build optimizations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs
        drop_debugger: true, // Remove debugger statements
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Remove specific functions
      },
      output: {
        comments: false, // Remove comments
      },
      mangle: {
        safari10: true, // Better Safari compatibility
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code into separate chunks
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: [
            '/src/components/ui/button.jsx',
            '/src/components/ui/form.jsx',
            '/src/components/ui/input.jsx',
            '/src/components/ui/label.jsx',
            '/src/components/ui/radio-group.jsx',
            '/src/components/ui/select.jsx',
            '/src/components/ui/tabs.jsx',
            '/src/components/ui/textarea.jsx',
          ],
        },
      },
    },
    sourcemap: false, // Disable source maps in production
  },
})
