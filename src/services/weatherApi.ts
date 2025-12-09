import { WEATHER_API_URL, API_KEY } from "../utils/constants"

export interface WeatherData {
  temperature: number
  description: string
  humidity: number
  windSpeed: number
  icon: string
  pressure?: number
  feelsLike?: number
  visibility?: number
  uvIndex?: number
}

export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  if (!API_KEY) {
    throw new Error("Clé API manquante")
  }

  const response = await fetch(
    `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`
  )

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des données météo")
  }

  const data = await response.json()

  return {
    temperature: Math.round(data.main.temp),
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    icon: data.weather[0].icon,
    pressure: data.main.pressure,
    feelsLike: Math.round(data.main.feels_like),
    visibility: data.visibility ? data.visibility / 1000 : undefined,
    uvIndex: data.uvi
  }
}