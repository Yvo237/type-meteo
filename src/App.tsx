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
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <div
      className="min-h-screen text-base-content relative"
      style={{ backgroundImage: `var(--app-gradient)` }}
    >
      <div className="absolute inset-0 opacity-100" style={{ backgroundImage: `var(--app-halo)` }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 pointer-events-none" />
      
      <div className="relative">
        <nav className="sticky top-0 z-30 backdrop-blur-2xl bg-white/10 border-b border-white/20 shadow-2xl">
          <div className="container mx-auto px-4 py-4">
            {/* Desktop & Mobile Header */}
            <div className="flex items-center justify-between gap-3">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white grid place-items-center font-black shadow-xl shadow-blue-500/30 backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-110 hover:shadow-2xl">
                  S
                </div>
                <div className="hidden sm:block">
                  <div className="text-xl sm:text-2xl font-black leading-tight tracking-tight text-white drop-shadow-lg">
                    SkyNow
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/80 font-medium uppercase tracking-wider">
                    Weather • Alerts • Insights
                  </div>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md overflow-hidden p-1">
                  <button 
                    className={`px-4 py-2 rounded-xl transition-all duration-300 text-sm font-semibold whitespace-nowrap ${
                      tab === "home" 
                        ? "bg-white/25 text-white shadow-lg" 
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`} 
                    onClick={() => setTab("home")}
                  >
                    Conditions
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-xl transition-all duration-300 text-sm font-semibold whitespace-nowrap ${
                      tab === "explore" 
                        ? "bg-white/25 text-white shadow-lg" 
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`} 
                    onClick={() => setTab("explore")}
                  >
                    Explorer
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-xl transition-all duration-300 text-sm font-semibold whitespace-nowrap ${
                      tab === "alerts" 
                        ? "bg-white/25 text-white shadow-lg" 
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`} 
                    onClick={() => setTab("alerts")}
                  >
                    Alertes
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-xl transition-all duration-300 text-sm font-semibold whitespace-nowrap ${
                      tab === "compare" 
                        ? "bg-white/25 text-white shadow-lg" 
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`} 
                    onClick={() => setTab("compare")}
                  >
                    Comparer
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-xl transition-all duration-300 text-sm font-semibold whitespace-nowrap ${
                      tab === "statistics" 
                        ? "bg-white/25 text-white shadow-lg" 
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`} 
                    onClick={() => setTab("statistics")}
                  >
                    Statistiques
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-xl transition-all duration-300 text-sm font-semibold whitespace-nowrap ${
                      tab === "map" 
                        ? "bg-white/25 text-white shadow-lg" 
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`} 
                    onClick={() => setTab("map")}
                  >
                    Carte
                  </button>
                </div>
                <ThemeToggle />
              </div>

              {/* Mobile Menu Button & Theme */}
              <div className="flex lg:hidden items-center gap-2">
                <ThemeToggle />
                <button
                  className="p-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {menuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
              <div className="lg:hidden mt-4 space-y-2 animate-fade-in">
                <button 
                  className={`w-full px-4 py-3 rounded-xl transition-all duration-300 text-left font-semibold ${
                    tab === "home" 
                      ? "bg-white/25 text-white shadow-lg" 
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`} 
                  onClick={() => {
                    setTab("home")
                    setMenuOpen(false)
                  }}
                >
                  🏠 Conditions
                </button>
                <button 
                  className={`w-full px-4 py-3 rounded-xl transition-all duration-300 text-left font-semibold ${
                    tab === "explore" 
                      ? "bg-white/25 text-white shadow-lg" 
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`} 
                  onClick={() => {
                    setTab("explore")
                    setMenuOpen(false)
                  }}
                >
                  🌍 Explorer
                </button>
                <button 
                  className={`w-full px-4 py-3 rounded-xl transition-all duration-300 text-left font-semibold ${
                    tab === "alerts" 
                      ? "bg-white/25 text-white shadow-lg" 
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`} 
                  onClick={() => {
                    setTab("alerts")
                    setMenuOpen(false)
                  }}
                >
                  🚨 Alertes
                </button>
                <button 
                  className={`w-full px-4 py-3 rounded-xl transition-all duration-300 text-left font-semibold ${
                    tab === "compare" 
                      ? "bg-white/25 text-white shadow-lg" 
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`} 
                  onClick={() => {
                    setTab("compare")
                    setMenuOpen(false)
                  }}
                >
                  ⚖️ Comparer
                </button>
                <button 
                  className={`w-full px-4 py-3 rounded-xl transition-all duration-300 text-left font-semibold ${
                    tab === "statistics" 
                      ? "bg-white/25 text-white shadow-lg" 
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`} 
                  onClick={() => {
                    setTab("statistics")
                    setMenuOpen(false)
                  }}
                >
                  📊 Statistiques
                </button>
                <button 
                  className={`w-full px-4 py-3 rounded-xl transition-all duration-300 text-left font-semibold ${
                    tab === "map" 
                      ? "bg-white/25 text-white shadow-lg" 
                      : "bg-white/10 text-white/80 hover:bg-white/20"
                  }`} 
                  onClick={() => {
                    setTab("map")
                    setMenuOpen(false)
                  }}
                >
                  🗺️ Carte
                </button>
              </div>
            )}
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