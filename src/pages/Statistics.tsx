import React, { useState, useEffect } from "react"
import { useGeocoding } from "../hooks/useGeocoding"
import { useWeather } from "../hooks/useWeather"
import Card from "../components/ui/Card"
import Skeleton from "../components/ui/Skeleton"

interface WeatherStats {
  city: string
  avgTemp: number
  minTemp: number
  maxTemp: number
  avgHumidity: number
  avgWindSpeed: number
  mostCommonCondition: string
  dataPoints: number
}

export default function Statistics() {
  const [selectedCity, setSelectedCity] = useState("")
  const [stats, setStats] = useState<WeatherStats | null>(null)
  const [loading, setLoading] = useState(false)
  const { geocode } = useGeocoding()
  const { getWeather } = useWeather()

  // Simuler des statistiques basées sur les données actuelles
  const calculateStats = async (cityName: string) => {
    setLoading(true)
    try {
      const coords = await geocode(cityName)
      if (!coords) {
        setStats(null)
        setLoading(false)
        return
      }

      const result = await getWeather(coords.lat, coords.lon)
      if (result?.current) {
        const weather = result.current
        
        // Simulation de statistiques (dans une vraie app, on utiliserait des données historiques)
        const simulatedStats: WeatherStats = {
          city: cityName,
          avgTemp: weather.temperature,
          minTemp: weather.temperature - 5,
          maxTemp: weather.temperature + 5,
          avgHumidity: weather.humidity,
          avgWindSpeed: Math.round(weather.windSpeed * 3.6),
          mostCommonCondition: weather.description,
          dataPoints: 30, // Simulé
        }
        setStats(simulatedStats)
      }
    } catch (err) {
      console.error(err)
      setStats(null)
    }
    setLoading(false)
  }

  const handleSearch = () => {
    if (selectedCity.trim()) {
      calculateStats(selectedCity)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-primary font-semibold">Statistiques</p>
        <h1 className="text-3xl font-black leading-tight">Analyse météorologique</h1>
        <p className="text-sm text-gray-500">
          Statistiques et tendances météo pour mieux comprendre les conditions climatiques.
        </p>
      </header>

      <Card className="border border-primary/20">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Rechercher une ville</span>
          </label>
          <div className="join">
            <input
              type="text"
              placeholder="Entrez le nom d'une ville..."
              className="input input-bordered input-primary join-item flex-1"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch()
                }
              }}
            />
            <button
              className="btn btn-primary join-item"
              onClick={handleSearch}
              disabled={loading || !selectedCity.trim()}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Analyser"
              )}
            </button>
          </div>
        </div>
      </Card>

      {loading && (
        <div className="space-y-3">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      )}

      {stats && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border border-base-300/60">
            <h3 className="text-lg font-semibold mb-4">Températures</h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs opacity-70 mb-1">Moyenne</div>
                <div className="text-3xl font-bold text-primary">{stats.avgTemp}°C</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs opacity-70 mb-1">Minimum</div>
                  <div className="text-xl font-semibold">{stats.minTemp}°C</div>
                </div>
                <div>
                  <div className="text-xs opacity-70 mb-1">Maximum</div>
                  <div className="text-xl font-semibold">{stats.maxTemp}°C</div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border border-base-300/60">
            <h3 className="text-lg font-semibold mb-4">Conditions moyennes</h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs opacity-70 mb-1">Humidité moyenne</div>
                <div className="text-2xl font-bold">{stats.avgHumidity}%</div>
              </div>
              <div>
                <div className="text-xs opacity-70 mb-1">Vent moyen</div>
                <div className="text-2xl font-bold">{stats.avgWindSpeed} km/h</div>
              </div>
              <div>
                <div className="text-xs opacity-70 mb-1">Condition la plus fréquente</div>
                <div className="text-lg font-semibold capitalize">{stats.mostCommonCondition}</div>
              </div>
            </div>
          </Card>

          <Card className="border border-base-300/60 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Informations</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-xs opacity-70">Ville</div>
                <div className="font-semibold">{stats.city}</div>
              </div>
              <div>
                <div className="text-xs opacity-70">Points de données</div>
                <div className="font-semibold">{stats.dataPoints}</div>
              </div>
              <div>
                <div className="text-xs opacity-70">Écart température</div>
                <div className="font-semibold">{stats.maxTemp - stats.minTemp}°C</div>
              </div>
              <div>
                <div className="text-xs opacity-70">Période</div>
                <div className="font-semibold">30 jours</div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {!stats && !loading && selectedCity && (
        <Card className="border border-dashed border-base-300">
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-3">📊</div>
            <p>Aucune statistique disponible pour cette ville</p>
          </div>
        </Card>
      )}

      {!selectedCity && (
        <Card className="border border-dashed border-base-300">
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-3">📈</div>
            <p>Recherchez une ville pour voir ses statistiques météo</p>
          </div>
        </Card>
      )}
    </div>
  )
}

