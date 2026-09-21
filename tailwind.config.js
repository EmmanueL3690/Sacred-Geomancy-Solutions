/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#08080A',
          900: '#0F0F12',
          800: '#18181C',
          700: '#26262C',
        },
        gold: {
          300: '#FDE047',
          400: '#FACC15',
          500: '#EAB308',
          600: '#CA8A04',
          700: '#A16207',
        },
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};