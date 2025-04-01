
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './index.html'
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "tech-blue": {
          light: "#4F9EF8",
          DEFAULT: "#1E88E5",
          dark: "#0D47A1",
        },
        "tech-purple": {
          light: "#9C68F8",
          DEFAULT: "#7C4DFF",
          dark: "#5E35B1",
        },
        "tech-green": {
          light: "#6BD89C",
          DEFAULT: "#2ECE71",
          dark: "#219653",
        },
        "tech-red": {
          light: "#FF7E82",
          DEFAULT: "#EF4444",
          dark: "#B91C1C",
        },
        "tech-orange": {
          light: "#FFB84D",
          DEFAULT: "#F59E0B",
          dark: "#D97706",
        },
        "tech-yellow": {
          light: "#FFE27A",
          DEFAULT: "#FFC53D",
          dark: "#D99F0B",
        },
        "tech-pink": {
          light: "#FF9ADE",
          DEFAULT: "#EC4899",
          dark: "#BE185D",
        },
        "tech-teal": {
          light: "#5FE7D6",
          DEFAULT: "#14B8A6",
          dark: "#0F766E",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        slideIn: {
          from: { transform: "translateX(-20px)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        scaleIn: {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fadeIn": "fadeIn 0.6s ease forwards",
        "slideUp": "slideUp 0.8s ease forwards",
        "slideIn": "slideIn 0.8s ease forwards",
        "scaleIn": "scaleIn 0.5s ease forwards",
      },
      boxShadow: {
        'glow': '0 0 15px 0 rgba(var(--color-primary), 0.5)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
