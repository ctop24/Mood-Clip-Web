import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f4ff",
          100: "#d9e4ff",
          200: "#b3caff",
          300: "#8caeff",
          400: "#648eff",
          500: "#3d6bff",
          600: "#2a53db",
          700: "#1c3eb7",
          800: "#122c93",
          900: "#0b1c6f"
        },
        accent: "#ffb4c6"
      }
    }
  },
  plugins: []
};

export default config;
