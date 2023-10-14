import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(
  {
    server: {
      proxy: {
        '/api': 'https://userhub-itransition-db40c4fa7fa7.herokuapp.com/'
      }
    },
  plugins: [react()],
})
