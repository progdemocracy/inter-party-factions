import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        likud: resolve(__dirname, 'party-likud/index.html'),
        democrats: resolve(__dirname, 'party-democrats/index.html'),
        zionutdatit: resolve(__dirname, 'party-zionutdatit/index.html'),
      },
    },
  },
});