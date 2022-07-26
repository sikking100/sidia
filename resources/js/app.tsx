import './bootstrap';
import '../css/app.css';

import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

// @ts-ignore
const page = import.meta.glob('./Pages/**/*.tsx')

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, page),
  setup({ el, App, props }) {
    return render(<App {...props} />, el);
  },
});

InertiaProgress.init({ color: '#4B5563' });
