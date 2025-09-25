import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import mdx from '@mdx-js/rollup';

export default defineConfig({
  plugins: [vue(), mdx()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
