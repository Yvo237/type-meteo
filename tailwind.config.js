/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backdropBlur: {
        'xl': '16px',
        '2xl': '24px',
      },
    },
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
