/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ double * means scan all folders inside src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
