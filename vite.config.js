import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoBase = '/react-tic-tac-toe/'

// https://vitejs.dev/config/
export default defineConfig({
   base: repoBase,
   plugins: [react()],
})
