import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: {
          base: "#ffffff",
          medium: "#F8FAFF",
        },
        black: {
          base: "#000",
          medium: "#030303",
        },
        orange: {
          base: "#E07902",
        },
        gray: {
          base: "#B4B4B4",
        },
      },
      fontFamily: {
        montserrat: "Montserrat, sans-serif",
        bahnschrift: "Bahnschrift, sans-serif",
      },
      fontSize: {
        28: "28px",
        40: "40px",
        80: "80px",
      },
      lineHeight: {
        1.5: "150%",
        normal: "normal",
      },
      spacing: {
        12.5: "50px",
        18: "72px",
        15: "60px",
        33.5:"134px",
        45: "180px",
        85: "340px",
        95: "380px",
        115: "460px",
        150: "600px",
        167.5: "670px",
      },
      maxWidth: {
        87.5: "350px",
        120: "480px",
        163: "652px",
        212.5: "850px",
        235: "940px",
        265: "1060px",
        360: "1440px",
      },
      screens: {
        default: "0px",
        xs: "450px",
        sm: "600px",
        md: "720px",
        lg: "900px",
        gl: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1680px",
        "4xl": "1920px",
      },
    },
  },
  plugins: [],
};
export default config;
