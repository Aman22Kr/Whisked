/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#fc4295', 50: '#fff1f7', 100: '#ffe0ee', 200: '#ffc2dd', 300: '#ff94c2', 400: '#fd68a9', 500: '#fc4295', 600: '#e11d78', 700: '#bc1262' },
        ink: { DEFAULT: '#1f1a1d', soft: '#5b5358' },
        cream: '#fff8f3',
      },
      fontFamily: { sans: ['Poppins', 'system-ui', 'sans-serif'], display: ['"Playfair Display"', 'Georgia', 'serif'] },
      maxWidth: { page: '1280px' },
      boxShadow: { card: '0 6px 24px -8px rgba(252,66,149,.25)' },
    },
  },
  plugins: [],
};
