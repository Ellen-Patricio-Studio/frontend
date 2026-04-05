import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `
          @use "@/assets/styles/_variaveis.scss" as *;
          @use "@/assets/styles/_mixins.scss" as *;
        `
      }
    }
  },
  server: {
    host: true
  }
})
