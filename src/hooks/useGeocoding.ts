import { useState, useCallback } from "react"
import { fetchCoordinates, type Coordinates } from "../services/geocodingApi"

interface UseGeocodingState {
  coordinates: Coordinates | null
  loading: boolean
  error: string | null
}

export function useGeocoding() {
  const [state, setState] = useState<UseGeocodingState>({
    coordinates: null,
    loading: false,
    error: null,
  })

  const geocode = useCallback(async (city: string) => {
    if (!city.trim()) {
      setState({ coordinates: null, loading: false, error: null })
      return null
    }
    setState({ coordinates: null, loading: true, error: null })
    try {
      const coords = await fetchCoordinates(city)
      if (!coords) {
        setState({ coordinates: null, loading: false, error: "Ville introuvable." })
        return null
      }
      setState({ coordinates: coords, loading: false, error: null })
      return coords
    } catch (err) {
      setState({ coordinates: null, loading: false, error: err instanceof Error ? err.message : "Erreur géocodage" })
      return null
    }
  }, [])

  return { ...state, geocode }
}

