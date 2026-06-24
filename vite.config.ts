import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        likud: resolve(__dirname, 'likud/index.html'),
        democrats: resolve(__dirname, 'democrats/index.html'),
        zionutdatit: resolve(__dirname, 'zionutdatit/index.html'),
      },
    },
  },
});