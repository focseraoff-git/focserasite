import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: './', // ✅ This is the key line — use relative paths
  build: {
    outDir: 'dist', // ✅ Ensure output goes to 'dist' (Vercel expects this)
  },
});
