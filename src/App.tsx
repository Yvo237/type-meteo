import React from "react"
import Home from "./pages/Home"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-base-content">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(236,72,153,0.12),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(45,212,191,0.12),transparent_30%)] pointer-events-none" />
      <div className="relative">
        <Home />
      </div>
    </div>
  )
}

export default App