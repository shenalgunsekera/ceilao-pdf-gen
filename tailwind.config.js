// Ceilao Tailwind CSS Config
// Theme: Orange (#FFA500), White (#FFFFFF)
// Dark mode: class
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        orange: '#FFA500',
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
};

