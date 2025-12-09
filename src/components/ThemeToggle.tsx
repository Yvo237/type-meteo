import React from "react"

const THEMES = ["meteodark", "meteolight"] as const
type Theme = (typeof THEMES)[number]

export default function ThemeToggle() {
  const [theme, setTheme] = React.useState<Theme>(() => {
    const saved = localStorage.getItem("theme") as Theme | null
    if (saved && THEMES.includes(saved)) return saved
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "meteodark" : "meteolight"
  })

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggle = () => setTheme((prev) => (prev === "meteodark" ? "meteolight" : "meteodark"))

  return (
    <button className="btn btn-ghost btn-sm" onClick={toggle} aria-label="Basculer le thème">
      {theme === "meteodark" ? "☀️" : "🌙"}
    </button>
  )
}

