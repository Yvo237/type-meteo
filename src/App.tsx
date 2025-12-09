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
      style={{
        backgroundImage: `var(--app-gradient)`,
      }}
    >
      <div className="absolute inset-0" style={{ backgroundImage: `var(--app-halo)` }} />
      <div className="relative">
        <nav className="sticky top-0 z-30 backdrop-blur bg-base-100/70 border-b border-base-300/60">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary text-primary-content grid place-items-center font-black">
                S
              </div>
              <div>
                <div className="text-xl font-black leading-tight">SkyNow</div>
                <div className="text-xs opacity-70">Météo instantanée</div>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="btn-group btn-group-horizontal flex-wrap">
                <button
                  className={`btn btn-sm ${tab === "home" ? "btn-primary" : "btn-ghost"}`}
                  onClick={() => setTab("home")}
                >
                  Conditions
                </button>
                <button
                  className={`btn btn-sm ${tab === "explore" ? "btn-primary" : "btn-ghost"}`}
                  onClick={() => setTab("explore")}
                >
                  Explorer
                </button>
                <button
                  className={`btn btn-sm ${tab === "alerts" ? "btn-primary" : "btn-ghost"}`}
                  onClick={() => setTab("alerts")}
                >
                  Alertes
                </button>
                <button
                  className={`btn btn-sm ${tab === "compare" ? "btn-primary" : "btn-ghost"}`}
                  onClick={() => setTab("compare")}
                >
                  Comparer
                </button>
                <button
                  className={`btn btn-sm ${tab === "statistics" ? "btn-primary" : "btn-ghost"}`}
                  onClick={() => setTab("statistics")}
                >
                  Statistiques
                </button>
                <button
                  className={`btn btn-sm ${tab === "map" ? "btn-primary" : "btn-ghost"}`}
                  onClick={() => setTab("map")}
                >
                  Carte
                </button>
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