export type Coordinates = {
  lat: number
  lon: number
}

export type WeatherData = {
  temperature: number
  description: string
  icon: string
  humidity: number
  windSpeed: number
  pressure?: number
  feelsLike?: number
  visibility?: number
  uvIndex?: number
}

export type GeocodingResult = {
  name: string
  lat: number
  lon: number
  country?: string
  state?: string
}

export type WeatherForecast = {
  date: string
  temperature: {
    min: number
    max: number
  }
  description: string
  icon: string
  humidity: number
  windSpeed: number
}

export type ApiResponse<T> = {
  data?: T
  error?: string
  loading: boolean
}
