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
          blue: "#0052CC", // Deep Electric Blue
          "blue-hover": "#003D99",
          "blue-light": "#EFF6FF",
          orange: "#FF6B00", // Vibrant Cyber Orange
          "orange-hover": "#E05D00",
          "orange-light": "#FFF7ED",
          gold: "#F59E0B",
          slate: "#0F172A",
          muted: "#64748B",
          bg: "#FFFFFF",
          surface: "#F8FAFC",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        handwriting: ["var(--font-caveat)", "Georgia", "cursive", "serif"],
      },
      boxShadow: {
        course: "0 10px 30px -5px rgba(0, 82, 204, 0.12), 0 4px 6px -2px rgba(15, 23, 42, 0.04)",
        "course-hover": "0 25px 50px -12px rgba(0, 82, 204, 0.22), 0 10px 15px -3px rgba(15, 23, 42, 0.08)",
        "orange-glow": "0 10px 30px -5px rgba(255, 107, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
