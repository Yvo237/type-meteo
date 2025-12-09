import React from "react"
import type { WeatherForecast } from "../../types"
import WeatherIcon from "./WeatherIcon"
import { formatTemperature } from "../../utils/helpers"

interface ForecastListProps {
  items: WeatherForecast[]
}

export default function ForecastList({ items }: ForecastListProps) {
  if (items.length === 0) return null

  const formatDate = (iso: string) => {
    const date = new Date(iso)
    return date.toLocaleDateString("fr-FR", { weekday: "short", day: "2-digit", month: "2-digit" })
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold mb-4">Tendances (5 jours)</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((forecast) => (
            <div
              key={forecast.date}
              className="p-3 rounded-lg border border-base-200 bg-base-200/60 hover:shadow-md transition-all"
            >
              <div className="text-sm font-semibold mb-2">{formatDate(forecast.date)}</div>
              <div className="flex items-center gap-2">
                <WeatherIcon iconUrl={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`} size="sm" />
                <div className="text-sm">{forecast.description}</div>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="font-semibold text-primary">{formatTemperature(forecast.temperature.max)}</span>
                <span className="text-gray-500">{formatTemperature(forecast.temperature.min)}</span>
              </div>
              <div className="text-xs opacity-70 mt-1">
                💧 {forecast.humidity}% · 💨 {forecast.windSpeed} km/h
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

