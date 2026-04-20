/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Bodoni Moda", "Playfair Display", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      },
      colors: {
        night: "#0A0A0A",
        obsidian: "#0A0A0A",
        ink: "#050505",
        panel: "#0d1020",
        surface: "#111427",
        champagne: {
          50: "#FBF6E6",
          100: "#F5EAC2",
          200: "#EBD68B",
          300: "#DFC05A",
          400: "#D4AF37",
          500: "#B8931F",
          600: "#8F7118",
          700: "#6A5412",
          DEFAULT: "#D4AF37"
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
          champagne: "#D4AF37",
          rose: "#d4a373"
        },
        neon: {
          cyan: "#22d3ee",
          purple: "#a855f7",
          blue: "#3b82f6",
          rose: "#f43f5e",
          emerald: "#10b981",
          amber: "#f59e0b",
          gold: "#fbbf24"
        }
      },
      boxShadow: {
        glow: "0 0 30px rgba(34, 211, 238, 0.35)",
        "glow-lg": "0 0 60px rgba(34, 211, 238, 0.25), 0 0 120px rgba(34, 211, 238, 0.1)",
        purple: "0 0 32px rgba(168, 85, 247, 0.35)",
        "purple-lg": "0 0 60px rgba(168, 85, 247, 0.25)",
        rose: "0 0 32px rgba(244, 63, 94, 0.35)",
        neon: "0 0 5px theme(colors.neon.cyan), 0 0 20px theme(colors.neon.cyan / 30%)"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-mesh":
          "radial-gradient(at 27% 37%, rgba(251,191,36,0.18) 0px, transparent 50%), radial-gradient(at 97% 21%, rgba(217,119,6,0.14) 0px, transparent 50%), radial-gradient(at 52% 99%, rgba(168,85,247,0.10) 0px, transparent 50%), radial-gradient(at 10% 29%, rgba(252,211,77,0.10) 0px, transparent 50%), radial-gradient(at 97% 96%, rgba(245,158,11,0.10) 0px, transparent 50%)",
        "gold-shine":
          "linear-gradient(135deg, #fde68a 0%, #fbbf24 25%, #f59e0b 50%, #d97706 75%, #92400e 100%)",
        "gold-soft":
          "linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fbbf24 100%)"
      },
      animation: {
        "aurora": "aurora 12s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 10s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "slide-down": "slide-down 0.3s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "spin-slow": "spin 3s linear infinite",
        "marquee": "marquee 30s linear infinite",
        "gradient-x": "gradient-x 3s ease infinite",
        "border-spin": "border-spin 3s linear infinite",
        "count-up": "count-up 2s ease-out forwards"
      },
      keyframes: {
        aurora: {
          "0%, 100%": { backgroundPosition: "50% 50%, 50% 50%" },
          "50%": { backgroundPosition: "350% 50%, 350% 50%" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" }
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" }
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        },
        "slide-down": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" }
        },
        "border-spin": {
          "0%": { "--angle": "0deg" },
          "100%": { "--angle": "360deg" }
        }
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)"
      }
    }
  },
  plugins: []
};
