import { useState, useCallback } from "react"
import {
  fetchCoordinates,
  fetchGeocoding,
  reverseGeocode,
  type Coordinates,
  type GeocodingResult,
} from "../services/geocodingApi"

interface UseGeocodingState {
  coordinates: Coordinates | null
  loading: boolean
  error: string | null
  suggestions: GeocodingResult[]
}

export function useGeocoding() {
  const [state, setState] = useState<UseGeocodingState>({
    coordinates: null,
    loading: false,
    error: null,
    suggestions: [],
  })

  const geocode = useCallback(async (city: string) => {
    if (!city.trim()) {
      setState((prev) => ({ ...prev, coordinates: null, loading: false, error: null }))
      return null
    }
    setState((prev) => ({ ...prev, coordinates: null, loading: true, error: null }))
    try {
      const coords = await fetchCoordinates(city)
      if (!coords) {
        setState((prev) => ({ ...prev, coordinates: null, loading: false, error: "Ville introuvable." }))
        return null
      }
      setState((prev) => ({ ...prev, coordinates: coords, loading: false, error: null }))
      return coords
    } catch (err) {
      setState((prev) => ({
        ...prev,
        coordinates: null,
        loading: false,
        error: err instanceof Error ? err.message : "Erreur géocodage",
      }))
      return null
    }
  }, [])

  const searchSuggestions = useCallback(async (query: string) => {
    if (!query.trim()) {
      setState((prev) => ({ ...prev, suggestions: [] }))
      return []
    }
    try {
      const results = await fetchGeocoding(query)
      setState((prev) => ({ ...prev, suggestions: results }))
      return results
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : "Erreur géocodage",
        suggestions: [],
      }))
      return []
    }
  }, [])

  const geolocate = useCallback(async (lat: number, lon: number) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const reverse = await reverseGeocode(lat, lon)
      setState((prev) => ({
        ...prev,
        coordinates: { lat, lon },
        loading: false,
        error: null,
      }))
      return reverse
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : "Géolocalisation indisponible",
      }))
      return null
    }
  }, [])

  return { ...state, geocode, geolocate, searchSuggestions }
}


