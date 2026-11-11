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
          blue: {
            50: "#EFF6FF",
            100: "#DBEAFE",
            200: "#BFDBFE",
            500: "#3B82F6",
            600: "#2563EB",
            700: "#1D4ED8",
            800: "#1E40AF",
            900: "#1E3A8A", // Primary color specified in requirements
            950: "#172554",
          },
          teal: {
            50: "#F0FDFA",
            100: "#CCFBF1",
            500: "#14B8A6",
            600: "#0D9488", // Secondary color
            700: "#0F766E",
            800: "#115E59",
            900: "#134E4A",
          },
          amber: {
            50: "#FFFBEB",
            100: "#FEF3C7",
            400: "#FBBF24",
            500: "#F59E0B", // Accent color
            600: "#D97706",
            700: "#B45309",
          },
          bg: "#F8FAFC",
          card: "#FFFFFF",
          slate: {
            900: "#0F172A", // Dark slate
            600: "#64748B", // Muted text
          }
        },
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Noto Sans'",
          "'Noto Nastaliq Urdu'",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;

