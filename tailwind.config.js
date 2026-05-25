/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FCFAF7',
          100: '#FAF8F4',
          200: '#F5ECE1',
          300: '#EADBC8',
          400: '#DAC0A3',
          DEFAULT: '#FAF8F5',
        },
        charcoal: {
          50: '#F4F4F4',
          100: '#E7E7E7',
          400: '#5F5F5F',
          700: '#2A2A2A',
          800: '#1E1E1E',
          900: '#121212',
          DEFAULT: '#1E1E1F',
        },
        terracotta: {
          50: '#FDF6F4',
          100: '#FAE8E2',
          500: '#D45B34',
          600: '#B84A2A',
          700: '#9E3A20',
          DEFAULT: '#D45B34',
        },
        gold: {
          100: '#F9F1E6',
          400: '#D9A752',
          500: '#C5A880',
          600: '#B09062',
          DEFAULT: '#C5A880',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Outfit"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 2s infinite ease-in-out',
        'shimmer': 'shimmer 2.5s infinite linear',
        'draw-line': 'drawLine 2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        drawLine: {
          '0%': { strokeDashoffset: '100%' },
          '100%': { strokeDashoffset: '0%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'premium': '0 4px 30px rgba(0, 0, 0, 0.03)',
        'luxury': '0 20px 40px rgba(0, 0, 0, 0.06)',
        'glow-terracotta': '0 0 20px rgba(212, 91, 52, 0.25)',
        'glow-gold': '0 0 20px rgba(197, 168, 128, 0.25)',
      }
    },
  },
  plugins: [],
}
