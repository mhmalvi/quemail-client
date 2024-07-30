import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xs: "640px",
        sm: "768px",
        md: "1080px",
        lg: "1360px",
        xl: "1600px",
        "2xl": "1920px",
      },
      colors: {
        "brand-color": "#6D53FF",
        "brand-color-2": "#c757ff",
        "button-color-2": "#8A49F7",
        "dark-glass": "#fafafa0d",
        "light-glass": "#ffffff1A",
        "light-black": "#4d4d4d",
        "dark-black": "#0b0b0b",
        bronze: {
          light: "#cd7f32",
          dark: "#8c5b23",
        },
        silver: {
          light: "#c0c0c0",
          dark: "#808080",
        },
        gold: {
          light: "#ffd700",
          dark: "#b89400",
        },
        platinum: {
          light: "#e5e4e2",
          dark: "#b4b2b0",
        },
        diamond: {
          light: "#b9f2ff",
          dark: "#7ec3d8",
        },
      },
      keyframes: {
        up: {
          "0%, 100%": { transform: "translateY(30px)" },
          "50%": { transform: "translateY(0px)" },
        },
        up1: {
          "0%, 100%": { transform: "translateY(30px)" },
          "50%": { transform: "translateY(0px)" },
        },
        up2: {
          "0%, 100%": { transform: "translateY(30px)" },
          "50%": { transform: "translateY(0px)" },
        },
        moveRight: {
          "0%": {
            transform: "translateX(-50px) translateZ(50px) translateY(50px)",
          },
          "100%": {
            transform: "translateX(40px) translateZ(50px) translateY(-50px)",
          },
        },
        closeEyes: {
          "0%": { height: "16px" },
          "25%": { height: "0px" },
          "50%": { height: "16px" },
          "75%": { height: "16px" },
          "100%": { height: "16px" },
        },
      },
      animation: {
        up: "up 2s linear infinite",
        up1: "up1 3s linear infinite",
        up2: "up2 4s linear infinite",
        moveRight: "moveRight 2s linear infinite",
        closeEyes: "closeEyes 2s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("flowbite/plugin")({
      charts: true,
    }),
  ],
};
export default config;
