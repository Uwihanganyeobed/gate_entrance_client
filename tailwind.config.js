// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E293B', // Deep Dark Blue
        secondary: '#0F172A', // Even Darker Blue
        accent: '#334155', // Dark Gray Blue
        muted: '#64748B', // Gray
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
};