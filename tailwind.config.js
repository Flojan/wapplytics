/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
    fontFamily: {
      "questa-regular": ["Questa Sans Regular", "sans-serif"],
      "questa-medium": ["Questa Sans Medium", "sans-serif"],
      "questa-bold": ["Questa Sans Bold", "sans-serif"],
      "questa-black": ["Questa Sans Black", "sans-serif"],
    },
  },
  plugins: [],
};
