import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // ← твой src
      'base': path.resolve(__dirname, './src/scss/base'),
      'components': path.resolve(__dirname, './src/scss/components'),
      'layout': path.resolve(__dirname, './src/scss/layout'),
      'themes': path.resolve(__dirname, './src/scss/themes'),
      'utils': path.resolve(__dirname, './src/scss/utils'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "utils/variables" as *;
          @use "utils/mixins" as *;
        `
      }
    }
  }
})
