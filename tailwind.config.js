/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      container: { center: true, padding: '1rem' },
      fontFamily: {
        display: ['ui-sans-serif','system-ui','-apple-system','Segoe UI','Inter','Roboto','Ubuntu','Cantarell','Noto Sans','Helvetica Neue','Arial','sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 30px -10px rgba(0,0,0,0.25)'
      }
    },
  },
  plugins: [],
}
