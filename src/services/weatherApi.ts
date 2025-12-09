import { WEATHER_API_URL, API_KEY } from "../utils/constants"
import { capitalizeFirstLetter } from "../utils/helpers"
import type { WeatherForecast } from "../types"

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

export async function fetchForecast(lat: number, lon: number): Promise<WeatherForecast[]> {
  if (!API_KEY) {
    throw new Error("Clé API manquante")
  }

  const response = await fetch(
    `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`
  )

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des prévisions")
  }

  const data = await response.json()
  const dailyMap = new Map<string, WeatherForecast>()

  data.list.forEach((entry: any) => {
    const date = entry.dt_txt.split(" ")[0]
    const forecast = dailyMap.get(date)
    const tempMin = Math.round(entry.main.temp_min)
    const tempMax = Math.round(entry.main.temp_max)
    if (!forecast) {
      dailyMap.set(date, {
        date,
        temperature: { min: tempMin, max: tempMax },
        description: capitalizeFirstLetter(entry.weather[0].description),
        icon: entry.weather[0].icon,
        humidity: entry.main.humidity,
        windSpeed: Math.round(entry.wind.speed * 3.6),
      })
    } else {
      forecast.temperature.min = Math.min(forecast.temperature.min, tempMin)
      forecast.temperature.max = Math.max(forecast.temperature.max, tempMax)
    }
  })

  return Array.from(dailyMap.values()).slice(0, 5)
}