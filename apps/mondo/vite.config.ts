/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsConfigPaths(),
    visualizer({
      filename: 'bundle-analysis.html',
      open: true,
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    css: false,
  },
});
