/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        meteolight: {
          primary: "#0066FF",
          secondary: "#0052CC",
          accent: "#FFB800",
          neutral: "#000000",
          "base-100": "#FFFFFF",
          "base-200": "#F5F5F5",
          "base-300": "#E0E0E0",
          info: "#0066FF",
          success: "#10B981",
          warning: "#FFB800",
          error: "#EF4444",
        },
      },
      {
        meteodark: {
          primary: "#0066FF",
          secondary: "#0052CC",
          accent: "#FFB800",
          neutral: "#000000",
          "base-100": "#0A0A0A",
          "base-200": "#1A1A1A",
          "base-300": "#2A2A2A",
          info: "#0066FF",
          success: "#34D399",
          warning: "#FFB800",
          error: "#F87171",
        },
      },
    ],
  },
}
