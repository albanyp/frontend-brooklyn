/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,svg}",
  ],  
  theme: {
    extend: {
      fontFamily: {
        'sans': ['ui-sans-serif', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
