import { useState, useCallback } from "react"
import { fetchForecast, fetchWeather, type WeatherData } from "../services/weatherApi"
import type { WeatherForecast } from "../types"

interface UseWeatherState {
  weather: WeatherData | null
  forecast: WeatherForecast[]
  loading: boolean
  error: string | null
}

export function useWeather() {
  const [state, setState] = useState<UseWeatherState>({
    weather: null,
    forecast: [],
    loading: false,
    error: null,
  })

  const getWeather = useCallback(async (lat: number, lon: number) => {
    setState((prev) => ({ ...prev, weather: null, loading: true, error: null }))
    try {
      const [current, forecast] = await Promise.all([
        fetchWeather(lat, lon),
        fetchForecast(lat, lon),
      ])
      setState({ weather: current, forecast, loading: false, error: null })
      return { current, forecast }
    } catch (err) {
      setState({
        weather: null,
        forecast: [],
        loading: false,
        error: err instanceof Error ? err.message : "Erreur météo",
      })
      return null
    }
  }, [])

  return { ...state, getWeather }
}
