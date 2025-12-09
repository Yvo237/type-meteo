import { GEO_API_URL, API_KEY } from "../utils/constants"

export interface Coordinates {
  lat: number
  lon: number
}

export async function fetchCoordinates(city: string): Promise<Coordinates> {
  if (!API_KEY) {
    throw new Error("Clé API manquante")
  }

  const response = await fetch(
    `${GEO_API_URL}/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
  )

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des coordonnées")
  }

  const data = await response.json()
  
  if (!data || data.length === 0) {
    throw new Error("Ville introuvable")
  }

  return {
    lat: data[0].lat,
    lon: data[0].lon
  }
}