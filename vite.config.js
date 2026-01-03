import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-icons',
      'quill',
      'react-quill',
      '@radix-ui/react-label',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
      'class-variance-authority',
      'html2canvas',
      'jspdf',
      'lucide-react',
      'tailwind-merge',
      'uuid',
    ]
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});


