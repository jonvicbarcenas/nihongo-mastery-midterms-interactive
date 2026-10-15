/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        torii: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          900: '#881337',
          950: '#4c0519',
        },
        sakura: {
          50: '#fdf2f8',
          100: '#fce7f3',
          300: '#f9a8d4',
          500: '#ec4899',
        },
        matcha: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          900: '#14532d',
          950: '#052e16',
        },
        fuji: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        }
      },
      fontFamily: {
        japanese: ['"Noto Sans JP"', '"Hiragino Kaku Gothic Pro"', 'Meiryo', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
