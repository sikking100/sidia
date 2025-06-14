const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.tsx',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'kemenag': '#063A69',
        'kemenag-dark': '#095599',
        'nav-hover': '#086906'
      },
    },
  },

  plugins: [require('@tailwindcss/forms'), require('flowbite/plugin'), require('@tailwindcss/typography')],
};
