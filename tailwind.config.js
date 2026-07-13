/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A96E',
          light: '#D4B87A',
          dark: '#B8860B',
        },
        brown: {
          900: '#1a1510',
          800: '#2d241c',
        },
        heritage: {
          cream: '#FAF9F6',
          warm: '#F5F0EB',
          gold: '#C9A96E',
          'gold-light': '#D4B87A',
          charcoal: '#2C2C2C',
          stone: '#E8E4DE',
          linen: '#F0EDE8',
        },
        focsera: {
          primary: '#0B5FFF',
          secondary: '#4F8CFF',
          bg: '#FAF9F6',
          white: '#FFFFFF',
          accent: '#EAF2FF',
          text: '#1a1a1a',
          muted: '#6B7280',
          border: '#E8E4DE',
        }
      },
    },
    fontFamily: {
      heading: ['Playfair Display', 'serif'],
      display: ['Playfair Display', 'serif'],
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
