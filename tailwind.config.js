module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all relevant files for classes
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Custom color
        secondary: '#9333EA',
        customBlue: '#1E40AF', // Another custom color
      },
      spacing: {
        '128': '32rem', // Custom spacing utilities
        '144': '36rem',
      },
    },
  },
  plugins: [
    require('daisyui'), // Optional Tailwind plugins like DaisyUI
  ],
};