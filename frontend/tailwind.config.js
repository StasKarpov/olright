module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      display: ["group-hover"],
      colors: {
        "text-blue-700": "rgb(13, 8, 242)",
        "active-link": "var(--active-link-color)",
        grey: "#999999",
      },
      lineHeight: {
        12: "3rem",
        13: "3.125rem",
        15: "5rem",
        20: "6.25rem",
        25: "10rem",
        30: "16rem",
      },
      padding: {
        full: "100%",
        half: "50%",
        third: "28%",
      },
      fontSize: {
        xl: "1.25rem",
        "2xl": "1.75rem",
        "3xl": "2.0625rem", //33px
        "4xl": "2.5625rem", //41px
        "5xl": "2.7rem",
        "5.5xl": "3rem", //48px
        "7xl": "4.4375rem", //71px
        "8xl": "5rem", //80px
        "9xl": "5.5rem", //88px
        "12xl": "9rem",
        "20xl": "14.875rem",
        30: "1.875rem", //30px
        40: "2.5625rem", //41px
        50: "3.125rem", //50px
        60: "3.75rem", //60px
        71: "4.4375rem", //71px
        80: "5rem", //80px
        88: "5.5rem", //88px
      },
      letterSpacing: {
        widest: "0.175em",
        extrawide: "0.3em",
      },
      borderWidth: {
        3: "3px",
        6: "6px",
      },
    },
    fontFamily: {
      sans: ["Montserrat", "sans-serif"],
    },
    container: {
      center: true,
      padding: "2rem",
    },
  },
  plugins: [],
};
