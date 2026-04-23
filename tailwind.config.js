/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0f766e',
        primaryDark: '#115e59',
        primarySoft: '#ccfbf1',
        highlight: '#fef3c7',
        bgGray: '#f8fafc',
        surface: '#ffffff',
        ink: '#0f172a',
      },
      overflow: {
        overlay: 'overlay',
      },
    },
  },
  plugins: [],
}
