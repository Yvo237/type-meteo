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
        return "alert-error"
      case "medium":
        return "alert-warning"
      default:
        return "alert-info"
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

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-primary font-semibold">Alertes météo</p>
        <h1 className="text-3xl font-black leading-tight">Surveillance des conditions</h1>
        <p className="text-sm text-gray-500">
          Détection automatique des conditions météo extrêmes pour votre sécurité.
        </p>
      </header>

      <Card className="border border-primary/20">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Rechercher une ville</span>
          </label>
          <input
            type="text"
            placeholder="Entrez le nom d'une ville..."
            className="input input-bordered input-primary"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(selectedCity)
              }
            }}
          />
          <button
            className="btn btn-primary mt-3"
            onClick={() => handleSearch(selectedCity)}
            disabled={loading || !selectedCity.trim()}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Analyse...
              </>
            ) : (
              "Analyser"
            )}
          </button>
        </div>
      </Card>

      {loading && (
        <div className="space-y-3">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      )}

      {!loading && alerts.length === 0 && selectedCity && weather && (
        <Alert type="success">
          ✅ Aucune alerte détectée pour {selectedCity}. Conditions météo normales.
        </Alert>
      )}

      {alerts.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">
            {alerts.length} alerte{alerts.length > 1 ? "s" : ""} détectée{alerts.length > 1 ? "s" : ""}
          </h2>
          {alerts.map((alert) => (
            <div key={alert.id} className={`alert ${getSeverityColor(alert.severity)} shadow-lg`}>
              <div className="flex items-start gap-3 w-full">
                <span className="text-2xl">{getSeverityIcon(alert.severity)}</span>
                <div className="flex-1">
                  <div className="font-semibold">{alert.city}</div>
                  <div className="text-sm opacity-90">{alert.message}</div>
                  <div className="text-xs opacity-70 mt-1">
                    Seuil: {alert.threshold} | Actuel: {alert.value}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!selectedCity && (
        <Card className="border border-dashed border-base-300">
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-3">🔍</div>
            <p>Recherchez une ville pour détecter les alertes météo</p>
          </div>
        </Card>
      )}
    </div>
  )
}

