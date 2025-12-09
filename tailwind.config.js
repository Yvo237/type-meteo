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
          primary: "#3B82F6",      // bright blue
          secondary: "#111827",    // deep slate
          accent: "#F59E0B",       // amber
          neutral: "#0B0F1A",
          "base-100": "#0F172A",
          "base-200": "#111827",
          "base-300": "#1F2937",
          info: "#38BDF8",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#F43F5E",
        },
      },
      {
        meteodark: {
          primary: "#60A5FA",      // soft neon blue
          secondary: "#0B1220",    // ink
          accent: "#FBBF24",       // warm gold
          neutral: "#05070E",
          "base-100": "#05070E",
          "base-200": "#0B1220",
          "base-300": "#111827",
          info: "#38BDF8",
          success: "#22C55E",
          warning: "#FBBF24",
          error: "#F87171",
        },
      },
    ],
  },
}
