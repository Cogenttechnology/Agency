import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],
  build: {
    // Increase warning threshold slightly for vendor bundles
    chunkSizeWarningLimit: 600,
    // Enable CSS code splitting — each page only loads the CSS it needs
    cssCodeSplit: true,
    // Minification settings
    minify: 'esbuild',
    target: 'es2020',
    rollupOptions: {
      output: {
        // Stable hashed filenames for long-term caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks(id) {
          // Three.js ecosystem — ~500KB, only needed on 3D pages (lazy loaded)
          if (id.includes('three') || id.includes('@react-three')) {
            return 'vendor-three';
          }
          // GSAP — ~200KB, shared across many pages but separate from React
          if (id.includes('gsap')) {
            return 'vendor-gsap';
          }
          // Lenis smooth scroll — ~40KB
          if (id.includes('lenis')) {
            return 'vendor-lenis';
          }
          // React + React DOM + React Router — core runtime
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'vendor-react';
          }
        },
      },
    },
  },
  // Optimize deps pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['three', '@react-three/fiber', '@react-three/drei'],
  },
});
