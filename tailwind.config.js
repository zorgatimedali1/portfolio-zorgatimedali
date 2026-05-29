/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-navy': '#050816',
        'dark-surface': '#0b1120',
        'electric-blue': '#3b82f6',
        'deep-violet': '#1e1b4b',
        'soft-violet': '#8b5cf6',
        'cyan-accent': '#06b6d4',
        'ice-mint': '#a5f3fc',
        'text-primary': '#f0f9ff',
        'text-secondary': '#94a3b8',
        'text-muted': '#475569',
        'border-glass': 'rgba(59, 130, 246, 0.15)',
        'border-glow': 'rgba(139, 92, 246, 0.3)',
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'space': ['Space Mono', 'monospace'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "shimmer-border-spin": {
          "0%": { "--shimmer-angle": "0deg" },
          "100%": { "--shimmer-angle": "360deg" },
        },
        "gradient-blob-a": {
          "0%": { top: "20%", left: "10%", transform: "translate(-50%, -50%) scale(1)" },
          "33%": { top: "75%", left: "35%", transform: "translate(-50%, -50%) scale(1.3)" },
          "66%": { top: "40%", left: "80%", transform: "translate(-50%, -50%) scale(0.9)" },
          "100%": { top: "20%", left: "10%", transform: "translate(-50%, -50%) scale(1)" },
        },
        "gradient-blob-b": {
          "0%": { top: "60%", left: "70%", transform: "translate(-50%, -50%) scale(1)" },
          "33%": { top: "30%", left: "20%", transform: "translate(-50%, -50%) scale(1.2)" },
          "66%": { top: "80%", left: "50%", transform: "translate(-50%, -50%) scale(1.1)" },
          "100%": { top: "60%", left: "70%", transform: "translate(-50%, -50%) scale(1)" },
        },
        "gradient-blob-c": {
          "0%": { top: "40%", left: "50%", transform: "translate(-50%, -50%) scale(1)" },
          "50%": { top: "70%", left: "80%", transform: "translate(-50%, -50%) scale(1.4)" },
          "100%": { top: "40%", left: "50%", transform: "translate(-50%, -50%) scale(1)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "shimmer-border-spin": "shimmer-border-spin 6s linear infinite",
        "gradient-blob-a": "gradient-blob-a 20s infinite ease-in-out",
        "gradient-blob-b": "gradient-blob-b 25s infinite ease-in-out",
        "gradient-blob-c": "gradient-blob-c 18s infinite ease-in-out",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
