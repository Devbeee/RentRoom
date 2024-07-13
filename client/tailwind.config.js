/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      width: {
        1100: "1100px",
      },
      backgroundColor: {
        primary: "#f5f5f5",
        secondary: "#1266dd",
        third: "#f73859",
      },
      maxWidth: {
        '600': "600px",
        '1100': "1100px",
      },
    },
  },
  plugins: [],
};
