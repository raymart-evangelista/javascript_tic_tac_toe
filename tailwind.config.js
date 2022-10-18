/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./*.{html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito'],
        raleway: ['Raleway']
      }
    },
  },
  plugins: [],
}