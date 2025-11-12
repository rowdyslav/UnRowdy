import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // разрешает подключения не только с localhost
    port: 5173, // твой порт
    strictPort: false,
    allowedHosts: true
  }
})
