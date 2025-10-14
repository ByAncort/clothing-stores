import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from 'tailwindcss';
import path from 'path';

// Configuración base de Vite
export default defineConfig({
  plugins: [
    react(),          // 👈 plugin oficial de React
    tsconfigPaths(),  // 👈 soporte para alias de tsconfig
  ],

  css: {
    postcss: {
      plugins: [tailwindcss()], // 👈 Tailwind habilitado correctamente
    },
  },

  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'app'), // 👈 para ~/hooks, ~/component, etc.
    },
  },

  server: {
    port: 5173,
    open: true,
  },
});
