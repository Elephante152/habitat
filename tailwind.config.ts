import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure it points to all project directories
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",  // Custom primary color
        secondary: "#F43F5E",  // Custom secondary color
        border: "#e5e7eb",  // Added custom border color
        background: "#f9fafb",  // Background color for dark mode
        foreground: "#1f2937",  // Foreground text color
        card: "#ffffff",  // Default card background
        "card-foreground": "#111827",  // Default card foreground (text)
        popover: "#ffffff",  // Popover background color
        "popover-foreground": "#111827",  // Popover text color
      },
      animation: {
        float: "float 3s ease-in-out infinite",  // Custom floating animation
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // Tailwind plugin for form elements
    require("@tailwindcss/typography"), // Tailwind plugin for typography
    require("@tailwindcss/aspect-ratio"), // Tailwind plugin for aspect ratio utilities
  ],
};

export default config;
