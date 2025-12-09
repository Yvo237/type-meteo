import React from "react"
import { useGeocoding } from "../hooks/useGeocoding"
import { useWeather } from "../hooks/useWeather"

const POPULAR_CITIES = [
  "Paris", "Lyon", "Marseille", "Toulouse", "Nice", 
  "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille"
]

export default function PopularCities() {
  const { geocode } = useGeocoding()
  const { getWeather } = useWeather()

  const handleCityClick = async (city: string) => {
    try {
      const coords = await geocode(city)
      if (coords) {
        getWeather(coords.lat, coords.lon)
      }
    } catch (error) {
      console.error("Erreur:", error)
    }
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold mb-4">Villes populaires</h2>
        <div className="grid grid-cols-2 gap-2">
          {POPULAR_CITIES.map((city) => (
            <button
              key={city}
              onClick={() => handleCityClick(city)}
              className="btn btn-sm btn-outline btn-primary hover:btn-primary"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
