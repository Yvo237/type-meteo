import React, { useState } from "react"
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

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-primary font-semibold">Comparaison</p>
        <h1 className="text-3xl font-black leading-tight">Comparer les villes</h1>
        <p className="text-sm text-gray-500">
          Comparez les conditions météo de plusieurs villes côte à côte.
        </p>
      </header>

      <div className="space-y-4">
        {cities.map((city, index) => (
          <Card key={index} className="border border-base-300/60">
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-3">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Ville {index + 1}</span>
                  </label>
                  <div className="join">
                    <input
                      type="text"
                      placeholder="Nom de la ville..."
                      className="input input-bordered join-item flex-1"
                      value={city.name}
                      onChange={(e) => handleCityChange(index, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          fetchCityWeather(index, city.name)
                        }
                      }}
                    />
                    <button
                      className="btn btn-primary join-item"
                      onClick={() => fetchCityWeather(index, city.name)}
                      disabled={city.loading || !city.name.trim()}
                    >
                      {city.loading ? (
                        <span className="loading loading-spinner loading-sm" />
                      ) : (
                        "Rechercher"
                      )}
                    </button>
                    {cities.length > 2 && (
                      <button
                        className="btn btn-error join-item"
                        onClick={() => removeCity(index)}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {city.loading && (
                  <div className="py-4">
                    <Skeleton className="h-32 w-full" />
                  </div>
                )}

                {city.error && (
                  <Alert type="error">{city.error}</Alert>
                )}

                {city.weather && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                    <div>
                      <div className="text-xs opacity-70">Température</div>
                      <div className="text-2xl font-bold">{city.weather.temperature}°C</div>
                    </div>
                    <div>
                      <div className="text-xs opacity-70">Ressenti</div>
                      <div className="text-xl font-semibold">{city.weather.feelsLike || city.weather.temperature}°C</div>
                    </div>
                    <div>
                      <div className="text-xs opacity-70">Humidité</div>
                      <div className="text-xl font-semibold">{city.weather.humidity}%</div>
                    </div>
                    <div>
                      <div className="text-xs opacity-70">Vent</div>
                      <div className="text-xl font-semibold">{Math.round(city.weather.windSpeed * 3.6)} km/h</div>
                    </div>
                    <div className="col-span-2 md:col-span-4">
                      <div className="flex items-center gap-2">
                        <WeatherIcon
                          iconUrl={getWeatherIconUrl(city.weather.icon)}
                          size="sm"
                        />
                        <span className="text-sm capitalize">{city.weather.description}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}

        <button className="btn btn-outline btn-primary w-full" onClick={addCity}>
          + Ajouter une ville
        </button>
      </div>

      {allLoaded && hasData && (
        <Card className="border border-primary/20 bg-primary/5">
          <h3 className="font-semibold mb-3">Résumé comparatif</h3>
          <div className="grid gap-2 text-sm">
            {cities.filter((c) => c.weather).map((city, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="font-medium">{city.name}</span>
                <span className="text-primary font-bold">{city.weather.temperature}°C</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

