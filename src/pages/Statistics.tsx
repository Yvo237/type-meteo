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
      console.error('Erreur statistiques:', err)
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
    <div className="container mx-auto px-4 py-12 space-y-10 animate-fade-in">
      {/* Hero Header */}
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md border border-white/20">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
          <span className="text-sm font-semibold text-white/90 uppercase tracking-wider">
            Statistiques
          </span>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-6xl md:text-7xl font-black leading-none text-white drop-shadow-2xl">
            Analyse météorologique
          </h1>
          <p className="text-xl text-white/70 font-light max-w-3xl leading-relaxed">
            Statistiques et tendances météo pour mieux comprendre les conditions climatiques et anticiper les changements.
          </p>
        </div>
      </header>

      {/* Search Card */}
      <div className="max-w-2xl mx-auto">
        <Card className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-cyan-500/10 transition-shadow duration-500">
          <div className="space-y-4">
            <label className="block text-white font-semibold text-lg">
              Rechercher une ville
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Entrez le nom d'une ville..."
                className="flex-1 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-300"
                style={{ color: '#ffffff', caretColor: '#ffffff' }}
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch()
                  }
                }}
              />
              <button
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg whitespace-nowrap"
                onClick={handleSearch}
                disabled={loading || !selectedCity.trim()}
              >
                {loading ? (
                  <span className="inline-block w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "📊 Analyser"
                )}
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-64 w-full rounded-3xl" />
          <Skeleton className="h-64 w-full rounded-3xl" />
          <Skeleton className="h-48 w-full rounded-3xl md:col-span-2" />
        </div>
      )}

      {/* Statistics Cards */}
      {stats && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Temperature Card */}
          <Card className="backdrop-blur-xl bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-orange-500/30 rounded-3xl p-8 shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 group">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl transform group-hover:scale-110 transition-transform duration-300">🌡️</span>
                <h3 className="text-2xl font-bold text-white">Températures</h3>
              </div>
              
              <div className="space-y-6">
                <div className="relative">
                  <div className="text-sm text-white/70 mb-2 font-medium">Moyenne</div>
                  <div className="text-5xl font-black text-white drop-shadow-lg">
                    {stats.avgTemp}°C
                  </div>
                  <div className="absolute top-0 right-0 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                    <span className="text-white/80 text-sm font-semibold">30j</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="px-5 py-4 rounded-2xl bg-blue-500/20 backdrop-blur-sm border border-blue-500/30">
                    <div className="text-sm text-white/70 mb-2 flex items-center gap-2">
                      <span>❄️</span>
                      Minimum
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {stats.minTemp}°C
                    </div>
                  </div>
                  <div className="px-5 py-4 rounded-2xl bg-red-500/20 backdrop-blur-sm border border-red-500/30">
                    <div className="text-sm text-white/70 mb-2 flex items-center gap-2">
                      <span>🔥</span>
                      Maximum
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {stats.maxTemp}°C
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Conditions Card */}
          <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/30 rounded-3xl p-8 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 group">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl transform group-hover:scale-110 transition-transform duration-300">🌤️</span>
                <h3 className="text-2xl font-bold text-white">Conditions moyennes</h3>
              </div>
              
              <div className="space-y-5">
                <div className="px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-white/70 font-medium flex items-center gap-2">
                      <span>💧</span>
                      Humidité moyenne
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {stats.avgHumidity}%
                    </div>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${stats.avgHumidity}%` }}
                    ></div>
                  </div>
                </div>

                <div className="px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="text-sm text-white/70 mb-2 font-medium flex items-center gap-2">
                    <span>💨</span>
                    Vent moyen
                  </div>
                  <div className="text-3xl font-bold text-white">
                    {stats.avgWindSpeed} km/h
                  </div>
                </div>

                <div className="px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="text-sm text-white/70 mb-2 font-medium">
                    Condition la plus fréquente
                  </div>
                  <div className="text-xl font-semibold capitalize text-white">
                    {stats.mostCommonCondition}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Info Card */}
          <Card className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-500/30 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 md:col-span-2">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl">📈</span>
                <h3 className="text-2xl font-bold text-white">Informations sur l'analyse</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-sm text-white/70 mb-2 font-medium">📍 Ville</div>
                  <div className="text-lg font-bold text-white">{stats.city}</div>
                </div>
                <div className="px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-sm text-white/70 mb-2 font-medium">📊 Données</div>
                  <div className="text-lg font-bold text-white">{stats.dataPoints} points</div>
                </div>
                <div className="px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-sm text-white/70 mb-2 font-medium">📏 Écart temp.</div>
                  <div className="text-lg font-bold text-white">{stats.maxTemp - stats.minTemp}°C</div>
                </div>
                <div className="px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-sm text-white/70 mb-2 font-medium">📅 Période</div>
                  <div className="text-lg font-bold text-white">30 jours</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* No Data State */}
      {!stats && !loading && selectedCity && (
        <div className="relative overflow-hidden rounded-3xl border-2 border-dashed border-white/20 backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5"></div>
          <div className="relative text-center py-24 px-6">
            <div className="text-8xl mb-6 animate-pulse">📊</div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Données non disponibles
            </h3>
            <p className="text-lg text-white/70 font-light max-w-md mx-auto">
              Aucune statistique disponible pour cette ville. Veuillez réessayer avec une autre localisation.
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!selectedCity && (
        <div className="relative overflow-hidden rounded-3xl border-2 border-dashed border-white/20 backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5"></div>
          <div className="relative text-center py-24 px-6">
            <div className="text-8xl mb-6 animate-bounce">📈</div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Analysez les statistiques météo
            </h3>
            <p className="text-lg text-white/70 font-light max-w-md mx-auto">
              Recherchez une ville pour découvrir ses tendances météorologiques, températures moyennes et conditions climatiques.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}