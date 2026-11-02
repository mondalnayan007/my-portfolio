import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#04050a",
          900: "#070914",
          800: "#0b0e1c",
          700: "#121629",
          600: "#1b2038",
        },
        brand: {
          violet: "#7c5cff",
          cyan: "#22d3ee",
          pink: "#f472b6",
          amber: "#fbbf24",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 50px -10px rgba(124,92,255,0.65)",
        "glow-cyan": "0 0 50px -10px rgba(34,211,238,0.55)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
        float: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-14px,0)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        aurora: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(60px,-40px,0) scale(1.15)" },
          "66%": { transform: "translate3d(-50px,30px,0) scale(0.95)" },
        },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        blink: { "50%": { opacity: "0" } },
        "scroll-dot": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(14px)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        float: "float 6s ease-in-out infinite",
        "gradient-shift": "gradient-shift 6s ease-in-out infinite alternate",
        aurora: "aurora 18s ease-in-out infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        blink: "blink 1s step-end infinite",
        "scroll-dot": "scroll-dot 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
