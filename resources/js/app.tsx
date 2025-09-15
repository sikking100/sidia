// import '../assets/assets/scss/main.scss';
// import "../../node_modules/bootstrap/scss/bootstrap.scss";
// import "../sass/template/scss/color_skins.scss";
// import "../../node_modules/font-awesome/scss/font-awesome.scss";

import "../../node_modules/bootstrap/scss/bootstrap.scss";
import "../assets/assets/scss/main.scss";
import "../assets/assets/scss/color_skins.scss";
import "../../node_modules/font-awesome/css/font-awesome.min.css";

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { configureEcho } from "@laravel/echo-react";

// declare global {
//     interface Window {
//         Echo: Echo<any>;
//         Pusher: typeof Pusher;
//     }
// }

// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'reverb', // penting: ini bedanya dengan Pusher biasa
//     key: import.meta.env.VITE_REVERB_APP_KEY,
//     wsHost: import.meta.env.VITE_REVERB_HOST ?? window.location.hostname,
//     wsPort: import.meta.env.VITE_REVERB_PORT ?? 8080,
//     wssPort: import.meta.env.VITE_REVERB_PORT ?? 8080,
//     forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
//     enabledTransports: ['ws', 'wss'],
// });

// import axios from 'axios'
// import './echo'
// window.axios = axios;

// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

configureEcho({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
})

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => title ? `${title} - ${appName}` : appName,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
