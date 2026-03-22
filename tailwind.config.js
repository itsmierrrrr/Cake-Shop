/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#fff8f1',
        blush: '#f8dde4',
        rose: '#efc8d2',
        almond: '#ead7c2',
        cocoa: '#8c6a56',
        truffle: '#4f3d34',
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(104, 70, 50, 0.25)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
}

