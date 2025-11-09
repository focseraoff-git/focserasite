import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // ✅ ensures assets resolve correctly
  build: {
    outDir: 'dist' // ✅ build output folder
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  }
});
