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
