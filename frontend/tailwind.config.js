module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "text-blue-700": "rgb(13, 8, 242)",
      },
      lineHeight: {
        12: "3rem",
      },
      padding: {
        full: "100%",
        half: "50%",
        third: "33%",
      },
      fontSize: {
        "3xl": "2.0625rem", //33px
        "4xl": "2.5625rem", //41px
        "7xl": "4.4375rem", //71px
        "8xl": "5.5rem", //88px
      },
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
