import { useState, useCallback } from "react"
import { fetchWeather, type WeatherData } from "../services/weatherApi"

interface UseWeatherState {
  weather: WeatherData | null
  loading: boolean
  error: string | null
}

export function useWeather() {
  const [state, setState] = useState<UseWeatherState>({
    weather: null,
    loading: false,
    error: null,
  })

  const getWeather = useCallback(async (lat: number, lon: number) => {
    setState({ weather: null, loading: true, error: null })
    try {
      const data = await fetchWeather(lat, lon)
      setState({ weather: data, loading: false, error: null })
      return data
    } catch (err) {
      setState({ weather: null, loading: false, error: err instanceof Error ? err.message : "Erreur météo" })
      return null
    }
  }, [])

  return { ...state, getWeather }
}
