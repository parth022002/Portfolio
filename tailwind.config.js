/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xs': '380px',
      },
      colors: {
        obsidian: '#07090E',
        midnight: '#0C101A',
        navyCard: '#131A29',
        cyanGlow: '#00F0FF',
        skyGlow: '#38BDF8',
        neonGreen: '#00FF66',
        violetGlow: '#8B5CF6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
