import React, { useState } from "react"
import { useGeocoding } from "../hooks/useGeocoding"
import { useWeather } from "../hooks/useWeather"
import { useDebounce } from "../hooks/useDebounce"

interface SearchBarProps {
  onSearch: (city: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [city, setCity] = useState("")
  const debouncedCity = useDebounce(city, 300)

  React.useEffect(() => {
    if (debouncedCity) {
      onSearch(debouncedCity)
    }
  }, [debouncedCity, onSearch])

  return (
    <div className="w-full">
      <div className="form-control">
        <input
          type="text"
          placeholder="Rechercher une ville..."
          className="input input-bordered input-lg w-full"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
    </div>
  )
}
