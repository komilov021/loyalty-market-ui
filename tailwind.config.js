/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html, js, ts, vue}", "./src/**/*"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        // primary: "#6941c6",
        main: {
          DEFAULT: "#2C1C5F",
        },
        primary: {
          DEFAULT: "#6941c6",
          300: "#D6BBFB",
          500: "#6941c6",
          600: "#7F56D9",
          700: "#6941C6",
        },
        text: {
          900: "#101828",
        },
        tertiary: {
          DEFAULT: "#475467",
          600: "#475467",
        },
        danger: "#FF7F51",
        purple: "#8758FF",
        line: "#F2F2F2",
        // main: "#C02221",
        mainLight: "#FF6969",
        darkGray: "#787878",
        mainDarkGray: "#44444F",
        lightGray: "#D9D9D9",
        textSecondary: "#6A707E",
        gray200: "#EAECF0",
        gray300: "#D0D5DD",
        gray700: "#344054",
        // primary600: "#7F56D9",
      },
    },
  },
  plugins: [],
};
