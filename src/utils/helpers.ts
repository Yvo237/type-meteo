import type { WeatherData } from "../types"

export function formatWeather(data: WeatherData): WeatherData {
  return {
    ...data,
    temperature: Math.round(data.temperature),
    feelsLike: data.feelsLike ? Math.round(data.feelsLike) : undefined,
    windSpeed: Math.round(data.windSpeed * 3.6), // Convert m/s to km/h
    description: data.description.charAt(0).toUpperCase() + data.description.slice(1)
  }
}

export function formatTemperature(temp: number): string {
  return `${Math.round(temp)}°C`
}

export function formatWindSpeed(speed: number): string {
  return `${Math.round(speed * 3.6)} km/h`
}

export function formatHumidity(humidity: number): string {
  return `${humidity}%`
}

export function formatPressure(pressure: number): string {
  return `${pressure} hPa`
}

export function formatVisibility(visibility: number): string {
  return `${visibility} km`
}

export function getWeatherIconUrl(icon: string): string {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
