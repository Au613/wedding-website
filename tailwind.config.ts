import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F4EEE4",
          soft: "#FAF6F0",
          deep: "#E8DFD2",
        },
        burgundy: {
          DEFAULT: "#6F2A3D",
          dark: "#4A1C2C",
          light: "#8A3A52",
          mist: "#F3E6EA",
        },
        gold: {
          DEFAULT: "#C4A36A",
          muted: "#B08D52",
          pale: "#E8D7B5",
          ink: "#8A6E3A",
        },
        ink: {
          DEFAULT: "#2C241F",
          muted: "#6B6158",
          faint: "#9A9086",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1400px",
      },
      boxShadow: {
        card: "0 10px 30px -18px rgba(74, 28, 44, 0.28)",
        lift: "0 16px 40px -20px rgba(74, 28, 44, 0.35)",
        soft: "0 6px 20px -12px rgba(44, 36, 31, 0.18)",
      },
      borderRadius: {
        card: "1.15rem",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(196, 163, 106, 0.45)" },
          "50%": { boxShadow: "0 0 0 8px rgba(196, 163, 106, 0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease both",
        float: "float 6s ease-in-out infinite",
        "pulse-gold": "pulse-gold 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
