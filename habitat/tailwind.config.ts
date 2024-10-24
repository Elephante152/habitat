// Import the Config type for TypeScript support
import { Config } from 'tailwindcss';

// Define the Tailwind configuration
const config: Config = {
  darkMode: ["class"], // Enable dark mode with the "class" strategy
  content: [
    './pages/**/*.{ts,tsx}', // Scan for utility classes in the pages folder
    './components/**/*.{ts,tsx}', // Scan in the components folder
    './app/**/*.{ts,tsx}', // Scan in the app folder
    './src/**/*.{ts,tsx}', // Scan in the src folder
    './@/components/**/*.{ts,tsx}', // Path added for ShadCN components
    './@/lib/utils/**/*.{ts,tsx}', // Path added for utility functions as per ShadCN setup
  ],
  theme: {
    container: {
      center: true, // Center the container
      padding: "2rem", // Set container padding
      screens: {
        "2xl": "1400px", // Custom screen size for large containers
      },
    },
    extend: {
      // Extend default colors with project-specific and ShadCN-related variables
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
      },
      // Extend default border radius for consistency in components
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Keyframes and animations for ShadCN and project-specific effects
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
  plugins: [
    require("tailwindcss-animate"), // Plugin for adding animation utilities to Tailwind
    // Add additional plugins for ShadCN components if necessary in the future
  ],
};

// Export the Tailwind configuration for use in the project
export default config;
