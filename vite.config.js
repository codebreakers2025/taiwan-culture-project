import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? 'taiwan-culture-project' : '/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'production' ? 'https://taiwancultureproject.onrender.com/' : 'http://localhost:3002', // 對應 JSON Server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src', // 設置 @ 為 src 目錄的別名
      global: 'globalThis', // 設置 alias，使 global 指向 globalThis
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/css/variables.scss" as *;`, // 引入全局變數文件
      },
    },
  },
  define: {
    global: 'globalThis', // 將 global 指向 globalThis 來解決問題
  },
})
