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
        md: "1024px",
        lg: "1366px",
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
      },
      keyframes: {
        fadeIn: {
          "0%": { transform: "translateX(-50px)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
