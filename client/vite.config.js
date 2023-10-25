import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(), VitePWA({
    injectRegister: 'auto',
    registerType: 'prompt',
    manifest: {
      name: "Israid Needs Assessment",
      icons: [
        {
          src: 'icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
      ]
    },
    devOptions: {
      enabled: true
    }
  })],
  define: {
    'global': 'window', 
    'process.env': {}
  }
});