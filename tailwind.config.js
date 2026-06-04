/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f766e",
        secondary: "#155e75",
        accent: "#f59e0b",
      },
      boxShadow: {
        soft: "0 16px 40px rgba(15, 118, 110, 0.12)",
      },
    },
  },
  plugins: [],
};
