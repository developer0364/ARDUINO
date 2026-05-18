import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://opentdb.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.error('Proxy error:', err);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            if (proxyRes.statusCode === 429) {
              console.warn('⚠️ OpenTDB rate limit (429):', req.url);
            }
          });
        },
      },
    },
  },
})