/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#111111",
        primary: "#e9ae7e", // Orange
        secondary: "#222526",
        tertiary: "#6cb8e6", // Blue
      },
      fontFamily: {
        main: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        titles: [
          "system-ui",
          "-apple-system",
          '"Segoe UI"',
          "Roboto",
          "Ubuntu",
          "Cantarell",
          '"Noto Sans"',
          "sans-serif",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Helvetica",
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
