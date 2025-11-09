import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // important for correct paths
  build: {
    outDir: 'dist', // ensures vite outputs to /dist
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
