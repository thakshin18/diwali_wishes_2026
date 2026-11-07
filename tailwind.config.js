/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        festive: {
          dark: '#07010f',
          midnight: '#0e041e',
          deepPurple: '#180733',
          royalPurple: '#2d0e5c',
          violet: '#541388',
          gold: '#ffd15c',
          brightGold: '#ffe680',
          darkGold: '#b38600',
          amber: '#ff9900',
          saffron: '#ff6200',
          flame: '#ff3d00',
          rose: '#e63946',
        }
      },
      fontFamily: {
        cinzel: ['"Cinzel Decorative"', 'Cinzel', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Outfit"', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 25px rgba(255, 209, 92, 0.45), 0 0 50px rgba(255, 153, 0, 0.25)',
        'glow-flame': '0 0 30px rgba(255, 98, 0, 0.7), 0 0 60px rgba(255, 209, 92, 0.4)',
        'glow-box': '0 0 40px rgba(255, 215, 0, 0.3), inset 0 0 20px rgba(255, 215, 0, 0.2)',
        'card-lux': '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 179, 0, 0.15)',
      },
      animation: {
        'flame-flicker': 'flicker 1.8s ease-in-out infinite alternate',
        'diya-float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'spin-slow': 'spin 25s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { transform: 'scale(1) rotate(-1deg)', opacity: '0.95', filter: 'drop-shadow(0 0 8px #ff9900)' },
          '25%': { transform: 'scale(1.06, 0.94) rotate(1.5deg)', opacity: '1', filter: 'drop-shadow(0 0 15px #ff6200)' },
          '50%': { transform: 'scale(0.96, 1.04) rotate(-0.5deg)', opacity: '0.9', filter: 'drop-shadow(0 0 10px #ffd15c)' },
          '75%': { transform: 'scale(1.03, 0.98) rotate(1deg)', opacity: '1', filter: 'drop-shadow(0 0 18px #ff7b00)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}

