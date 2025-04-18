/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        anek: ["Anek Latin", "sans-serif"],
        nuniti: ["Nunito", "sans-serif"],
      },
      boxShadow: {
        1: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        2: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 1px 2px 6px 2px",
        3: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
      },
    },
  },
  plugins: [],
};
