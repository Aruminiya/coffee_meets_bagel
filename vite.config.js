import 'dotenv/config'
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// eslint-disable-next-line import/no-extraneous-dependencies
import eslintPlugin from 'vite-plugin-eslint'

// eslint-disable-next-line no-control-regex
const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g
const DRIVE_LETTER_REGEX = /^[a-z]:/i

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? `/${process.env.REPOSITORY_NAME}/` : '/',
  // base: 'coffee_meets_bagel/',
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    })
  ],
  // 參考 https://ithelp.ithome.com.tw/articles/10301528
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import \'@/assets/main.scss\';'
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
        sanitizeFileName (name) {
          const match = DRIVE_LETTER_REGEX.exec(name)
          const driveLetter = match ? match[0] : ''
          // substr 是被淘汰語法，因此要改 slice
          return (
            driveLetter +
            name.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, '')
          )
        }
      }
    }
  }
})
