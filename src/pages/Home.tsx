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
    <div className="container mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <header className="flex flex-wrap items-center justify-between gap-4 p-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-wider text-white/90 font-semibold backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full inline-block">Météo instantanée</p>
          <h1 className="text-5xl font-black leading-tight text-white drop-shadow-2xl tracking-tight">{heroTitle}</h1>
          <p className="text-lg text-white/80 font-light max-w-2xl">Recherche dynamique, favoris, géolocalisation et tendances météo en temps réel.</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">
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
          {combinedError && (
            <div className="alert alert-error mt-4 backdrop-blur-sm bg-red-500/20 border border-red-500/30 text-white">
              <span>{combinedError}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">Conditions actuelles</h2>
              {lastUpdated && <span className="text-sm text-white/70 backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full">Dernière MAJ {lastUpdated}</span>}
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
              <div className="text-center text-white/60 py-16 border-2 border-dashed border-white/20 rounded-3xl backdrop-blur-sm bg-white/5">
                <div className="text-6xl mb-4">🌤️</div>
                <p className="text-lg font-medium">Recherchez une ville pour afficher sa météo détaillée.</p>
              </div>
            )}
            {weatherLoading && (
              <div className="space-y-4">
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl h-64 animate-pulse shadow-2xl" />
                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl h-12 w-1/2 animate-pulse" />
              </div>
            )}
          </section>

          {forecast.length > 0 && <ForecastList items={forecast} />}
        </div>

        <div className="space-y-6 lg:sticky lg:top-8">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">
            <PopularCities onSelect={handleSubmitSearch} />
          </div>
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">
            <Favorites
              items={favorites}
              onSelect={fetchWeatherForLocation}
              onRemove={(city) => persistFavorites(favorites.filter((f) => !(f.lat === city.lat && f.lon === city.lon)))}
            />
          </div>
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">
            <HistoryList
              items={history}
              onSelect={handleHistorySelect}
              onClear={() => persistHistory([])}
            />
          </div>
          {isLocating && (
            <div className="alert alert-info backdrop-blur-sm bg-blue-500/20 border border-blue-500/30 text-white rounded-3xl">
              <span>📍 Géolocalisation en cours...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
