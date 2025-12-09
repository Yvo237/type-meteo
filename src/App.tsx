import React from "react"
import Home from "./pages/Home"
import Explore from "./pages/Explore"
import Alerts from "./pages/Alerts"
import Compare from "./pages/Compare"
import Statistics from "./pages/Statistics"
import Map from "./pages/Map"
import ThemeToggle from "./components/ThemeToggle"

type Tab = "home" | "explore" | "alerts" | "compare" | "statistics" | "map"

function App() {
  const [tab, setTab] = React.useState<Tab>("home")

  return (
    <div
      className="min-h-screen text-base-content relative"
      style={{ backgroundImage: `var(--app-gradient)` }}
    >
      <div className="absolute inset-0 opacity-100" style={{ backgroundImage: `var(--app-halo)` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 pointer-events-none" />
      <div className="relative">
        <nav className="sticky top-0 z-30 backdrop-blur-2xl bg-white/10 border-b border-white/20 shadow-2xl">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white grid place-items-center font-black shadow-xl shadow-blue-500/30 backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-110 hover:shadow-2xl animate-pulse-slow">
                S
              </div>
              <div>
                <div className="text-2xl font-black leading-tight tracking-tight text-white drop-shadow-lg">SkyNow</div>
                <div className="text-xs text-white/80 font-medium uppercase tracking-wider">Weather • Alerts • Insights</div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="btn-group btn-group-horizontal flex-wrap shadow-xl rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md overflow-hidden">
                <button className={`btn btn-xs md:btn-sm transition-all duration-300 ${tab === "home" ? "bg-white/20 text-white font-semibold shadow-lg" : "text-white/80 hover:text-white hover:bg-white/10"}`} onClick={() => setTab("home")}>Conditions</button>
                <button className={`btn btn-xs md:btn-sm transition-all duration-300 ${tab === "explore" ? "bg-white/20 text-white font-semibold shadow-lg" : "text-white/80 hover:text-white hover:bg-white/10"}`} onClick={() => setTab("explore")}>Explorer</button>
                <button className={`btn btn-xs md:btn-sm transition-all duration-300 ${tab === "alerts" ? "bg-white/20 text-white font-semibold shadow-lg" : "text-white/80 hover:text-white hover:bg-white/10"}`} onClick={() => setTab("alerts")}>Alertes</button>
                <button className={`btn btn-xs md:btn-sm transition-all duration-300 ${tab === "compare" ? "bg-white/20 text-white font-semibold shadow-lg" : "text-white/80 hover:text-white hover:bg-white/10"}`} onClick={() => setTab("compare")}>Comparer</button>
                <button className={`btn btn-xs md:btn-sm transition-all duration-300 ${tab === "statistics" ? "bg-white/20 text-white font-semibold shadow-lg" : "text-white/80 hover:text-white hover:bg-white/10"}`} onClick={() => setTab("statistics")}>Statistiques</button>
                <button className={`btn btn-xs md:btn-sm transition-all duration-300 ${tab === "map" ? "bg-white/20 text-white font-semibold shadow-lg" : "text-white/80 hover:text-white hover:bg-white/10"}`} onClick={() => setTab("map")}>Carte</button>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </nav>

        <main className="relative">
          {tab === "home" && <Home />}
          {tab === "explore" && <Explore />}
          {tab === "alerts" && <Alerts />}
          {tab === "compare" && <Compare />}
          {tab === "statistics" && <Statistics />}
          {tab === "map" && <Map />}
        </main>
      </div>
    </div>
  )
}

export default App