import './bootstrap';
import '../css/app.css';

import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';


// @ts-ignore
// const page = import.meta.glob('./Pages/**/*.tsx')

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  // resolve: (name) => {
  //   const pageModule = page[`./Pages/${name}.tsx`]
  //   return pageModule ? pageModule.default : null
  //   // resolvePageComponent(`./Pages/${name}.tsx`, page)
  // },
  resolve: (name) => resolvePageComponent(
    `./Pages/${name}.tsx`,
    import.meta.glob('./Pages/**/*.tsx')
  ),
  setup({ el, App, props }) {
    // const root = createRoot(el)
    // root.render(<App {...props} />)
    // // return render(<App {...props} />, el);
    // // return {
    // //   destroy: () => root.unmount()
    // // }
    // if (!el) {
    //   return {};
    // }

    const root = createRoot(el);
    root.render(<App {...props} />);

    // return {
    //   destroy: () => root.unmount(),
    // };
  },
});

InertiaProgress.init({
  delay: 250,
  color: '#29d',
  includeCSS: true,
  showSpinner: true,
});
