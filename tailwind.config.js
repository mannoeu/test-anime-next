/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    // ...
    require("@tailwindcss/line-clamp"),
  ],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "c-light": "#FDFDFD",
        "c-light-2": "#424347",
        "c-dark": "#0D0E10",
        "c-dark-opacity": "#0D0E1070",
        "c-grey": "#18181C",
      },
    },
  },
  plugins: [],
};
