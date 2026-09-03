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
        },
        category: {
          photo: '#2563eb',
          event: '#ea580c',
          interior: '#d97706',
          media: '#7c3aed',
          web: '#0d9488',
          design: '#4f46e5',
        }
      },
      boxShadow: {
        'card-sm': '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)',
        'card-md': '0 4px 12px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.03)',
        'card-hover': '0 8px 25px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04)',
        'elevated': '0 12px 40px rgba(0,0,0,0.08)',
        'cta': '0 4px 14px rgba(11, 95, 255, 0.25)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '800' }],
        'heading-1': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading-2': ['1.75rem', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '700' }],
        'heading-3': ['1.25rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.7', fontWeight: '400' }],
      },
    },
    fontFamily: {
      heading: ['"Our Lexend"', 'sans-serif'],
      display: ['"Our Lexend"', 'sans-serif'],
      sans: ['"Our Lexend"', 'sans-serif'],
      serif: ['"Our Lexend"', 'sans-serif'],
      body: ['"Our Lexend"', 'sans-serif'],
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
