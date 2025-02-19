/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "2/3": "66%",
        "3/4": "75%",
      },
    },
  },
  plugins: [],
};
