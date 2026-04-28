/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        dark: {
          900: '#0a0a0f',
          800: '#0f0f17',
          750: '#13131e',
          700: '#181825',
          650: '#1c1c2e',
          600: '#1e1e30',
          500: '#252540',
          400: '#2e2e50',
        },
        accent: {
          green:  '#00d68f',
          red:    '#ff4d6a',
          blue:   '#4d9fff',
          yellow: '#ffd166',
          purple: '#a78bfa',
        },
      },
      boxShadow: {
        card:  '0 4px 24px rgba(0,0,0,0.35)',
        glow:  '0 0 20px rgba(0,214,143,0.15)',
        'glow-red': '0 0 20px rgba(255,77,106,0.15)',
      },
    },
  },
  plugins: [],
}
