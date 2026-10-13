import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base ('./') + HashRouter means the build works under ANY repo name
// (https://<user>.github.io/<repo>/) without editing this file.
// To force an absolute base, run:  VITE_BASE=/my-repo/ npm run build
export default defineConfig({
  base: process.env.VITE_BASE ?? './',
  plugins: [react()],
});
