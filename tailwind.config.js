module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // HEX format
        secondary: '#9333EA', // HEX format
        // Avoid modern formats like oklch
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
};