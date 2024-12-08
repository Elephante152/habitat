import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',  // Custom primary color
        secondary: '#F43F5E',  // Custom secondary color
        border: '#e5e7eb',  // Custom border color
        background: '#f9fafb',  // Background color
        foreground: '#1f2937',  // Foreground text color
        card: '#ffffff',  // Default card background
        'card-foreground': '#111827',  // Default card foreground (text)
        popover: '#ffffff',  // Popover background color
        'popover-foreground': '#111827',  // Popover text color
      },
      animation: {
        float: 'float 3s ease-in-out infinite',  // Floating animation for elements
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Plugin for form elements
    require('@tailwindcss/typography'), // Plugin for typography
    require('@tailwindcss/aspect-ratio'), // Plugin for aspect ratio utilities
  ],
};

export default config;
