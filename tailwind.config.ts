import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
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
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
      colors: {
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
        // Custom colors for exam cards
        'exam-blue': {
          light: '#E0F2FE',
          dark: '#3B82F6',
        },
        'exam-green': {
          light: '#D1FAE5',
          dark: '#10B981',
        },
        'exam-pink': {
          light: '#FCE7F3',
          dark: '#EC4899',
        },
        // Custom colors for "Learn with" cards
        'learn-purple': {
          DEFAULT: 'hsl(270, 50%, 30%)', // Darker purple
          foreground: 'hsl(270, 50%, 95%)', // Lighter purple text
        },
        'learn-blue': {
           DEFAULT: 'hsl(210, 50%, 30%)', // Darker blue
           foreground: 'hsl(210, 50%, 95%)', // Lighter blue text
         },
        'learn-yellow': {
          DEFAULT: 'hsl(45, 70%, 30%)', // Darker yellow/brown
          foreground: 'hsl(45, 70%, 95%)', // Lighter yellow text
        },
        'learn-green': {
          DEFAULT: 'hsl(145, 50%, 25%)', // Darker green
          foreground: 'hsl(145, 50%, 95%)', // Lighter green text
        },
        'learn-red': {
          DEFAULT: 'hsl(0, 50%, 35%)', // Darker red/maroon
          foreground: 'hsl(0, 50%, 95%)', // Lighter red text
        },
        'learn-indigo': {
          DEFAULT: 'hsl(240, 40%, 35%)', // Darker indigo/blue-purple
          foreground: 'hsl(240, 40%, 95%)', // Lighter indigo text
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
