import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Optional: Increases the warning limit to 1000kb
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React core
          'react-vendor': ['react', 'react-dom'],
          // Split 3D libraries (Three.js is very large)
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          // Split Animation libraries
          'animation-vendor': ['gsap', '@gsap/react', 'framer-motion', 'animejs'],
        },
      },
    },
  },
})