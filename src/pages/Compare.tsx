import React, { useState, useMemo } from "react"
import { useGeocoding } from "../hooks/useGeocoding"
import { useWeather } from "../hooks/useWeather"
import Card from "../components/ui/Card"
import Skeleton from "../components/ui/Skeleton"
import Alert from "../components/ui/Alert"
import WeatherIcon from "../components/weather/WeatherIcon"
import { getWeatherIconUrl } from "../utils/helpers"

interface CityCompare {
  name: string
  lat?: number
  lon?: number
  weather?: any
  loading?: boolean
  error?: string
}

export default function Compare() {
  const [cities, setCities] = useState<CityCompare[]>([
    { name: "" },
    { name: "" },
  ])

  const { geocode } = useGeocoding()
  const { getWeather } = useWeather()

  const handleCityChange = (index: number, value: string) => {
    const updated = [...cities]
    updated[index] = { name: value }
    setCities(updated)
  }

  const fetchCityWeather = async (index: number, cityName: string) => {
    if (!cityName.trim()) return

    const updated = [...cities]
    updated[index] = { ...updated[index], loading: true, error: undefined }
    setCities(updated)

    try {
      const coords = await geocode(cityName)
      if (coords) {
        const result = await getWeather(coords.lat, coords.lon)
        updated[index] = {
          name: cityName,
          lat: coords.lat,
          lon: coords.lon,
          weather: result?.current,
          loading: false,
        }
      } else {
        updated[index] = {
          ...updated[index],
          loading: false,
          error: "Ville introuvable",
        }
      }
    } catch (err) {
      console.error('Erreur recherche ville:', err)
      updated[index] = {
        ...updated[index],
        loading: false,
        error: err instanceof Error ? err.message : "Erreur",
      }
    }
    setCities(updated)
  }

  const addCity = () => {
    setCities([...cities, { name: "" }])
  }

  const removeCity = (index: number) => {
    if (cities.length > 2) {
      setCities(cities.filter((_, i) => i !== index))
    }
  }

  const allLoaded = cities.every((c) => !c.loading && (c.weather || c.error))
  const hasData = cities.some((c) => c.weather)

  // Trouver la ville la plus chaude/froide
  const citiesWithWeather = cities.filter((c) => c.weather)
  const hottestCity = citiesWithWeather.length > 0 
    ? citiesWithWeather.reduce((max, city) => 
        city.weather.temperature > max.weather.temperature ? city : max
      )
    : null
  const coldestCity = citiesWithWeather.length > 0
    ? citiesWithWeather.reduce((min, city) => 
        city.weather.temperature < min.weather.temperature ? city : min
      )
    : null

  // Insights comparatifs avancés
  const comparativeInsights = useMemo(() => {
    if (citiesWithWeather.length < 2) return null

    const temps = citiesWithWeather.map(c => c.weather.temperature)
    const humidities = citiesWithWeather.map(c => c.weather.humidity)
    const winds = citiesWithWeather.map(c => Math.round(c.weather.windSpeed * 3.6))

    const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length
    const avgHumidity = humidities.reduce((a, b) => a + b, 0) / humidities.length
    const avgWind = winds.reduce((a, b) => a + b, 0) / winds.length

    // Ville la plus humide
    const mostHumid = citiesWithWeather.reduce((max, city) => 
      city.weather.humidity > max.weather.humidity ? city : max
    )

    // Ville la plus venteuse
    const mostWindy = citiesWithWeather.reduce((max, city) => 
      city.weather.windSpeed > max.weather.windSpeed ? city : max
    )

    // Ville la plus confortable (température proche de 20-25°C)
    const mostComfortable = citiesWithWeather.reduce((best, city) => {
      const idealTemp = 22
      const cityDiff = Math.abs(city.weather.temperature - idealTemp)
      const bestDiff = Math.abs(best.weather.temperature - idealTemp)
      return cityDiff < bestDiff ? city : best
    })

    return {
      avgTemp: avgTemp.toFixed(1),
      avgHumidity: avgHumidity.toFixed(0),
      avgWind: avgWind.toFixed(0),
      mostHumid,
      mostWindy,
      mostComfortable,
      tempRange: (Math.max(...temps) - Math.min(...temps)).toFixed(1)
    }
  }, [citiesWithWeather])

  return (
    <div className="container mx-auto px-4 py-12 space-y-10 animate-fade-in">
      {/* Hero Header */}
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/20">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
          <span className="text-sm font-semibold text-white/90 uppercase tracking-wider">
            Comparaison
          </span>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-6xl md:text-7xl font-black leading-none text-white drop-shadow-2xl">
            Comparer les villes
          </h1>
          <p className="text-xl text-white/70 font-light max-w-3xl leading-relaxed">
            Comparez les conditions météo de plusieurs villes côte à côte pour une vue d'ensemble complète.
          </p>
        </div>
      </header>

      {/* Cities Cards */}
      <div className="space-y-6">
        {cities.map((city, index) => (
          <Card 
            key={index} 
            className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="space-y-6">
              {/* Input Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-white font-bold text-xl">
                    Ville {index + 1}
                  </label>
                  {cities.length > 2 && (
                    <button
                      className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-white font-semibold transition-all duration-300 hover:scale-105"
                      onClick={() => removeCity(index)}
                    >
                      ✕ Retirer
                    </button>
                  )}
                </div>

                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Nom de la ville..."
                    className="flex-1 px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-300"
                    value={city.name}
                    onChange={(e) => handleCityChange(index, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        fetchCityWeather(index, city.name)
                      }
                    }}
                  />
                  <button
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg"
                    onClick={() => fetchCityWeather(index, city.name)}
                    disabled={city.loading || !city.name.trim()}
                  >
                    {city.loading ? (
                      <span className="inline-block w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "🔍"
                    )}
                  </button>
                </div>
              </div>

              {/* Loading State */}
              {city.loading && (
                <div className="py-4">
                  <Skeleton className="h-48 w-full rounded-2xl" />
                </div>
              )}

              {/* Error State */}
              {city.error && (
                <div className="px-6 py-4 rounded-2xl backdrop-blur-sm bg-red-500/20 border border-red-500/30">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚠️</span>
                    <span className="text-white font-medium">{city.error}</span>
                  </div>
                </div>
              )}

              {/* Weather Data */}
              {city.weather && (
                <div className="space-y-6 pt-2">
                  {/* Main Info */}
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="transform hover:scale-110 transition-transform duration-300">
                        <WeatherIcon
                          iconUrl={getWeatherIconUrl(city.weather.icon)}
                          size="lg"
                        />
                      </div>
                      <div>
                        <div className="text-5xl font-black text-white">
                          {city.weather.temperature}°C
                        </div>
                        <div className="text-lg capitalize text-white/80 font-medium mt-1">
                          {city.weather.description}
                        </div>
                      </div>
                    </div>

                    {/* Temperature Badge */}
                    <div className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                      <div className="text-sm text-white/70 mb-1">Ressenti</div>
                      <div className="text-3xl font-bold text-white">
                        {city.weather.feelsLike || city.weather.temperature}°C
                      </div>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">💧</span>
                        <span className="text-sm text-white/70 font-medium">Humidité</span>
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {city.weather.humidity}%
                      </div>
                    </div>

                    <div className="px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">💨</span>
                        <span className="text-sm text-white/70 font-medium">Vent</span>
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {Math.round(city.weather.windSpeed * 3.6)} km/h
                      </div>
                    </div>

                    <div className="px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300 col-span-2 lg:col-span-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">🌡️</span>
                        <span className="text-sm text-white/70 font-medium">Pression</span>
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {city.weather.pressure || "N/A"} hPa
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}

        {/* Add City Button */}
        <button 
          className="w-full px-8 py-6 rounded-3xl border-2 border-dashed border-white/30 bg-white/5 hover:bg-white/10 hover:border-white/50 text-white font-bold text-lg transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm"
          onClick={addCity}
        >
          <span className="flex items-center justify-center gap-3">
            <span className="text-2xl">➕</span>
            Ajouter une ville
          </span>
        </button>
      </div>

      {/* Insights Comparatifs Avancés - NOUVEAU */}
      {comparativeInsights && (
        <div className="backdrop-blur-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/10 border border-indigo-500/30 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">💡</span>
            Insights comparatifs
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Moyennes */}
            <div className="px-5 py-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/30 backdrop-blur-sm group hover:scale-105 transition-transform duration-300">
              <div className="text-2xl mb-2 transform group-hover:scale-110 transition-transform duration-300">📊</div>
              <div className="text-sm text-white/70 mb-1 font-medium">Température moyenne</div>
              <div className="text-3xl font-black text-white">{comparativeInsights.avgTemp}°C</div>
            </div>

            <div className="px-5 py-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/10 border border-cyan-500/30 backdrop-blur-sm group hover:scale-105 transition-transform duration-300">
              <div className="text-2xl mb-2 transform group-hover:scale-110 transition-transform duration-300">💧</div>
              <div className="text-sm text-white/70 mb-1 font-medium">Humidité moyenne</div>
              <div className="text-3xl font-black text-white">{comparativeInsights.avgHumidity}%</div>
            </div>

            <div className="px-5 py-4 rounded-2xl bg-gradient-to-br from-teal-500/20 to-green-500/10 border border-teal-500/30 backdrop-blur-sm group hover:scale-105 transition-transform duration-300">
              <div className="text-2xl mb-2 transform group-hover:scale-110 transition-transform duration-300">💨</div>
              <div className="text-sm text-white/70 mb-1 font-medium">Vent moyen</div>
              <div className="text-3xl font-black text-white">{comparativeInsights.avgWind} km/h</div>
            </div>
          </div>

          {/* Records */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="px-6 py-5 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/10 border border-blue-500/30 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">💧</span>
                <div>
                  <div className="text-xs text-white/70 font-medium uppercase">Plus humide</div>
                  <div className="text-lg font-bold text-white">{comparativeInsights.mostHumid.name}</div>
                </div>
              </div>
              <div className="text-2xl font-black text-white">{comparativeInsights.mostHumid.weather.humidity}%</div>
            </div>

            <div className="px-6 py-5 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/10 border border-emerald-500/30 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">💨</span>
                <div>
                  <div className="text-xs text-white/70 font-medium uppercase">Plus venteuse</div>
                  <div className="text-lg font-bold text-white">{comparativeInsights.mostWindy.name}</div>
                </div>
              </div>
              <div className="text-2xl font-black text-white">
                {Math.round(comparativeInsights.mostWindy.weather.windSpeed * 3.6)} km/h
              </div>
            </div>

            <div className="px-6 py-5 rounded-2xl bg-gradient-to-br from-green-500/20 to-lime-500/10 border border-green-500/30 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">😊</span>
                <div>
                  <div className="text-xs text-white/70 font-medium uppercase">Plus confortable</div>
                  <div className="text-lg font-bold text-white">{comparativeInsights.mostComfortable.name}</div>
                </div>
              </div>
              <div className="text-2xl font-black text-white">
                {comparativeInsights.mostComfortable.weather.temperature}°C
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comparative Summary */}
      {allLoaded && hasData && (
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/10 border border-white/30 rounded-3xl p-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">📊</span>
            Résumé comparatif
          </h3>

          <div className="space-y-6">
            {/* Temperature Ranking */}
            <div className="space-y-3">
              {cities.filter((c) => c.weather).map((city, idx) => {
                const isHottest = hottestCity && city.name === hottestCity.name && citiesWithWeather.length > 1
                const isColdest = coldestCity && city.name === coldestCity.name && citiesWithWeather.length > 1
                
                return (
                  <div 
                    key={idx} 
                    className={`flex justify-between items-center px-6 py-4 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                      isHottest 
                        ? "bg-red-500/20 border-red-500/40 shadow-lg shadow-red-500/20" 
                        : isColdest
                        ? "bg-blue-500/20 border-blue-500/40 shadow-lg shadow-blue-500/20"
                        : "bg-white/10 border-white/20 hover:bg-white/15"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {isHottest ? "🔥" : isColdest ? "❄️" : "🌡️"}
                      </span>
                      <span className="font-semibold text-white text-lg">{city.name}</span>
                      {isHottest && (
                        <span className="px-3 py-1 rounded-full bg-red-500/30 border border-red-500/50 text-xs font-bold text-white uppercase">
                          Plus chaude
                        </span>
                      )}
                      {isColdest && (
                        <span className="px-3 py-1 rounded-full bg-blue-500/30 border border-blue-500/50 text-xs font-bold text-white uppercase">
                          Plus froide
                        </span>
                      )}
                    </div>
                    <span className="text-3xl font-black text-white">
                      {city.weather.temperature}°C
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Temperature Difference */}
            {hottestCity && coldestCity && citiesWithWeather.length > 1 && (
              <div className="mt-6 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/90 font-medium">Écart de température</span>
                  <span className="text-2xl font-black text-white">
                    {Math.abs(hottestCity.weather.temperature - coldestCity.weather.temperature).toFixed(1)}°C
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}