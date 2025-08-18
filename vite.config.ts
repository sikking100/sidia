import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
        host: true,
  },
  plugins: [
    laravel({
      input: 'resources/js/app.tsx',
    }),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true, // 👉 aktifkan PWA di mode dev
      },
      includeAssets: [
        'favicon.ico',
        'robots.txt'
      ],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
          navigateFallback: null, // ⚡ cegah auto fallback ke index.html
        },
        manifest: {
          name: 'Sidia',
          short_name: 'Sidia',
          description: 'Aplikasi Laravel + React + Inertia',
          theme_color: '#0d6efd',
          background_color: '#ffffff',
          display: 'standalone',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '192morut.webp',
              sizes: '192x192',
              type: 'image/webp',
            },
            {
              src: '512morut.webp',
              sizes: '512x512',
              type: 'image/webp',
            },
            {
              src: '512morut.webp',
              sizes: '512x512',
              type: 'image/webp',
              purpose: 'any maskable',
            },
          ],
          "screenshots": [
            {
              "src": "/mobile.png",
              "type": "image/png",
              "sizes": "540x720",
              "form_factor": "narrow",
              "label": "Tampilan Mobile"
            },
            {
              "src": "/desktop.png",
              "type": "image/png",
              "sizes": "1200x800",
              "form_factor": "wide",
              "label": "Tampilan Desktop"
            }
          ]
        },
    }),
  ],
});
