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
          primary: "#173B50",
          secondary: "#426D7D",
          dark: "#102B38",
          paper: "#F5F1E8",
          warm: "#FAF8F2",
          cream: "#F5F1E8",
          gold: "#C49A62",
          goldInk: "#8A6A33",
          ink: "#252B2C",
          muted: "#7C8583",
          border: "#DED9CE",
          gray: "#9AA6AD",
        },
        "logo-surface": "var(--logo-surface)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "PingFang SC", "Microsoft YaHei", "sans-serif"],
        serif: ["var(--font-serif)", "Songti SC", "SimSun", "Georgia", "serif"],
      },
      boxShadow: {
        archive: "0 1px 0 rgba(37, 43, 44, 0.06), 0 12px 40px -16px rgba(16, 43, 56, 0.12)",
        lift: "0 20px 50px -24px rgba(16, 43, 56, 0.18)",
      },
      borderRadius: {
        sm: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
