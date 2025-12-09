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
    <div className="container mx-auto px-4 py-8 space-y-6">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-primary font-semibold">Explorer l'Afrique</p>
        <h1 className="text-3xl font-black leading-tight">Villes clés, météo instantanée</h1>
        <p className="text-sm text-gray-500">
          Aperçu rapide des grandes villes africaines pour comparer les conditions.
        </p>
      </header>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} className="h-40 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <Card key={`${city.name}-${city.lat}`} className="border border-base-300/60 hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold">{city.name}</div>
                  <div className="text-xs opacity-70">{city.country}</div>
                </div>
                {city.weather && (
                  <WeatherIcon iconUrl={`https://openweathermap.org/img/wn/${city.weather.icon}@2x.png`} size="sm" />
                )}
              </div>
              {city.weather ? (
                <div className="mt-3 space-y-2">
                  <div className="text-3xl font-bold">{Math.round(city.weather.temperature)}°C</div>
                  <div className="text-sm capitalize opacity-80">{city.weather.description}</div>
                  <div className="text-xs opacity-70 flex gap-3">
                    <span>💧 {city.weather.humidity}%</span>
                    <span>💨 {Math.round(city.weather.windSpeed * 3.6)} km/h</span>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-error mt-3">{city.error || "Données indisponibles"}</div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

