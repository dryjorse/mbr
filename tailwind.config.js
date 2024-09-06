/** @type {import('tailwindcss').Config} */
const twColors = require("tailwindcss/colors");

const colors = {
  white: twColors.white,
  black: twColors.black,
  gray: "#1c1c1e",
  green: "#04994e",
  grey: "#939498",
  "light-gray": "#161616",
  "border-gray": "#333335",
  transparent: twColors.transparent,
  red: "#E34C4A",
  yellow: "#FABF01",
  orange: "#F87017",
  blue: "#3A8BFF",
  turquoise: "#23D2B7",
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors,
    extend: {
      borderRadius: {
        circle: "50%",
      },
      padding: {
        10: "10px",
        20: "20px",
        30: "30px",
        40: "40px",
        50: "50px",
        60: "60px",
        70: "70px",
        80: "80px",
        90: "90px",
        100: "100px",
      },
      margin: {
        10: "10px",
        20: "20px",
        30: "30px",
        40: "40px",
        50: "50px",
        60: "60px",
        70: "70px",
        80: "80px",
        90: "90px",
      },
      fontSize: {
        14: "14px",
        16: "16px",
        18: "18px",
        24: "24px",
      },
      fontFamily: {
        nunito: "Nunito",
      },
      screens: {
        ublt: { max: "1440px" },
        blt: { max: "1200px" },
        lt: { max: "1024px" },
        tb: { max: "768px" },
        stb: { max: "540px" },
        bmb: { max: "425px" },
        amb: { max: "375px" },
        smb: { max: "340px" },
      },
    },
  },
  plugins: [],
};
