/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        button: "0 0 5px rgb(30, 41, 59, 0.1)",
      },
      boxShadow: {
        icon: "0 0 20px rgb(30, 41, 59, 0.2)",
      },
      dropShadow: {
        button: "0 0 10px rgb(30, 41, 59, 0.2)",
      },
      dropShadow: {
        icon: "0 0 10px rgb(30, 41, 59, 0.4)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#0F172B", // Base dark background
        secondary: "#1F2937", // Card backgrounds (gray-800)
        light: "#F8F9FA", // Primary text color
        highlight: "#3B82F6", // Blue accent (blue-500)
        third: "#374151", // Secondary backgrounds (gray-700)
        success: "#10B981", // Green accent for income (green-500)
        danger: "#EF4444", // Red accent for expenses (red-500)
        warning: "#F59E0B", // Amber accent for alerts (amber-500)
        purple: "#8B5CF6", // Purple accent for savings (violet-500)
        gray: {
          600: "#4B5563", // Border colors
          700: "#374151", // Input backgrounds
          400: "#9CA3AF", // Secondary text
        },
      },
    },
  },
  plugins: [],
};
