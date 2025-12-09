import React, { useState } from "react"
import SearchBar from "../components/SearchBar"
import WeatherCard from "../components/weather/WeatherCard"
import PopularCities from "../components/PopularCities"
import HistoryList from "../components/HistoryList"
import { useGeocoding } from "../hooks/useGeocoding"
import { useWeather } from "../hooks/useWeather"

export default function Home() {
  const [city, setCity] = useState("")
  const { geocode, coordinates, loading, error } = useGeocoding()
  const { weather, getWeather } = useWeather()

  const handleSearch = (searchCity: string) => {
    setCity(searchCity)
    if (searchCity) {
      geocode(searchCity)
    }
  }

  React.useEffect(() => {
    if (coordinates) {
      getWeather(coordinates.lat, coordinates.lon)
    }
  }, [coordinates, getWeather])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Meteo-Type
      </h1>
      
      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="max-w-4xl mx-auto">
        {weather && (
          <WeatherCard 
            title={city || "Ville"}
            temperature={weather.temperature}
            description={weather.description}
            icon={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            humidity={weather.humidity}
            windSpeed={weather.windSpeed}
          />
        )}
        {!weather && !loading && (
          <div className="text-center text-gray-500 py-8">
            Recherchez une ville pour voir la météo
          </div>
        )}
        {loading && (
          <div className="text-center py-8">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        )}
        {error && (
          <div className="alert alert-error max-w-md mx-auto">
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <PopularCities />
        <HistoryList />
      </div>
    </div>
  )
}
