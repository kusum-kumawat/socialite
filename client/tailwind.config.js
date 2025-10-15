/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4c4c4c", // Replace with your primary color code
        secondary: "#262626", // Replace with your secondary color code
        mbd: "rgb(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};
