/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/main/pages/**/*.{js,jsx,ts,tsx}',
    './src/main/components/**',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  fontFamily: { fontName: "fontFileName" },
};
