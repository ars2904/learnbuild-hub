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
          blue: "#0052CC",
          "blue-hover": "#0041A3",
          "blue-glow": "#3B82F6",
          "blue-dark": "#0A192F",
          orange: "#FF6B00",
          "orange-hover": "#E05D00",
          "orange-glow": "#FF8C38",
          gold: "#F59E0B",
          dark: "#0A0D14", // Deep Midnight
          surface: "#121620",
          card: "#161B26",
          border: "rgba(255, 255, 255, 0.1)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-blue": "0 0 35px -5px rgba(0, 82, 204, 0.35)",
        "glow-orange": "0 0 35px -5px rgba(255, 107, 0, 0.35)",
        "card-glass": "0 20px 40px -15px rgba(0, 0, 0, 0.7)",
      },
      backgroundImage: {
        "cyber-grid": "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
export default config;
