import React, { useState, useEffect } from "react"
import { useGeocoding } from "../hooks/useGeocoding"
import { useWeather } from "../hooks/useWeather"
import Card from "../components/ui/Card"
import Skeleton from "../components/ui/Skeleton"
import Alert from "../components/ui/Alert"

interface WeatherAlert {
  id: string
  city: string
  type: "temp" | "wind" | "rain" | "humidity" | "visibility"
  severity: "low" | "medium" | "high"
  message: string
  value: number
  threshold: number
}

export default function Alerts() {
  const [selectedCity, setSelectedCity] = useState("")
  const [alerts, setAlerts] = useState<WeatherAlert[]>([])
  const { geocode } = useGeocoding()
  const { getWeather, weather, loading } = useWeather()

  useEffect(() => {
    if (weather && selectedCity) {
      const detectedAlerts: WeatherAlert[] = []
      
      // Température extrême
      if (weather.temperature > 35) {
        detectedAlerts.push({
          id: "temp-high",
          city: selectedCity,
          type: "temp",
          severity: weather.temperature > 40 ? "high" : "medium",
          message: `Température élevée: ${weather.temperature}°C`,
          value: weather.temperature,
          threshold: 35,
        })
      } else if (weather.temperature < 10) {
        detectedAlerts.push({
          id: "temp-low",
          city: selectedCity,
          type: "temp",
          severity: weather.temperature < 5 ? "high" : "medium",
          message: `Température basse: ${weather.temperature}°C`,
          value: weather.temperature,
          threshold: 10,
        })
      }

      // Vent fort
      const windKmh = Math.round(weather.windSpeed * 3.6)
      if (windKmh > 30) {
        detectedAlerts.push({
          id: "wind-high",
          city: selectedCity,
          type: "wind",
          severity: windKmh > 50 ? "high" : "medium",
          message: `Vent fort: ${windKmh} km/h`,
          value: windKmh,
          threshold: 30,
        })
      }

      // Humidité élevée (risque de pluie)
      if (weather.humidity > 80) {
        detectedAlerts.push({
          id: "humidity-high",
          city: selectedCity,
          type: "humidity",
          severity: weather.humidity > 90 ? "high" : "low",
          message: `Humidité élevée: ${weather.humidity}% - Risque de pluie`,
          value: weather.humidity,
          threshold: 80,
        })
      }

      // Visibilité réduite
      if (weather.visibility && weather.visibility < 5) {
        detectedAlerts.push({
          id: "visibility-low",
          city: selectedCity,
          type: "visibility",
          severity: weather.visibility < 2 ? "high" : "medium",
          message: `Visibilité réduite: ${weather.visibility.toFixed(1)} km`,
          value: weather.visibility,
          threshold: 5,
        })
      }

      setAlerts(detectedAlerts)
    }
  }, [weather, selectedCity])

  const handleSearch = async (city: string) => {
    if (!city.trim()) return
    setSelectedCity(city)
    const coords = await geocode(city)
    if (coords) {
      await getWeather(coords.lat, coords.lon)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "from-red-500/30 to-red-600/20 border-red-500/40"
      case "medium":
        return "from-orange-500/30 to-yellow-500/20 border-orange-500/40"
      default:
        return "from-blue-500/30 to-blue-600/20 border-blue-500/40"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return "🚨"
      case "medium":
        return "⚠️"
      default:
        return "ℹ️"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "temp":
        return "🌡️"
      case "wind":
        return "💨"
      case "humidity":
        return "💧"
      case "visibility":
        return "🌫️"
      default:
        return "🔔"
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-10 animate-fade-in">
      {/* Hero Header */}
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-md border border-white/20">
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
          <span className="text-sm font-semibold text-white/90 uppercase tracking-wider">
            Alertes météo
          </span>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-6xl md:text-7xl font-black leading-none text-white drop-shadow-2xl">
            Surveillance des conditions
          </h1>
          <p className="text-xl text-white/70 font-light max-w-3xl leading-relaxed">
            Détection automatique des conditions météo extrêmes pour votre sécurité et votre planification.
          </p>
        </div>
      </header>

      {/* Search Card */}
      <div className="max-w-2xl mx-auto">
        <Card className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-orange-500/10 transition-shadow duration-500">
          <div className="space-y-4">
            <div>
              <label className="block text-white font-semibold text-lg mb-3">
                Rechercher une ville
              </label>
              <input
                type="text"
                placeholder="Entrez le nom d'une ville..."
                className="w-full px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-300"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(selectedCity)
                  }
                }}
              />
            </div>
            
            <button
              className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => handleSearch(selectedCity)}
              disabled={loading || !selectedCity.trim()}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="inline-block w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyse en cours...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  🔍 Analyser les conditions
                </span>
              )}
            </button>
          </div>
        </Card>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-4 max-w-4xl mx-auto">
          <Skeleton className="h-32 w-full rounded-3xl" />
          <Skeleton className="h-32 w-full rounded-3xl" />
          <Skeleton className="h-32 w-full rounded-3xl" />
        </div>
      )}

      {/* No Alerts - Success State */}
      {!loading && alerts.length === 0 && selectedCity && weather && (
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-start gap-6">
              <div className="text-5xl">✅</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Tout va bien à {selectedCity} !
                </h3>
                <p className="text-lg text-white/80">
                  Aucune alerte détectée. Les conditions météo sont normales et sûres.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alerts List */}
      {alerts.length > 0 && (
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">
              {alerts.length} alerte{alerts.length > 1 ? "s" : ""} détectée{alerts.length > 1 ? "s" : ""}
            </h2>
            <div className="px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 backdrop-blur-sm">
              <span className="text-white font-semibold">🚨 Attention requise</span>
            </div>
          </div>

          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={alert.id}
                className="group relative overflow-hidden rounded-3xl backdrop-blur-xl border shadow-2xl hover:scale-[1.02] transition-all duration-500"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  backgroundImage: `linear-gradient(135deg, ${
                    alert.severity === "high" 
                      ? "rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.1)" 
                      : alert.severity === "medium"
                      ? "rgba(249, 115, 22, 0.15), rgba(234, 179, 8, 0.1)"
                      : "rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.1)"
                  })`
                }}
              >
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative p-6 flex items-start gap-6">
                  {/* Icon Section */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                      {getSeverityIcon(alert.severity)}
                    </div>
                    <div className="text-3xl">
                      {getTypeIcon(alert.type)}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {alert.city}
                        </h3>
                        <p className="text-lg text-white/90 font-medium">
                          {alert.message}
                        </p>
                      </div>
                      
                      <div className={`px-4 py-2 rounded-full backdrop-blur-sm border text-sm font-semibold text-white uppercase tracking-wider ${
                        alert.severity === "high" 
                          ? "bg-red-500/30 border-red-500/50" 
                          : alert.severity === "medium"
                          ? "bg-orange-500/30 border-orange-500/50"
                          : "bg-blue-500/30 border-blue-500/50"
                      }`}>
                        {alert.severity === "high" ? "Critique" : alert.severity === "medium" ? "Modéré" : "Info"}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="flex items-center gap-6 text-white/80">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Seuil:</span>
                        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-semibold">
                          {alert.threshold}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Actuel:</span>
                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-bold">
                          {alert.value}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 ${
                  alert.severity === "high"
                    ? "bg-gradient-to-r from-red-500 to-red-600"
                    : alert.severity === "medium"
                    ? "bg-gradient-to-r from-orange-500 to-yellow-500"
                    : "bg-gradient-to-r from-blue-500 to-blue-600"
                }`}></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!selectedCity && (
        <div className="max-w-2xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border-2 border-dashed border-white/20 backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5"></div>
            <div className="relative text-center py-24 px-6">
              <div className="text-8xl mb-6 animate-bounce">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Recherchez une ville
              </h3>
              <p className="text-lg text-white/70 font-light max-w-md mx-auto">
                Entrez le nom d'une ville pour détecter automatiquement les alertes météo et les conditions extrêmes.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}