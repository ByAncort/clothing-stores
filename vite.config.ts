import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths({ root: "./" })],
  resolve: {
    alias: [
      { find: '~', replacement: '/app' }
    ],
  },
  server: {
  proxy: {
    '/api/auth': {
      target: 'http://localhost:9010',
      changeOrigin: true,
      secure: false,
      // ESTO ES CLAVE: Re-escribe el path antes de enviarlo al backend
      rewrite: (path) => path.replace(/^\/api\/auth/, '/api/auth/'), 
    }
  }
}
});

