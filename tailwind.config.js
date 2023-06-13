/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'bg-shadow': '0 0 10px 1000px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
