/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'soft': '0 10px 30px -12px rgba(0,0,0,0.25)',
      }
    },
  },
  plugins: [],
}
