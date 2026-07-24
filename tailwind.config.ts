import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F3F5EE",
        surface: "#EAEEDF",
        ink: "#26314A",
        muted: "#5C6B63",
        sawah: {
          DEFAULT: "#1F4D3A",
          dark: "#122E22",
          light: "#3B7357",
        },
        gabah: {
          DEFAULT: "#C9962C",
          dark: "#A87A1E",
          light: "#E4B85B",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-public-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "terrace-lines":
          "repeating-linear-gradient(180deg, rgba(31,77,58,0.06) 0px, rgba(31,77,58,0.06) 1px, transparent 1px, transparent 28px)",
      },
    },
  },
  plugins: [],
};

export default config;
