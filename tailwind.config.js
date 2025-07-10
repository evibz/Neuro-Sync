/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spinSlow 8s linear infinite',
        'pulse-glow': 'pulseGlow 6s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
        'wave': 'waveMove 10s ease-in-out infinite',
      },
      keyframes: {
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.1)' },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        waveMove: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-10%)' },
        },
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
        'conic-gradient': 'conic-gradient(from 180deg at center, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};