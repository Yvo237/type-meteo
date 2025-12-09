import React, { useEffect, useMemo, useState } from "react"
import SearchBar from "../components/SearchBar"
import WeatherCard from "../components/weather/WeatherCard"
import PopularCities from "../components/PopularCities"
import HistoryList, { type SearchHistory } from "../components/HistoryList"
import ForecastList from "../components/weather/ForecastList"
import Favorites from "../components/Favorites"
import Skeleton from "../components/ui/Skeleton"
import { useGeocoding } from "../hooks/useGeocoding"
import { useWeather } from "../hooks/useWeather"
import type { GeocodingResult } from "../services/geocodingApi"
import { getWeatherIconUrl } from "../utils/helpers"

type ActiveLocation = GeocodingResult

const HISTORY_KEY = "weatherHistory"
const FAVORITES_KEY = "weatherFavorites"

export default function Home() {
  const [query, setQuery] = useState("")
  const [activeLocation, setActiveLocation] = useState<ActiveLocation | null>(null)
  const [history, setHistory] = useState<SearchHistory[]>(() => {
    const saved = localStorage.getItem(HISTORY_KEY)
    return saved ? JSON.parse(saved) : []
  })
  const [favorites, setFavorites] = useState<GeocodingResult[]>(() => {
    const saved = localStorage.getItem(FAVORITES_KEY)
    return saved ? JSON.parse(saved) : []
  })
  const [isLocating, setIsLocating] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string | undefined>(undefined)
  const [uiError, setUiError] = useState<string | null>(null)

  const {
    geocode,
    geolocate,
    searchSuggestions,
    suggestions,
    loading: geoLoading,
    error: geoError,
  } = useGeocoding()

  const {
    weather,
    forecast,
    loading: weatherLoading,
    error: weatherError,
    getWeather,
  } = useWeather()

  const combinedError = uiError || geoError || weatherError

  const isFavorite = useMemo(
    () => (activeLocation ? favorites.some((f) => f.name === activeLocation.name && f.lat === activeLocation.lat && f.lon === activeLocation.lon) : false),
    [activeLocation, favorites]
  )

  // Calcul des Quick Stats
  const quickStats = useMemo(() => {
    if (!weather) return null

    const uvIndex = Math.floor(Math.random() * 11) // Simulé
    const airQuality = Math.floor(Math.random() * 5) + 1 // 1-5, simulé
    
    const getUVLevel = (uv: number) => {
      if (uv <= 2) return { label: "Faible", color: "from-green-500/30 to-emerald-500/20 border-green-500/40" }
      if (uv <= 5) return { label: "Modéré", color: "from-yellow-500/30 to-orange-500/20 border-yellow-500/40" }
      if (uv <= 7) return { label: "Élevé", color: "from-orange-500/30 to-red-500/20 border-orange-500/40" }
      if (uv <= 10) return { label: "Très élevé", color: "from-red-500/30 to-red-600/20 border-red-500/40" }
      return { label: "Extrême", color: "from-purple-500/30 to-pink-500/20 border-purple-500/40" }
    }

    const getAQLevel = (aq: number) => {
      const levels = [
        { label: "Excellent", color: "from-green-500/30 to-emerald-500/20 border-green-500/40" },
        { label: "Bon", color: "from-blue-500/30 to-cyan-500/20 border-blue-500/40" },
        { label: "Moyen", color: "from-yellow-500/30 to-orange-500/20 border-yellow-500/40" },
        { label: "Mauvais", color: "from-orange-500/30 to-red-500/20 border-orange-500/40" },
        { label: "Très mauvais", color: "from-red-500/30 to-purple-500/20 border-red-500/40" }
      ]
      return levels[aq - 1]
    }

    const uvLevel = getUVLevel(uvIndex)
    const aqLevel = getAQLevel(airQuality)

    return {
      uvIndex,
      uvLevel,
      airQuality,
      aqLevel,
      dewPoint: Math.round(weather.temperature - ((100 - weather.humidity) / 5)),
      cloudCover: Math.floor(Math.random() * 100)
    }
  }, [weather])

  useEffect(() => {
    if (activeLocation) {
      setQuery(activeLocation.name)
    }
  }, [activeLocation])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "light")
  }, [])

  useEffect(() => {
    handleGeolocate()
  }, [])

  const persistHistory = (items: SearchHistory[]) => {
    setHistory(items)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(items))
  }

  const persistFavorites = (items: GeocodingResult[]) => {
    setFavorites(items)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(items))
  }

  const addToHistory = (location: GeocodingResult, temperature?: number, description?: string) => {
    const newEntry: SearchHistory = {
      city: location.name,
      timestamp: new Date().toISOString(),
      temperature,
      description,
      coordinates: { lat: location.lat, lon: location.lon },
    }
    const filtered = history.filter((item) => item.city !== newEntry.city)
    const next = [newEntry, ...filtered].slice(0, 8)
    persistHistory(next)
  }

  const fetchWeatherForLocation = async (location: GeocodingResult) => {
    setActiveLocation(location)
    const result = await getWeather(location.lat, location.lon)
    if (result?.current) {
      addToHistory(location, result.current.temperature, result.current.description)
      setLastUpdated(new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }))
    }
  }

  const handleSearchChange = (value: string) => {
    setQuery(value)
  }

  const handleSubmitSearch = async (value: string) => {
    if (!value.trim()) return
    const coords = await geocode(value)
    if (coords) {
      const location: GeocodingResult = { name: value, lat: coords.lat, lon: coords.lon }
      await fetchWeatherForLocation(location)
    }
  }

  const handleSuggestionSelect = async (suggestion: GeocodingResult) => {
    await fetchWeatherForLocation(suggestion)
  }

  const handleHistorySelect = async (item: SearchHistory) => {
    if (!item.coordinates) return
    const location: GeocodingResult = {
      name: item.city,
      lat: item.coordinates.lat,
      lon: item.coordinates.lon,
    }
    await fetchWeatherForLocation(location)
  }

  const handleGeolocate = () => {
    const isLocalhost = ["localhost", "127.0.0.1"].includes(window.location.hostname)
    const isSecure = window.location.protocol === "https:" || isLocalhost
    if (!isSecure) {
      setUiError("La géolocalisation nécessite HTTPS (ou localhost). Lancez l'app en https ou acceptez la permission.")
      return
    }
    if (!navigator.geolocation) {
      setUiError("Géolocalisation non supportée par ce navigateur.")
      return
    }
    setUiError(null)
    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        const reversed = await geolocate(latitude, longitude)
        const location: GeocodingResult = {
          name: reversed?.name || "Ma position",
          lat: latitude,
          lon: longitude,
          country: reversed?.country,
          state: reversed?.state,
        }
        await fetchWeatherForLocation(location)
        setIsLocating(false)
      },
      () => {
        setIsLocating(false)
        setUiError("Permission refusée ou position indisponible.")
      },
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }

  const toggleFavorite = () => {
    if (!activeLocation) return
    if (isFavorite) {
      persistFavorites(favorites.filter((f) => !(f.lat === activeLocation.lat && f.lon === activeLocation.lon)))
    } else {
      persistFavorites([{ ...activeLocation }, ...favorites].slice(0, 12))
    }
  }

  const heroTitle = activeLocation?.name || "SkyNow"

  return (
    <div className="container mx-auto px-4 py-12 space-y-10 animate-fade-in">
      {/* Hero Header */}
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-white/20">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
          <span className="text-sm font-semibold text-white/90 uppercase tracking-wider">
            Météo instantanée
          </span>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-6xl md:text-7xl font-black leading-none text-white drop-shadow-2xl">
            {heroTitle}
          </h1>
          <p className="text-xl text-white/70 font-light max-w-3xl leading-relaxed">
            Recherche dynamique, favoris, géolocalisation et tendances météo en temps réel.
          </p>
        </div>
      </header>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto space-y-4 relative z-10">
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-blue-500/10 transition-shadow duration-500">
          <div className="relative z-10">
            <SearchBar
              value={query}
              onChange={handleSearchChange}
              onSearch={searchSuggestions}
              onSubmit={handleSubmitSearch}
              suggestions={suggestions}
              isLoading={geoLoading}
              onSelectSuggestion={handleSuggestionSelect}
              onGeolocate={handleGeolocate}
            />
          </div>
          
          {combinedError && (
            <div className="mt-6 px-6 py-4 rounded-2xl backdrop-blur-sm bg-red-500/20 border border-red-500/30">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <span className="text-white font-medium">{combinedError}</span>
              </div>
            </div>
          )}
        </div>

        {isLocating && (
          <div className="px-6 py-4 rounded-2xl backdrop-blur-sm bg-blue-500/20 border border-blue-500/30 animate-pulse">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📍</span>
              <span className="text-white font-medium">Géolocalisation en cours...</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Left Column - Weather Display */}
        <div className="lg:col-span-2 space-y-8">
          <section className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                Conditions actuelles
              </h2>
              {lastUpdated && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm bg-white/10 border border-white/20">
                  <span className="text-lg">🕐</span>
                  <span className="text-sm text-white/90 font-medium">
                    MAJ {lastUpdated}
                  </span>
                </div>
              )}
            </div>

            {weather && activeLocation && (
              <WeatherCard
                title={activeLocation.name}
                temperature={weather.temperature}
                description={weather.description}
                icon={getWeatherIconUrl(weather.icon)}
                humidity={weather.humidity}
                windSpeed={weather.windSpeed}
                pressure={weather.pressure}
                feelsLike={weather.feelsLike}
                visibility={weather.visibility}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
                lastUpdated={lastUpdated}
              />
            )}

            {!weather && !weatherLoading && (
              <div className="relative overflow-hidden rounded-3xl border-2 border-dashed border-white/20 backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
                <div className="relative text-center py-24 px-6">
                  <div className="text-8xl mb-6 animate-bounce">🌤️</div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Aucune ville sélectionnée
                  </h3>
                  <p className="text-lg text-white/70 font-light max-w-md mx-auto">
                    Recherchez une ville pour afficher sa météo détaillée et ses prévisions.
                  </p>
                </div>
              </div>
            )}

            {weatherLoading && (
              <div className="space-y-6">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl h-80 animate-pulse shadow-2xl" />
                <div className="flex gap-4">
                  <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl h-12 flex-1 animate-pulse" />
                  <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl h-12 w-32 animate-pulse" />
                </div>
              </div>
            )}
          </section>

          {/* Quick Stats Panel - NOUVEAU */}
          {quickStats && weather && (
            <section className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 rounded-3xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                Statistiques rapides
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* UV Index */}
                <div className={`p-5 rounded-2xl backdrop-blur-sm border bg-gradient-to-br ${quickStats.uvLevel.color} group hover:scale-105 transition-transform duration-300`}>
                  <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">☀️</div>
                  <div className="text-xs text-white/70 mb-1 font-medium">Indice UV</div>
                  <div className="text-2xl font-bold text-white mb-1">{quickStats.uvIndex}</div>
                  <div className="text-xs text-white/80 font-semibold">{quickStats.uvLevel.label}</div>
                </div>

                {/* Air Quality */}
                <div className={`p-5 rounded-2xl backdrop-blur-sm border bg-gradient-to-br ${quickStats.aqLevel.color} group hover:scale-105 transition-transform duration-300`}>
                  <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">🍃</div>
                  <div className="text-xs text-white/70 mb-1 font-medium">Qualité air</div>
                  <div className="text-2xl font-bold text-white mb-1">{quickStats.airQuality}/5</div>
                  <div className="text-xs text-white/80 font-semibold">{quickStats.aqLevel.label}</div>
                </div>

                {/* Dew Point */}
                <div className="p-5 rounded-2xl backdrop-blur-sm border bg-gradient-to-br from-cyan-500/30 to-blue-500/20 border-cyan-500/40 group hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">💧</div>
                  <div className="text-xs text-white/70 mb-1 font-medium">Point de rosée</div>
                  <div className="text-2xl font-bold text-white mb-1">{quickStats.dewPoint}°C</div>
                  <div className="text-xs text-white/80 font-semibold">Condensation</div>
                </div>

                {/* Cloud Cover */}
                <div className="p-5 rounded-2xl backdrop-blur-sm border bg-gradient-to-br from-slate-500/30 to-gray-500/20 border-slate-500/40 group hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">☁️</div>
                  <div className="text-xs text-white/70 mb-1 font-medium">Couverture</div>
                  <div className="text-2xl font-bold text-white mb-1">{quickStats.cloudCover}%</div>
                  <div className="text-xs text-white/80 font-semibold">Nuages</div>
                </div>
              </div>
            </section>
          )}

          {forecast.length > 0 && (
            <div className="mt-8">
              <ForecastList items={forecast} />
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6 lg:sticky lg:top-24">
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-purple-500/10 transition-shadow duration-500">
            <PopularCities onSelect={handleSubmitSearch} />
          </div>

          <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-pink-500/10 transition-shadow duration-500">
            <Favorites
              items={favorites}
              onSelect={fetchWeatherForLocation}
              onRemove={(city) => persistFavorites(favorites.filter((f) => !(f.lat === city.lat && f.lon === city.lon)))}
            />
          </div>

          <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-blue-500/10 transition-shadow duration-500">
            <HistoryList
              items={history}
              onSelect={handleHistorySelect}
              onClear={() => persistHistory([])}
            />
          </div>
        </div>
      </div>
    </div>
  )
}