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
          primary: "#2563EB",
          secondary: "#22D3EE",
          accent: "#F59E0B",
          neutral: "#0F172A",
          "base-100": "#F7F9FC",
          "base-200": "#E2E8F0",
          "base-300": "#CBD5E1",
          info: "#38BDF8",
          success: "#10B981",
          warning: "#FBBF24",
          error: "#EF4444",
        },
      },
      {
        meteodark: {
          primary: "#60A5FA",
          secondary: "#2DD4BF",
          accent: "#F59E0B",
          neutral: "#0B1220",
          "base-100": "#0F172A",
          "base-200": "#111827",
          "base-300": "#1F2937",
          info: "#38BDF8",
          success: "#34D399",
          warning: "#FBBF24",
          error: "#F87171",
        },
      },
      "light",
      "dark",
    ],
  },
}
