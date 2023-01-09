import react from '@vitejs/plugin-react'
import copy from 'rollup-plugin-copy'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [
        {
          src: 'node_modules/@emdgroup-liquid/liquid/dist/liquid/assets/*',
          dest: 'public/liquid/assets',
        },
      ],
      hook: 'buildStart',
    }),
  ],
})
