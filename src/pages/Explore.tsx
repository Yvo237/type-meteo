import React from "react"
import { fetchWeather, type WeatherData } from "../services/weatherApi"
import WeatherIcon from "../components/weather/WeatherIcon"
import Skeleton from "../components/ui/Skeleton"
import Card from "../components/ui/Card"

type CityPreset = {
  name: string
  country: string
  lat: number
  lon: number
}

const AFRICA_CITIES: CityPreset[] = [
  { name: "Yaoundé", country: "Cameroun", lat: 3.848, lon: 11.5021 },
  { name: "Douala", country: "Cameroun", lat: 4.0511, lon: 9.7679 },
  { name: "Dakar", country: "Sénégal", lat: 14.7167, lon: -17.4677 },
  { name: "Abidjan", country: "Côte d'Ivoire", lat: 5.35995, lon: -4.00826 },
  { name: "Lagos", country: "Nigeria", lat: 6.5244, lon: 3.3792 },
  { name: "Nairobi", country: "Kenya", lat: -1.2921, lon: 36.8219 },
  { name: "Accra", country: "Ghana", lat: 5.6037, lon: -0.187 },
  { name: "Casablanca", country: "Maroc", lat: 33.5731, lon: -7.5898 },
  { name: "Le Caire", country: "Égypte", lat: 30.0444, lon: 31.2357 },
  { name: "Johannesburg", country: "Afrique du Sud", lat: -26.2041, lon: 28.0473 },
]

type CityWeather = CityPreset & { weather?: WeatherData; error?: string }

export default function Explore() {
  const [cities, setCities] = React.useState<CityWeather[]>(
    AFRICA_CITIES.map((c) => ({ ...c, weather: undefined }))
  )
  const [loading, setLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    const load = async () => {
      setLoading(true)
      const results = await Promise.all(
        AFRICA_CITIES.map(async (city) => {
          try {
            const weather = await fetchWeather(city.lat, city.lon)
            return { ...city, weather }
          } catch (err) {
            return { ...city, error: err instanceof Error ? err.message : "Erreur météo" }
          }
        })
      )
      setCities(results)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="container mx-auto px-4 py-12 space-y-10">
      {/* Header Section */}
      <header className="space-y-6 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-white/20">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
          <span className="text-sm font-semibold text-white/90 uppercase tracking-wider">
            Explorer l'Afrique
          </span>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-6xl md:text-7xl font-black leading-none text-white drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
            Villes clés, météo instantanée
          </h1>
          <p className="text-xl text-white/70 font-light max-w-3xl leading-relaxed">
            Aperçu rapide des grandes villes africaines pour comparer les conditions météo en temps réel avec un design moderne et interactif.
          </p>
        </div>
      </header>

      {/* Cities Grid */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <Skeleton key={idx} className="h-56 w-full rounded-3xl" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cities.map((city, index) => (
            <div
              key={`${city.name}-${city.lat}`}
              className="group relative"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Card className="h-full relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl hover:bg-white/15 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 ease-out">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        {city.name}
                      </h3>
                      <p className="text-sm text-white/60 font-medium">
                        {city.country}
                      </p>
                    </div>
                    {city.weather && (
                      <div className="transform group-hover:scale-110 transition-transform duration-300">
                        <WeatherIcon 
                          iconUrl={`https://openweathermap.org/img/wn/${city.weather.icon}@2x.png`} 
                          size="sm" 
                        />
                      </div>
                    )}
                  </div>

                  {/* Weather Info */}
                  {city.weather ? (
                    <div className="space-y-4 pt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-white">
                          {Math.round(city.weather.temperature)}
                        </span>
                        <span className="text-3xl font-light text-white/70">°C</span>
                      </div>
                      
                      <p className="text-base capitalize text-white/80 font-medium">
                        {city.weather.description}
                      </p>

                      {/* Metrics */}
                      <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm">
                          <span className="text-lg">💧</span>
                          <span className="text-sm font-semibold text-white/90">
                            {city.weather.humidity}%
                          </span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm">
                          <span className="text-lg">💨</span>
                          <span className="text-sm font-semibold text-white/90">
                            {Math.round(city.weather.windSpeed * 3.6)} km/h
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-4">
                      <div className="px-4 py-3 rounded-xl bg-red-500/20 border border-red-500/30 backdrop-blur-sm">
                        <p className="text-sm text-red-200 font-medium">
                          {city.error || "Données indisponibles"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}