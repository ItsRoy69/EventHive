/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "",
        secondary: {
        },
      },
      fontFamily: {
        times: ['"Times New Roman"', 'serif'],
      },
    },
  },
  plugins: [],
};