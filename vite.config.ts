// import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import {VitePWA} from 'vite-plugin-pwa'

export default () => {
    const manifestIcons = [
        {
            src: '/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png'
        },
        {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
        },
        {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
        }
    ]

    const publicIcons = [
        { src: '/favicon.ico' },
        { src: '/favicon.svg' },
        { src: '/apple-touch-icon.png' }
    ]

    return defineConfig({
        plugins: [
            laravel({
                input: ['resources/assets/assets/scss/main.scss', 'resources/js/app.tsx'],
                ssr: 'resources/js/ssr.tsx',
                refresh: true,
            }),
            react(),
            // tailwindcss(),
            VitePWA({
                registerType: 'autoUpdate',
                devOptions: {
                    enabled: true
                },
                includeAssets: [
                    'favicon.ico',
                    'robots.txt'
                ],
                workbox: {
                    // Add all the assets built by Vite into the public/build/assets
                    // folder to the SW cache.
                    globPatterns: ['**/*.{js,css,html,ico,jpg,png,svg,woff,woff2,ttf,eot}'],

                    // Define the root URL as the entrypoint for the offline app.
                    // vue-router can then takes over and shows the correct page
                    // if you are using it.
                    navigateFallback: null,

                    // Stops various paths being intercepted by the service worker
                    // if they're not available offline. Telescope is a good
                    // example, if you are using that.
                    navigateFallbackDenylist: [/^\/telescope/],

                    // Add some explicit URLs to the SW precache. This helps us
                    // work with the laravel/vite-plugin setup.
                    additionalManifestEntries: [
                        // Cache the root URL to get hold of the PWA HTML entrypoint
                        // defined in welcome.blade.php. Ref:
                        // https://github.com/vite-pwa/vite-plugin-pwa/issues/431#issuecomment-1703151065
                        { url: '/', revision: `${Date.now()}` },

                        // Cache the icons defined above for the manifest
                        ...manifestIcons.map((i) => {
                            return { url: i.src, revision: `${Date.now()}` }
                        }),

                        // Cache the other offline icons defined above
                        ...publicIcons.map((i) => {
                            return { url: i.src, revision: `${Date.now()}` }
                        }),
                    ],

                    // Ensure the JS build does not get dropped from the cache.
                    // This allows it to be as big as 3MB
                    maximumFileSizeToCacheInBytes: 3000000
                },
                manifest: {
                    // Metadata
                    name: 'SI-DiA DUKCAPIL 2.0',
                    short_name: 'SI-DiA 2.0',
                    description: 'Sistem Informasi Digitalisasi Adminduk Dinas Kependudukan dan Pencatatan Sipil Daerah Kabupaten Morowali Utara',
                    theme_color: '#0f65ad',
                    background_color: '#0f65ad',
                    orientation: 'portrait',
                    display: 'standalone',
                    scope: '/',
                    start_url: '/',
                    // These icons are used when installing the PWA onto a home screen
                    icons: [...manifestIcons],
                    screenshots: [
                        {
                            src: '/mobile.png',
                            sizes: '540x720', // ukuran screenshot (contoh iPhone 12)
                            type: 'image/png',
                            form_factor: 'narrow', // mobile
                            label: "Tampilan Mobile",
                        },
                        {
                            src: '/desktop.png',
                            sizes: '1200x800', // ukuran screenshot desktop
                            type: 'image/png',
                            form_factor: 'wide', // desktop
                            label: "Tampilan Desktop",
                        }
                    ]
                }
            }),
        ],
        esbuild: {
            jsx: 'automatic',
        },
        resolve: {
            alias: {
                'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
            },
        }
    });
};
