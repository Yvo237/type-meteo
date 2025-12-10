import { GEO_API_URL, API_KEY } from "../utils/constants"

export interface Coordinates {
  lat: number
  lon: number
}

export interface GeocodingResult extends Coordinates {
  name: string
  country?: string
  state?: string
}

export async function fetchCoordinates(city: string): Promise<Coordinates> {
  const results = await fetchGeocoding(city, 1)
  if (!results.length) {
    throw new Error("Ville introuvable")
  }
  return { lat: results[0].lat, lon: results[0].lon }
}

export async function fetchGeocoding(query: string, limit = 5): Promise<GeocodingResult[]> {
  if (!API_KEY) {
    throw new Error("Clé API manquante")
  }

  const response = await fetch(
    `${GEO_API_URL}/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des coordonnées")
  }

  const data = await response.json()
  if (!data || data.length === 0) {
    return []
  }

  return data.map((item: any) => ({
    name: item.name,
    country: item.country,
    state: item.state,
    lat: item.lat,
    lon: item.lon,
  }))
}

export async function reverseGeocode(lat: number, lon: number): Promise<GeocodingResult | null> {
  if (!API_KEY) {
    throw new Error("Clé API manquante")
  }

  const response = await fetch(
    `${GEO_API_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération de la ville")
  }

  const data = await response.json()
  if (!data || data.length === 0) return null

  return {
    name: data[0].name,
    country: data[0].country,
    state: data[0].state,
    lat: data[0].lat,
    lon: data[0].lon,
  }
}