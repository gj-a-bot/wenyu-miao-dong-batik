import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#183B56",
          dark: "#0B1F33",
          cream: "#F4F0E6",
          gold: "#C69B5D",
          gray: "#9AA6AD",
          muted: "#5F6B73",
        },
      },
      fontFamily: {
        sans: [
          "PingFang SC",
          "Microsoft YaHei",
          "Noto Sans SC",
          "system-ui",
          "sans-serif",
        ],
        serif: ["Songti SC", "SimSun", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
