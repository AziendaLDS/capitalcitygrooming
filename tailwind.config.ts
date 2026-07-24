import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "var(--forest)",
        stone: "var(--stone)",
        paper: "var(--paper)",
        brass: "var(--brass)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "-apple-system", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      spacing: {
        // Locked spacing scale: 4/8/16/24/40/64/96
        1: "4px",
        2: "8px",
        4: "16px",
        6: "24px",
        10: "40px",
        16: "64px",
        24: "96px",
      },
      maxWidth: {
        content: "1200px",
      },
      transitionTimingFunction: {
        "out-tag": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
