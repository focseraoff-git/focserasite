/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          light: '#FFD700',
          dark: '#B8860B',
        },
        brown: {
          900: '#1a1510',
          800: '#2d241c',
        }
      },
    },
    fontFamily: {
      heading: ['Poppins', 'sans-serif'],
      sans: ['Inter', 'sans-serif'],
      serif: ['Playfair Display', 'serif'],
    },
    keyframes: {
      shimmer: {
        '0%': { transform: 'translateX(-100%)' },
        '100%': { transform: 'translateX(100%)' },
      }
    },
    animation: {
      shimmer: 'shimmer 1.5s infinite',
    }
  },
  plugins: [
    typography,
  ],
};
